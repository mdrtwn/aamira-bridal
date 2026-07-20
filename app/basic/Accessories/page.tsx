"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ────────────────────────────────────────────────── */
const categories = [
  "All Accessories",
  "Bags",
  "Belts",
  "Hair Accessories",
  "Pins & Brooches",
  "Inner",
  "Socks",
  "Others",
];

const colors = [
  { name: "Beige", hex: "#C9B79C" },
  { name: "Ivory", hex: "#F4EFE7" },
  { name: "Taupe", hex: "#B7A896" },
  { name: "Brown", hex: "#6B4A34" },
  { name: "Black", hex: "#2A2521" },
  { name: "Gold", hex: "#C6A15B" },
  { name: "Silver", hex: "#B9B7B2" },
];

const types = ["Bags", "Belts", "Hair Accessories", "Pins & Brooches", "Inner", "Socks"];
const materials = ["Leather", "Satin", "Cotton", "Metal", "Pearl", "Rattan"];
const prices = ["Under IDR 100.000", "IDR 100.000 – 300.000", "IDR 300.000 – 600.000", "Above IDR 600.000"];
const sorts = ["Newest", "Price: Low to High", "Price: High to Low", "Best Selling"];

type Product = {
  id: string;
  name: string;
  price: string;
  badge?: "New";
  swatches: string[];
};

const products: Product[] = [
  { id: "minimal-shoulder-bag", name: "Minimal Shoulder Bag", price: "IDR 549.000", badge: "New", swatches: ["#6B4A34", "#2A2521", "#C9B79C"] },
  { id: "satin-scrunchie",      name: "Satin Scrunchie",      price: "IDR 49.000",  swatches: ["#F4EFE7", "#C9B79C", "#B7A896"] },
  { id: "classic-slim-belt",    name: "Classic Slim Belt",    price: "IDR 169.000", swatches: ["#6B4A34", "#2A2521"] },
  { id: "inner-ninja",          name: "Inner Ninja",          price: "IDR 79.000",  badge: "New", swatches: ["#C9B79C", "#2A2521", "#B7A896"] },
  { id: "silk-twilly",          name: "Silk Twilly",          price: "IDR 129.000", swatches: ["#C9B79C", "#B7A896", "#C6A15B"] },
  { id: "pearl-branch-brooch",  name: "Pearl Branch Brooch",  price: "IDR 119.000", swatches: ["#C6A15B"] },
  { id: "hair-claw-clip",       name: "Hair Claw Clip",       price: "IDR 59.000",  swatches: ["#B7A896", "#6B4A34", "#C9B79C"] },
  { id: "initial-pin",          name: "Initial Pin",          price: "IDR 89.000",  badge: "New", swatches: ["#C6A15B", "#B9B7B2"] },
  { id: "everyday-tote-bag",    name: "Everyday Tote Bag",    price: "IDR 599.000", swatches: ["#C9B79C", "#B7A896", "#6B4A34"] },
  { id: "ribbed-socks",         name: "Ribbed Socks",         price: "IDR 39.000",  swatches: ["#F4EFE7", "#B7A896", "#2A2521"] },
  { id: "hair-tie-set",         name: "Hair Tie Set",         price: "IDR 39.000",  swatches: ["#C9B79C", "#6B4A34"] },
  { id: "pearl-brooch",         name: "Pearl Brooch",         price: "IDR 119.000", swatches: ["#C6A15B"] },
];

type DropdownKey = "type" | "material" | "color" | "price" | "sort" | null;

/* ─────────────────────────────────────────────────────────── */

