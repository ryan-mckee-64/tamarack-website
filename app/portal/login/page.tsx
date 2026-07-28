import { Suspense } from "react";
import type { Metadata } from "next";
import PortalLoginForm from "@/components/portal/PortalLoginForm";

export const metadata: Metadata = {
  title: "Customer Portal Sign In | Tamarack Industries",
  description:
    "Sign in to the Tamarack customer portal for order history, documents and account information.",
};

export default function PortalLoginPage() {
  return (
    <main>
      <section className="mx-auto max-w-xl px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Customer Portal</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Sign in
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Order history, documents and account information, in one place.
        </p>

        {/* The form reads ?next= and ?error= from the URL, which needs a
            Suspense boundary for the rest of the page to stay static. */}
        <div className="mt-10">
          <Suspense
            fallback={
              <div className="h-[420px] rounded-2xl border border-[color:var(--line)] bg-[var(--surface)]" />
            }
          >
            <PortalLoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
