// components/layout/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ResourcesMenu from "./ResourcesMenu";
import { resourceGroups } from "@/lib/resources";

const NAV = [
  { label: "Products", href: "/#products" },
  { label: "Why Tamarack", href: "/#why" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResourcesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
        <nav
          className="relative hidden h-full items-stretch lg:flex"
          onMouseLeave={() => setResourcesOpen(false)}
        >
          <Link href="/#products" className="nav-link">
            Products
          </Link>

          <button
            onMouseEnter={() => setResourcesOpen(true)}
            onClick={() => setResourcesOpen((v) => !v)}
            aria-expanded={resourcesOpen}
            className={`nav-link ${resourcesOpen ? "nav-link-open" : ""}`}
          >
            Resources
            <span
              className={`ml-1.5 text-[0.6rem] transition-transform duration-200 ${
                resourcesOpen ? "rotate-180" : ""
              }`}
            >
              &#9660;
            </span>
          </button>

          <Link href="/#why" className="nav-link">
            Why Tamarack
          </Link>

          <div className="flex items-center pl-6">
            <Link
              href="/contact"
              className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Service Request
            </Link>
          </div>

          <ResourcesMenu
            open={resourcesOpen}
            onNavigate={() => setResourcesOpen(false)}
          />
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
        <nav className="max-h-[75vh] overflow-y-auto border-t border-[color:var(--line)] bg-[var(--surface)] px-6 py-4 lg:hidden">
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

          <p className="tech-label mt-5 text-[color:var(--ember)]">Resources</p>

          {resourceGroups.map((group) => {
            const expanded = mobileGroup === group.slug;
            return (
              <div key={group.slug} className="border-b border-[color:var(--line)]">
                <button
                  onClick={() => setMobileGroup(expanded ? null : group.slug)}
                  className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-[color:var(--ink)]"
                >
                  {group.label}
                  <span className={`text-[0.6rem] transition-transform ${expanded ? "rotate-180" : ""}`}>
                    &#9660;
                  </span>
                </button>
                {expanded && (
                  <ul className="pb-3">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 py-2 pl-3 text-sm text-[color:var(--ink-dim)]"
                        >
                          {item.label}
                          {item.status === "planned" && (
                            <span className="rounded-full bg-[var(--surface-2)] px-1.5 py-0.5 text-[0.6rem] font-semibold text-[color:var(--ink-faint)]">
                              Soon
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="brand-gradient mt-5 block rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Service Request
          </Link>
        </nav>
      )}
    </header>
  );
}