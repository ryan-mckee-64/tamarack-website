// components/sections/WhyTamarack.tsx
const REASONS = [
  {
    kicker: "Established 1995",
    title: "Family owned Manitoba manufacturer",
    body: "Nearly three decades serving the construction, rental, and resource industries across Canada and the US.",
  },
  {
    kicker: "In house",
    title: "Designed and manufactured under one roof",
    body: "Engineering, fabrication, and assembly happen in our own facilities, so quality is controlled end to end.",
  },
  {
    kicker: "Two facilities",
    title: "Support on both sides of the border",
    body: "Plants in Winnipeg, MB and Alexandria, MN keep parts and service close to your job site.",
  },
  {
    kicker: "Documented",
    title: "Full manuals and parts support",
    body: "Every unit ships with complete documentation, and parts are a search away in our library.",
  },
];

export default function WhyTamarack() {
  return (
    <section id="why" className="border-b border-[color:var(--line)]">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="tech-label text-[color:var(--orange)]">Why Tamarack</p>
          <h2 className="font-display mt-4 text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-[color:var(--ink)] md:text-5xl">
            Built and backed in Manitoba
          </h2>
          <p className="font-body mt-6 max-w-md text-base leading-relaxed text-[color:var(--ink-dim)]">
            Tamarack has manufactured heating and construction equipment for the
            trades since 1995. That experience shows up in the build quality and
            the support behind every unit.
          </p>
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