import Link from "next/link";
import type { Metadata } from "next";
import { productsWithModels } from "@/lib/models";
import LineName from "@/components/product/LineName";

export const metadata: Metadata = {
  title: "3D Models | Tamarack Industries",
  description:
    "Explore Tamarack equipment in three dimensions. Rotate and zoom each machine before you specify it.",
};

export default function ModelsPage() {
  const entries = productsWithModels();

  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Explore</p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-5xl">
          3D Models
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Rotate and zoom our equipment from any angle. Useful for checking
          access, clearances and layout before the machine arrives on your site.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(({ product, models }) => {
            const ready = models.some((m) => m.modelUrl !== null);
            return (
              <Link
                key={product.slug}
                href={`/models/${product.slug}`}
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
                  {models.length} {models.length === 1 ? "model" : "models"}
                  {ready ? "" : ", preview only"}
                </p>
                <span className="mt-2 text-sm font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                  Open viewer
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}