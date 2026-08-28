"use client";

import Image from "next/image";
import { useState } from "react";
import type { Accessory } from "@/lib/accessories";

// The six accessories carry wildly different amounts of copy: the manifolds are
// one paragraph, the HX 200 is a paragraph plus six bullets plus a spec table.
// Everything past the summary folds away so the grid stays on one line of
// equal-height cards, and "See more" opens the rest in place.
export default function AccessoryCard({
  accessory,
}: {
  accessory: Accessory;
}) {
  const [open, setOpen] = useState(false);

  const { images, details, bullets, specs } = accessory;
  const hero = images[0];
  const rest = images.slice(1);
  const hasMore =
    (details?.length ?? 0) > 0 ||
    (bullets?.length ?? 0) > 0 ||
    (specs?.length ?? 0) > 0 ||
    rest.length > 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] transition hover:border-[color:var(--orange)] hover:shadow-md">
      {/* White plate rather than the grey surface token: most of these are
          studio cutouts on white, and a grey plate framed them as a visible
          white rectangle floating inside the card. The hairline below carries
          the separation the grey used to. */}
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden border-b border-[color:var(--line)] ${
          hero ? "bg-white" : "bg-[var(--surface-2)]"
        }`}
      >
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={
              hero.fit === "cover" ? "object-cover" : "object-contain p-6"
            }
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--ink-faint)]">
            Photo coming soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-[color:var(--ink)]">
          {accessory.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          {accessory.summary}
        </p>

        {hasMore && (
          <div
            id={`${accessory.slug}-details`}
            hidden={!open}
            className="mt-5 border-t border-[color:var(--line)] pt-5"
          >
            {details?.map((p) => (
              <p
                key={p}
                className="mb-3 text-sm leading-relaxed text-[color:var(--ink-dim)] last:mb-0"
              >
                {p}
              </p>
            ))}

            {bullets && bullets.length > 0 && (
              <>
                {accessory.specsTitle && (
                  <p className="tech-label mt-4 text-[color:var(--ink)]">
                    {accessory.specsTitle}
                  </p>
                )}
                <ul className="mt-3 space-y-2">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--ink-dim)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[var(--orange)]"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {specs && specs.length > 0 && (
              <>
                <p className="tech-label mt-6 text-[color:var(--ember)]">
                  Specifications
                </p>
                <dl className="mt-3 overflow-hidden rounded-xl bg-[var(--surface-2)]">
                  {specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:gap-4 ${
                        i % 2 === 1 ? "bg-[var(--surface)]" : ""
                      }`}
                    >
                      <dt className="tech-label w-40 shrink-0 text-[color:var(--ink)]">
                        {s.label}
                      </dt>
                      <dd className="text-sm text-[color:var(--ink-dim)]">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            {rest.length > 0 && (
              <div className="mt-5 grid gap-3 grid-cols-2">
                {rest.map((img) => (
                  <figure key={img.src}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[color:var(--line)] bg-white">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 20vw"
                        className={
                          img.fit === "cover"
                            ? "object-cover"
                            : "object-contain p-3"
                        }
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-1.5 text-center text-[0.7rem] text-[color:var(--ink-faint)]">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${accessory.slug}-details`}
            className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[color:var(--orange)] transition hover:opacity-80"
          >
            {open ? "See less" : "See more"}
            <span
              aria-hidden
              className={`text-[0.6rem] transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            >
              &#9660;
            </span>
          </button>
        )}
      </div>
    </div>
  );
}