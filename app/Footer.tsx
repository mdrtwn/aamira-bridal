"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.06 }
    );
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const whatsappNumber = "6281234567890";
  const whatsappMessage = encodeURIComponent("Hello, I would like to enquire about Aamira Bridal.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const instagramUrl = "https://instagram.com/aamirabridal";

  const navColumns = [
    {
      heading: "Collections",
      links: [
        { label: "Wedding",           href: "/wedding" },
        { label: "Engagement",        href: "/engagement" },
        { label: "Custom Design",     href: "/custom-design" },
        { label: "Signature Dresses", href: "/signature-dresses" },
      ],
    },
    {
      heading: "Atelier",
      links: [
        { label: "Our Story",        href: "/our-story" },
        { label: "The Process",      href: "/process" },
        { label: "Fabrics & Craft",  href: "/fabrics-craft" },
        { label: "Book Appointment", href: "/appointment" },
      ],
    },
    {
      heading: "Visit",
      links: [
        { label: "Australia",   href: "#" },
        { label: "Sydney",      href: "#" },
        { label: "Indonesia",   href: "#" },
        { label: "Contact Us",  href: "#" },
      ],
    },
  ];

  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --ivory:     #F0EBE1;
          --noir:      #1C1A18;
          --noir2:     #232120;
          --noir3:     #161412;
          --dust:      #9E9488;
          --blush:     #D9C4B5;
          --gold:      #B8963E;
          --champagne: #D4B483;
          --fog:       #C8BFB4;
        }

        .ft-root {
          background: var(--noir3);
          position: relative;
          overflow: hidden;
          font-family: 'Jost', sans-serif;
        }

        /* ── Grain ── */
        .ft-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.028;
          pointer-events: none;
          z-index: 0;
        }

        .ft-c { font-family: 'Cormorant Garamond', serif; }
        .ft-j { font-family: 'Jost', sans-serif; }

        /* ── Shimmer ── */
        .ft-shimmer {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--blush) 35%,
            var(--gold) 50%,
            var(--blush) 65%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: ftShimmer 5s ease-in-out infinite;
        }
        @keyframes ftShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Reveal ── */
        .ft-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1.3s cubic-bezier(0.16,1,0.3,1),
                      transform 1.3s cubic-bezier(0.16,1,0.3,1);
        }
        .ft-reveal.on { opacity: 1; transform: none; }
        .ft-d0 { transition-delay: 0.00s; }
        .ft-d1 { transition-delay: 0.10s; }
        .ft-d2 { transition-delay: 0.20s; }
        .ft-d3 { transition-delay: 0.32s; }
        .ft-d4 { transition-delay: 0.44s; }
        .ft-d5 { transition-delay: 0.56s; }
        .ft-d6 { transition-delay: 0.70s; }

        /* ── Ghost logotype behind upper section ── */
        .ft-ghost-logo {
          position: absolute;
          left: 50%;
          bottom: -0.08em;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: clamp(88px, 16vw, 220px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(240,235,225,0.045);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
          z-index: 0;
        }

        /* ── Upper band ── */
        .ft-upper {
          position: relative;
          z-index: 2;
          padding: 72px 64px 64px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 64px;
          align-items: start;
        }

        /* ── Logo block ── */
        .ft-logo-block {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ft-logotype {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: clamp(28px, 3.2vw, 44px);
          color: var(--ivory);
          letter-spacing: 0.26em;
          text-transform: uppercase;
          line-height: 1;
        }
        .ft-logo-sub {
          font-family: 'Jost', sans-serif;
          font-size: 7px;
          font-weight: 300;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--dust);
          margin-top: 5px;
          padding-left: 2px;
        }
        .ft-logo-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12px, 1.1vw, 14px);
          font-weight: 300;
          font-style: italic;
          color: var(--dust);
          line-height: 1.65;
          margin-top: 22px;
          max-width: 240px;
          opacity: 0.75;
        }

        /* Social icons */
        .ft-socials {
          display: flex;
          gap: 14px;
          margin-top: 32px;
        }
        .ft-social-btn {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(240,235,225,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: border-color 0.4s ease, background 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .ft-social-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .ft-social-btn:hover { border-color: var(--gold); }
        .ft-social-btn:hover::after { opacity: 0.12; transform: scale(1); }
        .ft-social-btn svg { position: relative; z-index: 1; }

        /* ── Center nav grid ── */
        .ft-nav-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px 40px;
        }
        .ft-nav-col-head {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ft-nav-col-head::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, rgba(184,150,62,0.3), transparent);
        }
        .ft-nav-link {
          display: block;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: var(--dust);
          text-decoration: none;
          padding: 5px 0;
          position: relative;
          transition: color 0.35s ease;
          width: fit-content;
        }
        .ft-nav-link::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ft-nav-link:hover { color: var(--ivory); }
        .ft-nav-link:hover::after { width: 100%; }

        /* ── Right: CTA block ── */
        .ft-cta-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0;
        }

        .ft-cta-label {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--dust);
          margin-bottom: 18px;
        }

        /* WhatsApp button */
        .ft-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          border: 1px solid rgba(184,150,62,0.3);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: border-color 0.4s ease;
        }
        .ft-wa-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(184,150,62,0.06) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ft-wa-btn:hover::before { transform: translateX(100%); }
        .ft-wa-btn:hover { border-color: rgba(184,150,62,0.65); }

        /* Corner accents on wa btn */
        .ft-wa-corner {
          position: absolute;
          width: 7px;
          height: 7px;
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ft-wa-btn:hover .ft-wa-corner { width: 11px; height: 11px; }
        .ft-wa-c-tl { top: -1px; left: -1px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .ft-wa-c-tr { top: -1px; right: -1px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
        .ft-wa-c-bl { bottom: -1px; left: -1px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .ft-wa-c-br { bottom: -1px; right: -1px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

        .ft-wa-icon-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #25D366;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(37,211,102,0.5);
        }

        /* Atelier details */
        .ft-atelier-details {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        /* ── Divider ── */
        .ft-divider {
          position: relative;
          z-index: 2;
          margin: 0 64px;
          height: 1px;
          background: rgba(240,235,225,0.06);
          overflow: visible;
        }
        .ft-divider-center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--noir3);
          padding: 0 20px;
        }
        .ft-divider-orn-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,150,62,0.4));
        }
        .ft-divider-orn-line.rev {
          background: linear-gradient(to left, transparent, rgba(184,150,62,0.4));
        }

        /* ── Lower band ── */
        .ft-lower {
          position: relative;
          z-index: 2;
          padding: 28px 64px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        /* Locations strip */
        .ft-locations {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .ft-loc-sep {
          width: 1px;
          height: 10px;
          background: rgba(240,235,225,0.12);
        }

        /* Legal links */
        .ft-legal {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .ft-legal-link {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(158,148,136,0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .ft-legal-link:hover { color: var(--dust); }
        .ft-legal-sep {
          width: 1px;
          height: 10px;
          background: rgba(240,235,225,0.08);
        }

        /* ── Very bottom strip ── */
        .ft-base-strip {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(240,235,225,0.04);
          padding: 14px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .ft-upper {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 48px;
            padding: 64px 40px 56px;
          }
          .ft-logo-block { grid-column: 1; grid-row: 1; }
          .ft-cta-block  { grid-column: 2; grid-row: 1; }
          .ft-nav-grid   { grid-column: 1 / -1; grid-row: 2; gap: 36px 32px; }
          .ft-divider    { margin: 0 40px; }
          .ft-lower      { padding: 24px 40px 32px; }
          .ft-base-strip { padding: 14px 40px; }
        }

        @media (max-width: 700px) {
          .ft-upper {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 40px;
            padding: 52px 20px 48px;
          }
          .ft-logo-block { grid-column: 1; grid-row: 1; }
          .ft-cta-block  { grid-column: 1; grid-row: 2; align-items: flex-start; }
          .ft-nav-grid   { grid-column: 1; grid-row: 3; grid-template-columns: 1fr 1fr; gap: 32px 24px; }
          .ft-divider    { margin: 0 20px; }
          .ft-lower      { padding: 20px 20px 28px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .ft-base-strip { padding: 12px 20px; flex-direction: column; gap: 8px; text-align: center; }
          .ft-locations  { flex-wrap: wrap; gap: 12px; }
          .ft-legal      { flex-wrap: wrap; gap: 12px; }
          .ft-ghost-logo { font-size: clamp(72px, 24vw, 140px); }
        }
      `}</style>

      <footer ref={footerRef} className="ft-root">

        {/* Ghost logotype */}
        <span className="ft-ghost-logo" aria-hidden="true">Aamira</span>

        {/* ── TOP SHIMMER ── */}
        <div className="ft-shimmer" style={{ position: "relative", zIndex: 2 }} />

        {/* ── UPPER BAND ── */}
        <div className="ft-upper">

          {/* Logo block */}
          <div className={`ft-logo-block ft-reveal ft-d0 ${inView ? "on" : ""}`}>
            <div>
              <span className="ft-logotype">Aamira</span>
              <div
                style={{
                  height: "0.5px",
                  background: "linear-gradient(to right, var(--gold) 0%, var(--champagne) 60%, transparent 100%)",
                  marginTop: "5px",
                  opacity: 0.5,
                }}
              />
              <span className="ft-logo-sub">Bridal</span>
            </div>

            <p className="ft-logo-tagline">
              Where devotion becomes design. Each gown a beginning. Each stitch, a promise held in silk.
            </p>

            {/* Social icons */}
            <div className="ft-socials">
              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-btn"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="var(--dust)" strokeWidth="1.2" />
                  <circle cx="12" cy="12" r="5" stroke="var(--dust)" strokeWidth="1.2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="var(--dust)" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-btn"
                aria-label="WhatsApp"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.85.504 3.58 1.385 5.065L2 22l5.115-1.34A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-2.91 5.98c-.207-.006-.436-.003-.649.003-.23.008-.546.088-.836.397-.29.31-1.105 1.103-1.105 2.692 0 1.59 1.128 3.126 1.285 3.343.157.217 2.206 3.49 5.404 4.745.754.291 1.342.465 1.8.596.757.215 1.447.185 1.993.112.608-.082 1.872-.785 2.135-1.543.264-.757.264-1.406.185-1.542-.079-.135-.29-.216-.609-.378-.318-.163-1.871-.947-2.161-1.055-.29-.108-.502-.162-.714.162-.212.324-.82 1.055-1.004 1.27-.183.216-.368.243-.687.08-.318-.162-1.342-.507-2.555-1.613-.944-.861-1.581-1.924-1.767-2.248-.184-.324-.02-.499.138-.658.142-.145.318-.378.477-.567.16-.19.212-.324.318-.54.106-.217.053-.406-.027-.568-.08-.162-.714-1.756-.978-2.409-.257-.633-.52-.545-.714-.556z" fill="var(--dust)" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="#"
                className="ft-social-btn"
                aria-label="Pinterest"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.566 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.5 2.127-4.5 4.327 0 .857.33 1.775.741 2.276a.3.3 0 01.069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="var(--dust)" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav grid */}
          <nav className={`ft-nav-grid ft-reveal ft-d2 ${inView ? "on" : ""}`} aria-label="Footer navigation">
            {navColumns.map((col) => (
              <div key={col.heading}>
                <div className="ft-nav-col-head ft-j">{col.heading}</div>
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className="ft-nav-link ft-j">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          {/* CTA block */}
          <div className={`ft-cta-block ft-reveal ft-d1 ${inView ? "on" : ""}`}>
            <p className="ft-cta-label ft-j">Begin your journey</p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ft-wa-btn"
              aria-label="Book consultation via WhatsApp"
            >
              <div className="ft-wa-corner ft-wa-c-tl" />
              <div className="ft-wa-corner ft-wa-c-tr" />
              <div className="ft-wa-corner ft-wa-c-bl" />
              <div className="ft-wa-corner ft-wa-c-br" />

              <div className="ft-wa-icon-dot" />

              <div>
                <span className="ft-j" style={{ display: "block", fontSize: "8px", fontWeight: 300, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--champagne)", marginBottom: "2px" }}>
                  WhatsApp
                </span>
                <span className="ft-c" style={{ display: "block", fontSize: "15px", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.02em" }}>
                  Book Consultation
                </span>
              </div>

              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: "4px", flexShrink: 0 }}>
                <path d="M2 6h8M6 2l4 4-4 4" stroke="var(--gold)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Atelier details */}
            <div className="ft-atelier-details">
              {[
                { city: "Australia", detail: "Sydney" },
                { city: "Sydney", detail: "KLCC District" },
                { city: "Indonesia", detail: "DIFC, Gate Village" },
              ].map(({ city, detail }) => (
                <div key={city} style={{ textAlign: "right" }}>
                  <span className="ft-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--dust)", opacity: 0.7 }}>
                    {city}
                    <span style={{ color: "rgba(184,150,62,0.4)", margin: "0 8px" }}>·</span>
                    <span style={{ fontWeight: 200, letterSpacing: "0.08em", textTransform: "none", opacity: 0.7 }}>{detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className={`ft-divider ft-reveal ft-d4 ${inView ? "on" : ""}`}>
          <div className="ft-divider-center">
            <div className="ft-divider-orn-line rev" />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="3.5" y="0" width="1" height="8" fill="#B8963E" opacity="0.5" />
              <rect x="0" y="3.5" width="8" height="1" fill="#B8963E" opacity="0.5" />
            </svg>
            <div className="ft-divider-orn-line" />
          </div>
        </div>

        {/* ── LOWER BAND ── */}
        <div className={`ft-lower ft-reveal ft-d5 ${inView ? "on" : ""}`}>

          {/* Locations */}
          <div className="ft-locations">
            {["Australia", "Sydney", "Indonesia"].map((city, i) => (
              <div key={city} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span className="ft-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--dust)", opacity: 0.6 }}>
                  {city}
                </span>
                {i < 2 && <div className="ft-loc-sep" />}
              </div>
            ))}
          </div>

          {/* Season mark */}
          <span className="ft-c" style={{ fontSize: "13px", fontStyle: "italic", fontWeight: 300, color: "var(--dust)", letterSpacing: "0.06em", opacity: 0.5 }}>
            Spring–Summer 2026
          </span>

          {/* Legal links */}
          <div className="ft-legal">
            {["Privacy Policy", "Terms", "Cookies"].map((link, i) => (
              <div key={link} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <a href="#" className="ft-legal-link ft-j">{link}</a>
                {i < 2 && <div className="ft-legal-sep" />}
              </div>
            ))}
          </div>

        </div>

        {/* ── BASE STRIP ── */}
        <div className={`ft-base-strip ft-reveal ft-d6 ${inView ? "on" : ""}`}>

          <span className="ft-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.16em", color: "rgba(158,148,136,0.35)" }}>
            © {year} Aamira Bridal. All rights reserved.
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="ft-j" style={{ fontSize: "9px", fontWeight: 200, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(158,148,136,0.25)" }}>
              Handcrafted · Unhurried · Unrepeated
            </span>
          </div>

          <span className="ft-c" style={{ fontSize: "11px", fontStyle: "italic", fontWeight: 300, color: "rgba(158,148,136,0.3)", letterSpacing: "0.06em" }}>
            Est. 2017
          </span>

        </div>

      </footer>
    </>
  );
}