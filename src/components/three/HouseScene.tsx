"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, OrbitControls, ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import gsap from "gsap";
import * as THREE from "three";
import { classifyMeshToZone, FADES_IN_INTERIOR, HOUSE_ZONE_BY_ID } from "@/data/houseZones";

export type HouseView = "exterior" | "interior";

const MODEL_URL = "/maquette_Villa.glb";

const HOVER_GLOW = new THREE.Color("#f5c433");
const SELECT_GLOW = new THREE.Color("#1e7a4c");
const BLACK = new THREE.Color("#000000");

type MaterialStyle = {
  color?: string;
  roughness?: number;
  metalness?: number;
  transparent?: boolean;
  opacity?: number;
  emissive?: string;
  emissiveIntensity?: number;
  flatShading?: boolean;
};

// Realistic, premium finish applied by glTF material name. The source .glb exports every
// material as flat placeholder grey (no textures), so color/finish is authored here instead
// of re-exporting from Blender.
const MATERIAL_STYLES: Record<string, MaterialStyle> = {
  Enduit_Blanc: { color: "#ece6d8", roughness: 0.88, metalness: 0 },
  Bardage_Bois: { color: "#6b4a31", roughness: 0.75, metalness: 0 },
  Bardage_Bois_Clair: { color: "#c9a876", roughness: 0.7, metalness: 0 },
  Brique_Moderne: { color: "#8a5a48", roughness: 0.82, metalness: 0 },
  Tuile_Terre_Cuite: { color: "#a8532e", roughness: 0.68, metalness: 0 },
  Alu_Noir: { color: "#1c1c1c", roughness: 0.35, metalness: 0.85 },
  Garage_Metal: { color: "#d8d4c7", roughness: 0.45, metalness: 0.55 },
  Verre: { color: "#a9c9d6", roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.35 },
  Verre_Garde_Corps: { color: "#a9c9d6", roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.3 },
  Pelouse: { color: "#5f8a3f", roughness: 0.95, metalness: 0 },
  Terre: { color: "#4a3c2c", roughness: 0.95, metalness: 0 },
  Eau_Piscine: { color: "#1f8fae", roughness: 0.08, metalness: 0, transparent: true, opacity: 0.88 },
  Eau_Piscine_Surface: { color: "#5fc3d8", roughness: 0.05, metalness: 0, transparent: true, opacity: 0.7 },
  Pierre_Claire: { color: "#cfc7b4", roughness: 0.8, metalness: 0 },
  Deck_Teck: { color: "#9c6b3e", roughness: 0.55, metalness: 0 },
  Feuillage: { color: "#3e6b3a", roughness: 1, metalness: 0, flatShading: true },
  Tronc: { color: "#4a3728", roughness: 0.9, metalness: 0 },
  Coussin: { color: "#c9b79a", roughness: 0.9, metalness: 0 },
  Porte_Noire: { color: "#1b1d18", roughness: 0.4, metalness: 0.1 },
  Nid_Guepes: { color: "#d8c9a3", roughness: 0.95, metalness: 0 },
  Interieur_Suggere: { color: "#7a6a55", roughness: 0.75, metalness: 0 },
  Mobilier: { color: "#6b6558", roughness: 0.6, metalness: 0.05 },
  Lampe_Diffuseur: { color: "#fff8e8", roughness: 0.3, metalness: 0, transparent: true, opacity: 0.55 },
  LED_Chaude: { color: "#ffdd7a", roughness: 0.4, metalness: 0, emissive: "#ffdd7a", emissiveIntensity: 1.4 },
  Glow_Lampadaire: {
    color: "#ffe6a8",
    roughness: 0.5,
    metalness: 0,
    transparent: true,
    opacity: 0.4,
    emissive: "#ffdd7a",
    emissiveIntensity: 0.8,
  },
  LED_Piscine: { color: "#bfefff", roughness: 0.3, metalness: 0, emissive: "#bfefff", emissiveIntensity: 1.1 },
};

type GlowMesh = {
  mesh: THREE.Mesh;
  materials: THREE.MeshStandardMaterial[];
  zoneId: string;
  fades: boolean;
  restY: number;
  origRaycast: THREE.Mesh["raycast"];
};

// A no-op raycast makes a mesh transparent to clicks/hovers — used on faded roof/attic
// elements in interior view so the visitor can reach the rooms behind them.
const NOOP_RAYCAST: THREE.Mesh["raycast"] = () => {};

