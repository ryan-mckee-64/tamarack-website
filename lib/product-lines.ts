export type ModelSpec = {
  label: string;
  value: string;
};

/** One column in the "<Line> advantage" row. Either a paragraph or a short
 *  bullet list, not both. */
export type LineAdvantage = {
  title: string;
  body?: string;
  bullets?: string[];
  /** Optional icon file under /public. Rendered above the title when set. */
  icon?: string;
};

/** One card in the "Built for performance" row: a photo and a short writeup. */
export type LineFeature = {
  title: string;
  body: string;
  image?: string;
};

/** The long form product line page. A line without this falls back to the
 *  short layout: logo, summary, model cards. Fill one in per line to give it
 *  the full treatment. */
export type LinePage = {
  /** Small line under the logo, e.g. "Mobile glycol heating systems". */
  eyebrow: string;
  /** One entry per line of the headline. Each gets an accent period. */
  headline: string[];
  intro: string;
  heroImage?: string;
  /** The three short claims under the intro. */
  heroPoints: string[];
  advantageTitle: string;
  advantages: LineAdvantage[];
  /** Heading over the model comparison row, e.g. "3 sizes to fit your job". */
  modelsTitle: string;
  featuresTitle: string;
  features: LineFeature[];
  closing?: {
    title: string;
    titleAccent: string;
    body: string;
    image?: string;
  };
};

export type ProductModel = {
  slug: string;
  name: string;
  tagline: string;
  image?: string;
  description?: string;
  specs?: ModelSpec[];
  comingSoon?: boolean;
  /** Path to the brochure PDF under /public. The "View brochure" button on the
   *  model page only renders when this is set. */
  brochure?: string;
  /** High level specs for the comparison row on the product line page. Plain
   *  strings so each line can word them its own way. A model without these is
   *  left out of that row. */
  cardSpecs?: string[];
};

export type ProductLine = {
  slug: string;
  name: string;
  logo?: string;
  // Wide wordmarks sit well in the nav dropdown. Square badge logos go
  // illegible at that size, so the menu falls back to the name instead.
    logoStyle?: "wordmark" | "badge";
  accent?: string;
  logoZoom?: number;
  category: string;
  summary: string;
  models: ProductModel[];
  hasAccessories: boolean;
  /** Whole line is not in production yet. Shows a "Coming soon" tag in the
   *  Product Lines menu. */
  comingSoon?: boolean;
  /** The long form page content. Omit for lines that are not written yet. */
  linePage?: LinePage;
};

