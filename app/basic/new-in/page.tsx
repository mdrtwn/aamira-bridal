import CatalogPage from "../../aamirabasic/CatalogPage";
import { products } from "../../aamirabasic/catalog";

export default function NewInPage() {
  return <CatalogPage title="New In" description="The newest Aamira Basic pieces, designed for modern routines and considered dressing." source={products.filter((product) => product.isNew)} />;
}
