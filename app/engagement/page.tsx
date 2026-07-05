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
    title: "Elegant Silhouettes",
    body: "Designed to enhance your natural beauty with sophisticated shapes that feel effortless.",
    icon: (
      <svg width="18" height="26" viewBox="0 0 18 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1c-1.5 2-2.5 3.6-2.5 5.5S7.5 10 9 10s2.5-1.6 2.5-3.5S10.5 3 9 1z" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round"/>
        <path d="M6.5 10L2 25h14L11.5 10" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Exquisite Details",
    body: "Hand-applied embroidery, delicate beading, and refined finishes that make each piece extraordinary.",
    icon: (
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 2c2.5 2.5 4 4.5 4 7a4 4 0 11-8 0c0-2.5 1.5-4.5 4-7z" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round"/>
        <path d="M11 13v9M8 19l3 3 3-3" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Personalized Experience",
    body: "One-on-one consultation to help you find the look that truly represents your story.",
    icon: (
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="6" r="4.5" stroke="currentColor" strokeWidth="0.7"/>
        <path d="M2 23c0-5.5 3.5-9.5 8-9.5s8 4 8 9.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Timeless Memories",
    body: "Pieces that capture the emotion of today and become keepsakes for a lifetime.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1l1.8 5.4L18 8l-5.2 1.6L11 15l-1.8-5.4L4 8l5.2-1.6L11 1z" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round"/>
        <path d="M18.5 13l0.8 2.2L21.5 16l-2.2 0.8L18.5 19l-0.8-2.2L15.5 16l2.2-0.8L18.5 13z" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────── */

export default function EngagementPage() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const highlights = useInView(0.08);
  const moment      = useInView(0.1);

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
        .en-grain { pointer-events: none; }
        .en-grain::after {
          content: '';
          position: fixed;
          inset: -200%;
          width: 400%;
          height: 400%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
          animation: enGrain 8s steps(10) infinite;
        }
        @keyframes enGrain {
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

        /* Scroll-triggered reveal */
        .en-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.3s cubic-bezier(0.16,1,0.3,1),
                      transform 1.3s cubic-bezier(0.16,1,0.3,1);
        }
        .en-reveal.on { opacity: 1; transform: none; }
        .en-d0 { transition-delay: 0.00s; }
        .en-d1 { transition-delay: 0.14s; }
        .en-d2 { transition-delay: 0.28s; }
        .en-d3 { transition-delay: 0.44s; }
        .en-d4 { transition-delay: 0.60s; }

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
        .nav-sep { color: var(--dust); font-size: 11px; opacity: 0.5; }

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

        /* ── Hero (bleed layered composition) ─────────────────── */
        .en-hero {
          position: relative;
          min-height: 92vh;
          background: var(--noir);
          overflow: hidden;
        }
        .en-hero-image {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 47%;
          overflow: hidden;
          background: var(--noir2);
          z-index: 1;
        }
        .en-hero-image-inner {
          position: absolute;
          inset: -4%;
          background-size: cover;
          background-position: center 22%;
        }
        .en-hero-image-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(28,26,24,0.5) 0%,
            rgba(28,26,24,0.15) 10%,
            rgba(28,26,24,0.0) 26%,
            rgba(28,26,24,0.0) 100%
          );
          pointer-events: none;
        }
        .en-hero-content {
          position: relative;
          z-index: 2;
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 0 0 64px;
          max-width: 420px;
        }

        /* ── Highlights (plain grid, no bleed) ─────────────────── */
        .en-highlights-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }
        .en-highlights-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .en-feature-icon {
          color: var(--gold);
          opacity: 0.85;
          margin-bottom: 22px;
          height: 26px;
          display: flex;
          align-items: flex-end;
        }
        .en-feature-head {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 14px;
        }
        .en-feature-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          font-weight: 300;
          color: var(--gold);
          letter-spacing: 0.1em;
        }
        .en-feature-title {
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--champagne);
        }
        .en-feature-body {
          font-size: 12.5px;
          font-weight: 300;
          line-height: 1.8;
          color: var(--dust);
        }

        /* ── Bottom grid — "The Moment" panel + image cards ────── */
        .en-moment-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: rgba(240,235,225,0.05);
        }
        .en-moment-panel {
          grid-column: span 2;
          position: relative;
          display: flex;
          min-height: 420px;
          background: var(--noir2);
          overflow: hidden;
        }
        .en-moment-image {
          position: relative;
          width: 42%;
          flex-shrink: 0;
          overflow: hidden;
          background: var(--noir);
        }
        .en-moment-image-inner {
          position: absolute;
          inset: -4%;
          background-size: cover;
          background-position: center;
        }
        .en-moment-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 44px;
        }
        .en-card {
          grid-column: span 1;
          position: relative;
          min-height: 420px;
          overflow: hidden;
          background: var(--noir2);
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .en-card-image {
          position: absolute;
          inset: -4%;
          background-size: cover;
          background-position: center;
          filter: brightness(0.82) saturate(0.9);
          transition: transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease;
        }
        .en-card:hover .en-card-image {
          transform: scale(1.05);
          filter: brightness(0.68) saturate(0.85);
        }
        .en-card-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20,17,15,0.88) 0%, rgba(20,17,15,0.0) 55%);
          pointer-events: none;
        }
        .en-card-label {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          z-index: 2;
          padding: 22px 26px 24px;
        }
        .en-card-title {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ivory);
          margin-bottom: 6px;
        }
        .en-card-explore {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--champagne);
        }

        /* ── Responsive ───────────────────────────────────────── */
        @media (max-width: 1000px) {
          .en-highlights-grid { grid-template-columns: 1fr 1fr; row-gap: 48px; }
          .en-moment-grid { grid-template-columns: 1fr 1fr; }
          .en-moment-panel { grid-column: span 2; }
          .en-card { grid-column: span 1; min-height: 320px; }
        }
        @media (max-width: 900px) {
          .en-hero-image { top: 38%; right: -10%; bottom: -8%; left: -10%; }
          .en-hero-content { max-width: 100%; padding: 140px 28px 40px; text-align: center; align-items: center; min-height: auto; }
          .en-hero-image-fade {
            background: linear-gradient(
              to top,
              rgba(28,26,24,0.95) 0%,
              rgba(28,26,24,0.4) 22%,
              rgba(28,26,24,0.0) 45%
            );
          }
          .en-highlights-header { flex-direction: column; }
        }
        @media (max-width: 640px) {
          .en-highlights-grid { grid-template-columns: 1fr; }
          .en-moment-grid { grid-template-columns: 1fr; }
          .en-moment-panel { grid-column: span 1; flex-direction: column; min-height: auto; }
          .en-moment-image { width: 100%; height: 260px; }
          .en-card { grid-column: span 1; min-height: 320px; }
        }
      `}</style>

      {/* Grain overlay */}
      <div
        className="en-grain"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }}
      />

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="en-hero">

        {/* ── NAV ── */}
        <nav
          className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8 fade-in ${loaded ? "visible" : ""}`}
        >
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

          <div style={{ width: "20px" }} />
        </nav>

        {/* ── IMAGE — bleeding background layer ── */}
        <div className="en-hero-image">
          <div
            className="en-hero-image-inner"
            style={{
              backgroundImage: `url('/image/engagement/hero.webp')`,
              transform: `translateY(${scrollY * 0.12}px)`,
              willChange: "transform",
            }}
          />
          <div className="en-hero-image-fade" />
        </div>

        {/* ── TEXT — layered over the composition ── */}
        <div className="en-hero-content">
          <h1
            className={`fade-in delay-200 ${loaded ? "visible" : ""}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 5.8vw, 76px)",
              fontWeight: 200,
              lineHeight: 1.0,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--ivory)",
              marginBottom: "18px",
            }}
          >
            Engagement
          </h1>

          <div
            className={`fade-in delay-400 ${loaded ? "visible" : ""}`}
            style={{
              width: "40px",
              height: "1px",
              background: "var(--gold)",
              marginBottom: "22px",
              opacity: 0.7,
            }}
          />

          <p
            className={`fade-in delay-400 ${loaded ? "visible" : ""}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              color: "var(--warm-fog)",
              lineHeight: 1.8,
              maxWidth: "320px",
              marginBottom: "40px",
            }}
          >
            Celebrate the beginning of forever with timeless designs that capture your love story in the most beautiful way.
          </p>

          <Link
            href="/collections"
            className={`cta-link fade-in delay-600 ${loaded ? "visible" : ""}`}
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
        style={{ background: "var(--noir2)", position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "relative", zIndex: 2, padding: "88px 64px 96px" }}>

          {/* Header row — heading left, description right */}
          <div className="en-highlights-header">
            <h2
              className={`en-reveal en-d0 ${highlights.inView ? "on" : ""}`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 2.6vw, 34px)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--champagne)",
              }}
            >
              Crafted For Your Forever
            </h2>

            <p
              className={`en-reveal en-d1 ${highlights.inView ? "on" : ""}`}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "12.5px",
                fontWeight: 300,
                color: "var(--dust)",
                lineHeight: 1.8,
                maxWidth: "360px",
                textAlign: "right",
              }}
            >
              Every detail is thoughtfully designed to reflect the beauty of your commitment and the start of your new chapter.
            </p>
          </div>

          {/* Feature grid */}
          <div className="en-highlights-grid">
            {features.map((f, i) => (
              <div
                key={f.number}
                className={`en-reveal en-d${i + 1} ${highlights.inView ? "on" : ""}`}
              >
                <div className="en-feature-icon">{f.icon}</div>
                <div className="en-feature-head">
                  <span className="en-feature-num">{f.number}</span>
                  <span className="en-feature-title">{f.title}</span>
                </div>
                <p className="en-feature-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE MOMENT YOU SAY YES + IMAGE CARDS (grid) ────────── */}
      <section
        ref={moment.ref as React.RefObject<HTMLElement>}
        style={{ background: "var(--noir)" }}
      >
        <div className="en-moment-grid">

          {/* Left panel — image + text, spans 2 columns */}
          <div className={`en-moment-panel en-reveal en-d0 ${moment.inView ? "on" : ""}`}>
            <div className="en-moment-image">
              <div
                className="en-moment-image-inner"
                style={{ backgroundImage: `url('/image/engagement/ring.jpg')` }}
              />
            </div>
            <div className="en-moment-text">
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  color: "var(--champagne)",
                  marginBottom: "16px",
                }}
              >
                The Moment
                <br />
                You Say Yes
              </h3>
              <div style={{ width: "32px", height: "1px", background: "var(--gold)", opacity: 0.7, marginBottom: "20px" }} />
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12.5px",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: "var(--dust)",
                  maxWidth: "260px",
                  marginBottom: "28px",
                }}
              >
                From the first fitting to the final touch, we&apos;re here to make your engagement journey as memorable as the moment itself.
              </p>
              <Link
                href="/book-appointment"
                className="cta-link"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "10px",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--champagne)",
                  textDecoration: "none",
                }}
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Card — Engagement Gowns */}
          <Link
            href="/collections/engagement-gowns"
            className={`en-card en-reveal en-d1 ${moment.inView ? "on" : ""}`}
          >
            <div
              className="en-card-image"
              style={{ backgroundImage: `url('/image/engagement/gowns.jpg')` }}
            />
            <div className="en-card-grad" />
            <div className="en-card-label">
              <p className="en-card-title">Engagement Gowns</p>
              <span className="en-card-explore">Explore</span>
            </div>
          </Link>

          {/* Card — Custom Design */}
          <Link
            href="/collections/custom-design"
            className={`en-card en-reveal en-d2 ${moment.inView ? "on" : ""}`}
          >
            <div
              className="en-card-image"
              style={{ backgroundImage: `url('/image/engagement/custom.jpg')` }}
            />
            <div className="en-card-grad" />
            <div className="en-card-label">
              <p className="en-card-title">Custom Design</p>
              <span className="en-card-explore">Explore</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}