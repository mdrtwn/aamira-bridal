"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  dashboardDevCookie,
  isDevelopmentAuthEnabled,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  if (isDevelopmentAuthEnabled()) {
    const cookieStore = await cookies();
    cookieStore.delete(dashboardDevCookie);
    redirect("/dashboard/login");
  }
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/dashboard/login");
}
