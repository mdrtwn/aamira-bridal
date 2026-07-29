import Image from "next/image";
import Link from "next/link";

import type { GownArchiveEntry } from "../gown-data";

export default function GownDetailPage({ gown }: Readonly<{ gown: GownArchiveEntry }>) {
  const [primaryImage, ...secondaryImages] = gown.images;

  return (
    <>
      <style>{`
        .analise-detail {
          position: relative;
          display: grid;
          min-height: 100svh;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          background: #f7f5f1;
          color: #292724;
        }

        .analise-detail::before {
          content: '';
          position: absolute;
          z-index: 3;
          top: 0;
          right: 0;
          left: 0;
          height: 74px;
          background: rgba(10, 9, 8, .76);
          pointer-events: none;
        }

        .analise-detail-media {
          min-width: 0;
          background: #1a1712;
        }

        .analise-detail-frame {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #1a1712;
        }

        .analise-detail-frame-primary {
          aspect-ratio: 400 / 711.23;
        }

        .analise-detail-frame-secondary {
          aspect-ratio: 400 / 533.33;
        }

        .analise-detail-image {
          object-fit: cover;
          object-position: center 38%;
        }

        .analise-detail-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(9, 8, 7, .12), transparent 24%),
            linear-gradient(to right, transparent 78%, rgba(20, 17, 14, .08));
          pointer-events: none;
        }

        .analise-detail-copy-panel {
          position: sticky;
          top: 0;
          display: grid;
          align-self: start;
          height: 100svh;
          min-height: 100svh;
          box-sizing: border-box;
          padding: 116px 64px 72px;
          place-items: center;
          background: #f7f5f1;
        }

        .analise-detail-copy {
          display: flex;
          width: min(100%, 520px);
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .analise-detail-eyebrow {
          margin: 0 0 22px;
          color: #9b8468;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: .3em;
          text-transform: uppercase;
        }

        .analise-detail-title {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 4vw, 64px);
          font-weight: 300;
          letter-spacing: .12em;
          line-height: .95;
          text-transform: uppercase;
        }

        .analise-detail-rule {
          width: 40px;
          height: 1px;
          margin: 28px 0;
          background: #b79870;
        }

        .analise-detail-description {
          max-width: 480px;
          margin: 0;
          color: #4f4a45;
          font-family: 'Jost', sans-serif;
          font-size: clamp(15px, 1.25vw, 18px);
          font-weight: 300;
          letter-spacing: .015em;
          line-height: 1.65;
        }

        .analise-detail-appointment {
          display: inline-flex;
          min-width: 310px;
          min-height: 58px;
          margin-top: 48px;
          align-items: center;
          justify-content: center;
          border: 1px solid #11100f;
          color: #f7f5f1;
          background: #11100f;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: .24em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            color 280ms ease,
            background-color 280ms ease;
        }

        .analise-detail-appointment:hover,
        .analise-detail-appointment:focus-visible {
          color: #11100f;
          background: transparent;
        }

        .analise-detail-appointment:focus-visible {
          outline: 1px solid #b79870;
          outline-offset: 4px;
        }

        @media (max-width: 768px) {
          .analise-detail {
            display: block;
          }

          .analise-detail::before {
            display: none;
          }

          .analise-detail-image {
            object-position: center 34%;
          }

          .analise-detail-copy-panel {
            position: static;
            height: auto;
            min-height: auto;
            padding: 68px 24px 80px;
          }

          .analise-detail-title {
            font-size: clamp(40px, 13vw, 56px);
          }

          .analise-detail-description {
            font-size: 15px;
          }

          .analise-detail-appointment {
            width: 100%;
            min-width: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .analise-detail-appointment {
            transition: none;
          }
        }
      `}</style>

      <main className="analise-detail">
        <section className="analise-detail-media" aria-label={`${gown.name} bridal gown editorial`}>
          <div className="analise-detail-frame analise-detail-frame-primary">
            <Image
              src={primaryImage}
              alt={`${gown.name} gown by Aamira Bridal`}
              className="analise-detail-image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {secondaryImages.map((image, index) => (
            <div className="analise-detail-frame analise-detail-frame-secondary" key={image}>
              <Image
                src={image}
                alt={`${gown.name} bridal gown editorial detail ${index + 2}`}
                className="analise-detail-image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </section>

        <section className="analise-detail-copy-panel" aria-labelledby="analise-title">
          <div className="analise-detail-copy">
            <p className="analise-detail-eyebrow">The Gown Archive</p>
            <h1 id="analise-title" className="analise-detail-title">{gown.name}</h1>
            <span className="analise-detail-rule" aria-hidden="true" />
            <p className="analise-detail-description">
              {gown.description}
            </p>
            <Link href="/book-appointment" className="analise-detail-appointment">
              Schedule an appointment
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
