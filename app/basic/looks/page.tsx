import Image from "next/image";
import Link from "next/link";
import styles from "../../aamirabasic/EditorialPages.module.css";
import { products } from "../../aamirabasic/catalog";
const looks=["/image/homepage/gambar3.jpg","/image/homepage/gambar4.jpg","/image/homepage/gambar5.jpg","/image/homepage/gambar6.jpg","/image/gown-archive/analise/analise-detail-v1.png","/image/gown-archive/analise/analise-detail-v3.png"];

export default function LooksPage() {
  return <main className={styles.page}><header className={styles.intro}><p>Aamira styling notes</p><h1>The Looks</h1><span>Ideas for building an effortless wardrobe through proportion, layering, and tonal dressing.</span></header><div className={styles.lookGrid}>{looks.map((image,index)=><Link href={`/basic/products/${products[index % products.length].slug}`} className={styles.look} key={image}><Image src={image} alt={`Aamira look ${index+1}`} fill sizes="(max-width:700px) 50vw, 33vw"/><span>Look {String(index+1).padStart(2,"0")}</span></Link>)}</div></main>;
}
