import { gownArchive } from "@/app/collections/gown-data";
import { bridalCollections } from "@/lib/bridal/collections";
import styles from "../dashboard.module.css";

export default function AamiraBridalOverview() {
  return (
    <>
      <header className={styles.pageHeader}><div><p>Atelier operations</p><h1>Aamira Bridal</h1></div><span>Foundation preview</span></header>
      <section className={styles.metrics} aria-label="Aamira Bridal summary">
        <article><p>Gowns</p><strong>{gownArchive.length}</strong><span>Archive entries</span></article>
        <article><p>Collections</p><strong>{bridalCollections.filter((item) => item.status === "published").length}</strong><span>Published stories</span></article>
        <article><p>Drafts</p><strong>{bridalCollections.filter((item) => item.status === "draft").length}</strong><span>Awaiting publication</span></article>
      </section>
      <section className={styles.emptyPanel}><p>Recommended first module</p><h2>Appointment management</h2><span>New inquiries, consultation dates, assigned consultants, and internal notes will appear here after the database schema is installed.</span></section>
    </>
  );
}
