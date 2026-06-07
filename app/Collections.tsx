"use client";

import { useEffect, useRef, useState } from "react";

const collections = [
  {
    id: "01",
    title: "Wedding",
    subtitle: "Collection",
    mood: "Sovereign",
    year: "2026",
    description:
      "For the woman who enters a room and changes its atmosphere. Structured silk, cathedral trains, and hand-placed beadwork that takes four hundred hours to complete.",
    details: ["Silk Charmeuse", "Hand Beading", "Cathedral Train", "Made to Measure"],
    image:
      "https://images.unsplash.com/photo-1723832347953-83c28e2d4dd2?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Wedding gown editorial",
    accent: "#B8963E",
    tag: "Signature",
  },
  {
    id: "02",
    title: "Engagement",
    subtitle: "Collection",
    mood: "Reverie",
    year: "2026",
    description:
      "Lighter. More intimate. Gowns built for the moment before — when anticipation is its own kind of beauty. Fluid silhouettes in blush-toned organza and Chantilly lace.",
    details: ["Chantilly Lace", "Organza", "Fluid Silhouette", "Limited Pieces"],
    image:
      "https://images.unsplash.com/photo-1482482097755-0b595893ba63?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Engagement gown editorial",
    accent: "#D4B483",
    tag: "New",
  },
  {
    id: "03",
    title: "Custom",
    subtitle: "Design",
    mood: "Devotion",
    year: "Atelier",
    description:
      "A gown that has never existed before, built entirely around you. Our master atelier begins with a single conversation and ends with something that cannot be replicated.",
    details: ["Private Consultation", "Bespoke Pattern", "Six Fittings", "One of One"],
    image:
      "https://images.unsplash.com/photo-1595868321403-bac51fbdeb97?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Custom bridal atelier",
    accent: "#9E9488",
    tag: "Exclusive",
  },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --ivory: #F0EBE1;
          --silk: #F7F4EF;
          --parchment: #E8E0D0;
          --noir: #1C1A18;
          --noir2: #2A2725;
          --dust: #9E9488;
          --blush: #D9C4B5;
          --gold: #B8963E;
          --champagne: #D4B483;
          --fog: #C8BFB4;
        }

        .col-section {
          background: var(--noir);
          position: relative;
          overflow: hidden;
          padding: 0 0 0 0;
        }

        .col-cormorant { font-family: 'Cormorant Garamond', serif; }
        .col-jost      { font-family: 'Jost', sans-serif; }

        /* ── Reveal animations ── */
        .col-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .col-reveal.on { opacity: 1; transform: none; }

        .col-d0 { transition-delay: 0s; }
        .col-d1 { transition-delay: 0.12s; }
        .col-d2 { transition-delay: 0.24s; }
        .col-d3 { transition-delay: 0.36s; }
        .col-d4 { transition-delay: 0.52s; }
        .col-d5 { transition-delay: 0.68s; }
        .col-d6 { transition-delay: 0.84s; }
        .col-d7 { transition-delay: 1.00s; }

        /* ── Custom cursor ── */
        .col-cursor {
          position: fixed;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease, transform 0.15s cubic-bezier(0.16,1,0.3,1);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(184,150,62,0.5);
          background: rgba(28,26,24,0.55);
          backdrop-filter: blur(4px);
        }

        /* ── Header ── */
        .col-header {
          padding: 96px 64px 0;
          position: relative;
          z-index: 2;
        }

        /* ── Grid ── */
        .col-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(240,235,225,0.06);
          margin-top: 64px;
        }

        /* ── Card ── */
        .col-card {
          position: relative;
          overflow: hidden;
          cursor: none;
          background: var(--noir2);
        }

        .col-card-image-wrap {
          width: 100%;
          height: 68vh;
          min-height: 480px;
          position: relative;
          overflow: hidden;
        }

        .col-card-image {
          position: absolute;
          inset: -6%;
          background-size: cover;
          background-position: center 15%;
          filter: brightness(0.7) contrast(1.05) saturate(0.85);
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.9s ease;
          will-change: transform;
        }

        .col-card:hover .col-card-image {
          transform: scale(1.06);
          filter: brightness(0.55) contrast(1.08) saturate(0.75);
        }

        /* Gradient overlay */
        .col-card-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(28,26,24,0.0) 0%,
            rgba(28,26,24,0.0) 40%,
            rgba(28,26,24,0.85) 100%
          );
          transition: background 0.7s ease;
          z-index: 1;
        }

        .col-card:hover .col-card-gradient {
          background: linear-gradient(
            to bottom,
            rgba(28,26,24,0.25) 0%,
            rgba(28,26,24,0.15) 35%,
            rgba(28,26,24,0.92) 100%
          );
        }

        /* Static label — always visible */
        .col-card-static {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 0 32px 28px;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .col-card:hover .col-card-static {
          transform: translateY(-148px);
        }

        /* Reveal panel on hover */
        .col-card-reveal {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 28px 32px;
          transform: translateY(100%);
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          border-top: 1px solid rgba(184,150,62,0.3);
        }

        .col-card:hover .col-card-reveal {
          transform: translateY(0);
        }

        /* Tag pill */
        .col-tag {
          display: inline-block;
          border: 1px solid rgba(212,180,131,0.4);
          padding: 3px 12px;
          margin-bottom: 16px;
        }

        /* Number */
        .col-ghost-num {
          position: absolute;
          top: 20px;
          right: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: 80px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(240,235,225,0.12);
          line-height: 1;
          z-index: 2;
          pointer-events: none;
          letter-spacing: -0.04em;
          transition: opacity 0.5s ease;
        }
        .col-card:hover .col-ghost-num { opacity: 0; }

        /* Detail list */
        .col-detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(240,235,225,0.08);
        }
        .col-detail-item:last-child { border-bottom: none; }

        .col-detail-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
        }

        /* CTA in card */
        .col-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          margin-top: 16px;
          transition: gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .col-card-cta:hover { gap: 14px; }
        .col-card-cta-bar {
          width: 24px;
          height: 1px;
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .col-card-cta:hover .col-card-cta-bar { width: 36px; }

        /* Middle card offset */
        .col-card-mid {
          margin-top: 48px;
        }

        /* Section footer */
        .col-footer {
          padding: 48px 64px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .col-footer-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212,180,131,0.3));
        }
        .col-footer-rule.rev {
          background: linear-gradient(to left, transparent, rgba(212,180,131,0.3));
        }

        /* Gold shimmer rule */
        .col-shimmer {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%, var(--blush) 35%, var(--gold) 50%, var(--blush) 65%, transparent 100%
          );
          background-size: 200% 100%;
          animation: colShimmer 4s ease-in-out infinite;
        }
        @keyframes colShimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Responsive */
        @media (max-width: 1023px) {
          .col-grid { grid-template-columns: 1fr 1fr; }
          .col-card-mid { margin-top: 0; }
          .col-card-image-wrap { height: 58vw; min-height: 320px; }
          .col-header { padding: 72px 32px 0; }
          .col-footer { padding: 40px 32px 64px; }
        }

        @media (max-width: 640px) {
          .col-grid { grid-template-columns: 1fr; }
          .col-card-image-wrap { height: 90vw; min-height: 280px; }
          .col-header { padding: 56px 20px 0; }
          .col-footer { padding: 32px 20px 56px; flex-direction: column; gap: 16px; }
          .col-cursor { display: none; }
          .col-card { cursor: pointer; }
        }
      `}</style>

      {/* Custom cursor */}
      {cursorVisible && hoveredIndex !== null && (
        <div
          className="col-cursor"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          <span
            className="col-jost"
            style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ivory)" }}
          >
            View
          </span>
        </div>
      )}

      <section
        ref={sectionRef}
        className="col-section"
        onMouseMove={handleMouseMove}
      >
        {/* ── HEADER ── */}
        <div className="col-header">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>

            {/* Left: section label + headline */}
            <div style={{ maxWidth: "580px" }}>
              <div
                className={`col-reveal col-d0 ${inView ? "on" : ""}`}
                style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}
              >
                <div className="col-shimmer" style={{ width: "40px" }} />
                <span
                  className="col-jost"
                  style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--dust)" }}
                >
                  The Collections
                </span>
              </div>

              <h2
                className={`col-cormorant col-reveal col-d1 ${inView ? "on" : ""}`}
                style={{
                  fontSize: "clamp(40px, 5.5vw, 72px)",
                  fontWeight: 100,
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  color: "var(--ivory)",
                }}
              >
                Three paths.
                <br />
                <em style={{ fontStyle: "italic", color: "var(--blush)" }}>One destination.</em>
              </h2>
            </div>

            {/* Right: descriptor */}
            <div
              className={`col-reveal col-d2 ${inView ? "on" : ""}`}
              style={{
                maxWidth: "300px",
                paddingTop: "8px",
                borderLeft: "1px solid rgba(212,180,131,0.25)",
                paddingLeft: "28px",
                alignSelf: "flex-end",
              }}
            >
              <p
                className="col-jost"
                style={{ fontSize: "13px", fontWeight: 300, lineHeight: 1.8, color: "var(--dust)" }}
              >
                Each collection is designed with a distinct woman in mind — her moment, her silhouette, her story. Select the path that begins yours.
              </p>
            </div>
          </div>
        </div>

        {/* ── COLLECTION GRID ── */}
        <div className={`col-grid col-reveal col-d3 ${inView ? "on" : ""}`}>
          {collections.map((col, i) => (
            <div
              key={col.id}
              className={`col-card ${i === 1 ? "col-card-mid" : ""}`}
              onMouseEnter={() => { setHoveredIndex(i); setCursorVisible(true); }}
              onMouseLeave={() => { setHoveredIndex(null); setCursorVisible(false); }}
            >
              {/* Image */}
              <div className="col-card-image-wrap">
                <div
                  className="col-card-image"
                  style={{ backgroundImage: `url('${col.image}')` }}
                />
                <div className="col-card-gradient" />

                {/* Ghost number */}
                <span className="col-ghost-num">{col.id}</span>

                {/* Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    zIndex: 3,
                  }}
                >
                  <span
                    className="col-tag col-jost"
                    style={{
                      fontSize: "8px",
                      fontWeight: 300,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: col.accent,
                    }}
                  >
                    {col.tag}
                  </span>
                </div>

                {/* Static bottom content */}
                <div className="col-card-static">
                  <div
                    style={{
                      height: "1px",
                      background: `linear-gradient(to right, ${col.accent}55, transparent)`,
                      marginBottom: "14px",
                      width: "48px",
                    }}
                  />
                  <p
                    className="col-jost"
                    style={{
                      fontSize: "9px",
                      fontWeight: 300,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: col.accent,
                      marginBottom: "6px",
                    }}
                  >
                    {col.mood} · {col.year}
                  </p>
                  <h3
                    className="col-cormorant"
                    style={{
                      fontSize: "clamp(32px, 3.2vw, 48px)",
                      fontWeight: 100,
                      lineHeight: 1.0,
                      color: "var(--ivory)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {col.title}
                    <br />
                    <em style={{ fontStyle: "italic", fontSize: "0.75em", color: "var(--fog)" }}>
                      {col.subtitle}
                    </em>
                  </h3>
                </div>

                {/* Hover reveal panel */}
                <div className="col-card-reveal">
                  <p
                    className="col-jost"
                    style={{
                      fontSize: "12px",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: "var(--fog)",
                      marginBottom: "16px",
                    }}
                  >
                    {col.description}
                  </p>

                  {/* Detail list */}
                  <div style={{ marginBottom: "4px" }}>
                    {col.details.map((d, di) => (
                      <div key={di} className="col-detail-item">
                        <span className="col-detail-dot" style={{ background: col.accent }} />
                        <span
                          className="col-jost"
                          style={{
                            fontSize: "10px",
                            fontWeight: 300,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "var(--dust)",
                          }}
                        >
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="col-card-cta col-jost"
                    style={{
                      fontSize: "10px",
                      fontWeight: 300,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: col.accent,
                    }}
                  >
                    <span
                      className="col-card-cta-bar"
                      style={{ background: col.accent }}
                    />
                    Explore
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER STRIP ── */}
        <div className="col-footer">
          <div className="col-footer-rule rev" />
          <div style={{ padding: "0 40px", textAlign: "center", flexShrink: 0 }}>
            <p
              className="col-cormorant"
              style={{
                fontSize: "13px",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--dust)",
                letterSpacing: "0.06em",
              }}
            >
              All pieces are made to order. Delivery in 14–20 weeks.
            </p>
            <p
              className="col-jost"
              style={{
                fontSize: "9px",
                fontWeight: 300,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(158,148,136,0.45)",
                marginTop: "6px",
              }}
            >
              Jakarta · Kuala Lumpur · Dubai
            </p>
          </div>
          <div className="col-footer-rule" />
        </div>

      </section>
    </>
  );
}
