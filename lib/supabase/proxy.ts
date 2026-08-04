import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  dashboardDevCookie,
  getSupabaseConfig,
  isDevelopmentAuthEnabled,
  isSupabaseConfigured,
} from "./config";

export async function updateDashboardSession(request: NextRequest) {
  const isLogin = request.nextUrl.pathname === "/dashboard/login";

  if (isDevelopmentAuthEnabled()) {
    const authenticated = request.cookies.get(dashboardDevCookie)?.value === "authenticated";
    if (!authenticated && !isLogin) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
    if (authenticated && isLogin) {
      return NextResponse.redirect(new URL("/dashboard/aamira-basic", request.url));
    }
    return NextResponse.next();
  }

  if (!isSupabaseConfigured()) {
    if (isLogin) return NextResponse.next();
    return NextResponse.redirect(new URL("/dashboard/login?setup=required", request.url));
  }

  let response = NextResponse.next({ request });
  const { url, publishableKey } = getSupabaseConfig();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([name, value]) => {
          response.headers.set(name, value);
        });
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const authenticated = Boolean(data?.claims?.sub);

  if (!authenticated && !isLogin) {
    const loginUrl = new URL("/dashboard/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (authenticated && isLogin) {
    return NextResponse.redirect(new URL("/dashboard/aamira-basic", request.url));
  }

  return response;
}
