"use client";

import { useEffect, useRef, useState } from "react";

export default function EditorialBanner() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
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

        .ab-eb-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1.3s cubic-bezier(0.16,1,0.3,1),
                      transform 1.3s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-eb-reveal.on { opacity: 1; transform: none; }
        .ab-eb-d0 { transition-delay: 0.05s; }
        .ab-eb-d1 { transition-delay: 0.25s; }
        .ab-eb-d2 { transition-delay: 0.45s; }

        .ab-eb-section {
          position: relative;
          width: 100%;
          min-height: 70vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--espresso);
        }

        .ab-eb-img {
          position: absolute;
          inset: -6%;
          background-image: url('/image/editorial/daily-elegance.jpg');
          background-size: cover;
          background-position: center 35%;
          filter: saturate(0.92) brightness(0.9);
          transform: scale(1.04);
          transition: transform 2.6s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-eb-section.on .ab-eb-img { transform: scale(1); }

        .ab-eb-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            rgba(20,15,10,0.62) 0%,
            rgba(20,15,10,0.36) 42%,
            rgba(20,15,10,0.08) 68%,
            transparent 88%
          );
        }

        .ab-eb-body {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 5vw;
        }

        .ab-eb-inner {
          max-width: 460px;
        }

        .ab-eb-title {
          font-weight: 300;
          font-size: clamp(30px, 3.4vw, 48px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--ivory);
          margin-bottom: 26px;
        }

        .ab-eb-sub {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.95;
          letter-spacing: 0.015em;
          color: rgba(244,239,231,0.82);
          margin-bottom: 44px;
        }

        .ab-eb-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 17px 36px;
          border: 1px solid rgba(244,239,231,0.55);
          text-decoration: none;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ivory);
          background: transparent;
          transition: background 0.5s ease, border-color 0.5s ease,
                      letter-spacing 0.5s ease;
        }
        .ab-eb-btn:hover {
          background: rgba(169,129,79,0.22);
          border-color: var(--camel);
          letter-spacing: 0.28em;
        }

        @media (max-width: 900px) {
          .ab-eb-section { min-height: 78vh; }
          .ab-eb-body { padding: 0 7vw; }
          .ab-eb-inner { max-width: 100%; }
          .ab-eb-veil {
            background: linear-gradient(
              to top,
              rgba(20,15,10,0.7) 0%,
              rgba(20,15,10,0.3) 46%,
              transparent 78%
            );
          }
        }
      `}</style>

      <section
        className={`ab-eb-section ${inView ? "on" : ""}`}
        ref={sectionRef}
      >
        <div className="ab-eb-img" />
        <div className="ab-eb-veil" />
        <div className="ab-eb-body">
          <div className="ab-eb-inner">
            <h2 className={`ab-c ab-eb-title ab-eb-reveal ab-eb-d0 ${inView ? "on" : ""}`}>
              Daily elegance, made for you.
            </h2>
            <p className={`ab-j ab-eb-sub ab-eb-reveal ab-eb-d1 ${inView ? "on" : ""}`}>
              Designed for comfort.
              <br />
              Created for confidence.
            </p>
            <a
              href="/collections"
              className={`ab-j ab-eb-btn ab-eb-reveal ab-eb-d2 ${inView ? "on" : ""}`}
            >
              Discover Collection
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
