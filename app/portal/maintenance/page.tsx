import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProductLine } from "@/lib/product-lines";
import LineName from "@/components/product/LineName";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Maintenance Schedules | Tamarack Industries",
};

type Schedule = {
  id: string;
  product_line: string;
  model: string | null;
  interval_label: string;
  interval_hours: number | null;
  tasks: string[];
  document_url: string | null;
};

export default async function MaintenancePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data: schedules } = await supabase
    .from("maintenance_schedules")
    .select("id, product_line, model, interval_label, interval_hours, tasks, document_url")
    .order("product_line")
    .order("sort_order");

  // Group by product line so each machine's intervals read as one list.
  const grouped = new Map<string, Schedule[]>();
  for (const row of (schedules ?? []) as Schedule[]) {
    const list = grouped.get(row.product_line) ?? [];
    list.push(row);
    grouped.set(row.product_line, list);
  }

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Service</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
          Maintenance schedules
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Service intervals by product. Keeping to these is also what keeps a
          warranty claim straightforward.
        </p>

        {grouped.size === 0 ? (
          <p className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Schedules are being loaded in. In the meantime every operator manual
            in the manual library carries the full maintenance section.
          </p>
        ) : (
          <div className="mt-10 space-y-12">
            {[...grouped.entries()].map(([lineSlug, rows]) => {
              const line = getProductLine(lineSlug);
              return (
                <div key={lineSlug}>
                  <div className="flex items-center gap-3 border-b border-[color:var(--line)] pb-4">
                    <LineName
                      slug={lineSlug}
                      name={line?.name ?? lineSlug}
                      height="h-8"
                    />
                  </div>

                  <div className="mt-5 space-y-4">
                    {rows.map((row) => (
                      <div
                        key={row.id}
                        className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-6"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="font-semibold text-[color:var(--ink)]">
                            {row.interval_label}
                          </p>
                          <p className="text-[0.78rem] text-[color:var(--ink-faint)]">
                            {row.model ? row.model : "All models"}
                            {row.interval_hours
                              ? ` · every ${row.interval_hours} hours`
                              : ""}
                          </p>
                        </div>

                        {row.tasks?.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {row.tasks.map((task, i) => (
                              <li
                                key={i}
                                className="flex gap-3 text-sm leading-relaxed text-[color:var(--ink-dim)]"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--orange)]" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        )}

                        {row.document_url && (
                          <a
                            href={row.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
                          >
                            Full schedule document
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
