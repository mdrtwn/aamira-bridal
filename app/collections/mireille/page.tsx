"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const details = [
  {
    label: "Silhouette",
    value: "Soft Basque",
    copy: "A lengthened waist meets a full, controlled skirt for a silhouette that feels regal without rigidity.",
  },
  {
    label: "Textile",
    value: "Silk Mikado",
    copy: "Chosen for its quiet lustre and sculptural memory, allowing every fold to remain beautifully defined.",
  },
  {
    label: "Signature",
    value: "Hand-cut Florals",
    copy: "Dimensional petals are placed sparingly across the bodice, each finished by hand in the atelier.",
  },
];

export default function MireillePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

        .mir-root {
          --mir-ivory: #f3eee5;
          --mir-silk: #faf7f1;
          --mir-noir: #1b1815;
          --mir-coffee: #4e443d;
          --mir-dust: #91867b;
          --mir-gold: #aa8849;
          --mir-champagne: #d2b98b;
          background: var(--mir-silk);
          color: var(--mir-noir);
          overflow: hidden;
        }
        .mir-c { font-family: 'Cormorant Garamond', serif; }
        .mir-j { font-family: 'Jost', sans-serif; }
        .mir-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 1.35s cubic-bezier(.16,1,.3,1), transform 1.35s cubic-bezier(.16,1,.3,1);
        }
        .mir-reveal.on { opacity: 1; transform: none; }
        .mir-d1 { transition-delay: .2s; }
        .mir-d2 { transition-delay: .4s; }
        .mir-d3 { transition-delay: .6s; }

        .mir-hero {
          position: relative;
          min-height: 100svh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--mir-noir);
          overflow: hidden;
        }
        .mir-nav {
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          right: 0;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 30px 52px;
        }
        .mir-nav-link {
          color: rgba(243,238,229,.66);
          font-size: 8.5px;
          font-weight: 300;
          letter-spacing: .28em;
          text-decoration: none;
          text-transform: uppercase;
        }
        .mir-nav-link:last-child { justify-self: end; }
        .mir-logo {
          color: var(--mir-ivory);
          font-size: 18px;
          font-weight: 300;
          letter-spacing: .34em;
          text-transform: uppercase;
        }
        .mir-hero-image {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
        }
        .mir-hero-image-inner {
          position: absolute;
          inset: -4%;
          background: url('/image/homepage/gambar5.jpg') center 24% / cover;
          filter: brightness(.72) saturate(.52) contrast(1.04);
          transform: scale(1.025);
        }
        .mir-hero-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(27,24,21,.2), transparent 38%),
            linear-gradient(0deg, rgba(27,24,21,.58), transparent 44%);
        }
        .mir-hero-image-label {
          position: absolute;
          z-index: 2;
          left: 30px;
          bottom: 32px;
          color: rgba(243,238,229,.7);
          font-size: 8px;
          letter-spacing: .3em;
          text-transform: uppercase;
        }
        .mir-hero-copy {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 140px 7vw 90px;
          color: var(--mir-ivory);
        }
        .mir-hero-copy::before {
          content: '';
          position: absolute;
          top: 14%;
          right: -25%;
          width: 44vw;
          aspect-ratio: 1;
          border: 1px solid rgba(210,185,139,.1);
          border-radius: 50%;
        }
        .mir-index {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 30px;
          color: var(--mir-champagne);
          font-size: 8.5px;
          letter-spacing: .38em;
          text-transform: uppercase;
        }
        .mir-index::before { content: ''; width: 38px; height: 1px; background: var(--mir-gold); }
        .mir-title {
          position: relative;
          margin: 0;
          font-size: clamp(76px, 12vw, 176px);
          font-weight: 300;
          letter-spacing: -.045em;
          line-height: .76;
        }
        .mir-subtitle {
          position: relative;
          margin: 30px 0 0 24%;
          color: var(--mir-champagne);
          font-size: clamp(24px, 3.1vw, 43px);
          font-style: italic;
          font-weight: 300;
        }
        .mir-hero-description {
          position: relative;
          max-width: 390px;
          margin-top: 42px;
          color: rgba(243,238,229,.56);
          font-size: 12px;
          font-weight: 300;
          line-height: 1.9;
        }
        .mir-hero-number {
          position: absolute;
          right: 6vw;
          bottom: 5vh;
          color: transparent;
          -webkit-text-stroke: 1px rgba(210,185,139,.14);
          font-size: clamp(110px, 18vw, 260px);
          font-weight: 300;
          line-height: .7;
        }

        .mir-story {
          display: grid;
          grid-template-columns: .65fr 1.35fr;
          gap: 8vw;
          padding: 145px 9vw 155px;
          background: var(--mir-silk);
        }
        .mir-story-aside {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          padding-top: 12px;
        }
        .mir-story-aside span {
          color: var(--mir-gold);
          font-size: 8.5px;
          letter-spacing: .34em;
          text-transform: uppercase;
        }
        .mir-story-line { width: 1px; height: 100px; margin-left: 4px; background: linear-gradient(var(--mir-gold), transparent); }
        .mir-story-title {
          max-width: 810px;
          margin: 0;
          font-size: clamp(42px, 6vw, 82px);
          font-weight: 300;
          line-height: 1.02;
        }
        .mir-story-title em { color: var(--mir-gold); font-weight: 300; }
        .mir-story-copy {
          max-width: 690px;
          margin-top: 42px;
          color: #6e655d;
          font-size: 13px;
          font-weight: 300;
          line-height: 2;
        }
        .mir-story-signature {
          display: block;
          margin-top: 30px;
          color: var(--mir-dust);
          font-size: 22px;
          font-style: italic;
        }

        .mir-editorial {
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          min-height: 1050px;
          background: var(--mir-ivory);
        }
        .mir-editorial-main {
          position: relative;
          min-height: 1050px;
          overflow: hidden;
        }
        .mir-editorial-main-image {
          position: absolute;
          inset: -3%;
          background: url('/image/homepage/gambar4.jpg') center 22% / cover;
          filter: saturate(.58) contrast(.98);
          transition: transform 1.4s cubic-bezier(.16,1,.3,1);
        }
        .mir-editorial-main:hover .mir-editorial-main-image { transform: scale(1.035); }
        .mir-editorial-side {
          display: grid;
          grid-template-rows: 1fr 1fr;
        }
        .mir-editorial-quote {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 7vw;
          background: var(--mir-noir);
          overflow: hidden;
        }
        .mir-editorial-quote::before {
          content: '05';
          position: absolute;
          right: -2vw;
          bottom: -3vw;
          color: transparent;
          -webkit-text-stroke: 1px rgba(210,185,139,.1);
          font: 300 18vw 'Cormorant Garamond',serif;
          line-height: .7;
        }
        .mir-quote-mark { color: var(--mir-gold); font-size: 64px; font-weight: 300; line-height: .5; }
        .mir-quote {
          position: relative;
          max-width: 480px;
          margin: 30px 0 28px;
          color: var(--mir-ivory);
          font-size: clamp(31px, 3.7vw, 52px);
          font-style: italic;
          font-weight: 300;
          line-height: 1.08;
        }
        .mir-quote-note { color: var(--mir-dust); font-size: 8px; letter-spacing: .29em; text-transform: uppercase; }
        .mir-editorial-small {
          position: relative;
          min-height: 500px;
          overflow: hidden;
        }
        .mir-editorial-small-image {
          position: absolute;
          inset: -3%;
          background: url('/image/homepage/gambar6.jpg') center 35% / cover;
          filter: saturate(.55) brightness(.88);
          transition: transform 1.4s cubic-bezier(.16,1,.3,1);
        }
        .mir-editorial-small:hover .mir-editorial-small-image { transform: scale(1.035); }
        .mir-photo-label {
          position: absolute;
          z-index: 2;
          left: 26px;
          bottom: 24px;
          color: rgba(255,255,255,.74);
          font-size: 8px;
          letter-spacing: .27em;
          text-transform: uppercase;
        }

        .mir-details {
          padding: 140px 8vw;
          background: var(--mir-silk);
        }
        .mir-details-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 70px;
        }
        .mir-details-kicker { color: var(--mir-gold); font-size: 8.5px; letter-spacing: .35em; text-transform: uppercase; }
        .mir-details-title { max-width: 620px; margin: 18px 0 0; font-size: clamp(39px, 5vw, 68px); font-weight: 300; line-height: 1; }
        .mir-details-note { max-width: 260px; color: var(--mir-dust); font-size: 11px; font-weight: 300; line-height: 1.8; text-align: right; }
        .mir-details-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid rgba(27,24,21,.14); }
        .mir-detail { padding: 44px 4vw 24px; border-right: 1px solid rgba(27,24,21,.14); }
        .mir-detail:first-child { padding-left: 0; }
        .mir-detail:last-child { padding-right: 0; border-right: 0; }
        .mir-detail-label { color: var(--mir-gold); font-size: 8px; letter-spacing: .3em; text-transform: uppercase; }
        .mir-detail-value { margin: 22px 0 15px; font-size: clamp(27px, 3vw, 40px); font-weight: 300; }
        .mir-detail-copy { color: var(--mir-dust); font-size: 12px; font-weight: 300; line-height: 1.85; }

        .mir-cta {
          position: relative;
          min-height: 78vh;
          display: grid;
          place-items: center;
          padding: 110px 24px;
          text-align: center;
          background: var(--mir-noir);
          overflow: hidden;
        }
        .mir-cta::before, .mir-cta::after {
          content: '';
          position: absolute;
          width: min(54vw, 720px);
          aspect-ratio: 1;
          border: 1px solid rgba(210,185,139,.1);
          border-radius: 50%;
        }
        .mir-cta::after { width: min(36vw, 480px); }
        .mir-cta-inner { position: relative; z-index: 1; }
        .mir-cta-kicker { color: var(--mir-champagne); font-size: 8.5px; letter-spacing: .38em; text-transform: uppercase; }
        .mir-cta-title { margin: 27px 0 40px; color: var(--mir-ivory); font-size: clamp(46px, 7vw, 94px); font-weight: 300; line-height: .95; }
        .mir-cta-title em { color: var(--mir-champagne); font-weight: 300; }
        .mir-button {
          display: inline-flex;
          align-items: center;
          gap: 17px;
          padding: 18px 34px;
          border: 1px solid rgba(210,185,139,.52);
          color: var(--mir-ivory);
          font-size: 9px;
          letter-spacing: .28em;
          text-decoration: none;
          text-transform: uppercase;
          transition: background .4s ease;
        }
        .mir-button:hover { background: rgba(210,185,139,.1); }
        .mir-bottom-nav { display: grid; grid-template-columns: 1fr 1fr; background: var(--mir-silk); }
        .mir-bottom-link { padding: 48px 6vw; color: var(--mir-noir); text-decoration: none; border-right: 1px solid rgba(27,24,21,.12); }
        .mir-bottom-link:last-child { text-align: right; border-right: 0; }
        .mir-bottom-link small { display: block; margin-bottom: 10px; color: var(--mir-dust); font: 300 8px 'Jost',sans-serif; letter-spacing: .28em; text-transform: uppercase; }
        .mir-bottom-link span { font: 300 clamp(26px,3vw,41px) 'Cormorant Garamond',serif; }

        @media (max-width: 800px) {
          .mir-nav { padding: 24px 20px; }
          .mir-nav-link:last-child { display: none; }
          .mir-logo { grid-column: 3; justify-self: end; font-size: 14px; }
          .mir-hero { grid-template-columns: 1fr; }
          .mir-hero-image { min-height: 64svh; }
          .mir-hero-copy { min-height: 68svh; padding: 100px 24px 70px; }
          .mir-title { font-size: clamp(76px,27vw,118px); }
          .mir-subtitle { margin-left: 12%; }
          .mir-hero-number { right: 20px; bottom: 30px; font-size: 38vw; }
          .mir-story { grid-template-columns: 1fr; gap: 36px; padding: 90px 24px; }
          .mir-story-aside { flex-direction: row; align-items: center; }
          .mir-story-line { width: 70px; height: 1px; margin: 0; background: linear-gradient(90deg,var(--mir-gold),transparent); }
          .mir-editorial { grid-template-columns: 1fr; min-height: auto; }
          .mir-editorial-main { min-height: 115vw; }
          .mir-editorial-quote { min-height: 72svh; padding: 80px 24px; }
          .mir-editorial-small { min-height: 75vw; }
          .mir-details { padding: 90px 24px; }
          .mir-details-head { display: block; }
          .mir-details-note { margin-top: 28px; text-align: left; }
          .mir-details-grid { grid-template-columns: 1fr; }
          .mir-detail, .mir-detail:first-child, .mir-detail:last-child { padding: 35px 0; border-right: 0; border-bottom: 1px solid rgba(27,24,21,.14); }
          .mir-detail:last-child { border-bottom: 0; }
          .mir-cta::before { width: 125vw; }
          .mir-cta::after { width: 82vw; }
          .mir-bottom-nav { grid-template-columns: 1fr; }
          .mir-bottom-link, .mir-bottom-link:last-child { text-align: left; border-right: 0; border-bottom: 1px solid rgba(27,24,21,.12); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mir-reveal, .mir-editorial-main-image, .mir-editorial-small-image { transition: none; }
        }
      `}</style>

      <main className="mir-root">
        <section className="mir-hero">
          <nav className={`mir-nav mir-j mir-reveal ${loaded ? "on" : ""}`} aria-label="Collection navigation">
            <Link href="/bridal" className="mir-nav-link">Aamira Bridal</Link>
            <span className="mir-c mir-logo">Aamira</span>
            <Link href="/book-appointment" className="mir-nav-link">Private Appointment</Link>
          </nav>

          <div className="mir-hero-image">
            <div className="mir-hero-image-inner" />
            <span className="mir-j mir-hero-image-label">The Signature Collection · V</span>
          </div>

          <div className="mir-hero-copy">
            <p className={`mir-j mir-index mir-reveal ${loaded ? "on" : ""}`}>Signature Silhouettes · No. 05</p>
            <h1 className={`mir-c mir-title mir-reveal mir-d1 ${loaded ? "on" : ""}`}>Mireille</h1>
            <p className={`mir-c mir-subtitle mir-reveal mir-d2 ${loaded ? "on" : ""}`}>Quiet opulence</p>
            <p className={`mir-j mir-hero-description mir-reveal mir-d3 ${loaded ? "on" : ""}`}>
              A study in restrained grandeur, where sculpted silk and hand-cut florals hold the attention softly.
            </p>
            <span className="mir-c mir-hero-number">05</span>
          </div>
        </section>

        <section className="mir-story">
          <div className="mir-story-aside">
            <span className="mir-j">The story</span>
            <div className="mir-story-line" />
          </div>
          <div>
            <h2 className="mir-c mir-story-title">
              Grandeur, spoken<br /><em>in a quieter voice.</em>
            </h2>
            <p className="mir-j mir-story-copy">
              Mireille is made for the bride drawn to presence rather than spectacle. Its silk
              Mikado holds a clean, architectural line, softened by petals cut and shaped entirely
              by hand. From a distance, the silhouette is composed and certain. Up close, its
              tenderness reveals itself slowly—in the curve of the waist, the depth of a fold,
              and the subtle irregularity of every flower.
            </p>
            <span className="mir-c mir-story-signature">A gown to be discovered, not announced.</span>
          </div>
        </section>

        <section className="mir-editorial" aria-label="Mireille editorial gallery">
          <div className="mir-editorial-main">
            <div className="mir-editorial-main-image" />
            <span className="mir-j mir-photo-label">Portrait I · The silhouette</span>
          </div>
          <div className="mir-editorial-side">
            <div className="mir-editorial-quote">
              <span className="mir-c mir-quote-mark">“</span>
              <blockquote className="mir-c mir-quote">Opulence becomes timeless when nothing asks to be noticed.</blockquote>
              <span className="mir-j mir-quote-note">The Aamira atelier</span>
            </div>
            <div className="mir-editorial-small">
              <div className="mir-editorial-small-image" />
              <span className="mir-j mir-photo-label">Portrait II · Hand-finished detail</span>
            </div>
          </div>
        </section>

        <section className="mir-details">
          <div className="mir-details-head">
            <div>
              <p className="mir-j mir-details-kicker">Anatomy of Mireille</p>
              <h2 className="mir-c mir-details-title">Considered from every angle.</h2>
            </div>
            <p className="mir-j mir-details-note">Each detail can be adapted during a private consultation with the atelier.</p>
          </div>
          <div className="mir-details-grid">
            {details.map((detail) => (
              <article className="mir-detail" key={detail.label}>
                <span className="mir-j mir-detail-label">{detail.label}</span>
                <h3 className="mir-c mir-detail-value">{detail.value}</h3>
                <p className="mir-j mir-detail-copy">{detail.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mir-cta">
          <div className="mir-cta-inner">
            <p className="mir-j mir-cta-kicker">By private appointment</p>
            <h2 className="mir-c mir-cta-title">Meet <em>Mireille</em><br />in the atelier.</h2>
            <Link href="/book-appointment" className="mir-j mir-button">Book a consultation <span>→</span></Link>
          </div>
        </section>

        <nav className="mir-bottom-nav" aria-label="Browse bridal collections">
          <Link href="/collections/lumiere" className="mir-bottom-link"><small>Previous silhouette</small><span>Lumière</span></Link>
          <Link href="/collections/seraphine" className="mir-bottom-link"><small>Next silhouette</small><span>Seraphine</span></Link>
        </nav>
      </main>
    </>
  );
}
