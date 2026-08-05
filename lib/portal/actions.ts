"use server";

// lib/portal/actions.ts
//
// Writes from the portal. Every one of these re-checks who is calling and
// re-derives anything that matters (prices especially) from the database —
// nothing the browser sends is trusted beyond part ids and quantities.

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { netPriceCents } from "@/lib/portal/format";
import {
  claimTotals,
  lineAmountCents,
  lineHasContent,
  toCents,
  toNumber,
  type ClaimPartLine,
} from "@/lib/portal/warranty";

type Result<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

export async function submitOrder(
  lines: { partId: string; quantity: number }[],
  poNumber: string,
  notes: string,
): Promise<Result<{ orderNumber: string; orderId: string }>> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Your session has expired. Sign in again." };

  const wanted = lines.filter((l) => l.quantity > 0);
  if (wanted.length === 0) return { ok: false, error: "Your cart is empty." };

  // Re-price from the catalogue rather than trusting the cart.
  const { data: parts, error: partsError } = await supabase
    .from("parts")
    .select("id, sku, name, list_price_cents")
    .in(
      "id",
      wanted.map((l) => l.partId),
    );

  if (partsError || !parts?.length)
    return { ok: false, error: "Could not price your order. Try again." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("discount_percent")
    .eq("id", user.id)
    .maybeSingle();

  const discount = Number(profile?.discount_percent ?? 0);

  const items = wanted.flatMap((line) => {
    const part = parts.find((p) => p.id === line.partId);
    if (!part) return [];
    return [
      {
        part_id: part.id,
        sku: part.sku,
        name: part.name,
        quantity: line.quantity,
        unit_price_cents: netPriceCents(part.list_price_cents, discount) ?? 0,
      },
    ];
  });

  if (items.length === 0)
    return { ok: false, error: "None of those parts are available any more." };

  const subtotal = items.reduce(
    (sum, i) => sum + i.unit_price_cents * i.quantity,
    0,
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      po_number: poNumber.trim() || null,
      notes: notes.trim() || null,
      subtotal_cents: subtotal,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order)
    return { ok: false, error: "Could not submit your order. Try again." };

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items.map((i) => ({ ...i, order_id: order.id })));

  if (itemsError)
    return {
      ok: false,
      error:
        "Your order was created but the lines did not save. Contact support with reference " +
        order.order_number,
    };

  revalidatePath("/portal/orders");
  return {
    ok: true,
    data: { orderNumber: order.order_number, orderId: order.id },
  };
}

export type WarrantyClaimInput = {
  // Customer info
  companyBranch: string;
  address: string;
  cityState: string;
  contactName: string;
  phone: string;
  email: string;
  // Machine info
  serialNumber: string;
  productLine: string;
  model: string;
  hoursOnUnit: string;
  purchasedOn: string;
  failedOn: string;
  poOrInvoice: string;
  // Parts, labour and travel
  parts: ClaimPartLine[];
  laborHours: string;
  travelHours: string;
  // Failure and sign off
  description: string;
  submittedBy: string;
  submittedOn: string;
  certified: boolean;
};

