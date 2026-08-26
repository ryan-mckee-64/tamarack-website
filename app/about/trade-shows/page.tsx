import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import {
  formatShowDates,
  showDateBlock,
  tradeShowPhotos,
  upcomingShows,
} from "@/lib/trade-shows";

export const metadata: Metadata = {
  title: "Trade Shows | Tamarack Industries",
  description:
    "Where to find Tamarack Industries next: upcoming trade show dates, venues and booth numbers.",
};

// The page works out which shows are still upcoming, so rebuild it daily and
// a finished show drops off on its own.
export const revalidate = 86400;

export default function TradeShowsPage() {
  const shows = upcomingShows();
  const [nextShow] = shows;

  return (
    <main>
      {/* Hero */}
      <section className="page-hero border-b border-[color:var(--line)]">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <Link
            href="/#company"
            className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
          >
            Back to about us
          </Link>

          <Reveal>
            <p className="tech-label mt-8 text-[color:var(--ember)]">About us</p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl md:text-6xl">
              Visit us at these upcoming trade shows
            </h1>
            <hr className="brand-rule mt-7 w-24" />
          </Reveal>

          {nextShow && (
            <Reveal delay={120}>
              <div className="mt-10 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-[color:var(--line-strong)] bg-[var(--surface)] px-5 py-2.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--orange)]" />
                </span>
                <span className="tech-label text-[color:var(--ember)]">Next up</span>
                <span className="text-sm font-semibold text-[color:var(--ink)]">
                  {nextShow.name}
                </span>
                <span className="text-sm text-[color:var(--ink-dim)]">
                  {formatShowDates(nextShow.start, nextShow.end)}
                </span>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Shows on the left, photos down the right */}
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
              Where to find us
            </h2>

            {shows.length > 0 ? (
              <ol className="mt-8 space-y-5">
                {shows.map((show, i) => (
                  <li key={show.slug}>
                    <Reveal delay={i * 90}>
                      <article className="group relative overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--orange)] hover:shadow-lg sm:p-7">
                        {/* Accent edge that wipes in on hover */}
                        <span
                          aria-hidden
                          className="brand-gradient absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                        />

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                          {/* Date block */}
                          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--surface-2)] px-5 py-4 text-center transition-colors duration-300 group-hover:bg-[var(--orange-tint)] sm:w-28">
                            {(() => {
                              const d = showDateBlock(show.start, show.end);
                              return (
                                <>
                                  <span className="tech-label text-[color:var(--ember)]">
                                    {d.month}
                                  </span>
                                  <span className="font-display mt-0.5 text-2xl font-extrabold tracking-[-0.02em] text-[color:var(--ink)]">
                                    {d.days}
                                  </span>
                                  <span className="mt-0.5 text-xs text-[color:var(--ink-faint)]">
                                    {d.year}
                                  </span>
                                </>
                              );
                            })()}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-[color:var(--ink)] transition-colors duration-300 group-hover:text-[color:var(--orange)] sm:text-2xl">
                              {show.name}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                              {formatShowDates(show.start, show.end)}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                              {show.venue}
                              <span className="text-[color:var(--ink-faint)]">
                                {" · "}
                              </span>
                              {show.city}
                            </p>

                            <p className="mt-4">
                              {show.booth ? (
                                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--orange-tint)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--ember)]">
                                  Booth {show.booth}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-[color:var(--line-strong)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--ink-faint)]">
                                  Booth to be announced
                                </span>
                              )}
                            </p>
                          </div>

                          {/* The show's own logo. Contained in a fixed box so
                              three very different shapes still line up down the
                              column, and decorative because the show name is
                              already the heading right beside it. */}
                          {show.logo && (
                            <div className="flex shrink-0 items-center justify-start sm:w-32 sm:justify-center sm:self-center">
                              <Image
                                src={show.logo}
                                alt=""
                                aria-hidden
                                width={400}
                                height={280}
                                className="h-14 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-16"
                              />
                            </div>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-8 rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface)] p-8 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                Our next season of shows is being booked now. Check back soon, or
                get in touch and we will let you know where to find us.
              </p>
            )}

            {/* Closing call to action */}
            <Reveal delay={120}>
              <div className="mt-12 rounded-2xl border border-[color:var(--line)] bg-[var(--surface-2)] p-8">
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-[color:var(--ink)]">
                  Want to set up a meeting at a show?
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  Let our sales team know which show you are attending and we
                  will put time aside to walk you through the equipment.
                </p>
                <Link
                  href="/contact/sales"
                  className="brand-gradient mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Contact sales
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Photo column. Sticks alongside the list on a tall screen. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
              On the floor
            </h2>

            {/* Columns rather than a grid: a two column grid ties each row to
                its tallest photo, which left ragged gaps between mixed
                portrait and landscape shots. Columns pack them tightly. */}
            <div className="mt-8 columns-2 gap-4 [column-fill:balance]">
              {tradeShowPhotos.map((photo, i) => (
                <Reveal
                  key={photo.src}
                  delay={i * 110}
                  className="mb-4 break-inside-avoid"
                >
                  <figure className="group overflow-hidden rounded-xl border border-[color:var(--line)] bg-[var(--surface-2)]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={1600}
                      height={1200}
                      sizes="(max-width: 1024px) 45vw, 22vw"
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] ${
                        i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                      }`}
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Without JavaScript the reveal never fires, so make sure the content
          is visible rather than permanently transparent. */}
      <noscript>
        {/* eslint-disable-next-line react/no-danger */}
        <style
          dangerouslySetInnerHTML={{
            __html: ".reveal{opacity:1 !important;transform:none !important}",
          }}
        />
      </noscript>
    </main>
  );
}