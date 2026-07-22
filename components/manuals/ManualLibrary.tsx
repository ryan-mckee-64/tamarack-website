"use client";

import { useMemo, useState } from "react";
import {
  categoryLabels,
  categoryOrder,
  formatYears,
  type DocumentCategory,
  type ProductDocument,
} from "@/lib/manuals";

type TabKey = "all" | DocumentCategory;

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All documents" },
  { key: "brochure", label: "Brochures" },
  { key: "operator", label: "Operator manuals" },
  { key: "parts", label: "Parts manuals" },
];

export default function ManualLibrary({ docs }: { docs: ProductDocument[] }) {
  const [tab, setTab] = useState<TabKey>("all");
  const [year, setYear] = useState<string>("all");
  const [query, setQuery] = useState("");

  const allYears = useMemo(() => {
    const set = new Set<number>();
    docs.forEach((d) => d.years.forEach((y) => set.add(y)));
    return [...set].sort((a, b) => b - a);
  }, [docs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return docs.filter((d) => {
      if (tab !== "all" && d.category !== tab) return false;
      if (year !== "all" && !d.years.includes(Number(year))) return false;
      if (!q) return true;
      const haystack = [d.title, d.variant, d.documentNumber, d.revision]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [docs, tab, year, query]);

  const grouped = useMemo(() => {
    return categoryOrder
      .map((cat) => ({
        category: cat,
        items: filtered.filter((d) => d.category === cat),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-[#e7e3de] pb-4">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                active
                  ? "rounded-full bg-[#a91f2e] px-4 py-2 text-sm font-medium text-white transition"
                  : "rounded-full bg-[#f3f0ec] px-4 py-2 text-sm font-medium text-[#5c5650] transition hover:bg-[#e9e4de]"
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <label
            htmlFor="year"
            className="text-sm font-medium text-[#5c5650] whitespace-nowrap"
          >
            Model year
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-lg border border-[#ddd7d0] bg-white px-3 py-2 text-sm text-[#333333] outline-none focus:border-[#a91f2e]"
          >
            <option value="all">All years</option>
            {allYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, model or document number"
          className="w-full rounded-lg border border-[#ddd7d0] bg-white px-3 py-2 text-sm text-[#333333] outline-none placeholder:text-[#9c948c] focus:border-[#a91f2e]"
        />
      </div>

      <p className="mt-4 text-sm text-[#7a736c]">
        Showing {filtered.length} of {docs.length} documents
      </p>

      {grouped.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-[#ddd7d0] bg-[#faf9f7] p-10 text-center">
          <p className="text-[#333333] font-medium">
            No documents match that selection
          </p>
          <p className="mt-2 text-sm text-[#7a736c]">
            Try a different model year, or contact our service team and we will
            locate the correct manual for your serial number.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map((group) => (
            <section key={group.category}>
              <h3 className="text-lg font-semibold text-[#333333]">
                {categoryLabels[group.category]}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-3 rounded-xl border border-[#e7e3de] bg-white p-5 transition hover:border-[#a91f2e] hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium text-[#333333] group-hover:text-[#a91f2e]">
                          {doc.title}
                          {doc.variant ? `, ${doc.variant}` : ""}
                        </p>
                        <p className="mt-1 text-sm text-[#7a736c]">
                          {[
                            formatYears(doc.years),
                            doc.documentNumber
                              ? `Document ${doc.documentNumber}${
                                  doc.revision ? ` ${doc.revision}` : ""
                                }`
                              : null,
                            doc.fileSize ? `PDF, ${doc.fileSize}` : "PDF",
                          ]
                            .filter(Boolean)
                            .join("  ·  ")}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg bg-[#f3f0ec] px-4 py-2 text-sm font-medium text-[#333333] transition group-hover:bg-[#a91f2e] group-hover:text-white">
                        Open PDF
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}