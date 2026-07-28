import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { productLines } from "@/lib/product-lines";
import PartsBrowser from "@/components/portal/PartsBrowser";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parts Pricing and Availability | Tamarack Industries",
};

export default async function PartsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; line?: string }>;
}) {
  const { q = "", line = "" } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("discount_percent")
    .eq("id", user.id)
    .maybeSingle();

  let query = supabase
    .from("parts")
    .select("id, sku, name, description, product_line, category, list_price_cents, stock_qty, lead_time_days")
    .order("sku")
    .limit(200);

  if (q.trim()) {
    const term = `%${q.trim()}%`;
    query = query.or(`sku.ilike.${term},name.ilike.${term},description.ilike.${term}`);
  }
  if (line) query = query.eq("product_line", line);

  const { data: parts, error } = await query;

  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Parts</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
          Pricing and availability
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Prices shown are your account pricing. Stock updates as our inventory
          changes — add what you need and submit the order for our parts desk to
          confirm.
        </p>

        {error && (
          <p className="mt-8 rounded-xl border border-[color:var(--line-strong)] p-5 text-sm text-[color:var(--ink-dim)]">
            The parts catalogue is not available yet. Once the `parts` table has
            rows, they appear here.
          </p>
        )}

        <PartsBrowser
          parts={parts ?? []}
          discountPercent={Number(profile?.discount_percent ?? 0)}
          productLines={productLines.map((l) => ({
            slug: l.slug,
            name: l.name,
          }))}
          initialQuery={q}
          initialLine={line}
        />
      </section>
    </main>
  );
}
