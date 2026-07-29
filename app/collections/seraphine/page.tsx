"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const construction = [
  ["Silhouette", "Romantic Ballgown", "A fitted corset opens into layers of soft tulle, creating volume with an almost weightless finish."],
  ["Surface", "Botanical Appliqué", "Hand-cut petals travel organically across the bodice and dissolve gradually into the skirt."],
  ["Finish", "Blush Underlay", "A muted blush layer warms the ivory tulle and gives the gown its soft, dimensional colour."],
];

export default function SeraphinePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

        .ser-root {
          --ser-ivory: #f5f0e8;
          --ser-silk: #fbf8f3;
          --ser-blush: #d9beb5;
          --ser-rose: #a97f78;
          --ser-noir: #1d1917;
          --ser-dust: #887b75;
          --ser-gold: #ac8950;
          background: var(--ser-silk);
          color: var(--ser-noir);
          overflow: hidden;
        }
        .ser-c { font-family: 'Cormorant Garamond', serif; }
        .ser-j { font-family: 'Jost', sans-serif; }
        .ser-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 1.3s cubic-bezier(.16,1,.3,1), transform 1.3s cubic-bezier(.16,1,.3,1);
        }
        .ser-reveal.on { opacity: 1; transform: none; }
        .ser-d1 { transition-delay: .2s; }
        .ser-d2 { transition-delay: .4s; }
        .ser-d3 { transition-delay: .6s; }

        /* Split hero: reuses the established Delara/Mireille composition */
        .ser-hero {
          position: relative;
          min-height: 100svh;
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          background: var(--ser-blush);
        }
        .ser-nav {
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
        .ser-nav-link {
          color: var(--ser-noir);
          font-size: 8.5px;
          font-weight: 300;
          letter-spacing: .28em;
          text-decoration: none;
          text-transform: uppercase;
        }
        .ser-nav-link:last-child { justify-self: end; }
        .ser-logo { font-size: 18px; font-weight: 300; letter-spacing: .34em; text-transform: uppercase; }
        .ser-hero-copy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 150px 6vw 10vh;
          overflow: hidden;
        }
        .ser-number {
          position: absolute;
          top: 14%;
          left: -5%;
          color: transparent;
          -webkit-text-stroke: 1px rgba(29,25,23,.12);
          font-size: clamp(160px, 27vw, 400px);
          font-weight: 300;
          line-height: .7;
        }
        .ser-kicker {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 25px;
          color: #76574f;
          font-size: 8.5px;
          letter-spacing: .36em;
          text-transform: uppercase;
        }
        .ser-kicker::before { content: ''; width: 36px; height: 1px; background: var(--ser-gold); }
        .ser-title {
          position: relative;
          margin: 0;
          font-size: clamp(74px, 11vw, 162px);
          font-weight: 300;
          letter-spacing: -.045em;
          line-height: .74;
        }
        .ser-subtitle {
          position: relative;
          margin: 28px 0 0 18%;
          color: #76574f;
          font-size: clamp(23px, 3vw, 42px);
          font-style: italic;
          font-weight: 300;
        }
        .ser-intro {
          position: relative;
          max-width: 390px;
          margin: 40px 0 0 auto;
          color: #675752;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.9;
        }
        .ser-hero-image { position: relative; min-height: 100svh; overflow: hidden; }
        .ser-hero-image-inner {
          position: absolute;
          inset: -3%;
          background: url('/image/homepage/gambar6.jpg') center 24% / cover;
          filter: saturate(.62) brightness(.96);
          transform: scale(1.025);
        }
        .ser-hero-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(217,190,181,.32), transparent 35%),
                      linear-gradient(0deg, rgba(29,25,23,.32), transparent 42%);
        }
        .ser-image-label {
          position: absolute;
          z-index: 2;
          right: 28px;
          bottom: 30px;
          color: rgba(255,255,255,.78);
          font-size: 8px;
          letter-spacing: .3em;
          text-transform: uppercase;
        }

        /* Airy story: reuses Isadora's spacious editorial rhythm */
        .ser-story {
          position: relative;
          display: grid;
          grid-template-columns: .55fr 1.45fr;
          gap: 8vw;
          padding: 150px 9vw;
        }
        .ser-story-label {
          padding-top: 10px;
          color: var(--ser-gold);
          font-size: 8.5px;
          letter-spacing: .35em;
          text-transform: uppercase;
        }
        .ser-story-title {
          max-width: 850px;
          margin: 0;
          font-size: clamp(42px, 6vw, 82px);
          font-weight: 300;
          line-height: 1.03;
        }
        .ser-story-title em { color: var(--ser-rose); font-weight: 300; }
        .ser-story-text {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 42px;
          max-width: 760px;
          margin-top: 46px;
          color: var(--ser-dust);
          font-size: 12.5px;
          font-weight: 300;
          line-height: 1.95;
        }

        /* Full-bleed gallery: reuses Lumière's image grid */
        .ser-gallery {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          grid-template-rows: 43vw 30vw;
          gap: 3px;
          background: var(--ser-rose);
        }
        .ser-photo { position: relative; overflow: hidden; background: var(--ser-noir); }
        .ser-photo-main { grid-row: 1 / 3; }
        .ser-photo-inner {
          position: absolute;
          inset: -3%;
          background-size: cover;
          background-position: center;
          filter: saturate(.62);
          transition: transform 1.4s cubic-bezier(.16,1,.3,1);
        }
        .ser-photo:hover .ser-photo-inner { transform: scale(1.04); }
        .ser-photo-main .ser-photo-inner { background-image: url('/image/homepage/gambar1.png'); background-position: center 20%; }
        .ser-photo-top .ser-photo-inner { background-image: url('/image/homepage/gambar3.jpg'); background-position: center 28%; }
        .ser-photo-bottom .ser-photo-inner { background-image: url('/image/wedding/bawah1.webp'); background-position: center 40%; }
        .ser-photo::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(29,25,23,.55), transparent 36%);
        }
        .ser-photo-label {
          position: absolute;
          z-index: 2;
          left: 25px;
          bottom: 22px;
          color: rgba(255,255,255,.75);
          font-size: 8px;
          letter-spacing: .28em;
          text-transform: uppercase;
        }

        /* Detail system: reuses Mireille's three-column anatomy section */
        .ser-details { padding: 135px 8vw; background: var(--ser-ivory); }
        .ser-details-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 66px;
        }
        .ser-details-kicker { color: var(--ser-gold); font-size: 8.5px; letter-spacing: .35em; text-transform: uppercase; }
        .ser-details-title { margin: 18px 0 0; font-size: clamp(38px, 5vw, 68px); font-weight: 300; line-height: 1; }
        .ser-details-note { max-width: 270px; color: var(--ser-dust); font-size: 11px; font-weight: 300; line-height: 1.8; text-align: right; }
        .ser-details-grid { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid rgba(29,25,23,.14); }
        .ser-detail { padding: 42px 4vw 22px; border-right: 1px solid rgba(29,25,23,.14); }
        .ser-detail:first-child { padding-left: 0; }
        .ser-detail:last-child { padding-right: 0; border-right: 0; }
        .ser-detail-label { color: var(--ser-gold); font-size: 8px; letter-spacing: .3em; text-transform: uppercase; }
        .ser-detail-value { margin: 22px 0 15px; font-size: clamp(27px,3vw,40px); font-weight: 300; }
        .ser-detail-copy { color: var(--ser-dust); font-size: 12px; font-weight: 300; line-height: 1.85; }

        .ser-cta {
          position: relative;
          min-height: 78vh;
          display: grid;
          place-items: center;
          padding: 110px 24px;
          text-align: center;
          background: var(--ser-noir);
          overflow: hidden;
        }
        .ser-cta::before {
          content: 'SERAPHINE';
          position: absolute;
          color: transparent;
          -webkit-text-stroke: 1px rgba(217,190,181,.08);
          font: 300 17vw 'Cormorant Garamond',serif;
          letter-spacing: .04em;
          white-space: nowrap;
        }
        .ser-cta-inner { position: relative; z-index: 1; }
        .ser-cta-kicker { color: var(--ser-blush); font-size: 8.5px; letter-spacing: .38em; text-transform: uppercase; }
        .ser-cta-title { margin: 28px 0 40px; color: var(--ser-ivory); font-size: clamp(46px,7vw,94px); font-weight: 300; line-height: .96; }
        .ser-cta-title em { color: var(--ser-blush); font-weight: 300; }
        .ser-button {
          display: inline-flex;
          align-items: center;
          gap: 17px;
          padding: 18px 34px;
          border: 1px solid rgba(217,190,181,.55);
          color: var(--ser-ivory);
          font-size: 9px;
          letter-spacing: .28em;
          text-decoration: none;
          text-transform: uppercase;
        }
        .ser-bottom-nav { display: grid; grid-template-columns: 1fr 1fr; }
        .ser-bottom-link { padding: 48px 6vw; color: var(--ser-noir); text-decoration: none; border-right: 1px solid rgba(29,25,23,.12); }
        .ser-bottom-link:last-child { text-align: right; border-right: 0; }
        .ser-bottom-link small { display: block; margin-bottom: 10px; color: var(--ser-dust); font: 300 8px 'Jost',sans-serif; letter-spacing: .28em; text-transform: uppercase; }
        .ser-bottom-link span { font: 300 clamp(26px,3vw,41px) 'Cormorant Garamond',serif; }

        @media (max-width: 800px) {
          .ser-nav { padding: 24px 20px; }
          .ser-nav-link:last-child { display: none; }
          .ser-logo { grid-column: 3; justify-self: end; font-size: 14px; }
          .ser-hero { grid-template-columns: 1fr; }
          .ser-hero-copy { min-height: 64svh; padding: 130px 24px 60px; }
          .ser-title { font-size: clamp(72px,26vw,112px); }
          .ser-hero-image { min-height: 68svh; }
          .ser-story { grid-template-columns: 1fr; gap: 34px; padding: 90px 24px; }
          .ser-story-text { grid-template-columns: 1fr; gap: 22px; }
          .ser-gallery { grid-template-columns: 1fr 1fr; grid-template-rows: 118vw 58vw; }
          .ser-photo-main { grid-column: 1 / 3; grid-row: 1; }
          .ser-details { padding: 90px 24px; }
          .ser-details-head { display: block; }
          .ser-details-note { margin-top: 26px; text-align: left; }
          .ser-details-grid { grid-template-columns: 1fr; }
          .ser-detail, .ser-detail:first-child, .ser-detail:last-child { padding: 34px 0; border-right: 0; border-bottom: 1px solid rgba(29,25,23,.14); }
          .ser-detail:last-child { border-bottom: 0; }
          .ser-cta { min-height: 68svh; }
          .ser-bottom-nav { grid-template-columns: 1fr; }
          .ser-bottom-link, .ser-bottom-link:last-child { text-align: left; border-right: 0; border-bottom: 1px solid rgba(29,25,23,.12); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ser-reveal, .ser-photo-inner { transition: none; }
        }
      `}</style>

      <main className="ser-root">
        <section className="ser-hero">
          <div className="ser-hero-copy">
            <span className="ser-c ser-number">06</span>
            <p className={`ser-j ser-kicker ser-reveal ${loaded ? "on" : ""}`}>Signature Silhouettes · No. 06</p>
            <h1 className={`ser-c ser-title ser-reveal ser-d1 ${loaded ? "on" : ""}`}>Seraphine</h1>
            <p className={`ser-c ser-subtitle ser-reveal ser-d2 ${loaded ? "on" : ""}`}>Poetry in bloom</p>
            <p className={`ser-j ser-intro ser-reveal ser-d3 ${loaded ? "on" : ""}`}>
              Botanical appliqué, weightless tulle, and a blush undertone composed as a modern romantic gesture.
            </p>
          </div>
          <div className="ser-hero-image">
            <div className="ser-hero-image-inner" />
            <span className="ser-j ser-image-label">Aamira Bridal · Collection VI</span>
          </div>
        </section>

        <section className="ser-story">
          <p className="ser-j ser-story-label">The story of Seraphine</p>
          <div>
            <h2 className="ser-c ser-story-title">Romance, allowed to grow<br /><em>wild and weightless.</em></h2>
            <div className="ser-j ser-story-text">
              <p>Seraphine begins with a garden imagined in motion. Petals rise from the corset and scatter across layers of tulle, placed by hand so no two areas feel repeated.</p>
              <p>Beneath the ivory surface, a blush underlay gives the gown warmth and depth. The result is expressive without becoming ornamental—a final silhouette filled with softness and life.</p>
            </div>
          </div>
        </section>

        <section className="ser-gallery" aria-label="Seraphine editorial gallery">
          <div className="ser-photo ser-photo-main"><div className="ser-photo-inner" /><span className="ser-j ser-photo-label">I · Bloom</span></div>
          <div className="ser-photo ser-photo-top"><div className="ser-photo-inner" /><span className="ser-j ser-photo-label">II · Form</span></div>
          <div className="ser-photo ser-photo-bottom"><div className="ser-photo-inner" /><span className="ser-j ser-photo-label">III · Movement</span></div>
        </section>

        <section className="ser-details">
          <div className="ser-details-head">
            <div>
              <p className="ser-j ser-details-kicker">Anatomy of Seraphine</p>
              <h2 className="ser-c ser-details-title">A garden made by hand.</h2>
            </div>
            <p className="ser-j ser-details-note">Appliqué placement and underlay tone can be personalised during an atelier consultation.</p>
          </div>
          <div className="ser-details-grid">
            {construction.map(([label, value, copy]) => (
              <article className="ser-detail" key={label}>
                <span className="ser-j ser-detail-label">{label}</span>
                <h3 className="ser-c ser-detail-value">{value}</h3>
                <p className="ser-j ser-detail-copy">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ser-cta">
          <div className="ser-cta-inner">
            <p className="ser-j ser-cta-kicker">By private appointment</p>
            <h2 className="ser-c ser-cta-title">Discover <em>Seraphine</em><br />in the atelier.</h2>
            <Link href="/book-appointment" className="ser-j ser-button">Book a consultation <span>→</span></Link>
          </div>
        </section>

        <nav className="ser-bottom-nav" aria-label="Browse bridal collections">
          <Link href="/collections/mireille" className="ser-bottom-link"><small>Previous silhouette</small><span>Mireille</span></Link>
          <Link href="/collections/celestine" className="ser-bottom-link"><small>Return to the beginning</small><span>Celestine</span></Link>
        </nav>
      </main>
    </>
  );
}
