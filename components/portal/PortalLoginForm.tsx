"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/portal/auth";

const inputClass =
  "w-full mt-1.5 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const labelClass = "tech-label block text-[color:var(--ink-dim)]";

export default function PortalLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Proxy adds ?next= when it turns someone away from a portal page, and the
  // auth callback adds ?error= when an emailed link has expired.
  const next = searchParams.get("next");
  const linkExpired = searchParams.get("error") === "link_expired";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const valid = email.trim() !== "" && password !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;

    setBusy(true);
    setError(null);
    const result = await signIn(email.trim(), password);

    if (result.ok) {
      router.push(next && next.startsWith("/") ? next : "/portal/dashboard");
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
        <label htmlFor="portal-email" className={labelClass}>
          Email address
        </label>
        <input
          id="portal-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="portal-password" className={labelClass}>
          Password
        </label>
        <div className="relative">
          <input
            id="portal-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass + " pr-16"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.7rem] font-semibold uppercase tracking-wider text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-[color:var(--ink-dim)]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 accent-[color:var(--orange)]"
          />
          Keep me signed in
        </label>

        <Link
          href="/portal/forgot-password"
          className="text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
        >
          Forgot password?
        </Link>
      </div>

      {linkExpired && !error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm leading-relaxed text-[color:var(--ink-dim)]"
        >
          That link has expired or has already been used. Request a new one
          below.
        </p>
      )}

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
        {busy ? "Signing in..." : "Sign in"}
      </button>

      <p className="mt-6 text-sm leading-relaxed text-[color:var(--ink-dim)]">
        No account yet?{" "}
        <Link
          href="/contact/support"
          className="font-semibold text-[color:var(--orange)] underline underline-offset-4"
        >
          Ask our team to set one up
        </Link>
        .
      </p>
    </form>
  );
}
