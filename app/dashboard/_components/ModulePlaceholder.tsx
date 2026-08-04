import styles from "../dashboard.module.css";

export default function ModulePlaceholder({
  eyebrow,
  title,
  description,
}: Readonly<{ eyebrow: string; title: string; description: string }>) {
  return (
    <>
      <header className={styles.pageHeader}>
        <div><p>{eyebrow}</p><h1>{title}</h1></div>
        <span>Database required</span>
      </header>
      <section className={styles.emptyPanel}>
        <p>Module foundation</p>
        <h2>Ready for the next step</h2>
        <span>{description}</span>
      </section>
    </>
  );
}
