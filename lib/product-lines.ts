export type ProductModel = {
  slug: string;
  name: string;
  tagline: string;
};

export type ProductLine = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  models: ProductModel[];
  hasAccessories: boolean;
};

export const productLines: ProductLine[] = [
  {
    slug: "heat-king",
    name: "Heat King",
    category: "Glycol heaters",
    summary:
      "Glycol ground thaw and heating units for concrete curing, ground thaw and temporary heat.",
    hasAccessories: true,
    models: [
      { slug: "hk-150", name: "HK 150", tagline: "Compact glycol unit for smaller pours and tight access sites." },
      { slug: "hk-300", name: "HK 300", tagline: "Mid capacity glycol unit for general ground thaw and cure work." },
      { slug: "hk-400", name: "HK 400", tagline: "Higher output glycol unit for larger coverage areas." },
      { slug: "hk-700", name: "HK 700", tagline: "Maximum coverage glycol unit for large scale ground thaw." },
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
      { slug: "tch-250", name: "TCH 250", tagline: "Hydronic surface heater for thaw, cure and temporary heat." },
      { slug: "xhr-475", name: "XHR 475", tagline: "Flameless air heater for enclosed spaces with no open flame." },
      { slug: "xhr-700", name: "XHR 700", tagline: "High output flameless air heater for larger enclosures." },
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