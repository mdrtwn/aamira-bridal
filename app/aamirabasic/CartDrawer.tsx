"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { formatAUD } from "./catalog";
import styles from "./Commerce.module.css";

export default function CartDrawer() {
  const cart = useCart();
  const { isOpen, setOpen } = cart;
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, setOpen]);
  return (
    <>
      <button className={`${styles.drawerBackdrop} ${cart.isOpen ? styles.drawerBackdropOpen : ""}`} aria-label="Close shopping bag" onClick={() => cart.setOpen(false)} />
      <aside className={`${styles.drawer} ${cart.isOpen ? styles.drawerOpen : ""}`} aria-hidden={!cart.isOpen} aria-label="Shopping bag" aria-modal="true" role="dialog">
        <header className={styles.drawerHeader}><div><p>Shopping bag</p><span>{cart.count} items</span></div><button onClick={() => cart.setOpen(false)} aria-label="Close shopping bag"><X /></button></header>
        <div className={styles.drawerBody}>
          {cart.items.length === 0 ? <div className={styles.empty}><h2>Your bag is empty</h2><p>Discover considered pieces made for everyday ease.</p><Link href="/basic/shop" onClick={() => cart.setOpen(false)}>Start shopping</Link></div> : cart.items.map((item, index) => (
            <article className={styles.cartItem} key={`${item.product.id}-${item.size}-${item.color}`}>
              <Link href={`/basic/products/${item.product.slug}`} onClick={() => cart.setOpen(false)} className={styles.cartImage}><Image src={item.product.images[0]} alt="" fill sizes="100px" /></Link>
              <div><Link href={`/basic/products/${item.product.slug}`} onClick={() => cart.setOpen(false)}>{item.product.name}</Link><p>{item.color} / {item.size}</p><strong>{formatAUD(item.product.price)}</strong><div className={styles.quantity}><button onClick={() => cart.updateQuantity(index, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Decrease quantity"><Minus /></button><span aria-live="polite">{item.quantity}</span><button onClick={() => cart.updateQuantity(index, item.quantity + 1)} disabled={item.quantity >= (item.product.variants.find((variant) => variant.size === item.size && variant.color === item.color)?.stock ?? 1)} aria-label="Increase quantity"><Plus /></button></div><button className={styles.remove} onClick={() => cart.removeItem(index)}>Remove</button></div>
            </article>
          ))}
        </div>
        {cart.items.length > 0 && <footer className={styles.drawerFooter}><div><span>Subtotal</span><strong>{formatAUD(cart.subtotal)}</strong></div><p>Shipping is calculated at checkout.</p><Link href="/basic/checkout" onClick={() => cart.setOpen(false)}>Checkout</Link></footer>}
      </aside>
    </>
  );
}
