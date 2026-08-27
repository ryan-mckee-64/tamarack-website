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
  /** Temporarily pulled from the menus, product cards and contact form. The
   *  model page still exists at its URL — this only removes the links. */
  hidden?: boolean;
  /** Optional sub-heading in the Product Lines dropdown, for a line that
   *  splits into more than one kind of machine. Models with no group render
   *  first, ungrouped. */
  group?: string;
  /** Path to the brochure PDF under /public. The "Download brochure" button on
   *  the model page only renders when this is set. */
  brochure?: string;
  /** Training, demo and maintenance videos for this model. Renders as a list
   *  under the specs. YouTube/Vimeo watch URLs are fine — these are links,
   *  not embeds. */
  videos?: { label: string; url: string }[];
  /** Job site photos shown above the specifications on the model page. */
  gallery?: { src: string; alt: string }[];
  /** Feature writeups shown under the specifications on the model page. */
  features?: LineFeature[];
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
  /** Temporarily pulled from the menus, footer, product cards and contact
   *  form. The line's pages still exist — this only removes the links. */
  hidden?: boolean;
  /** Which block the line sits in on /products. */
  family?: "heating" | "equipment";
  /** The long form page content. Omit for lines that are not written yet. */
  linePage?: LinePage;
};

// All specifications below are transcribed from the 2026 Tamarack product
// catalogue. Where the catalogue and an older spec sheet disagree, the
// catalogue wins.

