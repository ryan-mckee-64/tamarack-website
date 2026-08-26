import Image from "next/image";

// The timeline that runs down the right side of the section.
// Sarah is updating the dates and wording — replace the entries below.
const MILESTONES = [
  { year: "1995", title: "Founded in Winnipeg", body: "Tamarack Industries begins building heating equipment for Manitoba contractors working through prairie winters." },
  { year: "2005", title: "Heat King line launched", body: "Glycol ground thaw units enter production, giving contractors a way to cure concrete and thaw ground in deep cold." },
  { year: "2015", title: "Flameless heat added", body: "The Thawzall line brings flameless and hydronic heating to enclosed and sensitive work areas." },
  { year: "2020", title: "Second plant opens", body: "A Minnesota facility joins the Manitoba plant, shortening lead times for customers across the US." },
  { year: "Today", title: "Six product lines", body: "Heating, earthmoving, material handling and site cleanup equipment shipping across Canada and the US." },
];

// Archive photos that sit between the paragraphs on the left. Drop each file in
// public/images/history/ and set src to its path — the slot renders a labelled
// placeholder until then, so the layout is already the right shape.
type StoryPhoto = {
  src: string | null;
  alt: string;
  caption: string;
};

// Set src to the file path once the photo is in public/images/. Until then
// each slot renders a labelled dashed placeholder at the right aspect ratio,
// so the page layout is already final.
const PHOTO_ONE: StoryPhoto = {
  src: "/images/L1.png",
  alt: "A Tamarack heater running on an excavation site",
  caption: "Ground thaw and curing on a winter excavation",
};

const PHOTO_TWO: StoryPhoto = {
  src: "/images/L2.png",
  alt: "A Tamarack unit working on a job site",
  caption: "",
};

function StoryImage({ photo }: { photo: StoryPhoto }) {
  if (!photo.src) {
    return (
      <figure className="my-10 flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface-2)]">
        <figcaption className="px-6 text-center text-xs text-[color:var(--ink-faint)]">
          {photo.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="my-10">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={878}
        height={549}
        className="h-auto w-full rounded-2xl"
      />

    </figure>
  );
}

// Product photos stacked under the timeline on the right.
const TIMELINE_PHOTOS: StoryPhoto[] = [
  {
    src: "/images/R1.JPG",
    alt: "A row of Tamarack Heat King glycol heating units outside the plant",
    caption: "Heat King units ready to ship",
  },
  {
    src: "/images/R2.png",
    alt: "Tamarack ground thaw trailers lined up in a yard",
    caption: "Ground thaw trailers",
  },
  {
    src: "/images/R3.jpg",
    alt: "A Thawzall flameless heater on site",
    caption: "Thawzall flameless heat",
  },
];

export default function CompanyStory() {
  return (
    <section id="company" className="scroll-mt-28 border-t border-[color:var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10">
        {/* Story on the left, timeline down the right. The timeline sticks as
            the story scrolls, so the two stay related on a tall screen. */}
        <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <p className="tech-label text-[color:var(--ember)]">Our company</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-4xl">
              Thirty years of building equipment for the construction and rental
              industries
            </h2>

            <p className="mt-7 text-lg leading-relaxed text-[color:var(--ink-dim)]">
              Tamarack Industries (formerly Crown Construction Equipment) was
              founded in 1995 in Winnipeg, MB. Tamarack is a family owned
              business that has been proudly supporting the construction and
              rental industries throughout the US and Canada for over 30 years.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
              By listening closely to our customers and combining their feedback
              with thoughtful engineering, we create equipment that is simple to
              manufacture, operate, maintain, and repair.
            </p>

            <StoryImage photo={PHOTO_ONE} />

            <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
              How we work
            </h3>

            <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-dim)]">
              We are committed to building long-lasting relationships with our
              customers through exceptional support, training, and service. Many
              of our product improvements and new ideas have come directly from
              listening to our customers and acting on their feedback.
            </p>

            <StoryImage photo={PHOTO_TWO} />

            <p className="text-base leading-relaxed text-[color:var(--ink-dim)]">
              With decades of experience and thousands of units in the field, we
              have learned the importance of optimizing design using superior
              manufacturing techniques (Design for Manufacturing). This has
              allowed us to produce high-quality, reliable, easy to operate and
              maintain, and competitive products.
            </p>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="tech-label text-[color:var(--ember)]">Our timeline</p>
            <ol className="relative mt-6 border-l border-[color:var(--line)] pl-8">
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
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {TIMELINE_PHOTOS.map((photo) => (
                <figure key={photo.src}>
                  <Image
                    src={photo.src as string}
                    alt={photo.alt}
                    width={878}
                    height={549}
                    className="h-auto w-full rounded-2xl"
                  />

                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}