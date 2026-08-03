"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ProductImageGallery.module.css";

export default function ProductImageGallery({
  images,
  productName,
  hoverEffect = false,
  href,
}: Readonly<{
  images: readonly string[];
  productName: string;
  hoverEffect?: boolean;
  href?: string;
}>) {
  const [activeImage, setActiveImage] = useState(0);

  const move = (direction: -1 | 1) => {
    setActiveImage(
      (current) => (current + direction + images.length) % images.length
    );
  };

  return (
    <div className={`${styles.media} ${hoverEffect ? styles.hoverEffect : ""}`}>
      {images.map((image, index) => (
        <Image
          key={`${image}-${index}`}
          src={image}
          alt={`${productName}, view ${index + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw"
          className={`${styles.image} ${
            index === activeImage ? styles.imageActive : ""
          }`}
        />
      ))}

      {href ? (
        <Link
          href={href}
          className={styles.productLink}
          aria-label={`View ${productName}`}
        />
      ) : null}

      <button
        type="button"
        className={`${styles.arrow} ${styles.previous}`}
        aria-label={`Previous image of ${productName}`}
        onClick={() => move(-1)}
      >
        <ArrowLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        aria-label={`Next image of ${productName}`}
        onClick={() => move(1)}
      >
        <ArrowRight aria-hidden="true" />
      </button>

      <div
        className={styles.dots}
        aria-label={`Image ${activeImage + 1} of ${images.length}`}
      >
        {images.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`${styles.dot} ${
              index === activeImage ? styles.dotActive : ""
            }`}
            aria-label={`Show image ${index + 1} of ${productName}`}
            aria-current={index === activeImage ? "true" : undefined}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
