export type GownArchiveEntry = {
  slug: string;
  name: string;
  cardImage: string;
  cardDetail: string;
  cardPosition: string;
  cardTone: "bright" | "neutral" | "dark" | "vivid";
  description: string;
  images: readonly string[];
};

export const gownArchive = [
  {
    slug: "analise",
    name: "Analise",
    cardImage: "/image/gown-archive/analise-graded.JPG",
    cardDetail: "Satin drape · Sculpted silhouette",
    cardPosition: "50% 48%",
    cardTone: "dark",
    description:
      "An ivory satin bridal ensemble defined by a sculpted high neckline, fluid draping, and feather-trimmed sleeves—created with modest elegance and graceful movement in mind.",
    images: [
      "/image/gown-archive/analise/analise-detail-v1.png",
      "/image/gown-archive/analise/analise-detail-v2.png",
      "/image/gown-archive/analise/analise-detail-v3.png",
      "/image/gown-archive/analise/analise-detail-v4.png",
    ],
  },
  {
    slug: "aneesa",
    name: "Aneesa",
    cardImage: "/image/gown-archive/aneesa-graded.JPG",
    cardDetail: "Soft veil · Luminous layers",
    cardPosition: "44% 50%",
    cardTone: "bright",
    description:
      "A luminous bridal silhouette shaped through soft layering and an effortless veil, composed with quiet elegance and graceful movement.",
    images: ["/image/gown-archive/aneesa-graded.JPG"],
  },
  {
    slug: "ayah",
    name: "Ayah",
    cardImage: "/image/gown-archive/ayah-graded.JPG",
    cardDetail: "Lace veil · Refined detailing",
    cardPosition: "57% 46%",
    cardTone: "bright",
    description:
      "A refined bridal composition where delicate lace and a softly framed veil create an expression of timeless modesty.",
    images: ["/image/gown-archive/ayah-graded.JPG"],
  },
  {
    slug: "batoel",
    name: "Batoel",
    cardImage: "/image/gown-archive/Batoel.JPG",
    cardDetail: "Floral lace · Graceful volume",
    cardPosition: "52% 48%",
    cardTone: "bright",
    description:
      "Floral lace and graceful volume come together in a romantic silhouette designed to feel poised, soft, and enduring.",
    images: ["/image/gown-archive/Batoel.JPG"],
  },
  {
    slug: "yasmin",
    name: "Yasmin",
    cardImage: "/image/gown-archive/yasmin.JPG",
    cardDetail: "Clean lines · Modern romance",
    cardPosition: "50% 46%",
    cardTone: "bright",
    description:
      "A modern bridal expression defined by clean lines, balanced proportion, and an understated sense of romance.",
    images: ["/image/gown-archive/yasmin.JPG"],
  },
  {
    slug: "dina",
    name: "Dina",
    cardImage: "/image/gown-archive/Dina.JPG",
    cardDetail: "Delicate lace · Classic form",
    cardPosition: "50% 45%",
    cardTone: "neutral",
    description:
      "Delicate lace meets a classic silhouette in a gown created with softness, refinement, and timeless ceremony in mind.",
    images: ["/image/gown-archive/Dina.JPG"],
  },
  {
    slug: "inaz",
    name: "Inaz",
    cardImage: "/image/gown-archive/Inaz.JPG",
    cardDetail: "Fluid drape · Quiet elegance",
    cardPosition: "50% 47%",
    cardTone: "dark",
    description:
      "Fluid draping and a quietly elegant line give Inaz its effortless presence and graceful sense of movement.",
    images: ["/image/gown-archive/Inaz.JPG"],
  },
  {
    slug: "jasmine",
    name: "Jasmine",
    cardImage: "/image/gown-archive/Jasmine.jpg",
    cardDetail: "Textured lace · Regal volume",
    cardPosition: "50% 45%",
    cardTone: "bright",
    description:
      "Textured lace and regal volume shape a romantic gown with a confident silhouette and an enduring bridal presence.",
    images: ["/image/gown-archive/Jasmine.jpg"],
  },
  {
    slug: "manal",
    name: "Manal",
    cardImage: "/image/gown-archive/Manal.JPG",
    cardDetail: "Pearled detail · Soft structure",
    cardPosition: "50% 46%",
    cardTone: "neutral",
    description:
      "Pearled detailing and soft structure create a composed silhouette that balances ornament with modern restraint.",
    images: ["/image/gown-archive/Manal.JPG"],
  },
  {
    slug: "mariam",
    name: "Mariam",
    cardImage: "/image/gown-archive/Mariam.JPG",
    cardDetail: "Sculpted bodice · Airy skirt",
    cardPosition: "50% 45%",
    cardTone: "neutral",
    description:
      "A sculpted bodice opens into an airy skirt, creating a graceful contrast between definition and lightness.",
    images: ["/image/gown-archive/Mariam.JPG"],
  },
  {
    slug: "mariamm",
    name: "Mariamm",
    cardImage: "/image/gown-archive/Mariamm.JPG",
    cardDetail: "Fine embroidery · Timeless line",
    cardPosition: "50% 46%",
    cardTone: "bright",
    description:
      "Fine embroidery follows a timeless bridal line, composed to feel intricate, poised, and quietly expressive.",
    images: ["/image/gown-archive/Mariamm.JPG"],
  },
  {
    slug: "rose",
    name: "Rose",
    cardImage: "/image/gown-archive/Rose.JPG",
    cardDetail: "Romantic lace · Gentle volume",
    cardPosition: "50% 45%",
    cardTone: "vivid",
    description:
      "Romantic lace and gentle volume shape a soft bridal silhouette with a classic and feminine presence.",
    images: ["/image/gown-archive/Rose.JPG"],
  },
] as const satisfies readonly GownArchiveEntry[];

export function getGownBySlug(slug: string) {
  return gownArchive.find((gown) => gown.slug === slug);
}
