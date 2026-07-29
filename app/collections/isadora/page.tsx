"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const notes = [
  { number: "I", title: "Weightless Layers", text: "Fine organza is layered to hold air between each fold, creating volume that never feels heavy." },
  { number: "II", title: "Soft Architecture", text: "An elongated waist and curved seam lines give the gown definition while preserving its ease." },
  { number: "III", title: "Living Movement", text: "Every panel is cut to respond to the body, opening and settling naturally with each step." },
];

export default function IsadoraPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

        .isa-root {
          --isa-white: #fbfaf7;
          --isa-silk: #f2eee6;
          --isa-cloud: #deded8;
          --isa-sage: #8f978c;
          --isa-ink: #2e302c;
          --isa-soft: #777a72;
          background: var(--isa-white);
          color: var(--isa-ink);
          overflow: hidden;
        }
        .isa-c { font-family: 'Cormorant Garamond', serif; }
        .isa-j { font-family: 'Jost', sans-serif; }
        .isa-rise {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.35s cubic-bezier(.16,1,.3,1), transform 1.35s cubic-bezier(.16,1,.3,1);
        }
        .isa-rise.ready { opacity: 1; transform: none; }
        .isa-delay-1 { transition-delay: .2s; }
        .isa-delay-2 { transition-delay: .4s; }
        .isa-delay-3 { transition-delay: .6s; }

        .isa-hero {
          position: relative;
          min-height: 100svh;
          padding: 28px;
          background: var(--isa-white);
        }
        .isa-frame {
          position: relative;
          min-height: calc(100svh - 56px);
          overflow: hidden;
          background: var(--isa-cloud);
        }
        .isa-hero-image {
          position: absolute;
          inset: -4%;
          background: url('/image/homepage/gambar1.png') center 18% / cover;
          filter: saturate(.55) brightness(1.04) contrast(.88);
        }
        .isa-hero-veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(251,250,247,.86) 0%, rgba(251,250,247,.48) 36%, transparent 68%),
            linear-gradient(0deg, rgba(46,48,44,.18), transparent 35%);
        }
        .isa-nav {
          position: absolute;
          z-index: 4;
          top: 0;
          left: 0;
          right: 0;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 30px 38px;
        }
        .isa-nav-link {
          color: var(--isa-ink);
          font-size: 8.5px;
          font-weight: 300;
          letter-spacing: .28em;
          text-decoration: none;
          text-transform: uppercase;
        }
        .isa-nav-link:last-child { justify-self: end; }
        .isa-logo { font-size: 17px; font-weight: 300; letter-spacing: .32em; text-transform: uppercase; }
        .isa-hero-copy {
          position: relative;
          z-index: 3;
          min-height: calc(100svh - 56px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          width: 58%;
          padding: 120px 6.5vw 70px;
        }
        .isa-index {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 30px;
          color: var(--isa-sage);
          font-size: 9px;
          letter-spacing: .34em;
          text-transform: uppercase;
        }
        .isa-index::before { content: ''; width: 44px; height: 1px; background: var(--isa-sage); }
        .isa-title {
          margin: 0;
          font-size: clamp(76px, 13vw, 190px);
          font-weight: 300;
          letter-spacing: -.055em;
          line-height: .72;
        }
        .isa-subtitle {
          margin: 32px 0 0 24%;
          color: var(--isa-sage);
          font-size: clamp(23px, 3vw, 42px);
          font-style: italic;
          font-weight: 300;
        }
        .isa-hero-note {
          position: absolute;
          z-index: 3;
          right: 34px;
          bottom: 32px;
          max-width: 250px;
          color: rgba(251,250,247,.84);
          font-size: 10px;
          font-weight: 300;
          line-height: 1.7;
          text-align: right;
        }

        .isa-intro {
          display: grid;
          grid-template-columns: .55fr 1.45fr;
          gap: 7vw;
          padding: 150px 9vw;
        }
        .isa-intro-side {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding-top: 12px;
          color: var(--isa-sage);
          font-size: 8.5px;
          letter-spacing: .32em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }
        .isa-intro-side::before { content: ''; width: 1px; height: 64px; background: var(--isa-cloud); }
        .isa-intro-title {
          max-width: 830px;
          margin: 0;
          font-size: clamp(40px, 6vw, 82px);
          font-weight: 300;
          line-height: 1.03;
        }
        .isa-intro-title em { color: var(--isa-sage); font-weight: 300; }
        .isa-intro-copy {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 42px;
          max-width: 760px;
          margin-top: 50px;
          color: var(--isa-soft);
          font-size: 12.5px;
          font-weight: 300;
          line-height: 1.95;
        }

        .isa-editorial {
          position: relative;
          min-height: 1350px;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 4vw;
        }
        .isa-photo { position: absolute; overflow: hidden; background: var(--isa-silk); }
        .isa-photo div {
          position: absolute;
          inset: -2%;
          background-size: cover;
          background-position: center;
          transition: transform 1.4s cubic-bezier(.16,1,.3,1);
        }
        .isa-photo:hover div { transform: scale(1.035); }
        .isa-photo-one { top: 0; left: 4vw; width: 48%; height: 720px; }
        .isa-photo-one div { background-image: url('/image/homepage/gambar2.png'); background-position: center 22%; }
        .isa-photo-two { top: 270px; right: 4vw; width: 34%; height: 520px; }
        .isa-photo-two div { background-image: url('/image/homepage/gambar5.jpg'); background-position: center 30%; }
        .isa-photo-three { top: 840px; left: 26%; width: 48%; height: 430px; }
        .isa-photo-three div { background-image: url('/image/homepage/gambar6.jpg'); background-position: center 46%; }
        .isa-photo-label {
          position: absolute;
          z-index: 2;
          left: 18px;
          bottom: 16px;
          color: rgba(255,255,255,.78);
          font-size: 8px;
          letter-spacing: .27em;
          text-transform: uppercase;
        }
        .isa-editorial-quote {
          position: absolute;
          top: 870px;
          left: 4vw;
          width: 18%;
          color: var(--isa-sage);
          font-size: clamp(25px, 3vw, 40px);
          font-style: italic;
          font-weight: 300;
          line-height: 1.15;
        }
        .isa-editorial-number {
          position: absolute;
          top: 20px;
          right: 2vw;
          color: transparent;
          -webkit-text-stroke: 1px rgba(143,151,140,.18);
          font-size: clamp(120px, 18vw, 250px);
          font-weight: 300;
          line-height: 1;
        }

        .isa-notes {
          background: var(--isa-silk);
          padding: 120px 8vw;
        }
        .isa-notes-heading {
          margin: 0 0 68px;
          text-align: center;
          font-size: clamp(34px, 4vw, 56px);
          font-weight: 300;
        }
        .isa-notes-grid { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 1200px; margin: 0 auto; }
        .isa-note { padding: 10px 4vw 22px; border-right: 1px solid rgba(46,48,44,.12); }
        .isa-note:last-child { border-right: 0; }
        .isa-note-num { color: var(--isa-sage); font-size: 10px; letter-spacing: .25em; }
        .isa-note-title { margin: 24px 0 16px; font-size: 30px; font-weight: 300; }
        .isa-note-text { color: var(--isa-soft); font-size: 12px; font-weight: 300; line-height: 1.85; }

        .isa-appointment {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 75vh;
          background: var(--isa-ink);
        }
        .isa-appointment-image {
          background: linear-gradient(rgba(46,48,44,.08),rgba(46,48,44,.2)), url('/image/homepage/gambar4.jpg') center 25% / cover;
          filter: saturate(.5);
        }
        .isa-appointment-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 80px 8vw;
        }
        .isa-appointment-kicker { color: #aeb8aa; font-size: 8.5px; letter-spacing: .32em; text-transform: uppercase; }
        .isa-appointment-title { margin: 25px 0 26px; color: var(--isa-white); font-size: clamp(42px, 5.5vw, 76px); font-weight: 300; line-height: 1; }
        .isa-appointment-copy p { max-width: 430px; color: rgba(251,250,247,.58); font-size: 12px; font-weight: 300; line-height: 1.9; }
        .isa-button {
          display: inline-flex;
          align-items: center;
          gap: 22px;
          margin-top: 38px;
          padding-bottom: 10px;
          border-bottom: 1px solid #aeb8aa;
          color: var(--isa-white);
          font-size: 9px;
          letter-spacing: .28em;
          text-decoration: none;
          text-transform: uppercase;
        }
        .isa-bottom-nav { display: grid; grid-template-columns: 1fr 1fr; }
        .isa-bottom-link { padding: 46px 6vw; color: var(--isa-ink); text-decoration: none; border-right: 1px solid rgba(46,48,44,.12); }
        .isa-bottom-link:last-child { border-right: 0; text-align: right; }
        .isa-bottom-link small { display: block; margin-bottom: 9px; color: var(--isa-soft); font: 300 8px 'Jost',sans-serif; letter-spacing: .27em; text-transform: uppercase; }
        .isa-bottom-link span { font: 300 clamp(25px,3vw,40px) 'Cormorant Garamond',serif; }

        @media (max-width: 780px) {
          .isa-hero { padding: 0; }
          .isa-frame { min-height: 100svh; }
          .isa-nav { padding: 24px 20px; }
          .isa-nav-link:last-child { display: none; }
          .isa-logo { grid-column: 3; justify-self: end; font-size: 14px; }
          .isa-hero-veil { background: linear-gradient(0deg, rgba(251,250,247,.9) 0%, rgba(251,250,247,.15) 70%); }
          .isa-hero-copy { width: 100%; min-height: 100svh; justify-content: flex-end; padding: 130px 22px 70px; }
          .isa-title { font-size: clamp(74px,26vw,116px); }
          .isa-subtitle { margin-left: 12%; }
          .isa-hero-note { display: none; }
          .isa-intro { grid-template-columns: 1fr; padding: 90px 24px; }
          .isa-intro-side { writing-mode: initial; align-items: center; }
          .isa-intro-side::before { width: 48px; height: 1px; }
          .isa-intro-copy { grid-template-columns: 1fr; gap: 22px; margin-top: 36px; }
          .isa-editorial { position: static; min-height: auto; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
          .isa-photo { position: relative; inset: auto; width: auto; height: auto; }
          .isa-photo-one { grid-column: 1 / 3; aspect-ratio: 4/5; }
          .isa-photo-two, .isa-photo-three { aspect-ratio: 3/4; }
          .isa-editorial-quote, .isa-editorial-number { display: none; }
          .isa-notes { padding: 80px 24px; }
          .isa-notes-grid { grid-template-columns: 1fr; }
          .isa-note { padding: 28px 0; border-right: 0; border-bottom: 1px solid rgba(46,48,44,.12); }
          .isa-note:last-child { border-bottom: 0; }
          .isa-appointment { grid-template-columns: 1fr; }
          .isa-appointment-image { min-height: 65svh; }
          .isa-appointment-copy { padding: 70px 24px; }
          .isa-bottom-nav { grid-template-columns: 1fr; }
          .isa-bottom-link, .isa-bottom-link:last-child { text-align: left; border-right: 0; border-bottom: 1px solid rgba(46,48,44,.12); }
        }
        @media (prefers-reduced-motion: reduce) {
          .isa-rise, .isa-photo div { transition: none; }
        }
      `}</style>

      <main className="isa-root">
        <section className="isa-hero">
          <div className="isa-frame">
            <div className="isa-hero-image" />
            <div className="isa-hero-veil" />
            <div className="isa-hero-copy">
              <p className={`isa-j isa-index isa-rise ${ready ? "ready" : ""}`}>Signature Silhouettes · 03</p>
              <h1 className={`isa-c isa-title isa-rise isa-delay-1 ${ready ? "ready" : ""}`}>Isadora</h1>
              <p className={`isa-c isa-subtitle isa-rise isa-delay-2 ${ready ? "ready" : ""}`}>Ethereal movement</p>
            </div>
            <p className={`isa-j isa-hero-note isa-rise isa-delay-3 ${ready ? "ready" : ""}`}>
              Organza · Elongated waist · Fluid train<br />A silhouette made to move.
            </p>
          </div>
        </section>

        <section className="isa-intro">
          <p className="isa-j isa-intro-side">The story of Isadora</p>
          <div>
            <h2 className="isa-c isa-intro-title">
              Light gathers in every fold,<br /><em>then moves with her.</em>
            </h2>
            <div className="isa-j isa-intro-copy">
              <p>
                Isadora is drawn from the space between stillness and motion. Its layers appear
                weightless, yet every curve is carefully held by an architecture hidden beneath.
              </p>
              <p>
                The gown opens as the bride walks and settles softly when she pauses—a silhouette
                designed not for a single photograph, but for the full rhythm of the day.
              </p>
            </div>
          </div>
        </section>

        <section className="isa-editorial" aria-label="Isadora editorial study">
          <span className="isa-c isa-editorial-number">03</span>
          <div className="isa-photo isa-photo-one"><div /><span className="isa-j isa-photo-label">Study I · Air</span></div>
          <div className="isa-photo isa-photo-two"><div /><span className="isa-j isa-photo-label">Study II · Form</span></div>
          <blockquote className="isa-c isa-editorial-quote">“A gown that remembers every movement.”</blockquote>
          <div className="isa-photo isa-photo-three"><div /><span className="isa-j isa-photo-label">Study III · Light</span></div>
        </section>

        <section className="isa-notes">
          <h2 className="isa-c isa-notes-heading">Notes on the silhouette</h2>
          <div className="isa-notes-grid">
            {notes.map((note) => (
              <article className="isa-note" key={note.number}>
                <span className="isa-j isa-note-num">{note.number}</span>
                <h3 className="isa-c isa-note-title">{note.title}</h3>
                <p className="isa-j isa-note-text">{note.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="isa-appointment">
          <div className="isa-appointment-image" />
          <div className="isa-appointment-copy">
            <span className="isa-j isa-appointment-kicker">The Aamira atelier</span>
            <h2 className="isa-c isa-appointment-title">Meet Isadora<br />in motion.</h2>
            <p className="isa-j">
              Experience the weight, movement, and proportion of Isadora during a private consultation with our atelier.
            </p>
            <Link href="/book-appointment" className="isa-j isa-button">Arrange an appointment <span>→</span></Link>
          </div>
        </section>

        <nav className="isa-bottom-nav" aria-label="Browse bridal collections">
          <Link href="/collections/delara" className="isa-bottom-link"><small>Previous silhouette</small><span>Delara</span></Link>
          <Link href="/collections/lumiere" className="isa-bottom-link"><small>Next silhouette</small><span>Lumière</span></Link>
        </nav>
      </main>
    </>
  );
}
