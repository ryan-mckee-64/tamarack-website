"use client";

import Link from "next/link";
import { resourceGroups } from "@/lib/resources";

export default function ResourcesMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`absolute right-0 top-full z-50 w-[560px] transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="mt-2 rounded-2xl border border-[color:var(--line)] bg-white p-6 shadow-xl">
        <div className="columns-3 gap-6 [column-fill:balance]">
          {resourceGroups.map((group) => (
            <div key={group.slug} className="mb-5 break-inside-avoid">
              <p className="tech-label text-[color:var(--ember)]">
                {group.label}
              </p>
              <ul className="mt-1.5">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className="flex items-center gap-1.5 rounded-md px-1.5 py-[5px] text-[0.8rem] text-[color:var(--ink-dim)] transition hover:bg-[var(--surface-2)] hover:text-[color:var(--ink)]"
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      {item.status === "planned" && (
                        <span
                          title="Coming soon"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--line-strong)]"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-3.5">
          <Link
            href="/resources"
            onClick={onNavigate}
            className="text-[0.8rem] font-semibold text-[color:var(--orange)] underline underline-offset-4"
          >
            View all resources
          </Link>
          <span className="flex items-center gap-1.5 text-[0.7rem] text-[color:var(--ink-faint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--line-strong)]" />
            Coming soon
          </span>
        </div>
      </div>
    </div>
  );
}