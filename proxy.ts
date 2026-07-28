// proxy.ts
//
// Next.js 16 renamed Middleware to Proxy — this file is the old
// `middleware.ts`, so ignore Supabase guides that tell you to create one.
//
// Two jobs: refresh the auth token on every portal request so sessions do not
// expire mid-visit, and keep signed-out visitors out of the portal itself.

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_PORTAL_PATHS = [
  "/portal/login",
  "/portal/forgot-password",
  "/portal/reset-password",
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Without keys there is no session to refresh; let the page render and
  // report the misconfiguration itself.
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // getUser revalidates the token with Supabase. Do not swap it for
  // getSession here — that trusts the cookie without checking it.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPublic = PUBLIC_PORTAL_PATHS.some((p) => path.startsWith(p));

  if (!user && !isPublic) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/portal/login";
    redirectUrl.searchParams.set("next", path);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && path === "/portal/login") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/portal/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/portal/:path*"],
};
