import Link from "next/link";
import type { Metadata } from "next";
import ShareYourUnitForm from "@/components/about/ShareYourUnitForm";

export const metadata: Metadata = {
  title: "Send Us a Picture of Your Unit | Tamarack Industries",
  description:
    "Send our marketing team a photo of your Tamarack machine on the job.",
};

export default function ShareYourUnitPage() {
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
            Send us a picture of your unit
          </h1>
          <hr className="brand-rule mt-6 w-24" />
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink-dim)]">
            We like seeing where our machines end up. Send our marketing team a
            photo of yours on the job and we will send you something from
            Tamarack.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <ShareYourUnitForm />
      </section>
    </main>
  );
}
