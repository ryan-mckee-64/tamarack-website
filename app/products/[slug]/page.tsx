import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productLines, getProductLine } from "@/lib/product-lines";
import { modelsForProduct } from "@/lib/models";
import ModelViewer from "@/components/models/ModelViewer";

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
    description: line.linePage?.intro ?? line.summary,
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

  const models3d = modelsForProduct(line.slug);
  const lp = line.linePage;

  // Models that have carried high level specs get the comparison row. The rest
  // fall back to the plain card grid further down.
  const compareModels = line.models.filter(
    (m) => m.cardSpecs && m.cardSpecs.length > 0
  );

  // The comparison row holds anywhere from one model to four, so the grid
  // tracks the count rather than always splitting into thirds. Otherwise a
  // single model sits in a third of the width with a hole beside it, and four
  // wrap as three plus a stray.
  const compareGrid =
    compareModels.length === 1
      ? "mx-auto max-w-md"
      : compareModels.length === 2
        ? "mx-auto max-w-3xl sm:grid-cols-2"
        : compareModels.length === 4
          ? "sm:grid-cols-2 xl:grid-cols-4"
          : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <main>
      {lp ? (
        /* ---------- Long form line page ---------- */
        <>
          {/* Hero */}
          <section className="relative overflow-hidden bg-[#100f0e]">
            {lp.heroImage && (
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
                <Image
                  src={lp.heroImage}
                  alt=""
                  fill
                  priority
                  sizes="58vw"
                  className="object-contain object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#100f0e] via-[#100f0e]/60 to-transparent" />
              </div>
            )}

            <div className="relative mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-24">
              <Link
                href="/products"
                className="text-sm font-semibold text-white/55 transition hover:text-white"
              >
                Back to product lines
              </Link>

              <div className="mt-10 max-w-xl">
                {/* The brand logos are supplied with an opaque white
                    background, so on a dark hero they can only ever be a white
                    rectangle. Rather than fight that, the white becomes a
                    deliberate nameplate: a tight plate capped with the line's
                    own accent colour and lifted off the background with a
                    shadow. logoZoom normalises the very different amounts of
                    empty margin baked into each file. */}
                {line.logo ? (
                  <div className="inline-flex flex-col overflow-hidden rounded-md bg-white shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)]">
                    <span
                      aria-hidden
                      className="h-1 w-full"
                      style={{ background: line.accent ?? "var(--orange)" }}
                    />
                    <span className="flex items-center px-5 py-3">
                      <Image
                        src={line.logo}
                        alt={line.name}
                        width={700}
                        height={175}
                        priority
                        className="w-auto"
                        style={{ height: `${2 * (line.logoZoom ?? 1)}rem` }}
                      />
                    </span>
                  </div>
                ) : (
                  <p className="font-display text-3xl font-extrabold text-white">
                    {line.name}
                  </p>
                )}

                <p className="tech-label mt-5 text-[color:var(--orange)]">
                  {lp.eyebrow}
                </p>

                <h1 className="font-display mt-7 text-[clamp(2.6rem,7vw,4.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.035em] text-white">
                  {lp.headline.map((word) => (
                    <span key={word} className="block">
                      {word}
                      <span className="text-[color:var(--orange)]">.</span>
                    </span>
                  ))}
                </h1>

                <p className="mt-7 max-w-md text-lg leading-relaxed text-white/75">
                  {lp.intro}
                </p>

                {lp.heroPoints.length > 0 && (
                  <ul className="mt-10 grid gap-6 sm:grid-cols-3">
                    {lp.heroPoints.map((point) => (
                      <li key={point}>
                        <span className="brand-gradient block h-0.5 w-8" />
                        <p className="tech-label mt-3 leading-snug text-white/70">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="#models"
                    className="brand-gradient rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    View our models
                  </a>
                  <Link
                    href="/contact/sales"
                    className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[color:var(--ink)]"
                  >
                    Request a quote
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* What makes the line different */}
          <section className="border-b border-[color:var(--line)] bg-[var(--surface)]">
            <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
              <h2 className="font-display text-center text-3xl font-extrabold uppercase tracking-[-0.02em] text-[color:var(--ink)] sm:text-4xl">
                {lp.advantageTitle}
              </h2>
              <span className="brand-gradient mx-auto mt-4 block h-0.5 w-16" />

              <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {lp.advantages.map((advantage) => (
                  <div
                    key={advantage.title}
                    className="border-t border-[color:var(--line-strong)] pt-6"
                  >
                    {advantage.icon && (
                      <Image
                        src={advantage.icon}
                        alt=""
                        width={96}
                        height={96}
                        className="mb-5 h-12 w-12 object-contain"
                      />
                    )}
                    <h3 className="font-display text-base font-bold uppercase tracking-[0.02em] text-[color:var(--ink)]">
                      {advantage.title}
                    </h3>
                    {advantage.body && (
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                        {advantage.body}
                      </p>
                    )}
                    {advantage.bullets && (
                      <ul className="mt-3 space-y-1.5">
                        {advantage.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--ink-dim)]"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--orange)]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Model comparison */}
          {compareModels.length > 0 && (
            <section id="models" className="scroll-mt-24 bg-[#100f0e]">
              <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
                <h2 className="font-display text-center text-3xl font-extrabold uppercase tracking-[-0.02em] text-white sm:text-4xl">
                  {lp.modelsTitle}
                </h2>
                <span className="brand-gradient mx-auto mt-4 block h-0.5 w-16" />

                <div className={`mt-14 grid gap-6 ${compareGrid}`}>
                  {compareModels.map((model) => (
                    <Link
                      key={model.slug}
                      href={`/products/${line.slug}/${model.slug}`}
                      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-[color:var(--orange)] hover:bg-white/[0.07]"
                    >
                      {model.image && (
                        <div className="relative mb-6 aspect-[16/10] w-full">
                          <Image
                            src={model.image}
                            alt={`Tamarack ${model.name}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                          />
                        </div>
                      )}

                      <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[color:var(--orange)]">
                        {model.name}
                      </h3>

                      <ul className="mt-5 flex-1 space-y-2.5">
                        {model.cardSpecs?.map((spec) => (
                          <li
                            key={spec}
                            className="flex gap-3 text-sm leading-snug text-white/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
                            {spec}
                          </li>
                        ))}
                      </ul>

                      <span className="mt-7 text-sm font-semibold text-white transition group-hover:text-[color:var(--orange)]">
                        Full specifications &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Feature detail */}
          {lp.features.length > 0 && (
            <section className="border-b border-[color:var(--line)]">
              <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
                <h2 className="font-display text-center text-3xl font-extrabold uppercase tracking-[-0.02em] text-[color:var(--ink)] sm:text-4xl">
                  {lp.featuresTitle}
                </h2>
                <span className="brand-gradient mx-auto mt-4 block h-0.5 w-16" />

                <div className="mt-14 grid gap-10 md:grid-cols-3">
                  {lp.features.map((feature) => (
                    <div key={feature.title}>
                      {feature.image ? (
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          width={720}
                          height={450}
                          className="aspect-[16/10] w-full rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface-2)]">
                          <p className="px-6 text-center text-xs text-[color:var(--ink-faint)]">
                            Photo: {feature.title.toLowerCase()}
                          </p>
                        </div>
                      )}
                      <h3 className="font-display mt-5 text-sm font-bold uppercase tracking-[0.04em] text-[color:var(--ink)]">
                        {feature.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                        {feature.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Closing call to action */}
          {lp.closing && (
            <section className="relative overflow-hidden bg-[#100f0e]">
              {lp.closing.image && (
                <>
                  <Image
                    src={lp.closing.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#100f0e] via-[#100f0e]/85 to-[#100f0e]/40" />
                </>
              )}

              <div className="relative mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
                <h2 className="font-display max-w-2xl text-3xl font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
                  {lp.closing.title}
                  <span className="block text-[color:var(--orange)]">
                    {lp.closing.titleAccent}
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75">
                  {lp.closing.body}
                </p>
                <Link
                  href="/contact/sales"
                  className="brand-gradient mt-9 inline-block rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Request a quote
                </Link>
              </div>
            </section>
          )}
        </>
      ) : (
        /* ---------- Short layout, for lines without page content yet ---------- */
        <section className="mx-auto max-w-5xl px-6 pt-20 md:px-10">
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
              href="/contact/sales"
              className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
            >
              Request a quote
            </Link>
          </div>
        </section>
      )}

      {/* ---------- Shared tail: model cards, 3D ---------- */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        {lp && (
          <p className="mb-16 text-sm text-[color:var(--ink-dim)]">
            <Link
              href={`/manuals/${line.slug}`}
              className="font-semibold underline underline-offset-4 transition hover:text-[color:var(--orange)]"
            >
              {`Manuals and parts for the ${line.name} line`}
            </Link>
          </p>
        )}

        {/* Only when the comparison row above did not already cover them. */}
        {line.models.length > 0 && compareModels.length === 0 && (
          <div>
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

        {/* Interactive 3D model, on the product page rather than its own. */}
        {models3d.length > 0 && (
          <div className={lp ? "" : "mt-16"}>
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
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


      </section>
    </main>
  );
}