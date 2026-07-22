"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Hotspot } from "@/lib/models";

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
  hotspots,
  manualHref,
}: {
  modelUrl: string | null;
  isPlaceholder: boolean;
  hotspots: Hotspot[];
  manualHref: string;
}) {
  const [autoRotate, setAutoRotate] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sceneKey, setSceneKey] = useState(0);

  const selected = hotspots.find((h) => h.id === selectedId) ?? null;
  const hasHotspots = hotspots.length > 0;

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[var(--surface-2)]">
          <ModelScene
            key={sceneKey}
            modelUrl={modelUrl}
            autoRotate={autoRotate}
            hotspots={hotspots}
            showHotspots={showHotspots}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

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

        <aside className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-6">
          {selected ? (
            <div>
              <p className="tech-label text-[color:var(--ember)]">
                Component detail
              </p>
              <h3 className="font-display mt-2 text-xl font-bold tracking-[-0.01em] text-[color:var(--ink)]">
                {selected.label}
              </h3>

              {selected.partNumber && (
                <p className="mt-2 text-sm font-semibold text-[color:var(--orange)]">
                  Part {selected.partNumber}
                </p>
              )}

              {selected.description && (
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  {selected.description}
                </p>
              )}

              {selected.specs && selected.specs.length > 0 && (
                <dl className="mt-5 divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
                  {selected.specs.map((s) => (
                    <div key={s.label} className="py-3">
                      <dt className="tech-label text-[color:var(--ink-dim)]">
                        {s.label}
                      </dt>
                      <dd className="mt-1 text-sm text-[color:var(--ink)]">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <Link
                href={manualHref}
                className="mt-6 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
              >
                Find this part in the parts manual
              </Link>

              <button
                onClick={() => setSelectedId(null)}
                className="mt-6 block text-sm font-semibold text-[color:var(--ink-dim)] underline underline-offset-4"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <p className="tech-label text-[color:var(--ember)]">
                Component detail
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                {hasHotspots
                  ? "Select a numbered marker on the machine to see the component, its part number and its specifications."
                  : "Component details have not been added for this machine yet."}
              </p>

              {hasHotspots && (
                <ul className="mt-5 space-y-2 border-t border-[color:var(--line)] pt-5">
                  {hotspots.map((h, i) => (
                    <li key={h.id}>
                      <button
                        onClick={() => setSelectedId(h.id)}
                        className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-[var(--orange-tint)]"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--ember)] text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm text-[color:var(--ink)]">
                          {h.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </aside>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="rounded-lg bg-[var(--surface-2)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[var(--orange-tint)]"
        >
          {autoRotate ? "Stop rotation" : "Rotate automatically"}
        </button>

        {hasHotspots && (
          <button
            onClick={() => setShowHotspots((v) => !v)}
            className="rounded-lg bg-[var(--surface-2)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[var(--orange-tint)]"
          >
            {showHotspots ? "Hide markers" : "Show markers"}
          </button>
        )}

        <button
          onClick={() => {
            setSceneKey((k) => k + 1);
            setSelectedId(null);
          }}
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