"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type ModelTuning = {
  /** Fine size multiplier around the shared normalized size (1 = same as others). */
  scale?: number;
  /** Vertical nudge, in normalized units, to visually re-center the model. */
  offsetY?: number;
  /** Stand a model upright / fix its axis, in radians. */
  rotationX?: number;
  /** Choose the resting facing angle, in radians. */
  rotationY?: number;
};

// Normalizes ANY .glb to a shared on-screen size: recenters it on its bounding SPHERE and
// scales that sphere to radius 1. Because a sphere's projection is rotation-invariant, every
// model ends up the same size with the same margin and can never be clipped while spinning.
function NormalizedModel({
  url,
  scale = 1,
  offsetY = 0,
  rotationX = 0,
  rotationY = 0,
}: { url: string } & ModelTuning) {
  const { scene } = useGLTF(url, "/draco/");

  const { center, radius } = useMemo(() => {
    scene.updateMatrixWorld(true);
    const sphere = new THREE.Box3().setFromObject(scene).getBoundingSphere(new THREE.Sphere());
    return { center: sphere.center.clone(), radius: sphere.radius || 1 };
  }, [scene]);

  const s = (1 / radius) * scale;

  return (
    // Model sits on the Y axis (x = z = 0) so the camera's turntable stays perfectly centered.
    <group position={[0, offsetY, 0]}>
      <group scale={s}>
        <group rotation={[rotationX, rotationY, 0]}>
          <primitive object={scene} position={[-center.x, -center.y, -center.z]} />
        </group>
      </group>
    </group>
  );
}

// Skeleton shimmer plutôt qu'un spinner : "ça arrive" au lieu de "ça rame" —
// important pour les GLB lourds sur connexion mobile.
function LoadingSkeleton() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-20 w-28 animate-pulse rounded-[2rem] bg-secondary/15" />
        <div className="h-2 w-16 animate-pulse rounded-full bg-secondary/10" />
      </div>
    </Html>
  );
}

export default function PestModelViewer({ url, ...tuning }: { url: string } & ModelTuning) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.28, 4.2], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 8, 6]} intensity={1.7} />
      <directionalLight position={[-6, 3, -5]} intensity={0.5} color="#dce8ff" />
      <hemisphereLight args={["#ffffff", "#7c9443", 0.5]} />

      <Suspense fallback={<LoadingSkeleton />}>
        <NormalizedModel url={url} {...tuning} />
        {/* Ombre de contact : ancre le modèle "en studio" au lieu de le laisser
            flotter. Modèles normalisés sur une sphère de rayon 1 → sol à -1.12. */}
        <ContactShadows
          position={[0, -1.12, 0]}
          opacity={0.35}
          scale={4.5}
          blur={2.6}
          far={2.2}
          resolution={256}
          color="#12250f"
        />
      </Suspense>

      <OrbitControls
        makeDefault
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.1}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={0.45}
        maxPolarAngle={Math.PI / 2 + 0.35}
      />
    </Canvas>
  );
}
