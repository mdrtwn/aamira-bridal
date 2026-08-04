import type { Metadata } from "next";
import { notFound } from "next/navigation";

import GownDetailPage from "../_components/GownDetailPage";
import { getGownBySlug, gownArchive } from "../gown-data";

type GownPageProps = {
  params: Promise<{ gown: string }>;
};

export function generateStaticParams() {
  return gownArchive
    .filter(({ slug }) => slug !== "analise")
    .map(({ slug }) => ({ gown: slug }));
}

export async function generateMetadata({ params }: GownPageProps): Promise<Metadata> {
  const { gown: slug } = await params;
  const gown = getGownBySlug(slug);

  if (!gown) return {};

  return {
    title: gown.seo.title,
    description: gown.seo.description,
    openGraph: {
      title: gown.seo.title,
      description: gown.seo.description,
      images: [gown.seo.image],
    },
  };
}

export default async function GownPage({ params }: GownPageProps) {
  const { gown: slug } = await params;
  const gown = getGownBySlug(slug);

  if (!gown || slug === "analise") notFound();

  return <GownDetailPage gown={gown} />;
}
