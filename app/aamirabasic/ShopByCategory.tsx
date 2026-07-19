"use client";

import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  {
    id: "clothing",
    title: "Clothing",
    description: "Effortless pieces for every occasion.",
    href: "/collections/clothing",
    image: "/image/categories/clothing.jpg",
  },
  {
    id: "hijab",
    title: "Hijab",
    description: "Premium fabrics for everyday elegance.",
    href: "/collections/hijab",
    image: "/image/categories/hijab.jpg",
  },
  {
    id: "essentials",
    title: "Essentials",
    description: "The little things that complete your look.",
    href: "/collections/essentials",
    image: "/image/categories/essentials.jpg",
  },
];

export default function ShopByCategory() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
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

        .ab-cat-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 1.2s cubic-bezier(0.16,1,0.3,1),
                      transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-cat-reveal.on { opacity: 1; transform: none; }
        .ab-cat-d0 { transition-delay: 0.05s; }
        .ab-cat-d1 { transition-delay: 0.2s; }
        .ab-cat-d2 { transition-delay: 0.35s; }

        .ab-cat-section {
          background: var(--silk);
          padding: 72px 5vw 88px;
        }

        .ab-cat-kicker-row {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
        }
        .ab-cat-kicker {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--espresso);
        }

        .ab-cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6vw;
        }

        .ab-cat-card {
          display: block;
          text-decoration: none;
        }

        .ab-cat-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2;
          overflow: hidden;
          background: var(--parchment);
        }

        .ab-cat-img {
          position: absolute;
          inset: -6%;
          background-size: cover;
          background-position: center;
          filter: saturate(0.96) brightness(0.98);
          transition: transform 1.4s cubic-bezier(0.16,1,0.3,1),
                      filter 1.4s ease;
        }
        .ab-cat-card:hover .ab-cat-img {
          transform: scale(1.045);
          filter: saturate(1) brightness(1);
        }

        .ab-cat-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(20,15,10,0.5) 0%,
            rgba(20,15,10,0.18) 34%,
            transparent 62%
          );
          pointer-events: none;
        }

        .ab-cat-content {
          position: absolute;
          left: 22px;
          bottom: 22px;
          right: 22px;
        }

        .ab-cat-title {
          font-weight: 500;
          font-size: clamp(17px, 1.3vw, 20px);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ivory);
          margin-bottom: 8px;
        }

        .ab-cat-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.5;
          letter-spacing: 0.01em;
          color: rgba(244,239,231,0.88);
          max-width: 22ch;
          margin-bottom: 12px;
        }

        .ab-cat-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: gap 0.4s ease;
        }
        .ab-cat-link-arrow {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-cat-card:hover .ab-cat-link {
          gap: 11px;
        }
        .ab-cat-card:hover .ab-cat-link-arrow {
          transform: translateX(3px);
        }

        @media (max-width: 900px) {
          .ab-cat-section { padding: 56px 6vw 64px; }
          .ab-cat-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .ab-cat-frame { aspect-ratio: 3 / 2; }
        }
      `}</style>

      <section className="ab-cat-section" ref={sectionRef}>
        <div className={`ab-cat-kicker-row ab-cat-reveal ab-cat-d0 ${inView ? "on" : ""}`}>
          <span className="ab-c ab-cat-kicker">Shop By Category</span>
        </div>

        <div className="ab-cat-grid">
          {CATEGORIES.map((cat, i) => (
            <a
              key={cat.id}
              href={cat.href}
              className={`ab-cat-card ab-cat-reveal ${
                i === 0 ? "ab-cat-d0" : i === 1 ? "ab-cat-d1" : "ab-cat-d2"
              } ${inView ? "on" : ""}`}
            >
              <div className="ab-cat-frame">
                <div
                  className="ab-cat-img"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                <div className="ab-cat-veil" />
                <div className="ab-cat-content">
                  <h3 className="ab-j ab-cat-title">{cat.title}</h3>
                  <p className="ab-j ab-cat-desc">{cat.description}</p>
                  <span className="ab-cat-link">
                    Shop Now
                    <span className="ab-cat-link-arrow">&rarr;</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}