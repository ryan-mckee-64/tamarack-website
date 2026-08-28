"use client";

import Image from "next/image";
import Link from "next/link";
import { visibleProductLines, visibleModels, type ProductLine } from "@/lib/product-lines";

function ComingSoon() {
  return (
    <span className="shrink-0 rounded-full bg-[var(--surface-2)] px-1.5 py-0.5 text-[0.6rem] font-semibold text-[color:var(--ink-faint)]">
      Coming soon
    </span>
  );
}

// Models render in one flat list unless the line splits them into groups
// (Thawzall does: glycol on one side, flameless on the other). Ungrouped
// models always come first, so a line that only groups some of its range
// still reads top to bottom.
function ModelList({
  line,
  onNavigate,
}: {
  line: ProductLine;
  onNavigate: () => void;
}) {
  const models = visibleModels(line);
  const groups: string[] = [];
  models.forEach((m) => {
    const g = m.group ?? "";
    if (!groups.includes(g)) groups.push(g);
  });

  return (
    <>
      {groups.map((group) => (
        <div key={group || "ungrouped"} className={group ? "mt-2.5" : "mt-2"}>
          {group && (
            <p className="px-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--ink-faint)]">
              {group}
            </p>
          )}
          <ul className={group ? "mt-1" : ""}>
            {models
              .filter((m) => (m.group ?? "") === group)
              .map((model) => (
                <li key={model.slug}>
                  <Link
                    href={`/products/${line.slug}/${model.slug}`}
                    onClick={onNavigate}
                    className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[0.8rem] text-[color:var(--ink-dim)] transition hover:bg-[var(--surface-2)] hover:text-[color:var(--ink)]"
                  >
                    {model.name}
                    {model.comingSoon && <ComingSoon />}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}


    </>
  );
}

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
          {visibleProductLines.map((line) => (
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
                  {line.comingSoon && <ComingSoon />}
                </p>
              </Link>

              <ModelList line={line} onNavigate={onNavigate} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-5 border-t border-[color:var(--line)] pt-3.5">
          <Link
            href="/products"
            onClick={onNavigate}
            className="text-[0.8rem] font-semibold text-[color:var(--orange)] underline underline-offset-4"
          >
            View all product lines
          </Link>
          {/* Accessories fit every glycol heater rather than one line, so they
              hang off the menu itself instead of sitting under a product. */}
          <Link
            href="/products/accessories"
            onClick={onNavigate}
            className="text-[0.8rem] font-semibold text-[color:var(--orange)] underline underline-offset-4"
          >
            Accessories
          </Link>
        </div>
      </div>
    </div>
  );
}