useGLTF.preload(MODEL_URL);

function FloatingLabel({
  position,
  label,
  variant,
}: {
  position: [number, number, number];
  label: string;
  variant: "hover" | "selected";
}) {
  return (
    <Html position={position} center distanceFactor={10} zIndexRange={[30, 0]} pointerEvents="none">
      <div
        className={`pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm ${
          variant === "selected"
            ? "border-white bg-primary-dark text-white"
            : "border-white bg-accent text-accent-foreground"
        }`}
      >
        {variant === "selected" && (
          <span className="flex size-3.5 items-center justify-center rounded-full bg-white/25 text-[9px]">✓</span>
        )}
        {label}
      </div>
    </Html>
  );
}

function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-2 border-border border-t-secondary" />
        <span className="text-xs font-medium text-muted-foreground">Chargement de la villa…</span>
      </div>
    </Html>
  );
}

function SceneEnvironment() {
  return (
    <Environment resolution={128} frames={1} background={false}>
      <Lightformer form="rect" intensity={1.1} color="#f5f7f0" scale={[10, 10, 1]} position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Lightformer form="rect" intensity={0.42} color="#ffe6b0" scale={[6, 4, 1]} position={[6, 3, 4]} rotation={[0, -Math.PI / 3, 0]} />
      <Lightformer form="rect" intensity={0.35} color="#cfe0ff" scale={[6, 4, 1]} position={[-6, 2, -3]} rotation={[0, Math.PI / 2.4, 0]} />
      <Lightformer form="rect" intensity={0.25} color="#8fae55" scale={[8, 8, 1]} position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    </Environment>
  );
}

// Exterior/interior framing, expressed as spherical offsets (distance + polar angle) around
// the model's center. It only runs a one-off GSAP tween when `view` changes, preserving
// whatever azimuth (horizontal angle) the visitor last chose; OrbitControls keeps full
// control the rest of the time.
function CameraRig({
  view,
  controlsRef,
  center,
  radius,
}: {
  view: HouseView;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  center: THREE.Vector3;
  radius: number;
}) {
  const { camera } = useThree();
  const hasMounted = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const targetPolar = view === "interior" ? Math.PI / 9 : Math.PI / 2.9;
    const targetDistance = radius * (view === "interior" ? 0.95 : 1.05);

    const currentOffset = camera.position.clone().sub(controls.target);
    const currentSpherical = new THREE.Spherical().setFromVector3(currentOffset);

    const theta = hasMounted.current ? currentSpherical.theta : Math.PI / 4;
    const state = hasMounted.current
      ? { radius: currentSpherical.radius, phi: currentSpherical.phi }
      : { radius: targetDistance * 1.5, phi: targetPolar + 0.3 };

    tweenRef.current?.kill();
    tweenRef.current = gsap.to(state, {
      radius: targetDistance,
      phi: targetPolar,
      duration: hasMounted.current ? 1.7 : 2,
      ease: hasMounted.current ? "power2.inOut" : "power3.out",
      onUpdate: () => {
        const offset = new THREE.Vector3().setFromSphericalCoords(state.radius, state.phi, theta);
        camera.position.copy(center).add(offset);
        controls.target.copy(center);
        controls.update();
      },
    });

    controls.minDistance = radius * 0.4;
    controls.maxDistance = radius * 2.3;

    hasMounted.current = true;

    return () => {
      tweenRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `camera` is a stable r3f singleton
  }, [view, center, radius, controlsRef]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  return null;
}

