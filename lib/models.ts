import { products, getProduct } from "@/lib/manuals";

/**
 * Most CAD packages export with Z pointing up, while three.js works in Y up.
 * Set "z-up" on a model to lay the machine flat instead of stood on its nose.
 */
export type UpAxis = "y-up" | "z-up";

export type HotspotSpec = {
  label: string;
  value: string;
};

export type Hotspot = {
  id: string;
  label: string;
  position: [number, number, number];
  partNumber?: string;
  description?: string;
  specs?: HotspotSpec[];
};

export type ProductModel = {
  id: string;
  productSlug: string;
  name: string;
  variant?: string;
  /** Path to a GLB or glTF file under public. Null shows placeholder geometry. */
  modelUrl: string | null;
  upAxis?: UpAxis;
  fileSize?: string;
  notes?: string;
  hotspots: Hotspot[];
};

// Hotspot positions are x, y, z coordinates in the 3D scene.
// The ones below are placed against the placeholder machine.
// When a real model arrives these get repositioned once against
// the actual geometry, and everything else stays the same.
export const models: ProductModel[] = [
  {
    id: "hk-300-model",
    productSlug: "heat-king",
    name: "Heat King glycol heater",
    variant: "HK 300",
    modelUrl: "/models/heat-king/hk300.glb",
    // The CAD source was a 3D PDF, which is Z up. Flip it to Y up for three.js.
    upAxis: "z-up",
    notes:
      "Trailer mounted unit. Drag to rotate, scroll to zoom, right click to pan.",
    // Hotspots are placed in scene units against the fitted model, which is
    // scaled so its longest side is 3.4 units and sits on the ground plane.
    // Add entries here once the real part numbers are confirmed.
    hotspots: [],
  },
  {
    id: "hk-400-model",
    productSlug: "heat-king",
    name: "Heat King glycol heater",
    variant: "HK 400",
    modelUrl: null,
    notes: "Trailer mounted unit with hose reels in the stowed position.",
    hotspots: [
      {
        id: "hk-burner",
        label: "Burner assembly",
        position: [0.6, 2.3, 0],
        partNumber: "600512-04",
        description:
          "Diesel fired burner with electronic ignition and flame safeguard control.",
        specs: [
          { label: "Rated output", value: "400,000 BTU per hour" },
          { label: "Fuel", value: "Number 1 or number 2 diesel" },
          { label: "Ignition", value: "Direct spark with flame sensor" },
        ],
      },
      {
        id: "hk-reel",
        label: "Hose reel",
        position: [-1.35, 1.5, 0.75],
        partNumber: "600512-11",
        description:
          "Powered hose reel carrying glycol supply and return lines to the work area.",
        specs: [
          { label: "Hose capacity", value: "500 ft of 1 inch line" },
          { label: "Rewind", value: "Hydraulic, operator controlled" },
          { label: "Line rating", value: "300 psi working pressure" },
        ],
      },
      {
        id: "hk-exchanger",
        label: "Heat exchanger",
        position: [0, 1.6, 0.9],
        partNumber: "600512-02",
        description:
          "Stainless heat exchanger transferring burner heat into the glycol loop.",
        specs: [
          { label: "Material", value: "304 stainless steel" },
          { label: "Glycol capacity", value: "60 gallons" },
          { label: "Max fluid temperature", value: "180 degrees F" },
        ],
      },
      {
        id: "hk-axle",
        label: "Axle and running gear",
        position: [0, 0.3, 1.0],
        partNumber: "600512-21",
        description:
          "Torsion axle with electric brakes and highway rated radial tires.",
        specs: [
          { label: "Axle rating", value: "5,200 lb" },
          { label: "Brakes", value: "Electric drum, both wheels" },
          { label: "Tires", value: "ST225/75R15 load range D" },
        ],
      },
      {
        id: "hk-hitch",
        label: "Tow hitch",
        position: [-2.5, 0.55, 0],
        partNumber: "600512-25",
        description:
          "Adjustable height coupler with safety chains and breakaway switch.",
        specs: [
          { label: "Coupler", value: "2 5/16 inch ball" },
          { label: "Tongue weight", value: "480 lb" },
          { label: "Jack", value: "2,000 lb drop leg" },
        ],
      },
    ],
  },
  {
    id: "xhr-475-model",
    productSlug: "thawzall-xhr",
    name: "Thawzall XHR flameless air heater",
    variant: "XHR 475",
    modelUrl: null,
    notes: "Shown with ducting collars capped.",
    hotspots: [
      {
        id: "xhr-outlet",
        label: "Discharge outlet",
        position: [0.6, 2.3, 0],
        partNumber: "600835-07",
        description:
          "Heated air discharge with quick connect collar for insulated ducting.",
        specs: [
          { label: "Collar size", value: "20 inch diameter" },
          { label: "Air flow", value: "5,500 cfm" },
          { label: "Discharge temperature", value: "Up to 180 degrees F" },
        ],
      },
      {
        id: "xhr-panel",
        label: "Control panel",
        position: [-1.35, 1.5, 0.75],
        partNumber: "600835-15",
        description:
          "Weather sealed control panel with thermostat input and diagnostic display.",
        specs: [
          { label: "Enclosure", value: "NEMA 4 rated" },
          { label: "Control", value: "Remote thermostat capable" },
          { label: "Display", value: "Fault codes and run hours" },
        ],
      },
      {
        id: "xhr-engine",
        label: "Engine compartment",
        position: [0, 1.6, 0.9],
        partNumber: "600835-01",
        description:
          "Diesel engine driving the hydraulic circuit that generates heat without a flame.",
        specs: [
          { label: "Heat output", value: "475,000 BTU per hour" },
          { label: "Run time", value: "24 hours at full load" },
          { label: "Open flame", value: "None" },
        ],
      },
    ],
  },
  {
    id: "renegade-model",
    productSlug: "renegade",
    name: "Renegade tractor loader backhoe",
    modelUrl: null,
    notes: "Loader arms down, backhoe stowed for transport.",
    hotspots: [],
  },
  {
    id: "mud-dog-model",
    productSlug: "mud-dog",
    name: "Mud Dog concrete power buggy",
    variant: "MD 16",
    modelUrl: null,
    notes: "Standard tub configuration.",
    hotspots: [],
  },
  {
    id: "yard-dog-model",
    productSlug: "yard-dog",
    name: "Yard Dog trailer mover",
    modelUrl: null,
    hotspots: [],
  },
  {
    id: "maverick-model",
    productSlug: "maverick",
    name: "Maverick site sweeper",
    modelUrl: null,
    hotspots: [],
  },
];

export function modelsForProduct(slug: string): ProductModel[] {
  // Models with real geometry come first, so a product that still has
  // placeholder entries opens on the machine we can actually show.
  return models
    .filter((m) => m.productSlug === slug)
    .sort((a, b) => Number(b.modelUrl !== null) - Number(a.modelUrl !== null));
}

export function getModel(id: string): ProductModel | undefined {
  return models.find((m) => m.id === id);
}

export function productsWithModels() {
  return products
    .map((p) => ({
      product: p,
      models: modelsForProduct(p.slug),
    }))
    .filter((entry) => entry.models.length > 0);
}

export { getProduct };