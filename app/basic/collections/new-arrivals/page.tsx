import CatalogPage from "../../../aamirabasic/CatalogPage";
import { products } from "../../../aamirabasic/catalog";

export default function NewArrivalsPage() {
  return <CatalogPage title="New Arrivals" description="Fresh additions to the Aamira Basic wardrobe." source={products.filter((product) => product.isNew)} />;
}
