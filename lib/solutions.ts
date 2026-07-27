export type Solution = {
  slug: string;
  label: string;
  href: string;
  description: string;
};

export const solutions: Solution[] = [
  {
    slug: "ground-thaw",
    label: "Ground thaw",
    href: "/solutions/ground-thaw",
    description: "Thawing frozen ground ahead of excavation and foundation work.",
  },
  {
    slug: "concrete-cure",
    label: "Concrete cure",
    href: "/solutions/concrete-cure",
    description: "Holding cure temperatures through cold weather pours.",
  },
  {
    slug: "space-heating",
    label: "Space heating",
    href: "/solutions/space-heating",
    description: "Tempering enclosures, structures and work areas.",
  },
  {
    slug: "oil-and-gas",
    label: "Oil and gas",
    href: "/solutions/oil-and-gas",
    description: "Heat for wellsites, pipelines and remote field operations.",
  },
  {
    slug: "frost-prevention",
    label: "Frost prevention",
    href: "/solutions/frost-prevention",
    description: "Keeping prepared ground and materials from freezing.",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}