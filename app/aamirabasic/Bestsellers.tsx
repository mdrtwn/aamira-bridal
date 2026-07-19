"use client";

import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    id: "premium-voal",
    name: "Premium Voal",
    variant: "Almond",
    price: "IDR 159.000",
    image: "/image/products/premium-voal.jpg",
    href: "/products/premium-voal",
    badge: false,
    swatches: ["#B7A896", "#8C7A65", "#D9C9B4", "#5C5248", "#EBE3D6"],
  },
  {
    id: "sahara-dress",
    name: "Sahara Dress",
    variant: "Stone",
    price: "IDR 829.000",
    image: "/image/products/sahara-dress.jpg",
    href: "/products/sahara-dress",
    badge: false,
    swatches: ["#B7A896", "#8C7A65", "#D9C9B4", "#5C5248", "#EBE3D6"],
  },
  {
    id: "essential-inner",
    name: "Essential Inner",
    variant: "Nude",
    price: "IDR 69.000",
    image: "/image/products/essential-inner.jpg",
    href: "/products/essential-inner",
    badge: true,
    swatches: ["#EBE3D6", "#D9C9B4"],
  },
  {
    id: "dahlia-printed-voal",
    name: "Dahlia Printed Voal",
    variant: "",
    price: "IDR 179.000",
    image: "/image/products/dahlia-printed-voal.jpg",
    href: "/products/dahlia-printed-voal",
    badge: true,
    swatches: ["#5C5248", "#3A322A", "#8C7A65", "#B7A896", "#D9C9B4", "#EBE3D6"],
  },
  {
    id: "ciput-basic",
    name: "Ciput Basic",
    variant: "Beige",
    price: "IDR 49.000",
    image: "/image/products/ciput-basic.jpg",
    href: "/products/ciput-basic",
    badge: true,
    swatches: ["#B7A896", "#D9C9B4", "#EBE3D6"],
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
        .ab-bs-d1 { transition-delay: 0.1s; }
        .ab-bs-d2 { transition-delay: 0.18s; }
        .ab-bs-d3 { transition-delay: 0.26s; }
        .ab-bs-d4 { transition-delay: 0.34s; }

        .ab-bs-section {
          background: var(--ivory);
          padding: 72px 5vw 88px;
        }

        .ab-bs-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .ab-bs-kicker {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--espresso);
        }

        .ab-bs-viewall {
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
          transition: color 0.5s ease;
        }
        .ab-bs-viewall:hover { color: var(--camel); }

        .ab-bs-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.4vw;
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
          margin-bottom: 14px;
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

        .ab-bs-badge {
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
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 999px;
          white-space: nowrap;
        }

        .ab-bs-name {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          letter-spacing: 0.01em;
          color: var(--espresso);
          margin-bottom: 6px;
        }

        .ab-bs-price {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 0.01em;
          color: var(--espresso-soft);
          margin-bottom: 10px;
        }

        .ab-bs-swatches {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ab-bs-swatch {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 1px solid rgba(58,50,42,0.15);
        }

        @media (max-width: 1024px) {
          .ab-bs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 9vw 7vw;
          }
        }

        @media (max-width: 900px) {
          .ab-bs-section { padding: 56px 6vw 64px; }
          .ab-bs-header { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 32px; }
        }
      `}</style>

      <section className="ab-bs-section" ref={sectionRef}>
        <div className={`ab-bs-header ab-bs-reveal ab-bs-d0 ${inView ? "on" : ""}`}>
          <span className="ab-bs-kicker">Best Sellers</span>
          <a href="/collections/best-sellers" className="ab-bs-viewall">
            View All Best Sellers &rarr;
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
                  : i === 3
                  ? "ab-bs-d3"
                  : "ab-bs-d4"
              } ${inView ? "on" : ""}`}
            >
              <div className="ab-bs-frame">
                {product.badge && (
                  <span className="ab-bs-badge">Best Seller</span>
                )}
                <div
                  className="ab-bs-img"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
              </div>
              <p className="ab-j ab-bs-name">
                {product.variant ? `${product.name} - ${product.variant}` : product.name}
              </p>
              <p className="ab-j ab-bs-price">{product.price}</p>
              <div className="ab-bs-swatches">
                {product.swatches.map((color, idx) => (
                  <span
                    key={idx}
                    className="ab-bs-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}