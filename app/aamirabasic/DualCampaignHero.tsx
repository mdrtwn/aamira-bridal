"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./DualCampaignHero.module.css";

export default function DualCampaignHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (preference.matches) video.pause();
      else void video.play().catch(() => undefined);
    };
    updatePlayback();
    preference.addEventListener("change", updatePlayback);
    return () => preference.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <section className={styles.hero} aria-label="Aamira Basic campaign">
      <video
        ref={videoRef}
        className={styles.video}
        poster="/image/homepage/gambar5.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/video/aamira-basic/hero/hero1.mp4" type="video/mp4" />
      </video>

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.copy}>
        <p className={styles.eyebrow}>Aamira Basic — 2026</p>
        <h1 className={styles.title}>A Study in Ease</h1>
        <p className={styles.description}>
          A modern wardrobe shaped by thoughtful coverage, movement, and quiet confidence.
        </p>
        <Link href="/basic/collections/summer-2026" className={styles.cta}>
          Discover the collection
        </Link>
      </div>
    </section>
  );
}
