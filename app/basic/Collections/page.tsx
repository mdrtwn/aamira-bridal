"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   COLLECTIONS PAGE — combined from:
   CollectionsHero + Collection2 (Everyday Edit) +
   Collection3 (Soft Layers) + OccasionEditSection
   All images are placeholders — swap url()/gradients later.
   ═══════════════════════════════════════════════════════════ */

/* ─── Occasion Edit feature data + icons ─── */
const features = [
  { title: "Curated With Purpose", desc: "Every piece is intentionally selected and styled.", icon: "hanger" },
  { title: "Timeless & Versatile", desc: "Designed to be worn, loved, and lived in.", icon: "leaf" },
  { title: "Neutral & Refined", desc: "A palette of calm, made to mix and match.", icon: "circle" },
  { title: "Made To Last", desc: "Quality fabrics and thoughtful craftsmanship.", icon: "heart" },
];

function FeatureIcon({ type }: { type: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.2 };
  switch (type) {
    case "hanger":
      return (
        <svg {...common}>
          <path d="M12 3a2 2 0 0 1 2 2c0 .9-.6 1.6-1.4 1.9L12 7v1.2c3.6.4 8 2.6 8 5.3 0 .6-.5 1-1 1H5c-.5 0-1-.4-1-1 0-2.7 4.4-4.9 8-5.3V7l-.6-.1A2 2 0 0 1 10 5a2 2 0 0 1 2-2Z" />
          <path d="M3 19h18" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Z" />
          <path d="M5 19c0-5 3-9 8-11" />
        </svg>
      );
    case "circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.4-9.5-9C1 8 2 4.5 5.5 4c2-.3 3.7.7 4.5 2.2C10.8 4.7 12.5 3.7 14.5 4 18 4.5 19 8 17.5 11c-2.5 4.6-9.5 9-9.5 9Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CollectionsPage() {
  /* ── Hero reveal-on-load state ── */
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── Collection2 (Everyday Edit) in-view state ── */
  const [c2InView, setC2InView] = useState(false);
  const c2Ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setC2InView(true); },
      { threshold: 0.15 }
    );
    if (c2Ref.current) observer.observe(c2Ref.current);
    return () => observer.disconnect();
  }, []);

  /* ── Collection3 (Soft Layers) in-view state ── */
  const [c3InView, setC3InView] = useState(false);
  const c3Ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setC3InView(true); },
      { threshold: 0.15 }
    );
    if (c3Ref.current) observer.observe(c3Ref.current);
    return () => observer.disconnect();
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

        /* ═══ Shared font utility classes ═══ */
        .col-c, .c2-c, .c3-c, .oe-c { font-family: 'Cormorant Garamond', serif; }
        .col-j, .c2-j, .c3-j, .oe-j { font-family: 'Jost', sans-serif; }

        /* ═══════════════════ HERO ═══════════════════ */
        .col-hero { background: var(--silk); }

        .col-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 1.1s cubic-bezier(0.16,1,0.3,1),
                      transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .col-reveal.on { opacity: 1; transform: none; }
        .col-d0 { transition-delay: 0.1s; }
        .col-d1 { transition-delay: 0.3s; }
        .col-d2 { transition-delay: 0.5s; }
        .col-d3 { transition-delay: 0.7s; }

        .col-breadcrumb { margin-bottom: 18px; }
        .col-breadcrumb-link {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--taupe);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .col-breadcrumb-link:hover { color: var(--camel); }
        .col-breadcrumb-sep { color: var(--taupe); margin: 0 8px; font-size: 10px; }
        .col-breadcrumb-current {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--espresso-soft);
        }

        .col-header {
          position: relative;
          overflow: hidden;
          min-height: 46vh;
          background: var(--parchment);
        }
        .col-header-image-el {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, var(--sand) 0%, var(--taupe) 55%, var(--espresso-soft) 100%);
          transform: scale(1.04);
          transition: transform 2.4s cubic-bezier(0.16,1,0.3,1);
        }
        .col-hero.loaded .col-header-image-el { transform: scale(1); }

        .col-header-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(244,239,231,0.28) 0%,
            rgba(244,239,231,0.06) 34%,
            rgba(244,239,231,0.0) 55%
          );
          pointer-events: none;
        }

        .col-header-content {
          position: relative;
          z-index: 2;
          padding: 40px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 46vh;
        }
        .col-header-title {
          font-weight: 300;
          font-size: clamp(38px, 4.2vw, 56px);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 20px;
        }
        .col-header-desc {
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.85;
          color: var(--espresso-soft);
          max-width: 340px;
        }

        .col-quote-band { background: var(--parchment); border-top: 1px solid rgba(58,50,42,0.08); }
        .col-quote-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 56px 44px;
          position: relative;
        }
        .col-quote-inner::before {
          content: '';
          position: absolute;
          left: 50%; top: 56px; bottom: 56px;
          width: 1px;
          background: rgba(58,50,42,0.14);
        }
        .col-quote-text {
          font-weight: 300;
          font-style: italic;
          font-size: clamp(22px, 2.4vw, 30px);
          line-height: 1.35;
          letter-spacing: -0.005em;
          color: var(--espresso);
          max-width: 380px;
          padding-left: 12%;
        }
        .col-quote-desc {
          font-weight: 300;
          font-size: 13px;
          line-height: 1.9;
          color: var(--espresso-soft);
          max-width: 320px;
          padding-top: 4px;
        }

        @media (max-width: 1024px) {
          .col-header { min-height: 58vh; }
          .col-header-content { min-height: 58vh; padding: 32px 24px; }
          .col-header-overlay {
            background: linear-gradient(to top, rgba(244,239,231,0.5) 0%, rgba(244,239,231,0.1) 40%, rgba(244,239,231,0.0) 65%);
          }
        }
        @media (max-width: 900px) {
          .col-quote-inner { padding-left: 24px; padding-right: 24px; grid-template-columns: 1fr; gap: 24px; }
          .col-quote-inner::before { display: none; }
          .col-quote-text { padding-left: 0; }
        }

        /* ═══════════════════ COLLECTION 2 — Everyday Edit ═══════════════════ */
        .c2-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1.1s cubic-bezier(0.16,1,0.3,1),
                      transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .c2-reveal.on { opacity: 1; transform: none; }
        .c2-d0 { transition-delay: 0.05s; }
        .c2-d1 { transition-delay: 0.2s; }
        .c2-d2 { transition-delay: 0.35s; }

        .c2-outer { background: var(--silk); padding: 40px 5vw; }

        .c2-card {
          display: flex;
          width: 100%;
          height: clamp(280px, 30vw, 360px);
          border-radius: 6px;
          overflow: hidden;
          background: var(--parchment);
        }

        .c2-img-main { position: relative; flex: 0 0 42%; max-width: 42%; overflow: hidden; }
        .c2-img-main-el {
          position: absolute;
          inset: -6%;
          background: linear-gradient(150deg, var(--taupe), var(--espresso-soft));
          transform: scale(1.04);
          transition: transform 2.4s cubic-bezier(0.16,1,0.3,1);
        }
        .c2-card.on .c2-img-main-el { transform: scale(1); }

        .c2-text {
          flex: 0 0 28%;
          max-width: 28%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 3vw;
          background: var(--ivory);
        }
        .c2-index { font-weight: 400; font-size: 14px; letter-spacing: 0.06em; color: var(--taupe); margin-bottom: 14px; }
        .c2-title {
          font-weight: 500;
          font-size: clamp(21px, 1.8vw, 27px);
          line-height: 1.2;
          letter-spacing: 0.01em;
          color: var(--espresso);
          margin-bottom: 16px;
        }
        .c2-desc {
          font-weight: 300;
          font-size: 12.5px;
          line-height: 1.6;
          letter-spacing: 0.01em;
          color: var(--espresso-soft);
          margin-bottom: 22px;
        }
        .c2-rule { width: 30px; height: 1px; background: rgba(58,50,42,0.3); margin-bottom: 22px; }
        .c2-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          align-self: flex-start;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--espresso);
          text-decoration: none;
          transition: gap 0.4s ease, color 0.4s ease;
        }
        .c2-link-arrow { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .c2-link:hover { color: var(--camel); gap: 13px; }
        .c2-link:hover .c2-link-arrow { transform: translateX(3px); }

        .c2-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 2px;
        }
        .c2-grid-cell { position: relative; overflow: hidden; }
        .c2-grid-img {
          position: absolute;
          inset: -6%;
          background-size: cover;
          background-position: center;
          transition: transform 1.6s cubic-bezier(0.16,1,0.3,1);
        }
        .c2-grid-cell:hover .c2-grid-img { transform: scale(1.06); }
        .c2-grid-cell-1 .c2-grid-img { background: linear-gradient(150deg, var(--sand), var(--taupe)); }
        .c2-grid-cell-2 .c2-grid-img { background: linear-gradient(150deg, var(--ivory), var(--sand)); }
        .c2-grid-cell-3 .c2-grid-img { background: linear-gradient(150deg, var(--taupe), var(--camel)); }
        .c2-grid-cell-4 .c2-grid-img { background: linear-gradient(150deg, var(--espresso-soft), var(--espresso)); }

        @media (max-width: 900px) {
          .c2-outer { padding: 28px 6vw; }
          .c2-card { flex-direction: column; height: auto; }
          .c2-img-main { flex: none; max-width: 100%; height: 46vw; }
          .c2-text { flex: none; max-width: 100%; padding: 32px 7vw; align-items: flex-start; }
          .c2-grid { flex: none; height: 60vw; }
        }

        /* ═══════════════════ COLLECTION 3 — Soft Layers ═══════════════════ */
        .c3-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1.1s cubic-bezier(0.16,1,0.3,1),
                      transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .c3-reveal.on { opacity: 1; transform: none; }
        .c3-d0 { transition-delay: 0.05s; }
        .c3-d1 { transition-delay: 0.2s; }
        .c3-d2 { transition-delay: 0.35s; }

        .c3-outer { background: var(--silk); padding: 40px 5vw; }
        .c3-row { display: flex; align-items: stretch; width: 100%; height: clamp(160px, 17vw, 210px); gap: 10px; }
        .c3-text { flex: 0 0 36%; max-width: 36%; display: flex; flex-direction: column; justify-content: center; }
        .c3-index { font-weight: 400; font-size: 13px; letter-spacing: 0.06em; color: var(--taupe); margin-bottom: 10px; }
        .c3-title {
          font-weight: 500;
          font-size: clamp(19px, 1.7vw, 25px);
          line-height: 1.2;
          letter-spacing: 0.01em;
          color: var(--espresso);
          margin-bottom: 12px;
        }
        .c3-desc {
          font-weight: 300;
          font-size: 12px;
          line-height: 1.55;
          letter-spacing: 0.01em;
          color: var(--espresso-soft);
          margin-bottom: 16px;
        }
        .c3-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          align-self: flex-start;
          font-size: 9.5px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--espresso);
          text-decoration: none;
          transition: gap 0.4s ease, color 0.4s ease;
        }
        .c3-link-arrow { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .c3-link:hover { color: var(--camel); gap: 13px; }
        .c3-link:hover .c3-link-arrow { transform: translateX(3px); }

        .c3-img-cell { position: relative; flex: 1; overflow: hidden; border-radius: 4px; background: var(--parchment); }
        .c3-img-el {
          position: absolute;
          inset: -6%;
          background-size: cover;
          background-position: center;
          transition: transform 1.6s cubic-bezier(0.16,1,0.3,1);
        }
        .c3-img-cell:hover .c3-img-el { transform: scale(1.05); }
        .c3-img-cell-1 .c3-img-el { background: linear-gradient(150deg, var(--taupe), var(--espresso-soft)); }
        .c3-img-cell-2 .c3-img-el { background: linear-gradient(150deg, var(--sand), var(--camel)); }

        @media (max-width: 900px) {
          .c3-outer { padding: 28px 6vw; }
          .c3-row { flex-direction: column; height: auto; gap: 16px; }
          .c3-text { flex: none; max-width: 100%; }
          .c3-img-cell { height: 46vw; }
        }

        /* ═══════════════════ OCCASION EDIT ═══════════════════ */
        .oe-section { background: var(--silk); padding: 40px 5vw 0; }

        .oe-block {
          display: grid;
          grid-template-columns: 1.05fr 0.85fr 1fr;
          background: var(--parchment);
          min-height: 380px;
          border-radius: 6px;
          overflow: hidden;
        }

        .oe-hero { position: relative; overflow: hidden; }
        .oe-hero-img-el {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, var(--sand) 0%, var(--taupe) 55%, var(--espresso-soft) 100%);
        }
        .oe-hero-img-el::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 55%);
        }

        .oe-text { display: flex; flex-direction: column; justify-content: center; padding: 48px 40px; }
        .oe-index { font-size: 12px; font-weight: 400; letter-spacing: 0.14em; color: var(--camel); margin-bottom: 18px; }
        .oe-title {
          font-weight: 500;
          font-size: clamp(26px, 2.4vw, 34px);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 20px;
        }
        .oe-desc {
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--espresso-soft);
          max-width: 230px;
          margin-bottom: 32px;
        }
        .oe-explore {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--espresso);
          padding: 0 0 4px;
          width: fit-content;
          border-bottom: 1px solid var(--espresso);
          transition: color 0.3s ease, border-color 0.3s ease, gap 0.3s ease;
        }
        .oe-explore:hover { color: var(--camel); border-color: var(--camel); gap: 14px; }
        .oe-explore svg { width: 14px; height: 14px; transition: transform 0.3s ease; }
        .oe-explore:hover svg { transform: translateX(2px); }

        .oe-gallery { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px; }
        .oe-img { position: relative; overflow: hidden; cursor: pointer; }
        .oe-img-el { position: absolute; inset: 0; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .oe-img:hover .oe-img-el { transform: scale(1.05); }
        .oe-img-1 .oe-img-el { background: linear-gradient(150deg, var(--espresso-soft), var(--espresso)); }
        .oe-img-2 .oe-img-el { background: linear-gradient(150deg, var(--sand), var(--taupe)); }
        .oe-img-3 .oe-img-el { background: linear-gradient(150deg, var(--ivory), var(--sand)); }
        .oe-img-4 .oe-img-el { background: linear-gradient(150deg, var(--taupe), var(--camel)); }

        .oe-features { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(58,50,42,0.12); margin-top: 20px; }
        .oe-feature { display: flex; align-items: flex-start; gap: 16px; padding: 28px 20px; border-right: 1px solid rgba(58,50,42,0.1); }
        .oe-feature:last-child { border-right: none; }
        .oe-feature-icon { flex-shrink: 0; width: 22px; height: 22px; color: var(--camel); margin-top: 2px; }
        .oe-feature-title {
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 8px;
        }
        .oe-feature-desc { font-size: 12.5px; font-weight: 300; line-height: 1.6; color: var(--espresso-soft); }

        @media (max-width: 1024px) {
          .oe-block { grid-template-columns: 1fr; min-height: unset; }
          .oe-hero { aspect-ratio: 16/9; }
          .oe-gallery { aspect-ratio: 16/9; }
          .oe-text { padding: 40px 32px; }
          .oe-features { grid-template-columns: 1fr 1fr; }
          .oe-feature:nth-child(2) { border-right: none; }
          .oe-feature:nth-child(3), .oe-feature:nth-child(4) { border-top: 1px solid rgba(58,50,42,0.1); }
        }
        @media (max-width: 640px) {
          .oe-section { padding: 28px 6vw 0; }
          .oe-features { grid-template-columns: 1fr; }
          .oe-feature { border-right: none; border-top: 1px solid rgba(58,50,42,0.1); }
          .oe-feature:first-child { border-top: none; }
        }
      `}</style>

      <main>
        {/* ═══════ HERO ═══════ */}
        <div className={`col-hero ${heroLoaded ? "loaded" : ""}`}>
          <div className="col-header">
            <div className="col-header-image-el" />
            <div className="col-header-overlay" />

            <div className="col-header-content">
              <div className={`col-breadcrumb col-reveal col-d0 ${heroLoaded ? "on" : ""}`}>
                <Link href="/" className="col-breadcrumb-link">Home</Link>
                <span className="col-breadcrumb-sep">/</span>
                <span className="col-breadcrumb-current">Collections</span>
              </div>

              <h1 className={`col-c col-header-title col-reveal col-d1 ${heroLoaded ? "on" : ""}`}>
                Collections
              </h1>
              <p className={`col-j col-header-desc col-reveal col-d2 ${heroLoaded ? "on" : ""}`}>
                Curated wardrobes.
                <br />
                Timeless pieces.
                <br />
                Endless ways to wear.
              </p>
            </div>
          </div>

          <div className="col-quote-band">
            <div className="col-quote-inner">
              <p className={`col-c col-quote-text col-reveal col-d0 ${heroLoaded ? "on" : ""}`}>
                More than pieces, it&rsquo;s a way of living.
              </p>
              <p className={`col-j col-quote-desc col-reveal col-d1 ${heroLoaded ? "on" : ""}`}>
                Each collection is thoughtfully curated to inspire your everyday, your special moments, and everything in between. Discover the stories behind the pieces.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════ 01 — THE EVERYDAY EDIT ═══════ */}
        <div className="c2-outer">
          <div className={`c2-card c2-reveal ${c2InView ? "on" : ""}`} ref={c2Ref}>
            <div className="c2-img-main">
              <div className="c2-img-main-el" />
            </div>

            <div className="c2-text">
              <p className={`c2-c c2-index c2-reveal c2-d0 ${c2InView ? "on" : ""}`}>01</p>
              <h2 className={`c2-c c2-title c2-reveal c2-d0 ${c2InView ? "on" : ""}`}>
                The Everyday Edit
              </h2>
              <p className={`c2-j c2-desc c2-reveal c2-d1 ${c2InView ? "on" : ""}`}>
                Quiet essentials
                <br />
                for everyday dressing.
              </p>
              <div className={`c2-rule c2-reveal c2-d1 ${c2InView ? "on" : ""}`} />
              <a href="/collections/everyday-edit" className={`c2-j c2-link c2-reveal c2-d2 ${c2InView ? "on" : ""}`}>
                Explore Collection
                <span className="c2-link-arrow">&rarr;</span>
              </a>
            </div>

            <div className="c2-grid">
              <div className="c2-grid-cell c2-grid-cell-1"><div className="c2-grid-img" /></div>
              <div className="c2-grid-cell c2-grid-cell-2"><div className="c2-grid-img" /></div>
              <div className="c2-grid-cell c2-grid-cell-3"><div className="c2-grid-img" /></div>
              <div className="c2-grid-cell c2-grid-cell-4"><div className="c2-grid-img" /></div>
            </div>
          </div>
        </div>

        {/* ═══════ 02 — SOFT LAYERS ═══════ */}
        <div className="c3-outer">
          <div className={`c3-row c3-reveal ${c3InView ? "on" : ""}`} ref={c3Ref}>
            <div className="c3-text">
              <p className={`c3-c c3-index c3-reveal c3-d0 ${c3InView ? "on" : ""}`}>02</p>
              <h2 className={`c3-c c3-title c3-reveal c3-d0 ${c3InView ? "on" : ""}`}>
                Soft Layers
              </h2>
              <p className={`c3-j c3-desc c3-reveal c3-d1 ${c3InView ? "on" : ""}`}>
                Layering pieces
                <br />
                for effortless elegance.
              </p>
              <a href="/collections/soft-layers" className={`c3-j c3-link c3-reveal c3-d2 ${c3InView ? "on" : ""}`}>
                Explore Collection
                <span className="c3-link-arrow">&rarr;</span>
              </a>
            </div>

            <div className="c3-img-cell c3-img-cell-1"><div className="c3-img-el" /></div>
            <div className="c3-img-cell c3-img-cell-2"><div className="c3-img-el" /></div>
          </div>
        </div>

        {/* ═══════ 03 — OCCASION EDIT + FEATURE STRIP ═══════ */}
        <section className="oe-section">
          <div className="oe-block">
            <div className="oe-hero">
              <div className="oe-hero-img-el" />
            </div>

            <div className="oe-text">
              <span className="oe-j oe-index">03</span>
              <h2 className="oe-c oe-title">Occasion Edit</h2>
              <p className="oe-j oe-desc">Pieces designed for meaningful celebrations.</p>
              <button className="oe-j oe-explore">
                Explore Collection
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8h12M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="oe-gallery">
              <div className="oe-img oe-img-1"><div className="oe-img-el" /></div>
              <div className="oe-img oe-img-2"><div className="oe-img-el" /></div>
              <div className="oe-img oe-img-3"><div className="oe-img-el" /></div>
              <div className="oe-img oe-img-4"><div className="oe-img-el" /></div>
            </div>
          </div>

          <div className="oe-features">
            {features.map((f) => (
              <div key={f.title} className="oe-feature">
                <span className="oe-feature-icon"><FeatureIcon type={f.icon} /></span>
                <div>
                  <p className="oe-j oe-feature-title">{f.title}</p>
                  <p className="oe-j oe-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}