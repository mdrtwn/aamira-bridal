"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  dashboardDevCookie,
  isDevelopmentAuthEnabled,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error: string };

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const identity = String(formData.get("identity") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (isDevelopmentAuthEnabled()) {
    if (
      identity !== process.env.DASHBOARD_DEV_USERNAME
      || password !== process.env.DASHBOARD_DEV_PASSWORD
    ) {
      return { error: "Username atau password tidak valid." };
    }
    const cookieStore = await cookies();
    cookieStore.set(dashboardDevCookie, "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/dashboard",
      maxAge: 60 * 60 * 8,
    });
    const requestedPath = String(formData.get("next") ?? "");
    redirect(requestedPath.startsWith("/dashboard/") ? requestedPath : "/dashboard/aamira-basic");
  }

  if (!isSupabaseConfigured()) {
    return { error: "Supabase belum dikonfigurasi. Tambahkan credentials ke .env.local." };
  }

  const email = identity;
  if (!email || !password) return { error: "Email dan password wajib diisi." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Email atau password tidak valid." };

  const requestedPath = String(formData.get("next") ?? "");
  const destination = requestedPath.startsWith("/dashboard/")
    ? requestedPath
    : "/dashboard/aamira-basic";
  redirect(destination);
}
