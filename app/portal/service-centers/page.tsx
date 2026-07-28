import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Service Centres | Tamarack Industries",
};

export default async function ServiceCentersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data: centers } = await supabase
    .from("service_centers")
    .select("id, name, address, city, region, postal_code, country, phone, email, services, is_authorized, notes")
    .order("sort_order")
    .order("name");

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Service</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
          Service centres
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Authorised service and parts locations. Ordering several parts at
          once is usually cheaper — ask about volume pricing when you call.
        </p>

        {!centers?.length ? (
          <div className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
            <p className="text-sm leading-relaxed text-[color:var(--ink-dim)]">
              Locations are being loaded in. Until then our service team can
              point you at the nearest one.
            </p>
            <Link
              href="/contact/support"
              className="mt-6 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
            >
              Contact support
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {centers.map((center) => (
              <div
                key={center.id}
                className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-[color:var(--ink)]">
                    {center.name}
                  </p>
                  {center.is_authorized && (
                    <span className="rounded-full bg-[var(--orange-tint)] px-2.5 py-0.5 text-[0.68rem] font-semibold text-[color:var(--orange)]">
                      Authorised
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  {[center.address, center.city, center.region, center.postal_code]
                    .filter(Boolean)
                    .join(", ")}
                </p>

                <div className="mt-3 space-y-1 text-sm">
                  {center.phone && (
                    <p>
                      <a
                        href={`tel:${center.phone.replace(/[^\d+]/g, "")}`}
                        className="font-semibold text-[color:var(--ink)] hover:text-[color:var(--orange)]"
                      >
                        {center.phone}
                      </a>
                    </p>
                  )}
                  {center.email && (
                    <p>
                      <a
                        href={`mailto:${center.email}`}
                        className="text-[color:var(--ink-dim)] hover:text-[color:var(--orange)]"
                      >
                        {center.email}
                      </a>
                    </p>
                  )}
                </div>

                {center.services?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {center.services.map((service: string) => (
                      <span
                        key={service}
                        className="rounded-md border border-[color:var(--line)] px-2 py-1 text-[0.7rem] text-[color:var(--ink-dim)]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                ) : null}

                {center.notes && (
                  <p className="mt-3 text-[0.78rem] leading-relaxed text-[color:var(--ink-faint)]">
                    {center.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
