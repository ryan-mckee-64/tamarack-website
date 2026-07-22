import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ModelViewer from "@/components/models/ModelViewer";
import { products } from "@/lib/manuals";
import { getProduct, modelsForProduct } from "@/lib/models";

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
    description: `Rotate and zoom the Tamarack ${product.name} from any angle.`,
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
  const model = productModels[0];

  return (
    <main>
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <Link
          href="/models"
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to 3D models
        </Link>

        <p className="tech-label mt-8 text-[color:var(--ember)]">
          {product.family}
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-5xl">
          {product.name} in 3D
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          {product.summary}
        </p>

        <div className="mt-12">
          {model ? (
            <>
              <ModelViewer
                modelUrl={model.modelUrl}
                isPlaceholder={model.modelUrl === null}
              />

              <div className="mt-8 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7">
                <h2 className="font-display text-lg font-bold tracking-[-0.01em] text-[color:var(--ink)]">
                  {model.name}
                  {model.variant ? `, ${model.variant}` : ""}
                </h2>
                {model.notes && (
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                    {model.notes}
                  </p>
                )}
                <p className="mt-5 text-sm text-[color:var(--ink-dim)]">
                  Looking for specifications and service information?{" "}
                  <Link
                    href={`/manuals/${product.slug}`}
                    className="font-semibold text-[color:var(--orange)] underline underline-offset-4"
                  >
                    View the {product.name} documents
                  </Link>
                </p>
              </div>
            </>
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