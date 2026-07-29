"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const craft = [
  ["01", "Illuminated Tulle", "Layers of translucent tulle hold and diffuse light across the silhouette."],
  ["02", "Hand-set Crystal", "Crystals are placed individually to create radiance without a uniform pattern."],
  ["03", "Midnight Structure", "A precise internal corset gives definition beneath an otherwise weightless surface."],
];

export default function LumierePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

        .lum-root {
          --lum-night: #0e0d0c;
          --lum-charcoal: #191714;
          --lum-ivory: #f1ece3;
          --lum-champagne: #d2b986;
          --lum-gold: #9f7e3d;
          --lum-smoke: #9c958a;
          background: var(--lum-night);
          color: var(--lum-ivory);
          overflow: hidden;
        }
        .lum-c { font-family: 'Cormorant Garamond', serif; }
        .lum-j { font-family: 'Jost', sans-serif; }
        .lum-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 1.4s cubic-bezier(.16,1,.3,1), transform 1.4s cubic-bezier(.16,1,.3,1);
        }
        .lum-reveal.show { opacity: 1; transform: none; }
        .lum-d1 { transition-delay: .2s; }
        .lum-d2 { transition-delay: .42s; }
        .lum-d3 { transition-delay: .64s; }

        .lum-hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: var(--lum-night);
        }
        .lum-hero-image {
          position: absolute;
          inset: -4%;
          background: url('/image/wedding/hero.webp') center 23% / cover;
          filter: brightness(.42) saturate(.48) contrast(1.12);
          transform: scale(1.025);
        }
        .lum-hero-shade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 70% 30%, rgba(210,185,134,.22), transparent 24%),
            linear-gradient(90deg, rgba(8,7,6,.92) 0%, rgba(8,7,6,.42) 45%, transparent 76%),
            linear-gradient(0deg, rgba(8,7,6,.9), transparent 48%);
        }
        .lum-grain {
          position: absolute;
          inset: 0;
          opacity: .045;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .lum-nav {
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 52px;
        }
        .lum-logo { color: var(--lum-champagne); font-size: 18px; font-weight: 300; letter-spacing: .32em; text-transform: uppercase; }
        .lum-nav-group { display: flex; align-items: center; gap: 34px; }
        .lum-nav-link {
          color: rgba(241,236,227,.66);
          font-size: 8.5px;
          font-weight: 300;
          letter-spacing: .27em;
          text-decoration: none;
          text-transform: uppercase;
        }
        .lum-hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 140px 7vw 9vh;
        }
        .lum-kicker {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 25px;
          color: var(--lum-champagne);
          font-size: 8.5px;
          letter-spacing: .38em;
          text-transform: uppercase;
        }
        .lum-kicker::before { content: ''; width: 48px; height: 1px; background: var(--lum-gold); }
        .lum-title {
          position: relative;
          margin: 0;
          font-size: clamp(82px, 15vw, 215px);
          font-weight: 300;
          letter-spacing: -.04em;
          line-height: .74;
          text-shadow: 0 4px 80px rgba(0,0,0,.45);
        }
        .lum-accent {
          position: absolute;
          left: 53%;
          bottom: 10%;
          color: transparent;
          -webkit-text-stroke: 1px rgba(210,185,134,.52);
          font-size: clamp(60px, 10vw, 150px);
          font-style: italic;
          font-weight: 300;
          line-height: .75;
        }
        .lum-hero-meta {
          display: flex;
          gap: 30px;
          margin-top: 54px;
          color: rgba(241,236,227,.52);
          font-size: 8px;
          letter-spacing: .24em;
          text-transform: uppercase;
        }
        .lum-scroll {
          position: absolute;
          z-index: 3;
          right: 48px;
          bottom: 9vh;
          display: flex;
          align-items: center;
          gap: 15px;
          color: rgba(241,236,227,.46);
          font-size: 8px;
          letter-spacing: .3em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }
        .lum-scroll::after { content: ''; width: 1px; height: 58px; background: linear-gradient(var(--lum-champagne),transparent); }

        .lum-statement {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 78vh;
          padding: 130px 24px;
          text-align: center;
          background: var(--lum-night);
        }
        .lum-orbit {
          position: absolute;
          width: min(52vw, 680px);
          aspect-ratio: 1;
          border: 1px solid rgba(210,185,134,.1);
          border-radius: 50%;
        }
        .lum-orbit::before, .lum-orbit::after {
          content: '';
          position: absolute;
          border: 1px solid rgba(210,185,134,.07);
          border-radius: 50%;
        }
        .lum-orbit::before { inset: 12%; }
        .lum-orbit::after { inset: 26%; }
        .lum-statement-inner { position: relative; z-index: 1; max-width: 900px; }
        .lum-statement-label { color: var(--lum-gold); font-size: 8.5px; letter-spacing: .4em; text-transform: uppercase; }
        .lum-statement-title { margin: 34px 0; font-size: clamp(42px, 6.3vw, 88px); font-weight: 300; line-height: 1; }
        .lum-statement-title em { color: var(--lum-champagne); font-weight: 300; }
        .lum-statement-copy { max-width: 590px; margin: 0 auto; color: var(--lum-smoke); font-size: 12.5px; font-weight: 300; line-height: 2; }

        .lum-gallery {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 55vw 34vw;
          gap: 2px;
          background: var(--lum-gold);
        }
        .lum-image { position: relative; overflow: hidden; background: var(--lum-charcoal); }
        .lum-image-inner {
          position: absolute;
          inset: -3%;
          background-size: cover;
          background-position: center;
          filter: brightness(.7) saturate(.55);
          transition: transform 1.5s cubic-bezier(.16,1,.3,1), filter 1.2s ease;
        }
        .lum-image:hover .lum-image-inner { transform: scale(1.04); filter: brightness(.82) saturate(.62); }
        .lum-image-one { grid-row: 1 / 3; }
        .lum-image-one .lum-image-inner { background-image: url('/image/wedding/bawah.webp'); background-position: center 24%; }
        .lum-image-two .lum-image-inner { background-image: url('/image/homepage/gambar3.jpg'); background-position: center 28%; }
        .lum-image-three .lum-image-inner { background-image: url('/image/wedding/bawah1.webp'); background-position: center 40%; }
        .lum-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(8,7,6,.55), transparent 38%);
        }
        .lum-image-label {
          position: absolute;
          z-index: 2;
          left: 28px;
          bottom: 25px;
          color: rgba(241,236,227,.72);
          font-size: 8px;
          letter-spacing: .3em;
          text-transform: uppercase;
        }

        .lum-craft {
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          gap: 8vw;
          padding: 145px 8vw;
          background: var(--lum-ivory);
          color: var(--lum-night);
        }
        .lum-craft-intro { position: sticky; top: 50px; align-self: start; }
        .lum-craft-kicker { color: var(--lum-gold); font-size: 8.5px; letter-spacing: .36em; text-transform: uppercase; }
        .lum-craft-title { margin: 27px 0 0; font-size: clamp(42px, 5.5vw, 74px); font-weight: 300; line-height: .98; }
        .lum-craft-title em { display: block; color: var(--lum-gold); font-weight: 300; }
        .lum-craft-list { border-top: 1px solid rgba(14,13,12,.14); }
        .lum-craft-item {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 30px;
          padding: 42px 0;
          border-bottom: 1px solid rgba(14,13,12,.14);
        }
        .lum-craft-number { color: var(--lum-gold); font-size: 9px; letter-spacing: .25em; }
        .lum-craft-name { margin: 0 0 12px; font-size: clamp(26px, 3vw, 39px); font-weight: 300; }
        .lum-craft-copy { max-width: 480px; color: #706a61; font-size: 12px; font-weight: 300; line-height: 1.85; }

        .lum-cta {
          position: relative;
          min-height: 85vh;
          display: grid;
          place-items: center;
          padding: 120px 24px;
          text-align: center;
          background: var(--lum-charcoal);
          overflow: hidden;
        }
        .lum-cta-light {
          position: absolute;
          top: -40%;
          left: 50%;
          width: 52vw;
          height: 100%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(210,185,134,.22), transparent 67%);
          filter: blur(16px);
        }
        .lum-cta-inner { position: relative; z-index: 1; }
        .lum-cta-kicker { color: var(--lum-champagne); font-size: 8.5px; letter-spacing: .38em; text-transform: uppercase; }
        .lum-cta-title { margin: 28px 0 42px; font-size: clamp(48px, 7vw, 96px); font-weight: 300; line-height: .95; }
        .lum-cta-title em { color: var(--lum-champagne); font-weight: 300; }
        .lum-button {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 18px 34px;
          border: 1px solid rgba(210,185,134,.48);
          color: var(--lum-ivory);
          font-size: 9px;
          letter-spacing: .28em;
          text-decoration: none;
          text-transform: uppercase;
          transition: background .4s ease;
        }
        .lum-button:hover { background: rgba(210,185,134,.1); }
        .lum-bottom { display: grid; grid-template-columns: 1fr 1fr; background: var(--lum-night); }
        .lum-bottom-link { padding: 48px 6vw; color: var(--lum-ivory); text-decoration: none; border-right: 1px solid rgba(241,236,227,.1); }
        .lum-bottom-link:last-child { border-right: 0; text-align: right; }
        .lum-bottom-link small { display: block; margin-bottom: 10px; color: var(--lum-smoke); font: 300 8px 'Jost',sans-serif; letter-spacing: .27em; text-transform: uppercase; }
        .lum-bottom-link span { font: 300 clamp(25px,3vw,40px) 'Cormorant Garamond',serif; }

        @media (max-width: 780px) {
          .lum-nav { padding: 24px 20px; }
          .lum-nav-group .lum-nav-link:first-child { display: none; }
          .lum-hero-shade { background: linear-gradient(0deg, rgba(8,7,6,.96), rgba(8,7,6,.05) 76%); }
          .lum-hero-content { padding: 130px 22px 80px; }
          .lum-title { font-size: clamp(76px,26vw,120px); }
          .lum-accent { position: static; display: block; margin: 16px 0 0 16%; font-size: 18vw; }
          .lum-hero-meta { flex-direction: column; gap: 10px; }
          .lum-scroll { display: none; }
          .lum-statement { min-height: auto; padding: 110px 24px; }
          .lum-orbit { width: 110vw; }
          .lum-gallery { grid-template-columns: 1fr 1fr; grid-template-rows: 120vw 58vw; }
          .lum-image-one { grid-column: 1 / 3; grid-row: 1; }
          .lum-craft { grid-template-columns: 1fr; padding: 90px 24px; }
          .lum-craft-intro { position: static; }
          .lum-craft-item { grid-template-columns: 42px 1fr; gap: 14px; }
          .lum-cta { min-height: 70svh; }
          .lum-cta-light { width: 120vw; }
          .lum-bottom { grid-template-columns: 1fr; }
          .lum-bottom-link, .lum-bottom-link:last-child { text-align: left; border-right: 0; border-bottom: 1px solid rgba(241,236,227,.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lum-reveal, .lum-image-inner { transition: none; }
        }
      `}</style>

      <main className="lum-root">
        <section className="lum-hero">
          <div className="lum-hero-image" />
          <div className="lum-hero-shade" />
          <div className="lum-grain" />
          <div className="lum-hero-content">
            <p className={`lum-j lum-kicker lum-reveal ${visible ? "show" : ""}`}>Signature Silhouettes · No. 04</p>
            <h1 className={`lum-c lum-title lum-reveal lum-d1 ${visible ? "show" : ""}`}>
              Lumière
              <span className="lum-accent">Dramatic radiance</span>
            </h1>
            <div className={`lum-j lum-hero-meta lum-reveal lum-d2 ${visible ? "show" : ""}`}>
              <span>Crystal tulle</span><span>Structured corsetry</span><span>Cathedral train</span>
            </div>
          </div>
          <span className="lum-j lum-scroll">Discover</span>
        </section>

        <section className="lum-statement">
          <div className="lum-orbit" />
          <div className="lum-statement-inner">
            <p className="lum-j lum-statement-label">A study in illumination</p>
            <h2 className="lum-c lum-statement-title">
              Designed for the moment<br /><em>light finds her.</em>
            </h2>
            <p className="lum-j lum-statement-copy">
              Lumière does not simply reflect light—it shapes it. Translucent layers, hand-set
              crystal, and a precise internal structure create a gown that changes from every
              angle, revealing its detail slowly as the bride moves through the room.
            </p>
          </div>
        </section>

        <section className="lum-gallery" aria-label="Lumière editorial gallery">
          <div className="lum-image lum-image-one"><div className="lum-image-inner" /><div className="lum-image-overlay" /><span className="lum-j lum-image-label">I · Silhouette</span></div>
          <div className="lum-image lum-image-two"><div className="lum-image-inner" /><div className="lum-image-overlay" /><span className="lum-j lum-image-label">II · Reflection</span></div>
          <div className="lum-image lum-image-three"><div className="lum-image-inner" /><div className="lum-image-overlay" /><span className="lum-j lum-image-label">III · Afterlight</span></div>
        </section>

        <section className="lum-craft">
          <div className="lum-craft-intro">
            <p className="lum-j lum-craft-kicker">The making of Lumière</p>
            <h2 className="lum-c lum-craft-title">Crafted<br /><em>in light.</em></h2>
          </div>
          <div className="lum-craft-list">
            {craft.map(([number, title, copy]) => (
              <article className="lum-craft-item" key={number}>
                <span className="lum-j lum-craft-number">{number}</span>
                <div>
                  <h3 className="lum-c lum-craft-name">{title}</h3>
                  <p className="lum-j lum-craft-copy">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lum-cta">
          <div className="lum-cta-light" />
          <div className="lum-cta-inner">
            <p className="lum-j lum-cta-kicker">Private atelier experience</p>
            <h2 className="lum-c lum-cta-title">Step into<br /><em>the light.</em></h2>
            <Link href="/book-appointment" className="lum-j lum-button">Experience Lumière <span>→</span></Link>
          </div>
        </section>

        <nav className="lum-bottom" aria-label="Browse bridal collections">
          <Link href="/collections/isadora" className="lum-bottom-link"><small>Previous silhouette</small><span>Isadora</span></Link>
          <Link href="/collections/mireille" className="lum-bottom-link"><small>Next silhouette</small><span>Mireille</span></Link>
        </nav>
      </main>
    </>
  );
}