export const productLines: ProductLine[] = [
  {
    slug: "heat-king",
    name: "Heat King",
    accent: "#e02a26",
    logoZoom: 1.3,
    logo: "/images/heat-king-logo.png",
        category: "Mobile glycol heaters",
    family: "heating",
    summary:
      "Glycol ground thaw and heating units for concrete curing, ground thaw and temporary heat.",
    hasAccessories: true,
    models: [
      {
        slug: "hk-150",
        name: "HK 150",
        tagline: "Mobile glycol heating system",
        image: "/images/heat-king150.png",
        description:
          "The HK 150 is the smallest model in the Heat King line. The smaller, more compact design of the HK 150 allows for trouble-free towing and placement around the job site.",
        brochure: "/docs/brochures/hk-150-brochure.pdf",
        gallery: [
          {
            src: "/images/HK1501.JPG",
            alt: "Tamarack HK 150 with the service doors open, showing the pump and reel",
          },
          {
            src: "/images/HK1502.JPG",
            alt: "Tamarack HK 150 parked outside the plant",
          },
        ],
        cardSpecs: [
          "150,000 BTU/hr",
          "2 - 700 ft hoses (made up of 1-700 ft, 1-500 ft & 1-200 ft)",
          "Thaw up to 2,800 ft²",
          "Cure up to 5,600 ft²",
          "Temporary heat up to 6,200 ft²",
          "New compact design (124\" x 72\" x 70\")",
          "50+ hrs run time",
          "Lifting hooks & forklift pockets (standard)",
          "Powered reel with freewheel feature",
          "On board air compressor for evacuating hoses",
        ],
        specs: [
          { label: "Ground thawing capacity", value: "2,800 ft²" },
          { label: "Concrete curing capacity", value: "5,600 ft²" },
          {
            label: "Temporary heating capacity",
            value: "6,200 ft² (varies with R-value)",
          },
          {
            label: "Field hoses 5/8\"",
            value: "1 - 700 ft, 1 - 500 ft, 1 - 200 ft",
          },
          { label: "Heater capacity, diesel", value: "150,000 BTU/H heating fuel input" },
          { label: "Glycol tank capacity", value: "55 US gal" },
          { label: "Fuel tank capacity", value: "70 US gal" },
          { label: "Run time", value: "50+ hours" },
          {
            label: "Fuel consumption",
            value: "HK 150 = 1.1 GPH, genset = 0.55 GPH",
          },
          { label: "Electrical requirements", value: "1 - 120V AC 20A circuit" },
          { label: "Dimensions", value: "124\" x 72\" x 70\"" },
          { label: "Weight (fuel empty / full)", value: "3,204 lbs / 3,703 lbs" },
        ],
        features: [
          {
            title: "Safe design",
            body: "The Heat King uses only centrifugal pumps for the field and circulation loops. Safer than positive displacement pumps, they are engineered to eliminate dangerous pressure situations.",
          },
          {
            title: "Powerful 150,000 BTU/Hr burner",
            body: "By using a coil for the heat exchanger, Heat Kings are built to be more rugged and durable than competing systems that rely on boilers designed to be stationary.",
          },
          {
            title: "Rugged trailer design",
            body: "The Heat King's trailer features a rugged unibody design with 4,400 lb leaf springs for stable, reliable towing. All doors can be locked during operation, helping protect the unit, tools, and equipment from tampering or theft.",
          },
          {
            title: "Hose reel",
            body: "The Heat King's powered reel holds all 1,400 feet of hose. Operation is controlled by a heavy duty CSA and UL approved foot switch, leaving the hands free to control the hose.",
          },
          {
            title: "Precise digital temperature control",
            body: "The Heat King features precise digital temperature control and monitoring. With the touch of a button on the control panel, operators can adjust the output temperature in 1 degree F increments anywhere from 0 to 180 degrees F.",
          },
          {
            title: "User friendly control panel",
            body: "All Heat King control panels feature large, easy-to-use switches designed for operation even while wearing winter gloves. A prominent emergency stop button immediately shuts down all functions, while a ground fault circuit interrupter (GFI) breaker provides protection for the electrical system.",
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
        cardSpecs: [
          "311,000 BTU/hr",
          "4 - 700 ft hoses",
          "Thaw up to 5,600 ft²",
          "Cure up to 11,200 ft²",
          "Temporary heat up to 12,000 ft²",
          "Up to 120 hrs run time",
          "CSA/UL certified",
          "PLC controlled system",
          "Bi-directional powered reel with freewheel feature",
          "On board air compressor for evacuating hoses",
        ],
        specs: [
          { label: "Hose", value: "4 - 700 ft field hoses (5/8\" hose)" },
          {
            label: "Supply manifold",
            value: "4 - 1/2\" quick connect & 1 - 1\" quick connect",
          },
          {
            label: "Return manifold",
            value: "4 - 1/2\" quick connect & 1 - 1\" quick connect",
          },
          { label: "Ground thawing capacity", value: "5,600 ft²" },
          { label: "Concrete curing capacity", value: "11,200 ft²" },
          {
            label: "Temporary heating capacity",
            value: "12,000 ft² (varies with R-value)",
          },
          { label: "Field pump", value: "1 Hp centrifugal" },
          { label: "Circulating pump", value: "1/2 Hp centrifugal" },
          { label: "Heater capacity, diesel", value: "311,000 BTU/H heating fuel input" },
          { label: "Burner", value: "Beckett burner" },
          { label: "Glycol tank", value: "96 US gal" },
          { label: "Fuel tank", value: "192 US gal" },
          { label: "Run time", value: "Up to 120 hours" },
          {
            label: "Fuel consumption",
            value: "HK 300 = 2.24 GPH, genset = 0.55 GPH",
          },
          { label: "Electrical requirements", value: "2 - 120V AC 20A circuits" },
          { label: "Generator (optional)", value: "1 - 7 kW or 1 - 6 kW MQ" },
          { label: "Axle", value: "1 - 7,000 lb torsion axle, electric brakes" },
          { label: "Hitch", value: "2 5/16\" ball (pintle also available)" },
          { label: "Dimensions", value: "14' x 86\" x 83\"" },
          { label: "Weight (fuel empty / full)", value: "5,665 lbs / 7,009 lbs" },
        ],
      },
      {
        slug: "hk-600",
        name: "HK 600",
        tagline: "Maximum coverage glycol unit for large scale ground thaw.",
        image: "/images/heat-king600.png",
        description:
          "The largest unit in the range, built for large scale ground thaw and multi zone heating where coverage area is the limiting factor.",
        cardSpecs: [
          "605,000 BTU/hr",
          "8 - 700 ft hoses",
          "Thaw up to 11,200 ft²",
          "Cure up to 22,400 ft²",
          "Up to 60 hrs run time",
          "CSA/UL certified",
          "PLC controlled system",
          "Bi-directional powered reel with freewheel feature",
          "On board air compressor",
        ],
        specs: [
          { label: "Hose", value: "8 - 700 ft field hoses (5/8\" hose)" },
          {
            label: "Supply manifold",
            value: "8 - 1/2\" quick connect & 2 - 1\" quick connect",
          },
          {
            label: "Return manifold",
            value: "8 - 1/2\" quick connect & 2 - 1\" quick connect",
          },
          { label: "Ground thawing capacity", value: "11,200 ft²" },
          { label: "Concrete curing capacity", value: "22,400 ft²" },
          {
            label: "Temporary heating capacity",
            value: "15,000 ft² (varies with R-value)",
          },
          { label: "Field pump", value: "1 Hp centrifugal" },
          { label: "Circulating pump", value: "1/2 Hp centrifugal" },
          { label: "Heater capacity, diesel", value: "605,000 BTU/H heating fuel input" },
          { label: "Burner", value: "Beckett burner" },
          { label: "Glycol tank", value: "130 US gal" },
          { label: "Fuel tank", value: "192 US gal" },
          { label: "Run time", value: "Up to 60 hours" },
          {
            label: "Fuel consumption",
            value: "HK 600 = 4.44 GPH, genset = 0.55 GPH",
          },
          { label: "Electrical requirements", value: "2 - 120V AC 20A circuits" },
          { label: "Generator (optional)", value: "1 - 7 kW or 1 - 6 kW MQ" },
          { label: "Axle", value: "1 - 8,000 lb torsion axle, electric brakes" },
          { label: "Hitch", value: "2 5/16\" ball (pintle also available)" },
          {
            label: "Dimensions",
            value: "165\" x 75\" x 84\" (including heater vent)",
          },
          { label: "Weight (fuel empty / full)", value: "7,095 lbs / 8,439 lbs" },
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
        "The best return on investment",
        "Easy to use and easy to maintain",
        "Built for the long term",
      ],
      advantageTitle: "Heat King advantage",
      advantages: [
        {
          title: "Fast and efficient",
          body: "Glycol gets up to operating temperature faster than competitors. A dedicated circulation pump pulls from the reservoir, so it does not have to push cold glycol through the field hoses.",
        },
        {
          title: "Double loop technology",
          body: "Shorter hoses, more fluid and higher efficiency pumps with increased flow give more consistent temperature to the field, for better concrete curing and ground thawing results.",
        },
        {
          title: "Blow out and store",
          body: "Glycol can be blown out of the field hoses and stored in the reservoir, so there is no need for a separate container. Handy when abandoning hoses in concrete, or on space heating set-ups and take-downs.",
        },
        {
          title: "Versatile applications",
          bullets: [
            "Foundation thawing and concrete curing",
            "Tying into existing manifolds such as in-floor heating",
            "Oil and gas tank heating",
            "Retrieving glycol from steam coils",
          ],
        },
        {
          title: "Flexible",
          body: "Glycol can be left in the field hoses or in the reservoir, whichever suits the job.",
        },
      ],
      modelsTitle: "3 sizes to fit your job",
      featuresTitle: "Built for performance and peace of mind",
      features: [
        {
          title: "Precise digital temperature control",
          body: "The Heat King features digital temperature control and monitoring. At the touch of a button on the control panel, output temperature can be changed in increments of 1°, anywhere between 0 and 180 °F.",
          // image: "/images/heat-king/control-display.jpg",
        },
        {
          title: "User friendly control panel",
          body: "All Heat King control panels use large switches that work with winter gloves on. The panel has a large emergency stop that immediately stops all functions, and a ground fault interrupt breaker protecting the entire system.",
          // image: "/images/heat-king/control-panel.jpg",
        },
        {
          title: "Rugged design",
          body: "Rugged torsion axles for better towing, and a powered reel that holds all 1,400 to 5,600 feet of hose. All doors lock during operation, and a heavy duty CSA and UL approved foot switch leaves your hands free to control the hose.",
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
      category: "Flameless heaters & mobile glycol heaters",
    family: "heating",
    summary:
      "Flameless and hydronic heaters built for enclosed and sensitive work areas.",
    hasAccessories: true,
    models: [
      {
        slug: "tch-250",
        name: "TCH 250",
        group: "Glycol heating equipment",
        tagline: "Hydronic surface heater for thaw, cure and temporary heat.",
        description:
          "HeatZone fluid distribution and a three way mixing valve give precise outlet temperature control, which makes the TCH 250 the pick of the range for concrete curing.",
        cardSpecs: [
          "5 - 600 ft hoses",
          "Thaw up to 6,000 ft²",
          "Cure up to 12,000 ft²",
          "Temporary heat up to 12,000 ft²",
          "Over 3 days run time",
          "Return temperature indicators on all 5 zones",
          "Bi-directional powered reel with freewheel feature",
          "Simple to operate, 1 switch with digital monitoring",
          "HeatZone fluid distribution",
        ],
        specs: [
          { label: "Hose", value: "5 - 600 ft field hoses (5/8\" hose)" },
          {
            label: "Supply manifold",
            value: "5 - 3/4\" quick connect & 1 - 1\" quick connect",
          },
          {
            label: "Return manifold",
            value: "5 - 3/4\" quick connect & 1 - 1\" quick connect",
          },
          { label: "Ground thawing capacity", value: "Up to 6,000 ft²" },
          { label: "Concrete curing capacity", value: "Up to 12,000 ft²" },
          {
            label: "Temporary heating capacity",
            value: "12,000 ft² (varies with R-value)",
          },
          { label: "Field pump", value: "1/2 Hp closed loop centrifugal" },
          { label: "Heater capacity, diesel", value: "280,000 BTU/H heating fuel input" },
          { label: "Fuel tank", value: "150 US gal double wall tank" },
          { label: "Run time", value: "Up to 100 hours (with genset)" },
          {
            label: "Fuel consumption",
            value: "TCH 250 = 2.06 GPH, genset = 0.55 GPH",
          },
          { label: "Electrical requirements", value: "1 - 120V AC 20A circuit" },
          { label: "Generator (optional)", value: "1 - 7,000 W" },
          { label: "Hitch", value: "2 5/16\" ball (pintle also available)" },
          { label: "Dimensions", value: "170\" x 84\" x 93\"" },
          { label: "Weight (fuel full)", value: "5,900 lbs" },
        ],
      },
      {
        slug: "xhr-700",
        name: "XHR 700",
        group: "Flameless heaters",
        tagline: "Largest flameless heater in the XHR range.",
        description:
          "The biggest flameless unit Thawzall builds, with variable air flow up to 6,000 CFM for large enclosures and sensitive work areas.",
        cardSpecs: [
          "656,000 BTU/hr",
          "Variable air flow 2,000 - 6,000 CFM",
          "Up to 6\" static pressure",
          "Max outlet temperature 200 °F",
          "No DEF fluid required",
          "No hydraulic fluid",
          "Positive air shutoff with auto reset",
          "PLC controlled cold start and hot shut down sequence",
          "Lower duct louvers to control airflow",
        ],
        specs: [
          { label: "Nominal heat output", value: "656,000 BTU/hr" },
          { label: "CFM", value: "2,000 - 6,000 CFM" },
          { label: "Max heat output", value: "200 °F / 93 °C" },
          {
            label: "Engine",
            value: "Fiat F28, 74 HP with Mecc Alte 3PH, 480V (240V only at the outlet with the transformer)",
          },
          { label: "Optional engines", value: "Deutz TD 3.6, Cat 2.8" },
          { label: "Air handler", value: "6 HP blower, variable speed" },
          { label: "Positive air shutoff", value: "Auto reset" },
          { label: "Outlets", value: "2 - 12\", outlet has damper in lower duct" },
          { label: "Fuel capacity", value: "138 gallons" },
          { label: "Fuel burn (max)", value: "4.2 GPH" },
          { label: "Run time", value: "32+ hours" },
          { label: "Dimensions (L x W x H)", value: "164\" x 75\" x 86\"" },
          { label: "Weight", value: "5,200 lbs no fuel, 6,000 lbs with fuel" },
        ],
      },
      {
        slug: "xhr-475",
        name: "XHR 475",
        group: "Flameless heaters",
        hidden: true,
        tagline: "Mid capacity flameless heater for general site work.",
        description:
          "The general purpose flameless unit, on the same frame as the XHR 700 with a smaller engine and fuel tank.",
        cardSpecs: [
          "475,000 BTU/hr",
          "Variable air flow 2,000 - 5,000 CFM",
          "Up to 6\" static pressure",
          "Max outlet temperature 200 °F",
          "No DEF fluid required",
          "No hydraulic fluid",
          "Positive air shutoff with auto reset",
          "PLC controlled cold start and hot shut down sequence",
          "Lower duct louvers to control airflow",
        ],
        specs: [
          { label: "Nominal heat output", value: "475,000 BTU/hr" },
          { label: "CFM", value: "2,000 - 5,000 CFM" },
          { label: "Max heat output", value: "200 °F / 93 °C" },
          {
            label: "Engine",
            value: "Fiat F28, 50 HP with Mecc Alte 3PH, 480V (240V only at the outlet with the transformer)",
          },
          { label: "Air handler", value: "6 HP blower, variable speed" },
          { label: "Positive air shutoff", value: "Auto reset" },
          { label: "Outlets", value: "2 - 12\", outlet has damper in lower duct" },
          { label: "Fuel capacity", value: "90 gallons" },
          { label: "Optional fuel tank", value: "138 gallons" },
          { label: "Fuel burn (max)", value: "3.4 GPH" },
          { label: "Run time", value: "32+ hours" },
          { label: "Dimensions (L x W x H)", value: "164\" x 75\" x 86\"" },
          { label: "Weight", value: "4,800 lbs no fuel, 5,400 lbs with fuel" },
        ],
      },
      {
        slug: "xhr-200",
        name: "XHR 200",
        group: "Flameless heaters",
        tagline: "Compact flameless heater for smaller enclosed areas.",
        comingSoon: true,
        description:
          "Designed to be compact enough to fit in the back of a pickup truck, for job sites where the XHR 700 trailer is too large.",
        cardSpecs: [
          "200,000 BTU/hr",
          "Compact design, fits in the back of a pickup truck",
          "1,800 CFM",
          "Max outlet temperature 180 °F",
          "No DEF fluid required",
          "No hydraulic fluid",
          "Positive air shutoff with auto reset",
          "PLC controlled cold start and hot shut down sequence",
        ],
        specs: [
          { label: "Nominal heat output", value: "200,000 BTU/hr" },
          { label: "CFM", value: "1,800 CFM" },
          { label: "Max heat output", value: "180 °F / 82 °C" },
          { label: "Engine", value: "Kubota" },
          { label: "Air handler", value: "3/4 axial fan" },
          { label: "Positive air shutoff", value: "Auto reset" },
          { label: "Outlet", value: "1 - 12\"" },
          { label: "Power distribution", value: "Two 120V, 20A outlets" },
          { label: "Optional light tower", value: "12,000 lumens" },
          { label: "Dimensions (L x W x H)", value: "57\" x 27\" x 48\"" },
          { label: "Dry weight", value: "1,188 lbs" },
          { label: "Fuel tank capacity", value: "Integral fuel tank coming soon" },
        ],
      },
      {
        slug: "xhr-1000",
        name: "XHR 1000",
        tagline: "High capacity flameless heater for large enclosures.",
        group: "Flameless heaters",
        comingSoon: true,
        description:
          "The largest unit in the flameless range. Specifications are being finalised — contact sales for availability.",
      },
    ],
    linePage: {
      eyebrow: "Mobile glycol and flameless heating systems",
      headline: ["Tough", "Durable", "Trusted"],
      intro:
        "Thawzall heating systems are built tough and durable for the rental market, for a wide variety of uses and applications.",
      heroImage: "/images/thawzall.png",
      heroPoints: [
        "No DEF fluid and no hydraulic fluid",
        "Safe, clean and dry flameless heat",
        "Built for the rental market",
      ],
      advantageTitle: "Thawzall advantage",
      advantages: [
        {
          title: "Built for any application",
          bullets: [
            "Ground thawing",
            "Concrete curing",
            "Space heating",
            "Oil and gas",
            "Frost prevention",
            "Airline heat cart (XHR)",
          ],
        },
        {
          title: "No DEF, no hydraulics",
          body: "The XHR needs no DEF fluid and no hydraulic fluid, which means no hydraulic filters, no leaks and no hydraulic oil to dispose of.",
        },
        {
          title: "User friendly controls",
          body: "Three step start up at the touch of a button, a variable speed fan to control air volume, up to the second performance information, and either a single set point or high, medium and low temperature control.",
        },
        {
          title: "Service friendly",
          body: "The XHR has only four service items: engine coolant, engine oil and oil filter, fuel filter and air filter.",
        },
        {
          title: "Built to last",
          body: "A rugged design built to withstand any job site conditions, in the harshest of environments.",
        },
      ],
      modelsTitle: "Four units to fit your job",
      featuresTitle: "Options that earn their place",
      features: [
        {
          title: "LED light tower",
          body: "A telescopic hydraulic 23 foot mast putting out 252,000 total lumens, so one machine heats and lights the site. Less equipment to manage, and a safer job site.",
          // image: "/images/thawzall/light-tower.jpg",
        },
        {
          title: "Return air duct",
          body: "2 x 12 inch or 1 x 16 inch with return air duct. Recirculating air that is already warm saves fuel over pulling in cold outside air.",
          // image: "/images/thawzall/return-air-duct.jpg",
        },
        {
          title: "Remote telematics",
          body: "Engine and machine information in an app, so you can monitor an XHR's performance remotely. A remote thermostat is also available for increased fuel efficiency.",
          // image: "/images/thawzall/telematics.jpg",
        },
      ],
      closing: {
        title: "A trusted name in the industry.",
        titleAccent: "Built for the harshest environments.",
        body: "With a commitment to innovation and many years of experience, Thawzall heating systems are built to withstand the toughest of projects in the harshest of environments.",
        // image: "/images/thawzall/jobsite.jpg",
      },
    },
  },
  {
    slug: "renegade",
    name: "Renegade",
    accent: "#f5b301",
    logo: "/images/renegade-logo.png",
    category: "Sub-compact tractor loader backhoes",
    family: "equipment",
    hidden: true,
    summary:
      "Subcompact tractor loader backhoe sized for tight access work and utility trenching.",
    hasAccessories: false,
    models: [
      {
        slug: "tlb-25",
        name: "TLB-25",
        tagline: "Sub-compact tractor loader backhoe built for high utilization.",
        image: "/images/renegade.png",
        description:
          "Engineered and manufactured in North America, and designed for the rental industry, the Renegade TLB-25 is built durable to support high utilization.",
        cardSpecs: [
          "25 HP Kubota or 25 HP Honda iGX800 gas",
          "2,000 lb loader lift capacity",
          "1/2 cu yard bucket capacity",
          "4,600 lb breakout force",
          "102\" digging depth",
          "154\" backhoe reach",
          "180° bucket rotation and boom swing",
          "60\" loader bucket with removable Black Cat wear edge",
          "6.5 MPH travelling speed",
          "Universal quick attach, fits all Bob-Tach attachments",
        ],
        specs: [
          {
            label: "Engine options",
            value: "25 HP Kubota, or 25 HP Honda iGX800 gas",
          },
          { label: "Drive motors", value: "2 heavy duty gerotors" },
          { label: "Rear drive", value: "Two-wheel hydrostatic" },
          { label: "Lubrication", value: "Pressurized filter" },
          {
            label: "Front axle",
            value: "Heavy duty crossbeam, 1 3/4\" diameter spindle, hydraulic power steering",
          },
          { label: "Fuel tank capacity", value: "8 gallons" },
          { label: "Pump output flow", value: "12 GPM at 3,600 RPM" },
          { label: "Pump type", value: "Gear" },
          { label: "Hydraulic pressure", value: "3,000 PSI" },
          { label: "Loader valve", value: "3 spool monoblock" },
          { label: "Backhoe valve", value: "7 spool stack type" },
          { label: "Cylinders", value: "2\", 2 1/2\" & 3\"" },
          { label: "Hydraulic oil capacity", value: "12 gallons" },
          { label: "Loader bucket size", value: "60\"" },
          { label: "Loader lift capacity", value: "2,000 lbs" },
          { label: "Loader bucket capacity", value: "1/2 cu yard" },
          { label: "Loader bucket rollback", value: "35°" },
          { label: "Loader height to pin", value: "97\"" },
          { label: "Backhoe breakout force", value: "4,600 lbs" },
          { label: "Backhoe bucket rotation", value: "180°" },
          { label: "Backhoe boom swing", value: "180°" },
          { label: "Backhoe digging depth", value: "102\"" },
          { label: "Backhoe dump height", value: "103\"" },
          { label: "Backhoe reach", value: "154\"" },
          { label: "Front tires", value: "23\" x 10.5\" x 12\" 4 ply" },
          { label: "Rear tires", value: "31\" x 15.5\" x 15\" high flotation" },
          { label: "Transportation length", value: "17 feet" },
          { label: "Transportation weight", value: "4,300 lbs" },
          { label: "Transportation height", value: "92\"" },
          { label: "Overall width", value: "62\"" },
          { label: "Overall height", value: "83\"" },
          { label: "Wheelbase", value: "83\"" },
          { label: "Ground clearance", value: "13\"" },
          { label: "Front tire to front bucket", value: "53\"" },
        ],
      },
    ],
    linePage: {
      eyebrow: "Tractor loader backhoe",
      headline: ["Compact", "Rugged", "Rental ready"],
      intro:
        "The Renegade TLB-25 was engineered and is manufactured in North America. Designed for the rental industry, the Renegade is built durable to support high utilization.",
      heroImage: "/images/renegade.png",
      heroPoints: [
        "Engineered and manufactured in North America",
        "Built to support high utilization",
        "Fits all Bob-Tach attachments",
      ],
      advantageTitle: "Renegade advantage",
      advantages: [
        {
          title: "Curved arm loader",
          body: "Better operator sight lines, and better strength.",
        },
        {
          title: "60 inch loader bucket",
          body: "With a removable Black Cat wear edge.",
        },
        {
          title: "Remote hydraulics on the loader valve",
          body: "Accessory remote hydraulics for running a loader grapple.",
        },
        {
          title: "Remote hydraulics on the backhoe valve",
          body: "Accessory remote hydraulics for running a backhoe thumb.",
        },
        {
          title: "Angled backhoe outriggers",
          body: "For a stable footing on uneven ground.",
        },
      ],
      modelsTitle: "The TLB-25",
      featuresTitle: "Standard on every Renegade",
      features: [
        {
          title: "Universal quick attach",
          body: "Fits all Bob-Tach attachments, so the Renegade takes the attachments your fleet already runs.",
          // image: "/images/renegade/quick-attach.jpg",
        },
        {
          title: "Built for the operator",
          body: "A comfortable reversible seat, a steel sunshade, and front and rear LED working lights.",
          // image: "/images/renegade/operator-station.jpg",
        },
        {
          title: "Rigid all steel construction",
          body: "A compact design with low maintenance costs and a travelling speed of 6.5 MPH.",
          // image: "/images/renegade/construction.jpg",
        },
      ],
      closing: {
        title: "New from Tamarack.",
        titleAccent: "Built for the rental industry.",
        body: "Engineered and manufactured in North America, the Renegade TLB-25 is built durable to support the high utilization a rental fleet puts on a machine.",
        // image: "/images/renegade/jobsite.jpg",
      },
    },
  },
  {
    slug: "maverick",
    name: "Maverick",
    accent: "#ffc400",
    logo: "/images/maverick-logo.png",
    category: "Site sweepers",
    family: "equipment",
    hidden: true,
    summary:
      "Site sweepers for dust control and surface cleanup on active job sites.",
    hasAccessories: false,
    comingSoon: true,
    models: [
      {
        slug: "sw-25",
        name: "SW-25",
        tagline: "Eight foot site sweeper for roads, pavement and development sites.",
        image: "/images/maverick.png",
        description:
          "An all steel site sweeper with an eight foot broom and a 75 gallon water system, built for streets, fresh pavement and new development sites.",
        cardSpecs: [
          "24.8 HP Kubota D902",
          "8 ft broom length",
          "0 - 12 MPH speed",
          "75 gallon / 284 L water system",
          "2,950 lbs (3,700 lbs with water)",
          "13 ft long, 8 ft wide",
          "5 ft inside sweeping radius",
          "Broom angles 40° either way",
          "Four point ROPS for safety",
          "Brush choices: steel wire, polyethylene, or 50/50",
        ],
        specs: [
          { label: "Engine", value: "24.8 HP Kubota D902" },
          { label: "Drive motors", value: "2 heavy duty gerotors" },
          { label: "Speed", value: "12 MPH" },
          { label: "Steering", value: "Hydraulic power, 60° either way" },
          { label: "Length", value: "13 feet" },
          { label: "Width", value: "8 feet" },
          { label: "Weight", value: "2,950 lbs" },
          { label: "Weight with water", value: "3,700 lbs" },
          { label: "Water system", value: "75 gallons / 284 L" },
          { label: "Fuel capacity", value: "11 gallons / 42 L" },
          { label: "Engine oil capacity", value: "2.8 L" },
          { label: "Hydraulic oil capacity", value: "11 gallons / 42 L" },
          { label: "Inside sweeping radius", value: "5 feet" },
          { label: "Broom length", value: "8 feet" },
          { label: "Broom angle", value: "40° either way" },
          { label: "Broom drive", value: "Hydraulic motor" },
          { label: "Brush size", value: "6 3/8\" ID x 24\" OD" },
          { label: "Tires", value: "P205 75R15 four-ply radial" },
          { label: "Hitch", value: "2\" or 2 5/16\" ball hitch" },
        ],
      },
    ],
    linePage: {
      eyebrow: "Site sweeper",
      headline: ["All steel", "Rugged", "Simple"],
      intro:
        "An eight foot broom on an all steel machine, built for streets, fresh pavement and new development sites.",
      heroImage: "/images/maverick.png",
      heroPoints: [
        "Four point ROPS for safety",
        "8 ft broom",
        "0 - 12 MPH speed",
      ],
      advantageTitle: "Maverick advantage",
      advantages: [
        {
          title: "All steel construction",
          body: "A rugged design throughout, including a steel broom core.",
        },
        {
          title: "Dual shock absorbers",
          body: "On the broom frame, to keep the brush working evenly over rough ground.",
        },
        {
          title: "Welded hydraulic cylinders",
          body: "With greaseable pins, so the wear points stay serviceable.",
        },
        {
          title: "Steel sunshade and LED lights",
          body: "A steel sunshade over the operator, with front and rear LED working lights for early starts and late finishes.",
        },
        {
          title: "Sweeps just about anything",
          bullets: [
            "Streets, roads and parking lots",
            "Fresh pavement and new development sites",
            "Oil, tar, gravel, salt and sand",
            "Artificial turf",
            "Clean up from storms",
          ],
        },
      ],
      modelsTitle: "The SW-25",
      featuresTitle: "Made for safety, comfort and easy maintenance",
      features: [
        {
          title: "Broom and sweeping system",
          body: "A steel broom core with a choice of brush: steel wire, polyethylene, or a 50/50 poly and wire mix. A front debris deflector keeps material in front of the brush.",
          // image: "/images/maverick/broom.jpg",
        },
        {
          title: "Easy to service",
          body: "The hood swings up for service access, the front wheel spindle is greasable, there is a hydraulic sight gauge, and engine protection is standard.",
          // image: "/images/maverick/service-access.jpg",
        },
        {
          title: "Built around the operator",
          body: "Four point ROPS, a comfortable operator seat, a key style ignition module with warning lights and an hour meter, rear fenders, and a surge brake towing coupler with trailer tail lights.",
          // image: "/images/maverick/operator-station.jpg",
        },
      ],
      closing: {
        title: "New from Tamarack.",
        titleAccent: "Made to clear the site.",
        body: "From fresh pavement to storm cleanup, the Maverick SW-25 is an all steel sweeper built to keep working through the jobs that wear other machines out.",
        // image: "/images/maverick/jobsite.jpg",
      },
    },
  },
  {
    slug: "mud-dog",
    name: "Mud Dog",
    accent: "#e2711d",
    logoZoom: 1.25,
    logo: "/images/muddog-logo-2.png",
    category: "Concrete buggies",
    family: "equipment",
    summary:
      "Concrete power buggies for moving material across rough and confined job sites.",
    hasAccessories: false,
    models: [
      {
        slug: "cb-1600e",
        name: "CB-1600E",
        tagline: "Battery powered concrete buggy for indoor and enclosed pours.",
        description:
          "A 7 kW lithium ion battery powered buggy with up to 8 hours of run time, for pours where exhaust and noise are a problem.",
        cardSpecs: [
          "7 kW lithium ion battery powered",
          "Up to 8 hr run time, 6 hr charge (15 amp, 110 volt)",
          "16 cu ft / 2,500 lbs capacity",
          "31\" wide on single wheels, fits standard doorways",
          "6\" minimum dump height to avoid damaging forms",
          "Top speed 7 MPH, 3 speed settings",
          "Enhanced drive controls",
          "Electro-hydraulic dump control",
          "Superior braking system",
        ],
        specs: [
          { label: "Capacity", value: "16 cu ft / 2,500 lbs" },
          { label: "Power", value: "7 kW/hr Vanguard lithium ion battery" },
          { label: "Run time", value: "Up to 8 hr" },
          { label: "Weight (empty / full)", value: "1,220 lbs / 3,750 lbs" },
          { label: "Height (bucket up / down)", value: "67\" / 53\"" },
          { label: "Width, dual wheels", value: "46\"" },
          {
            label: "Width, single wheels",
            value: "31\" (fits through standard doorways)",
          },
          { label: "Length (platform up / down)", value: "93\" / 105.5\"" },
          { label: "Discharge height, min", value: "6\"" },
          { label: "Ground clearance", value: "5.5\"" },
          { label: "Top speed", value: "7 MPH" },
          { label: "Speed settings", value: "3 settings" },
          { label: "Bucket type", value: "Poly or steel" },
        ],
      },
      {
        slug: "cb-1600",
        name: "CB-1600",
        tagline: "Gas powered concrete buggy for general site work.",
        description:
          "The gas buggy in the range, with a 13 HP Honda or 14 HP Vanguard engine and the same bucket and footprint as the electric.",
        cardSpecs: [
          "13 HP Honda gasoline or 14 HP Vanguard",
          "16 cu ft / 2,500 lbs capacity",
          "4 gal fuel tank",
          "31\" wide on single wheels, fits standard doorways",
          "6\" minimum dump height to avoid damaging forms",
          "Top speed 7 MPH",
          "Enhanced drive controls",
          "Electro-hydraulic dump control",
          "Foot pedal braking for speed control",
        ],
        specs: [
          { label: "Capacity", value: "16 cu ft / 2,500 lbs" },
          {
            label: "Power",
            value: "13 HP Honda gasoline, or 14 HP Vanguard",
          },
          { label: "Fuel tank", value: "4 gal" },
          { label: "Weight (empty / full)", value: "1,200 lbs / 3,750 lbs" },
          { label: "Height (bucket up / down)", value: "67\" / 53\"" },
          { label: "Width, dual wheels", value: "46\"" },
          {
            label: "Width, single wheels",
            value: "31\" (fits through standard doorways)",
          },
          { label: "Length (platform up / down)", value: "93\" / 105.5\"" },
          { label: "Discharge height, min", value: "6\"" },
          { label: "Ground clearance", value: "5.5\"" },
          { label: "Top speed", value: "7 MPH" },
          { label: "Bucket type", value: "Poly or steel" },
        ],
      },
      {
        slug: "cb-2100-poly",
        name: "CB-2100 Poly",
        tagline: "Larger capacity buggy with a poly bucket.",
        comingSoon: true,
        description:
          "A higher capacity addition to the buggy range with a poly bucket. Specifications are being finalised — contact sales for availability.",
      },
    ],
    linePage: {
      eyebrow: "Electric and gas powered concrete buggies",
      headline: ["Tough", "Compact", "Simple"],
      intro:
        "Concrete buggies built tough and durable for rental, with comfortable and simple operation.",
      heroImage: "/images/muddog.png",
      heroPoints: [
        "Fits through standard doorways",
        "Easy maintenance",
        "Built tough and durable, great for rental",
      ],
      advantageTitle: "Mud Dog advantage",
      advantages: [
        {
          title: "Enhanced drive controls",
          body: "Finger tip controls let the operator keep both hands safely on the steering handle, for full control at all times.",
        },
        {
          title: "Electro-hydraulic dump control",
          body: "A thumb switch dumps or retracts the bucket, so the operator never lets go of the handle.",
        },
        {
          title: "Fits standard doorways",
          body: "Removable wheels bring the width down from 46 inches to 31 inches, narrow enough to get through a standard doorway.",
        },
        {
          title: "Protects your forms",
          body: "The bucket is restricted to a 6 inch minimum dump height, which stops the operator hitting forms or rebar.",
        },
        {
          title: "Superior braking",
          body: "A parking brake holds the buggy on inclines, and foot pedal braking gives the operator speed control on the way down.",
        },
      ],
      modelsTitle: "Electric or gas",
      featuresTitle: "Details that matter on a pour",
      features: [
        {
          title: "Multi function display",
          body: "An HDMI display on the CB-1600E covers both operation and service information at a glance.",
          // image: "/images/mud-dog/display.jpg",
        },
        {
          title: "Retractable standing platform",
          body: "The platform folds away, so the operator can ride or walk the buggy depending on the pour.",
          // image: "/images/mud-dog/platform.jpg",
        },
        {
          title: "Standard foam filled tires",
          body: "No flats to deal with on a site full of rebar offcuts and broken block.",
          // image: "/images/mud-dog/tires.jpg",
        },
      ],
      closing: {
        title: "Built tough and durable.",
        titleAccent: "Great for rental.",
        body: "Easy maintenance, a footprint that fits through standard doorways, and comfortable, simple operation on both the electric and the gas buggy.",
        // image: "/images/mud-dog/jobsite.jpg",
      },
    },
  },
  {
    slug: "yard-dog",
    name: "Yard Dog",
    accent: "#b08d2e",
    logoZoom: 1.3,
    logo: "/images/yarddog-logo.png",
    category: "Trailer movers",
    family: "equipment",
    summary:
      "Trailer movers for repositioning loaded trailers in yards and staging areas.",
    hasAccessories: false,
    // Yard Dog does not appear in the 2026 catalogue, so there is no linePage
    // or model data for it yet. Add both here and the long form layout turns
    // on automatically, exactly as it does for the other lines.
    models: [],
  },
];

/** Everything the public navigation should show. Use this rather than
 *  `productLines` anywhere a visitor picks from a list. */
export const visibleProductLines = productLines.filter((l) => !l.hidden);

/** The visible models within a line, in data order. */
export function visibleModels(line: ProductLine): ProductModel[] {
  return line.models.filter((m) => !m.hidden);
}

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
