"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ────────────────────────────────────────────────── */
type Collection = {
  id: string;
  title: string;
  description: string;
  image: string;
  size: "large" | "half";
  reverse?: boolean;
};

const collections: Collection[] = [
  {
    id: "the-everyday-edit",
    title: "The Everyday Edit",
    description: "Effortless pieces for your everyday uniform. Comfortable, minimal, and always timeless.",
    image: "/image/collections/the-everyday-edit.jpg",
    size: "large",
  },
  {
    id: "the-soft-layers",
    title: "The Soft Layers",
    description: "Light layers, easy silhouettes, ready to move with you throughout the day.",
    image: "/image/collections/the-soft-layers.jpg",
    size: "half",
  },
  {
    id: "the-occasion-edit",
    title: "The Occasion Edit",
    description: "Refined pieces for life's special moments. Grace in every detail.",
    image: "/image/collections/the-occasion-edit.jpg",
    size: "half",
    reverse: true,
  },
  {
    id: "the-neutrals",
    title: "The Neutrals",
    description: "A palette of calm. Timeless neutrals that blend beautifully into every wardrobe.",
    image: "/image/collections/the-neutrals.jpg",
    size: "half",
  },
  {
    id: "the-ramadan-edit",
    title: "The Ramadan Edit",
    description: "Thoughtful designs for a meaningful Ramadan. Modest, elegant, and comfortable.",
    image: "/image/collections/the-ramadan-edit.jpg",
    size: "half",
    reverse: true,
  },
];

const sorts = ["Featured", "Newest", "A–Z", "Z–A"];

/* ─────────────────────────────────────────────────────────── */

