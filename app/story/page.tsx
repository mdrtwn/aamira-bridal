"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function StoryPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --ivory:      #F0EBE1;
          --silk:       #F7F4EF;
          --parchment:  #E8E0D0;
          --noir:       #1C1A18;
          --noir2:      #232120;
          --dust:       #9E9488;
          --blush:      #D9C4B5;
          --gold:       #B8963E;
          --champagne:  #D4B483;
          --fog:        #C8BFB4;
        }

        .st-c { font-family: 'Cormorant Garamond', serif; }
        .st-j { font-family: 'Jost', sans-serif; }

        .st-root {
          background: var(--noir);
          min-height: 100vh;
          position: relative;
        }

        /* ── Grain ── */
        .st-grain-overlay {
          position: fixed;
          inset: -200%;
          width: 400%;
          height: 400%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 100;
        }

        /* ── Reveal ── */
        .st-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.2s cubic-bezier(0.16,1,0.3,1),
                      transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .st-reveal.on { opacity: 1; transform: none; }
        .st-d0 { transition-delay: 0.00s; }
        .st-d1 { transition-delay: 0.12s; }
        .st-d2 { transition-delay: 0.24s; }
        .st-d3 { transition-delay: 0.36s; }
        .st-d4 { transition-delay: 0.48s; }
        .st-d5 { transition-delay: 0.60s; }

        /* ── Shimmer ── */
        .st-shimmer {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--blush) 35%,
            var(--gold) 50%,
            var(--blush) 65%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: stShimmer 4.5s ease-in-out infinite;
        }
        @keyframes stShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Nav ── */
        .st-nav {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 64px;
        }
        .st-nav-back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          border: 1px solid rgba(184,150,62,0.4);
          padding: 10px 20px 10px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: background 0.4s ease, border-color 0.4s ease, gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .st-nav-back:hover {
          background: rgba(184,150,62,0.14);
          border-color: var(--gold);
          gap: 16px;
        }
        .st-nav-back-bar {
          width: 16px;
          height: 1px;
          background: var(--gold);
        }
        .st-nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 100;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ivory);
        }

        /* ── Header ── */
        .st-header {
          position: relative;
          z-index: 2;
          padding: 40px 64px 0;
          max-width: 780px;
        }
        .st-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        /* ── Body ── */
        .st-body {
          position: relative;
          z-index: 2;
          padding: 72px 64px 140px;
          max-width: 960px;
        }

        .st-lead {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 200;
          font-size: clamp(22px, 2.4vw, 28px);
          line-height: 1.6;
          color: var(--ivory);
          max-width: 780px;
          margin-bottom: 64px;
        }
        .st-lead em { font-style: italic; color: var(--blush); }

        /* ── Story sections ── */
        .st-section {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 48px;
          padding: 48px 0;
          border-top: 1px solid rgba(240,235,225,0.08);
        }
        .st-section:first-of-type { border-top: none; padding-top: 0; }

        .st-section-label {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          padding-top: 6px;
        }

        .st-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: clamp(24px, 2.6vw, 34px);
          color: var(--ivory);
          line-height: 1.2;
          margin-bottom: 18px;
        }
        .st-section-title em { font-style: italic; color: var(--blush); }

        .st-section-text {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.95;
          color: var(--dust);
          max-width: 620px;
        }
        .st-section-text + .st-section-text { margin-top: 16px; }

        /* ── Values row ── */
        .st-values {
          margin-top: 96px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
        }
        .st-value {
          border-top: 1px solid rgba(240,235,225,0.08);
          padding-top: 24px;
        }
        .st-value-num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 15px;
          color: var(--gold);
          margin-bottom: 14px;
        }
        .st-value-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 200;
          font-size: 21px;
          color: var(--ivory);
          margin-bottom: 10px;
        }
        .st-value-text {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.85;
          color: var(--dust);
        }

        /* ── Quote ── */
        .st-quote-block {
          margin-top: 96px;
          padding: 56px 0;
          border-top: 1px solid rgba(240,235,225,0.1);
          border-bottom: 1px solid rgba(240,235,225,0.1);
          text-align: center;
        }
        .st-quote {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-style: italic;
          font-size: clamp(26px, 3.4vw, 40px);
          line-height: 1.4;
          color: var(--blush);
          max-width: 720px;
          margin: 0 auto 20px;
        }
        .st-quote-attr {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--dust);
        }

        /* ── CTA ── */
        .st-cta {
          margin-top: 96px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .st-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: clamp(24px, 2.8vw, 34px);
          color: var(--ivory);
          line-height: 1.2;
        }
        .st-cta-title em { font-style: italic; color: var(--blush); }

        .st-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 40px;
          border: 1px solid var(--gold);
          background: transparent;
          text-decoration: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: background 0.4s ease, gap 0.4s cubic-bezier(0.16,1,0.3,1);
          white-space: nowrap;
        }
        .st-cta-btn:hover { background: rgba(184,150,62,0.14); gap: 20px; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .st-section { grid-template-columns: 1fr; gap: 16px; }
          .st-values { grid-template-columns: 1fr; gap: 32px; }
          .st-body { padding: 56px 32px 110px; }
          .st-header { padding: 32px 32px 0; }
          .st-nav { padding: 24px 32px; }
        }
        @media (max-width: 600px) {
          .st-nav { padding: 20px 20px; }
          .st-header { padding: 24px 20px 0; }
          .st-body { padding: 48px 20px 90px; }
          .st-cta { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="st-root">
        <div className="st-grain-overlay" />

        {/* ── NAV ── */}
        <nav className="st-nav">
          <Link href="/bridal" className="st-nav-back">
            <span className="st-nav-back-bar" />
            Back to Aamira
          </Link>
          <span className="st-nav-logo">Aamira</span>
        </nav>

        {/* ── HEADER ── */}
        <header className="st-header">
          <div className={`st-eyebrow st-reveal st-d0 ${loaded ? "on" : ""}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="6.5" y="0" width="1" height="14" fill="#B8963E" opacity="0.5" />
              <rect x="0" y="6.5" width="14" height="1" fill="#B8963E" opacity="0.5" />
            </svg>
            <span className="st-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--dust)" }}>
              Our Story
            </span>
          </div>
          <h1
            className={`st-c st-reveal st-d1 ${loaded ? "on" : ""}`}
            style={{
              fontSize: "clamp(34px, 4.6vw, 60px)",
              fontWeight: 100,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--ivory)",
              marginBottom: "20px",
            }}
          >
            Every bride,
            <br />
            <em style={{ fontStyle: "italic", color: "var(--blush)" }}>a story of her own.</em>
          </h1>
          <div className={`st-shimmer st-reveal st-d2 ${loaded ? "on" : ""}`} style={{ maxWidth: "160px", marginBottom: "20px" }} />
        </header>

        {/* ── BODY ── */}
        <div className="st-body">
          <p className={`st-lead st-c st-reveal st-d2 ${loaded ? "on" : ""}`}>
            Aamira Bridal began with a single conviction — that a wedding gown should be more
            than a garment. It should be <em>a keepsake</em>, a quiet witness to the most tender
            day of a bride's life, cut and stitched as though nothing else in the world mattered.
          </p>

          <div className={`st-section st-reveal st-d3 ${loaded ? "on" : ""}`}>
            <span className="st-section-label">01 — The Beginning</span>
            <div>
              <h2 className="st-section-title">
                Born from a love of <em>fine craft.</em>
              </h2>
              <p className="st-section-text">
                Our atelier opened its doors in Sydney with one small collection and one
                promise: every gown would be made by hand, fitted to the bride and to her alone.
                What started as a handful of silhouettes has grown into a house trusted by
                brides across the country, each drawn by the same quiet devotion to detail.
              </p>
              <p className="st-section-text">
                We have never chased trend for its own sake. Instead, we return, season after
                season, to the timeless language of the wedding gown — soft silk, hand-laid
                lace, and a silhouette that moves the way a bride moves on her wedding day.
              </p>
            </div>
          </div>

          <div className={`st-section st-reveal st-d3 ${loaded ? "on" : ""}`}>
            <span className="st-section-label">02 — The Craft</span>
            <div>
              <h2 className="st-section-title">
                Where every gown is <em>made, not bought.</em>
              </h2>
              <p className="st-section-text">
                Each wedding dress that leaves our atelier passes through the hands of our
                seamstresses many times before it ever meets its bride. Fabric is chosen for
                how it falls under candlelight and daylight alike; every seam is considered for
                how it will feel after ten hours of dancing.
              </p>
              <p className="st-section-text">
                Nothing is rushed. A gown may take weeks to complete, because we believe a bride
                deserves nothing less than a dress built entirely around her.
              </p>
            </div>
          </div>

          <div className={`st-section st-reveal st-d4 ${loaded ? "on" : ""}`}>
            <span className="st-section-label">03 — The Bride</span>
            <div>
              <h2 className="st-section-title">
                For the bride who wants to <em>feel like herself.</em>
              </h2>
              <p className="st-section-text">
                We do not believe in a single idea of a bride. She may want a gown of quiet
                minimalism, or one heavy with embroidery and history. Our consultations exist to
                listen first — to understand the wedding she is dreaming of, and to shape a
                gown that feels less like a costume and more like a second skin.
              </p>
            </div>
          </div>

          {/* ── VALUES ── */}
          <div className={`st-values st-reveal st-d4 ${loaded ? "on" : ""}`}>
            <div className="st-value">
              <p className="st-value-num">— I</p>
              <p className="st-value-title">Handmade</p>
              <p className="st-value-text">
                Every gown is cut, sewn, and finished by hand in our Sydney atelier.
              </p>
            </div>
            <div className="st-value">
              <p className="st-value-num">— II</p>
              <p className="st-value-title">Bespoke Fit</p>
              <p className="st-value-text">
                No two brides are alike, and no two gowns leave our studio the same way.
              </p>
            </div>
            <div className="st-value">
              <p className="st-value-num">— III</p>
              <p className="st-value-title">Timeless Design</p>
              <p className="st-value-text">
                We design wedding gowns meant to be treasured long after the wedding day ends.
              </p>
            </div>
          </div>

          {/* ── QUOTE ── */}
          <div className={`st-quote-block st-reveal st-d5 ${loaded ? "on" : ""}`}>
            <p className="st-c st-quote">
              "A wedding gown should feel like the quietest, most certain moment of a bride's life."
            </p>
            <p className="st-quote-attr">— The Aamira Atelier</p>
          </div>

          {/* ── CTA ── */}
          <div className={`st-cta st-reveal st-d5 ${loaded ? "on" : ""}`}>
            <h3 className="st-c st-cta-title">
              Ready to begin
              <br />
              <em>your own story?</em>
            </h3>
            <Link href="/book-appointment" className="st-cta-btn">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}