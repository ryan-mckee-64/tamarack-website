import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Sales | Tamarack Industries",
  description: "Pricing, availability, rentals and new equipment enquiries.",
};

export default function SalesPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
        <Link href="/contact" className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]">
          Back to contact
        </Link>

        <p className="tech-label mt-8 text-[color:var(--ember)]">Sales</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Talk to sales
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Tell us about the job and we will help you size the right equipment,
          whether you are buying or renting.
        </p>

        <div className="mt-10">
          <ContactForm department="sales" />
        </div>
      </section>
    </main>
  );
}