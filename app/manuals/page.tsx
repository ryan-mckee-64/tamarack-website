import Link from "next/link";
import type { Metadata } from "next";
import { products, documentCountsForProduct } from "@/lib/manuals";

export const metadata: Metadata = {
  title: "Manual library | Tamarack Industries",
  description:
    "Brochures, operator manuals and parts manuals for every Tamarack product line, organized by model year.",
};

export default function ManualsPage() {
  return (
    <main className="bg-[#faf9f7]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium text-[#a91f2e]">Support</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#333333] sm:text-5xl">
          Manual library
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5c5650]">
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
                className="group flex flex-col rounded-2xl border border-[#e7e3de] bg-white p-7 transition hover:border-[#a91f2e] hover:shadow-md"
              >
                <p className="text-sm font-medium text-[#a91f2e]">
                  {product.family}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#333333]">
                  {product.name}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#7a736c]">
                  {product.summary}
                </p>
                <p className="mt-6 text-sm text-[#5c5650]">
                  {counts.total} {counts.total === 1 ? "document" : "documents"}
                </p>
                <span className="mt-2 text-sm font-medium text-[#333333] transition group-hover:text-[#a91f2e]">
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