"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import Footer from "./Footer";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";

const bridalRoutePrefixes = [
  "/bridal",
  "/collections",
  "/story",
  "/book-appointment",
  "/wedding",
  "/engagement",
] as const;

function isBridalRoute(pathname: string) {
  return bridalRoutePrefixes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default function AamiraBridalShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  if (!isBridalRoute(pathname)) {
    return children;
  }

  return (
    <>
      <Navbar hideInitialLogo={pathname === "/bridal"} />
      <MobileNavbar hideInitialLogo={pathname === "/bridal"} />
      {children}
      <Footer />
    </>
  );
}
