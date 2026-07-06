"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree, type ThreeElements, type ThreeEvent } from "@react-three/fiber";
import { Html, OrbitControls, ContactShadows, Environment, Lightformer } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import gsap from "gsap";
import * as THREE from "three";
import { houseZones } from "@/data/zones";
import type { HouseZoneId } from "@/types";

export type HouseView = "exterior" | "interior";

const CAMERA_EXTERIOR: [number, number, number] = [7.9, 5.2, 8.9];
const CAMERA_INTERIOR: [number, number, number] = [4.6, 10.8, 5.3];

const PALETTE = {
  plinth: "#12201a",
  render: "#eeeae0",
  stonePier: "#2b2f2a",
  slab: "#182a1f",
  wood: "#7a5230",
  woodDark: "#5c3d22",
  facia: "#13281c",
  roof: "#0c1a13",
  parapet: "#0a1610",
  garage: "#e9e5d8",
  garageDoor: "#252f27",
  garageGroove: "#181f1a",
  glass: "#2e484a",
  glassWarm: "#3a3020",
  mullion: "#171e19",
  door: "#1b1d18",
  balustrade: "#89ad9f",
  lawnOuter: "#7c9a49",
  lawnInner: "#8cae55",
  path: "#dad5c5",
  terrace: "#c9c3ae",
  hedge: "#4c6832",
  hedgeDark: "#3d5629",
  trunk: "#4a3728",
  canopy: "#3f6b3d",
  lampPole: "#20241f",
  lampGlow: "#ffdd7a",
};

const HOVER_GLOW = "#f5c433";

type ZoneMeshProps = {
  zoneId: HouseZoneId;
  color: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  roughness?: number;
  metalness?: number;
  hovered: HouseZoneId | null;
  selected: HouseZoneId | null;
  onHover: (id: HouseZoneId | null) => void;
  onSelect: (id: HouseZoneId) => void;
  view?: HouseView;
  fadeInInterior?: boolean;
  children: ReactNode;
};

function ZoneMesh({
  zoneId,
  color,
  position,
  rotation,
  roughness = 0.75,
  metalness = 0.05,
  hovered,
  selected,
  onHover,
  onSelect,
  view = "exterior",
  fadeInInterior = false,
  children,
}: ZoneMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const isActive = hovered === zoneId || selected === zoneId;
  const isHiddenForInterior = fadeInInterior && view === "interior";

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.damp(
        materialRef.current.emissiveIntensity,
        isActive ? 0.14 : 0,
        6,
        delta
      );
      if (fadeInInterior) {
        materialRef.current.opacity = THREE.MathUtils.damp(
          materialRef.current.opacity,
          isHiddenForInterior ? 0.08 : 1,
          5,
          delta
        );
      }
    }
    if (meshRef.current) {
      const targetScale = isActive ? 1.018 : 1;
      meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 7, delta);
      meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetScale, 7, delta);
      meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, targetScale, 7, delta);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      castShadow={!isHiddenForInterior}
      receiveShadow
      onPointerOver={(event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        onHover(zoneId);
      }}
      onPointerOut={(event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        onHover(null);
      }}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        onSelect(zoneId);
      }}
    >
      {children}
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        roughness={roughness}
        metalness={metalness}
        flatShading
        transparent={fadeInInterior}
        emissive={HOVER_GLOW}
        emissiveIntensity={0}
      />
    </mesh>
  );
}

function Prop({
  children,
  ...props
}: { children: ReactNode } & ThreeElements["mesh"]) {
  return (
    <mesh raycast={() => null} {...props}>
      {children}
    </mesh>
  );
}

/** A decorative (non-interactive) prop that fades out alongside the roof in interior view. */
function FadingProp({
  view,
  position,
  color,
  roughness = 0.6,
  metalness = 0,
  children,
}: {
  view: HouseView;
  position: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
  children: ReactNode;
}) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.opacity = THREE.MathUtils.damp(
      materialRef.current.opacity,
      view === "interior" ? 0.08 : 1,
      5,
      delta
    );
  });

  return (
    <mesh raycast={() => null} position={position}>
      {children}
      <meshStandardMaterial ref={materialRef} color={color} roughness={roughness} metalness={metalness} transparent />
    </mesh>
  );
}

