"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatAUD } from "./catalog";
import styles from "./CheckoutPage.module.css";

const FREE_SHIPPING_THRESHOLD = 250;
const STANDARD_SHIPPING = 15;

export default function CheckoutPage() {
  const cart = useCart();
  const [complete, setComplete] = useState(false);
  const shipping = cart.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const total = cart.subtotal + shipping;

  if (complete) return <main className={styles.complete}><p>Order preview confirmed</p><h1>Thank you.</h1><span>This is a frontend prototype. No payment has been charged and no order was submitted.</span><Link href="/basic/shop" onClick={cart.clear}>Continue shopping</Link></main>;

  return <main className={styles.page}>
    <div className={styles.form}>
      <div className={styles.crumb}><Link href="/basic/shop">Shop</Link><span>/</span><span>Checkout</span></div>
      <h1>Checkout</h1>
      <form onSubmit={(event) => { event.preventDefault(); setComplete(true); }}>
        <section><h2>Contact</h2><label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label className={styles.checkbox}><input name="marketing" type="checkbox" /><span>Email me product updates and private releases</span></label></section>
        <section>
          <h2>Delivery address</h2>
          <label>Country/region<select name="country" defaultValue="Australia"><option>Australia</option></select></label>
          <div className={styles.two}><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div>
          <label>Street address<input name="address" autoComplete="address-line1" required /></label>
          <label>Apartment, suite, etc. (optional)<input name="address2" autoComplete="address-line2" /></label>
          <div className={styles.three}><label>Suburb<input name="city" autoComplete="address-level2" required /></label><label>State<select name="state" autoComplete="address-level1" required defaultValue=""><option value="" disabled>Select</option>{["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"].map((state) => <option key={state}>{state}</option>)}</select></label><label>Postcode<input name="postcode" autoComplete="postal-code" required inputMode="numeric" pattern="[0-9]{4}" maxLength={4} /></label></div>
          <label>Phone<input name="phone" autoComplete="tel" required type="tel" /></label>
        </section>
        <section><h2>Shipping method</h2><label className={styles.radio}><input type="radio" defaultChecked name="shipping" /><span>Standard delivery<small>Estimated 3–7 business days</small></span><strong>{shipping === 0 ? "Free" : formatAUD(shipping)}</strong></label><p className={styles.shippingNote}>{shipping > 0 ? `Add ${formatAUD(FREE_SHIPPING_THRESHOLD - cart.subtotal)} more for free shipping.` : "Your order qualifies for free shipping."}</p></section>
        <section><h2>Payment</h2><div className={styles.notice}>Payment gateway will be connected with the custom backend. No card details are collected in this prototype.</div></section>
        <button disabled={!cart.items.length}>Review prototype order</button>
      </form>
    </div>
    <aside className={styles.summary} aria-label="Order summary">
      <h2>Order summary</h2>
      {cart.items.map((item, index) => <article key={`${item.product.id}-${index}`}><div><Image src={item.product.images[0]} alt="" fill sizes="70px" /><span>{item.quantity}</span></div><p>{item.product.name}<small>{item.color} / {item.size}</small></p><strong>{formatAUD(item.product.price * item.quantity)}</strong></article>)}
      {!cart.items.length && <p className={styles.empty}>Your bag is empty. <Link href="/basic/shop">Go shopping</Link></p>}
      <div className={styles.total}><span>Subtotal</span><strong>{formatAUD(cart.subtotal)}</strong><span>Shipping</span><strong>{shipping === 0 ? "Free" : formatAUD(shipping)}</strong><b>Total AUD</b><b>{formatAUD(total)}</b></div>
    </aside>
  </main>;
}
