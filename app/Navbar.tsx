"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MegaMenuName = "collections" | "atelier";

const collectionsColumns = [
  {
    heading: "Signature Collections",
    links: [
      ["Celestine", "/collections/celestine"],
      ["Delara", "/collections/delara"],
      ["Lumière", "/collections/lumiere"],
      ["Mireille", "/collections/mireille"],
      ["Isadora", "/collections/isadora"],
      ["Seraphine", "/collections/seraphine"],
    ],
  },
  {
    heading: "Discover",
    links: [
      ["View All Dresses", "#collections"],
      ["New Arrivals", "#collections"],
      ["Best Sellers", "#collections"],
      ["Featured Gowns", "#collections"],
    ],
  },
  {
    heading: "The Experience",
    links: [
      ["Lookbook", "#collections"],
      ["Real Brides", "/story"],
      ["Bespoke Journey", "/book-appointment"],
    ],
  },
] as const;

const atelierColumns = [
  {
    heading: "Our Process",
    links: [
      ["Consultation", "/book-appointment"],
      ["Design", "#atelier"],
      ["Fittings", "#atelier"],
      ["Handcrafted", "#atelier"],
      ["Delivery", "#atelier"],
    ],
  },
  {
    heading: "Craftsmanship",
    links: [
      ["Fabric & Materials", "#atelier"],
      ["Detail & Embellishment", "#atelier"],
      ["Artisan Techniques", "#atelier"],
    ],
  },
  {
    heading: "Atelier Services",
    links: [
      ["Made to Measure", "/book-appointment"],
      ["Alterations", "/book-appointment"],
      ["Preservation", "#atelier"],
    ],
  },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuName | null>(null);
  const collectionsTriggerRef = useRef<HTMLButtonElement>(null);
  const atelierTriggerRef = useRef<HTMLButtonElement>(null);
  const collectionsPanelRef = useRef<HTMLDivElement>(null);
  const atelierPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const hero = document.getElementById("bridal-hero");
      const threshold = hero ? hero.offsetHeight * 0.72 : 520;
      setScrolled(window.scrollY >= threshold);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const toggleMenu = (menu: MegaMenuName) => {
    setOpenMenu((current) => current === menu ? null : menu);
  };

  const focusFirstMenuLink = (menu: MegaMenuName) => {
    setOpenMenu(menu);
    window.requestAnimationFrame(() => {
      const panel = menu === "collections" ? collectionsPanelRef.current : atelierPanelRef.current;
      panel?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
  };

  const closeMenuAndRestoreFocus = () => {
    if (openMenu === "collections") collectionsTriggerRef.current?.focus();
    if (openMenu === "atelier") atelierTriggerRef.current?.focus();
    setOpenMenu(null);
  };

  return (
    <>
      <style>{`
        .bridal-desktop-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 80;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          min-height: 74px;
          padding: 0 47px;
          color: var(--ivory);
          background: transparent;
          border-bottom: 1px solid transparent;
          box-shadow: 0 8px 24px rgba(0,0,0,0);
          backdrop-filter: blur(0);
          -webkit-backdrop-filter: blur(0);
          transition:
            min-height 300ms cubic-bezier(.2,.7,.2,1),
            padding 300ms cubic-bezier(.2,.7,.2,1),
            background-color 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease,
            backdrop-filter 300ms ease;
        }

        .bridal-desktop-nav.is-scrolled {
          min-height: 58px;
          padding-inline: 52px;
          background: rgba(8,7,6,0.94);
          border-bottom-color: rgba(212,180,131,0.12);
          box-shadow: 0 8px 24px rgba(0,0,0,0.16);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .bridal-desktop-nav-left,
        .bridal-desktop-nav-right {
          display: flex;
          align-items: center;
        }

        .bridal-desktop-nav-left {
          justify-content: flex-start;
          gap: 28px;
        }

        .bridal-desktop-nav-right {
          justify-content: flex-end;
          gap: 18px;
        }

        .bridal-desktop-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: rgba(240,235,225,0.72);
          font-family: 'Cormorant Garamond', serif;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.16em;
          line-height: 1;
          text-decoration: none;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.35s ease;
        }

        .bridal-desktop-nav-link::after {
          content: '';
          position: absolute;
          right: 0.18em;
          bottom: -5px;
          left: 0;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }

        .bridal-desktop-nav-link.is-active::after {
          transform: scaleX(1);
        }

        .bridal-desktop-nav-link:hover,
        .bridal-desktop-nav-link:focus-visible {
          color: var(--ivory);
        }

        .bridal-desktop-nav-link:hover::after,
        .bridal-desktop-nav-link:focus-visible::after {
          transform: scaleX(1);
        }

        .bridal-desktop-nav-link:focus-visible,
        .bridal-desktop-logo:focus-visible,
        .bridal-desktop-appointment:focus-visible {
          outline: 1px solid var(--gold);
          outline-offset: 6px;
        }

        .bridal-desktop-caret {
          width: 7px;
          height: 7px;
          flex: none;
          opacity: 0.62;
          transition: transform 280ms cubic-bezier(.2,.7,.2,1);
        }

        .bridal-desktop-trigger {
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
        }

        .bridal-desktop-trigger[aria-expanded="true"] {
          color: var(--ivory);
        }

        .bridal-desktop-trigger[aria-expanded="true"]::after {
          transform: scaleX(1);
        }

        .bridal-desktop-trigger[aria-expanded="true"] .bridal-desktop-caret {
          transform: rotate(180deg);
        }

        .bridal-desktop-logo {
          grid-column: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--ivory);
          font-family: 'Cormorant Garamond', serif;
          text-decoration: none;
          text-transform: uppercase;
        }

        .bridal-desktop-logo-main {
          padding-left: 0.35em;
          font-size: clamp(28px, 2.65vw, 38px);
          font-weight: 300;
          letter-spacing: 0.35em;
          line-height: 0.86;
          transition: font-size 300ms cubic-bezier(.2,.7,.2,1);
        }

        .bridal-desktop-logo-sub {
          margin-top: 7px;
          padding-left: 0.48em;
          color: rgba(240,235,225,0.68);
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 300;
          letter-spacing: 0.48em;
          line-height: 1;
          transition:
            margin-top 300ms cubic-bezier(.2,.7,.2,1),
            font-size 300ms cubic-bezier(.2,.7,.2,1);
        }

        .bridal-desktop-nav.is-scrolled .bridal-desktop-logo-main {
          font-size: 24px;
        }

        .bridal-desktop-nav.is-scrolled .bridal-desktop-logo-sub {
          margin-top: 5px;
          font-size: 6.5px;
        }

        .bridal-desktop-separator {
          width: 1px;
          height: 27px;
          flex: none;
          background: rgba(200,191,180,0.34);
          transition: height 300ms cubic-bezier(.2,.7,.2,1);
        }

        .bridal-desktop-nav.is-scrolled .bridal-desktop-separator {
          height: 21px;
        }

        .bridal-desktop-appointment {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 132px;
          padding: 9px 4px 8px;
          border-top: 1px solid rgba(184,150,62,0.52);
          border-bottom: 1px solid rgba(184,150,62,0.52);
          color: var(--champagne);
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.16em;
          line-height: 1;
          text-decoration: none;
          text-transform: uppercase;
          white-space: nowrap;
          transition:
            color 0.35s ease,
            border-color 0.35s ease,
            background 0.35s ease,
            min-width 300ms cubic-bezier(.2,.7,.2,1),
            padding 300ms cubic-bezier(.2,.7,.2,1),
            font-size 300ms cubic-bezier(.2,.7,.2,1);
        }

        .bridal-desktop-nav.is-scrolled .bridal-desktop-appointment {
          min-width: 112px;
          padding: 7px 3px 6px;
          font-size: 8px;
        }

        .bridal-desktop-appointment:hover,
        .bridal-desktop-appointment:focus-visible {
          color: var(--ivory);
          border-color: var(--gold);
          background: rgba(184,150,62,0.08);
        }

        .bridal-desktop-basic {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 0.2em;
        }

        .bridal-mega-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, .9fr) minmax(0, .9fr) minmax(280px, 1.15fr);
          min-height: 226px;
          color: var(--noir);
          background: rgba(247,244,239,0.985);
          border-top: 1px solid rgba(28,26,24,0.08);
          box-shadow: 0 18px 42px rgba(18,14,11,0.12);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateY(-7px);
          transform-origin: top;
          transition:
            opacity 280ms ease,
            transform 280ms cubic-bezier(.2,.7,.2,1),
            visibility 0s linear 280ms;
        }

        .bridal-mega-menu.is-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateY(0);
          transition-delay: 0s;
        }

        .bridal-mega-column {
          min-width: 0;
          padding: 26px 34px 28px;
          border-right: 1px solid rgba(28,26,24,0.09);
        }

        .bridal-mega-heading {
          margin: 0 0 20px;
          color: var(--noir);
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 0.24em;
          line-height: 1.3;
          text-transform: uppercase;
        }

        .bridal-mega-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 11px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .bridal-mega-link {
          position: relative;
          color: #5f5750;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          line-height: 1.25;
          text-decoration: none;
          transition: color 220ms ease, transform 220ms cubic-bezier(.2,.7,.2,1);
        }

        .bridal-mega-link::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: -3px;
          left: 0;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 220ms cubic-bezier(.2,.7,.2,1);
        }

        .bridal-mega-link:hover,
        .bridal-mega-link:focus-visible {
          color: var(--noir);
          transform: translateX(2px);
        }

        .bridal-mega-link:hover::after,
        .bridal-mega-link:focus-visible::after {
          transform: scaleX(1);
        }

        .bridal-mega-link:focus-visible,
        .bridal-mega-editorial-link:focus-visible {
          outline: 1px solid var(--gold);
          outline-offset: 5px;
        }

        .bridal-mega-editorial {
          position: relative;
          min-height: 226px;
          overflow: hidden;
          background: var(--noir);
        }

        .bridal-mega-editorial-image {
          position: absolute;
          inset: -3%;
          background-size: cover;
          background-position: center;
          filter: brightness(.72) saturate(.52) sepia(.12);
          transition: transform 700ms cubic-bezier(.16,1,.3,1);
        }

        .bridal-mega-menu-collections .bridal-mega-editorial-image {
          background-image: url('/image/homepage/gambar6.jpg');
          background-position: center 22%;
        }

        .bridal-mega-menu-atelier .bridal-mega-editorial-image {
          background-image: url('/image/wedding/bawah1.webp');
          background-position: center;
        }

        .bridal-mega-editorial::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(18,14,11,.82), rgba(18,14,11,.05) 72%),
            linear-gradient(90deg, rgba(18,14,11,.18), transparent 55%);
        }

        .bridal-mega-editorial-link {
          position: absolute;
          z-index: 2;
          right: 25px;
          bottom: 24px;
          left: 25px;
          color: var(--ivory);
          text-decoration: none;
        }

        .bridal-mega-editorial-copy {
          display: block;
          max-width: 190px;
          margin-bottom: 14px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          font-weight: 300;
          line-height: 1.08;
        }

        .bridal-mega-editorial-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(212,180,131,.65);
          color: var(--champagne);
          font-family: 'Jost', sans-serif;
          font-size: 7.5px;
          font-weight: 300;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .bridal-mega-editorial:hover .bridal-mega-editorial-image {
          transform: scale(1.035);
        }

        @media (max-width: 1000px) {
          .bridal-desktop-nav {
            padding-inline: 34px;
          }

          .bridal-desktop-nav-left {
            gap: 22px;
          }

          .bridal-desktop-nav-right {
            gap: 15px;
          }

          .bridal-desktop-nav-link {
            font-size: 9.5px;
            letter-spacing: 0.14em;
          }

          .bridal-desktop-logo-main {
            font-size: 29px;
          }

          .bridal-desktop-appointment {
            min-width: 124px;
            font-size: 9px;
          }

          .bridal-desktop-basic {
            font-size: 8px;
            letter-spacing: 0.15em;
          }

          .bridal-mega-menu {
            grid-template-columns: 1fr 1fr 1fr minmax(230px, .9fr);
          }

          .bridal-mega-column {
            padding-inline: 24px;
          }
        }

        @media (max-width: 768px) {
          .bridal-desktop-nav {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bridal-desktop-nav,
          .bridal-desktop-nav-link,
          .bridal-desktop-nav-link::after,
          .bridal-desktop-appointment,
          .bridal-desktop-logo-main,
          .bridal-desktop-logo-sub,
          .bridal-desktop-separator,
          .bridal-desktop-caret,
          .bridal-mega-menu,
          .bridal-mega-link,
          .bridal-mega-link::after,
          .bridal-mega-editorial-image {
            transition: none;
          }
        }
      `}</style>

      <nav
        className={`bridal-desktop-nav ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Bridal navigation"
        onMouseLeave={() => setOpenMenu(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && openMenu) {
            event.preventDefault();
            closeMenuAndRestoreFocus();
          }
        }}
      >
        <div className="bridal-desktop-nav-left">
          <button
            ref={collectionsTriggerRef}
            type="button"
            className={`bridal-desktop-nav-link bridal-desktop-trigger ${scrolled ? "is-active" : ""}`}
            aria-expanded={openMenu === "collections"}
            aria-controls="bridal-collections-menu"
            aria-haspopup="true"
            onClick={() => toggleMenu("collections")}
            onMouseEnter={() => setOpenMenu("collections")}
            onFocus={() => setOpenMenu("collections")}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusFirstMenuLink("collections");
              }
            }}
          >
            Collections
            <svg className="bridal-desktop-caret" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            ref={atelierTriggerRef}
            type="button"
            className="bridal-desktop-nav-link bridal-desktop-trigger"
            aria-expanded={openMenu === "atelier"}
            aria-controls="bridal-atelier-menu"
            aria-haspopup="true"
            onClick={() => toggleMenu("atelier")}
            onMouseEnter={() => setOpenMenu("atelier")}
            onFocus={() => setOpenMenu("atelier")}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusFirstMenuLink("atelier");
              }
            }}
          >
            Atelier
            <svg className="bridal-desktop-caret" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <Link href="/bridal" className="bridal-desktop-logo" aria-label="Aamira Bridal home">
          <span className="bridal-desktop-logo-main">Aamira</span>
          <span className="bridal-desktop-logo-sub">Bridal</span>
        </Link>

        <div className="bridal-desktop-nav-right">
          <Link href="/story" className="bridal-desktop-nav-link">Stories</Link>
          <span className="bridal-desktop-separator" aria-hidden="true" />
          <Link href="/book-appointment" className="bridal-desktop-appointment">Book Appointment</Link>
          <span className="bridal-desktop-separator" aria-hidden="true" />
          <Link href="/basic" className="bridal-desktop-nav-link bridal-desktop-basic">Aamira Basic</Link>
        </div>

        <div
          ref={collectionsPanelRef}
          id="bridal-collections-menu"
          className={`bridal-mega-menu bridal-mega-menu-collections ${openMenu === "collections" ? "is-open" : ""}`}
          aria-hidden={openMenu !== "collections"}
        >
          {collectionsColumns.map((column) => (
            <section className="bridal-mega-column" key={column.heading}>
              <h2 className="bridal-mega-heading">{column.heading}</h2>
              <ul className="bridal-mega-list">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="bridal-mega-link" onClick={() => setOpenMenu(null)}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <aside className="bridal-mega-editorial">
            <div className="bridal-mega-editorial-image" aria-hidden="true" />
            <Link href="#collections" className="bridal-mega-editorial-link" onClick={() => setOpenMenu(null)}>
              <span className="bridal-mega-editorial-copy">Timeless elegance, made for you.</span>
              <span className="bridal-mega-editorial-cta">Explore Collections <span aria-hidden="true">→</span></span>
            </Link>
          </aside>
        </div>

        <div
          ref={atelierPanelRef}
          id="bridal-atelier-menu"
          className={`bridal-mega-menu bridal-mega-menu-atelier ${openMenu === "atelier" ? "is-open" : ""}`}
          aria-hidden={openMenu !== "atelier"}
        >
          {atelierColumns.map((column) => (
            <section className="bridal-mega-column" key={column.heading}>
              <h2 className="bridal-mega-heading">{column.heading}</h2>
              <ul className="bridal-mega-list">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="bridal-mega-link" onClick={() => setOpenMenu(null)}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <aside className="bridal-mega-editorial">
            <div className="bridal-mega-editorial-image" aria-hidden="true" />
            <Link href="#atelier" className="bridal-mega-editorial-link" onClick={() => setOpenMenu(null)}>
              <span className="bridal-mega-editorial-copy">Crafted with passion. Designed for a lifetime.</span>
              <span className="bridal-mega-editorial-cta">Learn More <span aria-hidden="true">→</span></span>
            </Link>
          </aside>
        </div>
      </nav>
    </>
  );
}
