import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Support | Tamarack Industries",
  description: "Service, parts, troubleshooting and warranty questions.",
};

export default function SupportPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
        <Link href="/contact" className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]">
          Back to contact
        </Link>

        <p className="tech-label mt-8 text-[color:var(--ember)]">Support</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Service and parts
        </h1>
        <div className="mt-8 rounded-xlborder border-[color:var(--line)] bg-[var(--surface)] p-5">
          <p className="text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Looking for a manual or parts diagram?{" "}
            <Link href="/manuals" className="font-semibold text-[color:var(--orange)] underline underline-offset-4">
              Browse the manual library
            </Link>{" "}
            first, it may answer your question straight away.
          </p>
        </div>

        <div className="mt-10">
          <ContactForm department="support" />
        </div>
      </section>
    </main>
  );
}