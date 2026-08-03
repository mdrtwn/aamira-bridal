import Link from "next/link";
import styles from "./Commerce.module.css";
export default function InfoPage({title,intro,children}:Readonly<{title:string;intro:string;children:React.ReactNode}>){return <main className={styles.pageShell}><p className={styles.breadcrumb}><Link href="/basic">Home</Link><span>/</span><span>{title}</span></p><h1>{title}</h1><p className={styles.pageIntro}>{intro}</p><article className={styles.formCard}>{children}</article></main>}
