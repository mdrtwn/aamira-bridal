"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import GownArchiveGrid from "../GownArchiveGrid";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

        .bridal-campaign-hero {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          background: #0c0b0a;
          isolation: isolate;
        }

        .bridal-campaign-image {
          position: absolute;
          inset: 0;
          background-image: url('/image/hero/aamira-bridal-hero-v1.png');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .bridal-campaign-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(10,9,8,.2), transparent 28%, rgba(10,9,8,.22)),
            linear-gradient(90deg, rgba(10,9,8,.34), transparent 42%, rgba(10,9,8,.08));
        }

        .bridal-campaign-brand {
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 50%;
          display: flex;
          transform: translate(-50%, -50%);
          flex-direction: column;
          align-items: center;
          color: var(--ivory);
          text-align: center;
          text-transform: uppercase;
          text-shadow: 0 4px 30px rgba(0,0,0,.42);
        }

        .bridal-campaign-brand.fade-in {
          transform: translate(-50%, calc(-50% + 16px));
        }

        .bridal-campaign-brand.fade-in.visible {
          transform: translate(-50%, -50%);
        }

        .bridal-campaign-brand-main {
          padding-left: .12em;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 6.3vw, 94px);
          font-weight: 300;
          letter-spacing: .12em;
          line-height: .78;
        }

        .bridal-campaign-brand-sub {
          margin-top: 18px;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: .48em;
        }

        .bridal-campaign-brand-rule {
          width: 64px;
          height: 1px;
          margin-top: 11px;
          background: rgba(212,180,131,.72);
        }

        .bridal-campaign-bar {
          position: absolute;
          z-index: 4;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 68px;
          padding: 0 32px;
          border-top: 1px solid rgba(240, 235, 225, .14);
          background:
            linear-gradient(
              90deg,
              rgba(35, 28, 21, .82),
              rgba(50, 40, 29, .72)
            );
          box-shadow: 0 -18px 44px rgba(12, 11, 10, .12);
          backdrop-filter: blur(12px) saturate(.8);
          -webkit-backdrop-filter: blur(12px) saturate(.8);
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .bridal-campaign-kicker {
          color: #f3eadc;
        }

        .bridal-campaign-appointment {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          color: #fffaf1;
          text-decoration: none;
          transition: color 280ms ease, gap 280ms ease;
        }

        .bridal-campaign-appointment::after {
          content: '→';
          color: var(--champagne);
        }

        .bridal-campaign-appointment:hover,
        .bridal-campaign-appointment:focus-visible {
          gap: 18px;
          color: var(--champagne);
        }

        .bridal-campaign-appointment:focus-visible {
          outline: 1px solid var(--gold);
          outline-offset: 5px;
        }

        @media (max-width: 768px) {
          .bridal-campaign-image {
            background-position: 64% 42%;
          }

          .bridal-campaign-brand {
            top: 50%;
            width: 100%;
          }

          .bridal-campaign-brand-main {
            font-size: clamp(44px, 14vw, 68px);
          }

          .bridal-campaign-bar {
            min-height: 76px;
            padding: 0 18px;
            background:
              linear-gradient(
                90deg,
                rgba(31, 25, 19, .86),
                rgba(49, 39, 28, .78)
              );
            backdrop-filter: blur(10px) saturate(.78);
            -webkit-backdrop-filter: blur(10px) saturate(.78);
            font-size: 10px;
            letter-spacing: .1em;
          }

          .bridal-campaign-kicker {
            max-width: 48%;
            line-height: 1.45;
          }

        }

        @media (prefers-reduced-motion: reduce) {
          .fade-in,
          .bridal-campaign-appointment {
            transition: none;
          }

          .grain::after,
          .scroll-line,
          .shimmer-line {
            animation: none;
          }
        }

      `}</style>

      {/* Grain overlay */}
      <div className="grain fixed inset-0 pointer-events-none z-50" />

      {/* ─── HERO SECTION ─── */}
      <section id="bridal-hero" className="bridal-campaign-hero">
        <div className="bridal-campaign-image" aria-hidden="true" />

        <div className={`bridal-campaign-brand fade-in delay-400 ${loaded ? "visible" : ""}`}>
          <h1 className="bridal-campaign-brand-main">Aamira</h1>
          <span className="bridal-campaign-brand-main">Bridal</span>
          <span className="bridal-campaign-brand-sub">The Gown Archive</span>
          <span className="bridal-campaign-brand-rule" aria-hidden="true" />
        </div>

        <div className={`bridal-campaign-bar fade-in delay-800 ${loaded ? "visible" : ""}`}>
          <p className="bridal-campaign-kicker">Aamira Gown Archive · Latest Wedding Gowns</p>
          <Link href="/book-appointment" className="bridal-campaign-appointment">
            Book Appointment
          </Link>
        </div>
      </section>
      <div id="collections">
        <GownArchiveGrid />
      </div>
    </>
  );
}
