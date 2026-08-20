// lib/trade-shows.ts
//
// The shows on /about/trade-shows. Dates are ISO so the page can work out
// what is still upcoming on its own — a show drops off the list the day
// after it ends, rather than sitting there stale until someone remembers.

export type TradeShow = {
  slug: string;
  name: string;
  /** First day of the show, ISO yyyy-mm-dd. */
  start: string;
  /** Last day of the show, ISO yyyy-mm-dd. */
  end: string;
  venue: string;
  city: string;
  /** Null until the booth is assigned — renders as "Booth TBD". */
  booth: string | null;
  /** Optional link to the show's own site. */
  url?: string;
};

export const tradeShows: TradeShow[] = [
  {
    slug: "world-of-concrete-2027",
    name: "World of Concrete 2027",
    start: "2027-01-19",
    end: "2027-01-21",
    venue: "Las Vegas Convention Center",
    city: "Las Vegas, NV",
    booth: "Central Hall #C3231",
  },
  {
    slug: "ara-show-2027",
    name: "ARA Show 2027",
    start: "2027-02-14",
    end: "2027-02-16",
    venue: "Ernest N. Morial Convention Center",
    city: "New Orleans, LA",
    booth: null,
  },
  {
    slug: "utility-expo-2027",
    name: "Utility Expo 2027",
    start: "2027-10-05",
    end: "2027-10-07",
    venue: "Kentucky Exposition Center",
    city: "Louisville, KY",
    booth: null,
  },
];

/** Photos from previous shows, down the right hand side of the page. */
export const tradeShowPhotos: { src: string; alt: string }[] = [
  {
    src: "/images/tradeshow1.JPEG",
    alt: "Tamarack equipment on the show floor at an indoor trade show",
  },
  {
    src: "/images/tradeshow2.JPEG",
    alt: "A Heat King unit on display in the Tamarack booth",
  },
  {
    src: "/images/tradeshow3.jpg",
    alt: "The Tamarack team at the booth",
  },
  {
    src: "/images/tradeshow4.jpg",
    alt: "The Tamarack outdoor display at a trade show",
  },
];

/** Formats a run of dates the way it reads on a save-the-date:
 *  "January 19 - 21, 2027", or "February 27 - March 2, 2027" across a month. */
export function formatShowDates(start: string, end: string): string {
  const s = new Date(`${start}T12:00:00Z`);
  const e = new Date(`${end}T12:00:00Z`);
  const month = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
  const day = (d: Date) => d.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" });
  const year = e.toLocaleDateString("en-US", { year: "numeric", timeZone: "UTC" });

  return month(s) === month(e)
    ? `${month(s)} ${day(s)} - ${day(e)}, ${year}`
    : `${month(s)} ${day(s)} - ${month(e)} ${day(e)}, ${year}`;
}

/** The short month and day range for the date block, e.g. "Jan" / "19-21". */
export function showDateBlock(start: string, end: string) {
  const s = new Date(`${start}T12:00:00Z`);
  const e = new Date(`${end}T12:00:00Z`);
  return {
    month: s.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase(),
    days:
      s.getUTCMonth() === e.getUTCMonth()
        ? `${s.getUTCDate()}-${e.getUTCDate()}`
        : `${s.getUTCDate()}-${e.getUTCDate()}`,
    year: String(e.getUTCFullYear()),
  };
}

/** Shows that have not finished yet, soonest first. */
export function upcomingShows(now: Date = new Date()): TradeShow[] {
  const today = now.toISOString().slice(0, 10);
  return tradeShows
    .filter((s) => s.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start));
}