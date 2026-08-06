import Link from "next/link";
import type { Metadata } from "next";
import { modelComparisons } from "@/lib/model-comparisons";
import { getProductLine } from "@/lib/product-lines";
import LineName from "@/components/product/LineName";

export const metadata: Metadata = {
  title: "Model Comparison Chart | Tamarack Industries",
  description:
    "Compare heating output, coverage, hose configuration and run time across Tamarack models.",
};

export default function ModelComparisonPage() {
  return (
    <main className="bg-[var(--surface-2)]">
      <section className="page-hero border-b border-[color:var(--line)]">
        <div className="relative z-10 mx-auto max-w-[1080px] px-6 py-20 md:px-10 md:py-24">
          <Link
            href="/resources"
            className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
          >
            Back to resources
          </Link>

          <p className="tech-label mt-8 text-[color:var(--ember)]">
            Specifications
          </p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
            Model comparison
          </h1>
          <hr className="brand-rule mt-6 w-24" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
            Output, coverage and run time side by side, so you can size a
            machine to the job before you order.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-6 py-16 md:px-10 md:py-20">
        <div className="space-y-16">
          {modelComparisons.map((comparison) => {
            const accent =
              getProductLine(comparison.lineSlug)?.accent ?? "var(--orange)";

            return (
              <article
                key={comparison.slug}
                style={{ "--accent": accent } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <LineName
                      slug={comparison.lineSlug}
                      name={comparison.title}
                      height="h-8"
                    />
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--ink-dim)]">
                      {comparison.summary}
                    </p>
                  </div>
                  <Link
                    href={`/products/${comparison.lineSlug}`}
                    className="group flex items-center gap-2 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent)]"
                  >
                    View the line
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>

                {/* The label column is sticky so the row stays identifiable
                    once a wide table scrolls sideways on a narrow screen. */}
                <div className="mt-6 overflow-x-auto rounded-2xl border border-[color:var(--line)] bg-[var(--surface)]">
                  <table className="w-full min-w-[640px] border-collapse text-sm">
                    <caption className="sr-only">
                      {comparison.title} model specifications
                    </caption>
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="sticky left-0 z-10 bg-[var(--surface)] px-5 py-4 text-left"
                        >
                          <span className="sr-only">Specification</span>
                        </th>
                        {comparison.models.map((model) => (
                          <th
                            key={model}
                            scope="col"
                            style={{ backgroundColor: "var(--accent)" }}
                            className="font-display px-5 py-4 text-center text-base font-bold tracking-[-0.01em] text-white"
                          >
                            {model}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.rows.map((row, rowIndex) => (
                        <tr
                          key={row.label}
                          className="border-t border-[color:var(--line)]"
                        >
                          <th
                            scope="row"
                            className={`sticky left-0 z-10 px-5 py-4 text-left align-middle font-semibold text-[color:var(--ink)] ${
                              rowIndex % 2
                                ? "bg-[var(--surface)]"
                                : "bg-[var(--surface-2)]"
                            }`}
                          >
                            {row.label}
                          </th>
                          {row.cells.map((cell, i) => (
                            <td
                              key={`${row.label}-${i}`}
                              className={`px-5 py-4 text-center align-middle tabular-nums text-[color:var(--ink)] ${
                                rowIndex % 2 ? "" : "bg-[var(--surface-2)]"
                              }`}
                            >
                              {cell.value}
                              {cell.note && (
                                <span className="mt-1 block text-[0.72rem] font-normal tabular-nums text-[color:var(--ink-faint)]">
                                  {cell.note}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {comparison.footnote && (
                  <p className="mt-3 text-[0.78rem] leading-relaxed text-[color:var(--ink-faint)]">
                    {comparison.footnote}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7">
          <p className="font-semibold text-[color:var(--ink)]">
            Not sure which model fits the job?
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Coverage depends on ground conditions, insulation and target
            temperature. Our BTU calculator will size the load, and our team can
            confirm it against the specifics of your site.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              BTU calculator
            </Link>
            <Link
              href="/contact/support"
              className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
            >
              Ask our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
