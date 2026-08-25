import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ModelViewer from "@/components/models/ModelViewer";
import { products } from "@/lib/manuals";
import { getProduct, modelsForProduct } from "@/lib/models";
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
  if (!product) return { title: "3D Models | Tamarack Industries" };
  return {
    title: `${product.name} in 3D | Tamarack Industries`,
    description: `Rotate, zoom and explore the components of the Tamarack ${product.name}.`,
  };
}

export default async function ProductModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const productModels = modelsForProduct(slug);

  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
        <Link
          href="/models"
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to 3D models
        </Link>

        <p className="tech-label mt-8 text-[color:var(--ember)]">
          {product.family}
        </p>
        <h1 className="font-display mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-4xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-5xl">
          <LineName slug={product.slug} name={product.name} height="h-10 sm:h-14" />
          in 3D
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          {product.summary}
        </p>

        <div className="mt-12">
          {productModels.length > 0 ? (
            <ModelViewer
              models={productModels}
              productName={product.name}
              manualHref={`/manuals/${product.slug}`}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface)] p-12 text-center">
              <p className="font-semibold text-[color:var(--ink)]">
                No model available for this product yet
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}