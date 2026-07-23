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
  { key: "operator", label: "Operator manuals" },
  { key: "parts", label: "Parts manuals" },
  { key: "component", label: "Engine and generator" },
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

  const isFiltered = tab !== "all" || year !== "all" || query.trim() !== "";

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-[color:var(--line)] pb-4">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                active
                  ? "brand-gradient rounded-full px-4 py-2 text-sm font-semibold text-white transition"
                  : "rounded-full bg-[var(--surface-2)] px-4 py-2 text-sm font-semibold text-[color:var(--ink-dim)] transition hover:bg-[var(--orange-tint)] hover:text-[color:var(--ink)]"
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
            className="tech-label whitespace-nowrap text-[color:var(--ink-dim)]"
          >
            Model year
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2 text-sm text-[color:var(--ink)] outline-none focus:border-[color:var(--orange)]"
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
          placeholder="Search by model, title or document number"
          className="w-full rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2 text-sm text-[color:var(--ink)] outline-none placeholder:text-[color:var(--ink-faint)] focus:border-[color:var(--orange)]"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p className="text-sm text-[color:var(--ink-dim)]">
          Showing {filtered.length} of {docs.length} documents
        </p>
        {isFiltered && (
          <button
            onClick={() => {
              setTab("all");
              setYear("all");
              setQuery("");
            }}
            className="text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
          >
            Clear filters
          </button>
        )}
      </div>

      {grouped.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface-2)] p-10 text-center">
          <p className="font-semibold text-[color:var(--ink)]">
            No documents match that selection
          </p>
          <p className="mt-2 text-sm text-[color:var(--ink-dim)]">
            Try a different model year, or contact our service team and we will
            locate the correct manual for your serial number.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map((group) => (
            <section key={group.category}>
              <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-[color:var(--ink)]">
                {categoryLabels[group.category]}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-3 rounded-xl border border-[color:var(--line)] bg-[var(--surface)] p-5 transition hover:border-[color:var(--orange)] hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                          {doc.title}
                          {doc.variant ? `, ${doc.variant}` : ""}
                        </p>
                        <p className="mt-1 text-sm text-[color:var(--ink-dim)]">
                          {[
                            formatYears(doc.years),
                            doc.documentNumber
                              ? `Document ${doc.documentNumber}${
                                  doc.revision ? ` ${doc.revision}` : ""
                                }`
                              : doc.revision
                              ? `Revision ${doc.revision}`
                              : null,
                            doc.fileSize ? `PDF, ${doc.fileSize}` : "PDF",
                          ]
                            .filter(Boolean)
                            .join("  ·  ")}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg bg-[var(--surface-2)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition group-hover:bg-[var(--orange)] group-hover:text-white">
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
