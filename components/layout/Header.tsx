// components/layout/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ResourcesMenu from "./ResourcesMenu";
import ProductsMenu from "./ProductsMenu";
import SolutionsMenu from "./SolutionsMenu";
import ContactMenu from "./ContactMenu";
import LineName from "@/components/product/LineName";
import { resourceGroups } from "@/lib/resources";
import { productLines } from "@/lib/product-lines";
import { solutions } from "@/lib/solutions";

type MenuKey = "products" | "solutions" | "resources" | "contact" | null;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lets other parts of the site open the Product Lines dropdown,
  // for example the button in the homepage hero.
  useEffect(() => {
    const openProducts = () => setMenu("products");
    window.addEventListener("open-products-menu", openProducts);
    return () => window.removeEventListener("open-products-menu", openProducts);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-white">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:h-24 md:px-10">
        {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center">
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
          onMouseLeave={() => setMenu(null)}
        >
          <button
            onMouseEnter={() => setMenu("products")}
            onClick={() => setMenu(menu === "products" ? null : "products")}
            aria-expanded={menu === "products"}
            className={`nav-link ${menu === "products" ? "nav-link-open" : ""}`}
          >
            Product Lines
            <span
              className={`ml-1.5 text-[0.6rem] transition-transform duration-200 ${
                menu === "products" ? "rotate-180" : ""
              }`}
            >
              &#9660;
            </span>
          </button>

          <button
            onMouseEnter={() => setMenu("solutions")}
            onClick={() => setMenu(menu === "solutions" ? null : "solutions")}
            aria-expanded={menu === "solutions"}
            className={`nav-link ${menu === "solutions" ? "nav-link-open" : ""}`}
          >
            <span className="whitespace-nowrap">
              Industry, Application, and Solutions
            </span>
            <span
              className={`ml-1.5 text-[0.6rem] transition-transform duration-200 ${
                menu === "solutions" ? "rotate-180" : ""
              }`}
            >
              &#9660;
            </span>
          </button>

          <button
            onMouseEnter={() => setMenu("resources")}
            onClick={() => setMenu(menu === "resources" ? null : "resources")}
            aria-expanded={menu === "resources"}
            className={`nav-link ${menu === "resources" ? "nav-link-open" : ""}`}
          >
            Resources
            <span
              className={`ml-1.5 text-[0.6rem] transition-transform duration-200 ${
                menu === "resources" ? "rotate-180" : ""
              }`}
            >
              &#9660;
            </span>
          </button>

          <Link
            href="/calculator"
            onMouseEnter={() => setMenu(null)}
            className="nav-link"
          >
            BTU Calculator
          </Link>

          <Link
            href="/#company"
            onMouseEnter={() => setMenu(null)}
            className="nav-link"
          >
            About Us
          </Link>

          <div
                        className="relative flex items-center pl-3 xl:pl-6"
            onMouseEnter={() => setMenu("contact")}
          >
            <button
              onClick={() => setMenu(menu === "contact" ? null : "contact")}
              aria-expanded={menu === "contact"}
              className={`contact-pill ${
                menu === "contact" ? "contact-pill-open" : ""
              }`}
            >
              Contact Us
              <span
                className={`text-[0.6rem] transition-transform duration-200 ${
                  menu === "contact" ? "rotate-180" : ""
                }`}
              >
                &#9660;
              </span>
            </button>

            <ContactMenu
              open={menu === "contact"}
              onNavigate={() => setMenu(null)}
            />
          </div>

          <ProductsMenu
            open={menu === "products"}
            onNavigate={() => setMenu(null)}
          />
          <SolutionsMenu
            open={menu === "solutions"}
            onNavigate={() => setMenu(null)}
          />
          <ResourcesMenu
            open={menu === "resources"}
            onNavigate={() => setMenu(null)}
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
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-[var(--ink)] transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-5 bg-[var(--ink)] transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-px w-5 bg-[var(--ink)] transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="max-h-[75vh] overflow-y-auto border-t border-[color:var(--line)] bg-[var(--surface)] px-6 py-4 lg:hidden">
          <p className="tech-label text-[color:var(--ember)]">Product Lines</p>
          {productLines.map((line) => {
            const expanded = mobileGroup === `p-${line.slug}`;
            return (
              <div
                key={line.slug}
                className="border-b border-[color:var(--line)]"
              >
                <button
                  onClick={() =>
                    setMobileGroup(expanded ? null : `p-${line.slug}`)
                  }
                  className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-[color:var(--ink)]"
                >
                                    <LineName slug={line.slug} name={line.name} height="h-5" />
                  <span
                    className={`text-[0.6rem] transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                  >
                    &#9660;
                  </span>
                </button>
                {expanded && (
                  <ul className="pb-3">
                    <li>
                      <Link
                        href={`/products/${line.slug}`}
                        onClick={() => setOpen(false)}
                        className="block py-2 pl-3 text-sm font-semibold text-[color:var(--orange)]"
                      >
                        Overview
                      </Link>
                    </li>
                                        {line.models.map((model) => (
                      <li key={model.slug}>
                        <Link
                          href={`/products/${line.slug}/${model.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 py-2 pl-3 text-sm text-[color:var(--ink-dim)]"
                        >
                          {model.name}
                          {model.comingSoon && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--line-strong)]" />
                          )}
                        </Link>
                      </li>
                    ))}
                    {line.hasAccessories && (
                      <li>
                        <Link
                          href={`/products/${line.slug}#accessories`}
                          onClick={() => setOpen(false)}
                          className="block py-2 pl-3 text-sm text-[color:var(--ink-dim)]"
                        >
                          Accessories
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}

          <p className="tech-label mt-5 text-[color:var(--ember)]">
            Industry, Application, and Solutions
          </p>
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={solution.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 border-b border-[color:var(--line)] py-3 text-sm font-semibold text-[color:var(--ink)]"
            >
              {solution.label}
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--line-strong)]" />
            </Link>
          ))}

          <p className="tech-label mt-5 text-[color:var(--ember)]">Resources</p>
          {resourceGroups.map((group) => {
            const expanded = mobileGroup === `r-${group.slug}`;
            return (
              <div
                key={group.slug}
                className="border-b border-[color:var(--line)]"
              >
                <button
                  onClick={() =>
                    setMobileGroup(expanded ? null : `r-${group.slug}`)
                  }
                  className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-[color:var(--ink)]"
                >
                  {group.label}
                  <span
                    className={`text-[0.6rem] transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                  >
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
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--line-strong)]" />
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
            href="/calculator"
            onClick={() => setOpen(false)}
            className="mt-5 block border-b border-[color:var(--line)] py-3 text-sm font-semibold text-[color:var(--ink-dim)]"
          >
            BTU Calculator
          </Link>

          <Link
            href="/#company"
            onClick={() => setOpen(false)}
            className="block border-b border-[color:var(--line)] py-3 text-sm font-semibold text-[color:var(--ink-dim)]"
          >
            About Us
          </Link>

          <div className="mt-5 space-y-3">
            <Link
              href="/contact/sales"
              onClick={() => setOpen(false)}
              className="brand-gradient block rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Contact Sales
            </Link>
            <Link
              href="/contact/support"
              onClick={() => setOpen(false)}
              className="block rounded-full border border-[color:var(--line-strong)] px-5 py-3 text-center text-sm font-semibold text-[color:var(--ink)]"
            >
              Contact Support
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}