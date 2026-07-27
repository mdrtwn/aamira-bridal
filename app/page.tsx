import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-aamira-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-aamira-body",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aamira — Bridal Couture & Ready-to-Wear",
  description:
    "Discover Aamira Bridal couture and Aamira Basic ready-to-wear. Choose the Aamira experience made for you.",
};

export default function AamiraEntry() {

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ivory:     #F0EBE1;
          --noir:      #1A1612;
          --noir2:     #211D19;
          --dust:      #9E9488;
          --blush:     #D9C4B5;
          --gold:      #B8963E;
          --champagne: #D4B483;
          --fog:       #C8BFB4;
          --card-border: rgba(184,150,62,0.45);
        }

        html, body { height: 100%; }

        .ae-root {
          min-height: 100dvh;
          background: transparent;
          display: flex;
          flex-direction: column;
          font-family: var(--font-aamira-body), sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* ── Ambient background image ── */
        .ae-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-color: var(--noir);
          background-image: url('/image/homepage/hero.jpg');
          background-size: cover;
          background-position: center;
          filter: brightness(0.22) saturate(0.42) contrast(1.06);
          pointer-events: none;
        }
        /* extra left-side veil drape feel + bottom pool of darkness */
        .ae-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              105deg,
              rgba(14,10,7,0.70) 0%,
              transparent 42%,
              rgba(14,10,7,0.32) 100%
            ),
            radial-gradient(
              ellipse 80% 60% at 50% 108%,
              rgba(8,5,3,0.72) 0%,
              transparent 70%
            );
        }

        /* ── Grain ── */
        .ae-grain {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.042;
        }

        /* ── Radial vignette — pools darkness toward edges ── */
        .ae-vignette {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: radial-gradient(
            ellipse 90% 85% at 50% 50%,
            transparent 40%,
            rgba(8,5,3,0.55) 100%
          );
        }

        /* ── Fade-in ── */
        .ae-fade {
          opacity: 0;
          transform: translateY(8px);
          animation: aeFadeIn 1.2s cubic-bezier(0.22, 0.8, 0.32, 1) forwards;
        }
        @keyframes aeFadeIn {
          to { opacity: 1; transform: none; }
        }
        .ae-d0 { animation-delay: 0.05s; }
        .ae-d1 { animation-delay: 0.18s; }
        .ae-d2 { animation-delay: 0.30s; }
        .ae-d3 { animation-delay: 0.42s; }
        .ae-d4 { animation-delay: 0.54s; }
        .ae-d5 { animation-delay: 0.66s; }

        /* ── Nav ── */
        .ae-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 28px 44px;
        }
        .ae-nav-link {
          font-family: var(--font-aamira-body), sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(240,235,225,0.5);
          text-decoration: none;
          transition: color 0.9s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          -webkit-font-smoothing: antialiased;
          padding-right: 0.32em;
        }
        .ae-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 1.1s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .ae-nav-link:hover { color: var(--ivory); }
        .ae-nav-link:hover::after { width: 100%; }
        .ae-nav-link:focus-visible {
          color: var(--ivory);
          outline: 1px solid var(--gold);
          outline-offset: 7px;
        }
        .ae-nav-link:focus-visible::after { width: 100%; }

        /* ── Main layout ── */
        .ae-main {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 40px 0;
          gap: 0;
        }

        /* ── Logotype block ── */
        .ae-logo-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .ae-logotype {
          font-family: var(--font-aamira-display), serif;
          font-weight: 300;
          font-size: clamp(38px, 5.8vw, 68px);
          color: var(--ivory);
          letter-spacing: 0.55em;
          text-transform: uppercase;
          line-height: 1;
          padding-right: 0.55em; /* compensate tracking on last char */
          font-feature-settings: 'kern' 1, 'liga' 1;
          -webkit-font-smoothing: antialiased;
          text-shadow:
            0 0 80px rgba(212,180,131,0.10),
            0 1px 2px rgba(8,5,3,0.55);
        }

        .ae-logo-ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
        }
        .ae-orn-line {
          width: 64px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,150,62,0.65));
        }
        .ae-orn-line.rev {
          background: linear-gradient(to left, transparent, rgba(184,150,62,0.65));
        }

        /* ── Eyebrow ── */
        .ae-eyebrow {
          font-family: var(--font-aamira-body), sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.46em;
          text-transform: uppercase;
          color: var(--dust);
          margin-bottom: 48px;
          padding-right: 0.46em;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Card row ── */
        .ae-cards {
          display: flex;
          align-items: center;
          gap: 0;
          width: 100%;
          max-width: 740px;
        }

        /* ── OR divider ── */
        .ae-or {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          width: 80px;
        }
        .ae-or-line {
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, transparent, rgba(184,150,62,0.4));
        }
        .ae-or-line.bot {
          background: linear-gradient(to top, transparent, rgba(184,150,62,0.4));
        }
        .ae-or-label {
          font-family: var(--font-aamira-body), sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: var(--dust);
          padding-right: 0.36em;
          opacity: 0.7;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Card ── */
        .ae-card {
          flex: 1;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(184,150,62,0.32);
          cursor: pointer;
          aspect-ratio: 0.72 / 1;
          max-height: 400px;
          min-height: 280px;
          text-decoration: none;
          display: block;
          /* Depth: outer ambient shadow + tight inner light suggestion */
          box-shadow:
            0 12px 64px rgba(6,4,2,0.85),
            0 3px 16px  rgba(6,4,2,0.60),
            0 1px 4px   rgba(6,4,2,0.45),
            inset 0 1px 0 rgba(212,180,131,0.14),
            inset 0 -1px 0 rgba(6,4,2,0.70),
            inset 1px 0 0 rgba(212,180,131,0.04),
            inset -1px 0 0 rgba(212,180,131,0.04);
          /* Card enters slowly, exits even more slowly — luxury never rushes away */
          transition:
            border-color   1.4s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow     1.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform      1.8s cubic-bezier(0.22, 0.8, 0.32, 1);
        }
        .ae-card:hover {
          border-color: rgba(184,150,62,0.70);
          transform: translateY(-3px);
          box-shadow:
            0 28px 88px rgba(6,4,2,0.90),
            0 10px 32px rgba(6,4,2,0.65),
            0 3px 10px  rgba(6,4,2,0.50),
            inset 0 1px 0 rgba(212,180,131,0.24),
            inset 0 -1px 0 rgba(6,4,2,0.75),
            inset 1px 0 0 rgba(212,180,131,0.07),
            inset -1px 0 0 rgba(212,180,131,0.07);
        }
        .ae-card:focus-visible {
          border-color: rgba(184,150,62,0.85);
          outline: 1px solid var(--gold);
          outline-offset: 5px;
          transform: translateY(-3px);
          box-shadow:
            0 28px 88px rgba(6,4,2,0.90),
            0 10px 32px rgba(6,4,2,0.65),
            inset 0 1px 0 rgba(212,180,131,0.24);
        }

        /* Card inner image */
        .ae-card-img {
          position: absolute;
          inset: -6%;
          background-size: cover;
          background-position: center top;
          filter: brightness(0.55) contrast(1.08) saturate(0.65) sepia(0.12);
          transition:
            transform 2.8s cubic-bezier(0.22, 0.8, 0.32, 1),
            filter    2.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ae-card:hover .ae-card-img,
        .ae-card:focus-visible .ae-card-img {
          transform: scale(1.04);
          filter: brightness(0.44) contrast(1.12) saturate(0.58) sepia(0.16);
        }

        /* Card gradient — five-stop cinematic depth */
        .ae-card-grad {
          position: absolute;
          inset: 0;
          z-index: 1;
          transition: opacity 2.0s cubic-bezier(0.4, 0, 0.2, 1);
          /* Primary depth gradient */
          background: linear-gradient(
            to bottom,
            rgba(14,10,7,0.22)  0%,
            rgba(14,10,7,0.04) 22%,
            rgba(14,10,7,0.0)  42%,
            rgba(14,10,7,0.48) 72%,
            rgba(8,5,3,0.84)  100%
          );
        }
        /* Subtle gold ambient — top edge only, simulates reflected light */
        .ae-card-grad::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(184,150,62,0.07) 0%,
            transparent 28%
          );
          opacity: 0;
          transition: opacity 2.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* Inner shadow — bottom and sides, frames the image */
        .ae-card-grad::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow:
            inset 0 0 50px rgba(6,4,2,0.50),
            inset 0 -20px 40px rgba(6,4,2,0.25);
          transition: box-shadow 2.0s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ae-card:hover .ae-card-grad,
        .ae-card:focus-visible .ae-card-grad {
          background: linear-gradient(
            to bottom,
            rgba(14,10,7,0.32)  0%,
            rgba(14,10,7,0.06) 22%,
            rgba(14,10,7,0.0)  40%,
            rgba(14,10,7,0.60) 70%,
            rgba(8,5,3,0.92)  100%
          );
        }
        .ae-card:hover .ae-card-grad::before,
        .ae-card:focus-visible .ae-card-grad::before { opacity: 1; }
        .ae-card:hover .ae-card-grad::after,
        .ae-card:focus-visible .ae-card-grad::after {
          box-shadow:
            inset 0 0 72px rgba(6,4,2,0.68),
            inset 0 -24px 52px rgba(6,4,2,0.35);
        }

        /* Card content */
        .ae-card-body {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 0 20px 28px;
          text-align: center;
        }

        .ae-card-super {
          font-family: var(--font-aamira-display), serif;
          font-style: italic;
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212,180,131,0.72);
          margin-bottom: 4px;
          padding-right: 0.22em;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
        }

        .ae-card-title {
          font-family: var(--font-aamira-display), serif;
          font-size: clamp(38px, 5.2vw, 62px);
          font-weight: 300;
          letter-spacing: 0.06em;
          color: var(--ivory);
          line-height: 0.9;
          margin-bottom: 10px;
          padding-right: 0.06em;
          font-feature-settings: 'kern' 1;
          -webkit-font-smoothing: antialiased;
          text-shadow:
            0 2px 24px rgba(8,5,3,0.80),
            0 1px 4px  rgba(8,5,3,0.60);
        }

        .ae-card-sub {
          font-family: var(--font-aamira-body), sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(240,235,225,0.45);
          margin-bottom: 20px;
          padding-right: 0.38em;
          -webkit-font-smoothing: antialiased;
        }

        /* Card CTA — underline style */
        .ae-card-cta {
          font-family: var(--font-aamira-body), sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(240,235,225,0.6);
          padding-right: 0.32em;
          position: relative;
          transition: color 1.1s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-font-smoothing: antialiased;
        }
        .ae-card-cta::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(240,235,225,0.35);
          transition: background 1.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ae-card:hover .ae-card-cta,
        .ae-card:focus-visible .ae-card-cta { color: var(--ivory); }
        .ae-card:hover .ae-card-cta::after,
        .ae-card:focus-visible .ae-card-cta::after { background: var(--gold); }

        /* Corner brackets — restrained reveal, no growth flash */
        .ae-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          z-index: 3;
          opacity: 0;
          transition:
            opacity  1.6s cubic-bezier(0.4, 0, 0.2, 1),
            width    1.8s cubic-bezier(0.22, 0.8, 0.32, 1),
            height   1.8s cubic-bezier(0.22, 0.8, 0.32, 1);
        }
        .ae-card:hover .ae-corner,
        .ae-card:focus-visible .ae-corner { opacity: 1; width: 22px; height: 22px; }
        .ae-corner-tl { top: 10px;    left: 10px;  border-top: 1px solid rgba(184,150,62,0.80); border-left:  1px solid rgba(184,150,62,0.80); }
        .ae-corner-tr { top: 10px;    right: 10px; border-top: 1px solid rgba(184,150,62,0.80); border-right: 1px solid rgba(184,150,62,0.80); }
        .ae-corner-bl { bottom: 10px; left: 10px;  border-bottom: 1px solid rgba(184,150,62,0.80); border-left:  1px solid rgba(184,150,62,0.80); }
        .ae-corner-br { bottom: 10px; right: 10px; border-bottom: 1px solid rgba(184,150,62,0.80); border-right: 1px solid rgba(184,150,62,0.80); }

        /* ── Footer monogram + tagline ── */
        .ae-footer {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 40px 32px;
          gap: 14px;
        }

        /* Monogram SVG mark */
        .ae-monogram {
          opacity: 0.62;
          transition: opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1),
                      filter  1.4s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 0 8px rgba(184,150,62,0.0));
        }
        .ae-monogram:hover {
          opacity: 0.90;
          filter: drop-shadow(0 0 10px rgba(184,150,62,0.22));
        }

        .ae-tagline {
          font-family: var(--font-aamira-body), sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.44em;
          text-transform: uppercase;
          color: rgba(158,148,136,0.55);
          padding-right: 0.44em;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) and (min-width: 681px) {
          .ae-main { padding-inline: 28px; }
          .ae-cards { max-width: 650px; }
          .ae-or { width: 64px; }
          .ae-card-title { font-size: clamp(38px, 7vw, 54px); }
        }

        @media (max-height: 760px) and (min-width: 681px) {
          .ae-nav { padding-block: 20px; }
          .ae-logo-block { margin-bottom: 12px; }
          .ae-eyebrow { margin-bottom: 28px; }
          .ae-card { min-height: 220px; max-height: 310px; }
          .ae-footer { padding-block: 18px 22px; }
        }

        @media (max-width: 680px) {
          .ae-root { min-height: 100dvh; overflow-y: auto; }
          .ae-cards {
            flex-direction: column;
            gap: 12px;
            max-width: 360px;
          }
          .ae-or { flex-direction: row; width: auto; gap: 12px; }
          .ae-or-line { width: 28px; height: 1px; background: linear-gradient(to right, transparent, rgba(184,150,62,0.4)) !important; }
          .ae-or-line.bot { background: linear-gradient(to left, transparent, rgba(184,150,62,0.4)) !important; }
          .ae-card {
            aspect-ratio: auto;
            width: 100%;
            height: clamp(160px, 24dvh, 205px);
            min-height: 160px;
            max-height: 205px;
          }
          .ae-card-body { padding-bottom: 18px; }
          .ae-card-super { font-size: 11px; }
          .ae-card-title { font-size: clamp(38px, 12vw, 52px); margin-bottom: 7px; }
          .ae-card-sub { font-size: 9px; margin-bottom: 13px; }
          .ae-card-cta { font-size: 9px; }
          .ae-nav { padding: 18px 20px; }
          .ae-main { padding: 6px 20px 0; justify-content: flex-start; }
          .ae-logo-block { margin-bottom: 12px; }
          .ae-eyebrow { margin-bottom: 24px; font-size: 10px; }
          .ae-footer { padding: 18px 20px 24px; gap: 10px; }
          .ae-logotype { letter-spacing: 0.36em; font-size: clamp(28px, 8vw, 48px); padding-right: 0.36em; }
          .ae-tagline { font-size: 9px; letter-spacing: .3em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ae-fade {
            opacity: 1;
            transform: none;
            animation: none;
          }
          .ae-card,
          .ae-card-img,
          .ae-card-grad,
          .ae-card-grad::before,
          .ae-card-grad::after,
          .ae-card-cta,
          .ae-card-cta::after,
          .ae-corner,
          .ae-nav-link,
          .ae-nav-link::after,
          .ae-monogram {
            transition: none;
          }
        }
      `}</style>

      {/* Ambient bg */}
      <div className="ae-bg" />
      {/* Film grain */}
      <div className="ae-grain" />
      {/* Radial vignette */}
      <div className="ae-vignette" />

      <div className={`ae-root ${cormorant.variable} ${jost.variable}`}>

        {/* ── NAV ── */}
        <nav className="ae-nav ae-fade ae-d0">
          <a href="/story" className="ae-nav-link">About Aamira</a>
        </nav>

        {/* ── MAIN ── */}
        <main className="ae-main">

          {/* Logotype */}
          <div className="ae-logo-block ae-fade ae-d1">
            <h1 className="ae-logotype">Aamira</h1>
            <div className="ae-logo-ornament">
              <div className="ae-orn-line" />
              {/* Diamond dot */}
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                <rect x="0" y="3" width="4.24" height="4.24" transform="rotate(-45 0 3)" fill="#B8963E" opacity="0.7" />
              </svg>
              <div className="ae-orn-line rev" />
            </div>
          </div>

          {/* Eyebrow */}
          <p className="ae-eyebrow ae-fade ae-d2">
            Choose Your Experience
          </p>

          {/* Cards */}
          <div className="ae-cards ae-fade ae-d3">

            {/* ── BRIDAL CARD ── */}
            <a
              href="/bridal"
              className="ae-card"
              aria-label="Enter Aamira Bridal"
            >
              <div
                className="ae-card-img"
                aria-hidden="true"
                style={{
                  backgroundImage: `url('/image/homepage/gambar1.png')`,
                  backgroundPosition: "center 10%",
                }}
              />
              <div className="ae-card-grad" />

              {/* Corner brackets */}
              <div className="ae-corner ae-corner-tl" />
              <div className="ae-corner ae-corner-tr" />
              <div className="ae-corner ae-corner-bl" />
              <div className="ae-corner ae-corner-br" />

              <div className="ae-card-body">
                <span className="ae-card-super">Aamira</span>
                <h2 className="ae-card-title">Bridal</h2>
                <p className="ae-card-sub">Luxury Couture</p>
                <span className="ae-card-cta">Enter Bridal</span>
              </div>
            </a>

            {/* ── OR DIVIDER ── */}
            <div className="ae-or ae-fade ae-d3" aria-hidden="true">
              <div className="ae-or-line" />
              <span className="ae-or-label">Or</span>
              <div className="ae-or-line bot" />
            </div>

            {/* ── BASIC CARD ── */}
            <a
              href="/basic"
              className="ae-card"
              aria-label="Enter Aamira Basic"
            >
              <div
                className="ae-card-img"
                aria-hidden="true"
                style={{
                  backgroundImage: `url('/image/homepage/gambar4.jpg')`,
                  backgroundPosition: "center 15%",
                  filter: "brightness(0.58) contrast(1.04) saturate(0.6) sepia(0.08)",
                }}
              />
              <div className="ae-card-grad" />

              {/* Corner brackets */}
              <div className="ae-corner ae-corner-tl" />
              <div className="ae-corner ae-corner-tr" />
              <div className="ae-corner ae-corner-bl" />
              <div className="ae-corner ae-corner-br" />

              <div className="ae-card-body">
                <span className="ae-card-super">Aamira</span>
                <h2 className="ae-card-title">Basic</h2>
                <p className="ae-card-sub">Ready-to-Wear</p>
                <span className="ae-card-cta">Enter Basic</span>
              </div>
            </a>

          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="ae-footer ae-fade ae-d5">
          {/* Monogram mark — stylised AAMIRA letterform */}
          <svg
            className="ae-monogram"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            {/* Left A stroke */}
            <path d="M4 30 L13 8 L18 20" stroke="#D4B483" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Right M stroke */}
            <path d="M18 20 L18 8 L26 20 L32 8" stroke="#D4B483" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Crossbar on A */}
            <path d="M8.5 22 L15.5 22" stroke="#D4B483" strokeWidth="0.7" strokeLinecap="round" />
            {/* Diamond top ornament */}
            <rect x="16.5" y="3.5" width="3" height="3" transform="rotate(45 18 5)" fill="#B8963E" opacity="0.7" />
          </svg>

          <p className="ae-tagline">Timeless Elegance. Made for You.</p>
        </footer>

      </div>
    </>
  );
}
