import styles from "./MotherDaughterCapsule.module.css";
import ProductImageGallery from "./ProductImageGallery";
import Link from "next/link";
import { products as catalogProducts, formatAUD } from "./catalog";

const localGallery = [
  "/image/gown-archive/analise/analise-detail-v1.png",
  "/image/gown-archive/analise/analise-detail-v2.png",
  "/image/gown-archive/analise/analise-detail-v3.png",
  "/image/gown-archive/analise/analise-detail-v4.png",
] as const;

const products = [
  {
    slug: catalogProducts[7].slug,
    name: "Aya Everyday Set — Navy",
    price: formatAUD(catalogProducts[7].price),
    images: localGallery,
  },
  {
    slug: catalogProducts[1].slug,
    name: "Amara Column Dress — Pearl",
    price: formatAUD(catalogProducts[1].price),
    images: [
      "/image/homepage/gambar4.jpg",
      "/image/homepage/gambar3.jpg",
      "/image/homepage/gambar5.jpg",
      "/image/homepage/gambar6.jpg",
    ],
  },
  {
    slug: catalogProducts[3].slug,
    name: "Mira Relaxed Shirt — White",
    price: formatAUD(catalogProducts[3].price),
    images: [
      "/image/homepage/gambar5.jpg",
      "/image/gown-archive/analise/analise-detail-v2.png",
      "/image/homepage/gambar6.jpg",
      "/image/gown-archive/analise/analise-detail-v4.png",
    ],
  },
  {
    slug: catalogProducts[6].slug,
    name: "Sena Wrap Shirt — Clay",
    price: formatAUD(catalogProducts[6].price),
    images: [
      "/image/homepage/gambar6.jpg",
      "/image/gown-archive/analise/analise-detail-v1.png",
      "/image/homepage/gambar5.jpg",
      "/image/gown-archive/analise/analise-detail-v3.png",
    ],
  },
] as const;

export default function MotherDaughterCapsule() {
  return (
    <section className={styles.section} aria-labelledby="mother-daughter-title">
      <header className={styles.header}>
        <h2 id="mother-daughter-title">Mother Daughter Summer Capsule</h2>
        <p>
          Designed for mothers and daughters to wear together, for style that can
          carry meaning across generations.
        </p>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <article className={styles.product} key={product.name}>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              href={`/basic/products/${product.slug}`}
            />
            <h3><Link href={`/basic/products/${product.slug}`}>{product.name}</Link></h3>
            <p>{product.price}</p>
          </article>
        ))}
      </div>

      <Link href="/basic/collections/mother-daughter" className={styles.link}>
        Discover the capsule
      </Link>
    </section>
  );
}
