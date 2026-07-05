"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Intersection helper ─────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Feature data ────────────────────────────────────────── */
const features = [
  {
    number: "01",
    title: "Silhouettes",
    body: "Classic ball gowns, refined A-lines, and modern sculpted shapes — designed to flatter every bride.",
    icon: (
      <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1C11 1 5 7 5 14c0 4 2.5 7 6 9v7" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M11 23c3.5-2 6-5 6-9 0-7-6-13-6-13" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M7 31h8" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Handcrafted Details",
    body: "Delicate embroidery, hand-beaded accents, and couture finishing in every stitch.",
    icon: (
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c3 3 5 5 5 9a5 5 0 11-10 0c0-4 2-6 5-9z" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round"/>
        <path d="M12 15v11M9 22l3 4 3-4" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Bridal Styling",
    body: "Personal guidance to help you find the gown that feels uniquely yours, inside and out.",
    icon: (
      <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1a4 4 0 014 4c0 2.2-1.8 4-4 4s-4-1.8-4-4a4 4 0 014-4z" stroke="currentColor" strokeWidth="0.7"/>
        <path d="M3 27c0-7 2.5-12 7-12s7 5 7 12" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M1 29h18" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Made For The Moment",
    body: "Designed to move beautifully from the aisle to the celebration, creating memories that last forever.",
    icon: (
      <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c2 3 3 5 3 7.5S13.5 14 12 14s-3-2-3-4.5S10 5 12 2z" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round"/>
        <path d="M12 14v10" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M6 24h12" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
        <path d="M4 9c-1.5 2-1.5 4.5 0 6M20 9c1.5 2 1.5 4.5 0 6" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────── */

export default function WeddingPage() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const highlights = useInView(0.08);
  const editorial  = useInView(0.1);
  const cta        = useInView(0.1);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── STYLES ─────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --ivory:      #F0EBE1;
          --silk-white: #F7F4EF;
          --parchment:  #E8E0D0;
          --noir:       #1C1A18;
          --noir2:      #232120;
          --dust:       #9E9488;
          --blush:      #D9C4B5;
          --gold:       #B8963E;
          --champagne:  #D4B483;
          --warm-fog:   #C8BFB4;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--noir);
          color: var(--ivory);
          font-family: 'Jost', sans-serif;
          overflow-x: hidden;
        }

        /* ── Grain ───────────────────────────────────────────── */
        .wg-grain { pointer-events: none; }
        .wg-grain::after {
          content: '';
          position: fixed;
          inset: -200%;
          width: 400%;
          height: 400%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
          animation: wgGrain 8s steps(10) infinite;
        }
        @keyframes wgGrain {
          0%,100% { transform: translate(0,0); }
          10%  { transform: translate(-2%,-3%); }
          20%  { transform: translate(3%,2%); }
          30%  { transform: translate(-1%,4%); }
          40%  { transform: translate(4%,-1%); }
          50%  { transform: translate(-3%,3%); }
          60%  { transform: translate(2%,-4%); }
          70%  { transform: translate(-4%,1%); }
          80%  { transform: translate(1%,-2%); }
          90%  { transform: translate(-2%,4%); }
        }

        /* ── Fade-in ─────────────────────────────────────────── */
        .fade-in {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 1.2s cubic-bezier(0.16,1,0.3,1),
                      transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
        .delay-200  { transition-delay: 0.2s; }
        .delay-400  { transition-delay: 0.4s; }
        .delay-600  { transition-delay: 0.6s; }
        .delay-800  { transition-delay: 0.8s; }
        .delay-1000 { transition-delay: 1.0s; }

        /* Scroll-triggered reveal */
        .wg-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.3s cubic-bezier(0.16,1,0.3,1),
                      transform 1.3s cubic-bezier(0.16,1,0.3,1);
        }
        .wg-reveal.on { opacity: 1; transform: none; }
        .wg-d0 { transition-delay: 0.00s; }
        .wg-d1 { transition-delay: 0.14s; }
        .wg-d2 { transition-delay: 0.28s; }
        .wg-d3 { transition-delay: 0.44s; }
        .wg-d4 { transition-delay: 0.60s; }
        .wg-d5 { transition-delay: 0.76s; }

        /* ── Nav link ─────────────────────────────────────────── */
        .nav-link {
          position: relative;
          letter-spacing: 0.12em;
          transition: color 0.4s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover { color: var(--ivory) !important; }
        .nav-link:hover::after { width: 100%; }

        .nav-sep {
          color: var(--dust);
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          opacity: 0.5;
        }

        /* ── Shimmer ──────────────────────────────────────────── */
        .shimmer-line {
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--blush) 40%,
            var(--gold)  50%,
            var(--blush) 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── CTA arrow link ───────────────────────────────────── */
        .cta-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cta-link::before {
          content: '';
          display: inline-block;
          width: 32px; height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cta-link:hover { gap: 20px; }
        .cta-link:hover::before { width: 48px; }

        /* ── Hero split layout ────────────────────────────────── */
        .wg-hero {
          position: relative;
          min-height: 100vh;
          background: var(--noir);
          overflow: hidden;
        }
        .wg-hero-image {
          position: absolute;
          top: -6%;
          right: -8%;
          bottom: -6%;
          left: 22%;
          overflow: hidden;
          background: var(--noir2);
          z-index: 1;
        }
        .wg-hero-image-inner {
          position: absolute;
          inset: -8%;
          background-size: cover;
          background-position: center 30%;
        }
        .wg-hero-image-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(28,26,24,0.95) 0%,
            rgba(28,26,24,0.55) 16%,
            rgba(28,26,24,0.0) 40%,
            rgba(28,26,24,0.0) 78%,
            rgba(28,26,24,0.45) 100%
          );
          pointer-events: none;
        }
        .wg-hero-content {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 0 0 64px;
          max-width: 480px;
        }

        /* ── Highlights (crossed grid, no card boxes) ─────────── */
        .wg-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .wg-feature {
          padding: 40px 48px 44px 0;
        }
        .wg-feature:nth-child(odd) {
          border-right: 1px solid rgba(240,235,225,0.08);
          padding-right: 48px;
        }
        .wg-feature:nth-child(1),
        .wg-feature:nth-child(2) {
          border-bottom: 1px solid rgba(240,235,225,0.08);
          padding-bottom: 44px;
        }
        .wg-feature:nth-child(3),
        .wg-feature:nth-child(4) {
          padding-top: 44px;
        }
        .wg-feature:nth-child(even) {
          padding-left: 48px;
        }
        .wg-feature-icon {
          color: var(--gold);
          opacity: 0.85;
          margin-bottom: 22px;
        }
        .wg-feature-title {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--champagne);
          margin-bottom: 14px;
        }
        .wg-feature-body {
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.85;
          color: var(--dust);
          max-width: 340px;
        }

        /* ── Editorial (layered, matches hero composition) ────── */
        .wg-editorial {
          position: relative;
          min-height: 92vh;
          background: var(--noir);
          overflow: hidden;
        }
        .wg-editorial-image {
          position: absolute;
          top: -6%;
          left: -8%;
          bottom: -6%;
          right: 30%;
          overflow: hidden;
          background: var(--noir2);
          z-index: 1;
        }
        .wg-editorial-image-inner {
          position: absolute;
          inset: -8%;
          background-size: cover;
          background-position: center 20%;
        }
        .wg-editorial-image-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to left,
            rgba(28,26,24,0.95) 0%,
            rgba(28,26,24,0.55) 16%,
            rgba(28,26,24,0.0) 40%,
            rgba(28,26,24,0.0) 78%,
            rgba(28,26,24,0.45) 100%
          );
          pointer-events: none;
        }
        .wg-editorial-content {
          position: relative;
          z-index: 2;
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          text-align: right;
          padding: 0 64px 0 0;
          margin-left: auto;
          max-width: 480px;
        }
        /* ── Section decorators ───────────────────────────────── */
        .wg-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .wg-rule {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,150,62,0.5));
        }

        /* ── Responsive ───────────────────────────────────────── */
        @media (max-width: 900px) {
          .wg-hero-image { top: 38%; right: -10%; bottom: -8%; left: -10%; }
          .wg-hero-content { max-width: 100%; padding: 140px 28px 40px; text-align: center; align-items: center; min-height: auto; }
          .wg-hero-image-fade {
            background: linear-gradient(
              to top,
              rgba(28,26,24,0.95) 0%,
              rgba(28,26,24,0.4) 22%,
              rgba(28,26,24,0.0) 45%
            );
          }
          .wg-editorial { min-height: auto; }
          .wg-editorial-image { top: -8%; left: -10%; right: -10%; bottom: 38%; }
          .wg-editorial-content { min-height: auto; max-width: 100%; align-items: center; text-align: center; margin-left: 0; padding: 40px 28px 140px; }
          .wg-editorial-image-fade {
            background: linear-gradient(
              to bottom,
              rgba(28,26,24,0.95) 0%,
              rgba(28,26,24,0.4) 22%,
              rgba(28,26,24,0.0) 45%
            );
          }
          .wg-highlights-grid { grid-template-columns: 1fr !important; }
          .wg-feature,
          .wg-feature:nth-child(odd),
          .wg-feature:nth-child(even) {
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .wg-feature:not(:last-child) {
            border-bottom: 1px solid rgba(240,235,225,0.08) !important;
            padding-bottom: 32px !important;
          }
          .wg-feature:nth-child(n+2) { padding-top: 32px !important; }
        }
      `}</style>

      {/* Grain overlay */}
      <div
        className="wg-grain"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }}
      />

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="wg-hero">

        {/* ── NAV ── */}
        <nav
          className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8 fade-in ${loaded ? "visible" : ""}`}
        >
          {/* Logo */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 1.6vw, 20px)",
              fontWeight: 300,
              color: "var(--champagne)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Aamira
          </span>

          {/* Centre nav */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ gap: "14px" }}
          >
            <a
              href="#"
              className="nav-link"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10.5px",
                fontWeight: 300,
                textTransform: "uppercase",
                color: "var(--warm-fog)",
                textDecoration: "none",
              }}
            >
              Collections
            </a>
            <span className="nav-sep">—</span>
            <a
              href="#"
              className="nav-link"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10.5px",
                fontWeight: 300,
                textTransform: "uppercase",
                color: "var(--warm-fog)",
                textDecoration: "none",
              }}
            >
              Atelier
            </a>
          </div>

          {/* Right side intentionally left empty — no menu button */}
          <div style={{ width: "20px" }} />
        </nav>

        {/* ── IMAGE — bleeding background layer ── */}
        <div className="wg-hero-image">
          <div
            className="wg-hero-image-inner"
            style={{
              backgroundImage: `url('/image/wedding/hero.webp')`,
              transform: `translateY(${scrollY * 0.12}px)`,
              willChange: "transform",
            }}
          />
          <div className="wg-hero-image-fade" />
        </div>

        {/* ── TEXT — layered over the composition ── */}
        <div className="wg-hero-content">
          <p
            className={`fade-in delay-200 ${loaded ? "visible" : ""}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--dust)",
              marginBottom: "18px",
            }}
          >
            Aamira Bridal
          </p>

          <h1
            className={`fade-in delay-400 ${loaded ? "visible" : ""}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 6.5vw, 92px)",
              fontWeight: 200,
              lineHeight: 1.0,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--ivory)",
              marginBottom: "28px",
            }}
          >
            Wedding
          </h1>

          <p
            className={`fade-in delay-600 ${loaded ? "visible" : ""}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(17px, 1.6vw, 20px)",
              fontWeight: 300,
              color: "var(--warm-fog)",
              lineHeight: 1.6,
              maxWidth: "340px",
              marginBottom: "48px",
            }}
          >
            Timeless gowns designed for unforgettable ceremonies.
          </p>

          <Link
            href="/collections"
            className={`cta-link fade-in delay-800 ${loaded ? "visible" : ""}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10.5px",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--champagne)",
              textDecoration: "none",
            }}
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* ─── HIGHLIGHTS ─────────────────────────────────────── */}
      <section
        ref={highlights.ref as React.RefObject<HTMLElement>}
        style={{ background: "var(--noir)", position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "relative", zIndex: 2, padding: "112px 64px 120px", maxWidth: "1100px", margin: "0 auto" }}>

          {/* Section header */}
          <div style={{ marginBottom: "72px", textAlign: "center" }}>
            <div className={`wg-eyebrow wg-reveal wg-d0 ${highlights.inView ? "on" : ""}`} style={{ marginBottom: "20px" }}>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "10px",
                  fontWeight: 300,
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: "var(--champagne)",
                }}
              >
                Crafted For Your Forever
              </span>
            </div>

            <p
              className={`wg-reveal wg-d1 ${highlights.inView ? "on" : ""}`}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "var(--dust)",
                lineHeight: 1.8,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Every Aamira gown is a celebration of craftsmanship, femininity, and the beauty of your once-in-a-lifetime moment.
            </p>
          </div>

          {/* Cards grid — crossed divider layout */}
          <div className="wg-highlights-grid">
            {features.map((f, i) => (
              <div
                key={f.number}
                className={`wg-feature wg-reveal wg-d${i + 1} ${highlights.inView ? "on" : ""}`}
              >
                <div className="wg-feature-icon">{f.icon}</div>
                <h3 className="wg-feature-title">{f.title}</h3>
                <p className="wg-feature-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL ──────────────────────────────────────── */}
      <section
        ref={editorial.ref as React.RefObject<HTMLElement>}
        className="wg-editorial"
      >
        <div className="shimmer-line" style={{ height: "1px", position: "relative", zIndex: 3 }} />

        {/* ── IMAGE — bleeding background layer ── */}
        <div className="wg-editorial-image">
          <div
            className="wg-editorial-image-inner"
            style={{
              backgroundImage: `url('/image/wedding/bawah.webp')`,
              transform: `translateY(${(scrollY - 900) * 0.06}px)`,
              willChange: "transform",
            }}
          />
          <div className="wg-editorial-image-fade" />
        </div>

        {/* ── TEXT — layered over the composition ── */}
        <div className="wg-editorial-content">
          <div className={`wg-eyebrow wg-reveal wg-d0 ${editorial.inView ? "on" : ""}`} style={{ marginBottom: "24px", justifyContent: "flex-end" }}>
            <div className="wg-rule" style={{ width: "32px" }} />
          </div>

          <h2
            className={`wg-reveal wg-d1 ${editorial.inView ? "on" : ""}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 3.2vw, 44px)",
              fontWeight: 200,
              lineHeight: 1.2,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "var(--champagne)",
              marginBottom: "28px",
            }}
          >
            A Gown That Becomes Your Story
          </h2>

          <p
            className={`wg-reveal wg-d2 ${editorial.inView ? "on" : ""}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "13.5px",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "var(--dust)",
            }}
          >
            More than a dress, it&apos;s a reflection of your journey, your love, and the moments you&apos;ll cherish for a lifetime.
          </p>
        </div>

        <div className="shimmer-line" style={{ height: "1px", position: "relative", zIndex: 3 }} />
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section
        ref={cta.ref as React.RefObject<HTMLElement>}
        style={{
          position: "relative",
          background: "var(--noir)",
          overflow: "hidden",
          padding: "140px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <p
            className={`wg-reveal wg-d0 ${cta.inView ? "on" : ""}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--champagne)",
              marginBottom: "24px",
            }}
          >
            Let&apos;s Create Your Dream Dress
          </p>

          <h2
            className={`wg-reveal wg-d1 ${cta.inView ? "on" : ""}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "clamp(14px, 1.4vw, 16px)",
              fontWeight: 300,
              color: "var(--dust)",
              marginBottom: "40px",
            }}
          >
            Our atelier is here to bring your vision to life.
          </h2>

          <Link
            href="/book-appointment"
            className={`cta-link wg-reveal wg-d2 ${cta.inView ? "on" : ""}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10.5px",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--champagne)",
              textDecoration: "none",
            }}
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </>
  );
}