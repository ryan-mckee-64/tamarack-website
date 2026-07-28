import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/portal/auth";

// Per-customer data, so never prerender or cache this page.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Account | Tamarack Industries",
  description: "Order history, documents and account information.",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Proxy already turns away signed-out visitors; this is the check that
  // actually guards the data, since proxy can be bypassed by a direct request.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/portal/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, company")
    .eq("id", user.id)
    .maybeSingle();

  const greeting = profile?.full_name || user.email;

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Customer Portal</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Welcome back
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Signed in as {greeting}
          {profile?.company ? ` · ${profile.company}` : ""}.
        </p>

        <div className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
          <p className="font-semibold text-[color:var(--ink)]">
            Nothing here yet
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Sign in works. Order history, documents and account details get
            added on top of this page as those tables come online.
          </p>
        </div>

        <form action={signOut} className="mt-8">
          <button
            type="submit"
            className="rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)]"
          >
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}