function Villa({
  selected,
  onSelect,
  autoRotate,
  reducedMotion,
  view,
  controlsRef,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
  autoRotate: boolean;
  reducedMotion: boolean;
  view: HouseView;
  controlsRef: RefObject<OrbitControlsImpl | null>;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const { gl } = useThree();
  // Clone so we can safely mutate materials/shadow flags without corrupting drei's cached GLTF.
  const model = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<THREE.Group>(null);
  const glowMeshes = useRef<GlowMesh[]>([]);
  const hoveredMesh = useRef<THREE.Mesh | null>(null);
  const selectedMesh = useRef<THREE.Mesh | null>(null);

  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const [hoverAnchor, setHoverAnchor] = useState<[number, number, number] | null>(null);
  const [selectAnchor, setSelectAnchor] = useState<[number, number, number] | null>(null);

  const { center, radius } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const c = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(c);
    return { center: c, radius: Math.max(size.x, size.y, size.z, 1) / 2 };
  }, [model]);

  useEffect(() => {
    const list: GlowMesh[] = [];

    model.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (!mesh.material) return;

      // Clone each mesh's material so it can get its own realistic finish + independent glow
      // without mutating drei's shared cached GLTF.
      const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const styledMaterials = sourceMaterials.map((source) => {
        const next = source.clone() as THREE.MeshStandardMaterial;
        const style = MATERIAL_STYLES[source.name];
        if (style) {
          if (style.color) next.color.set(style.color);
          if (style.roughness !== undefined) next.roughness = style.roughness;
          if (style.metalness !== undefined) next.metalness = style.metalness;
          if (style.flatShading !== undefined) next.flatShading = style.flatShading;
          if (style.transparent) {
            next.transparent = true;
            next.opacity = style.opacity ?? next.opacity;
          }
          if (style.emissive) {
            next.emissive.set(style.emissive);
            next.emissiveIntensity = style.emissiveIntensity ?? 1;
          }
          next.needsUpdate = true;
        }
        return next;
      });
      mesh.material = Array.isArray(mesh.material) ? styledMaterials : styledMaterials[0];

      const zoneId = classifyMeshToZone(mesh.name);
      list.push({
        mesh,
        materials: styledMaterials,
        zoneId,
        fades: FADES_IN_INTERIOR.has(zoneId),
        restY: mesh.position.y,
        origRaycast: mesh.raycast,
      });
    });

    glowMeshes.current = list;
  }, [model]);

  // Small "lift" applied to the hovered element for a premium, tactile feel — like a card
  // that rises on hover. Scaled to the model so it reads the same at any size.
  const liftAmount = radius * 0.02;

  // Setting the canvas cursor is a DOM side-effect on the renderer's element; the
  // immutability rule flags the `gl` handle from useThree, which this pattern doesn't violate.
  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    gl.domElement.style.cursor = hoverZone ? "pointer" : "grab";
    return () => {
      gl.domElement.style.cursor = "auto";
    };
  }, [hoverZone, gl]);
  /* eslint-enable react-hooks/immutability */

  // Mutating cloned Three.js materials/meshes held in a ref every frame is the standard
  // react-three-fiber pattern (avoids re-render churn); the immutability rule doesn't model it.
  /* eslint-disable react-hooks/immutability */
  useFrame((_, delta) => {
    for (const entry of glowMeshes.current) {
      const activeByZone =
        entry.zoneId !== "autre" && (entry.zoneId === hoverZone || entry.zoneId === selected);
      const activeByMesh = entry.mesh === hoveredMesh.current || entry.mesh === selectedMesh.current;
      const isSelected = entry.zoneId !== "autre" ? entry.zoneId === selected : entry.mesh === selectedMesh.current;
      const active = activeByZone || activeByMesh;
      const targetGlow = active ? (isSelected ? SELECT_GLOW : HOVER_GLOW) : BLACK;
      const targetOpacity = entry.fades && view === "interior" ? 0.08 : 1;

      for (const material of entry.materials) {
        material.emissive.lerp(targetGlow, Math.min(1, delta * 8));
        material.emissiveIntensity = THREE.MathUtils.damp(
          material.emissiveIntensity ?? 0,
          active ? (isSelected ? 0.5 : 0.32) : 0,
          8,
          delta
        );
        if (entry.fades) {
          material.transparent = true;
          material.opacity = THREE.MathUtils.damp(material.opacity, targetOpacity, 5, delta);
        }
      }
      if (entry.fades) {
        entry.mesh.castShadow = targetOpacity > 0.5;
        // Let clicks pass through faded roof/attic elements to reach the interior.
        entry.mesh.raycast = view === "interior" ? NOOP_RAYCAST : entry.origRaycast;
      }

      // Premium hover lift: the hovered zone/element rises slightly, like a card.
      const hoverActive =
        entry.zoneId !== "autre" ? entry.zoneId === hoverZone : entry.mesh === hoveredMesh.current;
      entry.mesh.position.y = THREE.MathUtils.damp(
        entry.mesh.position.y,
        entry.restY + (hoverActive ? liftAmount : 0),
        9,
        delta
      );
    }

    if (autoRotate && !hoverZone && group.current) {
      group.current.rotation.y += delta * 0.06;
    }
  });
  /* eslint-enable react-hooks/immutability */

  useEffect(() => {
    if (!group.current) return;

    if (reducedMotion) {
      group.current.scale.set(1, 1, 1);
      group.current.position.y = 0;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        group.current!.scale,
        { x: 0.86, y: 0.86, z: 0.86 },
        { x: 1, y: 1, z: 1, duration: 1.3, ease: "back.out(1.5)" }
      );
      gsap.fromTo(
        group.current!.position,
        { y: -radius * 0.12 },
        { y: 0, duration: 1.3, ease: "back.out(1.5)" }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion, radius]);

  const toLocal = useCallback((point: THREE.Vector3): [number, number, number] => {
    const local = group.current ? group.current.worldToLocal(point.clone()) : point;
    return [local.x, local.y, local.z];
  }, []);

  const handlePointerMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      const mesh = event.object as THREE.Mesh;
      if (!mesh.isMesh) return;
      const zoneId = classifyMeshToZone(mesh.name);
      hoveredMesh.current = mesh;
      setHoverZone(zoneId);
      setHoverAnchor(toLocal(event.point));
    },
    [toLocal]
  );

  const handlePointerOut = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    hoveredMesh.current = null;
    setHoverZone(null);
    setHoverAnchor(null);
  }, []);

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const mesh = event.object as THREE.Mesh;
      if (!mesh.isMesh) return;
      const zoneId = classifyMeshToZone(mesh.name);
      selectedMesh.current = mesh;
      setSelectAnchor(toLocal(event.point));
      onSelect(zoneId);
    },
    [onSelect, toLocal]
  );

  // When the selection is cleared (e.g. clicking empty space), drop the mesh reference so it
  // stops glowing. The label itself is gated on `selectedLabel` below, so leaving the stale
  // anchor is harmless and avoids a cascading state update here.
  useEffect(() => {
    if (!selected) selectedMesh.current = null;
  }, [selected]);

  const hoverLabel = hoverZone ? HOUSE_ZONE_BY_ID[hoverZone]?.label : null;
  const selectedLabel = selected ? HOUSE_ZONE_BY_ID[selected]?.label : null;

  return (
    <>
      <CameraRig view={view} controlsRef={controlsRef} center={center} radius={radius} />
      <group ref={group}>
        <primitive
          object={model}
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        />

        {/* Lamppost fixture light, placed at the model's real "Lampadaire_source" coordinates. */}
        <pointLight position={[-9.85, 2.9, 6.5]} color="#ffdd7a" intensity={0.7} distance={6} decay={2} />

        {selectAnchor && selectedLabel && (
          <FloatingLabel position={selectAnchor} label={selectedLabel} variant="selected" />
        )}
        {hoverAnchor && hoverLabel && hoverZone !== selected && (
          <FloatingLabel position={hoverAnchor} label={hoverLabel} variant="hover" />
        )}
      </group>
    </>
  );
}

