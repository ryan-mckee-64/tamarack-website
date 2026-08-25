"use client";

import { Component, Suspense, useMemo } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Html,
  useProgress,
  useGLTF,
} from "@react-three/drei";
import type { Hotspot, UpAxis } from "@/lib/models";

// The machine is scaled to fit inside a box this many world units tall or
// wide, whichever is larger. Every model therefore arrives on screen at a
// predictable size no matter what units the CAD package exported in.
const TARGET_SIZE = 3.4;

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

/**
 * Renders a glTF or GLB file, centred on the origin and sitting on the
 * ground plane. CAD exports come out in millimetres, off centre, and often
 * with Z pointing up, so none of this can be assumed correct in the file.
 */
function LoadedModel({ url, upAxis }: { url: string; upAxis: UpAxis }) {
  const { scene } = useGLTF(url, "/draco/");

  const { object, scale, offset } = useMemo(() => {
    // Clone so the cached original is never mutated. The same file may be
    // shown twice on a page, or remounted when the viewer is reset.
    const clone = scene.clone(true);

    if (upAxis === "z-up") {
      clone.rotation.x = -Math.PI / 2;
      clone.updateMatrixWorld(true);
    }

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const longestAxis = Math.max(size.x, size.y, size.z) || 1;

    return {
      object: clone,
      scale: TARGET_SIZE / longestAxis,
      // Centred left to right and front to back, resting on y = 0.
      offset: [-centre.x, -box.min.y, -centre.z] as [number, number, number],
    };
  }, [scene, upAxis]);

  // The offset sits on the inner object and the scale on the outer group, so
  // the two never multiply into each other.
  return (
    <group scale={scale}>
      <primitive object={object} position={offset} />
    </group>
  );
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

      <mesh position={[0.6, 1.75, 0]} castShadow>
        <boxGeometry args={[1.4, 0.7, 1.3]} />
        <meshStandardMaterial color={dark} roughness={0.6} />
      </mesh>

      <mesh position={[-1.35, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.9, 32]} />
        <meshStandardMaterial color={grey} roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh position={[0, 0.3, 0.85]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.28, 24]} />
        <meshStandardMaterial color={dark} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.3, -0.85]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.28, 24]} />
        <meshStandardMaterial color={dark} roughness={0.8} />
      </mesh>

      <mesh position={[-1.9, 0.55, 0]} castShadow>
        <boxGeometry args={[0.9, 0.14, 0.14]} />
        <meshStandardMaterial color={grey} metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * A missing or corrupt model file must not take the page down with it. If the
 * GLB fails to load the viewer quietly shows the placeholder machine instead,
 * so the rest of the page, including the component list, keeps working.
 */
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode; onError?: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D model failed to load", error);
    // Let the viewer label the fallback, so a missing file is never passed
    // off to a visitor as the real machine.
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
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
  upAxis = "y-up",
  autoRotate,
  hotspots,
  showHotspots,
  selectedId,
  onSelect,
  onLoadError,
}: {
  modelUrl: string | null;
  upAxis?: UpAxis;
  autoRotate: boolean;
  hotspots: Hotspot[];
  showHotspots: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onLoadError?: () => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [5, 3, 6], fov: 45 }}
      style={{ touchAction: "none" }}
    >
      <color attach="background" args={["#f6f4f0"]} />

      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#ffffff", "#c9c2b8", 0.7]} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} />

      <ModelErrorBoundary fallback={<PlaceholderMachine />} onError={onLoadError}>
        <Suspense fallback={<LoadingIndicator />}>
          <group>
            {modelUrl ? (
              <LoadedModel url={modelUrl} upAxis={upAxis} />
            ) : (
              <PlaceholderMachine />
            )}

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
      </ModelErrorBoundary>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.45}
        scale={12}
        blur={2.4}
        far={5}
      />

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
        makeDefault
        enablePan
        enableZoom
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
