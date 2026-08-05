export type DocumentCategory = "brochure" | "operator" | "parts" | "component";

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
  /**
   * Machine shot faded in behind the page header. Optional — a product
   * without one simply gets the plain white header.
   */
  heroImage?: string;
};

export const categoryLabels: Record<DocumentCategory, string> = {
  brochure: "Brochures",
  operator: "Operator manuals",
  parts: "Parts manuals",
  component: "Engine and generator manuals",
};

export const categoryOrder: DocumentCategory[] = [
  "brochure",
  "operator",
  "parts",
  "component",
];

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
      heroImage: "/images/heat-king.png",
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

// Real documents, generated from the files in public/docs.
// NOTE: most year ranges are best guesses taken from the filenames and
// still need confirming against the actual manuals.
export const documents: ProductDocument[] = [
  {
    id: "hk-op-generic",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "All models, generic",
    years: yearRange(2015, 2026),
    fileUrl: "/docs/heat-king/operator/Heat-King-Manual-Generic.pdf",
  },
  {
    id: "hk-op-150-2019",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 150",
    years: yearRange(2019, 2026),
    fileUrl: "/docs/heat-king/operator/HK150%20Manual%202019-Current.pdf",
  },
  {
    id: "hk-op-150-wayne",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 150, Wayne burner",
    years: yearRange(2020, 2026),
    fileUrl: "/docs/heat-king/operator/HK150-Manual-2020-WAYNE-min.pdf",
  },
  {
    id: "hk-op-300b-2019",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 300B",
    years: yearRange(2019, 2026),
    fileUrl: "/docs/heat-king/operator/HK300B%20Manual%202019-Current.pdf",
  },
  {
    id: "hk-op-600-2019",
    productSlug: "heat-king",
    category: "operator",
    title: "Heat King operator manual",
    variant: "HK 600",
    years: yearRange(2019, 2026),
    fileUrl: "/docs/heat-king/operator/HK600%20Manual%202019-Current.pdf",
  },
  {
    id: "hk-op-idf1000",
    productSlug: "heat-king",
    category: "operator",
    title: "IDF 1000 operator manual",
    variant: "IDF 1000",
    years: yearRange(2017, 2018),
    fileUrl: "/docs/heat-king/operator/IDF1000-Manual-2017-version-compressed.pdf",
  },
  {
    id: "hk-pt-150-early",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 150, early models",
    years: yearRange(2005, 2010),
    fileUrl: "/docs/heat-king/parts/HK150-Parts-Manual-Early-models.pdf",
  },
  {
    id: "hk-pt-150-pre2015",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 150",
    years: yearRange(2011, 2014),
    fileUrl: "/docs/heat-king/parts/HK150-Parts-Manual-pre-2015.pdf",
  },
  {
    id: "hk-pt-150-post2015",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 150",
    years: yearRange(2015, 2020),
    fileUrl: "/docs/heat-king/parts/HK-150-Parts-Manual-Post-2015.pdf",
  },
  {
    id: "hk-pt-150-2021",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 150",
    years: yearRange(2021, 2026),
    fileUrl: "/docs/heat-king/parts/HK150-PARTS-MANUAL-2021.pdf",
  },
  {
    id: "hk-pt-300-pre2015",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 300",
    years: yearRange(2008, 2014),
    fileUrl: "/docs/heat-king/parts/HK300-Parts-Manual-pre-2015.pdf",
  },
  {
    id: "hk-pt-300-post2015",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 300",
    years: yearRange(2015, 2026),
    fileUrl: "/docs/heat-king/parts/HK-300-Parts-Manual-post-2015.pdf",
  },
  {
    id: "hk-pt-300b-2019",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 300B",
    years: yearRange(2019, 2026),
    fileUrl: "/docs/heat-king/parts/HK300B-PARTS-MANUAL-2019-compressed.pdf",
  },
  {
    id: "hk-pt-500-pre2015",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 500",
    years: yearRange(2008, 2014),
    fileUrl: "/docs/heat-king/parts/HK-500-Parts-Manual-Pre-2015.pdf",
  },
  {
    id: "hk-pt-500-dual",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 500, dual axle units",
    years: yearRange(2008, 2026),
    fileUrl: "/docs/heat-king/parts/HK500-Parts-Manual-for-dual-axle-units.pdf",
  },
  {
    id: "hk-pt-600",
    productSlug: "heat-king",
    category: "parts",
    title: "Heat King parts manual",
    variant: "HK 600",
    years: yearRange(2019, 2026),
    fileUrl: "/docs/heat-king/parts/HK600-Parts-Manual.pdf",
  },
  {
    id: "hk-pt-idf1000",
    productSlug: "heat-king",
    category: "parts",
    title: "IDF 1000 parts manual",
    variant: "IDF 1000",
    years: yearRange(2017, 2018),
    fileUrl: "/docs/heat-king/parts/IDF1000-Parts-Manual-2017-2018.pdf",
  },
  {
    id: "hk-cm-dca-op",
    productSlug: "heat-king",
    category: "component",
    title: "Multiquip DCA-6SPX4F generator manual",
    variant: "Generator set",
    years: yearRange(2010, 2026),
    fileUrl: "/docs/heat-king/operator/DCA-6SPX4F-manual-English.pdf",
  },
  {
    id: "hk-cm-6kw-er",
    productSlug: "heat-king",
    category: "component",
    title: "6 kW ER generator manual, Kubota engine",
    variant: "Generator set",
    years: yearRange(2010, 2026),
    fileUrl: "/docs/heat-king/operator/HK6KW-ER-generator-manual-with-kubota-engine.pdf",
  },
  {
    id: "hk-cm-da7000",
    productSlug: "heat-king",
    category: "component",
    title: "Multiquip DA7000 generator manual",
    variant: "Generator set",
    years: yearRange(2010, 2026),
    fileUrl: "/docs/heat-king/operator/Multiquip-DA7000-Manual.pdf",
  },
  {
    id: "hk-cm-dca-pt",
    productSlug: "heat-king",
    category: "component",
    title: "Multiquip DCA-6SPX4F parts list",
    variant: "Generator set",
    years: yearRange(2010, 2026),
    fileUrl: "/docs/heat-king/parts/DCA-6SPX4F-Parts-List.pdf",
  },
  {
    id: "md-op-2021",
    productSlug: "mud-dog",
    category: "operator",
    title: "Concrete buggy operator manual",
    years: yearRange(2021, 2026),
    fileUrl: "/docs/mud-dog/operator/Buggy-June-2021-1.pdf",
  },
  {
    id: "md-op-cb1600e",
    productSlug: "mud-dog",
    category: "operator",
    title: "CB1600E electric buggy operator manual",
    variant: "CB1600E electric",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/mud-dog/operator/CB1600E%2BELECTRIC%2BBUGGY%2BMANUAL.pdf",
  },
  {
    id: "md-pt-cb1600e",
    productSlug: "mud-dog",
    category: "parts",
    title: "CB1600E electric buggy parts manual",
    variant: "CB1600E electric",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/mud-dog/parts/CB1600E%2BELECTRIC%2BBUGGY%2BPARTS%2BMANUAL%2B.pdf",
  },
  {
    id: "md-pt-cb1600",
    productSlug: "mud-dog",
    category: "parts",
    title: "CB1600 concrete buggy parts manual",
    variant: "CB1600",
    years: yearRange(2021, 2026),
    fileUrl: "/docs/mud-dog/parts/RPLConcrete-Buggy-CB1600-OCT-21.pdf",
  },
  {
    id: "tz-op-tch-pre2018",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "TCH 250 and TCH 150 operator manual",
    variant: "TCH 250, TCH 150",
    years: yearRange(2012, 2017),
    fileUrl: "/docs/thawzall-xhr/operator/TCH250-TCH150-Operators-Manual-Pre-2018.pdf",
  },
  {
    id: "tz-op-tch250-2018",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "TCH 250 operator manual",
    variant: "TCH 250",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/TCH-250-manual-2018.pdf",
  },
  {
    id: "tz-op-tch250-carel",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "TCH 250 operator manual, Carel controls",
    variant: "TCH 250, Carel controls",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/TCH-250-Operators-Manual-With-Carel-Controls.pdf",
  },
  {
    id: "tz-op-tch250-schneider",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "TCH 250 operator manual, Schneider controls",
    variant: "TCH 250, Schneider controls",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/TCH-250-Operators-Manual-With-Schneider-Controls.pdf",
  },
  {
    id: "tz-op-h150-h250",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "H150 and H250 operator manual",
    variant: "H150, H250",
    years: yearRange(2015, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/H150-H250-Operators-Manual.pdf",
  },
  {
    id: "tz-op-h750",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "H750 operator manual",
    variant: "H750",
    years: yearRange(2015, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/H750-Operators-Manual-.pdf",
  },
  {
    id: "tz-op-exhr",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "E-XHR operator manual",
    variant: "E-XHR",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/E-XHR-Operators-Manual-1-1.pdf",
  },
  {
    id: "tz-op-xhr750-2018",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "XHR 750 operator manual",
    variant: "XHR 750",
    revision: "V2",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/XHR750-manual-2018-V2.pdf",
  },
  {
    id: "tz-op-xhr700-2019",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "XHR 700 operator manual",
    variant: "XHR 700",
    years: yearRange(2019, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/XHR700-2019-MANUAL.pdf",
  },
  {
    id: "tz-op-xhr-2022",
    productSlug: "thawzall-xhr",
    category: "operator",
    title: "XHR flameless operator manual",
    variant: "XHR flameless",
    years: yearRange(2022, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/XHR-FLAMELESS-2022-White.pdf",
  },
  {
    id: "tz-pt-tch250-r3",
    productSlug: "thawzall-xhr",
    category: "parts",
    title: "TCH 250 parts manual",
    variant: "TCH 250",
    revision: "R3",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/thawzall-xhr/parts/TCH250-R3-Parts-Manual-compressed.pdf",
  },
  {
    id: "tz-pt-exhr",
    productSlug: "thawzall-xhr",
    category: "parts",
    title: "E-XHR parts manual",
    variant: "E-XHR",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/thawzall-xhr/parts/E-XHR-PARTS-MANUAL.pdf",
  },
  {
    id: "tz-pt-xhr750",
    productSlug: "thawzall-xhr",
    category: "parts",
    title: "XHR 750 parts manual",
    variant: "XHR 750",
    years: yearRange(2018, 2026),
    fileUrl: "/docs/thawzall-xhr/parts/XHR750-Parts-Manual.pdf",
  },
  {
    id: "tz-pt-xhr-2025",
    productSlug: "thawzall-xhr",
    category: "parts",
    title: "XHR parts manual",
    variant: "XHR",
    years: yearRange(2025, 2026),
    fileUrl: "/docs/thawzall-xhr/parts/XHR-PARTS-MANUAL-2025.pdf",
  },
  {
    id: "tz-cm-6kw-lr",
    productSlug: "thawzall-xhr",
    category: "component",
    title: "6 kW LR generator manual",
    variant: "Generator set",
    years: yearRange(2010, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/6KW-LR-MANUAL-TMP.pdf",
  },
  {
    id: "tz-cm-dca",
    productSlug: "thawzall-xhr",
    category: "component",
    title: "Multiquip DCA-6SPX4F generator manual",
    variant: "Generator set",
    years: yearRange(2010, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/DCA-6SPX4F-manual-English.pdf",
  },
  {
    id: "tz-cm-da7000",
    productSlug: "thawzall-xhr",
    category: "component",
    title: "Multiquip DA7000 generator manual",
    variant: "Generator set",
    years: yearRange(2010, 2026),
    fileUrl: "/docs/thawzall-xhr/operator/Multiquip-DA7000-Manual.pdf",
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
    component: docs.filter((d) => d.category === "component").length,
  };
}
