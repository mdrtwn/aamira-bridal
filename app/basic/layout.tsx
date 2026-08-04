import type { Metadata } from "next";
import type { ReactNode } from "react";
import AnnouncementBar from "../aamirabasic/AnnouncementBar";
import BasicFooter from "../aamirabasic/BasicFooter";
import BasicHeader from "../aamirabasic/BasicHeader";
import CartDrawer from "../aamirabasic/CartDrawer";
import { CartProvider } from "../aamirabasic/CartProvider";

export const metadata: Metadata = {
  title: {
    default: "Aamira Basic",
    template: "%s | Aamira Basic",
  },
  description:
    "Aamira Basic ready-to-wear, designed around thoughtful coverage, movement, and quiet confidence.",
  openGraph: {
    siteName: "Aamira Basic",
    type: "website",
    title: "Aamira Basic",
    description:
      "Modern ready-to-wear shaped by considered proportions and everyday ease.",
  },
};

export default function BasicLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <CartProvider>
      <AnnouncementBar />
      <BasicHeader />
      {children}
      <BasicFooter />
      <CartDrawer />
    </CartProvider>
  );
}
