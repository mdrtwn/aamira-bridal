"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ────────────────────────────────────────────────── */
const categories = ["All Hijab", "Voal", "Paris", "Silk", "Jersey", "Square", "Pashmina", "Instant"];

const colors = [
  { name: "Beige", hex: "#C9B79C" },
  { name: "White", hex: "#FAF7F2" },
  { name: "Black", hex: "#2A2521" },
  { name: "Brown", hex: "#6B4A34" },
  { name: "Grey", hex: "#9C9691" },
  { name: "Dusty Pink", hex: "#D8B4AE" },
  { name: "Sage Green", hex: "#94A489" },
];

const materials = ["Voal", "Paris", "Silk", "Jersey", "Square", "Pashmina", "Instant"];
const sizes = ["Regular", "Square 130", "Square 120", "One Size"];
const prices = ["Under IDR 100.000", "IDR 100.000 – 150.000", "IDR 150.000 – 200.000", "Above IDR 200.000"];
const sorts = ["Newest", "Price: Low to High", "Price: High to Low", "Best Selling"];

type Product = {
  id: string;
  name: string;
  price: string;
  badge?: "New" | "Best Seller";
  swatches: string[];
};

const products: Product[] = [
  { id: "voal-serenity",   name: "Voal Serenity",   price: "IDR 129.000", badge: "New", swatches: ["#C9B79C", "#2A2521", "#9C9691", "#D8B4AE"] },
  { id: "paris-daily",     name: "Paris Daily",     price: "IDR 139.000", swatches: ["#C9B79C", "#6B4A34", "#9C9691", "#94A489"] },
  { id: "silk-soft",       name: "Silk Soft",       price: "IDR 189.000", swatches: ["#C9B79C", "#2A2521", "#6B4A34", "#D8B4AE"] },
  { id: "jersey-premium",  name: "Jersey Premium",  price: "IDR 149.000", swatches: ["#C9B79C", "#9C9691", "#D8B4AE", "#94A489"] },
  { id: "square-classic",  name: "Square Classic",  price: "IDR 129.000", swatches: ["#C9B79C", "#2A2521", "#9C9691", "#6B4A34"] },
  { id: "pashmina-flow",   name: "Pashmina Flow",   price: "IDR 159.000", swatches: ["#C9B79C", "#6B4A34", "#9C9691", "#D8B4AE"] },
  { id: "voal-essential",  name: "Voal Essential",  price: "IDR 119.000", swatches: ["#C9B79C", "#2A2521", "#94A489", "#D8B4AE"] },
  { id: "instant-neva",    name: "Instant Neva",    price: "IDR 169.000", badge: "Best Seller", swatches: ["#C9B79C", "#2A2521", "#9C9691", "#6B4A34"] },
];

type DropdownKey = "material" | "color" | "size" | "price" | "sort" | null;

/* ─────────────────────────────────────────────────────────── */

