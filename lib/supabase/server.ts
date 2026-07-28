// lib/supabase/server.ts
//
// Supabase client for server code (server components, server actions, route
// handlers). Build a new one per request — never share it across requests,
// or one customer can end up reading another's session.

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

export async function createClient() {
  const { url, key } = supabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server components cannot set cookies. Proxy refreshes the session
          // before the render, so this is safe to swallow.
        }
      },
    },
  });
}
