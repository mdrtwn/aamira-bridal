"use client";

import Link from "next/link";
import { useState } from "react";
import AamiraBasicMark from "./AamiraBasicMark";
import styles from "./BasicFooter.module.css";

const shopLinks = [
  {label:"View All",href:"/basic/shop"},
  {label:"New In",href:"/basic/new-in"},
  {label:"Long Jackets",href:"/basic/shop/long-jackets"},
  {label:"Dresses & Kaftans",href:"/basic/shop/dresses-kaftans"},
  {label:"Tops & Shirts",href:"/basic/shop/tops-shirts"},
  {label:"Collections",href:"/basic/collections"},
] as const;

const helpLinks = [
  {label:"Contact",href:"/basic/contact"},
  {label:"Shipping & Returns",href:"/basic/shipping-returns"},
  {label:"Size Guide",href:"/basic/size-guide"},
  {label:"My Account",href:"/basic/account"},
  {label:"Privacy Policy",href:"/basic/privacy"},
  {label:"Terms & Conditions",href:"/basic/terms"},
] as const;

const socialLinks = [{label:"Instagram",href:"https://instagram.com"},{label:"TikTok",href:"https://tiktok.com"},{label:"Pinterest",href:"https://pinterest.com"}] as const;

export default function BasicFooter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.brand}>
          <Link href="/basic" className={styles.wordmark}>Aamira</Link>
          <p>Aamira Basic</p>
          <p>Jakarta, Indonesia</p>

          <AamiraBasicMark className={styles.mark} />

          <div className={styles.newsletter}>
            <h2>Newsletter</h2>
            <p>Join our newsletter for exclusive updates and offers.</p>
            {subscribed ? (
              <p className={styles.confirmation}>Thank you for subscribing.</p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
              >
                <label htmlFor="footer-email" className={styles.srOnly}>Email address</label>
                <input id="footer-email" type="email" placeholder="Email address" required />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <nav className={styles.columns} aria-label="Footer navigation">
          <div className={styles.column}>
            <h2>Shop</h2>
            {shopLinks.map((link) => (
              <Link href={link.href} key={link.label}>{link.label}</Link>
            ))}
          </div>
          <div className={styles.column}>
            <h2>Help</h2>
            {helpLinks.map((link) => (
              <Link href={link.href} key={link.label}>{link.label}</Link>
            ))}
          </div>
          <div className={styles.column}>
            <h2>Join Us</h2>
            {socialLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label}</a>
            ))}
          </div>
        </nav>
      </div>

      <div className={styles.legal}>
        <p>© {new Date().getFullYear()} Aamira. All rights reserved.</p>
        <div className={styles.payments} aria-label="Accepted payment methods">
          {["AMEX", "Pay", "MC", "VISA"].map((payment) => (
            <span key={payment}>{payment}</span>
          ))}
        </div>
      </div>

      <div className={styles.switcher}>
        <Link href="/bridal">Go to Aamira Bridal</Link>
      </div>
    </footer>
  );
}
