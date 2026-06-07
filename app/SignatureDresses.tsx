"use client";

import { useEffect, useRef, useState } from "react";

const dresses = [
  {
    id: "01",
    name: "Celestine",
    silhouette: "A-Line",
    fabric: "Silk Charmeuse",
    mood: "Sovereign",
    image: "https://images.unsplash.com/photo-1606216836537-eea72a939072?q=80&w=1588&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: "02",
    name: "Seraphine",
    silhouette: "Column",
    fabric: "Duchess Satin",
    mood: "Reverie",
    image: "https://images.unsplash.com/photo-1557363763-8381968f8353?q=80&w=1587&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: "03",
    name: "Mireille",
    silhouette: "Ballgown",
    fabric: "Tulle & Organza",
    mood: "Devotion",
    image: "https://images.unsplash.com/photo-1512750129023-cacd58b7be35?q=80&w=1587&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: "04",
    name: "Delara",
    silhouette: "Mermaid",
    fabric: "Chantilly Lace",
    mood: "Grace",
    image: "https://images.unsplash.com/photo-1529635322560-e767888a1583?q=80&w=1587&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: "05",
    name: "Isadora",
    silhouette: "Empire",
    fabric: "Mikado Silk",
    mood: "Ethereal",
    image: "https://images.unsplash.com/photo-1643216583837-f6d664d48eac?q=80&w=1587&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: "06",
    name: "Lumière",
    silhouette: "Sheath",
    fabric: "Crêpe de Chine",
    mood: "Luminous",
    image: "https://images.unsplash.com/photo-1593575620619-602b4ddf6e96?q=80&w=1587&auto=format&fit=crop",
    size: "tall",
  },
];