export default function CollectionsPage() {
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Featured");

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

        .col-c { font-family: 'Cormorant Garamond', serif; }
        .col-j { font-family: 'Jost', sans-serif; }

        .col-page { background: var(--silk); }

        /* ── Hero ── */
        .col-hero {
          position: relative;
          width: 100%;
          min-height: 34vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--parchment);
        }
        .col-hero-img {
          position: absolute;
          inset: 0;
          background-image: url('/image/collections/hero.jpg');
          background-size: cover;
          background-position: center 30%;
        }
        .col-hero-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            rgba(244,239,231,0.92) 0%,
            rgba(244,239,231,0.72) 34%,
            rgba(244,239,231,0.2) 60%,
            transparent 80%
          );
        }
        .col-hero-body {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 44px;
        }
        .col-hero-breadcrumb { margin-bottom: 20px; }
        .col-hero-breadcrumb-link {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .col-hero-breadcrumb-link:hover { color: var(--camel); }
        .col-hero-breadcrumb-sep {
          color: var(--taupe);
          margin: 0 8px;
          font-size: 10px;
        }
        .col-hero-breadcrumb-current {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso);
        }
        .col-hero-title {
          font-weight: 300;
          font-size: clamp(38px, 4.4vw, 58px);
          letter-spacing: -0.01em;
          color: var(--espresso);
          margin-bottom: 20px;
        }
        .col-hero-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.85;
          color: var(--espresso-soft);
          max-width: 320px;
        }

        /* ── Toolbar ── */
        .col-toolbar {
          border-top: 1px solid rgba(58,50,42,0.1);
          border-bottom: 1px solid rgba(58,50,42,0.1);
          padding: 16px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .col-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--espresso);
        }
        .col-sort-wrap { position: relative; }
        .col-sort-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          transition: color 0.3s ease;
        }
        .col-sort-btn:hover, .col-sort-btn.active { color: var(--espresso); }
        .col-sort-caret {
          width: 8px;
          height: 8px;
          transition: transform 0.3s ease;
        }
        .col-sort-caret.open { transform: rotate(180deg); }
        .col-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          background: var(--white-warm);
          border: 1px solid rgba(58,50,42,0.1);
          box-shadow: 0 12px 32px rgba(58,50,42,0.09);
          padding: 16px 18px;
          min-width: 170px;
          z-index: 30;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .col-dropdown-item {
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: var(--espresso-soft);
          padding: 7px 6px;
          border-radius: 2px;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .col-dropdown-item:hover { background: rgba(169,129,79,0.07); color: var(--espresso); }

        /* ── Collections layout ── */
        .col-body {
          padding: 40px 44px 100px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .col-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .col-row.single { grid-template-columns: 1fr; }

        .col-tile {
          position: relative;
          display: flex;
          background: var(--ivory);
          overflow: hidden;
          min-height: 340px;
        }
        .col-tile.reverse { flex-direction: row-reverse; }
        .col-row.single .col-tile { min-height: 420px; }

        .col-tile-text {
          flex: 0 0 42%;
          max-width: 42%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5vw;
        }
        .col-row.single .col-tile-text { flex: 0 0 38%; max-width: 38%; }

        .col-tile-image {
          position: relative;
          flex: 1;
          overflow: hidden;
          background: var(--parchment);
        }
        .col-tile-img-el {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 25%;
          transition: transform 1.6s cubic-bezier(0.16,1,0.3,1);
        }
        .col-tile:hover .col-tile-img-el { transform: scale(1.035); }

        .col-tile-title {
          font-weight: 400;
          font-size: clamp(19px, 1.7vw, 25px);
          color: var(--espresso);
          margin-bottom: 12px;
        }
        .col-row.single .col-tile-title {
          font-size: clamp(24px, 2.2vw, 32px);
        }
        .col-tile-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 12.5px;
          line-height: 1.85;
          color: var(--espresso-soft);
          max-width: 30ch;
          margin-bottom: 20px;
        }
        .col-tile-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--espresso);
          text-decoration: none;
          width: fit-content;
          transition: color 0.4s ease, gap 0.4s ease;
        }
        .col-tile-link-arrow { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .col-tile:hover .col-tile-link { color: var(--camel); gap: 13px; }
        .col-tile:hover .col-tile-link-arrow { transform: translateX(3px); }

        /* CTA tile */
        .col-cta {
          background: var(--parchment);
        }
        .col-cta .col-tile-text { justify-content: center; }
        .col-cta-title {
          font-weight: 400;
          font-size: clamp(22px, 2vw, 28px);
          color: var(--espresso);
          margin-bottom: 12px;
        }
        .col-cta-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          line-height: 1.85;
          color: var(--espresso-soft);
          max-width: 30ch;
          margin-bottom: 22px;
        }
        .col-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 30px;
          border: 1px solid var(--espresso);
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--espresso);
          background: transparent;
          width: fit-content;
          transition: background 0.5s ease, border-color 0.5s ease, color 0.5s ease;
        }
        .col-cta-btn:hover {
          background: rgba(169,129,79,0.1);
          border-color: var(--camel);
          color: var(--camel);
        }

        /* ── Mobile ── */
        @media (max-width: 1024px) {
          .col-tile-text, .col-row.single .col-tile-text { flex: 0 0 48%; max-width: 48%; }
        }
        @media (max-width: 900px) {
          .col-hero-body, .col-toolbar, .col-body { padding-left: 24px; padding-right: 24px; }
          .col-hero-veil {
            background: linear-gradient(
              100deg,
              rgba(244,239,231,0.94) 0%,
              rgba(244,239,231,0.76) 46%,
              rgba(244,239,231,0.3) 70%,
              transparent 90%
            );
          }
          .col-row { grid-template-columns: 1fr; }
          .col-tile, .col-tile.reverse {
            flex-direction: column;
            min-height: auto;
          }
          .col-row.single .col-tile { min-height: auto; }
          .col-tile-text, .col-row.single .col-tile-text {
            flex: none;
            max-width: 100%;
            padding: 40px 7vw;
          }
          .col-tile-image { aspect-ratio: 4 / 3; }
        }
      `}</style>

      <div className="col-page">
        {/* ── Hero ── */}
        <div className="col-hero">
          <div className="col-hero-img" />
          <div className="col-hero-veil" />
          <div className="col-hero-body">
            <div className="col-hero-breadcrumb">
              <Link href="/basic" className="col-hero-breadcrumb-link">Home</Link>
              <span className="col-hero-breadcrumb-sep">/</span>
              <span className="col-hero-breadcrumb-current">Collections</span>
            </div>
            <h1 className="col-c col-hero-title">Collections</h1>
            <p className="col-j col-hero-desc">
              Timeless designs, thoughtfully curated. Discover our collections for every moment of your life.
            </p>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="col-toolbar">
          <button className="col-filter-btn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4h13M1 7.5h13M1 11h13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            Filter
          </button>

          <div className="col-sort-wrap">
            <button
              className={`col-sort-btn ${sortOpen ? "active" : ""}`}
              onClick={() => setSortOpen((p) => !p)}
            >
              Sort By: {activeSort}
              <svg className={`col-sort-caret ${sortOpen ? "open" : ""}`} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {sortOpen && (
              <div className="col-dropdown">
                {sorts.map((s) => (
                  <button
                    key={s}
                    className="col-dropdown-item"
                    onClick={() => {
                      setActiveSort(s);
                      setSortOpen(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Collections ── */}
        <div className="col-body">
          {/* Row 1 — large */}
          <div className="col-row single">
            <Link href={`/basic/Collections/${collections[0].id}`} className="col-tile">
              <div className="col-tile-text">
                <h2 className="col-c col-tile-title">{collections[0].title}</h2>
                <p className="col-j col-tile-desc">{collections[0].description}</p>
                <span className="col-j col-tile-link">
                  Explore Collection
                  <span className="col-tile-link-arrow">&rarr;</span>
                </span>
              </div>
              <div className="col-tile-image">
                <div
                  className="col-tile-img-el"
                  style={{ backgroundImage: `url('${collections[0].image}')` }}
                />
              </div>
            </Link>
          </div>

          {/* Row 2 */}
          <div className="col-row">
            {[collections[1], collections[2]].map((c) => (
              <Link key={c.id} href={`/collections/${c.id}`} className={`col-tile ${c.reverse ? "reverse" : ""}`}>
                <div className="col-tile-text">
                  <h2 className="col-c col-tile-title">{c.title}</h2>
                  <p className="col-j col-tile-desc">{c.description}</p>
                  <span className="col-j col-tile-link">
                    Explore Collection
                    <span className="col-tile-link-arrow">&rarr;</span>
                  </span>
                </div>
                <div className="col-tile-image">
                  <div
                    className="col-tile-img-el"
                    style={{ backgroundImage: `url('${c.image}')` }}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Row 3 */}
          <div className="col-row">
            {[collections[3], collections[4]].map((c) => (
              <Link key={c.id} href={`/collections/${c.id}`} className={`col-tile ${c.reverse ? "reverse" : ""}`}>
                <div className="col-tile-text">
                  <h2 className="col-c col-tile-title">{c.title}</h2>
                  <p className="col-j col-tile-desc">{c.description}</p>
                  <span className="col-j col-tile-link">
                    Explore Collection
                    <span className="col-tile-link-arrow">&rarr;</span>
                  </span>
                </div>
                <div className="col-tile-image">
                  <div
                    className="col-tile-img-el"
                    style={{ backgroundImage: `url('${c.image}')` }}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Row 4 — CTA */}
          <div className="col-row single">
            <div className="col-tile col-cta">
              <div className="col-tile-text">
                <h2 className="col-c col-cta-title">Can&apos;t decide?</h2>
                <p className="col-j col-cta-desc">
                  We&apos;re here to help you find the perfect pieces.
                </p>
                <Link href="/contact" className="col-cta-btn">
                  Contact Our Team
                </Link>
              </div>
              <div className="col-tile-image">
                <div
                  className="col-tile-img-el"
                  style={{ backgroundImage: `url('/image/collections/cant-decide.jpg')` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}