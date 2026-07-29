import Image from "next/image";
import Link from "next/link";

import { gownArchive } from "./collections/gown-data";

export default function GownArchiveGrid() {
  return (
    <>
      <style>{`
        .gown-archive {
          background: #eee8de;
          color: #2b241e;
        }

        .gown-archive::after {
          content: '';
          display: block;
          height: clamp(24px, 3vw, 40px);
          background: linear-gradient(to bottom, #2b241e, #161412);
        }

        .gown-archive-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .gown-archive-card {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 1100 / 1959;
          overflow: hidden;
          padding: 0;
          border: 0;
          color: #fffaf2;
          background: #8a7968;
          cursor: pointer;
          text-align: left;
          text-decoration: none;
          isolation: isolate;
          scroll-margin-top: 58px;
        }

        .gown-archive-card:nth-child(2) {
          background: #776858;
        }

        .gown-archive-card:nth-child(3) {
          background: #665b50;
        }

        .gown-archive-card::after {
          content: '';
          position: absolute;
          z-index: -1;
          inset: 0;
          background:
            linear-gradient(to top, rgba(31,25,20,.64), transparent 44%),
            radial-gradient(circle at 72% 18%, rgba(255,245,229,.12), transparent 34%);
          transition: background 320ms ease;
        }

        .gown-archive-image {
          position: absolute;
          z-index: -2;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1);
          filter: sepia(.06) saturate(.76) contrast(1.04) brightness(.95);
          transition:
            transform 700ms cubic-bezier(.16, 1, .3, 1),
            filter 500ms ease;
        }

        .gown-archive-card:hover .gown-archive-image,
        .gown-archive-card:focus-visible .gown-archive-image,
        .gown-archive-card.is-active .gown-archive-image {
          transform: scale(1.055);
        }

        .gown-archive-card.tone-bright .gown-archive-image {
          filter: sepia(.07) saturate(.68) contrast(1.08) brightness(.89);
        }

        .gown-archive-card.tone-neutral .gown-archive-image {
          filter: sepia(.06) saturate(.74) contrast(1.05) brightness(.94);
        }

        .gown-archive-card.tone-dark .gown-archive-image {
          filter: sepia(.07) saturate(.72) contrast(1.03) brightness(1.04);
        }

        .gown-archive-card.tone-vivid .gown-archive-image {
          filter: sepia(.08) saturate(.62) contrast(1.04) brightness(.92);
        }

        .gown-archive-card.tone-bright:hover .gown-archive-image,
        .gown-archive-card.tone-bright:focus-visible .gown-archive-image {
          filter: sepia(.05) saturate(.72) contrast(1.08) brightness(.93);
        }

        .gown-archive-card.tone-neutral:hover .gown-archive-image,
        .gown-archive-card.tone-neutral:focus-visible .gown-archive-image {
          filter: sepia(.04) saturate(.78) contrast(1.05) brightness(.98);
        }

        .gown-archive-card.tone-dark:hover .gown-archive-image,
        .gown-archive-card.tone-dark:focus-visible .gown-archive-image {
          filter: sepia(.05) saturate(.76) contrast(1.04) brightness(1.08);
        }

        .gown-archive-card.tone-vivid:hover .gown-archive-image,
        .gown-archive-card.tone-vivid:focus-visible .gown-archive-image {
          filter: sepia(.06) saturate(.68) contrast(1.05) brightness(.96);
        }

        .gown-archive-card:hover::after,
        .gown-archive-card:focus-visible::after,
        .gown-archive-card.is-active::after {
          background:
            linear-gradient(to top, rgba(31,25,20,.82), rgba(31,25,20,.08) 70%),
            radial-gradient(circle at 72% 18%, rgba(255,245,229,.18), transparent 38%);
        }

        .gown-archive-card:focus-visible {
          z-index: 2;
          outline: 2px solid #f4eadb;
          outline-offset: -4px;
        }

        .gown-archive-name {
          position: absolute;
          right: 30px;
          bottom: 62px;
          left: 30px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 2.35vw, 36px);
          font-weight: 300;
          line-height: 1;
        }

        .gown-archive-detail {
          position: absolute;
          right: 30px;
          bottom: 28px;
          left: 30px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 280ms ease,
            transform 320ms cubic-bezier(.2,.7,.2,1);
        }

        .gown-archive-card.is-active .gown-archive-detail {
          opacity: 1;
          transform: translateY(0);
        }

        .gown-archive-card:hover .gown-archive-detail,
        .gown-archive-card:focus-visible .gown-archive-detail {
          opacity: 1;
          transform: translateY(0);
        }

        .gown-archive-detail-copy {
          color: rgba(255,250,242,.72);
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: .12em;
          line-height: 1.55;
          text-transform: uppercase;
        }

        .gown-archive-detail-arrow {
          color: #e0c8aa;
          font-size: 18px;
          line-height: 1;
        }

        @media (max-width: 640px) {
          .gown-archive-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .gown-archive-name,
          .gown-archive-detail {
            right: 18px;
            left: 18px;
          }

          .gown-archive-name {
            bottom: 50px;
            font-size: clamp(22px, 7vw, 28px);
          }

          .gown-archive-detail {
            bottom: 17px;
            opacity: 1;
            transform: none;
          }

          .gown-archive-detail-copy {
            overflow: hidden;
            font-size: 9px;
            letter-spacing: .08em;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gown-archive-card::after,
          .gown-archive-image,
          .gown-archive-name,
          .gown-archive-detail {
            transition: none;
          }
        }
      `}</style>

      <section className="gown-archive" aria-label="Aamira Bridal gown archive">
        <div className="gown-archive-grid">
          {gownArchive.map(({ slug, name, cardImage, cardDetail, cardPosition, cardTone }) => (
            <Link
              key={slug}
              id={`gown-${slug}`}
              href={`/collections/${slug}`}
              className={`gown-archive-card tone-${cardTone}`}
              aria-label={`View ${name} gown details`}
            >
              <Image
                src={cardImage}
                alt={`${name} gown by Aamira Bridal`}
                className="gown-archive-image"
                fill
                sizes="(max-width: 640px) 50vw, 33.333vw"
                style={{ objectPosition: cardPosition }}
              />
              <span className="gown-archive-name">{name}</span>
              <span className="gown-archive-detail">
                <span className="gown-archive-detail-copy">{cardDetail}</span>
                <span className="gown-archive-detail-arrow" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
