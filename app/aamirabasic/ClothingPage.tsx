"use client";

import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  { id: "linen-flow-dress", name: "Linen Flow Dress", price: "IDR 649.000", image: "/image/products/linen-flow-dress.jpg", badge: "New", swatches: ["#B7A896", "#EBE3D6", "#3A322A"] },
  { id: "relaxed-shirt", name: "Relaxed Shirt", price: "IDR 429.000", image: "/image/products/relaxed-shirt.jpg", badge: "New", swatches: ["#8C7A65", "#D9C9B4", "#3A322A"] },
  { id: "essential-blouse", name: "Essential Blouse", price: "IDR 399.000", image: "/image/products/essential-blouse.jpg", badge: "Best Seller", swatches: ["#EBE3D6", "#D9C9B4", "#B7A896"] },
  { id: "soft-knit-top", name: "Soft Knit Top", price: "IDR 379.000", image: "/image/products/soft-knit-top.jpg", badge: null, swatches: ["#8C7A65", "#D9C9B4", "#EBE3D6"] },
  { id: "light-outer-layer", name: "Light Outer Layer", price: "IDR 589.000", image: "/image/products/light-outer-layer.jpg", badge: null, swatches: ["#8C7A65", "#B7A896", "#3A322A"] },
  { id: "classic-shirt", name: "Classic Shirt", price: "IDR 409.000", image: "/image/products/classic-shirt.jpg", badge: null, swatches: ["#EBE3D6", "#D9C9B4", "#B7A896"] },
  { id: "flowy-wide-pants", name: "Flowy Wide Pants", price: "IDR 479.000", image: "/image/products/flowy-wide-pants.jpg", badge: null, swatches: ["#8C7A65", "#B7A896", "#3A322A"] },
  { id: "daily-long-dress", name: "Daily Long Dress", price: "IDR 559.000", image: "/image/products/daily-long-dress.jpg", badge: "New", swatches: ["#8C7A65", "#B7A896", "#3A322A"] },
  { id: "everyday-set", name: "Everyday Set", price: "IDR 699.000", image: "/image/products/everyday-set.jpg", badge: null, swatches: ["#3A322A", "#5C5248", "#B7A896"] },
  { id: "oversized-shirt", name: "Oversized Shirt", price: "IDR 439.000", image: "/image/products/oversized-shirt.jpg", badge: "New", swatches: ["#D9C9B4", "#EBE3D6", "#B7A896"] },
  { id: "belted-shirt-dress", name: "Belted Shirt Dress", price: "IDR 619.000", image: "/image/products/belted-shirt-dress.jpg", badge: null, swatches: ["#8C7A65", "#B7A896", "#3A322A"] },
  { id: "straight-pants", name: "Straight Pants", price: "IDR 429.000", image: "/image/products/straight-pants.jpg", badge: null, swatches: ["#EBE3D6", "#D9C9B4", "#B7A896"] },
  { id: "linen-shirt", name: "Linen Shirt", price: "IDR 409.000", image: "/image/products/linen-shirt.jpg", badge: null, swatches: ["#EBE3D6", "#D9C9B4", "#B7A896"] },
  { id: "flowy-skirt", name: "Flowy Skirt", price: "IDR 459.000", image: "/image/products/flowy-skirt.jpg", badge: null, swatches: ["#EBE3D6", "#D9C9B4", "#B7A896"] },
  { id: "basic-wide-pants", name: "Basic Wide Pants", price: "IDR 449.000", image: "/image/products/basic-wide-pants.jpg", badge: null, swatches: ["#3A322A", "#D9C9B4", "#B7A896"] },
  { id: "minimal-dress", name: "Minimal Dress", price: "IDR 549.000", image: "/image/products/minimal-dress.jpg", badge: "New", swatches: ["#5C5248", "#8C7A65", "#3A322A"] },
];

const RELATED = [
  { id: "linen-blend-blazer", name: "Linen Blend Blazer", price: "IDR 619.000", image: "/image/products/linen-blend-blazer.jpg", swatches: ["#B7A896", "#8C7A65"] },
  { id: "sleeveless-dress", name: "Sleeveless Dress", price: "IDR 499.000", image: "/image/products/sleeveless-dress.jpg", swatches: ["#3A322A", "#8C7A65", "#B7A896"] },
  { id: "relaxed-blouse", name: "Relaxed Blouse", price: "IDR 379.000", image: "/image/products/relaxed-blouse.jpg", swatches: ["#EBE3D6", "#D9C9B4"] },
  { id: "pleated-pants", name: "Pleated Pants", price: "IDR 449.000", image: "/image/products/pleated-pants.jpg", swatches: ["#8C7A65", "#3A322A"] },
  { id: "long-outer-shirt", name: "Long Outer Shirt", price: "IDR 569.000", image: "/image/products/long-outer-shirt.jpg", swatches: ["#8C7A65", "#B7A896", "#3A322A"] },
  { id: "square-neck-top", name: "Square Neck Top", price: "IDR 529.000", image: "/image/products/square-neck-top.jpg", swatches: ["#EBE3D6", "#D9C9B4", "#B7A896"] },
];

