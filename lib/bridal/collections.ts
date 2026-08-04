import type { BridalCollection } from "./types";

export const bridalCollections = [
  { slug: "celestine", name: "Celestine", status: "published" },
  { slug: "lumiere", name: "Lumière", status: "published" },
  { slug: "mireille", name: "Mireille", status: "published" },
  { slug: "seraphine", name: "Seraphine", status: "published" },
  { slug: "delara", name: "Delara", status: "published" },
  { slug: "isadora", name: "Isadora", status: "published" },
  { slug: "aurore", name: "Aurore", status: "draft" },
].map((collection, index): BridalCollection => ({
  id: `bridal-collection-${collection.slug}`,
  ...collection,
  status: collection.status as BridalCollection["status"],
  sortOrder: index + 1,
  href: `/collections/${collection.slug}`,
  seo: {
    title: `${collection.name} — Aamira Bridal`,
    description: `Discover the ${collection.name} bridal collection by Aamira Bridal.`,
  },
}));

export const appointmentCollectionOptions = [
  "No preference",
  ...bridalCollections.map(({ name }) => name),
] as const;

export function getBridalCollection(slug: string) {
  return bridalCollections.find((collection) => collection.slug === slug);
}
