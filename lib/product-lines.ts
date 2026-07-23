export type ModelSpec = {
  label: string;
  value: string;
};

export type ProductModel = {
  slug: string;
  name: string;
  tagline: string;
  image?: string;
  description?: string;
  specs?: ModelSpec[];
};

export type ProductLine = {
  slug: string;
  name: string;
  logo?: string;
  category: string;
  summary: string;
  models: ProductModel[];
  hasAccessories: boolean;
};

export const productLines: ProductLine[] = [
  {
    slug: "heat-king",
    name: "Heat King",
    logo: "/images/heat-king-logo.png",
    category: "Glycol heaters",
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
      },
      {
        slug: "hk-300",
        name: "HK 300",
        tagline: "Mid capacity glycol unit for general ground thaw and cure work.",
        image: "/images/heat-king300.png",
        description:
          "The general purpose unit in the range, covering most ground thaw and concrete cure work on a typical site.",
      },
      {
        slug: "hk-600",
        name: "HK 600",
        tagline: "Maximum coverage glycol unit for large scale ground thaw.",
        image: "/images/heat-king600.png",
        description:
          "The largest unit in the range, built for large scale ground thaw and multi zone heating where coverage area is the limiting factor.",
      },
    ],
  },
  {
    slug: "thawzall-xhr",
    name: "Thawzall",
    category: "Flameless and hydronic heat",
    summary:
      "Flameless and hydronic heaters built for enclosed and sensitive work areas.",
    hasAccessories: true,
    models: [
      {
        slug: "tch-250",
        name: "TCH 250",
        tagline: "Hydronic surface heater for thaw, cure and temporary heat.",
      },
    ],
  },
  {
    slug: "renegade",
    name: "Renegade",
    category: "Tractor loader backhoe",
    summary:
      "Subcompact tractor loader backhoe sized for tight access work and utility trenching.",
    hasAccessories: true,
    models: [],
  },
  {
    slug: "maverick",
    name: "Maverick",
    category: "Site sweeper",
    summary:
      "Site sweepers for dust control and surface cleanup on active job sites.",
    hasAccessories: true,
    models: [],
  },
  {
    slug: "mud-dog",
    name: "Mud Dog",
    category: "Concrete power buggy",
    summary:
      "Concrete power buggies for moving material across rough and confined job sites.",
    hasAccessories: true,
    models: [],
  },
  {
    slug: "yard-dog",
    name: "Yard Dog",
    category: "Trailer mover",
    summary:
      "Trailer movers for repositioning loaded trailers in yards and staging areas.",
    hasAccessories: true,
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