export default function AccessoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All Accessories");
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

        .ac-c { font-family: 'Cormorant Garamond', serif; }
        .ac-j { font-family: 'Jost', sans-serif; }

        .ac-page { background: var(--silk); }

        /* ── Full-bleed hero banner ── */
        .ac-hero {
          position: relative;
          width: 100%;
          min-height: 46vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--parchment);
        }
        .ac-hero-img {
          position: absolute;
          inset: 0;
          background-image: url('/image/accessories/hero.jpg');
          background-size: cover;
          background-position: center 40%;
        }
        .ac-hero-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            rgba(244,239,231,0.9) 0%,
            rgba(244,239,231,0.68) 32%,
            rgba(244,239,231,0.18) 58%,
            transparent 78%
          );
        }
        .ac-hero-body {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 44px;
        }
        .ac-hero-breadcrumb {
          margin-bottom: 20px;
        }
        .ac-hero-breadcrumb-link {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .ac-hero-breadcrumb-link:hover { color: var(--camel); }
        .ac-hero-breadcrumb-sep {
          color: var(--taupe);
          margin: 0 8px;
          font-size: 10px;
        }
        .ac-hero-breadcrumb-current {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso);
        }
        .ac-hero-title {
          font-weight: 300;
          font-size: clamp(38px, 4.4vw, 58px);
          letter-spacing: -0.01em;
          color: var(--espresso);
          margin-bottom: 20px;
        }
        .ac-hero-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.85;
          color: var(--espresso-soft);
          max-width: 340px;
        }

        /* ── Toolbar row ── */
        .ac-toolbar {
          border-top: 1px solid rgba(58,50,42,0.1);
          border-bottom: 1px solid rgba(58,50,42,0.1);
          padding: 16px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .ac-mobile-filter-btn {
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
        .ac-filters-row {
          display: flex;
          align-items: center;
          gap: 28px;
          position: relative;
        }
        .ac-filter-btn {
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
        .ac-filter-btn:hover, .ac-filter-btn.active { color: var(--espresso); }
        .ac-filter-caret {
          width: 8px;
          height: 8px;
          transition: transform 0.3s ease;
        }
        .ac-filter-caret.open { transform: rotate(180deg); }

        .ac-dropdown {
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
        .ac-dropdown-item {
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
        .ac-dropdown-item:hover { background: rgba(169,129,79,0.07); color: var(--espresso); }

        .ac-sort-wrap { position: relative; }

        /* ── Layout: sidebar + grid ── */
        .ac-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 48px;
          padding: 40px 44px 100px;
        }

        /* Sidebar */
        .ac-sidebar-block { margin-bottom: 40px; }
        .ac-sidebar-heading {
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 16px;
        }
        .ac-cat-list, .ac-color-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .ac-cat-btn {
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
        .ac-cat-btn.active { color: var(--espresso); font-weight: 500; }
        .ac-cat-btn:hover { color: var(--camel); }

        .ac-color-btn {
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
        .ac-color-btn:hover { color: var(--espresso); }
        .ac-color-btn.active { color: var(--espresso); font-weight: 500; }
        .ac-color-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(58,50,42,0.15);
          flex-shrink: 0;
          position: relative;
        }
        .ac-color-dot.checked::after {
          content: '';
          position: absolute;
          inset: -3px;
          border: 1px solid var(--camel);
          border-radius: 50%;
        }

        .ac-view-more {
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
        .ac-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px 24px;
        }
        .ac-card { display: flex; flex-direction: column; }
        .ac-card-img-wrap {
          position: relative;
          aspect-ratio: 3 / 4;
          background: var(--parchment);
          overflow: hidden;
          margin-bottom: 16px;
          border-radius: 1px;
        }
        .ac-card-img-el {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 20%;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .ac-card:hover .ac-card-img-el { transform: scale(1.045); }
        .ac-card-badge {
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
        .ac-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16.5px;
          font-weight: 500;
          color: var(--espresso);
          margin-bottom: 6px;
        }
        .ac-card-price {
          font-family: 'Jost', sans-serif;
          font-size: 12.5px;
          font-weight: 300;
          color: var(--espresso-soft);
          margin-bottom: 12px;
        }
        .ac-card-swatches {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .ac-card-swatch {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 1px solid rgba(58,50,42,0.15);
        }

        /* ── Mobile ── */
        @media (max-width: 1024px) {
          .ac-hero { min-height: 40vh; }
        }
        @media (max-width: 900px) {
          .ac-hero-body, .ac-toolbar, .ac-body { padding-left: 24px; padding-right: 24px; }
          .ac-hero-veil {
            background: linear-gradient(
              100deg,
              rgba(244,239,231,0.94) 0%,
              rgba(244,239,231,0.75) 46%,
              rgba(244,239,231,0.3) 70%,
              transparent 90%
            );
          }
          .ac-mobile-filter-btn { display: inline-flex; }
          .ac-filters-row { display: none; }
          .ac-body { grid-template-columns: 1fr; }
          .ac-sidebar { display: none; }
          .ac-sidebar.open { display: block; }
          .ac-grid { grid-template-columns: 1fr 1fr; gap: 20px 16px; }
        }
        @media (max-width: 520px) {
          .ac-grid { grid-template-columns: 1fr 1fr; }
          .ac-toolbar { flex-wrap: wrap; }
        }
      `}</style>

      <div className="ac-page">
        {/* ── Hero ── */}
        <div className="ac-hero">
          <div className="ac-hero-img" />
          <div className="ac-hero-veil" />
          <div className="ac-hero-body">
            <div className="ac-hero-breadcrumb">
              <Link href="/basic" className="ac-hero-breadcrumb-link">Home</Link>
              <span className="ac-hero-breadcrumb-sep">/</span>
              <span className="ac-hero-breadcrumb-current">Accessories</span>
            </div>
            <h1 className="ac-c ac-hero-title">Accessories</h1>
            <p className="ac-j ac-hero-desc">
              Thoughtful details that complete your look. Timeless pieces designed to accompany you, every day.
            </p>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="ac-toolbar">
          <button
            className="ac-mobile-filter-btn"
            onClick={() => setMobileFiltersOpen((p) => !p)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4h13M1 7.5h13M1 11h13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            Filter
          </button>

          <div className="ac-filters-row">
            {([
              { key: "type" as const, label: "Type", items: types },
              { key: "material" as const, label: "Material", items: materials },
              { key: "color" as const, label: "Color", items: colors.map((c) => c.name) },
              { key: "price" as const, label: "Price", items: prices },
            ]).map((f) => (
              <div key={f.key} style={{ position: "relative" }}>
                <button
                  className={`ac-filter-btn ${openDropdown === f.key ? "active" : ""}`}
                  onClick={() => toggleDropdown(f.key)}
                >
                  {f.label}
                  <svg className={`ac-filter-caret ${openDropdown === f.key ? "open" : ""}`} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openDropdown === f.key && (
                  <div className="ac-dropdown">
                    {f.items.map((item) => (
                      <button
                        key={item}
                        className="ac-dropdown-item"
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

          <div className="ac-sort-wrap">
            <button
              className={`ac-filter-btn ${openDropdown === "sort" ? "active" : ""}`}
              onClick={() => toggleDropdown("sort")}
            >
              Sort By: {activeSort}
              <svg className={`ac-filter-caret ${openDropdown === "sort" ? "open" : ""}`} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openDropdown === "sort" && (
              <div className="ac-dropdown" style={{ left: "auto", right: 0 }}>
                {sorts.map((s) => (
                  <button
                    key={s}
                    className="ac-dropdown-item"
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
        <div className="ac-body">
          {/* Sidebar */}
          <aside className={`ac-sidebar ${mobileFiltersOpen ? "open" : ""}`}>
            <div className="ac-sidebar-block">
              <p className="ac-sidebar-heading">Categories</p>
              <div className="ac-cat-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`ac-cat-btn ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="ac-sidebar-block">
              <p className="ac-sidebar-heading">Color</p>
              <div className="ac-color-list">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    className={`ac-color-btn ${activeColors.includes(c.name) ? "active" : ""}`}
                    onClick={() => toggleColor(c.name)}
                  >
                    <span
                      className={`ac-color-dot ${activeColors.includes(c.name) ? "checked" : ""}`}
                      style={{ background: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
                <button className="ac-view-more">View more</button>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="ac-grid">
            {products.map((p) => (
              <Link key={p.id} href={`/accessories/${p.id}`} className="ac-card">
                <div className="ac-card-img-wrap">
                  <div
                    className="ac-card-img-el"
                    style={{ backgroundImage: `url('/image/accessories/products/${p.id}.jpg')` }}
                  />
                  {p.badge && (
                    <span className="ac-card-badge">{p.badge}</span>
                  )}
                </div>
                <h3 className="ac-card-name">{p.name}</h3>
                <p className="ac-card-price">{p.price}</p>
                <div className="ac-card-swatches">
                  {p.swatches.map((hex, i) => (
                    <span key={i} className="ac-card-swatch" style={{ background: hex }} />
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