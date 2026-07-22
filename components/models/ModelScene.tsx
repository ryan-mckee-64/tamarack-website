"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Html, useProgress, useGLTF } from "@react-three/drei";

function LoadingIndicator() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm text-[#5c5650] shadow">
        Loading model, {Math.round(progress)} percent
      </div>
    </Html>
  );
}

function LoadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function PlaceholderMachine() {
const red = "#a91f2e";
  const grey = "#6b6b6b";
  const dark = "#333333";

  return (
    <group>
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[3.2, 1.1, 1.6]} />
        <meshStandardMaterial color={red} roughness={0.45} metalness={0.15} />
      </mesh>

      <mesh position={[0.6, 1.75, 0]}>
        <boxGeometry args={[1.4, 0.7, 1.3]} />
        <meshStandardMaterial color={dark} roughness={0.6} />
      </mesh>

      <mesh position={[-1.35, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.9, 32]} />
        <meshStandardMaterial color={grey} roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh position={[0, 0.3, 0.85]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.28, 24]} />
        <meshStandardMaterial color={dark} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.3, -0.85]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.28, 24]} />
        <meshStandardMaterial color={dark} roughness={0.8} />
      </mesh>

      <mesh position={[-1.9, 0.55, 0]}>
        <boxGeometry args={[0.9, 0.14, 0.14]} />
        <meshStandardMaterial color={grey} metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function ModelScene({
  modelUrl,
  autoRotate,
}: {
  modelUrl: string | null;
  autoRotate: boolean;
}) {
  const controlsRef = useRef<any>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [5, 3, 6], fov: 45 }}
      style={{ touchAction: "none" }}
    >
      <color attach="background" args={["#f6f4f0"]} />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} />

      <Suspense fallback={<LoadingIndicator />}>
        <Center>
          {modelUrl ? <LoadedModel url={modelUrl} /> : <PlaceholderMachine />}
        </Center>
      </Suspense>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        receiveShadow
      >
        <circleGeometry args={[7, 48]} />
        <meshStandardMaterial color="#e6e2de" roughness={1} />
      </mesh>

      <gridHelper args={[14, 14, "#d6d1cb", "#e2ded9"]} position={[0, 0, 0]} />

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableDamping
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={16}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
      />
    </Canvas>
  );
}