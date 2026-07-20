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
          position: relative;
          width: 100%;
          min-height: 78vh;
          overflow: hidden;
          background: var(--espresso);
        }

        .ab-hero-image {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .ab-hero-img-el {
          position: absolute;
          inset: 0;
          background-image: url('/image/engagement/hero.webp');
          background-size: cover;
          background-position: center 28%;
          transform: scale(1.04);
          transition: transform 2.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-hero.loaded .ab-hero-img-el { transform: scale(1); }

        .ab-hero-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(35,29,23,0.62) 0%,
            rgba(35,29,23,0.42) 22%,
            rgba(35,29,23,0.12) 42%,
            rgba(35,29,23,0.0) 60%
          );
          pointer-events: none;
        }

        .ab-hero-text {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 78vh;
          max-width: 460px;
          padding: 8vh 6vw;
        }

        /* ── ANNOUNCEMENT BAR ── */
        .ab-announce {
          background: var(--espresso);
          text-align: center;
          padding: 9px 20px;
        }
        .ab-announce span {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(244,239,231,0.82);
        }

        /* ── NAV ── */
        .ab-nav {
          background: var(--espresso);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 44px;
          border-top: 1px solid rgba(244,239,231,0.06);
        }
        .ab-nav-logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .ab-nav-logo-main {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: var(--ivory);
        }
        .ab-nav-logo-sub {
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 0.32em;
          color: var(--taupe);
          margin-top: 4px;
          text-align: center;
        }
        .ab-nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
        }
        .ab-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(244,239,231,0.78);
          text-decoration: none;
          position: relative;
          transition: color 0.35s ease;
        }
        .ab-nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 1px;
          background: var(--camel);
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-nav-link:hover { color: var(--ivory); }
        .ab-nav-link:hover::after { width: 100%; }
        .ab-nav-caret {
          width: 7px;
          height: 7px;
          opacity: 0.6;
        }
        .ab-nav-icons {
          display: flex;
          align-items: center;
          gap: 22px;
        }
        .ab-nav-icon-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: rgba(244,239,231,0.85);
          display: flex;
          align-items: center;
          transition: color 0.35s ease, opacity 0.35s ease;
        }
        .ab-nav-icon-btn:hover { color: var(--camel); }
        .ab-nav-cart {
          position: relative;
        }
        .ab-nav-cart-badge {
          position: absolute;
          top: -6px;
          right: -7px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: var(--camel);
          color: var(--espresso);
          font-family: 'Jost', sans-serif;
          font-size: 8.5px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }

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
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(244,239,231,0.9);
          margin-bottom: 26px;
          position: relative;
          padding-bottom: 22px;
        }
        .ab-label::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 32px;
          height: 1px;
          background: var(--camel);
          opacity: 0.9;
        }

        .ab-headline {
          font-weight: 300;
          font-size: clamp(38px, 4vw, 58px);
          line-height: 1.1;
          letter-spacing: -0.018em;
          color: var(--white-warm);
          margin-bottom: 26px;
          max-width: 440px;
          text-shadow: 0 2px 24px rgba(20,16,12,0.25);
        }

        .ab-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 15px;
          line-height: 1.85;
          letter-spacing: 0.005em;
          color: rgba(244,239,231,0.82);
          max-width: 310px;
          margin-bottom: 52px;
        }

        .ab-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          align-self: flex-start;
          padding: 16px 30px;
          border: 1px solid rgba(244,239,231,0.9);
          text-decoration: none;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--white-warm);
          background: rgba(58,50,42,0.35);
          backdrop-filter: blur(2px);
          transition: background 0.5s ease, border-color 0.5s ease,
                      color 0.5s ease, letter-spacing 0.5s ease, gap 0.4s ease;
        }
        .ab-btn:hover {
          background: var(--camel);
          border-color: var(--camel);
          color: var(--espresso);
          letter-spacing: 0.26em;
          gap: 18px;
        }
        .ab-btn-arrow {
          display: inline-block;
          width: 12px;
          height: 8px;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-btn:hover .ab-btn-arrow { transform: translateX(3px); }

        @media (max-width: 1024px) {
          .ab-nav { padding: 18px 24px; }
          .ab-nav-links { display: none; }
          .ab-nav-icons { gap: 16px; }
          .ab-announce span { font-size: 9px; letter-spacing: 0.14em; }

          .ab-hero { min-height: 68vh; }
          .ab-hero-text {
            max-width: 100%;
            min-height: 68vh;
            padding: 0 7vw;
          }
          .ab-hero-img-overlay {
            background: linear-gradient(
              to top,
              rgba(35,29,23,0.72) 0%,
              rgba(35,29,23,0.36) 40%,
              rgba(35,29,23,0.12) 68%,
              rgba(35,29,23,0.0) 100%
            );
          }
          .ab-headline, .ab-desc { max-width: 100%; }
        }
      `}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="ab-announce">
        <span>Free Shipping For Orders Over IDR 750,000</span>
      </div>

      {/* ── NAV ── */}
      <nav className="ab-nav">
        <div className="ab-nav-logo">
          <span className="ab-nav-logo-main">AAMIRA</span>
          <span className="ab-nav-logo-sub">BASIC</span>
        </div>

        <div className="ab-nav-links">
          <a href="/new-in" className="ab-nav-link">New In</a>
          <a href="/basic/clothing" className="ab-nav-link">Clothing</a>
          <a href="/basic/hijab" className="ab-nav-link">
            Hijab
            <svg className="ab-nav-caret" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/basic/Accessories" className="ab-nav-link">Essentials</a>
          <a href="/collections" className="ab-nav-link">
            Collections
            <svg className="ab-nav-caret" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/about" className="ab-nav-link">About</a>
        </div>

        <div className="ab-nav-icons">
          <button className="ab-nav-icon-btn" aria-label="Search">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1"/>
              <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="ab-nav-icon-btn" aria-label="Account">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.5" cy="5.5" r="3" stroke="currentColor" strokeWidth="1"/>
              <path d="M2.5 16C2.5 12.5 5 10 8.5 10C12 10 14.5 12.5 14.5 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="ab-nav-icon-btn ab-nav-cart" aria-label="Cart">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5.5H13L12.3 14C12.2 14.8 11.5 15.5 10.6 15.5H6.4C5.5 15.5 4.8 14.8 4.7 14L4 5.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
              <path d="M6 5V4.2C6 2.7 7.1 1.5 8.5 1.5C9.9 1.5 11 2.7 11 4.2V5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <span className="ab-nav-cart-badge">0</span>
          </button>
        </div>
      </nav>

      <section className={`ab-hero ${loaded ? "loaded" : ""}`}>
        <div className="ab-hero-image">
          <div className="ab-hero-img-el" />
          <div className="ab-hero-img-overlay" />
        </div>

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
            <svg className="ab-btn-arrow" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 4H11M11 4L7.5 0.5M11 4L7.5 7.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}