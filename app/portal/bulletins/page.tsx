import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { shortDate } from "@/lib/portal/format";
import SerialLookup from "@/components/portal/SerialLookup";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recalls and Bulletins | Tamarack Industries",
};

export default async function BulletinsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data: bulletins } = await supabase
    .from("bulletins")
    .select("id, kind, reference, title, summary, product_line, published_on, document_url")
    .order("published_on", { ascending: false });

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Safety and service</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
          Recalls and bulletins
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Check whether anything applies to a specific machine, or read
          everything published for your equipment below.
        </p>

        <div className="mt-10">
          <SerialLookup />
        </div>

        <h2 className="font-display mt-16 text-2xl font-bold text-[color:var(--ink)]">
          Everything published
        </h2>

        {!bulletins?.length ? (
          <p className="mt-5 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Nothing published yet. Anything issued for your equipment will
            appear here, and we contact affected owners directly for recalls.
          </p>
        ) : (
          <ul className="mt-5 space-y-4">
            {bulletins.map((b) => (
              <li
                key={b.id}
                className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold ${
                      b.kind === "recall"
                        ? "bg-[var(--orange-tint-2)] text-[color:var(--orange)]"
                        : "bg-[var(--surface-2)] text-[color:var(--ink-dim)]"
                    }`}
                  >
                    {b.kind === "recall" ? "Recall" : "Service bulletin"}
                  </span>
                  {b.reference && (
                    <span className="text-[0.78rem] text-[color:var(--ink-faint)]">
                      {b.reference}
                    </span>
                  )}
                  <span className="text-[0.78rem] text-[color:var(--ink-faint)]">
                    {shortDate(b.published_on)}
                  </span>
                </div>

                <p className="mt-3 font-semibold text-[color:var(--ink)]">
                  {b.title}
                </p>
                {b.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                    {b.summary}
                  </p>
                )}
                {b.document_url && (
                  <a
                    href={b.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
                  >
                    Open the document
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
