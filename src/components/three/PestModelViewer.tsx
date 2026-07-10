"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
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

function LoadingSpinner() {
  return (
    <Html center>
      <div className="size-8 animate-spin rounded-full border-2 border-secondary/30 border-t-secondary" />
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

      <Suspense fallback={<LoadingSpinner />}>
        <NormalizedModel url={url} {...tuning} />
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
