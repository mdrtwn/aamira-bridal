import CatalogPage from "../../../aamirabasic/CatalogPage";
import { products } from "../../../aamirabasic/catalog";

export default function DressesKaftansPage() {
  return <CatalogPage title="Dresses & Kaftans" description="Fluid silhouettes made for ease, movement, and understated occasion dressing." source={products.filter((product) => product.category === "Dresses & Kaftans")} />;
}
