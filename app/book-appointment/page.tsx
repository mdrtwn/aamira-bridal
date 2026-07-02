"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const collectionOptions = [
  "No preference",
  "Celestine",
  "Lumière",
  "Mireille",
  "Seraphine",
  "Delara",
  "Isadora",
  "Aurore",
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  consultationDate: string;
  collection: string;
  message: string;
}

const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  weddingDate: "",
  consultationDate: "",
  collection: collectionOptions[0],
  message: "",
};

export default function BookAppointmentPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: false }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const required: (keyof FormState)[] = [
      "fullName",
      "email",
      "phone",
      "weddingDate",
      "consultationDate",
    ];
    const nextErrors: Partial<Record<keyof FormState, boolean>> = {};
    required.forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = true;
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setSubmitted(false);
  };

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
        }

        .ba-c { font-family: 'Cormorant Garamond', serif; }
        .ba-j { font-family: 'Jost', sans-serif; }

        .ba-root {
          background: var(--noir);
          min-height: 100vh;
          position: relative;
        }

        /* ── Grain ── */
        .ba-grain-overlay {
          position: fixed;
          inset: -200%;
          width: 400%;
          height: 400%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 100;
        }

        /* ── Reveal ── */
        .ba-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.2s cubic-bezier(0.16,1,0.3,1),
                      transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .ba-reveal.on { opacity: 1; transform: none; }
        .ba-d0 { transition-delay: 0.00s; }
        .ba-d1 { transition-delay: 0.12s; }
        .ba-d2 { transition-delay: 0.24s; }
        .ba-d3 { transition-delay: 0.36s; }
        .ba-d4 { transition-delay: 0.48s; }

        /* ── Shimmer ── */
        .ba-shimmer {
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
          animation: baShimmer 4.5s ease-in-out infinite;
        }
        @keyframes baShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Nav ── */
        .ba-nav {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 64px;
        }
        .ba-nav-back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          border: 1px solid rgba(184,150,62,0.4);
          padding: 10px 20px 10px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: background 0.4s ease, border-color 0.4s ease, gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ba-nav-back:hover {
          background: rgba(184,150,62,0.14);
          border-color: var(--gold);
          gap: 16px;
        }
        .ba-nav-back-bar {
          width: 16px;
          height: 1px;
          background: var(--gold);
        }
        .ba-nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 100;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ivory);
        }

        /* ── Header ── */
        .ba-header {
          position: relative;
          z-index: 2;
          padding: 40px 64px 0;
          max-width: 720px;
        }
        .ba-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        /* ── Layout ── */
        .ba-body {
          position: relative;
          z-index: 2;
          padding: 64px 64px 120px;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 72px;
          align-items: start;
        }

        /* ── Info column ── */
        .ba-info-item {
          padding: 28px 0;
          border-top: 1px solid rgba(240,235,225,0.08);
        }
        .ba-info-item:first-child { border-top: none; padding-top: 0; }
        .ba-info-label {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
        }
        .ba-info-value {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 200;
          font-size: 20px;
          color: var(--ivory);
          line-height: 1.4;
        }
        .ba-info-note {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.85;
          color: var(--dust);
          margin-top: 8px;
        }

        /* ── Form ── */
        .ba-form {
          position: relative;
        }
        .ba-fieldset {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px 28px;
        }
        .ba-field-full { grid-column: 1 / -1; }

        .ba-field label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--dust);
          margin-bottom: 12px;
        }
        .ba-field .req { color: var(--gold); margin-left: 4px; }

        .ba-input,
        .ba-select,
        .ba-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(240,235,225,0.18);
          padding: 10px 2px 12px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          color: var(--ivory);
          transition: border-color 0.4s ease;
          outline: none;
        }
        .ba-select {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 0.04em;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23B8963E' stroke-width='1' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 2px center;
          padding-right: 20px;
        }
        .ba-select option { background: var(--noir2); color: var(--ivory); }
        .ba-textarea {
          resize: vertical;
          min-height: 96px;
          line-height: 1.6;
        }
        .ba-input::placeholder,
        .ba-textarea::placeholder { color: rgba(158,148,136,0.5); }

        .ba-input:focus,
        .ba-select:focus,
        .ba-textarea:focus {
          border-bottom-color: var(--gold);
        }

        .ba-field.has-error .ba-input,
        .ba-field.has-error .ba-select,
        .ba-field.has-error .ba-textarea {
          border-bottom-color: #C0685A;
        }
        .ba-error-text {
          margin-top: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #C0685A;
        }

        /* date inputs: normalize the native calendar icon color on dark bg */
        .ba-input[type="date"] {
          color-scheme: dark;
        }

        /* ── Submit ── */
        .ba-submit-row {
          margin-top: 44px;
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ba-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 40px;
          border: 1px solid var(--gold);
          background: transparent;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: background 0.4s ease, gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ba-submit-btn:hover { background: rgba(184,150,62,0.14); gap: 20px; }
        .ba-submit-note {
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.04em;
          color: var(--dust);
        }

        /* ── Success state ── */
        .ba-success {
          padding: 64px 8px 8px;
        }
        .ba-success-mark {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }
        .ba-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 100;
          font-size: clamp(30px, 3.6vw, 44px);
          color: var(--ivory);
          line-height: 1.15;
          margin-bottom: 18px;
        }
        .ba-success-title em { font-style: italic; color: var(--blush); }
        .ba-success-body {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.9;
          color: var(--dust);
          max-width: 460px;
          margin-bottom: 36px;
        }
        .ba-success-summary {
          border-top: 1px solid rgba(240,235,225,0.1);
          border-bottom: 1px solid rgba(240,235,225,0.1);
          padding: 24px 0;
          margin-bottom: 36px;
          display: grid;
          gap: 14px;
        }
        .ba-success-row {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
        }
        .ba-success-row span:first-child {
          color: var(--dust);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 9.5px;
        }
        .ba-success-row span:last-child {
          color: var(--ivory);
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
        }
        .ba-success-actions {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }
        .ba-success-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: gap 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ba-success-link:hover { gap: 18px; }
        .ba-success-link-bar {
          width: 28px;
          height: 1px;
          background: var(--gold);
        }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .ba-body { grid-template-columns: 1fr; gap: 56px; padding: 48px 32px 96px; }
          .ba-header { padding: 32px 32px 0; }
          .ba-nav { padding: 24px 32px; }
        }
        @media (max-width: 600px) {
          .ba-fieldset { grid-template-columns: 1fr; }
          .ba-nav { padding: 20px 20px; }
          .ba-header { padding: 24px 20px 0; }
          .ba-body { padding: 40px 20px 80px; }
        }
      `}</style>

      <div className="ba-root">
        <div className="ba-grain-overlay" />

        {/* ── NAV ── */}
        <nav className="ba-nav">
          <Link href="/bridal" className="ba-nav-back">
            <span className="ba-nav-back-bar" />
            Back to Aamira
          </Link>
          <span className="ba-nav-logo">Aamira</span>
        </nav>

        {/* ── HEADER ── */}
        <header className="ba-header">
          <div className={`ba-eyebrow ba-reveal ba-d0 ${loaded ? "on" : ""}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="6.5" y="0" width="1" height="14" fill="#B8963E" opacity="0.5" />
              <rect x="0" y="6.5" width="14" height="1" fill="#B8963E" opacity="0.5" />
            </svg>
            <span className="ba-j" style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--dust)" }}>
              By Private Appointment
            </span>
          </div>
          <h1
            className={`ba-c ba-reveal ba-d1 ${loaded ? "on" : ""}`}
            style={{
              fontSize: "clamp(34px, 4.6vw, 60px)",
              fontWeight: 100,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--ivory)",
              marginBottom: "20px",
            }}
          >
            Begin the
            <br />
            <em style={{ fontStyle: "italic", color: "var(--blush)" }}>conversation.</em>
          </h1>
          <div className={`ba-shimmer ba-reveal ba-d2 ${loaded ? "on" : ""}`} style={{ maxWidth: "160px", marginBottom: "20px" }} />
          <p
            className={`ba-j ba-reveal ba-d2 ${loaded ? "on" : ""}`}
            style={{ fontSize: "13px", fontWeight: 300, lineHeight: 1.9, color: "var(--dust)", maxWidth: "480px" }}
          >
            Every gown begins with a single meeting. Share a few details below and our atelier
            will confirm a time to meet, in Sydney or by private virtual consultation.
          </p>
        </header>

        {/* ── BODY ── */}
        <div className="ba-body">
          {/* ── INFO COLUMN ── */}
          <div className={`ba-reveal ba-d3 ${loaded ? "on" : ""}`}>
            <div className="ba-info-item">
              <p className="ba-info-label">Studio</p>
              <p className="ba-info-value">Aamira Atelier</p>
              <p className="ba-info-note">Sydney · Australia — by appointment only</p>
            </div>
            <div className="ba-info-item">
              <p className="ba-info-label">Consultation</p>
              <p className="ba-info-value">75 minutes</p>
              <p className="ba-info-note">
                A private walkthrough of silhouette, fabric, and fit — no obligation to book.
              </p>
            </div>
            <div className="ba-info-item">
              <p className="ba-info-label">Response Time</p>
              <p className="ba-info-value">Within 48 hours</p>
              <p className="ba-info-note">
                Our atelier will confirm your consultation date directly by email or phone.
              </p>
            </div>
          </div>

          {/* ── FORM / SUCCESS ── */}
          <div className={`ba-reveal ba-d3 ${loaded ? "on" : ""}`}>
            {!submitted ? (
              <form className="ba-form" onSubmit={handleSubmit} noValidate>
                <div className="ba-fieldset">
                  <div className={`ba-field ba-field-full ${errors.fullName ? "has-error" : ""}`}>
                    <label htmlFor="fullName">
                      Full Name<span className="req">*</span>
                    </label>
                    <input
                      id="fullName"
                      className="ba-input"
                      type="text"
                      placeholder="Your full name"
                      value={form.fullName}
                      onChange={update("fullName")}
                    />
                    {errors.fullName && <p className="ba-error-text">Please enter your full name.</p>}
                  </div>

                  <div className={`ba-field ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="email">
                      Email<span className="req">*</span>
                    </label>
                    <input
                      id="email"
                      className="ba-input"
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={update("email")}
                    />
                    {errors.email && <p className="ba-error-text">Please enter a valid email.</p>}
                  </div>

                  <div className={`ba-field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="phone">
                      Phone Number<span className="req">*</span>
                    </label>
                    <input
                      id="phone"
                      className="ba-input"
                      type="tel"
                      placeholder="+61 4XX XXX XXX"
                      value={form.phone}
                      onChange={update("phone")}
                    />
                    {errors.phone && <p className="ba-error-text">Please enter a phone number.</p>}
                  </div>

                  <div className={`ba-field ${errors.weddingDate ? "has-error" : ""}`}>
                    <label htmlFor="weddingDate">
                      Wedding Date<span className="req">*</span>
                    </label>
                    <input
                      id="weddingDate"
                      className="ba-input"
                      type="date"
                      value={form.weddingDate}
                      onChange={update("weddingDate")}
                    />
                    {errors.weddingDate && <p className="ba-error-text">Please select your wedding date.</p>}
                  </div>

                  <div className={`ba-field ${errors.consultationDate ? "has-error" : ""}`}>
                    <label htmlFor="consultationDate">
                      Preferred Consultation Date<span className="req">*</span>
                    </label>
                    <input
                      id="consultationDate"
                      className="ba-input"
                      type="date"
                      value={form.consultationDate}
                      onChange={update("consultationDate")}
                    />
                    {errors.consultationDate && (
                      <p className="ba-error-text">Please select a preferred date.</p>
                    )}
                  </div>

                  <div className="ba-field ba-field-full">
                    <label htmlFor="collection">Collection Interest</label>
                    <select
                      id="collection"
                      className="ba-select"
                      value={form.collection}
                      onChange={update("collection")}
                    >
                      {collectionOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ba-field ba-field-full">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      className="ba-textarea"
                      placeholder="Tell us a little about your vision, sizing, or anything else we should know."
                      value={form.message}
                      onChange={update("message")}
                    />
                  </div>
                </div>

                <div className="ba-submit-row">
                  <button type="submit" className="ba-submit-btn">
                    Request Appointment
                  </button>
                  <span className="ba-submit-note">* Required fields</span>
                </div>
              </form>
            ) : (
              <div className="ba-success">
                <div className="ba-success-mark">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9.5L7 13.5L15 4.5" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="ba-c ba-success-title">
                  Thank you, {form.fullName.split(" ")[0] || "friend"}.
                  <br />
                  <em>Your request has been received.</em>
                </h2>
                <p className="ba-j ba-success-body">
                  Our atelier will review your details and confirm your consultation within
                  48 hours by email or phone. We look forward to meeting you.
                </p>

                <div className="ba-success-summary">
                  <div className="ba-success-row">
                    <span>Preferred Consultation</span>
                    <span>{form.consultationDate || "—"}</span>
                  </div>
                  <div className="ba-success-row">
                    <span>Wedding Date</span>
                    <span>{form.weddingDate || "—"}</span>
                  </div>
                  <div className="ba-success-row">
                    <span>Collection Interest</span>
                    <span>{form.collection}</span>
                  </div>
                </div>

                <div className="ba-success-actions">
                  <Link href="/bridal" className="ba-success-link">
                    <span className="ba-success-link-bar" />
                    Return to Aamira
                  </Link>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="ba-success-link"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <span className="ba-success-link-bar" />
                    Submit Another Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}