"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updatePassword } from "@/lib/portal/auth";

const inputClass =
  "w-full mt-1.5 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const labelClass = "tech-label block text-[color:var(--ink-dim)]";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const tooShort = password !== "" && password.length < 8;
  const mismatch = confirm !== "" && password !== confirm;
  const valid = password.length >= 8 && password === confirm;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;

    setBusy(true);
    setError(null);
    const result = await updatePassword(password);

    if (result.ok) {
      router.push("/portal/dashboard");
      router.refresh();
      return;
    }

    setBusy(false);
    setError(result.error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7"
    >
      <div>
        <label htmlFor="new-password" className={labelClass}>
          New password
        </label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
        <p className="mt-2 text-[0.78rem] text-[color:var(--ink-dim)]">
          At least 8 characters.
        </p>
      </div>

      <div className="mt-5">
        <label htmlFor="confirm-password" className={labelClass}>
          Confirm new password
        </label>
        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={inputClass}
        />
        {mismatch && (
          <p className="mt-2 text-[0.78rem] text-[color:var(--orange)]">
            The two passwords do not match.
          </p>
        )}
        {tooShort && !mismatch && (
          <p className="mt-2 text-[0.78rem] text-[color:var(--orange)]">
            Use at least 8 characters.
          </p>
        )}
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
        {busy ? "Saving..." : "Save new password"}
      </button>
    </form>
  );
}
