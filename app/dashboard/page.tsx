import { redirect } from "next/navigation";
import { getDashboardUser } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getDashboardUser();
  redirect(user ? "/dashboard/aamira-basic" : "/dashboard/login");
}
