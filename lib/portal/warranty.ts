// lib/portal/warranty.ts
//
// Shapes and arithmetic for the warranty claim form. Shared by the browser
// form and the server action so the totals a customer sees are worked out by
// exactly the same code that stores them — the server still recalculates
// rather than trusting the numbers the browser posts.

/** Tamarack labour rate, in cents per hour. */
export const LABOR_RATE_CENTS = 10_000;

/** Tamarack travel rate, in cents per hour. */
export const TRAVEL_RATE_CENTS = 7_500;

/** Travel is only payable up to this many hours. */
export const MAX_TRAVEL_HOURS = 3;

export type ClaimPartLine = {
  partNumber: string;
  description: string;
  quantity: string;
  unitPrice: string;
};

export function emptyPartLine(): ClaimPartLine {
  return { partNumber: "", description: "", quantity: "", unitPrice: "" };
}

/** True once a line carries anything worth storing. */
export function lineHasContent(line: ClaimPartLine): boolean {
  return (
    line.partNumber.trim() !== "" ||
    line.description.trim() !== "" ||
    line.quantity.trim() !== "" ||
    line.unitPrice.trim() !== ""
  );
}

/** Parses a user-typed number, treating blanks and junk as zero. */
export function toNumber(value: string | number | null | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (!value) return 0;
  const n = Number.parseFloat(String(value).replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Dollars as typed into a price box, converted to whole cents. */
export function toCents(value: string | number | null | undefined): number {
  return Math.round(toNumber(value) * 100);
}

export function lineAmountCents(line: ClaimPartLine): number {
  return Math.round(toNumber(line.quantity) * toCents(line.unitPrice));
}

export type ClaimTotals = {
  partsTotalCents: number;
  laborTotalCents: number;
  travelTotalCents: number;
  grandTotalCents: number;
  /** Travel hours after the 3 hour cap is applied. */
  billableTravelHours: number;
};

export function claimTotals(
  lines: ClaimPartLine[],
  laborHours: string | number,
  travelHours: string | number,
): ClaimTotals {
  const partsTotalCents = lines.reduce(
    (sum, line) => sum + lineAmountCents(line),
    0,
  );

  const labor = Math.max(0, toNumber(laborHours));
  const billableTravelHours = Math.min(
    MAX_TRAVEL_HOURS,
    Math.max(0, toNumber(travelHours)),
  );

  const laborTotalCents = Math.round(labor * LABOR_RATE_CENTS);
  const travelTotalCents = Math.round(billableTravelHours * TRAVEL_RATE_CENTS);

  return {
    partsTotalCents,
    laborTotalCents,
    travelTotalCents,
    grandTotalCents: partsTotalCents + laborTotalCents + travelTotalCents,
    billableTravelHours,
  };
}
