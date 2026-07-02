"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import SignatureDresses from "../SignatureDresses";
import BrandStory from "../BrandStory";
import BridalProcess from "../BridalProcess";
import ConsultationCTA from "../ConsultationCTA";
import Footer from "../Footer";

const mobileNavLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Atelier", href: "/atelier" },
  { label: "Stories", href: "/story" },
  { label: "Book Appointment", href: "/book-appointment" },
  { label: "Aamira Basic", href: "/basic" },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --ivory: #F0EBE1;
          --silk-white: #F7F4EF;
          --noir: #1C1A18;
          --dust: #9E9488;
          --blush: #D9C4B5;
          --gold: #B8963E;
          --warm-fog: #C8BFB4;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: var(--noir);
          color: var(--ivory);
          font-family: 'Jost', sans-serif;
          overflow-x: hidden;
        }

        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }

        /* Grain overlay */
        .grain {
          pointer-events: none;
        }
        .grain::after {
          content: '';
          position: fixed;
          inset: -200%;
          width: 400%;
          height: 400%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
          animation: grain 8s steps(10) infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          20% { transform: translate(3%, 2%); }
          30% { transform: translate(-1%, 4%); }
          40% { transform: translate(4%, -1%); }
          50% { transform: translate(-3%, 3%); }
          60% { transform: translate(2%, -4%); }
          70% { transform: translate(-4%, 1%); }
          80% { transform: translate(1%, -2%); }
          90% { transform: translate(-2%, 4%); }
        }

        /* Fade-in animations */
        .fade-in {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-200 { transition-delay: 0.2s; }
        .delay-400 { transition-delay: 0.4s; }
        .delay-600 { transition-delay: 0.6s; }
        .delay-800 { transition-delay: 0.8s; }
        .delay-1000 { transition-delay: 1s; }

        /* Nav link hover */
        .nav-link {
          position: relative;
          letter-spacing: 0.12em;
          transition: color 0.4s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: var(--ivory);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* CTA text link */
        .cta-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: gap 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-link::before {
          content: '';
          display: inline-block;
          width: 32px;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-link:hover {
          gap: 20px;
        }

        .cta-link:hover::before {
          width: 48px;
        }

        /* Scroll indicator */
        .scroll-line {
          animation: scrollPulse 2.4s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.3); }
        }

        /* Horizontal rule shimmer */
        .shimmer-line {
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--blush) 40%,
            var(--gold) 50%,
            var(--blush) 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Mobile menu toggle icon → morphs into an X when open */
        .mobile-menu-icon {
          position: relative;
          z-index: 60;
          width: 24px;
          height: 16px;
        }
        .mobile-menu-icon span {
          position: absolute;
          left: 0;
          height: 1px;
          background: var(--ivory);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      width 0.4s cubic-bezier(0.16,1,0.3,1),
                      opacity 0.3s ease,
                      top 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-menu-icon span:nth-child(1) { top: 0; width: 24px; }
        .mobile-menu-icon span:nth-child(2) { top: 7px; width: 16px; }
        .mobile-menu-icon.open span:nth-child(1) {
          top: 7px;
          width: 24px;
          transform: rotate(45deg);
        }
        .mobile-menu-icon.open span:nth-child(2) {
          top: 7px;
          width: 24px;
          transform: rotate(-45deg);
        }

        /* Mobile nav overlay panel */
        .mobile-nav-panel {
          position: fixed;
          inset: 0;
          z-index: 55;
          background: rgba(28,26,24,0.98);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-nav-panel.open {
          opacity: 1;
          visibility: visible;
        }
        .mobile-nav-link {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 200;
          font-size: clamp(26px, 7vw, 38px);
          color: var(--ivory);
          text-decoration: none;
          letter-spacing: 0.01em;
          padding: 14px 0;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1),
                      transform 0.5s cubic-bezier(0.16,1,0.3,1),
                      color 0.3s ease;
        }
        .mobile-nav-panel.open .mobile-nav-link {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-nav-link:hover,
        .mobile-nav-link:active {
          color: var(--blush);
        }
        .mobile-nav-panel.open .mobile-nav-link:nth-child(1) { transition-delay: 0.12s; }
        .mobile-nav-panel.open .mobile-nav-link:nth-child(2) { transition-delay: 0.18s; }
        .mobile-nav-panel.open .mobile-nav-link:nth-child(3) { transition-delay: 0.24s; }
        .mobile-nav-panel.open .mobile-nav-link:nth-child(4) { transition-delay: 0.30s; }
        .mobile-nav-panel.open .mobile-nav-link:nth-child(5) { transition-delay: 0.36s; }

        .mobile-nav-foot {
          margin-top: 28px;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--dust);
          opacity: 0;
          transition: opacity 0.6s ease;
          transition-delay: 0.45s;
        }
        .mobile-nav-panel.open .mobile-nav-foot { opacity: 1; }

        /* Mobile menu */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-menu-icon-wrap { display: flex; }
        }

        @media (min-width: 769px) {
          .mobile-menu-icon-wrap { display: none; }
          .mobile-nav-panel { display: none; }
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain fixed inset-0 pointer-events-none z-50" />

      {/* ─── MOBILE NAV PANEL ─── */}
      <div className={`mobile-nav-panel ${menuOpen ? "open" : ""}`}>
        {mobileNavLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <span className="mobile-nav-foot">Aamira Bridal · Sydney</span>
      </div>

      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative w-full h-screen min-h-[100dvh] overflow-hidden"
        style={{ background: "var(--noir)" }}
      >
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.25}px)`,
            willChange: "transform",
          }}
        >
          {/* Placeholder image — replace src with actual editorial photography */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('image/homepage/gambar2.png?q=80&w=1974&auto=format&fit=crop')`,
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              filter: "grayscale(20%) brightness(0.62)",
            }}
          />
        </div>

        {/* Dark gradient — bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(28,26,24,0.18) 0%,
              rgba(28,26,24,0.0) 30%,
              rgba(28,26,24,0.0) 55%,
              rgba(28,26,24,0.72) 100%
            )`,
          }}
        />

        {/* Left-side vertical gradient for text protection */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: `linear-gradient(
              to right,
              rgba(28,26,24,0.10) 0%,
              transparent 50%
            )`,
          }}
        />

        {/* ─── NAVIGATION ─── */}
        <nav
          className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8 fade-in ${loaded ? "visible" : ""}`}
        >
          {/* Left nav links */}
          <div className="nav-links flex items-center gap-10">
            {["Collections", "Atelier"].map((item) => (
              <a
                key={item}
                href="#"
                className="nav-link font-cormorant text-xs"
                style={{
                  color: "var(--warm-fog)",
                  fontWeight: 300,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Center logotype */}
          <div className="absolute left-1/2 -translate-x-1/2 top-6">
            <span
              className="font-cormorant tracking-widest"
              style={{
                fontSize: "clamp(15px, 1.8vw, 22px)",
                fontWeight: 100,
                color: "var(--ivory)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Aamira
            </span>
            <div
              className="shimmer-line mt-1.5"
              style={{ height: "0.5px", width: "100%" }}
            />
            <span
              className="block text-center"
              style={{
                fontSize: "7px",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                color: "var(--dust)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              Bridal
            </span>
          </div>

          {/* Right nav links */}
          <div className="nav-links flex items-center gap-10">
            {[{ label: "Stories", href: "/story" }, { label: "Book Appointment", href: "/book-appointment" }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link font-cormorant"
                style={{
                  color: "var(--warm-fog)",
                  fontWeight: 300,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Brand switcher — Aamira Basic */}
            <a
              href="/basic"
              className="nav-link"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10px",
                fontWeight: 300,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--dust)",
                borderLeft: "1px solid rgba(158,148,136,0.3)",
                paddingLeft: "24px",
                marginLeft: "4px",
              }}
            >
              Aamira Basic
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="mobile-menu-icon-wrap items-center">
            <button
              className={`mobile-menu-icon${menuOpen ? " open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>

        {/* ─── HERO CONTENT ─── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">

          {/* Ghost display text — large background type */}
          <span
            className={`font-cormorant absolute select-none pointer-events-none fade-in delay-200 ${loaded ? "visible" : ""}`}
            style={{
              fontSize: "clamp(80px, 18vw, 260px)",
              fontWeight: 100,
              color: "transparent",
              WebkitTextStroke: "0.5px rgba(240,235,225,0.07)",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              userSelect: "none",
              top: "50%",
              transform: "translateY(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            Aamira
          </span>

          {/* Eyebrow */}
          <p
            className={`fade-in delay-400 ${loaded ? "visible" : ""}`}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--blush)",
              marginBottom: "28px",
            }}
          >
            Bridal Couture
          </p>

          {/* Main headline */}
          <h1
            className={`font-cormorant fade-in delay-600 ${loaded ? "visible" : ""}`}
            style={{
              fontSize: "clamp(42px, 7.5vw, 96px)",
              fontWeight: 100,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--ivory)",
              maxWidth: "820px",
            }}
          >
            Where devotion
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 100 }}>becomes</em> design.
          </h1>

          {/* Divider */}
          <div
            className={`fade-in delay-800 ${loaded ? "visible" : ""}`}
            style={{
              width: "1px",
              height: "40px",
              background: `linear-gradient(to bottom, var(--gold), transparent)`,
              margin: "32px auto",
              opacity: 0.7,
            }}
          />

          {/* Tagline */}
          <p
            className={`font-cormorant fade-in delay-800 ${loaded ? "visible" : ""}`}
            style={{
              fontSize: "clamp(15px, 1.6vw, 19px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--warm-fog)",
              letterSpacing: "0.02em",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            Each gown a beginning. Each stitch, a promise held in silk.
          </p>

          {/* CTA */}
          <Link
            href="/collections"
            className={`cta-link fade-in delay-1000 ${loaded ? "visible" : ""}`}
            style={{
              marginTop: "48px",
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ivory)",
              textDecoration: "none",
            }}
          >
            Explore the Collection
          </Link>
        </div>

        {/* ─── BOTTOM STRIP ─── */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-8 md:px-16 pb-8 fade-in delay-1000 ${loaded ? "visible" : ""}`}
        >
          {/* Location */}
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--dust)",
            }}
          >
            Australia · Sydney · Indonesia
          </p>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2">
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "9px",
                fontWeight: 300,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--dust)",
              }}
            >
              Scroll
            </span>
            <div
              className="scroll-line"
              style={{
                width: "1px",
                height: "36px",
                background: `linear-gradient(to bottom, var(--dust), transparent)`,
              }}
            />
          </div>

          {/* Collection label */}
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--dust)",
            }}
          >
            SS · 2026
          </p>
        </div>
      </section>
      <SignatureDresses />
      <BrandStory />
      <BridalProcess />
      <ConsultationCTA />
      <Footer />
    </>
  );
}