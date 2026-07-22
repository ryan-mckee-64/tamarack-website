export type DocumentCategory = "brochure" | "operator" | "parts";

export type ProductDocument = {
  id: string;
  productSlug: string;
  category: DocumentCategory;
  title: string;
  variant?: string;
  documentNumber?: string;
  revision?: string;
  years: number[];
  fileUrl: string;
  fileSize?: string;
};

export type Product = {
  slug: string;
  name: string;
  family: string;
  summary: string;
};

export const categoryLabels: Record<DocumentCategory, string> = {
  brochure: "Brochures",
  operator: "Operator manuals",
  parts: "Parts manuals",
};

export const categoryOrder: DocumentCategory[] = ["brochure", "operator", "parts"];

export function yearRange(start: number, end: number): number[] {
  const out: number[] = [];
  for (let y = start; y <= end; y++) out.push(y);
  return out;
}

export function formatYears(years: number[]): string {
  if (!years.length) return "All model years";
  const sorted = [...new Set(years)].sort((a, b) => a - b);
  const runs: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i <= sorted.length; i++) {
    const y = sorted[i];
    if (y === prev + 1) {
      prev = y;
      continue;
    }
    runs.push(start === prev ? `${start}` : `${start} to ${prev}`);
    start = y;
    prev = y;
  }
  return runs.join(", ");
}

export const products: Product[] = [
  {
    slug: "heat-king",
    name: "Heat King",
    family: "Glycol heaters",
    summary:
      "Glycol ground thaw and heating units for concrete curing, ground thaw and temporary heat.",
  },
  {
    slug: "thawzall-xhr",
    name: "Thawzall XHR",
    family: "Flameless and glycol heat",
    summary:
      "Flameless air heaters and combination units built for enclosed and sensitive work areas.",
  },
  {
    slug: "renegade",
    name: "Renegade",
    family: "Subcompact tractor loader backhoe",
    summary:
      "Subcompact tractor loader backhoe sized for tight access work and utility trenching.",
  },
  {
    slug: "mud-dog",
    name: "Mud Dog",
    family: "Concrete power buggy",
    summary:
      "Concrete power buggies for moving material across rough and confined job sites.",
  },
  {
    slug: "yard-dog",
    name: "Yard Dog",
    family: "Trailer mover",
    summary:
      "Trailer movers for repositioning loaded trailers in yards and staging areas.",
  },
  {
    slug: "maverick",
    name: "Maverick",
    family: "Site sweeper",
    summary:
      "Site sweepers for dust control and surface cleanup on active job sites.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Placeholder rows. Replace the fileUrl values with your real PDFs
// as you drop them into public/docs, and add one row per document.
export const documents: ProductDocument[] = [
  {
    id: "hk-brochure-current",
    productSlug: "heat-king",
    category: "brochure",
    title: "Heat King product brochure",
    years: yearRange(2020, 2026),
    fileUrl: "/docs/heat-king/heat-king-brochure.pdf",
    fileSize: "3.1 MB",
  },
  {
    id: "hk-op-2022",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 400",
    documentNumber: "600512",
    revision: "R2",
    years: yearRange(2022, 2026),
    fileUrl: "/docs/heat-king/heat-king-operator-2022.pdf",
    fileSize: "6.4 MB",
  },
  {
    id: "hk-op-2016",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 400",
    documentNumber: "600512",
    revision: "R1",
    years: yearRange(2016, 2021),
    fileUrl: "/docs/heat-king/heat-king-operator-2016.pdf",
    fileSize: "5.9 MB",
  },
  {
    id: "hk-parts-2022",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 400",
    documentNumber: "600690",
    years: yearRange(2022, 2026),
    fileUrl: "/docs/heat-king/heat-king-parts-2022.pdf",
    fileSize: "8.2 MB",
  },
  {
    id: "xhr-op-475-700",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "XHR flameless air heater operator manual",
    variant: "XHR 475 and XHR 700",
    documentNumber: "600835",
    revision: "R1",
    years: yearRange(2021, 2026),
    fileUrl: "/docs/thawzall-xhr/xhr-operator-600835-r1.pdf",
    fileSize: "7.5 MB",
  },
];

export function documentsForProduct(slug: string): ProductDocument[] {
  return documents.filter((d) => d.productSlug === slug);
}

export function documentCountsForProduct(slug: string) {
  const docs = documentsForProduct(slug);
  return {
    total: docs.length,
    brochure: docs.filter((d) => d.category === "brochure").length,
    operator: docs.filter((d) => d.category === "operator").length,
    parts: docs.filter((d) => d.category === "parts").length,
  };
}