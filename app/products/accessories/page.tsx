import Link from "next/link";
import type { Metadata } from "next";
import { accessories, accessoriesIntro } from "@/lib/accessories";
import AccessoryCard from "@/components/product/AccessoryCard";

export const metadata: Metadata = {
  title: "Accessories | Tamarack Industries",
  description:
    "Hose reels, remote manifolds, generator kits, booster pumps and heat exchangers for Heat King and Thawzall TCH 250 glycol heaters.",
};

export default function AccessoriesPage() {
  return (
    <main className="bg-[var(--surface-2)]">
      <section className="page-hero border-b border-[color:var(--line)]">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <p className="tech-label text-[color:var(--ember)]">Product Lines</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
            Accessories for glycol models
          </h1>
          <hr className="brand-rule mt-6 w-24" />
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
            {accessoriesIntro}
          </p>
          <Link
            href="/contact/sales"
            className="brand-gradient mt-8 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Contact us
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        {/* items-start so an expanded card grows on its own instead of
            stretching every sibling in its row. */}
        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accessories.map((accessory) => (
            <AccessoryCard key={accessory.slug} accessory={accessory} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8 text-center">
          <p className="font-display text-xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
            Not sure which accessories fit your job?
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Our team can spec the right hose, manifold and pump package for any
            Heat King or Thawzall TCH 250.
          </p>
          <Link
            href="/contact/sales"
            className="mt-6 inline-block rounded-full border border-[color:var(--line-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}