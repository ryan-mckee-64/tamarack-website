// lib/portal/auth.ts
//
// Single seam between the portal UI and the auth provider. Supabase is not
// wired up yet, so both calls report that the backend is not configured.
// When the Supabase project is ready, this is the only file the forms need
// swapped out from under them.
//
/* eslint-disable @typescript-eslint/no-unused-vars -- the credentials are
   accepted now so the call sites are already correct; Supabase will use them. */

export type AuthResult = { ok: true } | { ok: false; error: string };

const NOT_CONFIGURED =
  "Sign in is not switched on yet. Our team can pull up your orders and paperwork in the meantime.";

export async function signIn(
  _email: string,
  _password: string,
): Promise<AuthResult> {
  return { ok: false, error: NOT_CONFIGURED };
}

export async function requestPasswordReset(
  _email: string,
): Promise<AuthResult> {
  return { ok: false, error: NOT_CONFIGURED };
}