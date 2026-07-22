// components/sections/ProductOverview.tsx
const PRODUCTS = [
  {
    category: "Glycol heating",
    name: "Heat King",
    href: "https://www.heat-king.ca/",
    isNew: false,
    body: "Mobile glycol heating systems for concrete curing, ground thawing, and space heating in cold weather.",
    specs: [
      ["Models", "HK150 / HK300 / HK600 / HK1500"],
      ["Coverage", "Up to 11,000 sq ft"],
      ["Fuel", "Diesel, LP/NG option"],
    ],
  },
  {
    category: "Flameless & glycol heat",
    name: "Thawzall / XHR",
    href: "http://www.thawzall.com/",
    isNew: false,
    body: "Flameless and glycol heaters, led by the XHR 700 flameless unit, for thawing, curing, and indirect space heat.",
    specs: [
      ["Flameless", "XHR 700 · 700,000 BTU/hr"],
      ["Airflow", "Up to 4,000 CFM"],
      ["Glycol", "TCH 250 · 250,000 BTU/hr"],
    ],
  },
  {
    category: "Tractor loader backhoe",
    name: "Renegade",
    href: "https://www.tamarack-industries.com/renegade",
    isNew: true,
    body: "A 25 HP subcompact tractor loader backhoe, purpose built for rental and towable by a half ton truck.",
    specs: [
      ["Engine", "25 HP"],
      ["Dig depth", "8 ft 6 in"],
      ["Lift capacity", "1,600 lb"],
    ],
  },
  {
    category: "Concrete power buggy",
    name: "Mud Dog",
    href: "https://www.tamarack-industries.com/mud-dog",
    isNew: false,
    body: "Gas and electric concrete power buggies built for high utilization and tough job site wear.",
    specs: [
      ["Models", "CB1600 / CB1600E"],
      ["Power", "Gas or electric"],
      ["Runtime", "Up to 8 hrs (electric)"],
    ],
  },
  {
    category: "Trailer mover",
    name: "Yard Dog",
    href: "https://www.tamarack-industries.com/yard-dog",
    isNew: false,
    body: "A walk behind trailer mover for effortless trailer management in yards, warehouses, and job sites.",
    specs: [
      ["Type", "Walk behind mover"],
      ["License", "None required"],
      ["Control", "Thumb hitch + foot brake"],
    ],
  },
  {
    category: "Site sweeper",
    name: "Maverick",
    href: "https://www.tamarack-industries.com/maverick",
    isNew: true,
    body: "Site sweepers built for the rental industry, keeping lots and job sites clear of debris.",
    specs: [
      ["Type", "Site sweeper"],
      ["Market", "Rental industry"],
      ["Status", "New release"],
    ],
  },
];

export default function ProductOverview() {
  return (
    <section id="products" className="border-b border-[color:var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="max-w-2xl">
          <p className="tech-label text-[color:var(--orange)]">Product lines</p>
          <h2 className="font-display mt-4 text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--ink)] md:text-5xl">
            What we build
          </h2>
          <p className="font-body mt-5 text-base leading-relaxed text-[color:var(--ink-dim)]">
            Two divisions in one shop: industrial heating and construction equipment,
            all designed and manufactured in house.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-[color:var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
   {PRODUCTS.map((p) => (
          <a  
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col bg-[var(--surface)] p-8 transition-shadow hover:shadow-[0_10px_34px_rgba(27,28,30,0.09)]"
            >
              {/* hover corner tick */}
              <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[color:var(--orange)] opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <p className="font-mono-label text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--ember)]">
                  {p.category}
                </p>
                {p.isNew && (
                  <span className="bg-[var(--orange-tint)] px-2 py-0.5 font-mono-label text-[0.6rem] uppercase tracking-[0.16em] text-[color:var(--orange)]">
                    New
                  </span>
                )}
              </div>

              <h3 className="font-display mt-3 text-2xl font-bold tracking-[-0.01em] text-[color:var(--ink)]">
                {p.name}
              </h3>
              <p className="font-body mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                {p.body}
              </p>

              <dl className="mt-6 space-y-2 border-t border-[color:var(--line)] pt-6">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono-label text-[0.68rem] uppercase tracking-[0.1em] text-[color:var(--ink-faint)]">
                      {k}
                    </dt>
                    <dd className="font-mono-label text-right text-[0.72rem] text-[color:var(--ink)]">{v}</dd>
                  </div>
                ))}
              </dl>

              <span className="mt-8 inline-flex items-center gap-2 font-mono-label text-xs uppercase tracking-[0.16em] text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--orange)]">
                View details
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
