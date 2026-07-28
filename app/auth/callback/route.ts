// app/auth/callback/route.ts
//
// Where Supabase sends people after they click a link in an email (password
// reset, invitation). Two link shapes arrive here depending on the email
// template, so handle both:
//
//   ?code=...                       PKCE, from the client-side flow
//   ?token_hash=...&type=recovery   the server-side flow Supabase recommends
//
// Either way the outcome is the same: a session, then on to `next`.

import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/portal/dashboard";

  // Only ever redirect within this site — an open redirect here would let
  // someone send a Tamarack link that lands on their own page.
  const destination = next.startsWith("/") ? next : "/portal/dashboard";

  const supabase = await createClient();

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) return NextResponse.redirect(`${origin}${destination}`);
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${destination}`);
  }

  return NextResponse.redirect(`${origin}/portal/login?error=link_expired`);
}