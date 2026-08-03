import CatalogPage from "../../../aamirabasic/CatalogPage";
import { products } from "../../../aamirabasic/catalog";

export default function LongJacketsPage() {
  return <CatalogPage title="Long Jackets" description="Elongated layers shaped with clean lines and relaxed structure." source={products.filter((product) => product.category === "Long Jackets")} />;
}
