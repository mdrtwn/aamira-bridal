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
          --eb-clay:       #9C8163;
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

        .ab-eb-outer {
          background: var(--silk);
          padding: 40px 5vw;
        }

        .ab-eb-section {
          position: relative;
          width: 100%;
          height: clamp(210px, 23vw, 300px);
          display: flex;
          align-items: stretch;
          overflow: hidden;
          border-radius: 6px;
          background: var(--eb-clay);
        }

        .ab-eb-img {
          position: relative;
          flex: 0 0 44%;
          max-width: 44%;
          overflow: hidden;
        }

        .ab-eb-img-el {
          position: absolute;
          inset: -6%;
          background-image: url('/image/editorial/daily-elegance.jpg');
          background-size: cover;
          background-position: center 35%;
          filter: saturate(0.92) brightness(0.95);
          transform: scale(1.04);
          transition: transform 2.6s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-eb-section.on .ab-eb-img-el { transform: scale(1); }

        .ab-eb-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 55%,
            var(--eb-clay) 100%
          );
        }

        .ab-eb-body {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 6% 0 3%;
        }

        .ab-eb-title {
          font-weight: 300;
          font-size: clamp(24px, 2.4vw, 34px);
          line-height: 1.2;
          letter-spacing: -0.005em;
          color: var(--ivory);
          margin-bottom: 14px;
        }

        .ab-eb-sub {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11.5px;
          line-height: 1.6;
          letter-spacing: 0.01em;
          color: rgba(244,239,231,0.72);
          margin-bottom: 22px;
        }

        .ab-eb-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: gap 0.4s ease, color 0.4s ease;
        }
        .ab-eb-btn-arrow {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-eb-btn:hover {
          color: var(--parchment);
          gap: 12px;
        }
        .ab-eb-btn:hover .ab-eb-btn-arrow {
          transform: translateX(3px);
        }

        @media (max-width: 900px) {
          .ab-eb-outer { padding: 24px 6vw; }
          .ab-eb-section {
            flex-direction: column;
            height: auto;
          }
          .ab-eb-img {
            flex: none;
            max-width: 100%;
            width: 100%;
            height: 44vw;
          }
          .ab-eb-fade {
            background: linear-gradient(
              to bottom,
              transparent 55%,
              var(--eb-clay) 100%
            );
          }
          .ab-eb-body {
            padding: 28px 7vw 36px;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="ab-eb-outer">
        <section
          className={`ab-eb-section ${inView ? "on" : ""}`}
          ref={sectionRef}
        >
          <div className="ab-eb-img">
            <div className="ab-eb-img-el" />
            <div className="ab-eb-fade" />
          </div>
          <div className="ab-eb-body">
            <h2 className={`ab-c ab-eb-title ab-eb-reveal ab-eb-d0 ${inView ? "on" : ""}`}>
              Daily elegance,
              <br />
              made for you.
            </h2>
            <p className={`ab-j ab-eb-sub ab-eb-reveal ab-eb-d1 ${inView ? "on" : ""}`}>
              Comfort in every detail.
              <br />
              Confidence in every step.
            </p>
            <a
              href="/collections"
              className={`ab-eb-btn ab-eb-reveal ab-eb-d2 ${inView ? "on" : ""}`}
            >
              Discover Collection
              <span className="ab-eb-btn-arrow">&rarr;</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}