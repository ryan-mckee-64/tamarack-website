"use server";

// lib/portal/auth.ts
//
// Server actions behind the portal forms. Everything auth-related runs on the
// server, so the browser never sees anything but the outcome.
//
// A "use server" file may only export async functions — helpers and types stay
// local to this module.

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type AuthResult = { ok: true } | { ok: false; error: string };

// Supabase error strings are aimed at developers. Translate the ones a
// customer can actually hit, and never confirm whether an address exists.
function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "That email and password do not match an account.";
  if (m.includes("email not confirmed"))
    return "This account still needs confirming. Check your email for the invitation link.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Too many attempts. Wait a minute and try again.";
  return "Something went wrong signing you in. Try again, or contact our support team.";
}

async function siteUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  // Fall back to the host the request came in on, so this works in dev and on
  // preview deployments without extra configuration.
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function signIn(
  email: string,
  password: string,
): Promise<AuthResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: friendly(error.message) };

  revalidatePath("/portal", "layout");
  return { ok: true };
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const supabase = await createClient();
  const origin = await siteUrl();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/portal/reset-password`,
  });

  // Report success either way. Telling a stranger which addresses have
  // accounts is a free customer list for them.
  if (error && error.message.toLowerCase().includes("rate limit")) {
    return { ok: false, error: "Too many requests. Wait a minute and try again." };
  }

  return { ok: true };
}

export async function updatePassword(password: string): Promise<AuthResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      error: "Your reset link has expired. Request a new one and try again.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    const m = error.message.toLowerCase();
    if (m.includes("should be at least") || m.includes("password"))
      return { ok: false, error: error.message };
    return { ok: false, error: "Could not update your password. Try again." };
  }

  revalidatePath("/portal", "layout");
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/portal", "layout");
  redirect("/portal/login");
}
