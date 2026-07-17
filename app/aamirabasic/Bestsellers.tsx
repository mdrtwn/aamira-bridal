"use client";

import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    id: "porcelain-hijab",
    name: "Porcelain Hijab",
    price: "IDR 245,000",
    image: "/image/products/porcelain-hijab.jpg",
    href: "/products/porcelain-hijab",
  },
  {
    id: "sahara-dress",
    name: "Sahara Dress",
    price: "IDR 810,000",
    image: "/image/products/sahara-dress.jpg",
    href: "/products/sahara-dress",
  },
  {
    id: "kashmir-voal",
    name: "Kashmir Voal",
    price: "IDR 260,000",
    image: "/image/products/kashmir-voal.jpg",
    href: "/products/kashmir-voal",
  },
  {
    id: "willow-pleated-set",
    name: "Willow Pleated Set",
    price: "IDR 975,000",
    image: "/image/products/willow-pleated-set.jpg",
    href: "/products/willow-pleated-set",
  },
];

export default function BestSellers() {
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

        .ab-bs-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.4s cubic-bezier(0.16,1,0.3,1),
                      transform 1.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-bs-reveal.on { opacity: 1; transform: none; }
        .ab-bs-d0 { transition-delay: 0.02s; }
        .ab-bs-d1 { transition-delay: 0.14s; }
        .ab-bs-d2 { transition-delay: 0.26s; }
        .ab-bs-d3 { transition-delay: 0.38s; }

        .ab-bs-section {
          background: var(--ivory);
          padding: 100px 6vw 168px;
        }

        .ab-bs-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 72px;
        }

        .ab-bs-kicker-block {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ab-bs-rule {
          width: 44px;
          height: 1px;
          background: rgba(169,129,79,0.45);
        }
        .ab-bs-kicker {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--taupe);
        }

        .ab-bs-viewall {
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
          transition: color 0.5s ease;
        }
        .ab-bs-viewall:hover { color: var(--camel); }

        .ab-bs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3.6vw;
        }

        .ab-bs-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }

        .ab-bs-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--parchment);
          margin-bottom: 24px;
        }

        .ab-bs-img {
          position: absolute;
          inset: -4%;
          background-size: cover;
          background-position: center;
          filter: saturate(0.92) brightness(1);
          transition: transform 1.8s cubic-bezier(0.16,1,0.3,1),
                      filter 1.8s ease;
        }
        .ab-bs-card:hover .ab-bs-img {
          transform: scale(1.025);
          filter: saturate(0.98) brightness(1.02);
        }

        .ab-bs-name {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          margin-bottom: 8px;
        }

        .ab-bs-price {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.02em;
          color: var(--taupe);
        }

        @media (max-width: 1024px) {
          .ab-bs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 9vw 7vw;
          }
        }

        @media (max-width: 900px) {
          .ab-bs-section { padding: 80px 7vw 100px; }
          .ab-bs-header { flex-direction: column; align-items: flex-start; gap: 22px; margin-bottom: 48px; }
        }
      `}</style>

      <section className="ab-bs-section" ref={sectionRef}>
        <div className={`ab-bs-header ab-bs-reveal ab-bs-d0 ${inView ? "on" : ""}`}>
          <div className="ab-bs-kicker-block">
            <div className="ab-bs-rule" />
            <span className="ab-j ab-bs-kicker">Best Sellers</span>
          </div>
          <a href="/collections/best-sellers" className="ab-bs-viewall">
            View All
          </a>
        </div>

        <div className="ab-bs-grid">
          {PRODUCTS.map((product, i) => (
            <a
              key={product.id}
              href={product.href}
              className={`ab-bs-card ab-bs-reveal ${
                i === 0
                  ? "ab-bs-d0"
                  : i === 1
                  ? "ab-bs-d1"
                  : i === 2
                  ? "ab-bs-d2"
                  : "ab-bs-d3"
              } ${inView ? "on" : ""}`}
            >
              <div className="ab-bs-frame">
                <div
                  className="ab-bs-img"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
              </div>
              <p className="ab-j ab-bs-name">{product.name}</p>
              <p className="ab-j ab-bs-price">{product.price}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
