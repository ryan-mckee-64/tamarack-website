import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { plannedAboutItems, getPlannedAboutItem } from "@/lib/about";

export function generateStaticParams() {
  return plannedAboutItems().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPlannedAboutItem(slug);
  if (!item) return { title: "About Us | Tamarack Industries" };
  return { title: `${item.label} | Tamarack Industries` };
}

export default async function PlannedAboutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPlannedAboutItem(slug);
  if (!item) notFound();

  return (
    <main>
      <section className="page-hero border-b border-[color:var(--line)]">
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:px-10">
          <Link
            href="/#company"
            className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
          >
            Back to about us
          </Link>

          <p className="tech-label mt-8 text-[color:var(--ember)]">About us</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
            {item.label}
          </h1>
          <hr className="brand-rule mt-6 w-24" />
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink-dim)]">
            {item.blurb}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
          <p className="font-semibold text-[color:var(--ink)]">
            This section is being prepared
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            We are putting this together now. In the meantime our team is happy
            to answer anything directly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact our team
            </Link>
            <Link
              href="/#company"
              className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
