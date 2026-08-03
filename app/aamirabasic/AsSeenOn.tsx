"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./AsSeenOn.module.css";

const items = [
  { type: "image", src: "/image/homepage/gambar3.jpg" },
  { type: "image", src: "/image/homepage/gambar4.jpg" },
  { type: "image", src: "/image/homepage/gambar5.jpg" },
  { type: "image", src: "/image/homepage/gambar2.png" },
  { type: "image", src: "/image/homepage/gambar6.jpg" },
  { type: "image", src: "/image/gown-archive/analise/analise-detail-v1.png" },
  { type: "image", src: "/image/gown-archive/analise/analise-detail-v2.png" },
  { type: "image", src: "/image/gown-archive/analise/analise-detail-v3.png" },
  { type: "image", src: "/image/homepage/gambar1.png" },
  { type: "image", src: "/image/gown-archive/analise/analise-detail-v4.png" },
  { type: "image", src: "/image/homepage/gambar5.jpg" },
  { type: "image", src: "/image/homepage/gambar6.jpg" },
] as const;

export default function AsSeenOn() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const pauseUntilRef = useRef(0);
  const autoPositionRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let previousTime = performance.now();
    autoPositionRef.current = track.scrollLeft;

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;

      if (!dragRef.current.active && time >= pauseUntilRef.current) {
        autoPositionRef.current += elapsed * 0.045;

        const loopPoint = track.scrollWidth / 2;
        if (autoPositionRef.current >= loopPoint) {
          autoPositionRef.current -= loopPoint;
        }

        track.scrollLeft = autoPositionRef.current;
      }

      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const duplicatedItems = [...items, ...items];

  return (
    <section className={styles.section} aria-labelledby="as-seen-on-title">
      <header className={styles.header}>
        <h2 id="as-seen-on-title">As Seen On</h2>
        <p>Tag @aamirabasic to be featured</p>
      </header>

      <div
        className={styles.track}
        ref={trackRef}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          const track = trackRef.current;
          if (!track) return;

          dragRef.current = {
            active: true,
            startX: event.clientX,
            scrollLeft: track.scrollLeft,
          };
          track.setPointerCapture(event.pointerId);
          track.classList.add(styles.dragging);
        }}
        onPointerMove={(event) => {
          const track = trackRef.current;
          if (!track || !dragRef.current.active) return;
          track.scrollLeft =
            dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
        }}
        onPointerUp={(event) => {
          const track = trackRef.current;
          if (!track || !dragRef.current.active) return;

          dragRef.current.active = false;
          autoPositionRef.current = track.scrollLeft;
          pauseUntilRef.current = performance.now() + 900;
          track.releasePointerCapture(event.pointerId);
          track.classList.remove(styles.dragging);
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
          autoPositionRef.current = trackRef.current?.scrollLeft ?? 0;
          pauseUntilRef.current = performance.now() + 900;
          trackRef.current?.classList.remove(styles.dragging);
        }}
        aria-label="As Seen On slideshow. Drag left or right to browse."
      >
        {duplicatedItems.map((item, index) => (
          <article
            className={styles.item}
            key={`${item.type}-${"src" in item ? item.src : "video"}-${index}`}
            aria-hidden={index >= items.length ? "true" : undefined}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={index < items.length ? `Aamira community feature ${index + 1}` : ""}
                fill
                sizes="(max-width: 700px) 72vw, 23vw"
                className={styles.image}
                draggable={false}
              />
            ) : (
              <video
                className={styles.video}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={index < items.length ? `Aamira community video ${index + 1}` : undefined}
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
