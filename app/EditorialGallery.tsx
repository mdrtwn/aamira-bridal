"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    id: "01",
    image: "https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?q=80&w=1588&auto=format&fit=crop",
    title: "Celestine",
    category: "Wedding",
    year: "SS · 2026",
    orientation: "tall",   // col span + row span logic
    caption: "Silk Charmeuse · A-Line",
  },
  {
    id: "02",
    image: "https://images.unsplash.com/photo-1524055117800-683336a51803?q=80&w=1974&auto=format&fit=crop",
    title: "Lumière",
    category: "Engagement",
    year: "SS · 2026",
    orientation: "short",
    caption: "Crêpe de Chine · Sheath",
  },
  {
    id: "03",
    image: "https://images.unsplash.com/photo-1539357521934-197bc014f047?q=80&w=1587&auto=format&fit=crop",
    title: "Mireille",
    category: "Couture",
    year: "SS · 2026",
    orientation: "short",
    caption: "Tulle & Organza · Ballgown",
  },
  {
    id: "04",
    image: "https://plus.unsplash.com/premium_photo-1675851210855-e7727076e829?q=80&w=1587&auto=format&fit=crop",
    title: "Seraphine",
    category: "Atelier",
    year: "SS · 2026",
    orientation: "wide",
    caption: "Duchess Satin · Column",
  },
  {
    id: "05",
    image: "https://images.unsplash.com/photo-1722805740302-7bf173339b80?q=80&w=1587&auto=format&fit=crop",
    title: "Delara",
    category: "Wedding",
    year: "SS · 2026",
    orientation: "tall",
    caption: "Chantilly Lace · Mermaid",
  },
  {
    id: "06",
    image: "https://images.unsplash.com/photo-1672289508233-f393cb329b0b?q=80&w=1587&auto=format&fit=crop",
    title: "Isadora",
    category: "Couture",
    year: "SS · 2026",
    orientation: "short",
    caption: "Mikado Silk · Empire",
  },
  {
    id: "07",
    image: "https://images.unsplash.com/photo-1720535874037-baa991defb3b?q=80&w=1470&auto=format&fit=crop",
    title: "Aurore",
    category: "Engagement",
    year: "SS · 2026",
    orientation: "short",
    caption: "Georgette · A-Line",
  },
];

const slugMap: Record<string, string> = {
  Celestine: "/collections/celestine",
  Lumière: "/collections/lumiere",
  Mireille: "/collections/mireille",
  Seraphine: "/collections/seraphine",
  Delara: "/collections/delara",
  Isadora: "/collections/isadora",
  Aurore: "/collections/aurore",
};

