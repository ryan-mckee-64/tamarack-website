"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addToCart } from "@/lib/portal/cart";
import { money, netPriceCents, stockLabel } from "@/lib/portal/format";

type Part = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  product_line: string | null;
  category: string | null;
  list_price_cents: number | null;
  stock_qty: number;
  lead_time_days: number | null;
};

const toneClass = {
  good: "text-[color:var(--ink)]",
  warn: "text-[color:var(--ember)]",
  bad: "text-[color:var(--ink-faint)]",
};

export default function PartsBrowser({
  parts,
  discountPercent,
  productLines,
  initialQuery,
  initialLine,
}: {
  parts: Part[];
  discountPercent: number;
  productLines: { slug: string; name: string }[];
  initialQuery: string;
  initialLine: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [line, setLine] = useState(initialLine);
  const [added, setAdded] = useState<string | null>(null);

  function search(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (line) params.set("line", line);
    router.push(`/portal/parts${params.toString() ? `?${params}` : ""}`);
  }

  function add(part: Part) {
    addToCart({
      partId: part.id,
      sku: part.sku,
      name: part.name,
      quantity: 1,
      unitPriceCents: netPriceCents(part.list_price_cents, discountPercent),
    });
    setAdded(part.id);
    setTimeout(() => setAdded((current) => (current === part.id ? null : current)), 1800);
  }

  return (
    <>
      <form onSubmit={search} className="mt-8 flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by part number or description"
          className="min-w-[240px] flex-1 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[color:var(--orange)]"
        />
        <select
          value={line}
          onChange={(e) => setLine(e.target.value)}
          className="rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[color:var(--orange)]"
        >
          <option value="">All product lines</option>
          {productLines.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Search
        </button>
      </form>

      {parts.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          No parts match that search. Try a different part number, or contact
          the parts desk and we will track it down.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[color:var(--line)]">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[color:var(--line)] bg-[var(--surface-2)] text-left">
                <th className="px-5 py-3 font-semibold">Part</th>
                <th className="px-5 py-3 font-semibold">Availability</th>
                <th className="px-5 py-3 text-right font-semibold">List</th>
                <th className="px-5 py-3 text-right font-semibold">Your price</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => {
                const stock = stockLabel(part.stock_qty, part.lead_time_days);
                const net = netPriceCents(part.list_price_cents, discountPercent);
                const discounted =
                  net != null && net !== part.list_price_cents;

                return (
                  <tr
                    key={part.id}
                    className="border-b border-[color:var(--line)] last:border-0"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[color:var(--ink)]">
                        {part.sku}
                      </p>
                      <p className="text-[color:var(--ink-dim)]">{part.name}</p>
                      {part.description && (
                        <p className="mt-1 text-[0.78rem] text-[color:var(--ink-faint)]">
                          {part.description}
                        </p>
                      )}
                    </td>
                    <td className={`px-5 py-4 ${toneClass[stock.tone]}`}>
                      {stock.text}
                    </td>
                    <td className="px-5 py-4 text-right text-[color:var(--ink-dim)]">
                      {discounted ? money(part.list_price_cents) : "—"}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-[color:var(--ink)]">
                      {money(net)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => add(part)}
                        className="rounded-full border border-[color:var(--line-strong)] px-4 py-1.5 text-[0.8rem] font-semibold transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
                      >
                        {added === part.id ? "Added" : "Add"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