type HouseSceneProps = {
  selected: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
  view?: HouseView;
};

export default function HouseScene({
  selected,
  onSelect,
  reducedMotion,
  view = "exterior",
}: HouseSceneProps) {
  const [interacting, setInteracting] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [22, 16, 26], fov: 35, near: 0.5, far: 200 }}
      gl={{ antialias: true, powerPreference: "low-power" }}
      onPointerMissed={() => onSelect(null)}
    >
      <fog attach="fog" args={["#eef1ea", 34, 95]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[16, 20, 12]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={26}
        shadow-camera-bottom={-26}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-bias={-0.0015}
      />
      <directionalLight position={[-14, 8, -10]} intensity={0.28} color="#dce8ff" />

      <SceneEnvironment />

      <Suspense fallback={<ModelLoader />}>
        <Villa
          selected={selected}
          onSelect={onSelect}
          autoRotate={!reducedMotion && view === "exterior" && !interacting}
          reducedMotion={reducedMotion}
          view={view}
          controlsRef={controlsRef}
        />
      </Suspense>

      <ContactShadows position={[0, -0.05, 0]} opacity={0.4} scale={46} blur={2.2} far={6} />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.38}
        zoomSpeed={0.5}
        minPolarAngle={0.12}
        maxPolarAngle={1.5}
        onStart={() => setInteracting(true)}
        onEnd={() => setInteracting(false)}
      />
    </Canvas>
  );
}
