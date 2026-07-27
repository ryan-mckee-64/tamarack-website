import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Tamarack Industries",
  description: "Request pricing for a specific machine or job.",
};

export default function QuotePage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
        <Link
          href="/contact"
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to contact
        </Link>

        <p className="tech-label mt-8 text-[color:var(--ember)]">Quotes</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Get a quote
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Request pricing for a specific machine or job.
        </p>

        <div className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
          <p className="font-semibold text-[color:var(--ink)]">
            This section is being prepared
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            The quote request form is on its way. In the meantime our sales team
            can put pricing together for you directly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact/sales"
              className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}