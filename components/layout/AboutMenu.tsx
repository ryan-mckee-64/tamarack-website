"use client";

import Link from "next/link";
import { aboutItems } from "@/lib/about";

export default function AboutMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="mt-2 rounded-2xl border border-[color:var(--line)] bg-white p-3 shadow-xl">
        {aboutItems.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            onClick={onNavigate}
            className={`group block rounded-xl px-4 py-3 transition hover:bg-[var(--surface-2)] ${
              item.highlight ? "mt-1 border-t border-[color:var(--line)] pt-4" : ""
            }`}
          >
            <p
              className={`flex items-center gap-2 text-sm font-bold transition ${
                item.highlight
                  ? "text-[color:var(--orange)]"
                  : "text-[color:var(--ink)] group-hover:text-[color:var(--orange)]"
              }`}
            >
              {item.label}
            </p>
            <p className="mt-1 text-[0.78rem] leading-snug text-[color:var(--ink-dim)]">
              {item.blurb}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
