"use client";

import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/lib/portal/auth";

const inputClass =
  "w-full mt-1.5 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const labelClass = "tech-label block text-[color:var(--ink-dim)]";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const valid = email.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;

    setBusy(true);
    setError(null);
    const result = await requestPasswordReset(email.trim());
    setBusy(false);

    if (result.ok) setSent(true);
    else setError(result.error);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
        <p className="font-semibold text-[color:var(--ink)]">Check your email</p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          If an account exists for {email.trim()}, a link to set a new password
          is on its way. The link expires after an hour.
        </p>
        <Link
          href="/portal/login"
          className="mt-6 inline-block text-sm font-semibold text-[color:var(--ink-dim)] underline underline-offset-4"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7"
    >
      <div>
        <label htmlFor="reset-email" className={labelClass}>
          Email address
        </label>
        <input
          id="reset-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm leading-relaxed text-[color:var(--ink-dim)]"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!valid || busy}
        className="brand-gradient mt-6 w-full rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? "Sending..." : "Send reset link"}
      </button>

      <Link
        href="/portal/login"
        className="mt-6 inline-block text-sm font-semibold text-[color:var(--ink-dim)] underline underline-offset-4"
      >
        Back to sign in
      </Link>
    </form>
  );
}