"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import type { Product } from "./catalog";
import { formatAUD } from "./catalog";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ product }: Readonly<{ product: Product }>) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0]);
  const [error, setError] = useState("");
  const cart = useCart();
  const selectedVariant = product.variants.find(
    (variant) => variant.size === size && variant.color === color
  );
  return <main className={styles.page}>
    <div className={styles.breadcrumb}><Link href="/basic">Home</Link><span>/</span><Link href="/basic/shop">Shop</Link><span>/</span><span>{product.name}</span></div>
    <div className={styles.layout}>
      <div className={styles.gallery}>{product.images.map((image,index) => <div className={styles.image} key={`${image}-${index}`}><Image src={image} alt={`${product.name}, view ${index+1}`} fill priority={index<2} sizes="(max-width:800px) 100vw, 35vw" /></div>)}</div>
      <section className={styles.details}>
        {product.isNew && <p className={styles.kicker}>New arrival</p>}
        <h1>{product.name}</h1><p className={styles.price}>{formatAUD(product.price)} {product.compareAtPrice && <del>{formatAUD(product.compareAtPrice)}</del>}</p>
        <p className={styles.description}>{product.description}</p>
        <fieldset><legend>Color <strong>{color}</strong></legend><div className={styles.options}>{product.colors.map((item) => <button type="button" className={color===item?styles.selected:""} onClick={() => setColor(item)} key={item}>{item}</button>)}</div></fieldset>
        <fieldset><legend>Size {size && <strong>{size}</strong>}<Link href="/basic/size-guide">Size guide</Link></legend><div className={styles.options}>{product.sizes.map((item) => <button type="button" className={size===item?styles.selected:""} onClick={() => {setSize(item);setError("");}} key={item}>{item}</button>)}</div></fieldset>
        {error && <p className={styles.error} role="alert">{error}</p>}
        {selectedVariant ? <p className={styles.variantMeta}>SKU {selectedVariant.sku} · {selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : "Out of stock"}</p> : null}
        <button className={styles.add} disabled={selectedVariant?.stock === 0} onClick={() => { if(!size){setError("Please select a size.");return;} cart.addItem(product,size,color); }}>Add to bag</button>
        <div className={styles.notes}><details open><summary>Product details</summary><p>{product.material}. Designed in Jakarta. Temporary local photography is used during frontend development.</p></details><details><summary>Care</summary><ul>{product.careInstructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ul></details><details><summary>Shipping & returns</summary><p>Shipping fees and delivery estimates are calculated at checkout. Returns are accepted according to the final Aamira return policy.</p></details></div>
      </section>
    </div>
  </main>;
}
