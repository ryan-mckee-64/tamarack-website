import Link from "next/link";
import type { Metadata } from "next";
import { products, documentCountsForProduct } from "@/lib/manuals";
import LineName from "@/components/product/LineName";

export const metadata: Metadata = {
  title: "Manuals & Parts | Tamarack Industries",
  description:
    "Brochures, operator manuals and parts manuals for every Tamarack product line, organized by model year.",
};

export default function ManualsPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Support</p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-5xl">
          Manuals &amp; Parts
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Brochures, operator manuals and parts manuals for every Tamarack
          product line. Select your product, then filter by the model year of
          your machine to see the documents that apply to it.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const counts = documentCountsForProduct(product.slug);
            return (
              <Link
                key={product.slug}
                href={`/manuals/${product.slug}`}
                className="group flex flex-col rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7 transition hover:border-[color:var(--orange)] hover:shadow-md"
              >
                <p className="tech-label text-[color:var(--ember)]">
                  {product.family}
                </p>
                <h2 className="font-display mt-2 text-2xl font-bold tracking-[-0.01em] text-[color:var(--ink)]">
                                    <LineName slug={product.slug} name={product.name} />
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  {product.summary}
                </p>
                <p className="mt-6 text-sm text-[color:var(--ink-dim)]">
                  {counts.total} {counts.total === 1 ? "document" : "documents"}
                </p>
                <span className="mt-2 text-sm font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                  View documents
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}