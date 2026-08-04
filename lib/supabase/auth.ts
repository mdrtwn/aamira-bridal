import "server-only";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  dashboardDevCookie,
  isDevelopmentAuthEnabled,
  isSupabaseConfigured,
} from "./config";
import { createClient } from "./server";

export type DashboardUser = {
  id: string;
  email: string;
};

export async function getDashboardUser(): Promise<DashboardUser | null> {
  if (isDevelopmentAuthEnabled()) {
    const cookieStore = await cookies();
    if (cookieStore.get(dashboardDevCookie)?.value === "authenticated") {
      return {
        id: "local-development-admin",
        email: process.env.DASHBOARD_DEV_USERNAME ?? "admin",
      };
    }
    return null;
  }

  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims?.sub) return null;

  return {
    id: claims.sub,
    email: typeof claims.email === "string" ? claims.email : "Aamira team",
  };
}

export async function requireDashboardUser() {
  const user = await getDashboardUser();
  if (!user) redirect("/dashboard/login");
  return user;
}
