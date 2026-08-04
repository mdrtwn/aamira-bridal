import type { Metadata } from "next";
import DualCampaignHero from "../aamirabasic/DualCampaignHero";
import FeaturedProducts from "../aamirabasic/FeaturedProducts";
import MotherDaughterCapsule from "../aamirabasic/MotherDaughterCapsule";
import ShopTheLooks from "../aamirabasic/ShopTheLooks";
import AsSeenOn from "../aamirabasic/AsSeenOn";

export const metadata: Metadata = {
  title: { absolute: "Aamira Basic" },
  description: "Aamira Basic ready-to-wear.",
};

export default function BasicPage() {
  return (
    <main>
      <DualCampaignHero />
      <FeaturedProducts />
      <MotherDaughterCapsule />
      <ShopTheLooks />
      <AsSeenOn />
    </main>
  );
}
