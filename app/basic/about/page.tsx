import Image from "next/image";
import styles from "../../aamirabasic/EditorialPages.module.css";

export default function AboutPage() {
  return <main className={styles.page}><div className={styles.story}><div className={styles.storyImage}><Image src="/image/homepage/gambar4.jpg" alt="Aamira Basic studio portrait" fill sizes="(max-width:700px) 100vw, 50vw"/></div><article className={styles.storyCopy}><p>Aamira Basic</p><h1>Ease, refined.</h1><p>Aamira Basic is a modern ready-to-wear line conceived in Jakarta. Its wardrobe is built around clean proportions, thoughtful coverage, and pieces that move naturally through everyday life.</p><p>Our frontend currently uses temporary campaign imagery while the original Aamira Basic collection is in production. The final story, materials, and imagery will be updated before launch.</p></article></div></main>;
}
