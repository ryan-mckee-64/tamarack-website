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

// Test data. Every fileUrl points at the preview page for now.
// When the real PDFs are added, change each fileUrl to its real path,
// for example /docs/heat-king/600512-r3.pdf
export const documents: ProductDocument[] = [
  {
    id: "hk-bro-2020",
    productSlug: "heat-king",
    category: "brochure",
    title: "Heat King product brochure",
    years: yearRange(2020, 2026),
    fileUrl: "/manuals/preview/hk-bro-2020",
    fileSize: "2.7 MB",
  },
  {
    id: "hk-bro-2012",
    productSlug: "heat-king",
    category: "brochure",
    title: "Heat King product brochure, archived",
    years: yearRange(2012, 2019),
    fileUrl: "/manuals/preview/hk-bro-2012",
    fileSize: "3.4 MB",
  },
  {
    id: "hk-op-400-r3",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 400",
    documentNumber: "600512",
    revision: "R3",
    years: yearRange(2022, 2026),
    fileUrl: "/manuals/preview/hk-op-400-r3",
    fileSize: "6.8 MB",
  },
  {
    id: "hk-op-400-r2",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 400",
    documentNumber: "600512",
    revision: "R2",
    years: yearRange(2018, 2021),
    fileUrl: "/manuals/preview/hk-op-400-r2",
    fileSize: "6.1 MB",
  },
  {
    id: "hk-op-400-r1",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 400",
    documentNumber: "600512",
    revision: "R1",
    years: yearRange(2012, 2017),
    fileUrl: "/manuals/preview/hk-op-400-r1",
    fileSize: "5.2 MB",
  },
  {
    id: "hk-op-700-r2",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 700",
    documentNumber: "600518",
    revision: "R2",
    years: yearRange(2022, 2026),
    fileUrl: "/manuals/preview/hk-op-700-r2",
    fileSize: "7.4 MB",
  },
  {
    id: "hk-op-700-r1",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 700",
    documentNumber: "600518",
    revision: "R1",
    years: yearRange(2016, 2021),
    fileUrl: "/manuals/preview/hk-op-700-r1",
    fileSize: "6.6 MB",
  },
  {
    id: "hk-pt-400-c",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 400",
    documentNumber: "600690",
    years: yearRange(2022, 2026),
    fileUrl: "/manuals/preview/hk-pt-400-c",
    fileSize: "9.8 MB",
  },
  {
    id: "hk-pt-400-b",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 400",
    documentNumber: "600690",
    years: yearRange(2018, 2021),
    fileUrl: "/manuals/preview/hk-pt-400-b",
    fileSize: "8.9 MB",
  },
  {
    id: "hk-pt-400-a",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 400",
    documentNumber: "600690",
    years: yearRange(2012, 2017),
    fileUrl: "/manuals/preview/hk-pt-400-a",
    fileSize: "7.3 MB",
  },
  {
    id: "hk-pt-700-b",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 700",
    documentNumber: "600694",
    years: yearRange(2022, 2026),
    fileUrl: "/manuals/preview/hk-pt-700-b",
    fileSize: "11.2 MB",
  },
  {
    id: "hk-pt-700-a",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 700",
    documentNumber: "600694",
    years: yearRange(2016, 2021),
    fileUrl: "/manuals/preview/hk-pt-700-a",
    fileSize: "10.4 MB",
  },
  {
    id: "xhr-bro",
    productSlug: "thawzall-xhr",
    category: "brochure",
    title: "Thawzall XHR product brochure",
    years: yearRange(2019, 2026),
    fileUrl: "/manuals/preview/xhr-bro",
    fileSize: "4.1 MB",
  },
  {
    id: "xhr-op-b",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "XHR flameless air heater operator manual",
    variant: "XHR 475 and XHR 700",
    documentNumber: "600835",
    revision: "R1",
    years: yearRange(2021, 2026),
    fileUrl: "/manuals/preview/xhr-op-b",
    fileSize: "8.7 MB",
  },
  {
    id: "xhr-op-a",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "XHR flameless air heater operator manual",
    variant: "XHR 475",
    documentNumber: "600435",
    years: yearRange(2015, 2020),
    fileUrl: "/manuals/preview/xhr-op-a",
    fileSize: "7.9 MB",
  },
  {
    id: "xhr-pt-475-b",
    productSlug: "thawzall-xhr",
    category: "parts",
    title: "XHR parts manual",
    variant: "XHR 475",
    documentNumber: "600841",
    years: yearRange(2021, 2026),
    fileUrl: "/manuals/preview/xhr-pt-475-b",
    fileSize: "12.6 MB",
  },
  {
    id: "xhr-pt-475-a",
    productSlug: "thawzall-xhr",
    category: "parts",
    title: "XHR parts manual",
    variant: "XHR 475",
    documentNumber: "600441",
    years: yearRange(2015, 2020),
    fileUrl: "/manuals/preview/xhr-pt-475-a",
    fileSize: "10.9 MB",
  },
  {
    id: "xhr-pt-700",
    productSlug: "thawzall-xhr",
    category: "parts",
    title: "XHR parts manual",
    variant: "XHR 700",
    documentNumber: "600845",
    years: yearRange(2018, 2026),
    fileUrl: "/manuals/preview/xhr-pt-700",
    fileSize: "13.1 MB",
  },
  {
    id: "rng-bro",
    productSlug: "renegade",
    category: "brochure",
    title: "Renegade product brochure",
    years: yearRange(2021, 2026),
    fileUrl: "/manuals/preview/rng-bro",
    fileSize: "3.8 MB",
  },
  {
    id: "rng-op-b",
    productSlug: "renegade",
    category: "operator",
    title: "Renegade operator manual",
    documentNumber: "601120",
    revision: "R2",
    years: yearRange(2024, 2026),
    fileUrl: "/manuals/preview/rng-op-b",
    fileSize: "9.2 MB",
  },
  {
    id: "rng-op-a",
    productSlug: "renegade",
    category: "operator",
    title: "Renegade operator manual",
    documentNumber: "601120",
    revision: "R1",
    years: yearRange(2021, 2023),
    fileUrl: "/manuals/preview/rng-op-a",
    fileSize: "8.5 MB",
  },
  {
    id: "rng-pt-b",
    productSlug: "renegade",
    category: "parts",
    title: "Renegade parts manual",
    documentNumber: "601135",
    years: yearRange(2024, 2026),
    fileUrl: "/manuals/preview/rng-pt-b",
    fileSize: "13.7 MB",
  },
  {
    id: "rng-pt-a",
    productSlug: "renegade",
    category: "parts",
    title: "Renegade parts manual",
    documentNumber: "601135",
    years: yearRange(2021, 2023),
    fileUrl: "/manuals/preview/rng-pt-a",
    fileSize: "12.4 MB",
  },
  {
    id: "md-bro",
    productSlug: "mud-dog",
    category: "brochure",
    title: "Mud Dog product brochure",
    years: yearRange(2018, 2026),
    fileUrl: "/manuals/preview/md-bro",
    fileSize: "2.9 MB",
  },
  {
    id: "md-op-b",
    productSlug: "mud-dog",
    category: "operator",
    title: "Mud Dog operator manual",
    variant: "MD 16",
    documentNumber: "600310",
    revision: "R2",
    years: yearRange(2020, 2026),
    fileUrl: "/manuals/preview/md-op-b",
    fileSize: "5.6 MB",
  },
  {
    id: "md-op-a",
    productSlug: "mud-dog",
    category: "operator",
    title: "Mud Dog operator manual",
    variant: "MD 16",
    documentNumber: "600310",
    revision: "R1",
    years: yearRange(2014, 2019),
    fileUrl: "/manuals/preview/md-op-a",
    fileSize: "4.8 MB",
  },
  {
    id: "md-pt-b",
    productSlug: "mud-dog",
    category: "parts",
    title: "Mud Dog parts manual",
    variant: "MD 16",
    documentNumber: "600325",
    years: yearRange(2020, 2026),
    fileUrl: "/manuals/preview/md-pt-b",
    fileSize: "7.8 MB",
  },
  {
    id: "md-pt-a",
    productSlug: "mud-dog",
    category: "parts",
    title: "Mud Dog parts manual",
    variant: "MD 16",
    documentNumber: "600325",
    years: yearRange(2014, 2019),
    fileUrl: "/manuals/preview/md-pt-a",
    fileSize: "6.9 MB",
  },
  {
    id: "yd-bro",
    productSlug: "yard-dog",
    category: "brochure",
    title: "Yard Dog product brochure",
    years: yearRange(2019, 2026),
    fileUrl: "/manuals/preview/yd-bro",
    fileSize: "3.2 MB",
  },
  {
    id: "yd-op",
    productSlug: "yard-dog",
    category: "operator",
    title: "Yard Dog operator manual",
    documentNumber: "600720",
    revision: "R1",
    years: yearRange(2019, 2026),
    fileUrl: "/manuals/preview/yd-op",
    fileSize: "6.3 MB",
  },
  {
    id: "yd-pt-b",
    productSlug: "yard-dog",
    category: "parts",
    title: "Yard Dog parts manual",
    documentNumber: "600735",
    years: yearRange(2023, 2026),
    fileUrl: "/manuals/preview/yd-pt-b",
    fileSize: "9.1 MB",
  },
  {
    id: "yd-pt-a",
    productSlug: "yard-dog",
    category: "parts",
    title: "Yard Dog parts manual",
    documentNumber: "600735",
    years: yearRange(2019, 2022),
    fileUrl: "/manuals/preview/yd-pt-a",
    fileSize: "8.4 MB",
  },
  {
    id: "mv-bro",
    productSlug: "maverick",
    category: "brochure",
    title: "Maverick product brochure",
    years: yearRange(2020, 2026),
    fileUrl: "/manuals/preview/mv-bro",
    fileSize: "3.6 MB",
  },
  {
    id: "mv-op",
    productSlug: "maverick",
    category: "operator",
    title: "Maverick operator manual",
    documentNumber: "600910",
    revision: "R1",
    years: yearRange(2020, 2026),
    fileUrl: "/manuals/preview/mv-op",
    fileSize: "7.1 MB",
  },
  {
    id: "mv-pt",
    productSlug: "maverick",
    category: "parts",
    title: "Maverick parts manual",
    documentNumber: "600925",
    years: yearRange(2020, 2026),
    fileUrl: "/manuals/preview/mv-pt",
    fileSize: "10.2 MB",
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