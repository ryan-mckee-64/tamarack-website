import Link from "next/link";
import type { Metadata } from "next";
import { productLines } from "@/lib/product-lines";
import LineName from "@/components/product/LineName";

export const metadata: Metadata = {
  title: "Product Lines | Tamarack Industries",
  description:
    "Glycol and flameless heaters, tractor loader backhoes, concrete buggies, trailer movers and site sweepers.",
};

export default function ProductsPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Equipment</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Product Lines
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Equipment built in Manitoba for the construction, rental and resource
          industries across Canada and the US.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productLines.map((line) => (
            <Link
              key={line.slug}
              href={`/products/${line.slug}`}
              className="group flex flex-col rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7 transition hover:border-[color:var(--orange)] hover:shadow-md"
            >
              <p className="tech-label text-[color:var(--ember)]">{line.category}</p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
                                <LineName slug={line.slug} name={line.name} />
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                {line.summary}
              </p>
              {line.models.length > 0 && (
                <p className="mt-5 text-sm text-[color:var(--ink-dim)]">
                  {line.models.map((m) => m.name).join(", ")}
                </p>
              )}
              <span className="mt-3 text-sm font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                View line
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}