import CatalogPage from "../../../aamirabasic/CatalogPage";
import { products } from "../../../aamirabasic/catalog";

export default function MotherDaughterPage() {
  return <CatalogPage title="Mother & Daughter" description="Coordinated pieces inspired by the rituals, memories, and style shared across generations." source={products.filter((product) => product.collections.includes("mother-daughter"))} />;
}
