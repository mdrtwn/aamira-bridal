"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    id: "01",
    phase: "Consultation",
    latin: "Initium",
    duration: "Week 1",
    description:
      "A private appointment in our atelier. We begin not with measurements but with conversation — who you are, how you move, what the day means to you. Nothing is written down until everything has been heard.",
    detail: "90 minutes · Private atelier · Complimentary",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=987&auto=format&fit=crop",
  },
  {
    id: "02",
    phase: "Design",
    latin: "Forma",
    duration: "Weeks 2 – 6",
    description:
      "Our master pattern-maker translates the conversation into form. Fabric is hand-selected. Sketches are presented. You choose not from a catalogue but from a dialogue — the gown evolves as you do.",
    detail: "3 design reviews · Fabric selection · Pattern drafting",
    image: "https://images.unsplash.com/photo-1574871786514-46e1680ea587?q=80&w=987&auto=format&fit=crop",
  },
  {
    id: "03",
    phase: "Fitting",
    latin: "Corpus",
    duration: "Weeks 7 – 18",
    description:
      "Six appointments. Each one a refinement. The gown is built around you — not adjusted to fit, but grown into your body over time. The final fitting happens in silence. You will know when it is right.",
    detail: "6 fittings · Bespoke alterations · Final press",
    image: "https://images.unsplash.com/photo-1606216836537-eea72a939072?q=80&w=987&auto=format&fit=crop",
  },
  {
    id: "04",
    phase: "Wedding Day",
    latin: "Dies",
    duration: "The Day",
    description:
      "Your gown arrives the morning of, pressed and cased. Our atelier lead is available by private line. After the day, we offer preservation — because some things are not meant to end.",
    detail: "Morning delivery · Private contact · Preservation offered",
    image: "https://plus.unsplash.com/premium_photo-1661456395657-049a92e01522?q=80&w=987&auto=format&fit=crop",
  },
];

