import type { NextRequest } from "next/server";
import { updateDashboardSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateDashboardSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
