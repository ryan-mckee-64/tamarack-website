import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tamarack Industries",
  description: "Get in touch with Tamarack sales or service.",
};

const OPTIONS = [
  {
    href: "/contact/sales",
    label: "Sales",
    blurb: "Pricing, availability, rentals, new equipment and dealer enquiries.",
  },
  {
    href: "/contact/support",
    label: "Support",
    blurb: "Service, parts, troubleshooting and warranty questions on equipment you already own.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Get in touch</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Choose the team that fits your question and we will route it to the
          right people.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {OPTIONS.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="group flex flex-col rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7 transition hover:border-[color:var(--orange)] hover:shadow-md"
            >
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                {o.label}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                {o.blurb}
              </p>
              <span className="mt-6 text-sm font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                Open form
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}