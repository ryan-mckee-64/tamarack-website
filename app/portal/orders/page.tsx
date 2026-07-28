import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { money, shortDate } from "@/lib/portal/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order History | Tamarack Industries",
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, po_number, status, subtotal_cents, submitted_at")
    .order("submitted_at", { ascending: false });

  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Orders</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
          Order history
        </h1>

        {!orders?.length ? (
          <div className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
            <p className="text-sm leading-relaxed text-[color:var(--ink-dim)]">
              No orders yet. Anything you submit from the parts catalogue shows
              up here with its status.
            </p>
            <Link
              href="/portal/parts"
              className="mt-6 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
            >
              Browse parts
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[color:var(--line)]">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[color:var(--line)] bg-[var(--surface-2)] text-left">
                  <th className="px-5 py-3 font-semibold">Order</th>
                  <th className="px-5 py-3 font-semibold">Submitted</th>
                  <th className="px-5 py-3 font-semibold">PO</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[color:var(--line)] last:border-0 hover:bg-[var(--surface-2)]"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/portal/orders/${order.id}`}
                        className="font-semibold text-[color:var(--ink)] hover:text-[color:var(--orange)]"
                      >
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-[color:var(--ink-dim)]">
                      {shortDate(order.submitted_at)}
                    </td>
                    <td className="px-5 py-4 text-[color:var(--ink-dim)]">
                      {order.po_number || "—"}
                    </td>
                    <td className="px-5 py-4 capitalize text-[color:var(--ink-dim)]">
                      {order.status}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-[color:var(--ink)]">
                      {money(order.subtotal_cents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
