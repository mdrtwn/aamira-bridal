"use client";

import { useEffect, useRef, useState } from "react";

export default function CelestinePage() {
  const [loaded, setLoaded] = useState(false);
  const [inView1, setInView1] = useState(false);
  const [inView2, setInView2] = useState(false);
  const [inView3, setInView3] = useState(false);

  const storyRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const make = (setter: (v: boolean) => void) =>
      new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setter(true);
        },
        { threshold: 0.12 }
      );

    const o1 = make(setInView1);
    const o2 = make(setInView2);
    const o3 = make(setInView3);

    if (storyRef.current) o1.observe(storyRef.current);
    if (galleryRef.current) o2.observe(galleryRef.current);
    if (ctaRef.current) o3.observe(ctaRef.current);

    return () => {
      o1.disconnect();
      o2.disconnect();
      o3.disconnect();
    };
  }, []);

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

        .cel-root { background: var(--silk); }
        .cel-c { font-family: 'Cormorant Garamond', serif; }
        .cel-j { font-family: 'Jost', sans-serif; }

        .cel-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.3s cubic-bezier(0.16,1,0.3,1),
                      transform 1.3s cubic-bezier(0.16,1,0.3,1);
        }
        .cel-reveal.on { opacity: 1; transform: none; }
        .cel-d0 { transition-delay: 0.05s; }
        .cel-d1 { transition-delay: 0.25s; }
        .cel-d2 { transition-delay: 0.45s; }
        .cel-d3 { transition-delay: 0.62s; }

        /* ── HERO ── */
        .cel-hero {
          position: relative;
          height: 100vh;
          min-height: 560px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          background: var(--noir);
        }
        .cel-hero-img {
          position: absolute;
          inset: -6%;
          background-image: url('/image/collections/celestine/1.jpg');
          background-size: cover;
          background-position: center 22%;
          filter: brightness(0.62) saturate(0.92) contrast(1.04);
        }
        .cel-hero-grad {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(14,10,7,0.78) 0%, rgba(14,10,7,0.1) 48%, transparent 72%),
            linear-gradient(180deg, rgba(14,10,7,0.32) 0%, transparent 28%);
        }
        .cel-hero-body {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 64px 72px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .cel-eyebrow {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--champagne);
          padding-right: 0.42em;
          margin-bottom: 18px;
          -webkit-font-smoothing: antialiased;
        }
        .cel-hero-title {
          font-weight: 100;
          font-size: clamp(56px, 11vw, 156px);
          line-height: 0.96;
          letter-spacing: -0.01em;
          color: var(--ivory);
          text-shadow: 0 2px 40px rgba(8,5,3,0.5);
        }
        .cel-hero-sub {
          margin-top: 18px;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240,235,225,0.62);
        }
        .cel-back-btn {
          position: absolute;
          top: 40px;
          left: 64px;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 22px;
          border: 1px solid rgba(184,150,62,0.55);
          text-decoration: none;
          font-size: 9.5px;
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ivory);
          background: rgba(28,26,24,0.25);
          backdrop-filter: blur(2px);
          transition: background 0.5s ease, border-color 0.5s ease;
        }
        .cel-back-btn:hover { background: rgba(184,150,62,0.18); border-color: var(--gold); }

        .cel-scroll-cue {
          position: absolute;
          right: 64px;
          bottom: 72px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cel-scroll-line {
          width: 1px;
          height: 46px;
          background: linear-gradient(to bottom, transparent, rgba(212,180,131,0.7));
        }
        .cel-scroll-label {
          writing-mode: vertical-rl;
          font-size: 8.5px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(240,235,225,0.5);
          font-weight: 300;
        }

        /* ── STORY ── */
        .cel-story {
          padding: 132px 64px 96px;
          display: flex;
          justify-content: center;
        }
        .cel-story-inner {
          max-width: 700px;
          text-align: center;
        }
        .cel-story-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 32px;
        }
        .cel-rule {
          width: 48px;
          height: 1px;
          background: rgba(184,150,62,0.5);
        }
        .cel-story-kicker {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--dust);
        }
        .cel-story-title {
          font-weight: 100;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.18;
          color: var(--noir);
          margin-bottom: 28px;
        }
        .cel-story-title em {
          font-style: italic;
          color: var(--dust);
        }
        .cel-story-body {
          font-size: 14.5px;
          font-weight: 300;
          line-height: 2.05;
          color: #5C564E;
        }

        /* ── GALLERY ── */
        .cel-gallery {
          padding: 0 64px 8px;
        }
        .cel-gallery-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(2, 38vh);
          gap: 2px;
          background: rgba(200,191,180,0.25);
        }
        .cel-g-item { position: relative; overflow: hidden; background: var(--noir2); }
        .cel-g-img {
          position: absolute;
          inset: -8%;
          background-size: cover;
          background-position: center;
          transition: transform 1.4s cubic-bezier(0.16,1,0.3,1), filter 1.4s ease;
        }
        .cel-g-item:hover .cel-g-img { transform: scale(1.06); }
        .cel-g-item:hover .cel-g-img { filter: brightness(0.96); }

        .cel-g1 { grid-column: 1 / 4; grid-row: 1 / 3; }
        .cel-g2 { grid-column: 4 / 7; grid-row: 1 / 2; }
        .cel-g3 { grid-column: 4 / 6; grid-row: 2 / 3; }
        .cel-g4 { grid-column: 6 / 7; grid-row: 2 / 3; }
        .cel-g5 { display: none; }

        /* ── DETAILS ── */
        .cel-details {
          padding: 120px 64px 120px;
          display: grid;
          grid-template-columns: 1fr 1px 1fr 1px 1fr;
          gap: 56px;
          max-width: 1180px;
          margin: 0 auto;
        }
        .cel-detail-sep { background: rgba(28,26,24,0.1); }
        .cel-detail-label {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
        }
        .cel-detail-value {
          font-weight: 200;
          font-size: clamp(24px, 2.4vw, 32px);
          color: var(--noir);
          line-height: 1.2;
          margin-bottom: 14px;
        }
        .cel-detail-note {
          font-size: 12.5px;
          font-weight: 300;
          line-height: 1.85;
          color: var(--dust);
        }

        /* ── CTA ── */
        .cel-cta {
          position: relative;
          background: var(--noir);
          padding: 140px 40px;
          text-align: center;
          overflow: hidden;
        }
        .cel-cta-bg {
          position: absolute;
          inset: 0;
          background-image: url('/image/collections/celestine/5.jpg');
          background-size: cover;
          background-position: center 30%;
          filter: brightness(0.22) saturate(0.5);
        }
        .cel-cta-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(8,5,3,0.6) 100%);
        }
        .cel-cta-inner { position: relative; z-index: 2; }
        .cel-cta-kicker {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--champagne);
          margin-bottom: 24px;
        }
        .cel-cta-title {
          font-weight: 100;
          font-size: clamp(34px, 4.6vw, 64px);
          color: var(--ivory);
          line-height: 1.08;
          margin-bottom: 40px;
        }
        .cel-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 38px;
          border: 1px solid rgba(184,150,62,0.55);
          text-decoration: none;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: background 0.5s ease, border-color 0.5s ease;
        }
        .cel-cta-btn:hover { background: rgba(184,150,62,0.12); border-color: var(--gold); }

        /* ── PREV / NEXT NAV ── */
        .cel-nav {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          background: var(--silk);
        }
        .cel-nav-link {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 56px 64px;
          text-decoration: none;
          overflow: hidden;
        }
        .cel-nav-link.next { align-items: flex-end; text-align: right; }
        .cel-nav-sep { background: rgba(28,26,24,0.1); }
        .cel-nav-kicker {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--dust);
          margin-bottom: 12px;
          transition: color 0.4s ease;
        }
        .cel-nav-link:hover .cel-nav-kicker { color: var(--gold); }
        .cel-nav-name {
          font-weight: 200;
          font-size: clamp(24px, 3vw, 38px);
          color: var(--noir);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cel-hero-body { padding: 0 28px 56px; }
          .cel-scroll-cue { display: none; }
          .cel-back-btn { top: 24px; left: 24px; padding: 10px 16px; }
          .cel-story { padding: 88px 28px 64px; }
          .cel-gallery { padding: 0 28px 8px; }
          .cel-gallery-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(4, 42vw);
          }
          .cel-g1 { grid-column: 1 / 3; grid-row: 1 / 2; }
          .cel-g2 { grid-column: 1 / 2; grid-row: 2 / 3; }
          .cel-g3 { grid-column: 2 / 3; grid-row: 2 / 3; }
          .cel-g4 { grid-column: 1 / 2; grid-row: 3 / 4; }
          .cel-g5 { display: block; grid-column: 2 / 3; grid-row: 3 / 4; }
          .cel-details {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 80px 28px;
          }
          .cel-detail-sep { display: none; }
          .cel-cta { padding: 96px 24px; }
          .cel-nav { grid-template-columns: 1fr; }
          .cel-nav-sep { height: 1px; }
          .cel-nav-link, .cel-nav-link.next { align-items: flex-start; text-align: left; padding: 40px 28px; }
        }
      `}</style>

      <div className="cel-root">

        {/* ── HERO ── */}
        <section className="cel-hero">
          <div className="cel-hero-img" />
          <div className="cel-hero-grad" />
          <a href="/bridal" className="cel-j cel-back-btn">
            &larr; Back to Bridal
          </a>
          <div className="cel-hero-body">
            <p className={`cel-j cel-eyebrow cel-reveal cel-d0 ${loaded ? "on" : ""}`}>
              Signature Silhouettes &middot; No. 01
            </p>
            <h1 className={`cel-c cel-hero-title cel-reveal cel-d1 ${loaded ? "on" : ""}`}>
              Celestine
            </h1>
            <p className={`cel-j cel-hero-sub cel-reveal cel-d2 ${loaded ? "on" : ""}`}>
              A-Line &middot; Silk Charmeuse &middot; Sovereign
            </p>
          </div>
          <div className="cel-scroll-cue">
            <span className="cel-j cel-scroll-label">Scroll</span>
            <div className="cel-scroll-line" />
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="cel-story" ref={storyRef}>
          <div className="cel-story-inner">
            <div className={`cel-story-mark cel-reveal cel-d0 ${inView1 ? "on" : ""}`}>
              <div className="cel-rule" />
              <span className="cel-j cel-story-kicker">The Story</span>
              <div className="cel-rule" />
            </div>
            <h2 className={`cel-c cel-story-title cel-reveal cel-d1 ${inView1 ? "on" : ""}`}>
              Born of quiet authority,
              <br />
              <em>worn like a second skin.</em>
            </h2>
            <p className={`cel-j cel-story-body cel-reveal cel-d2 ${inView1 ? "on" : ""}`}>
              Celestine opens the collection with restraint rather than spectacle. The silk
              charmeuse falls in a single unbroken line, catching light the way still water
              catches the moon. Every seam is hidden, every movement considered &mdash; a gown
              built not to announce the bride, but to let her presence speak first.
            </p>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="cel-gallery" ref={galleryRef}>
          <div className={`cel-gallery-grid cel-reveal cel-d0 ${inView2 ? "on" : ""}`}>
            <div className="cel-g-item cel-g1">
              <div className="cel-g-img" style={{ backgroundImage: "url('/image/collections/celestine/1.jpg')" }} />
            </div>
            <div className="cel-g-item cel-g2">
              <div className="cel-g-img" style={{ backgroundImage: "url('/image/collections/celestine/2.jpg')" }} />
            </div>
            <div className="cel-g-item cel-g3">
              <div className="cel-g-img" style={{ backgroundImage: "url('/image/collections/celestine/3.jpg')" }} />
            </div>
            <div className="cel-g-item cel-g4">
              <div className="cel-g-img" style={{ backgroundImage: "url('/image/collections/celestine/4.jpg')" }} />
            </div>
            <div className="cel-g-item cel-g5">
              <div className="cel-g-img" style={{ backgroundImage: "url('/image/collections/celestine/5.jpg')" }} />
            </div>
          </div>
        </section>

        {/* ── DETAILS ── */}
        <section className="cel-details">
          <div>
            <p className="cel-j cel-detail-label">Silhouette</p>
            <p className="cel-c cel-detail-value">A-Line</p>
            <p className="cel-j cel-detail-note">
              A single fluid line from bodice to hem, cut close through the waist and
              releasing softly toward the floor.
            </p>
          </div>
          <div className="cel-detail-sep" />
          <div>
            <p className="cel-j cel-detail-label">Fabric</p>
            <p className="cel-c cel-detail-value">Silk Charmeuse</p>
            <p className="cel-j cel-detail-note">
              A liquid-weight silk with a lustrous face and matte reverse, chosen for the
              way it drapes without resistance.
            </p>
          </div>
          <div className="cel-detail-sep" />
          <div>
            <p className="cel-j cel-detail-label">Mood</p>
            <p className="cel-c cel-detail-value">Sovereign</p>
            <p className="cel-j cel-detail-note">
              Composed, unhurried, certain of itself &mdash; a gown for a bride who needs
              no embellishment to command a room.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cel-cta" ref={ctaRef}>
          <div className="cel-cta-bg" />
          <div className="cel-cta-vignette" />
          <div className="cel-cta-inner">
            <p className={`cel-j cel-cta-kicker cel-reveal cel-d0 ${inView3 ? "on" : ""}`}>
              By Private Appointment
            </p>
            <h2 className={`cel-c cel-cta-title cel-reveal cel-d1 ${inView3 ? "on" : ""}`}>
              Experience Celestine
              <br />
              in the atelier.
            </h2>
            <a href="#" className={`cel-j cel-cta-btn cel-reveal cel-d2 ${inView3 ? "on" : ""}`}>
              Schedule An Appointment
            </a>
          </div>
        </section>

        {/* ── PREV / NEXT ── */}
        <nav className="cel-nav">
          <a href="/collections/lumiere" className="cel-nav-link">
            <span className="cel-j cel-nav-kicker">&larr; Previous</span>
            <span className="cel-c cel-nav-name">Lumi&egrave;re</span>
          </a>
          <div className="cel-nav-sep" />
          <a href="/collections/seraphine" className="cel-nav-link next">
            <span className="cel-j cel-nav-kicker">Next &rarr;</span>
            <span className="cel-c cel-nav-name">Seraphine</span>
          </a>
        </nav>

      </div>
    </>
  );
}