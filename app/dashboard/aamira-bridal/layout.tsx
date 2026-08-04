import type { ReactNode } from "react";
import { requireDashboardUser } from "@/lib/supabase/auth";
import DashboardShell from "../_components/DashboardShell";

export const dynamic = "force-dynamic";

export default async function AamiraBridalDashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  const user = await requireDashboardUser();
  return <DashboardShell brand="aamira-bridal" user={user}>{children}</DashboardShell>;
}
