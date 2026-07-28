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

        <div className="mt-10">
          <PortalLoginForm />
        </div>
      </section>
    </main>
  );
}