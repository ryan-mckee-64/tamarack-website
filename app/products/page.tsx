import Link from "next/link";
import type { Metadata } from "next";
import {
  visibleProductLines,
  visibleModels,
  type ProductLine,
} from "@/lib/product-lines";
import LineName from "@/components/product/LineName";

export const metadata: Metadata = {
  title: "Product Lines | Tamarack Industries",
  description:
    "Glycol and flameless heaters, concrete buggies and trailer movers.",
};

// Explicit families rather than "does it have models": the split is editorial,
// and a line with no models yet (Yard Dog) still belongs under Equipment.
const BLOCKS: { title: string; lines: ProductLine[] }[] = [
  {
    title: "Heating",
    lines: visibleProductLines.filter((l) => l.family === "heating"),
  },
  {
    title: "Equipment",
    lines: visibleProductLines.filter((l) => l.family === "equipment"),
  },
];

function accentStyle(line: ProductLine) {
  return { "--accent": line.accent ?? "var(--orange)" } as React.CSSProperties;
}

function Arrow() {
  return (
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      &rarr;
    </span>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-[var(--surface-2)]">
      {/* Header */}
      <section className="page-hero border-b border-[color:var(--line)]">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <p className="tech-label text-[color:var(--ember)]">Equipment</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
            Product Lines
          </h1>
          <hr className="brand-rule mt-6 w-24" />
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        {BLOCKS.map((block, i) => (
          <div key={block.title} className={i > 0 ? "mt-16" : ""}>
            <p className="font-mono-label text-[0.68rem] tracking-[0.18em] text-[color:var(--ink-faint)]">
              {block.title}
            </p>

            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              {block.lines.map((line) => {
                const models = visibleModels(line);
                return (
                  <Link
                    key={line.slug}
                    href={`/products/${line.slug}`}
                    style={accentStyle(line)}
                    className="line-card group flex flex-col sm:flex-row"
                  >
                    <span className="line-card-bar" />

                    <div className="line-card-plate flex w-full items-center justify-center border-b border-[color:var(--line)] px-5 py-8 sm:w-[42%] sm:border-b-0 sm:border-r">
                      <LineName slug={line.slug} name={line.name} height="h-14" />
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <span className="line-card-chip w-fit rounded-full px-3 py-1 text-[0.68rem] font-semibold">
                        {line.category}
                      </span>

                      {models.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {models.map((m) => (
                            <span
                              key={m.slug}
                              className="rounded-md border border-[color:var(--line)] px-2 py-1 text-[0.7rem] text-[color:var(--ink-dim)]"
                            >
                              {m.name}
                              {m.comingSoon && (
                                <span className="ml-1.5 text-[color:var(--ink-faint)]">
                                  coming soon
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}

                      <span className="line-card-cta mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-[color:var(--ink)]">
                        View line
                        <Arrow />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}