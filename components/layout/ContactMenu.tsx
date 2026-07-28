"use client";

import Link from "next/link";

const OPTIONS: {
  href: string;
  label: string;
  blurb: string;
  comingSoon?: boolean;
}[] = [
  {
    href: "/contact/sales",
    label: "Sales",
    blurb: "Pricing, availability, rentals and new equipment enquiries.",
  },
  {
    href: "/contact/support",
    label: "Support",
    blurb: "Service, parts, troubleshooting and warranty questions.",
  },
  {
    href: "/contact/quote",
    label: "Get a quote",
    blurb: "Request pricing for a specific machine or job.",
  },
  {
    href: "/portal",
    label: "Customer Portal",
    blurb: "Order history, documents and account information.",
    comingSoon: true,
  },
];

export default function ContactMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`absolute right-0 top-full z-50 w-[320px] transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="mt-2 rounded-2xl border border-[color:var(--line)] bg-white p-3 shadow-xl">
        {OPTIONS.map((opt) => (
          <Link
            key={opt.href}
            href={opt.href}
            onClick={onNavigate}
            className="group block rounded-xl px-4 py-3 transition hover:bg-[var(--surface-2)]"
          >
            <p className="flex items-center gap-2 text-sm font-bold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
              {opt.label}
              {opt.comingSoon && (
                <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[0.6rem] font-semibold text-[color:var(--ink-faint)]">
                  Coming soon
                </span>
              )}
            </p>
            <p className="mt-1 text-[0.78rem] leading-snug text-[color:var(--ink-dim)]">
              {opt.blurb}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}