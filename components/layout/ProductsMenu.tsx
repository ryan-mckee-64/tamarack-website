"use client";

import Image from "next/image";
import Link from "next/link";
import { productLines } from "@/lib/product-lines";

export default function ProductsMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
            className={`absolute left-1/2 top-full z-50 w-[540px] -translate-x-1/2 transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="mt-2 rounded-2xl border border-[color:var(--line)] bg-white p-6 shadow-xl">
        {/* Columns rather than a grid: a 2 column grid ties each row to its
            tallest cell, which left a dead gap under Heat King next to the
            much longer Thawzall list. Columns balance on height instead. */}
        <div className="columns-2 gap-x-7 [column-fill:balance]">
          {productLines.map((line) => (
            <div key={line.slug} className="mb-5 break-inside-avoid last:mb-0">
              <Link
                href={`/products/${line.slug}`}
                onClick={onNavigate}
                className="group block"
              >
                                {line.logo && line.logoStyle !== "badge" ? (
                  // logoZoom scales the wordmark off the 1.5rem baseline, so
                  // marks that carry extra empty margin in the file (Heat King,
                  // Thawzall) still read at the same visual size as the rest.
                  <Image
                    src={line.logo}
                    alt={line.name}
                    width={400}
                    height={100}
                    className="w-auto transition-opacity group-hover:opacity-75"
                    style={{ height: `${1.5 * (line.logoZoom ?? 1)}rem` }}
                  />
                ) : (
                  <p className="font-display flex h-6 items-center text-[0.95rem] font-extrabold tracking-[-0.02em] text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                    {line.name}
                  </p>
                )}
                <p className="mt-1 flex items-center gap-2 text-[0.68rem] text-[color:var(--ink-faint)]">
                  {line.category}
                  {line.comingSoon && (
                    <span className="shrink-0 rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[0.6rem] font-semibold text-[color:var(--ink-faint)]">
                      Coming soon
                    </span>
                  )}
                </p>
              </Link>

              <ul className="mt-2">
                {line.models.map((model) => (
                  <li key={model.slug}>
                                        <Link
                      href={`/products/${line.slug}/${model.slug}`}
                      onClick={onNavigate}
                      className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[0.8rem] text-[color:var(--ink-dim)] transition hover:bg-[var(--surface-2)] hover:text-[color:var(--ink)]"
                    >
                      {model.name}
                      {model.comingSoon && (
                        <span className="rounded-full bg-[var(--surface-2)] px-1.5 py-0.5 text-[0.6rem] font-semibold text-[color:var(--ink-faint)]">
                          Coming soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                {line.hasAccessories && (
                  <li>
                    <Link
                      href={`/products/${line.slug}#accessories`}
                      onClick={onNavigate}
                      className="block rounded-md px-1.5 py-1 text-[0.8rem] text-[color:var(--ink-dim)] transition hover:bg-[var(--surface-2)] hover:text-[color:var(--ink)]"
                    >
                      Accessories
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-[color:var(--line)] pt-3.5">
          <Link
            href="/products"
            onClick={onNavigate}
            className="text-[0.8rem] font-semibold text-[color:var(--orange)] underline underline-offset-4"
          >
            View all product lines
          </Link>
        </div>
      </div>
    </div>
  );
}
