// lib/solutions.ts
//
// The "Applications and Industry solutions" menu, split into two groups.
// Each entry carries the products that apply to it, so the solution page can
// send a visitor straight to the right equipment. Product entries are plain
// label/href pairs rather than model slugs, because some of them are
// attachments that do not have a page of their own yet.

export type SolutionKind = "application" | "industry";

export type SolutionProduct = {
  label: string;
  href: string;
};

export type Solution = {
  slug: string;
  label: string;
  href: string;
  kind: SolutionKind;
  /** One line, used as the page's standfirst and in listings. */
  description: string;
  /** How our equipment fits this application or industry. Each string is a
   *  paragraph. Omit and the page just runs description → equipment. */
  body?: string[];
  /** Photo of the work being done. Set to a path under /public once the
   *  photo arrives; null renders a labelled placeholder at the right size. */
  photo?: string | null;
  photoCaption?: string;
  products: SolutionProduct[];
};

// Shorthands for the product sets that repeat across several solutions.
const GLYCOL_HEATERS: SolutionProduct[] = [
  { label: "HK 150", href: "/products/heat-king/hk-150" },
  { label: "HK 300", href: "/products/heat-king/hk-300" },
  { label: "HK 600", href: "/products/heat-king/hk-600" },
  { label: "TCH 250", href: "/products/thawzall-xhr/tch-250" },
];

const FLAMELESS_HEATERS: SolutionProduct[] = [
  { label: "XHR 475", href: "/products/thawzall-xhr/xhr-475" },
  { label: "XHR 700", href: "/products/thawzall-xhr/xhr-700" },
];

const GROUND_PREP: SolutionProduct[] = [
  { label: "Renegade tractor loader backhoe", href: "/products/renegade" },
  { label: "Maverick site sweeper", href: "/products/maverick" },
  { label: "Trencher attachment", href: "/products/renegade" },
  { label: "Stump grinder attachment", href: "/products/renegade" },
];

const LANDSCAPING: SolutionProduct[] = [
  { label: "Renegade tractor loader backhoe", href: "/products/renegade" },
  { label: "Trencher attachment", href: "/products/renegade" },
  { label: "Stump grinder attachment", href: "/products/renegade" },
];

export const solutions: Solution[] = [
  // By application
  {
    slug: "ground-thaw",
    label: "Ground thaw",
    href: "/solutions/ground-thaw",
    kind: "application",
    description:
      "Thawing frozen ground ahead of excavation and foundation work.",
    body: [
      "PLACEHOLDER — how our glycol units thaw frozen ground: hose layout over the area, insulated blankets on top, and the depth and rate you can expect in a prairie winter.",
      "PLACEHOLDER — how to size the job: square footage per unit, typical run times, and when to step up from an HK 150 to an HK 300 or HK 600.",
    ],
    photo: null,
    photoCaption: "Hoses and blankets laid out on a frozen site",
    products: GLYCOL_HEATERS,
  },
  {
    slug: "concrete-cure",
    label: "Concrete cure",
    href: "/solutions/concrete-cure",
    kind: "application",
    description: "Holding cure temperatures through cold weather pours.",
    products: GLYCOL_HEATERS,
  },
  {
    slug: "construction-heat",
    label: "Construction heat",
    href: "/solutions/construction-heat",
    kind: "application",
    description: "Tempering enclosures, structures and work areas.",
    products: GLYCOL_HEATERS,
  },
  {
    slug: "frost-prevention",
    label: "Frost prevention",
    href: "/solutions/frost-prevention",
    kind: "application",
    description: "Keeping prepared ground and materials from freezing.",
    products: GLYCOL_HEATERS,
  },
  {
    slug: "flameless-air-heat",
    label: "Flameless air heat",
    href: "/solutions/flameless-air-heat",
    kind: "application",
    description:
      "Heated air with no open flame, for enclosed and sensitive work areas.",
    products: FLAMELESS_HEATERS,
  },
  {
    slug: "ground-preparation",
    label: "Site preparation",
    href: "/solutions/ground-preparation",
    kind: "application",
    description:
      "Digging, trenching, grading and cleanup to get a site ready to build.",
    products: GROUND_PREP,
  },

  // By industry
  {
    slug: "oil-and-gas",
    label: "Oil and gas",
    href: "/solutions/oil-and-gas",
    kind: "industry",
    description: "Heat for wellsites, pipelines and remote field operations.",
    products: FLAMELESS_HEATERS,
  },
  {
    slug: "construction",
    label: "Construction",
    href: "/solutions/construction",
    kind: "industry",
    description:
      "Thaw, cure and temporary heat that keeps a build moving through winter.",
    products: [
      { label: "HK 150", href: "/products/heat-king/hk-150" },
      { label: "HK 300", href: "/products/heat-king/hk-300" },
      { label: "HK 600", href: "/products/heat-king/hk-600" },
    ],
  },
  {
    slug: "rental",
    label: "Rental",
    href: "/solutions/rental",
    kind: "industry",
    description:
      "Equipment built to survive a rental fleet, backed by parts and service on both sides of the border.",
    products: [{ label: "All product lines", href: "/products" }],
  },
  {
    slug: "landscaping",
    label: "Landscaping",
    href: "/solutions/landscaping",
    kind: "industry",
    description:
      "Compact machines and attachments for tight access grounds work.",
    products: LANDSCAPING,
  },
  {
    slug: "agriculture",
    label: "Agriculture",
    href: "/solutions/agriculture",
    kind: "industry",
    description: "Utility digging, trenching and clearing around the yard.",
    products: LANDSCAPING,
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function solutionsByKind(kind: SolutionKind): Solution[] {
  return solutions.filter((s) => s.kind === kind);
}

export const applicationSolutions = solutionsByKind("application");
export const industrySolutions = solutionsByKind("industry");