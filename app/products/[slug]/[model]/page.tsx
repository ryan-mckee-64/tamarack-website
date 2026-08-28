import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductLine, getModel, allModelParams } from "@/lib/product-lines";
import LineName from "@/components/product/LineName";

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
            {m.eyebrow && (
              <p className="tech-label mt-3 text-[color:var(--ink-faint)]">
                {m.eyebrow}
              </p>
            )}
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
            </div>
          </div>
        </div>

        {/* Jobsite photos. A plain row under the hero rather than a carousel:
            two or three shots read at a glance and nothing needs clicking. */}
        {m.gallery && m.gallery.length > 0 && (
          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {m.gallery.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--surface-2)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
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

        {/* Features. Alternating rows so the photos zig zag down the page
            instead of stacking in one column beside a wall of text. */}
        {m.features && m.features.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-3xl">
              {`Features of the ${m.name}`}
            </h2>
            <span className="brand-gradient mt-4 block h-0.5 w-16" />

            {/* A 7/5 split rather than even halves, with every other row nudged
                down: the photos carry the page, and the offset turns a plain
                zig zag into the staircase the layout is going for. */}
            <div className="mt-14 space-y-20 md:space-y-24">
              {m.features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="grid items-center gap-8 md:grid-cols-12 md:gap-14"
                >
                  {feature.image && (
                    <div
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--surface-2)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] ring-1 ring-black/5 md:col-span-7 ${
                        i % 2 === 1
                          ? "md:order-first"
                          : "md:order-last md:mt-10"
                      }`}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt ?? feature.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 58vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={
                      feature.image
                        ? `md:col-span-5 ${i % 2 === 1 ? "md:mt-10" : ""}`
                        : "md:col-span-12"
                    }
                  >
                    <p className="font-mono-label text-[0.7rem] tracking-[0.18em] text-[color:var(--ink-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-bold tracking-[-0.015em] text-[color:var(--orange)]">
                      {feature.title}
                    </h3>
                    <span className="brand-gradient mt-3 block h-0.5 w-10" />

                    {(Array.isArray(feature.body)
                      ? feature.body
                      : feature.body
                        ? [feature.body]
                        : []
                    ).map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-4 text-sm leading-relaxed text-[color:var(--ink-dim)]"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {feature.bullets && feature.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {feature.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-sm leading-relaxed text-[color:var(--ink-dim)]"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--orange)]"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {feature.link && (
                      <Link
                        href={feature.link.href}
                        className="mt-5 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
                      >
                        {feature.link.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
