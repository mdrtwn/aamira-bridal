"use client";

import {
  CalendarDays,
  ChevronRight,
  GalleryVerticalEnd,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { DashboardUser } from "@/lib/supabase/auth";
import { signOut } from "../actions";
import styles from "../dashboard.module.css";

type Brand = "aamira-basic" | "aamira-bridal";

const basicNavigation = [
  { label: "Overview", href: "/dashboard/aamira-basic", icon: LayoutDashboard },
  { label: "Products", href: "/dashboard/aamira-basic/products", icon: Package },
  { label: "Orders", href: "/dashboard/aamira-basic/orders", icon: ShoppingBag },
  { label: "Customers", href: "/dashboard/aamira-basic/customers", icon: Users },
] as const;

const bridalNavigation = [
  { label: "Overview", href: "/dashboard/aamira-bridal", icon: LayoutDashboard },
  { label: "Appointments", href: "/dashboard/aamira-bridal/appointments", icon: CalendarDays },
  { label: "Gowns", href: "/dashboard/aamira-bridal/gowns", icon: GalleryVerticalEnd },
  { label: "Customers", href: "/dashboard/aamira-bridal/customers", icon: Users },
] as const;

export default function DashboardShell({
  brand,
  user,
  children,
}: Readonly<{ brand: Brand; user: DashboardUser; children: ReactNode }>) {
  const isBasic = brand === "aamira-basic";
  const navigation = isBasic ? basicNavigation : bridalNavigation;
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <div className={styles.shell}>
      <button
        type="button"
        className={`${styles.mobileBackdrop} ${mobileMenuOpen ? styles.mobileBackdropOpen : ""}`}
        aria-label="Close dashboard navigation"
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.mobileSidebarOpen : ""}`}>
        <button type="button" className={styles.mobileMenuClose} onClick={() => setMobileMenuOpen(false)} aria-label="Close dashboard menu"><X aria-hidden="true" /></button>
        <Link href="/dashboard" className={styles.adminBrand} onClick={() => setMobileMenuOpen(false)}>
          <span>Aamira</span>
          <small>Internal dashboard</small>
        </Link>

        <div className={styles.brandSwitcher}>
          <p>Workspace</p>
          <Link href={isBasic ? "/dashboard/aamira-bridal" : "/dashboard/aamira-basic"} onClick={() => setMobileMenuOpen(false)}>
            <span><small>Currently viewing</small>{isBasic ? "Aamira Basic" : "Aamira Bridal"}</span>
            <ChevronRight aria-hidden="true" />
          </Link>
        </div>

        <nav className={styles.dashboardNav} aria-label={`${isBasic ? "Aamira Basic" : "Aamira Bridal"} dashboard`}>
          {navigation.map(({ label, href, icon: Icon }, index) => {
            const active = index === 0 ? pathname === href : pathname.startsWith(href);
            return (
            <Link href={href} className={active ? styles.activeNav : ""} onClick={() => setMobileMenuOpen(false)} key={label}>
              <Icon aria-hidden="true" />
              {label}
            </Link>
          )})}
        </nav>

        <div className={styles.sidebarBottom}>
          <Link href={`/dashboard/${brand}/settings`} onClick={() => setMobileMenuOpen(false)}><Settings aria-hidden="true" />Settings</Link>
          <form action={signOut}><button type="submit"><LogOut aria-hidden="true" />Sign out</button></form>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.topbarBrand}>
            <button type="button" className={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(true)} aria-label="Open dashboard menu" aria-expanded={mobileMenuOpen}><Menu aria-hidden="true" /></button>
            <span className={styles.mobileBrand}>Aamira</span><p>{isBasic ? "Aamira Basic" : "Aamira Bridal"}</p>
          </div>
          <div className={styles.user}><span>{user.email.slice(0, 1).toUpperCase()}</span><p>{user.email}<small>Team member</small></p></div>
        </header>
        <main className={styles.dashboardMain}>{children}</main>
      </div>
    </div>
  );
}
