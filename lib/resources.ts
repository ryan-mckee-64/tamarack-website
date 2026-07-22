export type ResourceStatus = "live" | "planned";

export type ResourceItem = {
  slug: string;
  label: string;
  href: string;
  status: ResourceStatus;
  description: string;
};

export type ResourceGroup = {
  slug: string;
  label: string;
  blurb: string;
  items: ResourceItem[];
};

export const resourceGroups: ResourceGroup[] = [
  {
    slug: "manuals",
    label: "Manual Library",
    blurb: "Operator and parts manuals, filtered by product and model year.",
    items: [
      {
        slug: "manual-library",
        label: "Browse all manuals",
        href: "/manuals",
        status: "live",
        description:
          "Filter by product line, model and year to find the documents that apply to your machine.",
      },
      {
        slug: "operator-manuals",
        label: "Operator manuals",
        href: "/manuals",
        status: "live",
        description: "Operating instructions and safety information by model year.",
      },
      {
        slug: "parts-manuals",
        label: "Parts manuals",
        href: "/manuals",
        status: "live",
        description: "Exploded views and part numbers for ordering replacements.",
      },
    ],
  },
  {
    slug: "guides",
    label: "Educational Guides",
    blurb: "Practical guidance for planning and running a job.",
    items: [
      {
        slug: "thaw-cure-guide",
        label: "Thaw and cure guide",
        href: "/resources/thaw-cure-guide",
        status: "planned",
        description:
          "Ground thaw rates, concrete cure requirements and how to size a job.",
      },
      {
        slug: "jobsite-setup",
        label: "Jobsite setup guides",
        href: "/resources/jobsite-setup",
        status: "planned",
        description:
          "Layout, hose routing and enclosure setup, with animated walkthroughs.",
      },
      {
        slug: "troubleshooting",
        label: "Troubleshooting guides",
        href: "/resources/troubleshooting",
        status: "planned",
        description: "Common faults and what to check first, by symptom.",
      },
    ],
  },
  {
    slug: "product-information",
    label: "Product Information",
    blurb: "Specifications, comparisons and interactive models.",
    items: [
      {
        slug: "3d-models",
        label: "3D models",
        href: "/models",
        status: "live",
        description:
          "Rotate equipment and select components to see part numbers and specs.",
      },
      {
        slug: "equipment-catalogue",
        label: "Equipment catalogue",
        href: "/resources/equipment-catalogue",
        status: "planned",
        description: "The full product line in one place.",
      },
      {
        slug: "brochures",
        label: "Brochures and spec sheets",
        href: "/resources/brochures",
        status: "planned",
        description: "Product brochures and detailed specification sheets.",
      },
      {
        slug: "operator-faq",
        label: "Operator FAQ",
        href: "/resources/operator-faq",
        status: "planned",
        description: "The questions our service team answers most often.",
      },
      {
        slug: "model-comparison",
        label: "Model comparison chart",
        href: "/resources/model-comparison",
        status: "planned",
        description: "Compare output, coverage and dimensions across models.",
      },
      {
        slug: "safety-tips",
        label: "Safety and operating tips",
        href: "/resources/safety-tips",
        status: "planned",
        description: "Product specific safety guidance and operating practice.",
      },
    ],
  },
  {
    slug: "videos",
    label: "Informative Videos",
    blurb: "Training, demonstrations and maintenance.",
    items: [
      {
        slug: "training-videos",
        label: "Training and basic operation",
        href: "/resources/training-videos",
        status: "planned",
        description: "Start to finish operation for new operators.",
      },
      {
        slug: "demos",
        label: "Product demos",
        href: "/resources/demos",
        status: "planned",
        description: "Equipment running in real job conditions.",
      },
      {
        slug: "walk-arounds",
        label: "Walk arounds and tours",
        href: "/resources/walk-arounds",
        status: "planned",
        description: "A guided look at each machine and its controls.",
      },
      {
        slug: "maintenance-videos",
        label: "Maintenance videos",
        href: "/resources/maintenance-videos",
        status: "planned",
        description: "Routine service procedures shown step by step.",
      },
    ],
  },
  {
    slug: "tools",
    label: "Tools",
    blurb: "Size equipment before you order it.",
    items: [
      {
        slug: "btu-calculator",
        label: "BTU calculator",
        href: "/calculator",
        status: "live",
        description:
          "Enter your job conditions and get a recommended heater size.",
      },
    ],
  },
];

export function allResourceItems(): ResourceItem[] {
  return resourceGroups.flatMap((g) => g.items);
}

export function plannedItems(): ResourceItem[] {
  return allResourceItems().filter((i) => i.status === "planned");
}

export function getPlannedItem(slug: string): ResourceItem | undefined {
  return plannedItems().find((i) => i.slug === slug);
}

export function groupForItem(slug: string): ResourceGroup | undefined {
  return resourceGroups.find((g) => g.items.some((i) => i.slug === slug));
}