export default function BridalProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [lineH, setLineH] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Intersection → trigger reveals */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Scroll → animate progress line + set active step */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const raw = (winH * 0.5 - rect.top) / rect.height;
      const pct = Math.max(0, Math.min(1, raw));
      setScrollPct(pct);

      /* which step is nearest viewport center */
      let nearest = 0;
      let minDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const dist = Math.abs(mid - winH / 2);
        if (dist < minDist) { minDist = dist; nearest = i; }
      });
      setActive(nearest);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Measure the timeline spine height */
  useEffect(() => {
    if (!lineRef.current) return;
    const ro = new ResizeObserver(() => {
      if (lineRef.current) setLineH(lineRef.current.offsetHeight);
    });
    ro.observe(lineRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --ivory:     #F0EBE1;
          --silk:      #F7F4EF;
          --parchment: #E8E0D0;
          --noir:      #1C1A18;
          --noir2:     #232120;
          --dust:      #9E9488;
          --blush:     #D9C4B5;
          --gold:      #B8963E;
          --champagne: #D4B483;
          --fog:       #C8BFB4;
        }

        .bp-section {
          background: var(--noir);
          position: relative;
          overflow: hidden;
        }
        .bp-c { font-family: 'Cormorant Garamond', serif; }
        .bp-j { font-family: 'Jost', sans-serif; }

        /* ── Reveal ── */
        .bp-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.4s cubic-bezier(0.16,1,0.3,1),
                      transform 1.4s cubic-bezier(0.16,1,0.3,1);
        }
        .bp-reveal.on { opacity: 1; transform: none; }
        .bp-d0 { transition-delay: 0.00s; }
        .bp-d1 { transition-delay: 0.15s; }
        .bp-d2 { transition-delay: 0.30s; }
        .bp-d3 { transition-delay: 0.45s; }
        .bp-d4 { transition-delay: 0.60s; }

        /* ── Header ── */
        .bp-header {
          padding: 96px 80px 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        /* ── Layout ── */
        .bp-body {
          display: grid;
          grid-template-columns: 80px 1fr 1fr;
          gap: 0;
          padding: 80px 80px 80px 0;
          position: relative;
          z-index: 2;
        }

        /* ── Spine column ── */
        .bp-spine {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 8px;
        }

        /* Track */
        .bp-track {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          background: rgba(240,235,225,0.08);
        }

        /* Animated fill */
        .bp-track-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--champagne) 20%,
            var(--gold) 50%,
            var(--champagne) 80%,
            transparent
          );
          transition: height 0.15s linear;
        }

        /* Step dot */
        .bp-dot-wrap {
          position: relative;
          z-index: 2;
          margin-bottom: 0;
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 2px;
        }

        .bp-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1px solid rgba(184,150,62,0.4);
          background: var(--noir);
          transition: background 0.5s ease,
                      border-color 0.5s ease,
                      transform 0.5s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.5s ease;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }
        .bp-dot.active {
          background: var(--gold);
          border-color: var(--gold);
          transform: scale(1.5);
          box-shadow: 0 0 0 4px rgba(184,150,62,0.15),
                      0 0 16px rgba(184,150,62,0.25);
        }
        .bp-dot.done {
          background: rgba(184,150,62,0.5);
          border-color: rgba(184,150,62,0.5);
        }

        /* ── Step rows ── */
        .bp-steps {
          display: flex;
          flex-direction: column;
          padding-left: 40px;
        }

        .bp-step {
          padding-bottom: 96px;
          position: relative;
          cursor: default;
          transition: opacity 0.5s ease;
        }
        .bp-step:last-child { padding-bottom: 0; }
        .bp-step.inactive { opacity: 0.35; }
        .bp-step.active-step { opacity: 1; }

        /* Step header */
        .bp-step-num {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 10px;
        }

        /* Latin word */
        .bp-latin {
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        /* Underline accent */
        .bp-step-rule {
          height: 1px;
          width: 0;
          background: linear-gradient(to right, var(--gold), transparent);
          transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
          margin: 14px 0 20px;
        }
        .bp-step.active-step .bp-step-rule { width: 80px; }

        /* Detail chips */
        .bp-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .bp-chip {
          padding: 4px 12px;
          border: 1px solid rgba(240,235,225,0.1);
          display: inline-block;
          transition: border-color 0.4s ease;
        }
        .bp-step.active-step .bp-chip {
          border-color: rgba(184,150,62,0.3);
        }

        /* ── Image column ── */
        .bp-img-col {
          position: sticky;
          top: 50%;
          transform: translateY(-50%);
          height: 520px;
          align-self: start;
          overflow: hidden;
          margin-top: 0;
        }

        .bp-img-frame {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .bp-img-inner {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.75) contrast(1.05) saturate(0.8);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }

        /* Corner accents */
        .bp-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          z-index: 2;
        }
        .bp-corner-tl { top: 16px; left: 16px; border-top: 1px solid rgba(184,150,62,0.5); border-left: 1px solid rgba(184,150,62,0.5); }
        .bp-corner-tr { top: 16px; right: 16px; border-top: 1px solid rgba(184,150,62,0.5); border-right: 1px solid rgba(184,150,62,0.5); }
        .bp-corner-bl { bottom: 16px; left: 16px; border-bottom: 1px solid rgba(184,150,62,0.5); border-left: 1px solid rgba(184,150,62,0.5); }
        .bp-corner-br { bottom: 16px; right: 16px; border-bottom: 1px solid rgba(184,150,62,0.5); border-right: 1px solid rgba(184,150,62,0.5); }

        /* Image label */
        .bp-img-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 20px 20px 16px;
          background: linear-gradient(to top, rgba(28,26,24,0.85), transparent);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        /* Ghost bg text */
        .bp-ghost {
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          color: transparent;
          -webkit-text-stroke: 1px rgba(240,235,225,0.04);
          pointer-events: none;
          user-select: none;
          line-height: 1;
          letter-spacing: -0.04em;
          right: 0;
          bottom: -40px;
          z-index: 1;
          font-size: clamp(100px, 14vw, 200px);
          transition: opacity 0.6s ease;
        }

        /* ── Shimmer line ── */
        .bp-shimmer {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--champagne) 40%, var(--gold) 50%, var(--champagne) 60%, transparent);
          background-size: 200% 100%;
          animation: bpShimmer 4s ease-in-out infinite;
        }
        @keyframes bpShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Bottom ── */
        .bp-bottom {
          border-top: 1px solid rgba(240,235,225,0.06);
          padding: 40px 80px 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        .bp-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .bp-cta:hover { gap: 20px; }
        .bp-cta-bar {
          width: 32px;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }
        .bp-cta:hover .bp-cta-bar { width: 48px; }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .bp-header { padding: 72px 32px 0; }
          .bp-body {
            grid-template-columns: 48px 1fr;
            padding: 64px 32px 64px 0;
          }
          .bp-img-col { display: none; }
          .bp-bottom { padding: 36px 32px 60px; }
        }

        @media (max-width: 640px) {
          .bp-header { padding: 56px 20px 0; }
          .bp-body { grid-template-columns: 40px 1fr; padding: 56px 20px 56px 0; }
          .bp-steps { padding-left: 20px; }
          .bp-bottom { padding: 32px 20px 52px; flex-direction: column; align-items: flex-start; }
          .bp-step { padding-bottom: 64px; }
        }
      `}</style>

      <section ref={sectionRef} className="bp-section">

        {/* ── HEADER ── */}
        <div className="bp-header">
          <div>
            <div className={`bp-reveal bp-d0 ${inView ? "on" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div className="bp-shimmer" style={{ width: "36px" }} />
              <span className="bp-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--dust)" }}>
                The Process
              </span>
            </div>
            <h2 className={`bp-c bp-reveal bp-d1 ${inView ? "on" : ""}`}
              style={{ fontSize: "clamp(36px, 4.8vw, 66px)", fontWeight: 100, lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--ivory)" }}>
              How a gown
              <br />
              <em style={{ fontStyle: "italic", color: "var(--blush)" }}>comes to be.</em>
            </h2>
          </div>

          <div className={`bp-reveal bp-d2 ${inView ? "on" : ""}`}
            style={{ maxWidth: "280px", paddingLeft: "28px", borderLeft: "1px solid rgba(240,235,225,0.08)", alignSelf: "flex-end" }}>
            <p className="bp-j" style={{ fontSize: "12px", fontWeight: 300, lineHeight: 1.85, color: "var(--dust)" }}>
              From a first conversation to the morning of your wedding — every step is attended with the same care as the last stitch.
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="bp-body">

          {/* Spine */}
          <div className="bp-spine">
            <div ref={lineRef} className="bp-track" style={{ top: 0, bottom: 0 }}>
              <div
                className="bp-track-fill"
                style={{ height: `${scrollPct * 100}%` }}
              />
            </div>

            {steps.map((_, i) => (
              <div key={i} className="bp-dot-wrap" style={{ flex: 1 }}>
                <div
                  className={`bp-dot ${active === i ? "active" : i < active ? "done" : ""}`}
                />
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="bp-steps">
            {steps.map((step, i) => (
              <div
                key={step.id}
                ref={el => { stepRefs.current[i] = el; }}
                className={`bp-step ${active === i ? "active-step" : "inactive"} bp-reveal bp-d${i + 1} ${inView ? "on" : ""}`}
              >
                {/* Number + Latin */}
                <div className="bp-step-num">
                  <span className="bp-c" style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.22em", color: "var(--gold)", opacity: active === i ? 1 : 0.5 }}>
                    {step.id}
                  </span>
                  <div style={{ width: "1px", height: "12px", background: "rgba(240,235,225,0.12)" }} />
                  <span className="bp-latin bp-j" style={{ fontSize: "8px", fontWeight: 300, color: "var(--dust)", letterSpacing: "0.28em" }}>
                    {step.latin}
                  </span>
                </div>

                {/* Phase name */}
                <h3 className="bp-c" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 100, lineHeight: 1.0, color: "var(--ivory)", letterSpacing: "-0.01em" }}>
                  {step.phase}
                </h3>

                {/* Duration */}
                <div style={{ marginTop: "6px" }}>
                  <span className="bp-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--champagne)", opacity: active === i ? 1 : 0.4 }}>
                    {step.duration}
                  </span>
                </div>

                {/* Gold rule */}
                <div className="bp-step-rule" />

                {/* Description */}
                <p className="bp-c" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.75, color: "var(--fog)", maxWidth: "400px" }}>
                  {step.description}
                </p>

                {/* Chips */}
                <div className="bp-chips">
                  {step.detail.split(" · ").map((chip, ci) => (
                    <span key={ci} className="bp-chip bp-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dust)" }}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky image */}
          <div className="bp-img-col">
            <div className="bp-img-frame">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className="bp-img-inner"
                  style={{
                    backgroundImage: `url('${step.image}')`,
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1)" : "scale(1.04)",
                  }}
                />
              ))}

              {/* Corner accents */}
              <div className="bp-corner bp-corner-tl" />
              <div className="bp-corner bp-corner-tr" />
              <div className="bp-corner bp-corner-bl" />
              <div className="bp-corner bp-corner-br" />

              {/* Image label */}
              <div className="bp-img-label">
                <div>
                  <p className="bp-j" style={{ fontSize: "8px", fontWeight: 300, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--champagne)", marginBottom: "3px" }}>
                    {steps[active]?.duration}
                  </p>
                  <p className="bp-c" style={{ fontSize: "18px", fontWeight: 300, fontStyle: "italic", color: "var(--ivory)" }}>
                    {steps[active]?.phase}
                  </p>
                </div>
                <span className="bp-c" style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.22em", color: "var(--dust)" }}>
                  {steps[active]?.id} / 04
                </span>
              </div>

              {/* Ghost phase name */}
              <span className="bp-ghost">{steps[active]?.latin}</span>
            </div>
          </div>

        </div>

        {/* ── BOTTOM ── */}
        <div className={`bp-bottom bp-reveal bp-d4 ${inView ? "on" : ""}`}>
          <div>
            <p className="bp-c" style={{ fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 300, fontStyle: "italic", color: "var(--blush)", lineHeight: 1.5 }}>
              "The process is the first gift<br />we give every bride."
            </p>
            <p className="bp-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dust)", marginTop: "10px" }}>
              — Aamira Atelier
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "20px" }}>
            <div className="bp-shimmer" style={{ width: "120px" }} />
            <a href="#enquiry" className="bp-cta bp-j"
              style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ivory)", textDecoration: "none" }}>
              <span className="bp-cta-bar" />
              Begin Your Process
            </a>
          </div>
        </div>

      </section>
    </>
  );
}
export const slugMap: Record<string, string> = {
  Celestine: "/collections/celestine",
  Lumière: "/collections/lumiere",
  Mireille: "/collections/mireille",
  Seraphine: "/collections/seraphine",
  Delara: "/collections/delara",
  Isadora: "/collections/isadora",
  Aurore: "/collections/aurore",
};