const CATEGORIES = ["All Clothing", "Dresses", "Tops", "Shirts", "Pants", "Skirts", "Outerwear", "Sets"];
const COLORS = [
  { name: "Beige", hex: "#D9C9B4" },
  { name: "White", hex: "#FFFDF9" },
  { name: "Black", hex: "#181512" },
  { name: "Brown", hex: "#5C4A36" },
  { name: "Grey", hex: "#A9A29A" },
];

export default function ClothingPage() {
  const [inView, setInView] = useState(false);
  const [ebInView, setEbInView] = useState(false);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const ebRef = useRef(null);

  useEffect(() => {
    const gridObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (gridRef.current) gridObs.observe(gridRef.current);

    const ebObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setEbInView(true); },
      { threshold: 0.2 }
    );
    if (ebRef.current) ebObs.observe(ebRef.current);

    return () => {
      gridObs.disconnect();
      ebObs.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --ivory:         #F4EFE7;
          --silk:          #FAF7F2;
          --parchment:     #EBE3D6;
          --sand:          #D9C9B4;
          --taupe:         #B7A896;
          --espresso:      #3A322A;
          --espresso-soft: #5C5248;
          --camel:         #A9814F;
          --eb-clay:       #9C8163;
        }

        .cp-c { font-family: 'Cormorant Garamond', serif; }
        .cp-j { font-family: 'Jost', sans-serif; }

        .cp-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-reveal.on { opacity: 1; transform: none; }

        /* ---------- Announcement + header ---------- */
        .cp-announce {
          background: var(--espresso);
          color: var(--ivory);
          text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.12em;
          padding: 9px 0;
        }

        .cp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 5vw;
          background: var(--ivory);
        }

        .cp-logo {
          font-weight: 500;
          font-size: 21px;
          letter-spacing: 0.14em;
          color: var(--espresso);
          line-height: 1;
        }
        .cp-logo span {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          letter-spacing: 0.34em;
          color: var(--taupe);
          text-align: center;
          margin-top: 3px;
        }

        .cp-nav {
          display: flex;
          gap: 34px;
        }
        .cp-nav a {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid transparent;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .cp-nav a:hover, .cp-nav a.active {
          color: var(--espresso);
          border-color: var(--camel);
        }

        .cp-icons {
          display: flex;
          align-items: center;
          gap: 20px;
          color: var(--espresso-soft);
        }

        /* ---------- Category hero ---------- */
        .cp-hero {
          position: relative;
          width: 100%;
          height: clamp(260px, 32vw, 380px);
          overflow: hidden;
          background: var(--parchment);
          display: flex;
          align-items: center;
        }
        .cp-hero-img {
          position: absolute;
          inset: 0;
          background-image: url('/image/category/clothing-banner.jpg');
          background-size: cover;
          background-position: center 25%;
          filter: saturate(0.95) brightness(1);
        }
        .cp-hero-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(244,239,231,0.88) 0%,
            rgba(244,239,231,0.55) 32%,
            rgba(244,239,231,0.1) 55%,
            transparent 72%
          );
        }
        .cp-hero-body {
          position: relative;
          z-index: 2;
          padding: 0 5vw;
          max-width: 420px;
        }
        .cp-hero-crumb {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          margin-bottom: 16px;
        }
        .cp-hero-title {
          font-weight: 400;
          font-size: clamp(32px, 3.4vw, 46px);
          color: var(--espresso);
          margin-bottom: 14px;
        }
        .cp-hero-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          line-height: 1.75;
          color: var(--espresso-soft);
          max-width: 34ch;
        }

        /* ---------- Toolbar ---------- */
        .cp-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 5vw;
          border-bottom: 1px solid rgba(58,50,42,0.08);
        }
        .cp-toolbar-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .cp-filter-btn, .cp-dropdown, .cp-sort {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--espresso-soft);
          background: none;
          border: none;
          cursor: pointer;
        }
        .cp-toolbar-dropdowns {
          display: none;
          align-items: center;
          gap: 26px;
        }
        @media (min-width: 900px) {
          .cp-toolbar-dropdowns { display: flex; }
        }

        /* ---------- Layout ---------- */
        .cp-layout {
          display: flex;
          align-items: flex-start;
          gap: 3vw;
          padding: 40px 5vw 0;
        }

        .cp-sidebar {
          display: none;
          flex: 0 0 210px;
          max-width: 210px;
        }
        @media (min-width: 900px) {
          .cp-sidebar { display: block; }
        }

        .cp-sidebar-heading {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--taupe);
          margin-bottom: 18px;
        }

        .cp-cat-list {
          list-style: none;
          padding: 0;
          margin: 0 0 40px;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }
        .cp-cat-list li a {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: var(--espresso-soft);
          text-decoration: none;
        }
        .cp-cat-list li a.active {
          color: var(--espresso);
          font-weight: 500;
        }

        .cp-color-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .cp-color-list li {
          display: flex;
          align-items: center;
          gap: 11px;
          font-family: 'Jost', sans-serif;
          font-size: 12.5px;
          font-weight: 300;
          color: var(--espresso-soft);
        }
        .cp-color-dot {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 1px solid rgba(58,50,42,0.15);
        }
        .cp-view-more {
          margin-top: 4px;
          font-family: 'Jost', sans-serif;
          font-size: 11.5px;
          color: var(--taupe);
        }

        /* ---------- Product grid ---------- */
        .cp-main { flex: 1; min-width: 0; }

        .cp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.6vw 1.4vw;
          margin-bottom: 44px;
        }
        @media (max-width: 1024px) {
          .cp-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .cp-card { display: flex; flex-direction: column; text-decoration: none; }

        .cp-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--parchment);
          margin-bottom: 14px;
        }
        .cp-img {
          position: absolute;
          inset: -4%;
          background-size: cover;
          background-position: center;
          filter: saturate(0.94) brightness(1);
          transition: transform 1.6s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-card:hover .cp-img { transform: scale(1.04); }

        .cp-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          padding: 5px 12px;
          background: rgba(58,50,42,0.82);
          color: var(--ivory);
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 999px;
          white-space: nowrap;
        }

        .cp-name {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          color: var(--espresso);
          margin-bottom: 5px;
        }
        .cp-price {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 12px;
          color: var(--espresso-soft);
          margin-bottom: 9px;
        }
        .cp-swatches { display: flex; gap: 6px; }
        .cp-swatch {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid rgba(58,50,42,0.15);
        }

        .cp-loadmore-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 92px;
        }
        .cp-loadmore {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--espresso);
          background: transparent;
          border: 1px solid var(--espresso);
          padding: 15px 46px;
          cursor: pointer;
          transition: background 0.4s ease, color 0.4s ease;
        }
        .cp-loadmore:hover { background: var(--espresso); color: var(--ivory); }

        /* ---------- Editorial strip ---------- */
        .cp-eb-outer { background: var(--silk); padding: 0 5vw 64px; }
        .cp-eb {
          position: relative;
          width: 100%;
          height: clamp(140px, 15vw, 190px);
          display: flex;
          overflow: hidden;
          border-radius: 6px;
          background: var(--eb-clay);
        }
        .cp-eb-img { position: relative; flex: 0 0 46%; max-width: 46%; overflow: hidden; }
        .cp-eb-img-el {
          position: absolute;
          inset: -6%;
          background-image: url('/image/editorial/elevated-essentials.jpg');
          background-size: cover;
          background-position: center 40%;
          filter: saturate(0.9) brightness(0.96);
          transform: scale(1.04);
          transition: transform 2.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cp-eb.on .cp-eb-img-el { transform: scale(1); }
        .cp-eb-fade {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 55%, var(--eb-clay) 100%);
        }
        .cp-eb-body {
          position: relative; z-index: 2; flex: 1;
          display: flex; flex-direction: column; justify-content: center;
          padding: 0 6% 0 3%;
        }
        .cp-eb-title {
          font-weight: 300;
          font-size: clamp(18px, 1.7vw, 24px);
          line-height: 1.25;
          color: var(--ivory);
          margin-bottom: 12px;
        }
        .cp-eb-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 9.5px; font-weight: 400; letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ivory); text-decoration: none;
          transition: gap 0.4s ease;
        }
        .cp-eb-link:hover { gap: 12px; }

        /* ---------- You may also like ---------- */
        .cp-related { padding: 0 5vw 72px; }
        .cp-related-kicker {
          text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--taupe);
          margin-bottom: 30px;
        }
        .cp-related-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.2vw;
        }
        @media (max-width: 1024px) {
          .cp-related-grid { grid-template-columns: repeat(3, 1fr); gap: 5vw 4vw; }
        }

        /* ---------- Newsletter ---------- */
        .cp-newsletter {
          background: var(--parchment);
          padding: 46px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5vw;
        }
        .cp-nl-title {
          font-weight: 400;
          font-size: clamp(22px, 1.8vw, 27px);
          color: var(--espresso);
          margin-bottom: 8px;
        }
        .cp-nl-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.55;
          color: var(--espresso-soft);
        }
        .cp-nl-form { display: flex; align-items: center; gap: 20px; }
        .cp-nl-input {
          width: 210px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(58,50,42,0.4);
          outline: none;
          padding: 8px 2px;
          font-family: 'Jost', sans-serif;
          font-size: 12.5px;
          color: var(--espresso);
        }
        .cp-nl-input::placeholder { color: var(--espresso-soft); opacity: 0.65; }
        .cp-nl-btn {
          background: var(--espresso);
          border: none;
          padding: 12px 24px;
          font-family: 'Jost', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ivory);
          cursor: pointer;
          transition: background 0.4s ease;
        }
        .cp-nl-btn:hover { background: var(--camel); }

        /* ---------- Footer ---------- */
        .cp-footer { background: var(--ivory); padding: 56px 5vw 28px; }
        .cp-footer-top {
          display: flex;
          justify-content: space-between;
          gap: 4vw;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .cp-footer-brand { max-width: 200px; }
        .cp-footer-logo {
          font-weight: 500;
          font-size: 17px;
          letter-spacing: 0.12em;
          color: var(--espresso);
        }
        .cp-footer-logo span {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 7px;
          letter-spacing: 0.3em;
          color: var(--taupe);
          margin-top: 4px;
        }
        .cp-footer-cols { display: flex; gap: 6vw; flex-wrap: wrap; }
        .cp-footer-col h4 {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 16px;
        }
        .cp-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .cp-footer-col a {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: var(--espresso-soft);
          text-decoration: none;
        }
        .cp-footer-social { display: flex; gap: 14px; color: var(--espresso-soft); }
        .cp-footer-bottom {
          border-top: 1px solid rgba(58,50,42,0.1);
          padding-top: 22px;
          text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          color: var(--taupe);
        }
      `}</style>

      <div className="cp-announce">FREE SHIPPING FOR ORDERS OVER IDR 750.000</div>

      <header className="cp-header">
        <div className="cp-logo">
          AAMIRA
          <span>BASIC</span>
        </div>
        <nav className="cp-nav">
          <a href="/new-in">New In</a>
          <a href="/collections/clothing" className="active">Clothing</a>
          <a href="/collections/hijab">Hijab</a>
          <a href="/collections/essentials">Essentials</a>
          <a href="/collections">Collections</a>
          <a href="/about">About</a>
        </nav>
        <div className="cp-icons">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.3"/><path d="m20 20-3.6-3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.3"/><path d="M4.5 20c1.4-3.6 4.3-5.4 7.5-5.4s6.1 1.8 7.5 5.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M6 8h12l-1 12.5H7L6 8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3"/></svg>
        </div>
      </header>

      <section className="cp-hero" ref={heroRef}>
        <div className="cp-hero-img" />
        <div className="cp-hero-veil" />
        <div className="cp-hero-body">
          <p className="cp-hero-crumb">Home / Clothing</p>
          <h1 className="cp-c cp-hero-title">Clothing</h1>
          <p className="cp-j cp-hero-desc">
            Timeless pieces crafted for everyday elegance. Designed to move
            with you, in every season.
          </p>
        </div>
      </section>

      <div className="cp-toolbar">
        <div className="cp-toolbar-left">
          <button className="cp-filter-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            Filter
          </button>
          <div className="cp-toolbar-dropdowns">
            <button className="cp-dropdown">Category &darr;</button>
            <button className="cp-dropdown">Size &darr;</button>
            <button className="cp-dropdown">Color &darr;</button>
            <button className="cp-dropdown">Price &darr;</button>
          </div>
        </div>
        <button className="cp-sort">Sort by: Newest &darr;</button>
      </div>

      <div className="cp-layout">
        <aside className="cp-sidebar">
          <p className="cp-sidebar-heading">Categories</p>
          <ul className="cp-cat-list">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <a href="#" className={cat === "All Clothing" ? "active" : ""}>{cat}</a>
              </li>
            ))}
          </ul>

          <p className="cp-sidebar-heading">Color</p>
          <ul className="cp-color-list">
            {COLORS.map((c) => (
              <li key={c.name}>
                <span className="cp-color-dot" style={{ backgroundColor: c.hex }} />
                {c.name}
              </li>
            ))}
          </ul>
          <p className="cp-view-more">View more</p>
        </aside>

        <div className="cp-main" ref={gridRef}>
          <div className="cp-grid">
            {PRODUCTS.map((p) => (
              <a key={p.id} href={`/products/${p.id}`} className={`cp-card cp-reveal ${inView ? "on" : ""}`}>
                <div className="cp-frame">
                  {p.badge && <span className="cp-badge">{p.badge}</span>}
                  <div className="cp-img" style={{ backgroundImage: `url('${p.image}')` }} />
                </div>
                <p className="cp-name">{p.name}</p>
                <p className="cp-price">{p.price}</p>
                <div className="cp-swatches">
                  {p.swatches.map((s, i) => (
                    <span key={i} className="cp-swatch" style={{ backgroundColor: s }} />
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="cp-loadmore-wrap">
            <button className="cp-loadmore">Load More</button>
          </div>
        </div>
      </div>

      <div className="cp-eb-outer">
        <div className={`cp-eb ${ebInView ? "on" : ""}`} ref={ebRef}>
          <div className="cp-eb-img">
            <div className="cp-eb-img-el" />
            <div className="cp-eb-fade" />
          </div>
          <div className="cp-eb-body">
            <h2 className="cp-c cp-eb-title">
              Elevated essentials.
              <br />
              Endless combinations.
            </h2>
            <a href="/collections" className="cp-eb-link">
              Discover The Collection &rarr;
            </a>
          </div>
        </div>
      </div>

      <section className="cp-related">
        <p className="cp-related-kicker">You May Also Like</p>
        <div className="cp-related-grid">
          {RELATED.map((p) => (
            <a key={p.id} href={`/products/${p.id}`} className="cp-card">
              <div className="cp-frame">
                <div className="cp-img" style={{ backgroundImage: `url('${p.image}')` }} />
              </div>
              <p className="cp-name">{p.name}</p>
              <p className="cp-price">{p.price}</p>
              <div className="cp-swatches">
                {p.swatches.map((s, i) => (
                  <span key={i} className="cp-swatch" style={{ backgroundColor: s }} />
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="cp-newsletter">
        <div>
          <h2 className="cp-c cp-nl-title">Be the first to know</h2>
          <p className="cp-j cp-nl-desc">
            Get early access to new collections,
            <br />
            exclusive offers, and more.
          </p>
        </div>
        <form className="cp-nl-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="Your email" className="cp-nl-input" />
          <button type="submit" className="cp-nl-btn">Subscribe</button>
        </form>
      </section>

      <footer className="cp-footer">
        <div className="cp-footer-top">
          <div className="cp-footer-brand">
            <div className="cp-footer-logo">
              AAMIRA
              <span>BASIC</span>
            </div>
          </div>
          <div className="cp-footer-cols">
            <div className="cp-footer-col">
              <h4>Shop</h4>
              <ul>
                <li><a href="/new-in">New In</a></li>
                <li><a href="/collections/clothing">Clothing</a></li>
                <li><a href="/collections/hijab">Hijab</a></li>
                <li><a href="/collections/essentials">Essentials</a></li>
                <li><a href="/collections">Collections</a></li>
              </ul>
            </div>
            <div className="cp-footer-col">
              <h4>Customer Care</h4>
              <ul>
                <li><a href="/help">Help &amp; FAQ</a></li>
                <li><a href="/shipping">Shipping &amp; Delivery</a></li>
                <li><a href="/returns">Returns &amp; Exchanges</a></li>
                <li><a href="/size-guide">Size Guide</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
            <div className="cp-footer-col">
              <h4>About</h4>
              <ul>
                <li><a href="/our-story">Our Story</a></li>
                <li><a href="/sustainability">Sustainability</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/terms">Terms &amp; Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="cp-footer-col">
              <h4>Follow Us</h4>
              <div className="cp-footer-social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.3"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 3v9.5a3.5 3.5 0 1 1-3-3.46" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M14 3c.5 2.3 2 3.6 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="16" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="12" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.3"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="cp-footer-bottom">
          &copy; 2026 Aamira Basic. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}