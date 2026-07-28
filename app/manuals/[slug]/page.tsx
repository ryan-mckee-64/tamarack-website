import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ManualLibrary from "@/components/manuals/ManualLibrary";
import { products, getProduct, documentsForProduct } from "@/lib/manuals";
import LineName from "@/components/product/LineName";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Manuals & Parts | Tamarack Industries" };
  return {
    title: `${product.name} manuals | Tamarack Industries`,
    description: `Brochures, operator manuals and parts manuals for the Tamarack ${product.name}.`,
  };
}

export default async function ProductManualsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const docs = documentsForProduct(slug);

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <Link
          href="/manuals"
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to manuals and parts
        </Link>

        <p className="tech-label mt-8 text-[color:var(--ember)]">
          {product.family}
        </p>
        <h1 className="font-display mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-4xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-5xl">
          <LineName slug={product.slug} name={product.name} height="h-10 sm:h-14" />
          documents
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          {product.summary}
        </p>

        <div className="mt-6 rounded-xl border border-[color:var(--line)] bg-[var(--surface)] p-5">
          <p className="text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Not sure which year your machine is? Check the serial plate on the
            unit, or contact our service team and we will confirm the correct
            manual for your serial number.
          </p>
        </div>

        <div className="mt-14">
          <ManualLibrary docs={docs} />
        </div>
      </section>
    </main>
  );
}