export default function HijabPage() {
  const [activeCategory, setActiveCategory] = useState("All Hijab");
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [activeSort, setActiveSort] = useState("Newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleColor = (name: string) => {
    setActiveColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

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

        .hj-c { font-family: 'Cormorant Garamond', serif; }
        .hj-j { font-family: 'Jost', sans-serif; }

        .hj-page { background: var(--silk); }

        /* ── Breadcrumb ── */
        .hj-breadcrumb {
          padding: 24px 44px 0;
        }
        .hj-breadcrumb-link {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--taupe);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .hj-breadcrumb-link:hover { color: var(--camel); }
        .hj-breadcrumb-sep {
          color: var(--taupe);
          margin: 0 8px;
          font-size: 10px;
        }
        .hj-breadcrumb-current {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--espresso-soft);
        }

        /* ── Header ── */
        .hj-header {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 48px;
          padding: 28px 44px 56px;
          align-items: center;
        }
        .hj-header-title {
          font-weight: 300;
          font-size: clamp(38px, 4.2vw, 56px);
          letter-spacing: -0.01em;
          color: var(--espresso);
          margin-bottom: 20px;
        }
        .hj-header-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.85;
          color: var(--espresso-soft);
          max-width: 340px;
        }
        .hj-header-image {
          position: relative;
          border-radius: 2px;
          overflow: hidden;
          aspect-ratio: 16 / 8;
          background: var(--parchment);
        }
        .hj-header-image-el {
          position: absolute;
          inset: 0;
          background-image: url('/image/hijab/hero.jpg');
          background-size: cover;
          background-position: center 25%;
        }

        /* ── Toolbar row ── */
        .hj-toolbar {
          border-top: 1px solid rgba(58,50,42,0.1);
          border-bottom: 1px solid rgba(58,50,42,0.1);
          padding: 16px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .hj-mobile-filter-btn {
          display: none;
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
        .hj-filters-row {
          display: flex;
          align-items: center;
          gap: 28px;
          position: relative;
        }
        .hj-filter-btn {
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
          padding: 4px 0;
          transition: color 0.3s ease;
        }
        .hj-filter-btn:hover, .hj-filter-btn.active { color: var(--espresso); }
        .hj-filter-caret {
          width: 8px;
          height: 8px;
          transition: transform 0.3s ease;
        }
        .hj-filter-caret.open { transform: rotate(180deg); }

        .hj-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          left: 0;
          background: var(--white-warm);
          border: 1px solid rgba(58,50,42,0.1);
          box-shadow: 0 12px 32px rgba(58,50,42,0.09);
          padding: 16px 18px;
          min-width: 200px;
          z-index: 30;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hj-dropdown-item {
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
        .hj-dropdown-item:hover { background: rgba(169,129,79,0.07); color: var(--espresso); }

        .hj-sort-wrap { position: relative; }

        /* ── Layout: sidebar + grid ── */
        .hj-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 48px;
          padding: 40px 44px 100px;
        }

        /* Sidebar */
        .hj-sidebar-block { margin-bottom: 40px; }
        .hj-sidebar-heading {
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 16px;
        }
        .hj-cat-list, .hj-color-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .hj-cat-btn {
          display: block;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: var(--espresso-soft);
          padding: 0;
          transition: color 0.3s ease, font-weight 0.3s ease;
        }
        .hj-cat-btn.active { color: var(--espresso); font-weight: 500; }
        .hj-cat-btn:hover { color: var(--camel); }

        .hj-color-btn {
          display: flex;
          align-items: center;
          gap: 11px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: var(--espresso-soft);
          transition: color 0.3s ease;
        }
        .hj-color-btn:hover { color: var(--espresso); }
        .hj-color-btn.active { color: var(--espresso); font-weight: 500; }
        .hj-color-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(58,50,42,0.15);
          flex-shrink: 0;
          position: relative;
        }
        .hj-color-dot.checked::after {
          content: '';
          position: absolute;
          inset: -3px;
          border: 1px solid var(--camel);
          border-radius: 50%;
        }

        .hj-view-more {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.04em;
          color: var(--camel);
          padding: 0;
          margin-top: 4px;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Product grid */
        .hj-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px 24px;
        }
        .hj-card { display: flex; flex-direction: column; }
        .hj-card-img-wrap {
          position: relative;
          aspect-ratio: 3 / 4;
          background: var(--parchment);
          overflow: hidden;
          margin-bottom: 16px;
          border-radius: 1px;
        }
        .hj-card-img-el {
          position: absolute;
          inset: 0;
          background-image: url('/image/hijab/products/placeholder.jpg');
          background-size: cover;
          background-position: center 20%;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .hj-card:hover .hj-card-img-el { transform: scale(1.045); }
        .hj-card-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 5px 11px;
          font-family: 'Jost', sans-serif;
          font-size: 8.5px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--white-warm);
          background: var(--espresso);
          border-radius: 1px;
        }
        .hj-card-badge.best { background: var(--camel); }
        .hj-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16.5px;
          font-weight: 500;
          color: var(--espresso);
          margin-bottom: 6px;
        }
        .hj-card-price {
          font-family: 'Jost', sans-serif;
          font-size: 12.5px;
          font-weight: 300;
          color: var(--espresso-soft);
          margin-bottom: 12px;
        }
        .hj-card-swatches {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .hj-card-swatch {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 1px solid rgba(58,50,42,0.15);
        }

        /* ── Mobile ── */
        @media (max-width: 1024px) {
          .hj-header { grid-template-columns: 1fr; gap: 28px; }
          .hj-header-image { aspect-ratio: 16 / 9; }
        }
        @media (max-width: 900px) {
          .hj-breadcrumb, .hj-header, .hj-toolbar, .hj-body { padding-left: 24px; padding-right: 24px; }
          .hj-mobile-filter-btn { display: inline-flex; }
          .hj-filters-row { display: none; }
          .hj-body { grid-template-columns: 1fr; }
          .hj-sidebar { display: none; }
          .hj-sidebar.open { display: block; }
          .hj-grid { grid-template-columns: 1fr 1fr; gap: 20px 16px; }
        }
        @media (max-width: 520px) {
          .hj-grid { grid-template-columns: 1fr 1fr; }
          .hj-toolbar { flex-wrap: wrap; }
        }
      `}</style>

      <div className="hj-page">
        {/* ── Breadcrumb ── */}
        <div className="hj-breadcrumb">
          <Link href="/basic" className="hj-breadcrumb-link">Home</Link>
          <span className="hj-breadcrumb-sep">/</span>
          <span className="hj-breadcrumb-current">Hijab</span>
        </div>

        {/* ── Header ── */}
        <div className="hj-header">
          <div>
            <h1 className="hj-c hj-header-title">Hijab</h1>
            <p className="hj-j hj-header-desc">
              Timeless hijabs in refined fabrics and neutral tones. Designed for comfort, made to elevate every moment.
            </p>
          </div>
          <div className="hj-header-image">
            <div className="hj-header-image-el" />
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="hj-toolbar">
          <button
            className="hj-mobile-filter-btn"
            onClick={() => setMobileFiltersOpen((p) => !p)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4h13M1 7.5h13M1 11h13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            Filter
          </button>

          <div className="hj-filters-row">
            {([
              { key: "material" as const, label: "Material", items: materials },
              { key: "color" as const, label: "Color", items: colors.map((c) => c.name) },
              { key: "size" as const, label: "Size", items: sizes },
              { key: "price" as const, label: "Price", items: prices },
            ]).map((f) => (
              <div key={f.key} style={{ position: "relative" }}>
                <button
                  className={`hj-filter-btn ${openDropdown === f.key ? "active" : ""}`}
                  onClick={() => toggleDropdown(f.key)}
                >
                  {f.label}
                  <svg className={`hj-filter-caret ${openDropdown === f.key ? "open" : ""}`} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openDropdown === f.key && (
                  <div className="hj-dropdown">
                    {f.items.map((item) => (
                      <button
                        key={item}
                        className="hj-dropdown-item"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hj-sort-wrap">
            <button
              className={`hj-filter-btn ${openDropdown === "sort" ? "active" : ""}`}
              onClick={() => toggleDropdown("sort")}
            >
              Sort By: {activeSort}
              <svg className={`hj-filter-caret ${openDropdown === "sort" ? "open" : ""}`} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openDropdown === "sort" && (
              <div className="hj-dropdown" style={{ left: "auto", right: 0 }}>
                {sorts.map((s) => (
                  <button
                    key={s}
                    className="hj-dropdown-item"
                    onClick={() => {
                      setActiveSort(s);
                      setOpenDropdown(null);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Body: sidebar + grid ── */}
        <div className="hj-body">
          {/* Sidebar */}
          <aside className={`hj-sidebar ${mobileFiltersOpen ? "open" : ""}`}>
            <div className="hj-sidebar-block">
              <p className="hj-sidebar-heading">Categories</p>
              <div className="hj-cat-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`hj-cat-btn ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
                <button className="hj-view-more">View more</button>
              </div>
            </div>

            <div className="hj-sidebar-block">
              <p className="hj-sidebar-heading">Color</p>
              <div className="hj-color-list">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    className={`hj-color-btn ${activeColors.includes(c.name) ? "active" : ""}`}
                    onClick={() => toggleColor(c.name)}
                  >
                    <span
                      className={`hj-color-dot ${activeColors.includes(c.name) ? "checked" : ""}`}
                      style={{ background: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="hj-grid">
            {products.map((p) => (
              <Link key={p.id} href={`/hijab/${p.id}`} className="hj-card">
                <div className="hj-card-img-wrap">
                  <div className="hj-card-img-el" />
                  {p.badge && (
                    <span className={`hj-card-badge ${p.badge === "Best Seller" ? "best" : ""}`}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <h3 className="hj-card-name">{p.name}</h3>
                <p className="hj-card-price">{p.price}</p>
                <div className="hj-card-swatches">
                  {p.swatches.map((hex, i) => (
                    <span key={i} className="hj-card-swatch" style={{ background: hex }} />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}