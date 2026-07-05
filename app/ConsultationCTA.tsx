"use client";

import { useEffect, useRef, useState } from "react";

export default function ConsultationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [whatsappHovered, setWhatsappHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const pct = Math.max(0, Math.min(1, (winH - rect.top) / (winH + rect.height)));
      setScrollProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxY = (scrollProgress - 0.5) * -48;

  // Replace with actual WhatsApp number
  const whatsappNumber = "6281234567890";
  const whatsappMessage = encodeURIComponent("Hello, I would like to book a private consultation at Aamira Bridal.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --ivory:      #F0EBE1;
          --silk:       #F7F4EF;
          --parchment:  #E8E0D0;
          --noir:       #1C1A18;
          --noir2:      #232120;
          --dust:       #9E9488;
          --blush:      #D9C4B5;
          --gold:       #B8963E;
          --champagne:  #D4B483;
          --fog:        #C8BFB4;
          --whatsapp:   #25D366;
        }

        .ct-section {
          position: relative;
          overflow: hidden;
          background: var(--parchment);
        }
        .ct-c { font-family: 'Cormorant Garamond', serif; }
        .ct-j { font-family: 'Jost', sans-serif; }

        /* ── Grain ── */
        .ct-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Reveal ── */
        .ct-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 1.4s cubic-bezier(0.16,1,0.3,1),
                      transform 1.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ct-reveal.on { opacity: 1; transform: none; }
        .ct-reveal-up {
          opacity: 0;
          transform: translateY(44px);
          transition: opacity 1.6s cubic-bezier(0.16,1,0.3,1),
                      transform 1.6s cubic-bezier(0.16,1,0.3,1);
        }
        .ct-reveal-up.on { opacity: 1; transform: none; }

        .ct-d0 { transition-delay: 0.00s; }
        .ct-d1 { transition-delay: 0.12s; }
        .ct-d2 { transition-delay: 0.26s; }
        .ct-d3 { transition-delay: 0.42s; }
        .ct-d4 { transition-delay: 0.58s; }
        .ct-d5 { transition-delay: 0.74s; }
        .ct-d6 { transition-delay: 0.92s; }
        .ct-d7 { transition-delay: 1.10s; }

        /* ── Shimmer ── */
        .ct-shimmer {
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
          animation: ctShimmer 4.5s ease-in-out infinite;
        }
        @keyframes ctShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Top noir band ── */
        .ct-top-band {
          background: var(--noir);
          padding: 20px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        /* ── Main body ── */
        .ct-body {
          position: relative;
          z-index: 2;
          padding: 0 64px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Ghost headline behind everything ── */
        .ct-ghost {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: clamp(100px, 20vw, 300px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(28,26,24,0.055);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
          z-index: 0;
        }

        /* ── Image strip ── */
        .ct-image-strip {
          position: relative;
          width: 100%;
          overflow: hidden;
          z-index: 2;
        }
        .ct-image-inner {
          position: absolute;
          inset: -8%;
          background-size: cover;
          background-position: center 25%;
          filter: brightness(0.72) contrast(1.06) saturate(0.72);
          transition: transform 0.1s linear;
          will-change: transform;
        }
        .ct-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            var(--parchment) 0%,
            rgba(232,224,208,0) 18%,
            rgba(232,224,208,0) 68%,
            var(--parchment) 100%
          );
          z-index: 1;
        }
        .ct-image-side-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, var(--parchment) 0%, transparent 30%);
          z-index: 1;
        }
        .ct-image-side-right {
          position: absolute;
          inset: 0;
          background: linear-gradient(to left, var(--parchment) 0%, transparent 30%);
          z-index: 1;
        }

        /* ── Center content over image ── */
        .ct-center {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 80px 0 72px;
        }

        /* ── Large headline ── */
        .ct-headline {
          font-size: clamp(52px, 9vw, 130px);
          font-weight: 100;
          line-height: 0.96;
          letter-spacing: -0.03em;
          color: var(--noir);
          margin: 0;
        }
        .ct-headline em {
          font-style: italic;
          font-weight: 100;
          color: var(--dust);
        }

        /* ── Divider ornament ── */
        .ct-ornament {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
          max-width: 480px;
          margin: 36px 0;
        }
        .ct-orn-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(184,150,62,0.45));
        }
        .ct-orn-line.rev {
          background: linear-gradient(to left, transparent, rgba(184,150,62,0.45));
        }

        /* ── Sub tagline ── */
        .ct-tagline {
          font-size: clamp(15px, 1.6vw, 20px);
          font-weight: 300;
          font-style: italic;
          color: var(--noir);
          line-height: 1.6;
          letter-spacing: 0.01em;
          max-width: 500px;
          opacity: 0.7;
        }

        /* ── Detail pills row ── */
        .ct-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 36px;
        }
        .ct-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 18px;
          border: 1px solid rgba(184,150,62,0.28);
          background: rgba(232,224,208,0.55);
          backdrop-filter: blur(4px);
        }
        .ct-pill-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          opacity: 0.7;
        }

        /* ── WhatsApp button ── */
        .ct-wa-wrap {
          margin-top: 52px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .ct-wa-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 18px 40px;
          background: var(--noir);
          border: none;
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          transition: background 0.5s ease;
        }

        /* Shimmer fill sweep on hover */
        .ct-wa-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ct-wa-btn:hover::before {
          transform: translateX(100%);
        }
        .ct-wa-btn:hover {
          background: #111;
        }

        /* Gold border frame */
        .ct-wa-btn-border {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(184,150,62,0.4);
          pointer-events: none;
          transition: border-color 0.4s ease;
        }
        .ct-wa-btn:hover .ct-wa-btn-border {
          border-color: rgba(184,150,62,0.75);
        }

        /* Corner accents */
        .ct-wa-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          z-index: 2;
          pointer-events: none;
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ct-wa-btn:hover .ct-wa-corner { width: 13px; height: 13px; }
        .ct-wa-corner-tl { top: -1px; left: -1px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .ct-wa-corner-tr { top: -1px; right: -1px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
        .ct-wa-corner-bl { bottom: -1px; left: -1px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .ct-wa-corner-br { bottom: -1px; right: -1px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

        /* WhatsApp icon pulse */
        .ct-wa-icon-wrap {
          position: relative;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }
        .ct-wa-pulse {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1px solid rgba(37,211,102,0.3);
          animation: ctWaPulse 2.4s ease-in-out infinite;
        }
        .ct-wa-pulse-2 {
          animation-delay: 1.2s;
        }
        @keyframes ctWaPulse {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%       { transform: scale(1.5); opacity: 0; }
        }

        /* Secondary link */
        .ct-alt-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ct-alt-link:hover { gap: 16px; }
        .ct-alt-bar {
          width: 24px;
          height: 1px;
          background: var(--dust);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease;
        }
        .ct-alt-link:hover .ct-alt-bar { width: 36px; background: var(--gold); }

        /* ── Info row ── */
        .ct-info-row {
          display: flex;
          align-items: stretch;
          gap: 0;
          width: 100%;
          border-top: 1px solid rgba(28,26,24,0.1);
          position: relative;
          z-index: 2;
        }
        .ct-info-cell {
          flex: 1;
          padding: 36px 40px;
          border-right: 1px solid rgba(28,26,24,0.08);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ct-info-cell:last-child { border-right: none; }

        /* ── Bottom strip ── */
        .ct-bottom-strip {
          background: var(--noir);
          padding: 18px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .ct-body         { padding: 0 32px; }
          .ct-top-band     { padding: 18px 32px; }
          .ct-bottom-strip { padding: 18px 32px; }
          .ct-info-row     { flex-wrap: wrap; }
          .ct-info-cell    { flex: 1 1 calc(50% - 1px); min-width: 180px; }
        }
        @media (max-width: 640px) {
          .ct-body         { padding: 0 20px; }
          .ct-top-band     { padding: 16px 20px; }
          .ct-bottom-strip { padding: 16px 20px; flex-direction: column; gap: 10px; text-align: center; }
          .ct-headline     { letter-spacing: -0.025em; }
          .ct-info-cell    { flex: 1 1 100%; border-right: none; border-bottom: 1px solid rgba(28,26,24,0.08); padding: 28px 20px; }
          .ct-info-cell:last-child { border-bottom: none; }
          .ct-wa-btn       { padding: 16px 28px; }
          .ct-pills        { gap: 8px; }
          .ct-pill         { padding: 6px 14px; }
        }
      `}</style>

      <section ref={sectionRef} className="ct-section ct-grain">

        {/* ── TOP NOIR BAND ── */}
        <div className="ct-top-band">
          <div className="ct-shimmer" style={{ flex: 1, maxWidth: "100px" }} />
          <span className="ct-c" style={{ fontSize: "12px", fontStyle: "italic", fontWeight: 300, color: "var(--dust)", letterSpacing: "0.08em", margin: "0 32px", whiteSpace: "nowrap" }}>
            By appointment only
          </span>
          <div className="ct-shimmer" style={{ flex: 1, maxWidth: "100px" }} />
        </div>

        {/* ── IMAGE STRIP ── */}
        <div className="ct-image-strip" style={{ height: "clamp(320px, 52vh, 640px)" }}>
          <div
            className="ct-image-inner"
            style={{
              backgroundImage: `url('image/wedding/bawah1.webp?q=80&w=1587&auto=format&fit=crop')`,
              transform: `translateY(${parallaxY}px)`,
            }}
          />
          <div className="ct-image-overlay" />
          <div className="ct-image-side-left" />
          <div className="ct-image-side-right" />

          {/* Ghost word behind image */}
          <span
            className="ct-ghost"
            style={{ opacity: 0.6 }}
          >
            Begin
          </span>

          {/* ── CENTER CONTENT (over image) ── */}
          <div
            className="ct-body"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <div className="ct-center" style={{ padding: 0 }}>

              {/* Eyebrow */}
              <div
                className={`ct-reveal ct-d0 ${inView ? "on" : ""}`}
                style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}
              >
                <div className="ct-shimmer" style={{ width: "36px" }} />
                <span className="ct-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--dust)" }}>
                  Private Consultation
                </span>
                <div className="ct-shimmer" style={{ width: "36px", transform: "scaleX(-1)" }} />
              </div>

              {/* Headline — large */}
              <h2
                className={`ct-c ct-headline ct-reveal ct-d1 ${inView ? "on" : ""}`}
              >
                Your gown
              </h2>
              <h2
                className={`ct-c ct-headline ct-reveal ct-d2 ${inView ? "on" : ""}`}
              >
                begins with a
              </h2>
              <h2
                className={`ct-c ct-headline ct-reveal ct-d3 ${inView ? "on" : ""}`}
              >
                <em>conversation.</em>
              </h2>

            </div>
          </div>
        </div>

        {/* ── LOWER CONTENT ── */}
        <div className="ct-body">
          <div className="ct-center">

            {/* Ornament */}
            <div className={`ct-ornament ct-reveal ct-d3 ${inView ? "on" : ""}`}>
              <div className="ct-orn-line" />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="4.5" y="0" width="1" height="10" fill="#B8963E" opacity="0.6" />
                <rect x="0" y="4.5" width="10" height="1" fill="#B8963E" opacity="0.6" />
              </svg>
              <div className="ct-orn-line rev" />
            </div>

            {/* Tagline */}
            <p className={`ct-c ct-tagline ct-reveal ct-d4 ${inView ? "on" : ""}`}>
              We begin not with measurements, but with listening. 
              Every gown at Aamira starts in stillness — a private hour, 
              two people, and the story of your day.
            </p>

            {/* Pills */}
            <div className={`ct-pills ct-reveal ct-d5 ${inView ? "on" : ""}`}>
              {["90 Min Session", "Complimentary", "Private Atelier", "Australia · Sydney · Indonesia"].map((pill, i) => (
                <div key={i} className="ct-pill">
                  <span className="ct-pill-dot" />
                  <span className="ct-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--noir)", opacity: 0.75 }}>
                    {pill}
                  </span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className={`ct-wa-wrap ct-reveal-up ct-d6 ${inView ? "on" : ""}`}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-wa-btn"
                onMouseEnter={() => setWhatsappHovered(true)}
                onMouseLeave={() => setWhatsappHovered(false)}
                aria-label="Book consultation via WhatsApp"
              >
                {/* Border + corner accents */}
                <div className="ct-wa-btn-border" />
                <div className="ct-wa-corner ct-wa-corner-tl" />
                <div className="ct-wa-corner ct-wa-corner-tr" />
                <div className="ct-wa-corner ct-wa-corner-bl" />
                <div className="ct-wa-corner ct-wa-corner-br" />

                {/* WhatsApp icon with pulse */}
                <div className="ct-wa-icon-wrap">
                  {whatsappHovered && <div className="ct-wa-pulse" />}
                  {whatsappHovered && <div className="ct-wa-pulse ct-wa-pulse-2" />}
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 1.375C5.685 1.375 1.375 5.685 1.375 11c0 1.696.44 3.287 1.21 4.67L1.375 20.625l5.15-1.187A9.569 9.569 0 0011 20.625c5.315 0 9.625-4.31 9.625-9.625S16.315 1.375 11 1.375zm-3.08 5.5c-.19-.005-.4-.003-.595.003-.21.007-.5.08-.766.364-.266.284-1.012 1.012-1.012 2.468 0 1.456 1.034 2.865 1.178 3.065.144.2 2.023 3.2 4.955 4.35.69.267 1.23.427 1.65.546.694.198 1.326.17 1.826.103.558-.075 1.716-.72 1.958-1.415.242-.694.242-1.289.17-1.413-.072-.124-.266-.198-.558-.347-.292-.149-1.716-.869-1.982-.967-.266-.099-.46-.148-.654.148-.194.297-.751.967-.92 1.165-.169.198-.338.222-.63.074-.292-.148-1.23-.465-2.342-1.479-.866-.79-1.45-1.765-1.62-2.061-.169-.297-.018-.457.127-.604.13-.133.292-.347.437-.52.146-.174.194-.298.292-.496.097-.198.048-.372-.025-.52-.073-.148-.654-1.61-.897-2.207-.236-.58-.477-.5-.654-.51z" fill="#25D366"/>
                  </svg>
                </div>

                {/* Label */}
                <div>
                  <span className="ct-j" style={{ display: "block", fontSize: "10px", fontWeight: 300, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--champagne)", marginBottom: "2px" }}>
                    WhatsApp
                  </span>
                  <span className="ct-c" style={{ display: "block", fontSize: "clamp(15px, 1.6vw, 18px)", fontWeight: 300, color: "var(--ivory)", letterSpacing: "0.02em" }}>
                    Book Your Consultation
                  </span>
                </div>

                {/* Arrow */}
                <svg style={{ marginLeft: "8px", flexShrink: 0, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", transform: whatsappHovered ? "translateX(4px)" : "translateX(0)" }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--gold)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Secondary link */}
              <a
                href="mailto:hello@aamirabridal.com"
                className="ct-alt-link ct-j"
                style={{ fontSize: "10px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--dust)", textDecoration: "none" }}
              >
                <span className="ct-alt-bar" />
                or enquire by email
              </a>
            </div>

          </div>
        </div>

        {/* ── INFO ROW ── */}
        <div className={`ct-info-row ct-reveal ct-d7 ${inView ? "on" : ""}`}>
          {[
            { label: "Response time", value: "Within 24 hours", note: "Mon – Sat" },
            { label: "Session length", value: "90 minutes", note: "Private atelier" },
            { label: "Investment", value: "Complimentary", note: "No obligation" },
            { label: "Locations", value: "3 ateliers", note: "Australia · Sydney · Indonesia" },
          ].map((cell, i) => (
            <div key={i} className="ct-info-cell">
              <span className="ct-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--dust)" }}>
                {cell.label}
              </span>
              <span className="ct-c" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 100, color: "var(--noir)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                {cell.value}
              </span>
              <span className="ct-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.16em", color: "var(--dust)", opacity: 0.6 }}>
                {cell.note}
              </span>
            </div>
          ))}
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className="ct-bottom-strip">
          <div className="ct-shimmer" style={{ flex: 1, maxWidth: "120px" }} />
          <span className="ct-c" style={{ fontSize: "12px", fontStyle: "italic", fontWeight: 300, color: "var(--dust)", letterSpacing: "0.08em", margin: "0 32px", whiteSpace: "nowrap" }}>
            Handcrafted. Unhurried. Unrepeated.
          </span>
          <div className="ct-shimmer" style={{ flex: 1, maxWidth: "120px" }} />
        </div>

      </section>
    </>
  );
}
