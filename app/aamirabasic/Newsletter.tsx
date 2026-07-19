"use client";

import { useEffect, useRef, useState } from "react";

const TRUST_ITEMS = [
  {
    id: "quality",
    title: "Premium Quality",
    desc: "Finest fabrics, thoughtfully selected",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="m8.5 12 2.4 2.4L15.5 9.6"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "returns",
    title: "Easy Returns",
    desc: "Hassle-free returns within 7 days",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12a8 8 0 1 1 2.6 5.9"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M4 17v-4h4"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "payment",
    title: "Secure Payment",
    desc: "Safe & trusted checkout",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="1.6"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.1" />
        <path
          d="M6.5 14.5h3"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "care",
    title: "Customer Care",
    desc: "We're here to help you",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 13a8 8 0 0 1 16 0"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <rect
          x="3.5"
          y="13"
          width="4"
          height="6"
          rx="1.4"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect
          x="16.5"
          y="13"
          width="4"
          height="6"
          rx="1.4"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M20.5 19v.5a3 3 0 0 1-3 3h-3.2"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function TrustAndNewsletter() {
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

        .ab-tn-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 1.1s cubic-bezier(0.16,1,0.3,1),
                      transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-tn-reveal.on { opacity: 1; transform: none; }
        .ab-tn-d0 { transition-delay: 0.02s; }
        .ab-tn-d1 { transition-delay: 0.1s; }
        .ab-tn-d2 { transition-delay: 0.18s; }
        .ab-tn-d3 { transition-delay: 0.26s; }
        .ab-tn-d4 { transition-delay: 0.06s; }

        /* --- Trust bar --- */
        .ab-tn-trust {
          background: var(--silk);
          padding: 28px 5vw;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3vw;
        }

        .ab-tn-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .ab-tn-icon {
          flex: none;
          color: var(--espresso-soft);
          display: flex;
        }

        .ab-tn-title {
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 4px;
        }

        .ab-tn-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11px;
          line-height: 1.4;
          color: var(--espresso-soft);
        }

        /* --- Newsletter bar --- */
        .ab-tn-newsletter {
          background: var(--parchment);
          padding: 52px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5vw;
        }

        .ab-tn-nl-title {
          font-weight: 400;
          font-size: clamp(24px, 1.9vw, 29px);
          line-height: 1.2;
          color: var(--espresso);
          margin-bottom: 10px;
        }

        .ab-tn-nl-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 12.5px;
          line-height: 1.6;
          letter-spacing: 0.005em;
          color: var(--espresso-soft);
        }

        .ab-tn-form {
          flex: none;
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .ab-tn-input {
          width: 220px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(58,50,42,0.4);
          outline: none;
          padding: 8px 2px;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 0.01em;
          color: var(--espresso);
          transition: border-color 0.4s ease;
        }
        .ab-tn-input:focus { border-color: var(--espresso); }
        .ab-tn-input::placeholder {
          color: var(--espresso-soft);
          opacity: 0.65;
          font-weight: 300;
        }

        .ab-tn-btn {
          flex: none;
          background: var(--espresso);
          border: none;
          padding: 13px 26px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ivory);
          cursor: pointer;
          transition: background 0.5s ease;
        }
        .ab-tn-btn:hover { background: var(--camel); }

        @media (max-width: 900px) {
          .ab-tn-trust {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 6vw;
            padding: 32px 6vw;
          }
        }

        @media (max-width: 760px) {
          .ab-tn-newsletter {
            flex-direction: column;
            align-items: flex-start;
            padding: 40px 7vw;
            gap: 24px;
          }
          .ab-tn-form { width: 100%; }
          .ab-tn-input { flex: 1; width: auto; }
        }

        @media (max-width: 460px) {
          .ab-tn-trust { grid-template-columns: 1fr; }
          .ab-tn-form { flex-direction: column; align-items: stretch; gap: 14px; }
        }
      `}</style>

      <section ref={sectionRef}>
        <div className="ab-tn-trust">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`ab-tn-item ab-tn-reveal ${
                i === 0 ? "ab-tn-d0" : i === 1 ? "ab-tn-d1" : i === 2 ? "ab-tn-d2" : "ab-tn-d3"
              } ${inView ? "on" : ""}`}
            >
              <span className="ab-tn-icon">{item.icon}</span>
              <div>
                <p className="ab-tn-title">{item.title}</p>
                <p className="ab-tn-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ab-tn-newsletter">
          <div className={`ab-tn-reveal ab-tn-d4 ${inView ? "on" : ""}`}>
            <h2 className="ab-c ab-tn-nl-title">Be the first to know</h2>
            <p className="ab-j ab-tn-nl-desc">
              Get early access to new collections,
              <br />
              special offers, and more.
            </p>
          </div>

          <form
            className={`ab-tn-form ab-tn-reveal ab-tn-d4 ${inView ? "on" : ""}`}
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="ab-tn-input"
            />
            <button type="submit" className="ab-tn-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}