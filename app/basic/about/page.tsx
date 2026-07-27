"use client";

import Link from "next/link";

/* ─── Data ────────────────────────────────────────────────── */
const values = [
  {
    id: "intentional",
    title: "Intentional",
    description: "We design with purpose and every piece serves a meaning.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3C9 3 6 6.5 6 10.5C6 14 8.5 15.5 9.5 17.5C10 18.5 10 19.5 10 20.5H16C16 19.5 16 18.5 16.5 17.5C17.5 15.5 20 14 20 10.5C20 6.5 17 3 13 3Z" stroke="currentColor" strokeWidth="1"/>
        <path d="M10.5 23H15.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "quality",
    title: "Quality",
    description: "We choose premium fabrics and work with partners who share our values.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1"/>
        <path d="M9 13.5L11.5 16L17.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "timeless",
    title: "Timeless",
    description: "Our designs are made to be worn, loved, and lived in.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1"/>
        <path d="M13 7.5V13L17 15.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "respectful",
    title: "Respectful",
    description: "We create with respect for our community, our planet, and the future.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 22C13 22 4 17 4 10.5C4 7.5 6.3 5.5 9 5.5C10.8 5.5 12.2 6.4 13 7.8C13.8 6.4 15.2 5.5 17 5.5C19.7 5.5 22 7.5 22 10.5C22 17 13 22 13 22Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        :root {
          --ivory:         #F4EFE7;
          --silk:          #FAF7F2;
          --parchment:     #EBE3D6;
          --sand:          #D9C9B4;
          --taupe:         #B7A896;
          --espresso:      #3A322A;
          --espresso-soft: #5C5248;
          --camel:         #A9814F;
          --white-warm:    #FFFDF9;
        }

        .abt-c { font-family: 'Cormorant Garamond', serif; }
        .abt-j { font-family: 'Jost', sans-serif; }

        .abt-page { background: var(--silk); }

        /* ── Hero ── */
        .abt-hero {
          position: relative;
          width: 100%;
          min-height: 40vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--parchment);
        }
        .abt-hero-img {
          position: absolute;
          inset: 0;
          background-image: url('/image/about/hero.jpg');
          background-size: cover;
          background-position: center 35%;
        }
        .abt-hero-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            rgba(244,239,231,0.92) 0%,
            rgba(244,239,231,0.72) 34%,
            rgba(244,239,231,0.2) 58%,
            transparent 80%
          );
        }
        .abt-hero-body {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 44px;
        }
        .abt-hero-breadcrumb { margin-bottom: 20px; }
        .abt-hero-breadcrumb-link {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .abt-hero-breadcrumb-link:hover { color: var(--camel); }
        .abt-hero-breadcrumb-sep {
          color: var(--taupe);
          margin: 0 8px;
          font-size: 10px;
        }
        .abt-hero-breadcrumb-current {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso);
        }
        .abt-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(30px, 3.2vw, 42px);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 20px;
        }
        .abt-hero-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.85;
          color: var(--espresso-soft);
          max-width: 300px;
        }

        /* ── Shared section helpers ── */
        .abt-kicker {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--taupe);
          margin-bottom: 18px;
        }

        /* ── Our Story ── */
        .abt-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--ivory);
        }
        .abt-story-image {
          position: relative;
          overflow: hidden;
          background: var(--parchment);
          min-height: 460px;
        }
        .abt-story-img-el {
          position: absolute;
          inset: 0;
          background-image: url('/image/about/our-story.jpg');
          background-size: cover;
          background-position: center 25%;
        }
        .abt-story-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 6vw;
        }
        .abt-story-title {
          font-weight: 300;
          font-size: clamp(26px, 2.6vw, 38px);
          line-height: 1.28;
          color: var(--espresso);
          margin-bottom: 26px;
          max-width: 380px;
        }
        .abt-story-p {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          line-height: 1.95;
          color: var(--espresso-soft);
          max-width: 40ch;
          margin-bottom: 22px;
        }
        .abt-story-p:last-child { margin-bottom: 0; }

        /* ── Our Philosophy ── */
        .abt-philosophy {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--parchment);
        }
        .abt-philosophy-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 6vw;
        }
        .abt-philosophy-title {
          font-weight: 300;
          font-size: clamp(26px, 2.6vw, 38px);
          line-height: 1.28;
          color: var(--espresso);
          margin-bottom: 26px;
          max-width: 360px;
        }
        .abt-philosophy-p {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          line-height: 1.95;
          color: var(--espresso-soft);
          max-width: 38ch;
        }
        .abt-philosophy-image {
          position: relative;
          overflow: hidden;
          background: var(--sand);
          min-height: 460px;
        }
        .abt-philosophy-img-el {
          position: absolute;
          inset: 0;
          background-image: url('/image/about/our-philosophy.jpg');
          background-size: cover;
          background-position: center;
        }

        /* ── Values ── */
        .abt-values-section {
          background: var(--silk);
          padding: 80px 6vw;
        }
        .abt-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .abt-value {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .abt-value-icon {
          color: var(--camel);
          margin-bottom: 18px;
        }
        .abt-value-title {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 12px;
        }
        .abt-value-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.8;
          color: var(--espresso-soft);
          max-width: 24ch;
        }

        /* ── Promise banner ── */
        .abt-promise {
          position: relative;
          width: 100%;
          min-height: 52vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--taupe);
        }
        .abt-promise-img {
          position: absolute;
          inset: 0;
          background-image: url('/image/about/our-promise.jpg');
          background-size: cover;
          background-position: center;
        }
        .abt-promise-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(58,50,42,0.32) 0%,
            rgba(58,50,42,0.5) 100%
          );
        }
        .abt-promise-body {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 560px;
          padding: 0 6vw;
        }
        .abt-promise-kicker {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(244,239,231,0.75);
          margin-bottom: 22px;
        }
        .abt-promise-title {
          font-weight: 300;
          font-size: clamp(26px, 2.8vw, 40px);
          line-height: 1.32;
          color: var(--white-warm);
          margin-bottom: 34px;
        }
        .abt-promise-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          border: 1px solid rgba(244,239,231,0.6);
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--white-warm);
          background: transparent;
          transition: background 0.6s ease, border-color 0.6s ease;
        }
        .abt-promise-btn:hover {
          background: rgba(169,129,79,0.28);
          border-color: var(--camel);
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .abt-hero-body { padding-left: 24px; padding-right: 24px; }
          .abt-hero-veil {
            background: linear-gradient(
              100deg,
              rgba(244,239,231,0.94) 0%,
              rgba(244,239,231,0.76) 46%,
              rgba(244,239,231,0.3) 70%,
              transparent 90%
            );
          }
          .abt-story, .abt-philosophy {
            grid-template-columns: 1fr;
          }
          .abt-story-image, .abt-philosophy-image { min-height: 320px; order: -1; }
          .abt-story-text, .abt-philosophy-text { padding: 48px 7vw; }
          .abt-story-title, .abt-philosophy-title { max-width: 100%; }
          .abt-story-p, .abt-philosophy-p { max-width: 100%; }
          .abt-values-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 24px;
          }
          .abt-values-section { padding: 64px 7vw; }
          .abt-promise { min-height: 46vh; }
        }
      `}</style>

      <div className="abt-page">
        {/* ── Hero ── */}
        <div className="abt-hero">
          <div className="abt-hero-img" />
          <div className="abt-hero-veil" />
          <div className="abt-hero-body">
            <div className="abt-hero-breadcrumb">
              <Link href="/basic" className="abt-hero-breadcrumb-link">Home</Link>
              <span className="abt-hero-breadcrumb-sep">/</span>
              <span className="abt-hero-breadcrumb-current">About</span>
            </div>
            <h1 className="abt-c abt-hero-title">About Aamira</h1>
            <p className="abt-j abt-hero-desc">
              A quiet celebration of modesty, crafted with intention, designed to elevate everyday.
            </p>
          </div>
        </div>

        {/* ── Our Story ── */}
        <section className="abt-story">
          <div className="abt-story-image">
            <div className="abt-story-img-el" />
          </div>
          <div className="abt-story-text">
            <p className="abt-j abt-kicker">Our Story</p>
            <h2 className="abt-c abt-story-title">Timeless pieces. Thoughtfully made.</h2>
            <p className="abt-j abt-story-p">
              Aamira Basic was created from a simple belief—that modest fashion should feel effortless, beautiful, and meaningful.
            </p>
            <p className="abt-j abt-story-p">
              We design pieces that move with you, through every moment of your life. Not just for today, but for years to come.
            </p>
            <p className="abt-j abt-story-p">
              Every detail is considered. Every fabric is chosen with purpose. Every piece is made to become part of your story.
            </p>
          </div>
        </section>

        {/* ── Our Philosophy ── */}
        <section className="abt-philosophy">
          <div className="abt-philosophy-text">
            <p className="abt-j abt-kicker">Our Philosophy</p>
            <h2 className="abt-c abt-philosophy-title">Less, but better. Always.</h2>
            <p className="abt-j abt-philosophy-p">
              We believe in intentional living and intentional dressing.
            </p>
            <p className="abt-j abt-philosophy-p" style={{ marginTop: "22px" }}>
              Our collections are built on quality, versatility, and timeless design—so you can wear more of what truly matters.
            </p>
          </div>
          <div className="abt-philosophy-image">
            <div className="abt-philosophy-img-el" />
          </div>
        </section>

        {/* ── Values ── */}
        <section className="abt-values-section">
          <div className="abt-values-grid">
            {values.map((v) => (
              <div key={v.id} className="abt-value">
                <div className="abt-value-icon">{v.icon}</div>
                <p className="abt-j abt-value-title">{v.title}</p>
                <p className="abt-j abt-value-desc">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Our Promise ── */}
        <section className="abt-promise">
          <div className="abt-promise-img" />
          <div className="abt-promise-veil" />
          <div className="abt-promise-body">
            <p className="abt-j abt-promise-kicker">Our Promise</p>
            <h2 className="abt-c abt-promise-title">
              Made to see you through every chapter.
            </h2>
            <p className="abt-j" style={{ color: "rgba(244,239,231,0.85)", fontSize: "13px", lineHeight: 1.9, marginBottom: "34px", maxWidth: "44ch", marginLeft: "auto", marginRight: "auto" }}>
              From the everyday to the extraordinary, Aamira Basic is here to dress your journey with elegance and ease.
            </p>
            <Link href="/basic/Collections" className="abt-promise-btn">
              Join Our Journey
              <span>&rarr;</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}