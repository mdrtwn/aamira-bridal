import CatalogPage from "../../aamirabasic/CatalogPage";
import { products } from "../../aamirabasic/catalog";

export default function ShopPage() {
  return <CatalogPage title="Shop All" description="A considered wardrobe of refined layers, fluid dresses, and everyday separates." source={products} />;
}
