import Image from "next/image";
import Link from "next/link";
import type { Product } from "./catalog";
import { formatAUD } from "./catalog";
import styles from "./Commerce.module.css";

export default function ProductCard({ product }: Readonly<{ product: Product }>) {
  return <article className={styles.productCard}>
    <Link href={`/basic/products/${product.slug}`} className={styles.productMedia}>
      <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 900px) 50vw, 33vw" />
      {product.isNew && <span className={styles.badge}>New</span>}
    </Link>
    <div className={styles.productCopy}><h2><Link href={`/basic/products/${product.slug}`}>{product.name}</Link></h2><p>{formatAUD(product.price)}{product.compareAtPrice && <del>{formatAUD(product.compareAtPrice)}</del>}</p></div>
  </article>;
}
