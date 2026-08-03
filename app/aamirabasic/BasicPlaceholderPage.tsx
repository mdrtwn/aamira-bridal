import styles from "./BasicPlaceholderPage.module.css";

export default function BasicPlaceholderPage({ title }: Readonly<{ title: string }>) {
  return (
    <main className={styles.page}>
      <p>Aamira Basic</p>
      <h1>{title}</h1>
      <span>Coming soon</span>
    </main>
  );
}
