import Image from "next/image";
import Link from "next/link";
import { products } from "./catalog";
import styles from "./ShopTheLooks.module.css";

const categories = [
  { label: "Long Jackets", image: "/image/homepage/gambar3.jpg", href: "/basic/shop/long-jackets" },
  { label: "Dresses", image: "/image/homepage/gambar4.jpg", href: "/basic/shop/dresses-kaftans" },
  { label: "Shirts", image: "/image/homepage/gambar5.jpg", href: "/basic/shop/tops-shirts" },
  { label: "Shop All", image: "/image/homepage/gambar6.jpg", href: "/basic/shop" },
] as const;
const lookImages = ["/image/homepage/gambar3.jpg","/image/homepage/gambar4.jpg","/image/homepage/gambar5.jpg","/image/homepage/gambar6.jpg"];

export default function ShopTheLooks() {
  return (
    <section className={styles.section} id="looks" aria-labelledby="shop-the-looks-title">
      <header className={styles.header}>
        <h2 id="shop-the-looks-title">Shop The Looks</h2>
        <p>Styling ideas designed for ease and confidence</p>
      </header>

      <div className={styles.grid}>
        {lookImages.map((image,index) => (
          <Link
            href={`/basic/products/${products[index].slug}`}
            className={styles.videoFrame}
            aria-label={`Shop look ${index + 1}: ${products[index].name}`}
            key={image}
          >
            <Image src={image} alt={`Aamira styling look ${index+1}`} fill sizes="(max-width:700px) 78vw, 25vw" className={styles.video} />
            <span className={styles.videoPlaceholder}>Look {String(index+1).padStart(2, "0")}</span>
          </Link>
        ))}
      </div>

      <div className={styles.categoryGrid} aria-label="Shop categories">
        {categories.map((category) => (
          <Link href={category.href} className={styles.category} key={category.label}>
            <Image
              src={category.image}
              alt=""
              fill
              sizes="(max-width: 700px) 78vw, 25vw"
              className={styles.categoryImage}
            />
            <span className={styles.categoryLabel}>{category.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
