"use client";

import {
  CalendarDays,
  ChevronRight,
  GalleryVerticalEnd,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/dashboard" className={styles.adminBrand}>
          <span>Aamira</span>
          <small>Internal dashboard</small>
        </Link>

        <div className={styles.brandSwitcher}>
          <p>Workspace</p>
          <Link href={isBasic ? "/dashboard/aamira-bridal" : "/dashboard/aamira-basic"}>
            <span><small>Currently viewing</small>{isBasic ? "Aamira Basic" : "Aamira Bridal"}</span>
            <ChevronRight aria-hidden="true" />
          </Link>
        </div>

        <nav className={styles.dashboardNav} aria-label={`${isBasic ? "Aamira Basic" : "Aamira Bridal"} dashboard`}>
          {navigation.map(({ label, href, icon: Icon }, index) => {
            const active = index === 0 ? pathname === href : pathname.startsWith(href);
            return (
            <Link href={href} className={active ? styles.activeNav : ""} key={label}>
              <Icon aria-hidden="true" />
              {label}
            </Link>
          )})}
        </nav>

        <div className={styles.sidebarBottom}>
          <Link href={`/dashboard/${brand}/settings`}><Settings aria-hidden="true" />Settings</Link>
          <form action={signOut}><button type="submit"><LogOut aria-hidden="true" />Sign out</button></form>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div><span className={styles.mobileBrand}>Aamira</span><p>{isBasic ? "Aamira Basic" : "Aamira Bridal"}</p></div>
          <div className={styles.user}><span>{user.email.slice(0, 1).toUpperCase()}</span><p>{user.email}<small>Team member</small></p></div>
        </header>
        <main className={styles.dashboardMain}>{children}</main>
      </div>
    </div>
  );
}
