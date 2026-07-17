"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        :root {
          --ivory:         #F4EFE7;
          --silk:          #FAF7F2;
          --parchment:     #EBE3D6;
          --sand:          #D9C9B4;
          --taupe:         #B7A896;
          --espresso:      #3A322A;
          --espresso-soft: #5C5248;
          --camel:         #A9814F;
          --white-warm:    #FFFDF9;
        }

        .ab-hero {
          display: flex;
          width: 100%;
          min-height: 92vh;
          background: var(--ivory);
        }

        .ab-hero-text {
          flex: 0 0 35%;
          max-width: 35%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5vw;
        }

        .ab-hero-image {
          flex: 0 0 65%;
          max-width: 65%;
          position: relative;
          overflow: hidden;
          background: var(--parchment);
        }

        .ab-hero-img-el {
          position: absolute;
          inset: 0;
          background-image: url('/image/hero/aamira-basic-hero.jpg');
          background-size: cover;
          background-position: center 30%;
          transform: scale(1.04);
          transition: transform 2.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-hero.loaded .ab-hero-img-el { transform: scale(1); }

        .ab-c { font-family: 'Cormorant Garamond', serif; }
        .ab-j { font-family: 'Jost', sans-serif; }

        .ab-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 1.1s cubic-bezier(0.16,1,0.3,1),
                      transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-reveal.on { opacity: 1; transform: none; }
        .ab-d0 { transition-delay: 0.1s; }
        .ab-d1 { transition-delay: 0.3s; }
        .ab-d2 { transition-delay: 0.5s; }
        .ab-d3 { transition-delay: 0.7s; }

        .ab-label {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--camel);
          margin-bottom: 34px;
        }

        .ab-headline {
          font-weight: 300;
          font-size: clamp(32px, 3vw, 48px);
          line-height: 1.15;
          letter-spacing: -0.012em;
          color: var(--espresso);
          margin-bottom: 30px;
          max-width: 420px;
        }

        .ab-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 14px;
          line-height: 1.95;
          letter-spacing: 0.01em;
          color: var(--espresso-soft);
          max-width: 320px;
          margin-bottom: 48px;
        }

        .ab-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          align-self: flex-start;
          padding: 17px 36px;
          border: 1px solid var(--espresso);
          text-decoration: none;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--espresso);
          background: transparent;
          transition: background 0.5s ease, border-color 0.5s ease,
                      color 0.5s ease, letter-spacing 0.5s ease;
        }
        .ab-btn:hover {
          background: rgba(169,129,79,0.1);
          border-color: var(--camel);
          color: var(--camel);
          letter-spacing: 0.28em;
        }

        @media (max-width: 1024px) {
          .ab-hero { flex-direction: column; min-height: auto; }
          .ab-hero-text {
            flex: none;
            max-width: 100%;
            order: 2;
            padding: 56px 7vw 64px;
          }
          .ab-hero-image {
            flex: none;
            max-width: 100%;
            order: 1;
            height: 62vh;
          }
          .ab-headline, .ab-desc { max-width: 100%; }
        }
      `}</style>

      <section className={`ab-hero ${loaded ? "loaded" : ""}`}>
        <div className="ab-hero-text">
          <p className={`ab-j ab-label ab-reveal ab-d0 ${loaded ? "on" : ""}`}>
            Aamira Basic
          </p>
          <h1 className={`ab-c ab-headline ab-reveal ab-d1 ${loaded ? "on" : ""}`}>
            Timeless pieces for every chapter of your day.
          </h1>
          <p className={`ab-j ab-desc ab-reveal ab-d2 ${loaded ? "on" : ""}`}>
            Thoughtfully designed.
            <br />
            Beautifully made.
            <br />
            For the way you live, move, and inspire.
          </p>
          <a href="/collections" className={`ab-j ab-btn ab-reveal ab-d3 ${loaded ? "on" : ""}`}>
            Explore Collection
          </a>
        </div>

        <div className="ab-hero-image">
          <div className="ab-hero-img-el" />
        </div>
      </section>
    </>
  );
}
