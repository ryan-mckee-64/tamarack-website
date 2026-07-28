import Link from "next/link";
import type { Metadata } from "next";
import { productLines, type ProductLine } from "@/lib/product-lines";
import LineName from "@/components/product/LineName";

export const metadata: Metadata = {
  title: "Product Lines | Tamarack Industries",
  description:
    "Glycol and flameless heaters, tractor loader backhoes, concrete buggies, trailer movers and site sweepers.",
};

// Lines with models are the heating range, and carry the page.
const featured = productLines.filter((l) => l.models.length > 0);
const rest = productLines.filter((l) => l.models.length === 0);

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
      <section className="relative overflow-hidden border-b border-[color:var(--line)] bg-[var(--surface)]">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, var(--orange-tint) 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <p className="tech-label text-[color:var(--ember)]">Equipment</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
            Product Lines
          </h1>
          <hr className="brand-rule mt-6 w-24" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
            Equipment built in Manitoba for the construction, rental and
            resource industries across Canada and the US.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        {/* Heating range, two wide tiles */}
        <p className="font-mono-label text-[0.68rem] tracking-[0.18em] text-[color:var(--ink-faint)]">
          Heating
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          {featured.map((line) => (
            <Link
              key={line.slug}
              href={`/products/${line.slug}`}
              style={accentStyle(line)}
              className="line-card group flex flex-col sm:flex-row"
            >
              <span className="line-card-bar" />

              <div className="line-card-plate flex w-full items-center justify-center border-b border-[color:var(--line)] p-8 sm:w-[38%] sm:border-b-0 sm:border-r">
                <LineName slug={line.slug} name={line.name} height="h-14" />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <span className="line-card-chip w-fit rounded-full px-3 py-1 text-[0.68rem] font-semibold">
                  {line.category}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  {line.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {line.models.map((m) => (
                    <span
                      key={m.slug}
                      className="rounded-md border border-[color:var(--line)] px-2 py-1 text-[0.7rem] text-[color:var(--ink-dim)]"
                    >
                      {m.name}
                    </span>
                  ))}
                </div>

                <span className="line-card-cta mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-[color:var(--ink)]">
                  View line
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Everything else, compact tiles */}
        <p className="font-mono-label mt-16 text-[0.68rem] tracking-[0.18em] text-[color:var(--ink-faint)]">
          Site equipment
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((line) => (
            <Link
              key={line.slug}
              href={`/products/${line.slug}`}
              style={accentStyle(line)}
              className="line-card group flex flex-col"
            >
              <span className="line-card-bar" />

              <div className="line-card-plate flex h-28 items-center justify-center border-b border-[color:var(--line)] px-6">
                <LineName slug={line.slug} name={line.name} height="h-12" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="line-card-chip w-fit rounded-full px-3 py-1 text-[0.68rem] font-semibold">
                  {line.category}
                </span>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  {line.summary}
                </p>
                <span className="line-card-cta mt-6 flex items-center gap-2 text-sm font-semibold text-[color:var(--ink)]">
                  View line
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}