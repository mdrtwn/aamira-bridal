"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const details = [
  ["Silhouette", "Sculpted Column", "A softly structured shape that traces the body before opening into a fluid train."],
  ["Construction", "Draped Satin", "Bias-cut panels and hand-placed folds create movement without excess volume."],
  ["Finishing", "Pearl Veil", "A detachable veil and subtle pearl work bring a quiet, luminous finish."],
];

export default function DelaraPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

        .del-root {
          --del-ink: #211a17;
          --del-rose: #c9a99c;
          --del-petal: #eadbd3;
          --del-paper: #f5eee8;
          --del-gold: #a88245;
          --del-mist: #7e706a;
          background: var(--del-paper);
          color: var(--del-ink);
          overflow: hidden;
        }
        .del-c { font-family: 'Cormorant Garamond', serif; }
        .del-j { font-family: 'Jost', sans-serif; }
        .del-enter {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1.2s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1);
        }
        .del-enter.on { opacity: 1; transform: none; }
        .del-d1 { transition-delay: .18s; }
        .del-d2 { transition-delay: .36s; }
        .del-d3 { transition-delay: .54s; }

        .del-hero {
          position: relative;
          min-height: 100svh;
          display: grid;
          grid-template-columns: minmax(270px, .82fr) 1.18fr;
          background: var(--del-petal);
        }
        .del-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 52px;
        }
        .del-back, .del-book {
          color: var(--del-ink);
          font-size: 9px;
          font-weight: 300;
          letter-spacing: .27em;
          text-transform: uppercase;
          text-decoration: none;
        }
        .del-back { display: inline-flex; align-items: center; gap: 12px; }
        .del-back::before { content: ''; width: 28px; height: 1px; background: var(--del-gold); }
        .del-mark {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 19px;
          font-weight: 300;
          letter-spacing: .3em;
          text-transform: uppercase;
        }
        .del-copy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 150px 7vw 9vh;
        }
        .del-number {
          position: absolute;
          top: 14%;
          right: -2vw;
          color: transparent;
          -webkit-text-stroke: 1px rgba(33,26,23,.12);
          font-size: clamp(150px, 27vw, 420px);
          font-weight: 300;
          line-height: .7;
        }
        .del-kicker {
          margin-bottom: 22px;
          color: var(--del-gold);
          font-size: 9px;
          letter-spacing: .36em;
          text-transform: uppercase;
        }
        .del-title {
          margin: 0;
          font-size: clamp(72px, 11vw, 170px);
          font-weight: 300;
          letter-spacing: -.04em;
          line-height: .72;
        }
        .del-title em {
          display: block;
          margin-left: 17%;
          color: var(--del-mist);
          font-size: .34em;
          font-weight: 300;
          letter-spacing: .12em;
          line-height: 1.2;
        }
        .del-intro {
          max-width: 390px;
          margin: 44px 0 0 auto;
          color: #625650;
          font-size: 12.5px;
          font-weight: 300;
          line-height: 1.9;
        }
        .del-image {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
        }
        .del-image-inner {
          position: absolute;
          inset: 0;
          background: url('/image/homepage/gambar3.jpg') center 28% / cover;
          filter: saturate(.68) contrast(.95);
          transform: scale(1.04);
        }
        .del-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(234,219,211,.38), transparent 32%),
                      linear-gradient(0deg, rgba(33,26,23,.22), transparent 38%);
        }
        .del-image-caption {
          position: absolute;
          z-index: 2;
          right: 30px;
          bottom: 34px;
          color: rgba(255,255,255,.75);
          font-size: 8px;
          letter-spacing: .3em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }

        .del-manifesto {
          position: relative;
          display: grid;
          grid-template-columns: .65fr 1.35fr;
          gap: 7vw;
          padding: 130px 8vw 150px;
        }
        .del-manifesto-label {
          padding-top: 12px;
          color: var(--del-gold);
          font-size: 9px;
          letter-spacing: .32em;
          text-transform: uppercase;
        }
        .del-manifesto-title {
          max-width: 800px;
          margin: 0 0 42px;
          font-size: clamp(38px, 5.5vw, 76px);
          font-weight: 300;
          line-height: 1.04;
        }
        .del-manifesto-title em { color: var(--del-rose); font-weight: 300; }
        .del-manifesto-body {
          columns: 2;
          column-gap: 52px;
          max-width: 760px;
          color: #6b5f59;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.95;
        }

        .del-gallery {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          grid-template-rows: 43vw 25vw;
          gap: 12px;
          padding: 0 3vw;
        }
        .del-shot { position: relative; overflow: hidden; background: var(--del-petal); }
        .del-shot div {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 1.2s cubic-bezier(.16,1,.3,1);
        }
        .del-shot:hover div { transform: scale(1.035); }
        .del-shot-a { grid-row: 1 / 3; }
        .del-shot-a div { background-image: url('/image/homepage/gambar4.jpg'); background-position: center 24%; }
        .del-shot-b div { background-image: url('/image/homepage/gambar5.jpg'); background-position: center 35%; }
        .del-shot-c div { background-image: url('/image/homepage/gambar6.jpg'); background-position: center 32%; }
        .del-gallery-index {
          position: absolute;
          z-index: 2;
          left: 22px;
          bottom: 20px;
          color: rgba(255,255,255,.72);
          font-size: 8px;
          letter-spacing: .25em;
        }

        .del-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 120px 7vw;
        }
        .del-detail { padding: 0 5vw; border-left: 1px solid rgba(33,26,23,.12); }
        .del-detail:first-child { border-left: 0; padding-left: 0; }
        .del-detail:last-child { padding-right: 0; }
        .del-detail-index { color: var(--del-gold); font-size: 9px; letter-spacing: .25em; }
        .del-detail-title { margin: 20px 0 14px; font-size: clamp(25px, 2.8vw, 39px); font-weight: 300; }
        .del-detail-copy { color: var(--del-mist); font-size: 12px; font-weight: 300; line-height: 1.8; }

        .del-cta {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 72vh;
          padding: 100px 24px;
          text-align: center;
          background: var(--del-ink);
          overflow: hidden;
        }
        .del-cta::before {
          content: 'DELARA';
          position: absolute;
          color: transparent;
          -webkit-text-stroke: 1px rgba(234,219,211,.08);
          font-family: 'Cormorant Garamond', serif;
          font-size: 22vw;
          letter-spacing: .05em;
        }
        .del-cta-inner { position: relative; z-index: 1; }
        .del-cta-kicker { color: var(--del-rose); font-size: 9px; letter-spacing: .34em; text-transform: uppercase; }
        .del-cta-title { margin: 25px 0 38px; color: var(--del-paper); font-size: clamp(42px, 6vw, 82px); font-weight: 300; line-height: 1; }
        .del-cta-title em { color: var(--del-rose); font-weight: 300; }
        .del-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 17px 30px;
          border: 1px solid rgba(201,169,156,.6);
          color: var(--del-paper);
          font-size: 9px;
          letter-spacing: .26em;
          text-decoration: none;
          text-transform: uppercase;
        }
        .del-collection-nav { display: grid; grid-template-columns: 1fr 1fr; background: var(--del-paper); }
        .del-next {
          padding: 46px 6vw;
          color: var(--del-ink);
          text-decoration: none;
          border-right: 1px solid rgba(33,26,23,.12);
        }
        .del-next:last-child { border-right: 0; text-align: right; }
        .del-next small { display: block; margin-bottom: 10px; color: var(--del-mist); font: 300 8px 'Jost',sans-serif; letter-spacing: .27em; text-transform: uppercase; }
        .del-next span { font: 300 clamp(25px,3vw,40px) 'Cormorant Garamond',serif; }

        @media (max-width: 800px) {
          .del-nav { padding: 24px 20px; }
          .del-mark { font-size: 15px; }
          .del-book { display: none; }
          .del-hero { grid-template-columns: 1fr; }
          .del-copy { min-height: 56svh; padding: 130px 24px 48px; }
          .del-number { top: 20%; right: -5vw; font-size: 56vw; }
          .del-title { font-size: clamp(72px,25vw,112px); }
          .del-intro { margin-top: 34px; }
          .del-image { min-height: 66svh; }
          .del-manifesto { grid-template-columns: 1fr; gap: 32px; padding: 86px 24px; }
          .del-manifesto-body { columns: 1; }
          .del-gallery { grid-template-columns: 1fr 1fr; grid-template-rows: 110vw 54vw; padding: 0; gap: 4px; }
          .del-shot-a { grid-column: 1 / 3; grid-row: 1; }
          .del-details { grid-template-columns: 1fr; padding: 80px 24px; gap: 40px; }
          .del-detail, .del-detail:first-child, .del-detail:last-child { padding: 0 0 38px; border-left: 0; border-bottom: 1px solid rgba(33,26,23,.12); }
          .del-detail:last-child { border-bottom: 0; }
          .del-collection-nav { grid-template-columns: 1fr; }
          .del-next, .del-next:last-child { border-right: 0; border-bottom: 1px solid rgba(33,26,23,.12); text-align: left; }
        }
        @media (prefers-reduced-motion: reduce) {
          .del-enter, .del-shot div { transition: none; }
        }
      `}</style>

      <main className="del-root">
        <section className="del-hero">
          <div className="del-copy">
            <span className="del-c del-number">02</span>
            <p className={`del-j del-kicker del-enter ${loaded ? "on" : ""}`}>Signature Silhouettes · No. 02</p>
            <h1 className={`del-c del-title del-enter del-d1 ${loaded ? "on" : ""}`}>
              Delara
              <em>Sculptural Romance</em>
            </h1>
            <p className={`del-j del-intro del-enter del-d2 ${loaded ? "on" : ""}`}>
              A study in softness and structure, shaped for the bride who finds romance in restraint.
            </p>
          </div>

          <div className="del-image">
            <div className="del-image-inner" />
            <span className="del-j del-image-caption">Aamira Bridal · Collection II</span>
          </div>
        </section>

        <section className="del-manifesto">
          <p className="del-j del-manifesto-label">The silhouette</p>
          <div>
            <h2 className="del-c del-manifesto-title">
              Draped with intention.<br /><em>Remembered in motion.</em>
            </h2>
            <p className="del-j del-manifesto-body">
              Delara begins with the line of the body and builds outward in measured folds. Satin is
              gathered by hand, allowing light to settle differently with every step. The result is
              sculptural but never rigid—a gown that holds its form while remaining entirely alive.
              Its romance is found in proportion: an open neckline, a softened waist, and a train
              that arrives without spectacle. Every detail has been reduced until only feeling remains.
            </p>
          </div>
        </section>

        <section className="del-gallery" aria-label="Delara editorial gallery">
          <div className="del-shot del-shot-a"><div /><span className="del-j del-gallery-index">01 — Form</span></div>
          <div className="del-shot del-shot-b"><div /><span className="del-j del-gallery-index">02 — Drape</span></div>
          <div className="del-shot del-shot-c"><div /><span className="del-j del-gallery-index">03 — Detail</span></div>
        </section>

        <section className="del-details">
          {details.map(([label, title, copy], index) => (
            <article className="del-detail" key={label}>
              <p className="del-j del-detail-index">0{index + 1} · {label}</p>
              <h3 className="del-c del-detail-title">{title}</h3>
              <p className="del-j del-detail-copy">{copy}</p>
            </article>
          ))}
        </section>

        <section className="del-cta">
          <div className="del-cta-inner">
            <p className="del-j del-cta-kicker">Private appointments</p>
            <h2 className="del-c del-cta-title">Discover <em>Delara</em></h2>
            <Link href="/book-appointment" className="del-j del-cta-link">Book a consultation <span>→</span></Link>
          </div>
        </section>

        <nav className="del-collection-nav" aria-label="Browse bridal collections">
          <Link href="/collections/celestine" className="del-next"><small>Previous silhouette</small><span>Celestine</span></Link>
          <Link href="/collections/isadora" className="del-next"><small>Next silhouette</small><span>Isadora</span></Link>
        </nav>
      </main>
    </>
  );
}
