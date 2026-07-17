"use client";

import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  {
    id: "clothing",
    title: "Clothing",
    description: "Fluid silhouettes for the way you move through your day.",
    href: "/collections/clothing",
    image: "/image/categories/clothing.jpg",
  },
  {
    id: "hijab",
    title: "Hijab",
    description: "Soft, considered drapes in fabrics made to last.",
    href: "/collections/hijab",
    image: "/image/categories/hijab.jpg",
  },
  {
    id: "essentials",
    title: "Essentials",
    description: "Quiet foundations, worn beneath everything you do.",
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
          padding: 128px 5vw 136px;
        }

        .ab-cat-kicker-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 72px;
        }
        .ab-cat-rule {
          width: 44px;
          height: 1px;
          background: rgba(169,129,79,0.45);
        }
        .ab-cat-kicker {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--taupe);
        }

        .ab-cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4.4vw;
        }

        .ab-cat-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }

        .ab-cat-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--parchment);
          margin-bottom: 30px;
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
          background: linear-gradient(to top, rgba(20,15,10,0.22) 0%, transparent 42%);
          pointer-events: none;
        }

        .ab-cat-title {
          font-weight: 300;
          font-size: clamp(21px, 1.7vw, 27px);
          letter-spacing: -0.005em;
          color: var(--espresso);
          margin-bottom: 12px;
        }

        .ab-cat-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          line-height: 1.85;
          letter-spacing: 0.01em;
          color: var(--espresso-soft);
          max-width: 30ch;
          margin-bottom: 20px;
        }

        .ab-cat-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--espresso);
          transition: color 0.4s ease, gap 0.4s ease;
        }
        .ab-cat-link-arrow {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-cat-card:hover .ab-cat-link {
          color: var(--camel);
          gap: 12px;
        }
        .ab-cat-card:hover .ab-cat-link-arrow {
          transform: translateX(3px);
        }

        @media (max-width: 900px) {
          .ab-cat-section { padding: 88px 6vw 96px; }
          .ab-cat-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .ab-cat-frame { aspect-ratio: 4 / 5; }
        }
      `}</style>

      <section className="ab-cat-section" ref={sectionRef}>
        <div className={`ab-cat-kicker-row ab-cat-reveal ab-cat-d0 ${inView ? "on" : ""}`}>
          <div className="ab-cat-rule" />
          <span className="ab-j ab-cat-kicker">Shop By Category</span>
          <div className="ab-cat-rule" />
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
              </div>
              <h3 className="ab-c ab-cat-title">{cat.title}</h3>
              <p className="ab-j ab-cat-desc">{cat.description}</p>
              <span className="ab-cat-link">
                Explore
                <span className="ab-cat-link-arrow">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
