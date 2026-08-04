import type { Metadata } from "next";
import Link from "next/link";
import { isDashboardAuthConfigured, isDevelopmentAuthEnabled } from "@/lib/supabase/config";
import LoginForm from "./LoginForm";
import styles from "../dashboard.module.css";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function DashboardLoginPage({
  searchParams,
}: Readonly<{ searchParams: Promise<{ next?: string }> }>) {
  const { next = "" } = await searchParams;
  const configured = isDashboardAuthConfigured();
  const developmentMode = isDevelopmentAuthEnabled();

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginIntro}>
        <Link href="/" className={styles.loginLogo}>Aamira</Link>
        <div><p>Private workspace</p><h1>One atelier.<br />Two distinct worlds.</h1><span>Internal access for the Aamira team to manage ready-to-wear and bridal operations.</span></div>
        <small>Authorized team members only</small>
      </section>
      <section className={styles.loginPanel}>
        <div className={styles.loginBox}>
          <p>Internal dashboard</p>
          <h2>Welcome back</h2>
          <span>Sign in with your Aamira team account.</span>
          {configured ? <LoginForm nextPath={next} developmentMode={developmentMode} /> : (
            <div className={styles.setupNotice} role="status">
              <strong>Supabase setup required</strong>
              <p>Copy <code>.env.example</code> to <code>.env.local</code>, add the project URL and publishable key, then create the first admin user in Supabase Auth.</p>
            </div>
          )}
          <Link href="/" className={styles.backLink}>Return to website</Link>
        </div>
      </section>
    </main>
  );
}
