// lib/portal/cart.ts
//
// The parts cart lives in the browser until the order is submitted — no point
// writing half-finished baskets to the database. Prices here are for display
// only; the server re-prices everything from the parts table when the order
// is placed, so a tampered cart cannot change what a customer is charged.

export type CartLine = {
  partId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPriceCents: number | null;
};

const KEY = "tamarack-parts-cart";
const CHANGED = "tamarack-cart-changed";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CHANGED));
}

export function addToCart(line: CartLine) {
  const lines = readCart();
  const existing = lines.find((l) => l.partId === line.partId);
  if (existing) existing.quantity += line.quantity;
  else lines.push(line);
  writeCart(lines);
}

export function setQuantity(partId: string, quantity: number) {
  const lines = readCart()
    .map((l) => (l.partId === partId ? { ...l, quantity } : l))
    .filter((l) => l.quantity > 0);
  writeCart(lines);
}

export function removeFromCart(partId: string) {
  writeCart(readCart().filter((l) => l.partId !== partId));
}

export function clearCart() {
  writeCart([]);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.quantity, 0);
}

export const CART_CHANGED_EVENT = CHANGED;
