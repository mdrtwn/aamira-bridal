import type { ReactNode } from "react";
import { requireDashboardUser } from "@/lib/supabase/auth";
import DashboardShell from "../_components/DashboardShell";

export const dynamic = "force-dynamic";

export default async function AamiraBasicDashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  const user = await requireDashboardUser();
  return <DashboardShell brand="aamira-basic" user={user}>{children}</DashboardShell>;
}
