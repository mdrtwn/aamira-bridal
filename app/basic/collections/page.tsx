import Image from "next/image";
import Link from "next/link";
import styles from "../../aamirabasic/EditorialPages.module.css";

const collections = [
  {
    slug: "summer-2026",
    title: "Summer 2026",
    season: "Spring / Summer 2026",
    description: "Light layers, softened structure, and an easy study in everyday dressing.",
    image: "/image/homepage/gambar5.jpg",
  },
  {
    slug: "mother-daughter",
    title: "Mother & Daughter",
    season: "Capsule 2026",
    description: "Coordinated silhouettes shaped by shared rituals, memories, and style.",
    image: "/image/homepage/gambar3.jpg",
  },
  {
    slug: "signature-edit",
    title: "The Signature Edit",
    season: "Permanent Collection",
    description: "Essential Aamira forms selected for their quiet character and lasting relevance.",
    image: "/image/homepage/gambar6.jpg",
  },
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    season: "The Latest — 2026",
    description: "The newest pieces, considered for a modern wardrobe and life in motion.",
    image: "/image/homepage/gambar4.jpg",
  },
] as const;

export default function CollectionsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p>Seasonal stories</p>
        <h1>Collections</h1>
        <span>Explore Aamira Basic through a series of refined wardrobes and evolving ideas.</span>
      </header>

      <div className={styles.collectionGrid}>
        {collections.map((collection, index) => (
          <Link href={`/basic/collections/${collection.slug}`} key={collection.slug} className={styles.collectionCard}>
            <Image
              src={collection.image}
              alt={`${collection.title} campaign`}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              priority={index < 2}
            />
            <span className={styles.collectionNumber}>{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.collectionCopy}>
              <p className={styles.collectionSeason}>{collection.season}</p>
              <h2>{collection.title}</h2>
              <p className={styles.collectionDescription}>{collection.description}</p>
              <span className={styles.collectionLink}>Discover the edit <b aria-hidden="true">→</b></span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
