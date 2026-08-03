import CatalogPage from "../../../aamirabasic/CatalogPage";
import { products } from "../../../aamirabasic/catalog";

export default function TopsShirtsPage() {
  return <CatalogPage title="Tops & Shirts" description="Crisp, versatile separates with thoughtful volume and quiet detailing." source={products.filter((product) => product.category === "Tops & Shirts")} />;
}
