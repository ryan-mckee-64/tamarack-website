// lib/about.ts
//
// The About Us dropdown. Same shape as lib/resources.ts: items marked
// "planned" render the placeholder at /about/[slug] and show a grey dot in
// the menu, so a section can be listed before its page is written.

export type AboutStatus = "live" | "planned";

export type AboutItem = {
  slug: string;
  label: string;
  href: string;
  status: AboutStatus;
  blurb: string;
  /** Draws the item in the brand accent — for the one thing we are asking of
   *  customers rather than telling them. Keep it to a single item. */
  highlight?: boolean;
};

export const aboutItems: AboutItem[] = [
  {
    slug: "our-story",
    label: "Our story",
    href: "/#company",
    status: "live",
    blurb: "Who we are, and how Tamarack has built equipment since 1995.",
  },
  {
    slug: "history",
    label: "History timeline",
    href: "/about/history",
    status: "planned",
    blurb: "Milestones from the first units to the current product lines.",
  },
  {
    slug: "careers",
    label: "Careers",
    href: "/about/careers",
    status: "planned",
    blurb: "Open roles across our Winnipeg and Alexandria facilities.",
  },
  {
    slug: "trade-shows",
    label: "Trade shows",
    href: "/about/trade-shows",
    status: "planned",
    blurb: "Where to find us, and what we are bringing to each show.",
  },
  {
    slug: "share-your-unit",
    label: "Send us a picture of your unit",
    href: "/about/share-your-unit",
    status: "live",
    blurb: "Show us your machine on the job and we will send you something from Tamarack.",
    highlight: true,
  },
];

export function plannedAboutItems(): AboutItem[] {
  return aboutItems.filter((i) => i.status === "planned");
}

export function getPlannedAboutItem(slug: string): AboutItem | undefined {
  return plannedAboutItems().find((i) => i.slug === slug);
}
