import type { Metadata } from "next";
import ResetPasswordForm from "@/components/portal/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set a New Password | Tamarack Industries",
  description: "Choose a new password for your Tamarack customer portal account.",
};

export default function ResetPasswordPage() {
  return (
    <main>
      <section className="mx-auto max-w-xl px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Customer Portal</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Set a new password
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Choose something you have not used on this account before.
        </p>

        <div className="mt-10">
          <ResetPasswordForm />
        </div>
      </section>
    </main>
  );
}
