"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "./catalog";
import ProductCard from "./ProductCard";
import styles from "./Commerce.module.css";

export default function CatalogPage({ title, description, source }: Readonly<{ title: string; description: string; source: Product[] }>) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const visible = useMemo(() => {
    const filtered = category === "All" ? source : source.filter((product) => product.category === category);
    return [...filtered].sort((a,b) => sort === "low" ? a.price-b.price : sort === "high" ? b.price-a.price : sort === "new" ? Number(Boolean(b.isNew))-Number(Boolean(a.isNew)) : 0);
  }, [category, sort, source]);
  const categories = ["All", ...Array.from(new Set(source.map((product) => product.category)))];
  return <main className={styles.catalog}>
    <div className={styles.breadcrumb}><Link href="/basic">Home</Link><span>/</span><span>{title}</span></div>
    <header className={styles.catalogTitle}><h1>{title}</h1><p>{description}</p></header>
    <div className={styles.toolbar}><p>{visible.length} pieces</p><div className={styles.toolbarControls}>
      <label><span className="sr-only">Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="new">New In</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></label>
    </div></div>
    <div className={styles.productGrid}>{visible.length ? visible.map((product) => <ProductCard product={product} key={product.id} />) : <p className={styles.emptyResult}>No pieces match this filter.</p>}</div>
  </main>;
}
