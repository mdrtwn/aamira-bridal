"use client";

import { useEffect, useRef, useState } from "react";

export default function Newsletter() {
  const [inView, setInView] = useState(false);
  const [email, setEmail] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
        }

        .ab-c { font-family: 'Cormorant Garamond', serif; }
        .ab-j { font-family: 'Jost', sans-serif; }

        .ab-nl-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1.2s cubic-bezier(0.16,1,0.3,1),
                      transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-nl-reveal.on { opacity: 1; transform: none; }
        .ab-nl-d0 { transition-delay: 0.05s; }
        .ab-nl-d1 { transition-delay: 0.2s; }
        .ab-nl-d2 { transition-delay: 0.35s; }

        .ab-nl-section {
          background: var(--silk);
          padding: 108px 5vw 116px;
          display: flex;
          justify-content: center;
        }

        .ab-nl-inner {
          width: 100%;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .ab-nl-kicker-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .ab-nl-rule {
          width: 44px;
          height: 1px;
          background: rgba(169,129,79,0.45);
        }
        .ab-nl-kicker {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--taupe);
        }

        .ab-nl-title {
          font-weight: 300;
          font-size: clamp(27px, 2.5vw, 38px);
          line-height: 1.16;
          letter-spacing: -0.008em;
          color: var(--espresso);
          margin-bottom: 20px;
        }

        .ab-nl-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13.5px;
          line-height: 1.95;
          letter-spacing: 0.01em;
          color: var(--espresso-soft);
          max-width: 38ch;
          margin-bottom: 44px;
        }

        .ab-nl-form {
          width: 100%;
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--espresso);
        }

        .ab-nl-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 14px 4px;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 0.01em;
          color: var(--espresso);
        }
        .ab-nl-input::placeholder {
          color: var(--taupe);
          font-weight: 300;
        }

        .ab-nl-btn {
          flex: none;
          background: var(--espresso);
          border: none;
          padding: 0 30px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ivory);
          cursor: pointer;
          transition: background 0.5s ease;
        }
        .ab-nl-btn:hover {
          background: var(--camel);
        }

        @media (max-width: 640px) {
          .ab-nl-section { padding: 80px 7vw 88px; }
          .ab-nl-form { flex-direction: column; gap: 16px; border-bottom: none; }
          .ab-nl-input {
            border: none;
            border-bottom: 1px solid var(--espresso);
            padding: 12px 2px;
            text-align: center;
          }
          .ab-nl-btn { padding: 14px 30px; }
        }
      `}</style>

      <section className="ab-nl-section" ref={sectionRef}>
        <div className="ab-nl-inner">
          <div className={`ab-nl-kicker-row ab-nl-reveal ab-nl-d0 ${inView ? "on" : ""}`}>
            <div className="ab-nl-rule" />
            <span className="ab-j ab-nl-kicker">Newsletter</span>
            <div className="ab-nl-rule" />
          </div>

          <h2 className={`ab-c ab-nl-title ab-nl-reveal ab-nl-d1 ${inView ? "on" : ""}`}>
            Be the first to know
          </h2>

          <p className={`ab-j ab-nl-desc ab-nl-reveal ab-nl-d1 ${inView ? "on" : ""}`}>
            Get early access to new collections and exclusive releases.
          </p>

          <form
            className={`ab-nl-form ab-nl-reveal ab-nl-d2 ${inView ? "on" : ""}`}
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="ab-nl-input"
            />
            <button type="submit" className="ab-nl-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
