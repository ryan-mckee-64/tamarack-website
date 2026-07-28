"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CART_CHANGED_EVENT,
  type CartLine,
  clearCart,
  readCart,
  removeFromCart,
  setQuantity,
} from "@/lib/portal/cart";
import { money } from "@/lib/portal/format";
import { submitOrder } from "@/lib/portal/actions";

export default function CartView() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [poNumber, setPoNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    window.addEventListener(CART_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CART_CHANGED_EVENT, sync);
  }, []);

  const subtotal = lines.reduce(
    (sum, l) => sum + (l.unitPriceCents ?? 0) * l.quantity,
    0,
  );

  async function place() {
    if (busy || lines.length === 0) return;
    setBusy(true);
    setError(null);

    const result = await submitOrder(
      lines.map((l) => ({ partId: l.partId, quantity: l.quantity })),
      poNumber,
      notes,
    );

    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    clearCart();
    setPlaced(result.data?.orderNumber ?? "");
  }

  if (placed) {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
        <p className="font-semibold text-[color:var(--ink)]">Order submitted</p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          Your reference is <strong>{placed}</strong>. Our parts desk will
          confirm availability and freight, usually the same business day.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/portal/orders"
            className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white"
          >
            View your orders
          </Link>
          <Link
            href="/portal/parts"
            className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)]"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
        <p className="text-sm leading-relaxed text-[color:var(--ink-dim)]">
          Your order is empty.
        </p>
        <Link
          href="/portal/parts"
          className="mt-6 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
        >
          Browse parts
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7">
      <ul className="divide-y divide-[color:var(--line)]">
        {lines.map((line) => (
          <li
            key={line.partId}
            className="flex flex-wrap items-center gap-4 py-4 first:pt-0"
          >
            <div className="min-w-[160px] flex-1">
              <p className="font-semibold text-[color:var(--ink)]">
                {line.sku}
              </p>
              <p className="text-sm text-[color:var(--ink-dim)]">{line.name}</p>
            </div>

            <input
              type="number"
              min={1}
              value={line.quantity}
              onChange={(e) =>
                setQuantity(line.partId, Number.parseInt(e.target.value, 10) || 1)
              }
              className="w-20 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2 text-sm outline-none focus:border-[color:var(--orange)]"
            />

            <p className="w-24 text-right text-sm font-semibold text-[color:var(--ink)]">
              {money((line.unitPriceCents ?? 0) * line.quantity)}
            </p>

            <button
              onClick={() => removeFromCart(line.partId)}
              className="text-[0.8rem] font-semibold text-[color:var(--ink-faint)] transition hover:text-[color:var(--orange)]"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-[color:var(--line)] pt-5">
        <p className="text-sm text-[color:var(--ink-dim)]">
          Subtotal, before freight and tax
        </p>
        <p className="text-lg font-bold text-[color:var(--ink)]">
          {money(subtotal)}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="po" className="tech-label block text-[color:var(--ink-dim)]">
            PO number (optional)
          </label>
          <input
            id="po"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[color:var(--orange)]"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="tech-label block text-[color:var(--ink-dim)]">
            Notes for the parts desk
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Serial number, machine hours, delivery instructions"
            className="mt-1.5 w-full resize-y rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[color:var(--orange)]"
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm text-[color:var(--ink-dim)]"
        >
          {error}
        </p>
      )}

      <button
        onClick={place}
        disabled={busy}
        className="brand-gradient mt-6 w-full rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {busy ? "Submitting..." : "Submit order"}
      </button>
    </div>
  );
}
