// lib/model-comparisons.ts
//
// Side by side specs for the models within a product line. Add another entry
// to `modelComparisons` and it renders on /resources/model-comparison — the
// page reads the whole array and needs no edit.
//
// lineSlug ties an entry back to lib/product-lines.ts, which supplies the
// wordmark and the accent colour, so a comparison never restates branding.

export type ComparisonCell = {
  value: string;
  /** Smaller print under the value, for breakdowns and caveats. */
  note?: string;
};

export type ComparisonRow = {
  label: string;
  /** One cell per model, in the same order as `models`. */
  cells: ComparisonCell[];
};

export type ModelComparison = {
  slug: string;
  /** Matches a slug in lib/product-lines.ts. */
  lineSlug: string;
  title: string;
  summary: string;
  models: string[];
  rows: ComparisonRow[];
  /** Shown under the table, for anything that qualifies the numbers. */
  footnote?: string;
};

export const modelComparisons: ModelComparison[] = [
  {
    slug: "heat-king",
    lineSlug: "heat-king",
    title: "Heat King",
    summary:
      "Glycol ground thaw and heating units. Coverage figures are maximums under typical conditions.",
    models: ["HK 150", "HK 300", "HK 600"],
    rows: [
      {
        label: "Heater capacity",
        cells: [
          { value: "150,000 BTU/hr" },
          { value: "300,000 BTU/hr" },
          { value: "600,000 BTU/hr" },
        ],
      },
      {
        label: "Concrete curing capacity",
        cells: [
          { value: "5,600 ft²" },
          { value: "11,200 ft²" },
          { value: "22,400 ft²" },
        ],
      },
      {
        label: "Ground thaw capacity",
        cells: [
          { value: "2,800 ft²" },
          { value: "5,600 ft²" },
          { value: "11,200 ft²" },
        ],
      },
      {
        label: "Space heating capacity",
        cells: [
          { value: "6,200 ft²" },
          { value: "12,000 ft²" },
          { value: "15,000 ft²" },
        ],
      },
      {
        label: "Hose",
        cells: [
          {
            value: "2 × 700 ft hoses",
            note: "1 × 700 ft, 1 × 500 ft, 1 × 200 ft",
          },
          { value: "4 × 700 ft hoses" },
          { value: "8 × 700 ft hoses" },
        ],
      },
      {
        label: "Run time",
        cells: [
          { value: "50+ hr" },
          { value: "Up to 120 hr" },
          { value: "Up to 60 hr" },
        ],
      },
    ],
  },
];

export function getModelComparison(slug: string): ModelComparison | undefined {
  return modelComparisons.find((c) => c.slug === slug);
}
