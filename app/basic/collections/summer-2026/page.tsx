import CatalogPage from "../../../aamirabasic/CatalogPage";
import { products } from "../../../aamirabasic/catalog";

export default function Summer2026Page() {
  return <CatalogPage title="Summer 2026" description="A study in light layers, softened structure, and dressing with intention." source={products.filter((product) => product.collections.includes("summer-2026"))} />;
}
