import type { ReactNode } from "react";
import AnnouncementBar from "../aamirabasic/AnnouncementBar";
import BasicFooter from "../aamirabasic/BasicFooter";
import BasicHeader from "../aamirabasic/BasicHeader";
import CartDrawer from "../aamirabasic/CartDrawer";
import { CartProvider } from "../aamirabasic/CartProvider";

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
