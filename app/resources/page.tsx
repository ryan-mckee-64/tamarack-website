import Link from "next/link";
import type { Metadata } from "next";
import { resourceGroups } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources | Tamarack Industries",
  description:
    "Manuals, guides, product information, videos and tools for Tamarack equipment.",
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Support</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Resources
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Everything you need to specify, operate and service Tamarack
          equipment, in one place.
        </p>

        <div className="mt-16 space-y-16">
          {resourceGroups.map((group) => (
            <section key={group.slug}>
              <div className="flex flex-col gap-1 border-b border-[color:var(--line)] pb-4">
                <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
                  {group.label}
                </h2>
                <p className="text-sm text-[color:var(--ink-dim)]">
                  {group.blurb}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="group flex flex-col rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-6 transition hover:border-[color:var(--orange)] hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--orange)]">
                        {item.label}
                      </h3>
                      {item.status === "planned" && (
                        <span className="shrink-0 rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[0.65rem] font-semibold text-[color:var(--ink-faint)]">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}