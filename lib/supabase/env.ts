// lib/supabase/env.ts
//
// One place to read the Supabase env vars, so a missing key fails with a
// sentence you can act on rather than "Cannot read properties of undefined".

export function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart the dev server.",
    );
  }

  return { url, key };
}
