// components/sections/WhyTamarack.tsx
import Image from "next/image";

// Draft copy, written to the brief "why being a Canadian and US manufacturer is
// beneficial". Swap the wording once the final text is settled.
const REASONS = [
  {
    kicker: "Two countries, two plants",
    title: "Built in Canada and the USA",
    body: "Manufacturing in Winnipeg, MB and Alexandria, MN means our equipment is built on the same continent it works on, under the standards both countries expect.",
  },
  {
    kicker: "Lead times",
    title: "No ocean between you and your unit",
    body: "Domestic production keeps lead times measured in weeks rather than shipping seasons, and keeps freight costs and border delays off your order.",
  },
  {
    kicker: "Parts and service",
    title: "Support on both sides of the border",
    body: "Parts ship domestically from either plant, so a part for a machine in Manitoba or Minnesota does not clear customs to reach your job site.",
  },
  {
    kicker: "Built for this climate",
    title: "Designed where the cold is real",
    body: "Our equipment is engineered and tested in the conditions our customers work in, by the same people who build it and answer the service calls.",
  },
];

// Photo of the Alexandria, MN plant. Drop the file in public/images/ and set
// this to its path — the panel renders a labelled placeholder until then.
const PLANT_PHOTO: string | null = "/images/Alexandria.png";

export default function WhyTamarack() {
  return (
    <section id="why" className="border-b border-[color:var(--line)]">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="tech-label text-[color:var(--orange)]">Why Tamarack</p>
          <h2 className="font-display mt-4 text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-[color:var(--ink)] md:text-5xl">
            Manufactured in Canada and the USA
          </h2>
          <p className="font-body mt-6 max-w-md text-base leading-relaxed text-[color:var(--ink-dim)]">
            Tamarack has manufactured heating and construction equipment for the
            trades since 1995, from our own plants in Winnipeg, Manitoba and
            Alexandria, Minnesota. Building on both sides of the border keeps
            lead times short, parts close, and quality in our own hands.
          </p>

          {PLANT_PHOTO ? (
            <Image
              src={PLANT_PHOTO}
              alt="Tamarack Industries plant in Alexandria, Minnesota"
              width={878}
              height={549}
              className="mt-9 h-auto w-full rounded-2xl"
            />
          ) : (
            <figure className="mt-9 flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface-2)]">
              <figcaption className="px-6 text-center text-xs text-[color:var(--ink-faint)]">
                Photo of the Alexandria, MN plant
              </figcaption>
            </figure>
          )}
        </div>

        <div className="border-t border-[color:var(--line)]">
          {REASONS.map((r) => (
            <div key={r.title} className="flex gap-6 border-b border-[color:var(--line)] py-7">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--orange)]" />
              <div>
                <p className="font-mono-label text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--ember)]">
                  {r.kicker}
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold tracking-[-0.01em] text-[color:var(--ink)]">
                  {r.title}
                </h3>
                <p className="font-body mt-2 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}