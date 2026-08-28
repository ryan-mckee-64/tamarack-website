// Accessories that bolt onto the glycol heaters: every Heat King model and the
// Thawzall TCH 250. They used to sit in a stub section at the bottom of each
// product line page; they are one shared catalogue, so they get one page.

export type AccessorySpec = { label: string; value: string };

export type AccessoryImage = {
  src: string;
  alt: string;
  caption?: string;
  /** "contain" (default) sits the whole product on a white plate, which suits
   *  cutouts and studio shots. "cover" fills the frame edge to edge, for the
   *  jobsite photos that carry a real background of their own. */
  fit?: "contain" | "cover";
  /** Serve straight from /public instead of through Next's image optimizer.
   *  The optimizer rejects this jobsite photo outright, so the choice is
   *  between an unoptimized image and no image. Keep the source file small,
   *  because nothing downstream will shrink it. */
  unoptimized?: boolean;
};

export type Accessory = {
  slug: string;
  name: string;
  // Always visible on the card. Keep it to a couple of sentences: everything
  // below folds away behind "See more".
  summary: string;
  images: AccessoryImage[];
  // Longer prose, shown only once the card is expanded.
  details?: string[];
  bullets?: string[];
  specs?: AccessorySpec[];
  specsTitle?: string;
};

export const accessoriesIntro =
  "Tamarack offers various accessories for all Heat King models and Thawzall TCH 250 glycol heaters. Ask us how these accessories can improve the efficiency and performance of your job.";

export const accessories: Accessory[] = [
  {
    slug: "portable-hose-reel",
    name: "Portable Hose Reel: PHR 5600",
    summary:
      "For adding extra hose to a heater, the portable hose reel will hold 8 – 700 ft lengths of field hose.",
    images: [
      {
        src: "/images/accessories/Portable-Hose.jpg",
        alt: "Tamarack PHR 5600 portable hose reel",
      },
    ],
    bullets: [
      "Holds 5,600 ft of field hose",
      "Reversible motor with footswitch",
      "Lifting points",
      "GFI protected foot pedal",
      "Reel lock for safe transport",
      "Portable bi-directional powered reel with freewheel feature",
    ],
    specs: [
      { label: "5/8\" hose capacity", value: "5,600' (8 – 700 ft)" },
      { label: "Power requirement", value: "1 – 120 volt 15 amp" },
      { label: "Dimensions", value: "71\" L x 44\" W x 53\" H" },
      { label: "Weight", value: "725 lbs" },
    ],
  },
  {
    slug: "remote-manifolds",
    name: "Remote Manifolds",
    summary:
      "Supply and return manifolds with 2 – 75 ft 1\" hoses with 1\" quick disconnects.",
    images: [
      {
        src: "/images/accessories/Remote-manifold.jpg",
        alt: "Tamarack remote supply and return manifolds",
        fit: "cover",
        unoptimized: true,
      },
    ],
    details: [
      "When you can't get the heater close enough, you can use the remote manifolds to put the hose where you need it.",
    ],
  },
  {
    slug: "generator-kit",
    name: "MQ 6KW or 7KW Generator Kit",
    summary:
      "The diesel generator kit will allow you to run your Heat King or Thawzall TCH 250s autonomously off the internal diesel fuel tank.",
    images: [
      {
        src: "/images/accessories/MQ6KW.png",
        alt: "MQ 6KW diesel generator",
        caption: "MQ 6KW",
      },
      {
        src: "/images/accessories/MQ7000.png",
        alt: "MQ 7000 diesel generator",
        caption: "MQ 7000",
      },
    ],
    bullets: [
      "Kit designed to work with HK 600, HK 300, HK 150 and TCH 250",
      "Factory install only",
    ],
  },
  {
    slug: "extended-oil-filter-kit",
    name: "Optional Extended Oil Filter Kit",
    summary:
      "Extends the service interval on the generator that powers your heater.",
    images: [],
    bullets: [
      "Available for 6 Kw or 7 Kw MQ generators",
      "Available with Tamarack factory installed oil filter kits",
    ],
  },
  {
    slug: "booster-pump-kit",
    name: "Booster Pump Kit or Multi Stage Pump",
    summary:
      "The Booster Pump Kit is an inline pump, to boost hose pressures for elevated slabs. Works with all Heat Kings and Thawzall TCH 250.",
    images: [
      {
        src: "/images/accessories/booster-pump1.jpg",
        alt: "Tamarack booster pump kit",
        caption: "Booster Pump Kit",
      },
      {
        src: "/images/accessories/booster-pump2.jpg",
        alt: "Tamarack booster pump kit, second view",
        fit: "cover",
      },
    ],
    details: [
      "Also available at time of order are optional multi-stage field pumps installed into your Heat King. With the installed multi stage field pump option, the Booster Pump Kit is not needed.",
    ],
    specsTitle: "Booster Pump Kit specifications",
    bullets: [
      "Vertical applications up to 120'",
      "Pump will run off of on-board 6KW and 7KW MQ generators",
      "Accommodates 5/8\" or 1\" hoses",
      "110 volt / 15 amp circuit required",
      "64 lbs",
    ],
  },
  {
    slug: "portable-heat-exchanger",
    name: "Portable Heat Exchanger: HX 200",
    summary:
      "Use the HX 200 unit heater to provide dry heat on your jobsite. Works with all Heat Kings and Thawzall TCH 250.",
    images: [
      {
        src: "/images/accessories/HX200-front.png",
        alt: "Tamarack HX 200 portable heat exchanger",
      },
      {
        src: "/images/accessories/HX200-back.png",
        alt: "Tamarack HX 200 portable heat exchanger, back view",
      },
    ],
    details: [
      "75 ft 1\" supply and return hose kits with 1\" quick disconnects are required to use these on all Heat Kings.",
    ],
    bullets: [
      "Built-in thermostat",
      "Rugged design for protection during use and transport",
      "Lifting handles for moving around jobsites",
      "1\" quick disconnects for easy set up",
      "3750 CFM",
      "Lifting points for craning if needed",
    ],
    specs: [
      { label: "Heater output", value: "200,000 BTU/HR" },
      { label: "Air volume", value: "3750 cfm" },
      { label: "Power requirement", value: "1 – 120 volt 15 amp" },
      { label: "Dimensions", value: "34.5\" L x 20\" W x 33\" H" },
      { label: "Weight", value: "305 lbs" },
    ],
  },
];