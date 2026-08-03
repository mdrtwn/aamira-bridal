"use client";

import { Check, ChevronRight, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import type { Product } from "./catalog";
import { formatAUD, products } from "./catalog";
import ProductCard from "./ProductCard";
import ProductImageGallery from "./ProductImageGallery";
import styles from "./ProductDetail.module.css";

type InfoPanel = "details" | "size" | "delivery" | "contact";

const infoLinks: { id: InfoPanel; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "size", label: "Size chart" },
  { id: "delivery", label: "Delivery & Returns" },
  { id: "contact", label: "Contact us" },
];

export default function ProductDetail({ product }: Readonly<{ product: Product }>) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0]);
  const [error, setError] = useState("");
  const [activePanel, setActivePanel] = useState<InfoPanel | null>(null);
  const cart = useCart();
  const selectedVariant = product.variants.find(
    (variant) => variant.size === size && variant.color === color
  );
  const styledWith = products.filter((item) => item.id !== product.id).slice(0, 2);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePanel(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}><Link href="/basic">Home</Link><span>/</span><Link href="/basic/shop">Shop</Link><span>/</span><span>{product.name}</span></div>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <ProductImageGallery images={product.images} productName={product.name} variant="detail" />
        </div>

        <div className={styles.contentFlow}>
          <section className={styles.details}>
            {product.isNew && <p className={styles.kicker}>New arrival</p>}
            <h1>{product.name}</h1>
            <p className={styles.price}>{formatAUD(product.price)} <span>Shipping calculated at checkout.</span> {product.compareAtPrice && <del>{formatAUD(product.compareAtPrice)}</del>}</p>
            <p className={styles.description}>{product.description}</p>
            <fieldset><legend>Color <strong>{color}</strong></legend><div className={styles.options}>{product.colors.map((item) => <button type="button" className={color === item ? styles.selected : ""} onClick={() => setColor(item)} key={item}>{item}</button>)}</div></fieldset>
            <fieldset><legend>Size {size && <strong>{size}</strong>}<button type="button" className={styles.sizeGuideButton} onClick={() => setActivePanel("size")}>Size guide</button></legend><div className={styles.options}>{product.sizes.map((item) => <button type="button" className={size === item ? styles.selected : ""} onClick={() => { setSize(item); setError(""); }} key={item}>{item}</button>)}</div></fieldset>
            {error && <p className={styles.error} role="alert">{error}</p>}
            {selectedVariant ? <p className={styles.variantMeta}>SKU {selectedVariant.sku} · {selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : "Out of stock"}</p> : null}
            <button className={styles.add} disabled={selectedVariant?.stock === 0} onClick={() => { if (!size) { setError("Please select a size."); return; } cart.addItem(product, size, color); }}>Add to bag</button>
          </section>

          <section className={styles.wornSection} aria-labelledby="see-it-styled-title">
            <h2 id="see-it-styled-title">See it styled</h2>
            <div className={styles.videoTrack} aria-label="Product styling videos">
              {[1, 2, 3].map((item) => <div className={styles.videoPlaceholder} key={item}><span>Video {String(item).padStart(2, "0")}</span></div>)}
            </div>
          </section>

          <section className={styles.serviceBenefits} aria-label="Aamira Basic services">
            <p><Check aria-hidden="true" />Free delivery and shipping on qualifying orders</p>
            <p><Phone aria-hidden="true" />Need help or advice? Contact us</p>
            <p><MessageCircle aria-hidden="true" />WhatsApp our customer care team</p>
            <p className={styles.adjustments}>We offer complimentary garment-length adjustments. Please allow additional delivery time for adjusted pieces.</p>
          </section>

          <section className={styles.styleSection} aria-labelledby="style-it-with-title">
            <h2 id="style-it-with-title">Style it with</h2>
            <div className={styles.styleGrid}>{styledWith.map((item) => <ProductCard product={item} key={item.id} />)}</div>
          </section>
        </div>
      </div>

      <section className={styles.infoMenu} aria-label="Product information">
        {infoLinks.map((item) => (
          <button type="button" key={item.id} onClick={() => setActivePanel(item.id)}>
            <span>{item.label}</span><ChevronRight aria-hidden="true" />
          </button>
        ))}
      </section>

      <button type="button" className={`${styles.drawerBackdrop} ${activePanel ? styles.drawerBackdropOpen : ""}`} aria-label="Close product information" onClick={() => setActivePanel(null)} />
      <aside className={`${styles.infoDrawer} ${activePanel ? styles.infoDrawerOpen : ""}`} aria-hidden={!activePanel} aria-label="Product information panel">
        <button type="button" className={styles.drawerClose} onClick={() => setActivePanel(null)} aria-label="Close"><X aria-hidden="true" /></button>
        {activePanel === "details" && <DetailsPanel product={product} />}
        {activePanel === "size" && <SizePanel />}
        {activePanel === "delivery" && <DeliveryPanel />}
        {activePanel === "contact" && <ContactPanel />}
      </aside>
    </main>
  );
}

function DetailsPanel({ product }: Readonly<{ product: Product }>) {
  return <div className={styles.drawerContent}><h2>Details</h2><h3>The Designer&apos;s Notes</h3><p><strong>Quietly considered, designed for movement.</strong> {product.description}</p><p>{product.material} gives the piece its refined drape and comfortable finish, designed for elevated everyday layering.</p><h3>Product Details</h3><ul><li><strong>Silhouette:</strong> Relaxed</li><li><strong>Fabric:</strong> {product.material}</li><li><strong>Features:</strong> Thoughtful coverage and an easy fit</li><li><strong>Designed in:</strong> Jakarta</li><li><strong>Care:</strong> {product.careInstructions[0]}</li></ul><h3>Fit & Sizing</h3><p>Choose your regular size for the intended relaxed fit.</p></div>;
}

function SizePanel() {
  return <div className={styles.drawerContent}><h2>Size chart</h2><p>The measurements below are body measurements in centimetres, not garment measurements.</p><p>Measure close to the body while wearing lightweight clothing, then select the closest size.</p><div className={styles.tableWrap}><table><caption>Standard fit</caption><thead><tr><th>Size</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th></tr></thead><tbody><tr><th>Bust</th><td>83</td><td>86</td><td>90–94</td><td>98</td><td>103</td></tr><tr><th>Waist</th><td>64</td><td>67</td><td>71–74</td><td>78</td><td>84</td></tr><tr><th>Hips</th><td>90</td><td>94</td><td>98–102</td><td>104</td><td>110</td></tr></tbody></table></div><p>For product-specific length measurements or fit advice, contact our customer care team.</p></div>;
}

function DeliveryPanel() {
  return <div className={styles.drawerContent}><h2>Delivery & Returns</h2><p>Qualifying orders receive complimentary shipping. Delivery timing and final shipping fees are displayed at checkout.</p><p>Return or exchange requests must be made within 30 days of delivery. Returned items must be unworn, unwashed, and returned with their original tags.</p><ul><li>Jakarta and major cities: calculated at checkout</li><li>Regional delivery: calculated at checkout</li><li>International delivery: calculated at checkout</li></ul><p>Adjusted pieces are final sale and cannot be returned or exchanged.</p></div>;
}

function ContactPanel() {
  return <div className={styles.drawerContent}><h2>Contact us</h2><p>Need sizing, styling, or order advice? Our customer care team is ready to help.</p><p><Link href="/basic/contact">Visit the contact page</Link> or reach us through the official Aamira Basic WhatsApp channel.</p></div>;
}
