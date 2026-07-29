"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MobileScreen = "collections" | "atelier" | null;

const collectionLinks = [
  ["Analise", "/collections/analise"],
  ["Aneesa", "/bridal#gown-aneesa"],
  ["Ayah", "/bridal#gown-ayah"],
  ["Batoel", "/bridal#gown-batoel"],
  ["Yasmin", "/bridal#gown-yasmin"],
  ["Dina", "/bridal#gown-dina"],
  ["Inaz", "/bridal#gown-inaz"],
  ["Jasmine", "/bridal#gown-jasmine"],
  ["Manal", "/bridal#gown-manal"],
  ["Mariam", "/bridal#gown-mariam"],
  ["Mariamm", "/bridal#gown-mariamm"],
  ["Rose", "/bridal#gown-rose"],
] as const;

const atelierLinks = [
  ["Our Process", "#atelier"],
  ["Craftsmanship", "#atelier"],
  ["Made to Measure", "/book-appointment"],
  ["Alterations", "/book-appointment"],
  ["Private Consultation", "/book-appointment"],
] as const;

export default function MobileNavbar({ hideInitialLogo = false }: Readonly<{ hideInitialLogo?: boolean }>) {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<MobileScreen>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mainScreenRef = useRef<HTMLDivElement>(null);
  const collectionsScreenRef = useRef<HTMLDivElement>(null);
  const atelierScreenRef = useRef<HTMLDivElement>(null);

  const activeScreenRef = screen === "collections"
    ? collectionsScreenRef
    : screen === "atelier"
      ? atelierScreenRef
      : mainScreenRef;

  const closeMenu = () => {
    setOpen(false);
    setScreen(null);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const returnToMain = () => {
    setScreen(null);
    window.requestAnimationFrame(() => {
      mainScreenRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    });
  };

  useEffect(() => {
    if (!hideInitialLogo) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById("bridal-hero");
      const threshold = hero ? hero.offsetHeight * .72 : 520;
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
  }, [hideInitialLogo]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      activeScreenRef.current
        ?.querySelector<HTMLElement>("button, a")
        ?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, screen, activeScreenRef]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (screen) returnToMain();
        else closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        activeScreenRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => element.offsetParent !== null);

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, screen, activeScreenRef]);

  return (
    <>
      <style>{`
        .mobile-bridal-bar,
        .mobile-bridal-overlay {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-bridal-bar {
            position: fixed;
            z-index: 110;
            top: 10px;
            right: 10px;
            left: 10px;
            display: grid;
            grid-template-columns: 42px 1fr 42px;
            align-items: center;
            height: 50px;
            padding: 0 7px;
            color: var(--ivory);
            background: rgba(13,11,10,.94);
            border: 1px solid rgba(212,180,131,.11);
            border-radius: 3px;
            box-shadow: 0 5px 15px rgba(0,0,0,.24);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          .mobile-bridal-icon-button {
            display: inline-grid;
            width: 42px;
            height: 42px;
            padding: 0;
            place-items: center;
            border: 0;
            color: var(--champagne);
            background: transparent;
            cursor: pointer;
          }

          .mobile-bridal-icon-button:focus-visible,
          .mobile-bridal-logo:focus-visible,
          .mobile-bridal-menu-link:focus-visible,
          .mobile-bridal-screen-button:focus-visible,
          .mobile-bridal-back:focus-visible,
          .mobile-bridal-close:focus-visible {
            outline: 1px solid var(--gold);
            outline-offset: 2px;
          }

          .mobile-bridal-hamburger {
            display: flex;
            width: 17px;
            flex-direction: column;
            gap: 5px;
          }

          .mobile-bridal-hamburger span {
            display: block;
            width: 17px;
            height: 1px;
            background: currentColor;
          }

          .mobile-bridal-hamburger span:last-child {
            width: 11px;
          }

          .mobile-bridal-logo {
            display: flex;
            min-width: 0;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--ivory);
            font-family: 'Cormorant Garamond', serif;
            text-decoration: none;
            text-transform: uppercase;
            transition:
              opacity 380ms ease,
              transform 380ms cubic-bezier(.2,.7,.2,1);
          }

          .mobile-bridal-bar.hide-initial-logo:not(.is-scrolled) .mobile-bridal-logo {
            opacity: 0;
            transform: translateY(-4px);
            pointer-events: none;
          }

          .mobile-bridal-logo-main {
            padding-left: .35em;
            font-size: 18px;
            font-weight: 300;
            letter-spacing: .35em;
            line-height: .85;
          }

          .mobile-bridal-logo-sub {
            margin-top: 5px;
            padding-left: .45em;
            color: rgba(240,235,225,.62);
            font-family: 'Jost', sans-serif;
            font-size: 5.5px;
            font-weight: 300;
            letter-spacing: .45em;
            line-height: 1;
          }

          .mobile-bridal-appointment {
            justify-self: end;
          }

          .mobile-bridal-overlay {
            position: fixed;
            z-index: 130;
            inset: 0;
            display: block;
            color: var(--ivory);
            background:
              radial-gradient(circle at 50% 0%, rgba(184,150,62,.08), transparent 34%),
              rgba(10,9,8,.985);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: translateY(-8px);
            transition:
              opacity 300ms ease,
              transform 300ms cubic-bezier(.2,.7,.2,1),
              visibility 0s linear 300ms;
          }

          .mobile-bridal-overlay.is-open {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform: translateY(0);
            transition-delay: 0s;
          }

          .mobile-bridal-overlay:not(.is-open),
          .mobile-bridal-overlay:not(.is-open) * {
            pointer-events: none !important;
          }

          .mobile-bridal-screen {
            position: absolute;
            z-index: 0;
            inset: 0;
            display: flex;
            overflow-y: auto;
            flex-direction: column;
            padding: max(22px, env(safe-area-inset-top)) 22px max(28px, env(safe-area-inset-bottom));
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: translateX(18px);
            transition:
              opacity 260ms ease,
              transform 260ms cubic-bezier(.2,.7,.2,1),
              visibility 0s linear 260ms;
          }

          .mobile-bridal-screen:not(.is-active),
          .mobile-bridal-screen:not(.is-active) * {
            pointer-events: none !important;
          }

          .mobile-bridal-screen.is-active {
            z-index: 1;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform: translateX(0);
            transition-delay: 0s;
          }

          .mobile-bridal-screen-header {
            display: grid;
            grid-template-columns: 44px 1fr 44px;
            align-items: center;
            min-height: 44px;
            margin-bottom: 38px;
          }

          .mobile-bridal-screen-title {
            justify-self: center;
            color: rgba(240,235,225,.76);
            font-family: 'Jost', sans-serif;
            font-size: 9px;
            font-weight: 300;
            letter-spacing: .28em;
            text-transform: uppercase;
          }

          .mobile-bridal-screen-logo {
            font-family: 'Cormorant Garamond', serif;
            font-size: 18px;
            font-weight: 300;
            letter-spacing: .3em;
            text-transform: uppercase;
          }

          .mobile-bridal-back,
          .mobile-bridal-close {
            display: inline-grid;
            width: 44px;
            height: 44px;
            padding: 0;
            place-items: center;
            border: 0;
            color: rgba(240,235,225,.76);
            background: transparent;
            cursor: pointer;
          }

          .mobile-bridal-close {
            grid-column: 3;
            justify-self: end;
            font-size: 25px;
            font-weight: 200;
            line-height: 1;
          }

          .mobile-bridal-main-spacer {
            grid-column: 1;
          }

          .mobile-bridal-menu {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            max-width: 460px;
            width: 100%;
            margin: 0 auto;
          }

          .mobile-bridal-menu-list,
          .mobile-bridal-submenu-list {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .mobile-bridal-main-screen .mobile-bridal-menu-list {
            border-bottom: 1px solid rgba(240,235,225,.14);
          }

          .mobile-bridal-menu-item {
            border-bottom: 0;
          }

          .mobile-bridal-menu-link,
          .mobile-bridal-screen-button {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            min-height: 54px;
            padding: 0;
            border: 0;
            color: rgba(240,235,225,.82);
            background: transparent;
            font-family: 'Jost', sans-serif;
            font-size: 10px;
            font-weight: 300;
            letter-spacing: .17em;
            text-align: left;
            text-decoration: none;
            text-transform: uppercase;
            cursor: pointer;
          }

          .mobile-bridal-menu-link.is-appointment {
            color: var(--champagne);
          }

          .mobile-bridal-menu-symbol {
            color: var(--champagne);
            font-size: 16px;
            font-weight: 200;
          }

          .mobile-bridal-submenu {
            width: 100%;
            max-width: 560px;
            margin: 0 auto;
          }

          .mobile-bridal-submenu-list {
            border-top: 1px solid rgba(240,235,225,.1);
          }

          .mobile-bridal-submenu-list li {
            border-bottom: 1px solid rgba(240,235,225,.08);
          }

          .mobile-bridal-submenu .mobile-bridal-menu-link {
            min-height: 52px;
            font-size: 11px;
            letter-spacing: .04em;
            text-transform: none;
          }

          .mobile-bridal-chevron {
            color: rgba(212,180,131,.7);
            font-size: 17px;
            font-weight: 200;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-bridal-logo,
          .mobile-bridal-overlay,
          .mobile-bridal-screen {
            transition: none;
          }
        }
      `}</style>

      <nav
        className={`mobile-bridal-bar ${hideInitialLogo ? "hide-initial-logo" : ""} ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Mobile bridal navigation"
      >
        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-bridal-icon-button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-bridal-menu"
          onClick={() => setOpen(true)}
        >
          <span className="mobile-bridal-hamburger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <Link href="/bridal" className="mobile-bridal-logo" aria-label="Aamira Bridal home">
          <span className="mobile-bridal-logo-main">Aamira</span>
          <span className="mobile-bridal-logo-sub">Bridal</span>
        </Link>

        <Link
          href="/book-appointment"
          className="mobile-bridal-icon-button mobile-bridal-appointment"
          aria-label="Book appointment"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="2.5" y="3.5" width="13" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
            <path d="M5.5 1.8v3.3M12.5 1.8v3.3M2.8 7h12.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M6 10h2v2H6z" fill="currentColor" opacity=".8" />
          </svg>
        </Link>
      </nav>

      <div
        ref={overlayRef}
        id="mobile-bridal-menu"
        className={`mobile-bridal-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          ref={mainScreenRef}
          className={`mobile-bridal-screen mobile-bridal-main-screen ${open && screen === null ? "is-active" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!open || screen !== null}
          inert={!open || screen !== null}
          aria-label="Bridal menu"
        >
          <header className="mobile-bridal-screen-header">
            <span className="mobile-bridal-main-spacer" />
            <span className="mobile-bridal-screen-logo">Aamira</span>
            <button type="button" className="mobile-bridal-close" aria-label="Close menu" onClick={closeMenu}>×</button>
          </header>
          <div className="mobile-bridal-menu">
            <ul className="mobile-bridal-menu-list">
              <li className="mobile-bridal-menu-item">
                <button type="button" className="mobile-bridal-screen-button" onClick={() => setScreen("collections")}>
                  Collections <span className="mobile-bridal-menu-symbol" aria-hidden="true">+</span>
                </button>
              </li>
              <li className="mobile-bridal-menu-item">
                <button type="button" className="mobile-bridal-screen-button" onClick={() => setScreen("atelier")}>
                  Atelier <span className="mobile-bridal-menu-symbol" aria-hidden="true">+</span>
                </button>
              </li>
              <li className="mobile-bridal-menu-item">
                <Link href="/story" className="mobile-bridal-menu-link" onClick={closeMenu}>Stories</Link>
              </li>
              <li className="mobile-bridal-menu-item">
                <Link href="/book-appointment" className="mobile-bridal-menu-link is-appointment" onClick={closeMenu}>Book Appointment</Link>
              </li>
              <li className="mobile-bridal-menu-item">
                <Link href="/basic" className="mobile-bridal-menu-link" onClick={closeMenu}>Aamira Basic</Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          ref={collectionsScreenRef}
          className={`mobile-bridal-screen ${open && screen === "collections" ? "is-active" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!open || screen !== "collections"}
          inert={!open || screen !== "collections"}
          aria-label="Collections menu"
        >
          <header className="mobile-bridal-screen-header">
            <button type="button" className="mobile-bridal-back" aria-label="Back to main menu" onClick={returnToMain}>←</button>
            <span className="mobile-bridal-screen-title">Collections</span>
            <button type="button" className="mobile-bridal-close" aria-label="Close menu" onClick={closeMenu}>×</button>
          </header>
          <div className="mobile-bridal-submenu">
            <ul className="mobile-bridal-submenu-list">
              {collectionLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="mobile-bridal-menu-link" onClick={closeMenu}>
                    {label}<span className="mobile-bridal-chevron" aria-hidden="true">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          ref={atelierScreenRef}
          className={`mobile-bridal-screen ${open && screen === "atelier" ? "is-active" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!open || screen !== "atelier"}
          inert={!open || screen !== "atelier"}
          aria-label="Atelier menu"
        >
          <header className="mobile-bridal-screen-header">
            <button type="button" className="mobile-bridal-back" aria-label="Back to main menu" onClick={returnToMain}>←</button>
            <span className="mobile-bridal-screen-title">Atelier</span>
            <button type="button" className="mobile-bridal-close" aria-label="Close menu" onClick={closeMenu}>×</button>
          </header>
          <div className="mobile-bridal-submenu">
            <ul className="mobile-bridal-submenu-list">
              {atelierLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="mobile-bridal-menu-link" onClick={closeMenu}>
                    {label}<span className="mobile-bridal-chevron" aria-hidden="true">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
