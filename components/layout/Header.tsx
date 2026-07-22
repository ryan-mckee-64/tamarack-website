// components/layout/Header.tsx
"use client";

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
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[var(--bg-85)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:h-20 md:px-10">
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="block h-6 w-6 shrink-0 bg-[var(--orange)] transition-transform group-hover:scale-105" />
          <span className="leading-none">
            <span className="font-display block text-lg font-bold tracking-[-0.01em] text-[color:var(--ink)] md:text-xl">
              Tamarack
            </span>
            <span className="font-mono-label mt-0.5 block text-[0.56rem] uppercase tracking-[0.2em] text-[color:var(--ink-faint)]">
              Industrial Heating &amp; Equipment
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono-label text-xs uppercase tracking-[0.16em] text-[color:var(--ink-dim)] transition-colors hover:text-[color:var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-[var(--orange)] px-5 py-2.5 font-mono-label text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-[color:var(--ember)]"
          >
            Service Request
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-[color:var(--line-strong)] lg:hidden"
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
              className="font-mono-label block border-b border-[color:var(--line)] py-3 text-sm uppercase tracking-[0.16em] text-[color:var(--ink-dim)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block bg-[var(--orange)] px-5 py-3 text-center font-mono-label text-sm uppercase tracking-[0.16em] text-white"
          >
            Service Request
          </Link>
        </nav>
      )}
    </header>
  );
}

