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
          Industry, application and solutions
        </p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          {solution.label}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          {solution.description}
        </p>

        <div className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
          <p className="font-semibold text-[color:var(--ink)]">
            This section is being prepared
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            We are putting this section together now. In the meantime our sales
            team can help match equipment to your application.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Browse product lines
            </Link>
            <Link
              href="/contact"
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