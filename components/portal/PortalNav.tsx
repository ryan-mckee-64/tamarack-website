"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/portal/dashboard", label: "Overview" },
  { href: "/portal/orders", label: "Orders" },
  { href: "/portal/bulletins", label: "Recalls & bulletins" },
  { href: "/portal/maintenance", label: "Maintenance" },
  { href: "/portal/warranty", label: "Warranty" },
];

export default function PortalNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[color:var(--line)] bg-[var(--surface-2)]">
      <div className="mx-auto flex max-w-[1280px] items-center gap-1 overflow-x-auto px-6 py-2 md:px-10">
        {LINKS.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold transition ${
                active
                  ? "bg-white text-[color:var(--orange)] shadow-sm"
                  : "text-[color:var(--ink-dim)] hover:text-[color:var(--ink)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}