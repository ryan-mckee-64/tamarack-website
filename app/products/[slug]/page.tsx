import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productLines, getProductLine } from "@/lib/product-lines";

export function generateStaticParams() {
  return productLines.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const line = getProductLine(slug);
  if (!line) return { title: "Product Lines | Tamarack Industries" };
  return {
    title: `${line.name} | Tamarack Industries`,
    description: line.summary,
  };
}

export default async function ProductLinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = getProductLine(slug);
  if (!line) notFound();

  return (
    <main>
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <Link
          href="/products"
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to product lines
        </Link>

                {line.logo && line.logoStyle === "badge" ? (
          <>
            <p className="tech-label mt-8 text-[color:var(--ember)]">
              {line.category}
            </p>
            <Image
              src={line.logo}
              alt={line.name}
              width={700}
              height={700}
              priority
              className="mt-5 h-40 w-auto sm:h-52"
            />
          </>
        ) : line.logo ? (
          <Image
            src={line.logo}
            alt={line.name}
            width={700}
            height={100}
            priority
            className="mt-10 h-16 w-auto sm:h-24"
          />
        ) : (
          <>
            <p className="tech-label mt-8 text-[color:var(--ember)]">
              {line.category}
            </p>
            <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
              {line.name}
            </h1>
          </>
        )}

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          {line.summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/manuals/${line.slug}`}
            className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Manuals and parts
          </Link>
          <Link
            href={`/models/${line.slug}`}
            className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
          >
            View in 3D
          </Link>
        </div>

        {line.models.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
              Models
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {line.models.map((model) => (
                <Link
                  key={model.slug}
                  href={`/products/${line.slug}/${model.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] transition hover:border-[color:var(--orange)] hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full bg-[var(--surface-2)]">
                    {model.image ? (
                      <Image
                        src={model.image}
                        alt={`Tamarack ${model.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--ink-faint)]">
                        Photo coming soon
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                      {model.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                      {model.tagline}
                    </p>
                    <span className="mt-5 text-sm font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                      View model
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {line.hasAccessories && (
          <div id="accessories" className="mt-16 scroll-mt-32">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
              Accessories
            </h2>
            <div className="mt-6 rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface)] p-8">
              <p className="font-semibold text-[color:var(--ink)]">
                Accessory listings are being prepared
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                Hoses, ducting, fittings and add on equipment for the {line.name}{" "}
                line will be listed here. In the meantime our team can quote any
                accessory directly.
              </p>
              <Link
                href="/contact/sales"
                className="mt-5 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
              >
                Contact our team
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
