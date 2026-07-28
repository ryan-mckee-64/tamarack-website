// lib/portal/format.ts

export function money(cents: number | null | undefined): string {
  if (cents == null) return "Call for pricing";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(cents / 100);
}

export function shortDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** List price less the customer's account discount, rounded to the cent. */
export function netPriceCents(
  listPriceCents: number | null,
  discountPercent: number,
): number | null {
  if (listPriceCents == null) return null;
  if (!discountPercent) return listPriceCents;
  return Math.round(listPriceCents * (1 - discountPercent / 100));
}

export function stockLabel(qty: number, leadTimeDays: number | null) {
  if (qty > 10) return { text: "In stock", tone: "good" as const };
  if (qty > 0) return { text: `Low stock — ${qty} left`, tone: "warn" as const };
  if (leadTimeDays)
    return { text: `On order — ${leadTimeDays} day lead`, tone: "warn" as const };
  return { text: "Out of stock", tone: "bad" as const };
}
