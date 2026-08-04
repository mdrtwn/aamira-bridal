export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return Boolean(
    url
      && key
      && url.startsWith("https://")
      && !url.includes("your-project")
      && !key.includes("your-publishable-key"),
  );
}

export const dashboardDevCookie = "aamira-dashboard-dev";

export function isDevelopmentAuthEnabled() {
  return process.env.NODE_ENV === "development"
    && process.env.DASHBOARD_DEV_AUTH === "true"
    && Boolean(process.env.DASHBOARD_DEV_USERNAME)
    && Boolean(process.env.DASHBOARD_DEV_PASSWORD);
}

export function isDashboardAuthConfigured() {
  return isSupabaseConfigured() || isDevelopmentAuthEnabled();
}

export function getSupabaseConfig() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env.local and add the project credentials.",
    );
  }

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
  };
}
