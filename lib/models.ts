import { products, getProduct } from "@/lib/manuals";

export type ProductModel = {
  id: string;
  productSlug: string;
  name: string;
  variant?: string;
  modelUrl: string | null;
  fileSize?: string;
  notes?: string;
};

// modelUrl stays null until the real GLB file is added to public/models.
// Any record with a null url renders the interactive placeholder instead.
export const models: ProductModel[] = [
  {
    id: "hk-400-model",
    productSlug: "heat-king",
    name: "Heat King glycol heater",
    variant: "HK 400",
    modelUrl: null,
    notes: "Trailer mounted unit with hose reels in the stowed position.",
  },
  {
    id: "xhr-475-model",
    productSlug: "thawzall-xhr",
    name: "Thawzall XHR flameless air heater",
    variant: "XHR 475",
    modelUrl: null,
    notes: "Shown with ducting collars capped.",
  },
  {
    id: "renegade-model",
    productSlug: "renegade",
    name: "Renegade tractor loader backhoe",
    modelUrl: null,
    notes: "Loader arms down, backhoe stowed for transport.",
  },
  {
    id: "mud-dog-model",
    productSlug: "mud-dog",
    name: "Mud Dog concrete power buggy",
    variant: "MD 16",
    modelUrl: null,
    notes: "Standard tub configuration.",
  },
  {
    id: "yard-dog-model",
    productSlug: "yard-dog",
    name: "Yard Dog trailer mover",
    modelUrl: null,
  },
  {
    id: "maverick-model",
    productSlug: "maverick",
    name: "Maverick site sweeper",
    modelUrl: null,
  },
];

export function modelsForProduct(slug: string): ProductModel[] {
  return models.filter((m) => m.productSlug === slug);
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