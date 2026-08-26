import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ShareYourUnitForm from "@/components/about/ShareYourUnitForm";

export const metadata: Metadata = {
  title: "Jobsite Photo Submission | Tamarack Industries",
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
            Jobsite photo submission
          </h1>
          <hr className="brand-rule mt-6 w-24" />
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink-dim)]">
            Send us a photo of your Tamarack equipment on the job and we&apos;ll
            send you something from us!
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[color:var(--line)] bg-[var(--surface-2)] py-16 md:py-24">
        {/* Warm bloom behind the form so the white card lifts off the band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, var(--orange-tint) 0%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[1fr_minmax(0,34rem)_1fr] lg:gap-10 xl:gap-14">
          <figure className="order-2 lg:order-1">
            <Image
              src="/images/JL1.png"
              alt="A Tamarack Heat King HK 300 glycol heater running on a snowy job site"
              width={1600}
              height={1200}
              sizes="(max-width: 1024px) 90vw, 28vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-black/5"
            />

          </figure>

          <div className="order-1 lg:order-2">
            <ShareYourUnitForm />
          </div>

          <figure className="order-3">
            <Image
              src="/images/JR1.png"
              alt="A Tamarack Thawzall XHR flameless heater thawing ground on a job site"
              width={1600}
              height={1200}
              sizes="(max-width: 1024px) 90vw, 28vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-black/5"
            />

          </figure>
        </div>
      </section>
    </main>
  );
}
