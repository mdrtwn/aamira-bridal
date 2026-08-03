import Image from "next/image";
import Link from "next/link";
import styles from "./DualCampaignHero.module.css";

const campaigns = [
  {
    eyebrow: "Aamira Basic — 2026",
    title: "A Study in Ease",
    description:
      "A modern wardrobe shaped by thoughtful coverage, movement, and quiet confidence.",
    cta: "Discover the collection",
    href: "/basic/collections/summer-2026",
    image: "/image/homepage/gambar5.jpg",
    imageAlt: "Aamira campaign portrait",
    position: "center 28%",
  },
  {
    eyebrow: "New In",
    title: "The New Chapter",
    description: "",
    cta: "Discover",
    href: "/basic/new-in",
    image: "/image/homepage/gambar6.jpg",
    imageAlt: "Aamira new collection portrait",
    position: "center 32%",
  },
] as const;

export default function DualCampaignHero() {
  return (
    <section className={styles.hero} aria-label="Featured Aamira Basic collections">
      {campaigns.map((campaign, index) => (
        <article className={styles.panel} key={campaign.title}>
          <Image
            src={campaign.image}
            alt={campaign.imageAlt}
            fill
            priority
            sizes="(max-width: 700px) 94vw, 50vw"
            className={styles.image}
            style={{ objectPosition: campaign.position }}
          />
          <div className={styles.scrim} aria-hidden="true" />

          <div className={styles.copy}>
            <p className={styles.eyebrow}>{campaign.eyebrow}</p>
            <h1 className={styles.title}>{campaign.title}</h1>
            {campaign.description ? (
              <p className={styles.description}>{campaign.description}</p>
            ) : null}
            <Link href={campaign.href} className={styles.cta}>
              {campaign.cta}
            </Link>
          </div>

          <span className={styles.index} aria-hidden="true">
            0{index + 1}
          </span>
        </article>
      ))}
    </section>
  );
}
