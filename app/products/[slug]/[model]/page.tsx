import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductLine, getModel, allModelParams } from "@/lib/product-lines";
import { modelsForProduct } from "@/lib/models";
import LineName from "@/components/product/LineName";
import ModelViewer from "@/components/models/ModelViewer";

export function generateStaticParams() {
  return allModelParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; model: string }>;
}): Promise<Metadata> {
  const { slug, model } = await params;
  const m = getModel(slug, model);
  const line = getProductLine(slug);
  if (!m || !line) return { title: "Product Lines | Tamarack Industries" };
  return {
    title: `${m.name} | ${line.name} | Tamarack Industries`,
    description: m.tagline,
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string; model: string }>;
}) {
  const { slug, model } = await params;
  const line = getProductLine(slug);
  const m = getModel(slug, model);
  if (!line || !m) notFound();

  const siblings = line.models.filter((x) => x.slug !== m.slug);
  const models3d = modelsForProduct(line.slug);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <Link
          href={`/products/${line.slug}`}
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to {line.name}
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <div className="flex items-center justify-center rounded-2xl bg-[var(--surface-2)] p-8">
            {m.image ? (
              <Image
                src={m.image}
                alt={`Tamarack ${m.name}`}
                width={878}
                height={522}
                priority
                className="h-auto w-full object-contain"
              />
            ) : (
              <p className="py-24 text-sm text-[color:var(--ink-faint)]">
                Photo coming soon
              </p>
            )}
          </div>

          {/* Detail */}
          <div>
            <div className="tech-label text-[color:var(--ember)]">
              <LineName slug={line.slug} name={line.name} height="h-6" />
            </div>
            <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
              {m.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
              {m.tagline}
            </p>

            {m.description && (
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                {m.description}
              </p>
            )}

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact/sales"
                className="brand-gradient rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Request a quote
              </Link>
              {m.brochure && (
                <a
                  href={m.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[color:var(--line-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
                >
                  Download brochure
                </a>
              )}
              <Link
                href={`/manuals/${line.slug}`}
                className="rounded-full border border-[color:var(--line-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
              >
                Manuals and parts
              </Link>
              <Link
                href={`/products/${line.slug}`}
                className="rounded-full border border-[color:var(--line-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
              >
                Learn more about {line.name}
              </Link>
            </div>
          </div>
        </div>

        {/* Job site photos, above the spec table */}
        {m.gallery && m.gallery.length > 0 && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {m.gallery.map((photo) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={1600}
                height={1200}
                sizes="(max-width: 640px) 100vw, 45vw"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        )}

        {/* Specifications */}
        <div className="mt-20">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--orange)] sm:text-3xl">
            Specifications
          </h2>

          {m.specs && m.specs.length > 0 ? (
            <dl className="mt-6 overflow-hidden rounded-2xl bg-[var(--surface-2)]">
              {m.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-8 ${
                    i % 2 === 1 ? "bg-[var(--surface)]" : ""
                  }`}
                >
                  <dt className="tech-label w-64 shrink-0 text-[color:var(--ink)]">
                    {s.label}
                  </dt>
                  <dd className="text-sm text-[color:var(--ink-dim)]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-6 rounded-2xl bg-[var(--surface-2)] px-6 py-5 text-sm text-[color:var(--ink-faint)]">
              Full specifications coming soon.
            </p>
          )}
        </div>

        {m.features && m.features.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-3xl">
              Features of the {m.name}
            </h2>
            <div className="mt-8 grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {m.features.map((f) => (
                <div key={f.title}>
                  <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-[color:var(--ink)]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature writeups, under the spec table */}

        {/* Videos for this model. Links rather than embeds — an embed per
            model would pull a third party player onto every product page. */}
        {m.videos && m.videos.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-3xl">
              Videos
            </h2>
            <ul className="mt-6 space-y-3">
              {m.videos.map((v) => (
                <li key={v.url}>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-[color:var(--line)] bg-[var(--surface)] px-5 py-4 transition hover:border-[color:var(--orange)] hover:shadow-sm"
                  >
                    <span className="text-sm font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                      {v.label}
                    </span>
                    <span className="shrink-0 text-[color:var(--ink-faint)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--orange)]">
                      &rarr;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interactive 3D model. Lives here rather than on a separate page. */}
        {models3d.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-3xl">
              Explore it in 3D
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--ink-dim)]">
              Drag to rotate the machine. Select a marker to see the component,
              its part number and its specifications.
            </p>
            <div className="mt-7">
              <ModelViewer
                models={models3d}
                productName={line.name}
                manualHref={`/manuals/${line.slug}`}
              />
            </div>
          </div>
        )}

        {siblings.length > 0 && (
          <div className="mt-24 border-t border-[color:var(--line)] pt-12">
            <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-[color:var(--ink)]">
              Other {line.name} models
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/products/${line.slug}/${s.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] transition hover:border-[color:var(--orange)] hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full bg-[var(--surface-2)]">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={`Tamarack ${s.name}`}
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

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                      {s.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                      {s.tagline}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                      View model
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
