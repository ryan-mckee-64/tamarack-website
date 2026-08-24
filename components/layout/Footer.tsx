// components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Heating",
    links: [
      { label: "Heat King", href: "/products/heat-king" },
      { label: "Thawzall", href: "/products/thawzall-xhr" },
    ],
  },
  {
    title: "Equipment",
    links: [
      { label: "Mud Dog", href: "/products/mud-dog" },
      { label: "Yard Dog", href: "/products/yard-dog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "BTU Calculator", href: "/calculator" },
      { label: "Manuals & Parts", href: "/manuals" },
      { label: "Service Request", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-[color:var(--orange)] bg-[var(--surface-2)]">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex">
              <Image
                src="/images/tamarack-logo.webp"
                alt="Tamarack Industries"
                width={860}
                height={303}
                className="h-14 w-auto transition-opacity hover:opacity-85"
              />
            </Link>
            <p className="tech-label mt-4 text-[color:var(--ink-faint)]">Industrial Heating &amp; Equipment</p>
            <p className="font-body mt-5 max-w-xs text-sm leading-relaxed text-[color:var(--ink-dim)]">
              Heating and construction equipment, designed and manufactured in Manitoba since 1995.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="tech-label text-[color:var(--ember)]">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-body text-sm text-[color:var(--ink-dim)] transition-colors hover:text-[color:var(--ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Locations — confirm the current head office address */}
        <div className="mt-14 grid gap-6 border-t border-[color:var(--line)] pt-8 sm:grid-cols-3">
          <div>
            <p className="tech-label text-[color:var(--ink-faint)]">Head office</p>
            <p className="font-body mt-2 text-sm text-[color:var(--ink-dim)]">
              A90 Hutchings Street<br />Winnipeg, MB R2X 2X1
            </p>
          </div>
          <div>
            <p className="tech-label text-[color:var(--ink-faint)]">Alexandria, MN</p>
            <p className="font-body mt-2 text-sm text-[color:var(--ink-dim)]">
              2736 Latoka Ln SW<br />Alexandria, MN 56308
            </p>
          </div>
          <div>
            <p className="tech-label text-[color:var(--ink-faint)]">Contact</p>
            <p className="font-body mt-2 text-sm text-[color:var(--ink-dim)]">
              Sales 800.661.0304 ext 229<br />Service 800.661.0304 opt 1
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[color:var(--line)]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-6 py-5 md:flex-row md:px-10">
          <p className="font-mono-label text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
            © {new Date().getFullYear()} Tamarack Industries
          </p>
          <p className="font-mono-label text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
            Manufactured in Winnipeg, Manitoba
          </p>
        </div>
      </div>
    </footer>
  );
}