export const productLines: ProductLine[] = [
  {
        slug: "heat-king",
       name: "Heat King",
    accent: "#e02a26",
    logoZoom: 1.3,
    logo: "/images/heat-king-logo.png",
    category: "Mobile glycol heating equipment",
    summary:
      "Glycol ground thaw and heating units for concrete curing, ground thaw and temporary heat.",
    hasAccessories: true,
    models: [
      {
        slug: "hk-150",
        name: "HK 150",
        tagline: "Compact glycol unit for smaller pours and tight access sites.",
        image: "/images/heat-king150.png",
        description:
          "The smallest unit in the Heat King range, sized for tight access work and smaller pours where a full size trailer will not fit.",
        // Drop the brochure PDF at this path to switch on the View brochure
        // button: public/docs/brochures/hk-150-brochure.pdf
        // brochure: "/docs/brochures/hk-150-brochure.pdf",
        cardSpecs: [
          "150,000 BTU/hr",
          "2 - 700 ft hoses (made up of 1-700 ft, 1-500 ft & 1-200 ft)",
          "Thaw up to 2,800 ft²",
          "Cure up to 5,600 ft²",
          "Temporary heat up to 6,200 ft²",
          "50+ hrs run time",
          "New compact design (124\" x 72\" x 70\")",
          "Lifting hooks & forklift pockets (standard)",
          "Powered reel with freewheel feature",
          "On board air compressor for evacuating hoses",
        ],
        specs: [
          { label: "Ground thawing capacity", value: "up to 2,800 ft²" },
          { label: "Concrete curing capacity", value: "up to 5,600 ft²" },
          { label: "Temporary heating capacity", value: "up to 6,200 ft²" },
          { label: "Heater capacity", value: "150,000 BTUH heating fuel input" },
          {
            label: "Field hoses 5/8",
            value: "1 - 700 ft & 1 - 500 ft with 1 - 200 ft hose",
          },
          { label: "Run time", value: "50+ hours" },
          { label: "Length (from hitch)", value: "124\"" },
          { label: "Width", value: "72\"" },
          { label: "Height", value: "70\"" },
          {
            label: "Manifolds (supply & return)",
            value: "2 - 5/8\" quick connects & 1 - 1\" quick connect",
          },
          { label: "Electrical requirements", value: "1 - 120V AC 20A circuit" },
          { label: "Glycol tank capacity", value: "55 US gal" },
          { label: "Fuel tank capacity", value: "70 US gal" },
          {
            label: "Weight (empty fuel / full fuel)",
            value: "3,204 lbs / 3,703 lbs",
          },
        ],
      },
      {
        slug: "hk-300",
        name: "HK 300",
        tagline: "Mid capacity glycol unit for general ground thaw and cure work.",
        image: "/images/heat-king300.png",
        description:
          "The general purpose unit in the range, covering most ground thaw and concrete cure work on a typical site.",
        // TODO: copy the spec rows from the HK 300 spec sheet, same shape and
        // row order as HK 150 above.
        cardSpecs: [
          "300,000 BTU/hr",
          "2 - 1,400 ft hoses",
          "Thaw up to 5,600 ft²",
          "Cure up to 11,200 ft²",
          "Temporary heat up to 12,400 ft²",
          "50+ hrs run time",
          "Lifting hooks & forklift pockets (standard)",
          "Powered reel with freewheel feature",
          "On board air compressor for evacuating hoses",
        ],
      },
      {
        slug: "hk-600",
        name: "HK 600",
        tagline: "Maximum coverage glycol unit for large scale ground thaw.",
        image: "/images/heat-king600.png",
        description:
          "The largest unit in the range, built for large scale ground thaw and multi zone heating where coverage area is the limiting factor.",
        // TODO: copy the spec rows from the HK 600 spec sheet.
        cardSpecs: [
          "600,000 BTU/hr",
          "2 - 2,800 ft hoses",
          "Thaw up to 11,200 ft²",
          "Cure up to 22,400 ft²",
          "Temporary heat up to 24,800 ft²",
          "50+ hrs run time",
          "Lifting hooks & forklift pockets (standard)",
          "Powered reel with freewheel feature",
          "On board air compressor for evacuating hoses",
        ],
      },
    ],
    linePage: {
      eyebrow: "Mobile glycol heating systems",
      headline: ["Reliable", "Safe", "Simple"],
      intro:
        "A fast and efficient way to prepare foundation sites and cure concrete in cold weather.",
      heroImage: "/images/heat-king.png",
      heroPoints: [
        "Precise digital temperature control",
        "Built for safety and easy to use",
        "Rugged design built for the long term",
      ],
      advantageTitle: "Heat King advantage",
      advantages: [
        {
          title: "Fast and efficient",
          body: "Glycol gets up to operating temperature faster than competitors.",
        },
        {
          title: "Double loop technology",
          body: "Shorter hoses, more fluid and higher efficiency pumps deliver more consistent temperature to the field, for better concrete curing and ground thawing results.",
        },
        {
          title: "Blow out and store",
          body: "Glycol can be blown out of the field hoses and stored in the reservoir, with no need for extra storage containers.",
        },
        {
          title: "Versatile applications",
          bullets: [
            "Foundation thawing and concrete curing",
            "In-floor heating manifolds",
            "Tank heating",
            "Steam coil glycol retrieval",
          ],
        },
        {
          title: "Flexible",
          body: "Glycol can be left in the field hoses or in the reservoir, whichever suits the application.",
        },
      ],
      modelsTitle: "3 sizes to fit your job",
      featuresTitle: "Built for performance and peace of mind",
      features: [
        {
          title: "Precise digital temperature control",
          body: "Digital temperature control and monitoring lets you adjust output in 1 degree increments between 0 and 180 degrees F, on an easy to read display.",
          // image: "/images/heat-king/control-display.jpg",
        },
        {
          title: "User friendly control panel",
          body: "Large switches work with winter gloves. The emergency stop button instantly shuts down all functions, and a GFI breaker protects the entire system.",
          // image: "/images/heat-king/control-panel.jpg",
        },
        {
          title: "Rugged design",
          body: "The powered reel holds all 1,400 to 5,600 feet of hose. Lockable doors protect equipment and tools, and everything is controlled by a heavy duty CSA and UL approved foot switch.",
          // image: "/images/heat-king/hose-reel.jpg",
        },
      ],
      closing: {
        title: "Built by contractors.",
        titleAccent: "Made for the toughest jobs.",
        body: "Heat King mobile glycol heating systems deliver the reliability, simplicity and performance you need to keep your projects on schedule, no matter how cold it gets.",
        // image: "/images/heat-king/jobsite.jpg",
      },
    },
  },
  {
        slug: "thawzall-xhr",
       name: "Thawzall",
    accent: "#b01f2e",
    logoZoom: 1.3,
    logo: "/images/thawzall-logo.png",
    category: "Flameless and mobile glycol heating equipment",
    summary:
      "Flameless and hydronic heaters built for enclosed and sensitive work areas.",
    hasAccessories: true,
        models: [
      {
        slug: "tch-250",
        name: "TCH 250",
        tagline: "Hydronic surface heater for thaw, cure and temporary heat.",
      },
      {
        slug: "xhr-700",
        name: "XHR 700",
        tagline: "Largest flameless heater in the XHR range.",
      },
      {
        slug: "xhr-475",
        name: "XHR 475",
        tagline: "Mid capacity flameless heater for general site work.",
      },
      {
        slug: "xhr-200",
        name: "XHR 200",
        tagline: "Compact flameless heater for smaller enclosed areas.",
        comingSoon: true,
      },
    ],
  },
    {
        slug: "renegade",
    name: "Renegade",
    accent: "#f5b301",
    logo: "/images/renegade-logo.png",
    category: "Sub-compact tractor loader backhoe",
    summary:
      "Subcompact tractor loader backhoe sized for tight access work and utility trenching.",
    hasAccessories: false,
    models: [],
  },
    {
       slug: "maverick",
    name: "Maverick",
    accent: "#ffc400",
    logo: "/images/maverick-logo.png",
    category: "Site sweeper",
    summary:
      "Site sweepers for dust control and surface cleanup on active job sites.",
    hasAccessories: false,
    comingSoon: true,
    models: [],
  },
    {
        slug: "mud-dog",
        name: "Mud Dog",
    accent: "#e2711d",
    logoZoom: 1.25,
                        logo: "/images/muddog-logo-2.png",
    category: "Electric and gas concrete buggies",
    summary:
      "Concrete power buggies for moving material across rough and confined job sites.",
    hasAccessories: false,
    models: [],
  },
  {
        slug: "yard-dog",
        name: "Yard Dog",
    accent: "#b08d2e",
    logoZoom: 1.3,
    logo: "/images/yarddog-logo.png",
    category: "Trailer mover",
    summary:
      "Trailer movers for repositioning loaded trailers in yards and staging areas.",
    hasAccessories: false,
    models: [],
  },
];

export function getProductLine(slug: string): ProductLine | undefined {
  return productLines.find((p) => p.slug === slug);
}

export function getModel(
  lineSlug: string,
  modelSlug: string
): ProductModel | undefined {
  return getProductLine(lineSlug)?.models.find((m) => m.slug === modelSlug);
}

export function allModelParams(): { slug: string; model: string }[] {
  return productLines.flatMap((line) =>
    line.models.map((m) => ({ slug: line.slug, model: m.slug }))
  );
}