function HotspotDot({
  zoneId,
  position,
  label,
  active,
  onHover,
  onSelect,
}: {
  zoneId: HouseZoneId;
  position: [number, number, number];
  label: string;
  active: boolean;
  onHover: (id: HouseZoneId | null) => void;
  onSelect: (id: HouseZoneId) => void;
}) {
  return (
    <Html position={position} center distanceFactor={9} zIndexRange={[10, 0]}>
      <button
        type="button"
        onClick={() => onSelect(zoneId)}
        onMouseEnter={() => onHover(zoneId)}
        onMouseLeave={() => onHover(null)}
        className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-medium whitespace-nowrap shadow-sm transition-all duration-200 ${
          active
            ? "scale-105 border-accent bg-accent text-accent-foreground"
            : "border-border bg-background/90 text-foreground hover:border-secondary/50"
        }`}
      >
        <span className={`size-1.5 rounded-full ${active ? "bg-accent-foreground" : "bg-accent"}`} />
        {label}
      </button>
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

function CameraRig({
  view,
  controlsRef,
}: {
  view: HouseView;
  controlsRef: RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(...CAMERA_EXTERIOR));

  useEffect(() => {
    target.current.set(...(view === "interior" ? CAMERA_INTERIOR : CAMERA_EXTERIOR));
  }, [view]);

  // Mutating the camera transform in-place every frame is the standard react-three-fiber
  // pattern (avoids re-render churn); the immutability rule doesn't model this paradigm.
  /* eslint-disable react-hooks/immutability */
  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x, 2.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.current.y, 2.6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.current.z, 2.6, delta);
    controlsRef.current?.update();
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}

function House({
  hovered,
  selected,
  onHover,
  onSelect,
  autoRotate,
  reducedMotion,
  view,
}: {
  hovered: HouseZoneId | null;
  selected: HouseZoneId | null;
  onHover: (id: HouseZoneId | null) => void;
  onSelect: (id: HouseZoneId) => void;
  autoRotate: boolean;
  reducedMotion: boolean;
  view: HouseView;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!autoRotate || hovered || !group.current) return;
    group.current.rotation.y += delta * 0.12;
  });

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
        { x: 0.82, y: 0.82, z: 0.82 },
        { x: 1, y: 1, z: 1, duration: 1.3, ease: "back.out(1.5)" }
      );
      gsap.fromTo(
        group.current!.position,
        { y: -0.6 },
        { y: 0, duration: 1.3, ease: "back.out(1.5)" }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  const zoneProps = { hovered, selected, onHover, onSelect, view };

  return (
    <group ref={group}>
      {/* jardin — pelouse + terrasse */}
      <ZoneMesh
        zoneId="jardin"
        color={PALETTE.lawnOuter}
        position={[0, -0.61, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        roughness={1}
        metalness={0}
        {...zoneProps}
      >
        <circleGeometry args={[5.4, 40]} />
      </ZoneMesh>
      <Prop position={[-0.3, -0.598, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 32]} />
        <meshStandardMaterial color={PALETTE.lawnInner} roughness={1} />
      </Prop>
      <Prop position={[-3.15, -0.595, -0.9]}>
        <boxGeometry args={[1.7, 0.02, 2.6]} />
        <meshStandardMaterial color={PALETTE.terrace} roughness={0.85} />
      </Prop>
      {/* haie basse en bordure */}
      {[-1.6, -0.6, 0.4, 1.4].map((x) => (
        <Prop key={x} position={[x, -0.44, 3.55]} scale={[1, 0.4, 1]}>
          <sphereGeometry args={[0.42, 10, 8]} />
          <meshStandardMaterial color={PALETTE.hedgeDark} roughness={0.95} flatShading />
        </Prop>
      ))}

      {/* soubassement + garage — cave */}
      <ZoneMesh
        zoneId="cave"
        color={PALETTE.plinth}
        position={[-0.2, -0.3, 0]}
        roughness={0.9}
        {...zoneProps}
      >
        <boxGeometry args={[4.4, 0.6, 3.4]} />
      </ZoneMesh>
      <ZoneMesh
        zoneId="cave"
        color={PALETTE.garage}
        position={[2.85, 0.675, 0.4]}
        roughness={0.6}
        {...zoneProps}
      >
        <boxGeometry args={[1.7, 1.35, 2.4]} />
      </ZoneMesh>
      <Prop position={[2.85, 0.6, 1.61]}>
        <boxGeometry args={[1.3, 1.05, 0.04]} />
        <meshStandardMaterial color={PALETTE.garageDoor} roughness={0.5} metalness={0.25} />
      </Prop>
      {[-0.28, 0, 0.28].map((y) => (
        <Prop key={y} position={[2.85, 0.6 + y, 1.635]}>
          <boxGeometry args={[1.28, 0.02, 0.01]} />
          <meshStandardMaterial color={PALETTE.garageGroove} roughness={0.6} />
        </Prop>
      ))}

      {/* rez-de-chaussée — cuisine */}
      <ZoneMesh
        zoneId="cuisine"
        color={PALETTE.render}
        position={[-0.2, 0.8, 0]}
        roughness={0.5}
        {...zoneProps}
      >
        <boxGeometry args={[4, 1.6, 3]} />
      </ZoneMesh>
      {/* pilier d'accent pierre près de l'entrée */}
      <Prop position={[1.0, 0.8, 1.56]}>
        <boxGeometry args={[0.32, 1.62, 0.1]} />
        <meshStandardMaterial color={PALETTE.stonePier} roughness={0.8} />
      </Prop>
      <Prop position={[-0.9, 0.85, 1.53]}>
        <boxGeometry args={[2.2, 0.85, 0.05]} />
        <meshPhysicalMaterial
          color={PALETTE.glass}
          roughness={0.05}
          metalness={0.4}
          transparent
          opacity={0.62}
          emissive={PALETTE.glassWarm}
          emissiveIntensity={0.12}
        />
      </Prop>
      <Prop position={[-0.9, 0.85, 1.555]}>
        <boxGeometry args={[0.03, 0.85, 0.02]} />
        <meshStandardMaterial color={PALETTE.mullion} roughness={0.5} metalness={0.3} />
      </Prop>
      <Prop position={[1.35, 0.56, 1.53]}>
        <boxGeometry args={[0.55, 1.12, 0.05]} />
        <meshStandardMaterial color={PALETTE.door} roughness={0.45} metalness={0.2} />
      </Prop>
      {/* auvent d'entrée */}
      <Prop position={[1.35, 1.42, 1.85]}>
        <boxGeometry args={[0.9, 0.05, 0.7]} />
        <meshStandardMaterial color={PALETTE.parapet} roughness={0.5} metalness={0.2} />
      </Prop>
      <Prop position={[1.65, 1.05, 2.1]}>
        <cylinderGeometry args={[0.035, 0.035, 0.75, 8]} />
        <meshStandardMaterial color={PALETTE.mullion} roughness={0.4} metalness={0.5} />
      </Prop>

      {/* liseré de dalle */}
      <Prop position={[-0.2, 1.66, 0]}>
        <boxGeometry args={[4.05, 0.12, 3.05]} />
        <meshStandardMaterial color={PALETTE.slab} roughness={0.6} />
      </Prop>

      {/* garde-corps de la terrasse */}
      <Prop position={[-0.2, 1.9, 1.02]}>
        <boxGeometry args={[3.1, 0.34, 0.05]} />
        <meshPhysicalMaterial
          color={PALETTE.balustrade}
          roughness={0.08}
          metalness={0.15}
          transparent
          opacity={0.4}
        />
      </Prop>

      {/* étage bois — fait partie de la zone cuisine */}
      <ZoneMesh
        zoneId="cuisine"
        color={PALETTE.wood}
        position={[-0.2, 2.37, -0.1]}
        roughness={0.55}
        {...zoneProps}
      >
        <boxGeometry args={[3.2, 1.3, 2.3]} />
      </ZoneMesh>
      {[1.97, 2.37, 2.77].map((y) => (
        <Prop key={y} position={[-0.2, y, 1.056]}>
          <boxGeometry args={[3.2, 0.015, 0.01]} />
          <meshStandardMaterial color={PALETTE.woodDark} roughness={0.7} />
        </Prop>
      ))}
      <Prop position={[-0.2, 2.4, 1.06]}>
        <boxGeometry args={[1.9, 0.6, 0.05]} />
        <meshPhysicalMaterial
          color={PALETTE.glass}
          roughness={0.05}
          metalness={0.4}
          transparent
          opacity={0.62}
          emissive={PALETTE.glassWarm}
          emissiveIntensity={0.12}
        />
      </Prop>
      <Prop position={[-0.2, 2.4, 1.085]}>
        <boxGeometry args={[0.03, 0.6, 0.02]} />
        <meshStandardMaterial color={PALETTE.mullion} roughness={0.5} metalness={0.3} />
      </Prop>

      {/* combles */}
      <ZoneMesh
        zoneId="combles"
        color={PALETTE.facia}
        position={[-0.2, 3.16, -0.1]}
        roughness={0.65}
        fadeInInterior
        {...zoneProps}
      >
        <boxGeometry args={[3.4, 0.28, 2.5]} />
      </ZoneMesh>

      {/* toiture */}
      <ZoneMesh
        zoneId="toiture"
        color={PALETTE.roof}
        position={[-0.2, 3.38, -0.1]}
        roughness={0.45}
        metalness={0.2}
        fadeInInterior
        {...zoneProps}
      >
        <boxGeometry args={[3.7, 0.16, 2.7]} />
      </ZoneMesh>
      <FadingProp view={view} position={[-0.2, 3.55, -0.1]} color={PALETTE.parapet} roughness={0.5} metalness={0.15}>
        <boxGeometry args={[3.3, 0.16, 2.3]} />
      </FadingProp>
      <FadingProp view={view} position={[0.7, 3.78, -0.6]} color={PALETTE.facia} roughness={0.6}>
        <boxGeometry args={[0.7, 0.32, 0.6]} />
      </FadingProp>

      {/* allée */}
      {[0.35, 0.95, 1.55, 2.15].map((z, i) => (
        <Prop key={z} position={[-1.0 + (i % 2 === 0 ? 0.05 : -0.08), -0.585, z + 1.3]}>
          <boxGeometry args={[0.42, 0.04, 0.3]} />
          <meshStandardMaterial color={PALETTE.path} roughness={0.9} />
        </Prop>
      ))}

      {/* haies d'accompagnement */}
      <Prop position={[-2.1, -0.35, 1.85]} scale={[1, 0.6, 1]}>
        <sphereGeometry args={[0.4, 12, 10]} />
        <meshStandardMaterial color={PALETTE.hedge} roughness={0.95} flatShading />
      </Prop>
      <Prop position={[-2.35, -0.35, 1.15]} scale={[1, 0.55, 1]}>
        <sphereGeometry args={[0.34, 12, 10]} />
        <meshStandardMaterial color={PALETTE.hedge} roughness={0.95} flatShading />
      </Prop>
      <Prop position={[1.95, -0.35, 1.75]} scale={[1, 0.6, 1]}>
        <sphereGeometry args={[0.38, 12, 10]} />
        <meshStandardMaterial color={PALETTE.hedge} roughness={0.95} flatShading />
      </Prop>

      {/* arbres */}
      <group position={[-3.7, -0.6, 2.3]}>
        <Prop position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.7, 8]} />
          <meshStandardMaterial color={PALETTE.trunk} roughness={0.9} />
        </Prop>
        <Prop position={[0, 0.95, 0]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color={PALETTE.canopy} roughness={0.9} flatShading />
        </Prop>
      </group>
      <group position={[3.9, -0.6, -1.6]}>
        <Prop position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.6, 8]} />
          <meshStandardMaterial color={PALETTE.trunk} roughness={0.9} />
        </Prop>
        <Prop position={[0, 0.82, 0]}>
          <icosahedronGeometry args={[0.46, 0]} />
          <meshStandardMaterial color={PALETTE.canopy} roughness={0.9} flatShading />
        </Prop>
      </group>

      {/* lampadaire d'allée */}
      <group position={[-2.3, -0.6, 3.05]}>
        <Prop position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 8]} />
          <meshStandardMaterial color={PALETTE.lampPole} roughness={0.6} metalness={0.4} />
        </Prop>
        <Prop position={[0, 0.92, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={PALETTE.lampGlow}
            emissive={PALETTE.lampGlow}
            emissiveIntensity={0.9}
          />
        </Prop>
        <pointLight
          position={[0, 0.92, 0]}
          color={PALETTE.lampGlow}
          intensity={0.6}
          distance={2.4}
          decay={2}
        />
      </group>

      {/* éclairage d'accentuation de façade */}
      <pointLight position={[1.2, 0.1, 1.9]} color="#ffdf9e" intensity={0.35} distance={2.2} decay={2} />
      <pointLight position={[-1.2, 0.1, 1.9]} color="#ffdf9e" intensity={0.25} distance={2} decay={2} />

      {houseZones.map((zone) => (
        <HotspotDot
          key={zone.id}
          zoneId={zone.id}
          position={zone.position}
          label={zone.label}
          active={hovered === zone.id || selected === zone.id}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

type HouseSceneProps = {
  selected: HouseZoneId | null;
  onSelect: (id: HouseZoneId) => void;
  reducedMotion: boolean;
  view?: HouseView;
};

export default function HouseScene({
  selected,
  onSelect,
  reducedMotion,
  view = "exterior",
}: HouseSceneProps) {
  const [hovered, setHovered] = useState<HouseZoneId | null>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: CAMERA_EXTERIOR, fov: 35 }}
      gl={{ antialias: true, powerPreference: "low-power" }}
    >
      <fog attach="fog" args={["#eef1ea", 14, 26]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 7, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-bias={-0.0015}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.28} color="#dce8ff" />

      <SceneEnvironment />

      <CameraRig view={view} controlsRef={controlsRef} />

      <House
        hovered={hovered}
        selected={selected}
        onHover={setHovered}
        onSelect={onSelect}
        autoRotate={!reducedMotion && view === "exterior"}
        reducedMotion={reducedMotion}
        view={view}
      />

      <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={12} blur={2.2} far={2.5} />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        minPolarAngle={view === "interior" ? 0.2 : Math.PI / 3.6}
        maxPolarAngle={view === "interior" ? Math.PI / 2.5 : Math.PI / 2.15}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
