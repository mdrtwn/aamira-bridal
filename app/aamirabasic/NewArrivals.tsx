"use client";

import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    id: "layla-dress",
    name: "Layla Dress",
    variant: "Taupe",
    price: "IDR 489.000",
    images: [
      "/image/products/layla-dress-1.jpg",
      "/image/products/layla-dress-2.jpg",
      "/image/products/layla-dress-3.jpg",
      "/image/products/layla-dress-4.jpg",
    ],
    href: "/products/layla-dress",
    swatches: ["#B7A896", "#8C7A65", "#3A322A"],
  },
  {
    id: "serene-voal",
    name: "Serene Voal",
    variant: "Sand",
    price: "IDR 179.000",
    images: [
      "/image/products/serene-voal-1.jpg",
      "/image/products/serene-voal-2.jpg",
      "/image/products/serene-voal-3.jpg",
      "/image/products/serene-voal-4.jpg",
    ],
    href: "/products/serene-voal",
    swatches: ["#D9C9B4", "#EBE3D6"],
  },
  {
    id: "noura-tunic-set",
    name: "Noura Tunic Set",
    variant: "Mocha",
    price: "IDR 559.000",
    images: [
      "/image/products/noura-tunic-1.jpg",
      "/image/products/noura-tunic-2.jpg",
      "/image/products/noura-tunic-3.jpg",
      "/image/products/noura-tunic-4.jpg",
    ],
    href: "/products/noura-tunic-set",
    swatches: ["#8C7A65", "#B7A896", "#3A322A"],
  },
  {
    id: "ayla-outer",
    name: "Ayla Outer",
    variant: "Beige",
    price: "IDR 459.000",
    images: [
      "/image/products/ayla-outer-1.jpg",
      "/image/products/ayla-outer-2.jpg",
      "/image/products/ayla-outer-3.jpg",
      "/image/products/ayla-outer-4.jpg",
    ],
    href: "/products/ayla-outer",
    swatches: ["#EBE3D6", "#D9C9B4"],
  },
  {
    id: "linen-square",
    name: "Linen Square",
    variant: "Dune",
    price: "IDR 189.000",
    images: [
      "/image/products/linen-square-1.jpg",
      "/image/products/linen-square-2.jpg",
      "/image/products/linen-square-3.jpg",
      "/image/products/linen-square-4.jpg",
    ],
    href: "/products/linen-square",
    swatches: ["#D9C9B4", "#B7A896"],
  },
];

function ProductCard({ product, revealClass, inView }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % product.images.length);
    }, 750);
  };

  const stopCycle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setActiveIndex(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <a
      href={product.href}
      className={`ab-na-card ab-na-reveal ${revealClass} ${inView ? "on" : ""}`}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <div className="ab-na-frame">
        <span className="ab-na-badge">New</span>
        {product.images.map((img: string, idx: number) => (
          <div
            key={idx}
            className="ab-na-img"
            style={{
              backgroundImage: `url('${img}')`,
              opacity: idx === activeIndex ? 1 : 0,
            }}
          />
        ))}
      </div>
      <p className="ab-j ab-na-name">
        {product.name} - {product.variant}
      </p>
      <p className="ab-j ab-na-price">{product.price}</p>
      <div className="ab-na-swatches">
        {product.swatches.map((color: string, idx: number) => (
          <span
            key={idx}
            className="ab-na-swatch"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </a>
  );
}

export default function NewArrivals() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        :root {
          --ivory:         #F4EFE7;
          --silk:          #FAF7F2;
          --parchment:     #EBE3D6;
          --sand:          #D9C9B4;
          --taupe:         #B7A896;
          --espresso:      #3A322A;
          --espresso-soft: #5C5248;
          --camel:         #A9814F;
        }

        .ab-c { font-family: 'Cormorant Garamond', serif; }
        .ab-j { font-family: 'Jost', sans-serif; }

        .ab-na-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.1s cubic-bezier(0.16,1,0.3,1),
                      transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-na-reveal.on { opacity: 1; transform: none; }
        .ab-na-d0 { transition-delay: 0.02s; }
        .ab-na-d1 { transition-delay: 0.12s; }
        .ab-na-d2 { transition-delay: 0.22s; }
        .ab-na-d3 { transition-delay: 0.32s; }
        .ab-na-d4 { transition-delay: 0.42s; }

        .ab-na-section {
          background: var(--ivory);
          padding: 72px 5vw 80px;
        }

        .ab-na-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .ab-na-kicker {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--espresso);
        }

        .ab-na-viewall {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.4s ease;
        }
        .ab-na-viewall:hover { color: var(--camel); }

        .ab-na-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.4vw;
        }

        .ab-na-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }

        .ab-na-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--parchment);
          margin-bottom: 14px;
        }

        .ab-na-img {
          position: absolute;
          inset: -6%;
          background-size: cover;
          background-position: center;
          filter: saturate(0.95) brightness(0.99);
          transition: opacity 0.6s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-na-card:hover .ab-na-img {
          transform: scale(1.045);
        }

        .ab-na-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          padding: 5px 12px;
          background: rgba(58,50,42,0.82);
          color: var(--ivory);
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 999px;
        }

        .ab-na-name {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          letter-spacing: 0.01em;
          color: var(--espresso);
          margin-bottom: 6px;
        }

        .ab-na-price {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 0.01em;
          color: var(--espresso-soft);
          margin-bottom: 10px;
        }

        .ab-na-swatches {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ab-na-swatch {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 1px solid rgba(58,50,42,0.15);
        }

        @media (max-width: 1024px) {
          .ab-na-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8vw 6vw;
          }
        }

        @media (max-width: 900px) {
          .ab-na-section { padding: 56px 6vw 64px; }
          .ab-na-header { align-items: center; }
        }
      `}</style>

      <section className="ab-na-section" ref={sectionRef}>
        <div className={`ab-na-header ab-na-reveal ab-na-d0 ${inView ? "on" : ""}`}>
          <span className="ab-na-kicker">New Arrivals</span>
          <a href="/collections/new-arrivals" className="ab-na-viewall">
            View All New In &rarr;
          </a>
        </div>

        <div className="ab-na-grid">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              inView={inView}
              revealClass={
                i === 0
                  ? "ab-na-d0"
                  : i === 1
                  ? "ab-na-d1"
                  : i === 2
                  ? "ab-na-d2"
                  : i === 3
                  ? "ab-na-d3"
                  : "ab-na-d4"
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}