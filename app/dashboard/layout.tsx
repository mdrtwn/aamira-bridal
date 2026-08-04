import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Aamira Dashboard",
    template: "%s | Aamira Dashboard",
  },
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
