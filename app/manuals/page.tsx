import Link from "next/link";
import type { Metadata } from "next";
import { products, documentCountsForProduct } from "@/lib/manuals";
import { getProductLine } from "@/lib/product-lines";
import LineName from "@/components/product/LineName";

export const metadata: Metadata = {
  title: "Manuals & Parts | Tamarack Industries",
  description:
    "Brochures, operator manuals and parts manuals for every Tamarack product line, organized by model year.",
};

// The manual pages borrow each line's colour from the Product Lines data
// rather than keeping a second copy of the palette.
function accentStyle(slug: string) {
  return {
    "--accent": getProductLine(slug)?.accent ?? "var(--orange)",
  } as React.CSSProperties;
}

function Arrow() {
  return (
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      &rarr;
    </span>
  );
}

export default function ManualsPage() {
  return (
    <main className="bg-[var(--surface-2)]">
      <section className="page-hero border-b border-[color:var(--line)]">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <p className="tech-label text-[color:var(--ember)]">Support</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
            Manuals &amp; Parts
          </h1>
          <hr className="brand-rule mt-6 w-24" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
            Brochures, operator manuals and parts manuals for every Tamarack
            product line. Select your product, then filter by the model year of
            your machine to see the documents that apply to it.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const counts = documentCountsForProduct(product.slug);
            return (
              <Link
                key={product.slug}
                href={`/manuals/${product.slug}`}
                style={accentStyle(product.slug)}
                className="line-card group flex flex-col"
              >
                <span className="line-card-bar" />

                <div className="line-card-plate flex h-28 items-center justify-center border-b border-[color:var(--line)] px-6">
                  <LineName
                    slug={product.slug}
                    name={product.name}
                    height="h-12"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="line-card-chip w-fit rounded-full px-3 py-1 text-[0.68rem] font-semibold">
                    {product.family}
                  </span>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                    {product.summary}
                  </p>
                  <p className="mt-5 text-sm text-[color:var(--ink-faint)]">
                    {counts.total}{" "}
                    {counts.total === 1 ? "document" : "documents"}
                  </p>
                  <span className="line-card-cta mt-2 flex items-center gap-2 text-sm font-semibold text-[color:var(--ink)]">
                    View documents
                    <Arrow />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
