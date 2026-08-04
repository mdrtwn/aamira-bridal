"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import styles from "./FeaturedProducts.module.css";
import ProductImageGallery from "./ProductImageGallery";
import Link from "next/link";
import { formatAUD, products as catalogProducts } from "./catalog";

type Product = {
  slug: string;
  name: string;
  price: string;
  images: readonly string[];
};

const imageSets = [
  [
    "/image/gown-archive/analise/analise-detail-v1.png",
    "/image/gown-archive/analise/analise-detail-v2.png",
    "/image/gown-archive/analise/analise-detail-v3.png",
    "/image/gown-archive/analise/analise-detail-v4.png",
  ],
  [
    "/image/homepage/gambar5.jpg",
    "/image/homepage/gambar6.jpg",
    "/image/homepage/gambar4.jpg",
    "/image/homepage/gambar3.jpg",
  ],
  [
    "/image/homepage/gambar6.jpg",
    "/image/gown-archive/analise/analise-detail-v3.png",
    "/image/homepage/gambar5.jpg",
    "/image/gown-archive/analise/analise-detail-v1.png",
  ],
  [
    "/image/homepage/gambar4.jpg",
    "/image/gown-archive/analise/analise-detail-v2.png",
    "/image/homepage/gambar3.jpg",
    "/image/gown-archive/analise/analise-detail-v4.png",
  ],
] as const;

const products: readonly Product[] = [
  ...catalogProducts.slice(0,5).map((product,index) => ({
    slug:product.slug,
    name:product.name,
    price:formatAUD(product.price),
    images:product.slug === "amara-column-dress-pearl" ? product.images : imageSets[index%imageSets.length],
  })),
] as const;

function ProductCard({ product }: Readonly<{ product: Product }>) {
  return (
    <article className={styles.card}>
      <ProductImageGallery
        images={product.images}
        productName={product.name}
        hoverEffect
        href={`/basic/products/${product.slug}`}
      />

      <div className={styles.productInfo}>
        <h3><Link href={`/basic/products/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.price}</p>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });

  const moveCarousel = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * track.clientWidth * 0.82,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section className={styles.section} id="new-in" aria-labelledby="featured-products-title">
      <div className={styles.headingRow}>
        <div>
          <h2 id="featured-products-title">Pieces We Are Loving Right Now</h2>
          <p>A considered selection for everyday elegance.</p>
        </div>

        <div className={styles.carouselControls} aria-label="Product carousel controls">
          <button type="button" aria-label="Previous products" onClick={() => moveCarousel(-1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next products" onClick={() => moveCarousel(1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={styles.track}
        ref={trackRef}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          if ((event.target as HTMLElement).closest("button, a")) return;

          const track = trackRef.current;
          if (!track) return;

          dragState.current = {
            active: true,
            startX: event.clientX,
            scrollLeft: track.scrollLeft,
          };
          track.setPointerCapture(event.pointerId);
          track.classList.add(styles.dragging);
        }}
        onPointerMove={(event) => {
          const track = trackRef.current;
          if (!track || !dragState.current.active) return;

          const distance = event.clientX - dragState.current.startX;
          track.scrollLeft = dragState.current.scrollLeft - distance;
        }}
        onPointerUp={(event) => {
          const track = trackRef.current;
          if (!track || !dragState.current.active) return;

          dragState.current.active = false;
          track.releasePointerCapture(event.pointerId);
          track.classList.remove(styles.dragging);
        }}
        onPointerCancel={() => {
          dragState.current.active = false;
          trackRef.current?.classList.remove(styles.dragging);
        }}
      >
        {products.map((product) => (
          <ProductCard product={product} key={product.name} />
        ))}
      </div>

      <Link href="/basic/shop" className={styles.exploreLink}>
        Explore the edit
      </Link>
    </section>
  );
}
