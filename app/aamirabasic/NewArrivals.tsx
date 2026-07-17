"use client";

import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    id: "noura-tunic",
    name: "Noura Tunic",
    price: "IDR 685,000",
    image: "/image/products/noura-tunic.jpg",
    href: "/products/noura-tunic",
  },
  {
    id: "ayla-dress",
    name: "Ayla Dress",
    price: "IDR 890,000",
    image: "/image/products/ayla-dress.jpg",
    href: "/products/ayla-dress",
  },
  {
    id: "sahara-set",
    name: "Sahara Set",
    price: "IDR 1,150,000",
    image: "/image/products/sahara-set.jpg",
    href: "/products/sahara-set",
  },
  {
    id: "lina-outer",
    name: "Lina Outer",
    price: "IDR 940,000",
    image: "/image/products/lina-outer.jpg",
    href: "/products/lina-outer",
  },
  {
    id: "serene-voal",
    name: "Serene Voal",
    price: "IDR 275,000",
    image: "/image/products/serene-voal.jpg",
    href: "/products/serene-voal",
  },
];

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
          padding: 128px 5vw 96px;
        }

        .ab-na-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 64px;
        }

        .ab-na-kicker-block {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ab-na-rule {
          width: 44px;
          height: 1px;
          background: rgba(169,129,79,0.45);
        }
        .ab-na-kicker {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--taupe);
        }

        .ab-na-viewall {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.24em;
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
          gap: 2.8vw;
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
          margin-bottom: 20px;
        }

        .ab-na-img {
          position: absolute;
          inset: -6%;
          background-size: cover;
          background-position: center;
          filter: saturate(0.95) brightness(0.99);
          transition: transform 1.4s cubic-bezier(0.16,1,0.3,1),
                      filter 1.4s ease;
        }
        .ab-na-card:hover .ab-na-img {
          transform: scale(1.045);
          filter: saturate(1) brightness(1);
        }

        .ab-na-name {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          margin-bottom: 8px;
        }

        .ab-na-price {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.02em;
          color: var(--taupe);
        }

        @media (max-width: 1024px) {
          .ab-na-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8vw 6vw;
          }
        }

        @media (max-width: 900px) {
          .ab-na-section { padding: 88px 6vw 72px; }
          .ab-na-header { flex-direction: column; align-items: flex-start; gap: 20px; }
        }
      `}</style>

      <section className="ab-na-section" ref={sectionRef}>
        <div className={`ab-na-header ab-na-reveal ab-na-d0 ${inView ? "on" : ""}`}>
          <div className="ab-na-kicker-block">
            <div className="ab-na-rule" />
            <span className="ab-j ab-na-kicker">New Arrivals</span>
          </div>
          <a href="/collections/new-arrivals" className="ab-na-viewall">
            View All
          </a>
        </div>

        <div className="ab-na-grid">
          {PRODUCTS.map((product, i) => (
            <a
              key={product.id}
              href={product.href}
              className={`ab-na-card ab-na-reveal ${
                i === 0
                  ? "ab-na-d0"
                  : i === 1
                  ? "ab-na-d1"
                  : i === 2
                  ? "ab-na-d2"
                  : i === 3
                  ? "ab-na-d3"
                  : "ab-na-d4"
              } ${inView ? "on" : ""}`}
            >
              <div className="ab-na-frame">
                <div
                  className="ab-na-img"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
              </div>
              <p className="ab-j ab-na-name">{product.name}</p>
              <p className="ab-j ab-na-price">{product.price}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
