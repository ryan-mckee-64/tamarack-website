"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ModelScene = dynamic(() => import("./ModelScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[var(--surface-2)]">
      <p className="text-sm text-[color:var(--ink-dim)]">Preparing viewer</p>
    </div>
  ),
});

export default function ModelViewer({
  modelUrl,
  isPlaceholder,
}: {
  modelUrl: string | null;
  isPlaceholder: boolean;
}) {
  const [autoRotate, setAutoRotate] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);

  return (
    <div>
      <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[var(--surface-2)]">
        <ModelScene key={sceneKey} modelUrl={modelUrl} autoRotate={autoRotate} />

        {isPlaceholder && (
          <div className="pointer-events-none absolute left-5 top-5 rounded-lg bg-[var(--bg-85)] px-4 py-2 shadow-sm backdrop-blur-md">
            <p className="tech-label text-[color:var(--ember)]">
              Placeholder geometry
            </p>
            <p className="mt-1 text-xs text-[color:var(--ink-dim)]">
              Drag to rotate. The real model will behave the same way.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="rounded-lg bg-[var(--surface-2)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[var(--orange-tint)]"
        >
          {autoRotate ? "Stop rotation" : "Rotate automatically"}
        </button>
        <button
          onClick={() => setSceneKey((k) => k + 1)}
          className="rounded-lg bg-[var(--surface-2)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[var(--orange-tint)]"
        >
          Reset view
        </button>
        <p className="text-sm text-[color:var(--ink-dim)]">
          Drag to rotate, scroll to zoom, right click to pan
        </p>
      </div>
    </div>
  );
}