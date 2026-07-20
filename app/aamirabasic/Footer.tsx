"use client";

import Link from "next/link";

const shopLinks = [
  { label: "New In", href: "/new-in" },
  { label: "Clothing", href: "/basic/clothing" },
  { label: "Hijab", href: "/basic/hijab" },
  { label: "Essentials", href: "/basic/Accessories" },
  { label: "Collections", href: "/collections" },
];

const careLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Contact Us", href: "/contact" },
];

const aboutLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Careers", href: "/careers" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        :root {
          --ivory:         #F4EFE7;
          --silk:          #FAF7F2;
          --parchment:     #EBE3D6;
          --sand:          #D9C9B4;
          --taupe:         #B7A896;
          --espresso:      #3A322A;
          --espresso-soft: #5C5248;
          --camel:         #A9814F;
          --white-warm:    #FFFDF9;
        }

        .ab-footer {
          background: var(--ivory);
          padding: 72px 44px 0;
        }

        .ab-footer-c { font-family: 'Cormorant Garamond', serif; }
        .ab-footer-j { font-family: 'Jost', sans-serif; }

        .ab-footer-top {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr 1fr 1fr;
          gap: 32px;
          padding-bottom: 64px;
        }

        .ab-footer-logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .ab-footer-logo-main {
          font-size: 26px;
          font-weight: 500;
          letter-spacing: 0.26em;
          color: var(--espresso);
        }
        .ab-footer-logo-sub {
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 0.34em;
          color: var(--taupe);
          margin-top: 6px;
        }

        .ab-footer-heading {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--espresso);
          margin-bottom: 20px;
        }

        .ab-footer-links {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }
        .ab-footer-link {
          font-size: 12.5px;
          font-weight: 300;
          letter-spacing: 0.01em;
          color: var(--espresso-soft);
          text-decoration: none;
          transition: color 0.35s ease;
          width: fit-content;
        }
        .ab-footer-link:hover { color: var(--camel); }

        .ab-footer-social {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
        }
        .ab-footer-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: 1px solid rgba(58,50,42,0.28);
          border-radius: 50%;
          color: var(--espresso);
          text-decoration: none;
          transition: border-color 0.35s ease, color 0.35s ease, background 0.35s ease;
        }
        .ab-footer-social-btn:hover {
          border-color: var(--camel);
          color: var(--camel);
          background: rgba(169,129,79,0.06);
        }

        .ab-footer-bottom {
          border-top: 1px solid rgba(58,50,42,0.12);
          padding: 22px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .ab-footer-copyright {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.02em;
          color: var(--taupe);
        }
        .ab-footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .ab-footer-bottom-link {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.02em;
          color: var(--taupe);
          text-decoration: none;
          transition: color 0.35s ease;
        }
        .ab-footer-bottom-link:hover { color: var(--camel); }

        @media (max-width: 900px) {
          .ab-footer { padding: 56px 28px 0; }
          .ab-footer-top {
            grid-template-columns: 1fr 1fr;
            row-gap: 44px;
            padding-bottom: 48px;
          }
          .ab-footer-logo { grid-column: 1 / -1; }
          .ab-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 20px 0 28px;
          }
        }

        @media (max-width: 520px) {
          .ab-footer-top { grid-template-columns: 1fr; row-gap: 40px; }
        }
      `}</style>

      <footer className="ab-footer">
        <div className="ab-footer-top">
          {/* Logo */}
          <div className="ab-footer-logo">
            <span className="ab-footer-c ab-footer-logo-main">AAMIRA</span>
            <span className="ab-footer-j ab-footer-logo-sub">BASIC</span>
          </div>

          {/* Shop */}
          <div>
            <p className="ab-footer-j ab-footer-heading">Shop</p>
            <div className="ab-footer-links">
              {shopLinks.map((l) => (
                <Link key={l.href} href={l.href} className="ab-footer-j ab-footer-link">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <p className="ab-footer-j ab-footer-heading">Customer Care</p>
            <div className="ab-footer-links">
              {careLinks.map((l) => (
                <Link key={l.href} href={l.href} className="ab-footer-j ab-footer-link">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <p className="ab-footer-j ab-footer-heading">About</p>
            <div className="ab-footer-links">
              {aboutLinks.map((l) => (
                <Link key={l.href} href={l.href} className="ab-footer-j ab-footer-link">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <p className="ab-footer-j ab-footer-heading">Follow Us</p>
            <div className="ab-footer-social">
              <a href="#" className="ab-footer-social-btn" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="ab-footer-social-btn" aria-label="TikTok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3v9.5a3.5 3.5 0 1 1-3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3c0 2.5 2 4.5 4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="mailto:hello@aamira.com" className="ab-footer-social-btn" aria-label="Email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M3 6.5L12 13L21 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="ab-footer-bottom">
          <p className="ab-footer-j ab-footer-copyright">
            Aamira Basic
          </p>
          <div className="ab-footer-bottom-links">
            <span className="ab-footer-j ab-footer-bottom-link" style={{ opacity: 0.5 }}>
              &nbsp;
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}