export default function EditorialGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Wedding", "Engagement", "Couture", "Atelier"];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const visible = activeCategory === "All"
    ? items
    : items.filter(i => i.category === activeCategory);

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

        /* ── Section ── */
        .eg-section {
          background: var(--noir);
          position: relative;
          overflow: hidden;
          padding-bottom: 80px;
        }
        .eg-c { font-family: 'Cormorant Garamond', serif; }
        .eg-j { font-family: 'Jost', sans-serif; }

        /* ── Grain ── */
        .eg-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Reveal ── */
        .eg-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 1.3s cubic-bezier(0.16,1,0.3,1),
                      transform 1.3s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-reveal.on { opacity: 1; transform: none; }
        .eg-d0 { transition-delay: 0.00s; }
        .eg-d1 { transition-delay: 0.10s; }
        .eg-d2 { transition-delay: 0.22s; }
        .eg-d3 { transition-delay: 0.34s; }
        .eg-d4 { transition-delay: 0.48s; }
        .eg-d5 { transition-delay: 0.62s; }

        /* ── Shimmer ── */
        .eg-shimmer {
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
          animation: egShimmer 4.5s ease-in-out infinite;
        }
        @keyframes egShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Header ── */
        .eg-header {
          padding: 96px 64px 0;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        /* ── Eyebrow ── */
        .eg-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        /* ── Category strip ── */
        .eg-cats {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 0 64px;
          margin-top: 52px;
          border-bottom: 1px solid rgba(240,235,225,0.07);
          position: relative;
          z-index: 2;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .eg-cats::-webkit-scrollbar { display: none; }

        .eg-cat-btn {
          background: none;
          border: none;
          border-bottom: 1px solid transparent;
          margin-bottom: -1px;
          padding: 12px 22px 14px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--dust);
          transition: color 0.3s ease, border-color 0.3s ease;
          white-space: nowrap;
        }
        .eg-cat-btn:hover { color: var(--fog); }
        .eg-cat-btn.active {
          color: var(--ivory);
          border-bottom-color: var(--gold);
        }

        /* ── Count line ── */
        .eg-meta-strip {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 64px;
          margin-top: 36px;
          position: relative;
          z-index: 2;
        }

        /* ── Masonry grid ── */
        .eg-grid {
          columns: 3;
          column-gap: 3px;
          padding: 3px 64px 0;
          margin-top: 24px;
          position: relative;
          z-index: 2;
        }

        /* ── Card ── */
        .eg-card {
          break-inside: avoid;
          position: relative;
          overflow: hidden;
          background: var(--noir2);
          cursor: pointer;
          margin-bottom: 3px;
          display: block;
          text-decoration: none;
          color: inherit;
          z-index: 1;
        }

        /* Image wrapper */
        .eg-img-wrap {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .eg-card-tall  .eg-img-wrap { padding-bottom: 145%; }
        .eg-card-short .eg-img-wrap { padding-bottom: 88%; }
        .eg-card-wide  .eg-img-wrap { padding-bottom: 68%; }

        /* Actual image */
        .eg-img {
          position: absolute;
          inset: -5%;
          background-size: cover;
          background-position: center 15%;
          filter: brightness(0.78) contrast(1.06) saturate(0.78);
          transition:
            transform 1.1s cubic-bezier(0.16,1,0.3,1),
            filter 0.9s ease;
          will-change: transform;
        }
        .eg-card:hover .eg-img {
          transform: scale(1.08) translateY(-1.5%);
          filter: brightness(0.6) contrast(1.1) saturate(0.7);
        }

        /* Gradient */
        .eg-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(28,26,24,0) 45%,
            rgba(28,26,24,0.82) 100%
          );
          z-index: 1;
          transition: background 0.7s ease;
          pointer-events: none;
        }
        .eg-card:hover .eg-grad {
          background: linear-gradient(
            to bottom,
            rgba(28,26,24,0.1) 0%,
            rgba(28,26,24,0.92) 100%
          );
        }

        /* ID number stamp */
        .eg-num {
          position: absolute;
          top: 18px;
          left: 20px;
          z-index: 3;
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: rgba(240,235,225,0.35);
          transition: opacity 0.5s ease;
        }
        .eg-card:hover .eg-num { opacity: 0; }

        /* Category tag */
        .eg-cat-tag {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 3;
          border: 1px solid rgba(212,180,131,0.3);
          padding: 3px 10px;
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--champagne);
          backdrop-filter: blur(4px);
          background: rgba(28,26,24,0.25);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-card:hover .eg-cat-tag {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ghost large mood text */
        .eg-ghost-title {
          position: absolute;
          bottom: -6px;
          right: -2px;
          z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: clamp(36px, 4.5vw, 58px);
          color: transparent;
          -webkit-text-stroke: 0.5px rgba(240,235,225,0.1);
          line-height: 1;
          letter-spacing: -0.03em;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-card:hover .eg-ghost-title {
          opacity: 0;
          transform: translateY(-10px);
        }

        /* Static name — always visible */
        .eg-static {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 4;
          padding: 18px 22px 20px;
          pointer-events: none;
        }
        .eg-card:hover .eg-static {
          transform: translateY(-88px);
        }

        /* Hover reveal */
        .eg-hover-reveal {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 18px 22px 20px;
          transform: translateY(100%);
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
          border-top: 1px solid rgba(184,150,62,0.25);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          pointer-events: none; /* decorative only, the whole card is the clickable Link */
        }
        .eg-card:hover .eg-hover-reveal { transform: translateY(0); }

        /* Fabric tag */
        .eg-fabric {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border: 1px solid rgba(212,180,131,0.3);
          backdrop-filter: blur(4px);
          background: rgba(28,26,24,0.28);
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--champagne);
        }

        /* Arrow circle */
        .eg-arrow {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(184,150,62,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.35s ease, border-color 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-card:hover .eg-arrow {
          background: var(--gold);
          border-color: var(--gold);
          transform: rotate(45deg);
        }

        /* ── Custom cursor ── */
        .eg-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.25s ease;
          mix-blend-mode: normal;
        }
        .eg-cursor-ring {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: 1px solid rgba(184,150,62,0.65);
          background: rgba(28,26,24,0.55);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Marquee strip ── */
        .eg-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(240,235,225,0.06);
          border-bottom: 1px solid rgba(240,235,225,0.06);
          padding: 14px 0;
          margin-top: 56px;
          position: relative;
          z-index: 2;
        }
        .eg-marquee-track {
          display: flex;
          gap: 0;
          animation: egMarquee 28s linear infinite;
          white-space: nowrap;
        }
        .eg-marquee-track:hover { animation-play-state: paused; }
        @keyframes egMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .eg-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          padding: 0 40px;
        }
        .eg-marquee-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* ── Bottom CTA ── */
        .eg-bottom {
          padding: 56px 64px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }
        .eg-bottom-rule {
          flex: 1;
          height: 1px;
          min-width: 40px;
          background: linear-gradient(to right, rgba(184,150,62,0.3), transparent);
        }
        .eg-bottom-rule.rev {
          background: linear-gradient(to left, rgba(184,150,62,0.3), transparent);
        }
        .eg-view-all {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: gap 0.4s cubic-bezier(0.16,1,0.3,1);
          white-space: nowrap;
        }
        .eg-view-all:hover { gap: 20px; }
        .eg-view-all-bar {
          width: 32px;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-view-all:hover .eg-view-all-bar { width: 52px; }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .eg-grid   { columns: 2; padding: 3px 32px 0; }
          .eg-header { padding: 72px 32px 0; }
          .eg-cats   { padding: 0 32px; }
          .eg-meta-strip { padding: 0 32px; }
          .eg-bottom { padding: 48px 32px 0; }
          .eg-cursor { display: none; }
          .eg-card   { cursor: pointer; }
        }

        @media (max-width: 600px) {
          .eg-grid   { columns: 1; padding: 3px 0; }
          .eg-header { padding: 56px 20px 0; }
          .eg-cats   { padding: 0 20px; }
          .eg-meta-strip { padding: 0 20px; }
          .eg-bottom { padding: 36px 20px 0; }
          .eg-card-tall  .eg-img-wrap { padding-bottom: 130%; }
          .eg-card-short .eg-img-wrap { padding-bottom: 90%; }
          .eg-card-wide  .eg-img-wrap { padding-bottom: 80%; }
        }
      `}</style>

      {/* ── Custom cursor ── */}
      {hovered !== null && (
        <div className="eg-cursor" style={{ left: cursor.x, top: cursor.y }}>
          <div className="eg-cursor-ring">
            <span className="eg-j" style={{ fontSize: "8px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ivory)" }}>
              View
            </span>
          </div>
        </div>
      )}

      <section
        ref={sectionRef}
        className="eg-section eg-grain"
        onMouseMove={e => setCursor({ x: e.clientX, y: e.clientY })}
      >

        {/* ── HEADER ── */}
        <div className="eg-header">
          <div>
            {/* Eyebrow */}
            <div className={`eg-eyebrow eg-reveal eg-d0 ${inView ? "on" : ""}`}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="6.5" y="0" width="1" height="14" fill="#B8963E" opacity="0.5" />
                <rect x="0" y="6.5" width="14" height="1" fill="#B8963E" opacity="0.5" />
              </svg>
              <span className="eg-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--dust)" }}>
                Editorial Gallery
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`eg-c eg-reveal eg-d1 ${inView ? "on" : ""}`}
              style={{
                fontSize: "clamp(38px, 5.2vw, 72px)",
                fontWeight: 100,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--ivory)",
              }}
            >
              The season,
              <br />
              <em style={{ fontStyle: "italic", color: "var(--blush)" }}>in full light.</em>
            </h2>
          </div>

          {/* Right descriptor */}
          <div
            className={`eg-reveal eg-d2 ${inView ? "on" : ""}`}
            style={{
              maxWidth: "260px",
              paddingLeft: "28px",
              borderLeft: "1px solid rgba(240,235,225,0.08)",
              alignSelf: "flex-end",
            }}
          >
            <div className="eg-shimmer" style={{ marginBottom: "16px" }} />
            <p className="eg-j" style={{ fontSize: "12px", fontWeight: 300, lineHeight: 1.85, color: "var(--dust)" }}>
              Every image is a decision. Every frame, a point of view. Spring–Summer 2026, as seen through the atelier lens.
            </p>
          </div>
        </div>

        {/* ── CATEGORY FILTER ── */}
        <div className={`eg-cats eg-reveal eg-d3 ${inView ? "on" : ""}`}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`eg-cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── COUNT STRIP ── */}
        <div className={`eg-meta-strip eg-reveal eg-d3 ${inView ? "on" : ""}`}>
          <span className="eg-j" style={{ fontSize: "10px", fontWeight: 300, letterSpacing: "0.16em", color: "var(--dust)" }}>
            {visible.length} of {items.length} images
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(240,235,225,0.06)" }} />
          <span className="eg-j" style={{ fontSize: "10px", fontWeight: 300, letterSpacing: "0.16em", color: "rgba(158,148,136,0.4)" }}>
            SS · 2026
          </span>
        </div>

        {/* ── MASONRY GRID ── */}
        <div className={`eg-grid eg-reveal eg-d4 ${inView ? "on" : ""}`}>
          {visible.map((item, i) => {
            const href = slugMap[item.title];

            const cardContent = (
              <article
                className={`eg-card eg-card-${item.orientation}`}
              >
                <div className="eg-img-wrap">
                  {/* Image */}
                  <div
                    className="eg-img"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />

                  {/* Gradient overlay */}
                  <div className="eg-grad" />

                  {/* ID number */}
                  <span className="eg-num">{item.id}</span>

                  {/* Category tag */}
                  <span className="eg-cat-tag">{item.category}</span>

                  {/* Ghost title */}
                  <span className="eg-ghost-title">{item.title}</span>

                  {/* Static bottom label */}
                  <div className="eg-static">
                    <p className="eg-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,180,131,0.65)", marginBottom: "4px" }}>
                      {item.year}
                    </p>
                    <h3 className="eg-c" style={{ fontSize: "clamp(22px, 2.5vw, 34px)", fontWeight: 100, lineHeight: 1.0, color: "var(--ivory)", letterSpacing: "-0.01em" }}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Hover reveal */}
                  <div className="eg-hover-reveal">
                    <div>
                      <h3 className="eg-c" style={{ fontSize: "clamp(22px, 2.5vw, 34px)", fontWeight: 100, lineHeight: 1.0, color: "var(--ivory)", letterSpacing: "-0.01em", marginBottom: "10px" }}>
                        {item.title}
                      </h3>
                      <span className="eg-fabric">{item.caption}</span>
                    </div>
                    {href && (
                      <div className="eg-arrow">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 8L8 2M8 2H3M8 2V7" stroke="var(--ivory)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );

            if (href) {
              return (
                <Link
                  key={item.id}
                  href={href}
                  aria-label={`View ${item.title}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ display: "block" }}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* ── MARQUEE STRIP ── */}
        <div className={`eg-marquee-wrap eg-reveal eg-d5 ${inView ? "on" : ""}`}>
          <div className="eg-marquee-track">
            {/* Duplicate for seamless loop */}
            {[...Array(2)].map((_, di) =>
              ["Handcrafted", "Unhurried", "Unrepeated", "SS · 2026", "Australia", "Sydney", "Indonesia", "Bridal Couture", "Made to Measure"].map((word, wi) => (
                <span key={`${di}-${wi}`} className="eg-marquee-item">
                  <span className="eg-c" style={{ fontSize: "12px", fontStyle: "italic", fontWeight: 300, color: "var(--dust)", letterSpacing: "0.06em" }}>
                    {word}
                  </span>
                  <span className="eg-marquee-dot" />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className={`eg-bottom eg-reveal eg-d5 ${inView ? "on" : ""}`}>
          <div className="eg-bottom-rule rev" />
          <a
            href="#"
            className="eg-view-all eg-j"
            style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ivory)", textDecoration: "none" }}
          >
            <span className="eg-view-all-bar" />
            View Full Gallery
          </a>
          <div className="eg-bottom-rule" />
        </div>

      </section>
    </>
  );
}