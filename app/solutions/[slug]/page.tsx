import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { solutions, getSolution } from "@/lib/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return { title: "Solutions | Tamarack Industries" };
  return { title: `${solution.label} | Tamarack Industries` };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">
          {solution.kind === "application" ? "By application" : "By industry"}
        </p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          {solution.label}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          {solution.description}
        </p>

        {solution.photo ? (
          <Image
            src={solution.photo}
            alt={solution.photoCaption ?? solution.label}
            width={878}
            height={549}
            className="mt-10 h-auto w-full rounded-2xl"
          />
        ) : (
          <figure className="mt-10 flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface-2)]">
            <figcaption className="px-6 text-center text-xs text-[color:var(--ink-faint)]">
              {solution.photoCaption ?? `Photo: ${solution.label}`}
            </figcaption>
          </figure>
        )}

        {solution.body && solution.body.length > 0 && (
          <div className="mt-10">
            {solution.body.map((para, i) => (
              <p
                key={i}
                className={`text-base leading-relaxed text-[color:var(--ink-dim)] ${
                  i > 0 ? "mt-5" : ""
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Equipment for this application or industry. */}
        {solution.products.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
              Equipment for this work
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {solution.products.map((product) => (
                <li key={product.label}>
                  <Link
                    href={product.href}
                    className="group flex items-center justify-between rounded-xl border border-[color:var(--line)] bg-[var(--surface)] px-5 py-4 transition hover:border-[color:var(--orange)] hover:shadow-sm"
                  >
                    <span className="text-sm font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                      {product.label}
                    </span>
                    <span className="text-[color:var(--ink-faint)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--orange)]">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
          <p className="font-semibold text-[color:var(--ink)]">
            Not sure which unit you need?
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Our sales team can size a unit to your site, or start with the BTU
            calculator to work out the coverage you need.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              BTU calculator
            </Link>
            <Link
              href="/contact/sales"
              className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
            >
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}