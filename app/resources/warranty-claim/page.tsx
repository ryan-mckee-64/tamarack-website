import Link from "next/link";
import type { Metadata } from "next";
import WarrantyClaimForm from "@/components/warranty/WarrantyClaimForm";

export const metadata: Metadata = {
  title: "Warranty Claim Form | Tamarack Industries",
  description:
    "Submit a warranty claim on your Tamarack machine. Include the serial number and a description of the fault.",
};

export default function WarrantyClaimPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
        <Link
          href="/resources"
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to resources
        </Link>

        <p className="tech-label mt-8 text-[color:var(--ember)]">Warranty</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Warranty claim form
        </h1>
        <hr className="brand-rule mt-6 w-24" />
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Tell us about the machine and what went wrong. The serial number is
          the one thing we cannot open a claim without — it is on the serial
          plate on the unit.
        </p>

        <div className="mt-6 rounded-xl border border-[color:var(--line)] bg-[var(--surface)] p-5">
          <p className="text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Not a warranty issue?{" "}
            <Link
              href="/contact/support"
              className="font-semibold text-[color:var(--orange)] underline underline-offset-4"
            >
              Contact support
            </Link>{" "}
            for service, parts and troubleshooting.
          </p>
        </div>

        <div className="mt-10">
          <WarrantyClaimForm />
        </div>
      </section>
    </main>
  );
}