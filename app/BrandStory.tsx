"use client";

import { useEffect, useRef, useState } from "react";

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxY = (scrollProgress - 0.5) * -60;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --ivory: #F0EBE1;
          --silk-white: #F7F4EF;
          --parchment: #E8E0D0;
          --noir: #1C1A18;
          --dust: #9E9488;
          --blush: #D9C4B5;
          --gold: #B8963E;
          --champagne: #D4B483;
          --warm-fog: #C8BFB4;
        }

        .bs-section {
          background: var(--parchment);
          position: relative;
          overflow: hidden;
        }

        .bs-font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .bs-font-jost { font-family: 'Jost', sans-serif; }

        /* Fade-up reveal */
        .bs-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bs-reveal.in-view { opacity: 1; transform: translateY(0); }

        .bs-reveal-left {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bs-reveal-left.in-view { opacity: 1; transform: translateX(0); }

        /* Delays */
        .bs-d0  { transition-delay: 0s; }
        .bs-d1  { transition-delay: 0.15s; }
        .bs-d2  { transition-delay: 0.30s; }
        .bs-d3  { transition-delay: 0.45s; }
        .bs-d4  { transition-delay: 0.60s; }
        .bs-d5  { transition-delay: 0.80s; }
        .bs-d6  { transition-delay: 1.00s; }

        /* Image container */
        .bs-image-wrap {
          position: relative;
          overflow: hidden;
        }

        .bs-image-inner {
          position: absolute;
          inset: -8%;
          background-size: cover;
          background-position: center 15%;
          transition: transform 0.1s linear;
        }

        /* Gold rule */
        .bs-gold-rule {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--champagne) 30%,
            var(--gold) 50%,
            var(--champagne) 70%,
            transparent
          );
        }

        /* Ornament */
        .bs-ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--gold);
        }
        .bs-ornament-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--champagne));
        }
        .bs-ornament-line.reverse {
          background: linear-gradient(to left, transparent, var(--champagne));
        }

        /* Read more link */
        .bs-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--noir);
          transition: gap 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.3s ease;
        }
        .bs-link-bar {
          width: 28px;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bs-link:hover { color: var(--gold); gap: 16px; }
        .bs-link:hover .bs-link-bar { width: 44px; }

        /* Vertical rotated label */
        .bs-vertical-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          user-select: none;
        }

        /* Background ghost numeral */
        .bs-ghost-num {
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          color: transparent;
          -webkit-text-stroke: 1px rgba(28,26,24,0.07);
          user-select: none;
          pointer-events: none;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        /* Image caption strip */
        .bs-caption-strip {
          background: var(--noir);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .bs-image-wrap:hover .bs-caption-strip {
          opacity: 1;
          transform: translateY(0);
        }

        /* Pull quote decoration */
        .bs-quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: 120px;
          line-height: 0.5;
          color: var(--blush);
          display: block;
          margin-bottom: -16px;
        }

        /* Stats */
        .bs-stat-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, var(--blush), transparent);
        }

        /* Mobile responsive */
        @media (max-width: 1023px) {
          .bs-layout { flex-direction: column !important; }
          .bs-image-panel { width: 100% !important; height: 70vw !important; min-height: 340px; max-height: 520px; }
          .bs-content-panel { width: 100% !important; padding: 56px 32px 64px !important; }
          .bs-ghost-num { font-size: 28vw !important; }
          .bs-vertical-col { display: none !important; }
        }

        @media (max-width: 640px) {
          .bs-content-panel { padding: 40px 20px 56px !important; }
          .bs-image-panel { height: 85vw !important; }
        }
      `}</style>

      <section ref={sectionRef} className="bs-section">

        {/* Ghost numeral */}
        <span
          className="bs-ghost-num"
          style={{ fontSize: "22vw", top: "-2vw", right: "-2vw" }}
        >
          02
        </span>

        {/* ── MAIN LAYOUT ── */}
        <div
          className="bs-layout"
          style={{
            display: "flex",
            minHeight: "100vh",
            position: "relative",
            zIndex: 1,
          }}
        >

          {/* ── LEFT: IMAGE PANEL ── */}
          <div
            className="bs-image-panel bs-image-wrap"
            style={{
              width: "52%",
              position: "relative",
              flexShrink: 0,
            }}
          >
            {/* Parallax image */}
            <div
              ref={imageRef}
              className="bs-image-inner"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1608245536505-9bab008d00d3?q=80&w=1587&auto=format&fit=crop')`,
                transform: `translateY(${parallaxY}px)`,
                filter: "brightness(0.88) contrast(1.04)",
              }}
            />

            {/* Left edge warm overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, rgba(232,224,208,0.18) 0%, transparent 40%)",
                pointerEvents: "none",
              }}
            />

            {/* Overlapping text — year stamp, top-left */}
            <div
              className={`bs-reveal bs-d2 ${inView ? "in-view" : ""}`}
              style={{
                position: "absolute",
                top: "36px",
                left: "28px",
                zIndex: 2,
              }}
            >
              <span
                className="bs-font-jost"
                style={{
                  fontSize: "10px",
                  fontWeight: 300,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--ivory)",
                  opacity: 0.75,
                }}
              >
                Est. 2017
              </span>
            </div>

            {/* Overlapping framed quote on image */}
            <div
              className={`bs-reveal bs-d4 ${inView ? "in-view" : ""}`}
              style={{
                position: "absolute",
                bottom: "80px",
                left: "28px",
                right: "28px",
                zIndex: 2,
                borderLeft: "1px solid rgba(212,180,131,0.6)",
                paddingLeft: "20px",
              }}
            >
              <p
                className="bs-font-cormorant"
                style={{
                  fontSize: "clamp(17px, 2.2vw, 22px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--ivory)",
                  lineHeight: 1.55,
                  letterSpacing: "0.01em",
                  textShadow: "0 2px 20px rgba(28,26,24,0.5)",
                }}
              >
                "A gown is not worn.<br />
                It is carried."
              </p>
            </div>

            {/* Caption strip on hover */}
            <div className="bs-caption-strip">
              <span
                className="bs-font-jost"
                style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dust)" }}
              >
                Aamira Atelier · Jakarta
              </span>
              <span
                className="bs-font-cormorant"
                style={{ fontSize: "13px", fontStyle: "italic", color: "var(--champagne)" }}
              >
                The Reverie Collection, 2026
              </span>
            </div>

            {/* Right border accent line */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                right: 0,
                width: "1px",
                height: "80%",
                background: "linear-gradient(to bottom, transparent, var(--champagne) 40%, var(--gold) 50%, var(--champagne) 60%, transparent)",
                opacity: 0.4,
                zIndex: 2,
              }}
            />
          </div>

          {/* ── THIN VERTICAL COLUMN ── */}
          <div
            className="bs-vertical-col"
            style={{
              width: "48px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--noir)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span
              className="bs-vertical-label bs-font-jost"
              style={{
                fontSize: "9px",
                fontWeight: 200,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--dust)",
              }}
            >
              Brand Story
            </span>
          </div>

          {/* ── RIGHT: CONTENT PANEL ── */}
          <div
            className="bs-content-panel"
            style={{
              flex: 1,
              padding: "80px 64px 80px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "var(--parchment)",
              position: "relative",
            }}
          >

            {/* Section label */}
            <div
              className={`bs-ornament bs-reveal bs-d0 ${inView ? "in-view" : ""}`}
              style={{ marginBottom: "36px" }}
            >
              <span
                className="bs-font-jost"
                style={{
                  fontSize: "9px",
                  fontWeight: 300,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--dust)",
                  whiteSpace: "nowrap",
                }}
              >
                Our Philosophy
              </span>
              <div className="bs-ornament-line" style={{ maxWidth: "60px" }} />
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <rect x="3.5" y="0" width="1" height="8" fill="#B8963E" opacity="0.6" />
                <rect x="0" y="3.5" width="8" height="1" fill="#B8963E" opacity="0.6" />
              </svg>
            </div>

            {/* Pull quote mark */}
            <span
              className={`bs-quote-mark bs-reveal bs-d1 ${inView ? "in-view" : ""}`}
            >
              "
            </span>

            {/* Main headline */}
            <h2
              className={`bs-font-cormorant bs-reveal bs-d1 ${inView ? "in-view" : ""}`}
              style={{
                fontSize: "clamp(36px, 4.5vw, 62px)",
                fontWeight: 100,
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                color: "var(--noir)",
                marginBottom: "32px",
              }}
            >
              Devotion woven
              <br />
              into every thread,
              <br />
              <em style={{ fontStyle: "italic" }}>every breath.</em>
            </h2>

            {/* Gold rule */}
            <div
              className={`bs-gold-rule bs-reveal bs-d2 ${inView ? "in-view" : ""}`}
              style={{ marginBottom: "32px", maxWidth: "200px" }}
            />

            {/* Body copy — paragraph 1 */}
            <p
              className={`bs-font-cormorant bs-reveal bs-d3 ${inView ? "in-view" : ""}`}
              style={{
                fontSize: "clamp(16px, 1.5vw, 19px)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.75,
                color: "var(--noir)",
                marginBottom: "20px",
                opacity: 0.85,
              }}
            >
              Aamira was founded on a singular belief: that a bridal gown is not a product. 
              It is a rite. A threshold crossed in silk, witnessed by those who matter most.
            </p>

            {/* Body copy — paragraph 2 */}
            <p
              className={`bs-font-jost bs-reveal bs-d3 ${inView ? "in-view" : ""}`}
              style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "var(--dust)",
                marginBottom: "40px",
                maxWidth: "480px",
              }}
            >
              Every gown begins in stillness — a conversation, a silence, a bolt of hand-sourced 
              fabric held against skin. Our atelier in Jakarta works with a small circle of 
              master cutters who have spent decades understanding how cloth moves with the body, 
              not against it. Nothing here is rushed. Nothing is repeated.
            </p>

            {/* Stats row */}
            <div
              className={`bs-reveal bs-d4 ${inView ? "in-view" : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                marginBottom: "48px",
              }}
            >
              {[
                { number: "09", label: "Years of craft" },
                { number: "3", label: "Ateliers" },
                { number: "∞", label: "Gowns dreamed" },
              ].map((stat, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                  <div style={{ textAlign: "center" }}>
                    <span
                      className="bs-font-cormorant"
                      style={{
                        display: "block",
                        fontSize: "clamp(28px, 3vw, 40px)",
                        fontWeight: 100,
                        lineHeight: 1,
                        color: "var(--noir)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.number}
                    </span>
                    <span
                      className="bs-font-jost"
                      style={{
                        display: "block",
                        fontSize: "9px",
                        fontWeight: 300,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--dust)",
                        marginTop: "6px",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  {i < 2 && <div className="bs-stat-divider" />}
                </div>
              ))}
            </div>

            {/* CTA link */}
            <div className={`bs-reveal bs-d5 ${inView ? "in-view" : ""}`}>
              <a
                href="#atelier"
                className="bs-link bs-font-jost"
                style={{
                  fontSize: "11px",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                <span className="bs-link-bar" />
                Discover the Atelier
              </a>
            </div>

            {/* Bottom-right decorative element */}
            <div
              className={`bs-reveal bs-d6 ${inView ? "in-view" : ""}`}
              style={{
                position: "absolute",
                bottom: "40px",
                right: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "6px",
                opacity: 0.5,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="#B8963E" strokeWidth="0.5" />
                <circle cx="16" cy="16" r="10" stroke="#B8963E" strokeWidth="0.5" />
                <line x1="16" y1="1" x2="16" y2="31" stroke="#B8963E" strokeWidth="0.5" />
                <line x1="1" y1="16" x2="31" y2="16" stroke="#B8963E" strokeWidth="0.5" />
              </svg>
            </div>

          </div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div
          style={{
            background: "var(--noir)",
            padding: "20px 64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="bs-gold-rule" style={{ flex: 1, maxWidth: "120px" }} />

          <span
            className="bs-font-cormorant"
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--dust)",
              letterSpacing: "0.08em",
              margin: "0 32px",
              whiteSpace: "nowrap",
            }}
          >
            Handcrafted. Unhurried. Unrepeated.
          </span>

          <div className="bs-gold-rule" style={{ flex: 1, maxWidth: "120px" }} />
        </div>

      </section>
    </>
  );
}
