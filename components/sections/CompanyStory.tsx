import Image from "next/image";

const MILESTONES = [
  { year: "1995", title: "Founded in Winnipeg", body: "Tamarack Industries begins building heating equipment for Manitoba contractors working through prairie winters." },
  { year: "2005", title: "Heat King line launched", body: "Glycol ground thaw units enter production, giving contractors a way to cure concrete and thaw ground in deep cold." },
  { year: "2015", title: "Flameless heat added", body: "The Thawzall line brings flameless and hydronic heating to enclosed and sensitive work areas." },
  { year: "2020", title: "Second plant opens", body: "A Minnesota facility joins the Manitoba plant, shortening lead times for customers across the US." },
  { year: "Today", title: "Six product lines", body: "Heating, earthmoving, material handling and site cleanup equipment shipping across Canada and the US." },
];

export default function CompanyStory() {
  return (
    <section id="company" className="scroll-mt-28 border-t border-[color:var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10">

        {/* Intro with product photo */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="tech-label text-[color:var(--ember)]">Our company</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-4xl">
              Thirty years of building equipment for the conditions we live in.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink-dim)]">
              We build in Manitoba because we work in Manitoba. Every machine
              that leaves our plant is designed around the reality that a job
              site does not stop for weather, and that equipment which fails in
              the cold is equipment that costs somebody a week.
            </p>
          </div>

         <div>
            <Image
              src="/images/heat-king.png"
              alt="Tamarack Heat King mobile glycol heating system on a trailer"
              width={878}
              height={522}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>

        {/* How we work and timeline */}
        <div className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-[color:var(--ink)]">
              How we work
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-dim)]">
              Our equipment is engineered, built and serviced by the same people.
              That means the person who answers a service call has usually stood
              beside the machine on a line. It also means changes that come back
              from the field reach the next build rather than the next model
              year.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-dim)]">
              We supply the construction, rental and resource industries across
              Canada and the United States, from single unit purchases to full
              rental fleets.
            </p>
          </div>

          <ol className="relative border-l border-[color:var(--line)] pl-8">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative pb-9 last:pb-0">
                <span className="brand-gradient absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-white" />
                <p className="tech-label text-[color:var(--ember)]">{m.year}</p>
                <h4 className="mt-1 font-semibold text-[color:var(--ink)]">
                  {m.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}