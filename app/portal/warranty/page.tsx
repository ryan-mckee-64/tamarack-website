import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { productLines } from "@/lib/product-lines";
import { money, shortDate } from "@/lib/portal/format";
import WarrantyForm from "@/components/portal/WarrantyForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Warranty Claims | Tamarack Industries",
};

const STATUS_LABEL: Record<string, string> = {
  submitted: "Submitted",
  in_review: "In review",
  approved: "Approved",
  declined: "Declined",
  closed: "Closed",
};

export default async function WarrantyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const [{ data: profile }, { data: claims }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, company")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("warranty_claims")
      .select(
        "id, serial_number, model, status, created_at, description, grand_total_cents, submitted_by",
      )
      .order("created_at", { ascending: false }),
  ]);

  return (
    <main>
      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Warranty</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
          Warranty claim form
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Fill this in here rather than printing it — it reaches our service
          team the moment you submit. The more detail on the failure and the
          hours on the unit, the faster it moves.
        </p>

        <div className="mt-10">
          <WarrantyForm
            productLines={productLines.map((l) => ({
              slug: l.slug,
              name: l.name,
            }))}
            defaults={{
              companyBranch: profile?.company ?? "",
              contactName: profile?.full_name ?? "",
              email: user.email ?? "",
            }}
          />
        </div>

        {claims?.length ? (
          <>
            <h2 className="font-display mt-16 text-2xl font-bold text-[color:var(--ink)]">
              Your claims
            </h2>
            <ul className="mt-5 space-y-4">
              {claims.map((claim) => (
                <li
                  key={claim.id}
                  className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-[color:var(--ink)]">
                      {claim.serial_number}
                      {claim.model ? ` · ${claim.model}` : ""}
                    </p>
                    <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-[0.7rem] font-semibold text-[color:var(--ink-dim)]">
                      {STATUS_LABEL[claim.status] ?? claim.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.78rem] text-[color:var(--ink-faint)]">
                    Submitted {shortDate(claim.created_at)}
                    {claim.submitted_by ? ` by ${claim.submitted_by}` : ""}
                    {claim.grand_total_cents
                      ? ` · ${money(claim.grand_total_cents)} claimed`
                      : ""}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-[color:var(--ink-dim)]">
                    {claim.description}
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>
    </main>
  );
}
