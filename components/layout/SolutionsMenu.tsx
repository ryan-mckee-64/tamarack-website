"use client";

import Link from "next/link";
import { applicationSolutions, industrySolutions } from "@/lib/solutions";

const GROUPS = [
  { label: "By application", items: applicationSolutions },
  { label: "By industry", items: industrySolutions },
];

export default function SolutionsMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="mt-2 grid grid-cols-2 gap-6 rounded-2xl border border-[color:var(--line)] bg-white p-6 shadow-xl">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="tech-label text-[color:var(--ember)]">
              {group.label}
            </p>
            <ul className="mt-1.5">
              {group.items.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={solution.href}
                    onClick={onNavigate}
                    className="flex items-center gap-1.5 rounded-md px-1.5 py-[5px] text-[0.8rem] text-[color:var(--ink-dim)] transition hover:bg-[var(--surface-2)] hover:text-[color:var(--ink)]"
                  >
                    <span className="whitespace-nowrap">{solution.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}