export default function SignatureDresses() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "A-Line", "Column", "Ballgown", "Mermaid", "Empire", "Sheath"];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const visible = activeFilter === "All"
    ? dresses
    : dresses.filter(d => d.silhouette === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

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

        /* ── Base ── */
        .sd-section {
          background: var(--silk);
          position: relative;
          overflow: hidden;
        }
        .sd-c { font-family: 'Cormorant Garamond', serif; }
        .sd-j { font-family: 'Jost', sans-serif; }

        /* ── Reveal ── */
        .sd-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1.3s cubic-bezier(0.16,1,0.3,1),
                      transform 1.3s cubic-bezier(0.16,1,0.3,1);
        }
        .sd-reveal.on { opacity: 1; transform: none; }
        .sd-d0  { transition-delay: 0.00s; }
        .sd-d1  { transition-delay: 0.10s; }
        .sd-d2  { transition-delay: 0.20s; }
        .sd-d3  { transition-delay: 0.30s; }
        .sd-d4  { transition-delay: 0.44s; }
        .sd-d5  { transition-delay: 0.58s; }
        .sd-d6  { transition-delay: 0.72s; }
        .sd-d7  { transition-delay: 0.86s; }
        .sd-d8  { transition-delay: 1.00s; }

        /* ── Custom cursor ── */
        .sd-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.25s ease;
          mix-blend-mode: normal;
        }
        .sd-cursor-ring {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1px solid rgba(184,150,62,0.6);
          background: rgba(28,26,24,0.5);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        /* ── Header ── */
        .sd-header {
          padding: 96px 64px 0;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        /* ── Filters ── */
        .sd-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
          margin-top: 48px;
          padding: 0 64px;
          border-bottom: 1px solid rgba(28,26,24,0.08);
          padding-bottom: 0;
        }
        .sd-filter-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px 20px 14px;
          position: relative;
          transition: color 0.3s ease;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          color: var(--dust);
          border-bottom: 1px solid transparent;
          margin-bottom: -1px;
        }
        .sd-filter-btn:hover { color: var(--noir); }
        .sd-filter-btn.active {
          color: var(--noir);
          border-bottom-color: var(--gold);
        }

        /* ── Masonry grid ── */
        .sd-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          padding: 2px 64px 0;
          background: rgba(200,191,180,0.2);
        }

        /* ── Card ── */
        .sd-card {
          position: relative;
          overflow: hidden;
          background: var(--noir2);
          cursor: none;
          display: flex;
          flex-direction: column;
        }

        /* Tall card spans 2 rows in masonry feel via JS height */
        .sd-card-tall .sd-img-wrap { height: 72vh; }
        .sd-card-short .sd-img-wrap { height: 46vh; }

        .sd-img-wrap {
          position: relative;
          overflow: hidden;
          width: 100%;
          flex-shrink: 0;
        }

        .sd-img {
          position: absolute;
          inset: -8%;
          background-size: cover;
          background-position: center top;
          filter: brightness(0.82) contrast(1.04) saturate(0.82);
          transition: transform 1.1s cubic-bezier(0.16,1,0.3,1),
                      filter 0.9s ease;
          will-change: transform;
        }
        .sd-card:hover .sd-img {
          transform: scale(1.07) translateY(-1%);
          filter: brightness(0.68) contrast(1.08) saturate(0.72);
        }

        /* Image overlay gradient */
        .sd-img-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(28,26,24,0) 50%,
            rgba(28,26,24,0.78) 100%
          );
          z-index: 1;
          transition: background 0.7s ease;
        }
        .sd-card:hover .sd-img-grad {
          background: linear-gradient(
            to bottom,
            rgba(28,26,24,0.12) 0%,
            rgba(28,26,24,0.88) 100%
          );
        }

        /* Number stamp */
        .sd-num {
          position: absolute;
          top: 16px;
          left: 20px;
          z-index: 3;
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: rgba(240,235,225,0.4);
          transition: opacity 0.5s ease;
        }
        .sd-card:hover .sd-num { opacity: 0; }

        /* Mood word — large ghost overlay */
        .sd-mood-ghost {
          position: absolute;
          bottom: -8px;
          right: -4px;
          z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: clamp(40px, 5vw, 64px);
          color: transparent;
          -webkit-text-stroke: 0.5px rgba(240,235,225,0.12);
          line-height: 1;
          letter-spacing: -0.03em;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .sd-card:hover .sd-mood-ghost {
          opacity: 0;
          transform: translateY(-8px);
        }

        /* Static name — always visible bottom */
        .sd-name-static {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 4;
          padding: 20px 24px;
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .sd-card:hover .sd-name-static {
          transform: translateY(-100px);
        }

        /* Hover reveal */
        .sd-hover-reveal {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 4;
          padding: 20px 24px;
          transform: translateY(100%);
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sd-card:hover .sd-hover-reveal { transform: translateY(0); }

        /* Fabric tag */
        .sd-fabric-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border: 1px solid rgba(212,180,131,0.35);
          backdrop-filter: blur(4px);
          background: rgba(28,26,24,0.3);
        }

        /* Below-image text block */
        .sd-card-foot {
          background: var(--silk);
          padding: 18px 24px 20px;
          border-top: 1px solid rgba(28,26,24,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Link arrow */
        .sd-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(184,150,62,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
          flex-shrink: 0;
        }
        .sd-card:hover .sd-arrow {
          background: var(--gold);
          border-color: var(--gold);
          transform: rotate(45deg);
        }

        /* Gold shimmer line */
        .sd-shimmer {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--champagne) 40%, var(--gold) 50%, var(--champagne) 60%, transparent);
          background-size: 200% 100%;
          animation: sdShimmer 4.5s ease-in-out infinite;
        }
        @keyframes sdShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Section count strip */
        .sd-count-strip {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 64px;
          margin-top: 48px;
          margin-bottom: 0;
        }

        /* Bottom cta section */
        .sd-bottom {
          padding: 64px 64px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .sd-bottom-rule {
          flex: 1;
          height: 1px;
          min-width: 40px;
          background: linear-gradient(to right, rgba(184,150,62,0.3), transparent);
        }
        .sd-bottom-rule.rev {
          background: linear-gradient(to left, rgba(184,150,62,0.3), transparent);
        }
        .sd-view-all {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .sd-view-all:hover { gap: 20px; }
        .sd-view-all-bar {
          width: 32px;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .sd-view-all:hover .sd-view-all-bar { width: 52px; }

        /* Responsive */
        @media (max-width: 1023px) {
          .sd-grid { grid-template-columns: repeat(2, 1fr); padding: 2px 32px 0; }
          .sd-header { padding: 72px 32px 0; }
          .sd-filters { padding: 0 32px; }
          .sd-count-strip { padding: 0 32px; }
          .sd-bottom { padding: 48px 32px 64px; }
          .sd-card-tall .sd-img-wrap { height: 58vw; }
          .sd-card-short .sd-img-wrap { height: 44vw; }
          .sd-cursor { display: none; }
          .sd-card { cursor: pointer; }
        }

        @media (max-width: 600px) {
          .sd-grid { grid-template-columns: 1fr; padding: 2px 0; }
          .sd-header { padding: 56px 20px 0; }
          .sd-filters { padding: 0 20px; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; }
          .sd-filters::-webkit-scrollbar { display: none; }
          .sd-count-strip { padding: 0 20px; }
          .sd-bottom { padding: 40px 20px 56px; }
          .sd-card-tall .sd-img-wrap,
          .sd-card-short .sd-img-wrap { height: 88vw; }
          .sd-card-foot { padding: 14px 20px 16px; }
        }
      `}</style>

      {/* Custom cursor */}
      {hovered !== null && (
        <div
          className="sd-cursor"
          style={{ left: cursor.x, top: cursor.y }}
        >
          <div className="sd-cursor-ring">
            <span className="sd-j" style={{ fontSize: "8px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ivory)" }}>
              View
            </span>
          </div>
        </div>
      )}

      <section
        ref={sectionRef}
        className="sd-section"
        onMouseMove={e => setCursor({ x: e.clientX, y: e.clientY })}
      >

        {/* ── HEADER ── */}
        <div className="sd-header">
          <div>
            <div className={`sd-reveal sd-d0 ${inView ? "on" : ""}`} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="7.5" y="0" width="1" height="16" fill="#B8963E" opacity="0.5" />
                <rect x="0" y="7.5" width="16" height="1" fill="#B8963E" opacity="0.5" />
              </svg>
              <span className="sd-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--dust)" }}>
                Signature Silhouettes
              </span>
            </div>

            <h2
              className={`sd-c sd-reveal sd-d1 ${inView ? "on" : ""}`}
              style={{
                fontSize: "clamp(38px, 5vw, 68px)",
                fontWeight: 100,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--noir)",
              }}
            >
              Six gowns.
              <br />
              <em style={{ fontStyle: "italic", color: "var(--dust)" }}>Six states of being.</em>
            </h2>
          </div>

          <div
            className={`sd-reveal sd-d2 ${inView ? "on" : ""}`}
            style={{ maxWidth: "260px", alignSelf: "flex-end" }}
          >
            <div className="sd-shimmer" style={{ marginBottom: "16px" }} />
            <p className="sd-j" style={{ fontSize: "12px", fontWeight: 300, lineHeight: 1.8, color: "var(--dust)" }}>
              Each named for a woman. Each built to become one.
            </p>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className={`sd-filters sd-reveal sd-d3 ${inView ? "on" : ""}`}>
          {filters.map(f => (
            <button
              key={f}
              className={`sd-filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── COUNT STRIP ── */}
        <div className={`sd-count-strip sd-reveal sd-d4 ${inView ? "on" : ""}`}>
          <span className="sd-j" style={{ fontSize: "10px", fontWeight: 300, letterSpacing: "0.16em", color: "var(--dust)" }}>
            {visible.length} of {dresses.length} pieces
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(28,26,24,0.08)" }} />
          <span className="sd-j" style={{ fontSize: "10px", fontWeight: 300, letterSpacing: "0.16em", color: "rgba(158,148,136,0.5)" }}>
            SS · 2026
          </span>
        </div>

        {/* ── CARD GRID ── */}
        <div className={`sd-grid sd-reveal sd-d4 ${inView ? "on" : ""}`} style={{ marginTop: "2px" }}>
          {visible.map((dress, i) => (
            <div
              key={dress.id}
              className={`sd-card ${dress.size === "tall" ? "sd-card-tall" : "sd-card-short"}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="sd-img-wrap">
                <div className="sd-img" style={{ backgroundImage: `url('${dress.image}')` }} />
                <div className="sd-img-grad" />

                {/* ID number */}
                <span className="sd-num">{dress.id}</span>

                {/* Ghost mood word */}
                <span className="sd-mood-ghost">{dress.mood}</span>

                {/* Static name */}
                <div className="sd-name-static">
                  <p className="sd-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,180,131,0.7)", marginBottom: "4px" }}>
                    {dress.mood}
                  </p>
                  <h3 className="sd-c" style={{ fontSize: "clamp(26px, 2.8vw, 38px)", fontWeight: 100, lineHeight: 1.0, color: "var(--ivory)", letterSpacing: "-0.01em" }}>
                    {dress.name}
                  </h3>
                </div>

                {/* Hover reveal */}
                <div className="sd-hover-reveal">
                  <h3 className="sd-c" style={{ fontSize: "clamp(26px, 2.8vw, 38px)", fontWeight: 100, lineHeight: 1.0, color: "var(--ivory)", letterSpacing: "-0.01em" }}>
                    {dress.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className="sd-fabric-tag sd-j" style={{ fontSize: "8px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--champagne)" }}>
                      {dress.fabric}
                    </span>
                    <span className="sd-j" style={{ fontSize: "8px", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dust)" }}>
                      {dress.silhouette}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="sd-card-foot">
                <div>
                  <p className="sd-c" style={{ fontSize: "clamp(15px, 1.5vw, 18px)", fontWeight: 300, fontStyle: "italic", color: "var(--noir)", lineHeight: 1.1 }}>
                    {dress.name}
                  </p>
                  <p className="sd-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dust)", marginTop: "3px" }}>
                    {dress.silhouette} · {dress.fabric}
                  </p>
                </div>
                <a href="#" aria-label={`View ${dress.name}`}>
                  <div className="sd-arrow">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H3M8 2V7" stroke="var(--ivory)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className={`sd-bottom sd-reveal sd-d5 ${inView ? "on" : ""}`}>
          <div className="sd-bottom-rule rev" />
          <a href="#" className="sd-view-all sd-j" style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--noir)", textDecoration: "none", whiteSpace: "nowrap" }}>
            <span className="sd-view-all-bar" />
            View Full Collection
          </a>
          <div className="sd-bottom-rule" />
        </div>

      </section>
    </>
  );
}
