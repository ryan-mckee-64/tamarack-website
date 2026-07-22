// components/sections/Hero.tsx
import Link from "next/link";

const SPECS = [
  { value: "700,000", unit: "BTU/hr", label: "Flameless output (XHR 700)" },
  { value: "11,000", unit: "sq ft", label: "Glycol ground coverage" },
  { value: "30", unit: "yrs", label: "Building since 1995" },
  { value: "2", unit: "", label: "Plants: MB & MN" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--line)]">
      <div className="relative mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <p className="tech-label text-[color:var(--ember)]">
          Tamarack Industries · Winnipeg, Manitoba
        </p>

        <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.02em] text-[color:var(--ink)]">
          Heating systems and construction equipment,
          engineered in Manitoba{" "}
          <span className="brand-gradient-text">since 1995.</span>
        </h1>

        <p className="font-body mt-7 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Glycol and flameless heaters, tractor loader backhoes, concrete buggies,
          and site sweepers: durable equipment for the construction, rental, and
          resource industries across Canada and the US.
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#products"
            className="brand-gradient group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            View product lines
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--line-strong)] px-8 py-4 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
          >
            BTU Calculator
          </Link>
        </div>

        {/* Spec strip */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[var(--line)] md:grid-cols-4">
          {SPECS.map((s) => (
            <div key={s.label} className="bg-[var(--surface)] p-6">
              <dt className="font-display text-3xl font-bold text-[color:var(--ink)] md:text-4xl">
                {s.value}
                {s.unit && (
                  <span className="ml-1 text-base font-medium text-[color:var(--orange)]">{s.unit}</span>
                )}
              </dt>
              <dd className="tech-label mt-2 text-[color:var(--ink-faint)]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}