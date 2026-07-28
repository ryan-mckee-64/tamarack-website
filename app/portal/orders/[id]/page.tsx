import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { money, shortDate } from "@/lib/portal/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order Detail | Tamarack Industries",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  // Row Level Security means another customer's id simply returns nothing.
  const { data: order } = await supabase
    .from("orders")
    .select("id, order_number, po_number, status, notes, subtotal_cents, submitted_at")
    .eq("id", id)
    .maybeSingle();

  if (!order) notFound();

  const { data: items } = await supabase
    .from("order_items")
    .select("id, sku, name, quantity, unit_price_cents")
    .eq("order_id", order.id);

  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <Link
          href="/portal/orders"
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to orders
        </Link>

        <p className="tech-label mt-8 text-[color:var(--ember)]">
          {order.status.replace("_", " ")}
        </p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
          {order.order_number}
        </h1>
        <p className="mt-4 text-[color:var(--ink-dim)]">
          Submitted {shortDate(order.submitted_at)}
          {order.po_number ? ` · PO ${order.po_number}` : ""}
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--line)]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[color:var(--line)] bg-[var(--surface-2)] text-left">
                <th className="px-5 py-3 font-semibold">Part</th>
                <th className="px-5 py-3 text-right font-semibold">Qty</th>
                <th className="px-5 py-3 text-right font-semibold">Unit</th>
                <th className="px-5 py-3 text-right font-semibold">Line</th>
              </tr>
            </thead>
            <tbody>
              {(items ?? []).map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[color:var(--line)] last:border-0"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[color:var(--ink)]">
                      {item.sku}
                    </p>
                    <p className="text-[color:var(--ink-dim)]">{item.name}</p>
                  </td>
                  <td className="px-5 py-4 text-right">{item.quantity}</td>
                  <td className="px-5 py-4 text-right text-[color:var(--ink-dim)]">
                    {money(item.unit_price_cents)}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold">
                    {money(item.unit_price_cents * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-[color:var(--ink-dim)]">
            Subtotal, before freight and tax
          </p>
          <p className="text-lg font-bold text-[color:var(--ink)]">
            {money(order.subtotal_cents)}
          </p>
        </div>

        {order.notes && (
          <div className="mt-8 rounded-xl border border-[color:var(--line)] bg-[var(--surface)] p-5">
            <p className="tech-label text-[color:var(--ink-dim)]">Your notes</p>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-dim)]">
              {order.notes}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
