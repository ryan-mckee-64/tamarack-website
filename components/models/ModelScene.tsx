"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, useGLTF } from "@react-three/drei";
import type { Hotspot } from "@/lib/models";

function LoadingIndicator() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm text-[color:var(--ink-dim)] shadow">
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

function HotspotMarker({
  hotspot,
  index,
  selected,
  onSelect,
}: {
  hotspot: Hotspot;
  index: number;
  selected: boolean;
  onSelect: (id: string | null) => void;
}) {
  return (
    <Html position={hotspot.position} center zIndexRange={[20, 0]}>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onSelect(selected ? null : hotspot.id)}
        aria-label={hotspot.label}
        className={
          selected
            ? "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[var(--orange)] text-sm font-bold text-white shadow-lg ring-4 ring-[var(--orange-tint-2)] transition"
            : "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[var(--ember)] text-sm font-bold text-white shadow-lg transition hover:scale-110 hover:bg-[var(--orange)]"
        }
      >
        {index + 1}
      </button>
    </Html>
  );
}

export default function ModelScene({
  modelUrl,
  autoRotate,
  hotspots,
  showHotspots,
  selectedId,
  onSelect,
}: {
  modelUrl: string | null;
  autoRotate: boolean;
  hotspots: Hotspot[];
  showHotspots: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
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
        <group>
          {modelUrl ? <LoadedModel url={modelUrl} /> : <PlaceholderMachine />}

          {showHotspots &&
            hotspots.map((h, i) => (
              <HotspotMarker
                key={h.id}
                hotspot={h}
                index={i}
                selected={selectedId === h.id}
                onSelect={onSelect}
              />
            ))}
        </group>
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