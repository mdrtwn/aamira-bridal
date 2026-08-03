export type ProductVariant = {
  id: string;
  sku: string;
  color: string;
  size: string;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: "Long Jackets" | "Dresses & Kaftans" | "Tops & Shirts" | "Sets";
  collections: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  status: "draft" | "published";
  tags: string[];
  description: string;
  material: string;
  careInstructions: string[];
  variants: ProductVariant[];
  images: string[];
  isNew?: boolean;
};

type ProductSeed = Omit<Product, "status" | "tags" | "careInstructions" | "variants"> & {
  status?: Product["status"];
  tags?: string[];
  careInstructions?: string[];
};

const galleryA = [
  "/image/gown-archive/analise/analise-detail-v1.png",
  "/image/gown-archive/analise/analise-detail-v2.png",
  "/image/gown-archive/analise/analise-detail-v3.png",
  "/image/gown-archive/analise/analise-detail-v4.png",
];

const galleryB = [
  "/image/homepage/gambar5.jpg",
  "/image/homepage/gambar6.jpg",
  "/image/homepage/gambar4.jpg",
  "/image/homepage/gambar3.jpg",
];

const galleryC = [galleryB[1], galleryA[2], galleryB[0], galleryA[0]];
const galleryD = [galleryB[2], galleryA[1], galleryB[3], galleryA[3]];

const productSeeds: ProductSeed[] = [
  { id: "ab-001", slug: "sora-long-outer-ivory", name: "Sora Long Outer — Ivory", price: 189, category: "Long Jackets", collections: ["new-arrivals", "signature-edit"], colors: ["Ivory", "Black"], sizes: ["XS", "S", "M", "L", "XL"], stock: 18, description: "A clean, elongated outer layer designed for quiet structure and effortless movement.", material: "Textured crepe blend", images: galleryA, isNew: true },
  { id: "ab-002", slug: "amara-column-dress-pearl", name: "Amara Column Dress — Pearl", price: 158, category: "Dresses & Kaftans", collections: ["new-arrivals", "summer-2026"], colors: ["Pearl", "Sand"], sizes: ["XS", "S", "M", "L"], stock: 11, description: "A fluid column dress with a restrained silhouette for day-to-evening dressing.", material: "Soft twill", images: [
    "/image/aamira-basic/products/produk1.png",
    "/image/aamira-basic/products/produk2.png",
    "/image/aamira-basic/products/produk3.png",
    "/image/aamira-basic/products/produk4.png",
  ], isNew: true },
  { id: "ab-003", slug: "nara-layered-set-oat", name: "Nara Layered Set — Oat", price: 199, category: "Sets", collections: ["summer-2026", "signature-edit"], colors: ["Oat", "Espresso"], sizes: ["S", "M", "L", "XL"], stock: 8, description: "An easy two-piece set balancing softly tailored lines with all-day comfort.", material: "Linen blend", images: galleryC },
  { id: "ab-004", slug: "mira-relaxed-shirt-white", name: "Mira Relaxed Shirt — White", price: 98, category: "Tops & Shirts", collections: ["new-arrivals", "summer-2026"], colors: ["White", "Powder Blue"], sizes: ["XS", "S", "M", "L", "XL"], stock: 24, description: "A generous everyday shirt with a crisp collar and softened volume.", material: "Cotton poplin", images: galleryD, isNew: true },
  { id: "ab-005", slug: "luma-drape-kaftan-sand", name: "Luma Drape Kaftan — Sand", price: 168, category: "Dresses & Kaftans", collections: ["summer-2026"], colors: ["Sand", "Black"], sizes: ["S/M", "L/XL"], stock: 13, description: "An understated kaftan cut with a fluid drape and subtle side detailing.", material: "Matte satin", images: galleryB },
  { id: "ab-006", slug: "hana-collarless-jacket-black", name: "Hana Collarless Jacket — Black", price: 179, compareAtPrice: 219, category: "Long Jackets", collections: ["signature-edit"], colors: ["Black", "Stone"], sizes: ["S", "M", "L"], stock: 7, description: "A collarless long jacket defined by precise seams and a relaxed shoulder.", material: "Structured crepe", images: galleryD },
  { id: "ab-007", slug: "sena-wrap-shirt-clay", name: "Sena Wrap Shirt — Clay", price: 108, category: "Tops & Shirts", collections: ["summer-2026"], colors: ["Clay", "Ivory"], sizes: ["XS", "S", "M", "L"], stock: 16, description: "A wrap-front shirt with adjustable shaping and a clean cuff finish.", material: "Tencel blend", images: galleryC },
  { id: "ab-008", slug: "aya-everyday-set-navy", name: "Aya Everyday Set — Navy", price: 188, category: "Sets", collections: ["new-arrivals", "mother-daughter"], colors: ["Navy", "Ivory"], sizes: ["S", "M", "L", "XL"], stock: 15, description: "A coordinated set designed to move easily between work, travel, and weekends.", material: "Breathable twill", images: galleryA, isNew: true },
];

function code(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
}

function createVariants(product: ProductSeed): ProductVariant[] {
  const combinations = product.colors.length * product.sizes.length;
  const baseStock = Math.floor(product.stock / combinations);
  let remainder = product.stock % combinations;

  return product.colors.flatMap((color, colorIndex) =>
    product.sizes.map((size, sizeIndex) => {
      const extraStock = remainder > 0 ? 1 : 0;
      remainder = Math.max(0, remainder - 1);
      return {
        id: `${product.id}-${colorIndex + 1}-${sizeIndex + 1}`,
        sku: `AAB-${product.id.slice(-3)}-${code(color)}-${code(size)}`,
        color,
        size,
        stock: baseStock + extraStock,
      };
    })
  );
}

export const products: Product[] = productSeeds.map((product) => ({
  ...product,
  status: product.status ?? "published",
  tags: product.tags ?? [product.category, ...product.collections],
  careInstructions: product.careInstructions ?? [
    "Gentle hand wash in cold water",
    "Do not bleach",
    "Steam or iron on low heat",
    "Dry flat in shade",
  ],
  variants: createVariants(product),
}));

export const collectionNames: Record<string, string> = {
  "summer-2026": "Summer 2026",
  "mother-daughter": "Mother & Daughter",
  "signature-edit": "The Signature Edit",
  "new-arrivals": "New Arrivals",
};

export function formatAUD(value: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2 }).format(value);
}

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
