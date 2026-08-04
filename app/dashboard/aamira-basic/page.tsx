import { products } from "@/app/aamirabasic/catalog";
import styles from "../dashboard.module.css";

export default function AamiraBasicOverview() {
  const lowStock = products.filter((product) => product.stock < 10).length;
  return (
    <>
      <header className={styles.pageHeader}><div><p>Ready-to-wear operations</p><h1>Aamira Basic</h1></div><span>Foundation preview</span></header>
      <section className={styles.metrics} aria-label="Aamira Basic summary">
        <article><p>Products</p><strong>{products.length}</strong><span>Prototype catalog</span></article>
        <article><p>Low stock</p><strong>{lowStock}</strong><span>Requires attention</span></article>
        <article><p>Published</p><strong>{products.filter((product) => product.status === "published").length}</strong><span>Visible pieces</span></article>
      </section>
      <section className={styles.emptyPanel}><p>Next module</p><h2>Commerce operations</h2><span>Products, inventory, orders, and customer management will connect here after the database schema is installed.</span></section>
    </>
  );
}
