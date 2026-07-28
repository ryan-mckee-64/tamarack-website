import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Portal | Tamarack Industries",
  description: "Order history, documents and account information.",
};

export default function PortalPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Accounts</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Customer Portal
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Order history, documents and account information, in one place.
        </p>

        <div className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
          <p className="font-semibold text-[color:var(--ink)]">
            The portal is being built
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            We are putting this together now. Until it is ready, our team can
            pull up your order history and paperwork directly, and every manual
            and parts list is already available in the manual library.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/manuals"
              className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Browse manuals
            </Link>
            <Link
              href="/contact/support"
              className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}