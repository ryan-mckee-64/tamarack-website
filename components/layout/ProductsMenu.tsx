"use client";

import Image from "next/image";
import Link from "next/link";
import { productLines } from "@/lib/product-lines";

export default function ProductsMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`absolute left-0 top-full z-50 w-[540px] transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="mt-2 rounded-2xl border border-[color:var(--line)] bg-white p-6 shadow-xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {productLines.map((line) => (
            <div key={line.slug}>
              <Link
                href={`/products/${line.slug}`}
                onClick={onNavigate}
                className="group block"
              >
                {line.logo ? (
                  <Image
                    src={line.logo}
                    alt={line.name}
                    width={400}
                    height={100}
                    className="h-6 w-auto transition-opacity group-hover:opacity-75"
                  />
                ) : (
                  <p className="text-sm font-bold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                    {line.name}
                  </p>
                )}
                <p className="mt-1 text-[0.68rem] text-[color:var(--ink-faint)]">
                  {line.category}
                </p>
              </Link>

              <ul className="mt-2">
                {line.models.map((model) => (
                  <li key={model.slug}>
                    <Link
                      href={`/products/${line.slug}/${model.slug}`}
                      onClick={onNavigate}
                      className="block rounded-md px-1.5 py-1 text-[0.8rem] text-[color:var(--ink-dim)] transition hover:bg-[var(--surface-2)] hover:text-[color:var(--ink)]"
                    >
                      {model.name}
                    </Link>
                  </li>
                ))}
                {line.hasAccessories && (
                  <li>
                    <Link
                      href={`/products/${line.slug}#accessories`}
                      onClick={onNavigate}
                      className="block rounded-md px-1.5 py-1 text-[0.8rem] text-[color:var(--ink-dim)] transition hover:bg-[var(--surface-2)] hover:text-[color:var(--ink)]"
                    >
                      Accessories
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-[color:var(--line)] pt-3.5">
          <Link
            href="/products"
            onClick={onNavigate}
            className="text-[0.8rem] font-semibold text-[color:var(--orange)] underline underline-offset-4"
          >
            View all product lines
          </Link>
        </div>
      </div>
    </div>
  );
}
