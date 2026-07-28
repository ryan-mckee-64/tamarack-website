"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CART_CHANGED_EVENT, cartCount, readCart } from "@/lib/portal/cart";

const LINKS = [
  { href: "/portal/dashboard", label: "Overview" },
  { href: "/portal/parts", label: "Parts" },
  { href: "/portal/orders", label: "Orders" },
  { href: "/portal/bulletins", label: "Recalls & bulletins" },
  { href: "/portal/maintenance", label: "Maintenance" },
  { href: "/portal/warranty", label: "Warranty" },
  { href: "/portal/service-centers", label: "Service centres" },
];

export default function PortalNav() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount(readCart()));
    sync();
    window.addEventListener(CART_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

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

        <Link
          href="/portal/parts/cart"
          className="ml-auto flex items-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--line-strong)] bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
        >
          Cart
          {count > 0 && (
            <span className="brand-gradient rounded-full px-2 py-0.5 text-[0.7rem] text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
