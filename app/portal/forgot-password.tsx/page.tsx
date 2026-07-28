import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/portal/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Your Password | Tamarack Industries",
  description: "Reset the password for your Tamarack customer portal account.",
};

export default function ForgotPasswordPage() {
  return (
    <main>
      <section className="mx-auto max-w-xl px-6 py-20 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Customer Portal</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)] sm:text-5xl">
          Reset your password
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Enter the email address on your account and we will send you a link to
          set a new password.
        </p>

        <div className="mt-10">
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}