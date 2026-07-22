// components/layout/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "Products", href: "/#products" },
  { label: "BTU Calculator", href: "/calculator" },
  { label: "Manuals & Parts", href: "/manuals" },
  { label: "3D Models", href: "/models" },
  { label: "Why Tamarack", href: "/#why" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-white">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:h-24 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/tamarack-logo.webp"
            alt="Tamarack Industries"
            width={860}
            height={303}
            priority
            className="h-11 w-auto transition-opacity hover:opacity-85 md:h-14"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-[color:var(--ink-dim)] transition-colors hover:text-[color:var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Service Request
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--line-strong)] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-[var(--ink)] transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-[var(--ink)] transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-3 h-px w-5 bg-[var(--ink)] transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-[color:var(--line)] bg-[var(--surface)] px-6 py-4 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-[color:var(--line)] py-3 text-sm font-semibold text-[color:var(--ink-dim)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="brand-gradient mt-4 block rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Service Request
          </Link>
        </nav>
      )}
    </header>
  );
}