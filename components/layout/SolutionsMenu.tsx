"use client";

import Link from "next/link";
import { solutions } from "@/lib/solutions";

export default function SolutionsMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`absolute left-0 top-full z-50 w-[340px] transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="mt-2 rounded-2xl border border-[color:var(--line)] bg-white p-6 shadow-xl">
        <p className="tech-label text-[color:var(--ember)]">By application</p>
        <ul className="mt-1.5">
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <Link
                href={solution.href}
                onClick={onNavigate}
                className="flex items-center gap-1.5 rounded-md px-1.5 py-[5px] text-[0.8rem] text-[color:var(--ink-dim)] transition hover:bg-[var(--surface-2)] hover:text-[color:var(--ink)]"
              >
                <span className="whitespace-nowrap">{solution.label}</span>
                <span
                  title="Coming soon"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--line-strong)]"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-end border-t border-[color:var(--line)] pt-3.5">
          <span className="flex items-center gap-1.5 text-[0.7rem] text-[color:var(--ink-faint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--line-strong)]" />
            Coming soon
          </span>
        </div>
      </div>
    </div>
  );
}