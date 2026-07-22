import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ManualLibrary from "@/components/manuals/ManualLibrary";
import { products, getProduct, documentsForProduct } from "@/lib/manuals";

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
  if (!product) return { title: "Manual library | Tamarack Industries" };
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
    <main className="bg-[#faf9f7]">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <Link
          href="/manuals"
          className="text-sm font-medium text-[#7a736c] transition hover:text-[#a91f2e]"
        >
          Back to manual library
        </Link>

        <p className="mt-8 text-sm font-medium text-[#a91f2e]">
          {product.family}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#333333] sm:text-5xl">
          {product.name} documents
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5c5650]">
          {product.summary}
        </p>

        <div className="mt-6 rounded-xl border border-[#e7e3de] bg-white p-5">
          <p className="text-sm leading-relaxed text-[#5c5650]">
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