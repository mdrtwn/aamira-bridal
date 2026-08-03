import Link from "next/link";
import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  return (
    <aside className={styles.bar} aria-label="Current promotion">
      <Link href="/basic/collections/summer-2026" className={styles.primary}>
        Explore Summer 2026
      </Link>

      <Link href="/basic/new-in" className={styles.offer}>
        <span className={styles.offerMark} aria-hidden="true">◇</span>
        <span>Discover New Arrivals</span>
      </Link>
    </aside>
  );
}
