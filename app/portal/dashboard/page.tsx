import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/portal/auth";
import { shortDate } from "@/lib/portal/format";

// Per-customer data, so never prerender or cache this page.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Account | Tamarack Industries",
  description: "Order history, documents and account information.",
};

const SECTIONS = [
  {
    href: "/portal/orders",
    label: "Order history",
    blurb: "Everything you have ordered and where it is.",
  },
  {
    href: "/portal/bulletins",
    label: "Recalls and bulletins",
    blurb: "Look up your serial number for anything that affects it.",
  },
  {
    href: "/portal/maintenance",
    label: "Maintenance schedules",
    blurb: "Service intervals and task lists by product.",
  },
  {
    href: "/portal/warranty",
    label: "Warranty claims",
    blurb: "Submit a claim and track where it stands.",
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();

  // Proxy already turns away signed-out visitors; this is the check that
  // actually guards the data, since proxy can be bypassed by a direct request.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/portal/login");

  const [{ data: profile }, { data: orders }, { data: claims }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, company, discount_percent")
        .eq("id", user.id)
        .maybeSingle(),
      supabase
        .from("orders")
        .select("id, order_number, status, submitted_at")
        .order("submitted_at", { ascending: false })
        .limit(3),
      supabase
        .from("warranty_claims")
        .select("id, serial_number, status, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
    ]);

  const greeting = profile?.full_name || user.email;
  const discount = Number(profile?.discount_percent ?? 0);

  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Customer Portal</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Welcome back
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          {greeting}
          {profile?.company ? ` · ${profile.company}` : ""}
          {discount > 0 ? ` · ${discount}% account discount` : ""}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-6 transition hover:border-[color:var(--orange)]"
            >
              <p className="font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                {section.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                {section.blurb}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[color:var(--line)] p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[color:var(--ink)]">
                Recent orders
              </p>
              <Link
                href="/portal/orders"
                className="text-sm font-semibold text-[color:var(--orange)]"
              >
                View all
              </Link>
            </div>
            {orders?.length ? (
              <ul className="mt-4 space-y-3">
                {orders.map((order) => (
                  <li key={order.id}>
                    <Link
                      href={`/portal/orders/${order.id}`}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-semibold text-[color:var(--ink)]">
                        {order.order_number}
                      </span>
                      <span className="text-[color:var(--ink-dim)]">
                        {shortDate(order.submitted_at)} · {order.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-[color:var(--ink-dim)]">
                No orders yet.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-[color:var(--line)] p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[color:var(--ink)]">
                Warranty claims
              </p>
              <Link
                href="/portal/warranty"
                className="text-sm font-semibold text-[color:var(--orange)]"
              >
                View all
              </Link>
            </div>
            {claims?.length ? (
              <ul className="mt-4 space-y-3">
                {claims.map((claim) => (
                  <li
                    key={claim.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-semibold text-[color:var(--ink)]">
                      {claim.serial_number}
                    </span>
                    <span className="text-[color:var(--ink-dim)]">
                      {shortDate(claim.created_at)} ·{" "}
                      {claim.status.replace("_", " ")}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-[color:var(--ink-dim)]">
                No claims submitted.
              </p>
            )}
          </div>
        </div>

        <form action={signOut} className="mt-12">
          <button
            type="submit"
            className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
          >
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}