export async function submitWarrantyClaim(
  input: WarrantyClaimInput,
): Promise<Result> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Your session has expired. Sign in again." };

  if (!input.serialNumber.trim() || !input.description.trim())
    return { ok: false, error: "Serial number and description are required." };

  if (!input.submittedBy.trim())
    return { ok: false, error: "Add the name of whoever is submitting the claim." };

  if (!input.certified)
    return {
      ok: false,
      error: "Confirm the information is correct before submitting.",
    };

  // Only lines the customer actually filled in are stored, and the money is
  // recomputed here — the browser's arithmetic is for display only.
  const lines = (input.parts ?? []).filter(lineHasContent);
  const totals = claimTotals(lines, input.laborHours, input.travelHours);

  const hours = Number.parseInt(input.hoursOnUnit, 10);
  const text = (value: string) => value.trim() || null;

  const { data: claim, error } = await supabase
    .from("warranty_claims")
    .insert({
      user_id: user.id,
      serial_number: input.serialNumber.trim(),
      product_line: input.productLine || null,
      model: text(input.model),
      purchased_on: input.purchasedOn || null,
      failed_on: input.failedOn || null,
      hours_on_unit: Number.isFinite(hours) ? hours : null,
      description: input.description.trim(),

      company_branch: text(input.companyBranch),
      address: text(input.address),
      city_state: text(input.cityState),
      contact_name: text(input.contactName),
      phone: text(input.phone),
      email: text(input.email),
      po_or_invoice: text(input.poOrInvoice),

      labor_hours: Math.max(0, toNumber(input.laborHours)),
      travel_hours: Math.max(0, toNumber(input.travelHours)),
      parts_total_cents: totals.partsTotalCents,
      labor_total_cents: totals.laborTotalCents,
      travel_total_cents: totals.travelTotalCents,
      grand_total_cents: totals.grandTotalCents,

      submitted_by: input.submittedBy.trim(),
      submitted_on: input.submittedOn || null,
      certified: true,
    })
    .select("id")
    .single();

  if (error || !claim)
    return { ok: false, error: "Could not submit your claim. Try again." };

  if (lines.length) {
    const { error: partsError } = await supabase
      .from("warranty_claim_parts")
      .insert(
        lines.map((line, index) => ({
          claim_id: claim.id,
          line_number: index + 1,
          part_number: text(line.partNumber),
          description: text(line.description),
          quantity: Math.max(0, toNumber(line.quantity)),
          unit_price_cents: Math.max(0, toCents(line.unitPrice)),
          amount_cents: Math.max(0, lineAmountCents(line)),
        })),
      );

    // The claim itself is saved and carries the parts total, so a failure
    // here costs detail rather than the submission.
    if (partsError)
      return {
        ok: false,
        error:
          "Your claim was saved, but the parts list did not attach. Contact support with your serial number.",
      };
  }

  revalidatePath("/portal/warranty");
  return { ok: true };
}

export async function lookupSerial(serial: string): Promise<
  Result<{
    matches: {
      id: string;
      kind: string;
      reference: string | null;
      title: string;
      summary: string | null;
      published_on: string;
      document_url: string | null;
    }[];
  }>
> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Your session has expired. Sign in again." };

  const trimmed = serial.trim();
  if (!trimmed) return { ok: false, error: "Enter a serial number." };

  // A bulletin applies if the serial falls inside its range, or if the
  // bulletin covers a whole product line the customer owns.
  const { data: machines } = await supabase
    .from("machines")
    .select("product_line")
    .eq("serial_number", trimmed);

  const ownedLines = (machines ?? [])
    .map((m) => m.product_line)
    .filter((l): l is string => Boolean(l));

  const { data: bulletins, error } = await supabase
    .from("bulletins")
    .select("id, kind, reference, title, summary, published_on, document_url, serial_from, serial_to, product_line")
    .order("published_on", { ascending: false });

  if (error) return { ok: false, error: "Lookup failed. Try again." };

  const matches = (bulletins ?? []).filter((b) => {
    const inRange =
      b.serial_from && b.serial_to
        ? trimmed >= b.serial_from && trimmed <= b.serial_to
        : false;
    const lineMatch =
      b.product_line != null && ownedLines.includes(b.product_line);
    return inRange || lineMatch;
  });

  return { ok: true, data: { matches } };
}

export async function createSerialEnquiry(
  serial: string,
  note: string,
): Promise<Result> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Your session has expired. Sign in again." };

  if (!serial.trim()) return { ok: false, error: "Enter a serial number." };

  const { error } = await supabase.from("serial_enquiries").insert({
    user_id: user.id,
    serial_number: serial.trim(),
    note: note.trim() || null,
  });

  if (error) return { ok: false, error: "Could not send that to support. Try again." };

  return { ok: true };
}
