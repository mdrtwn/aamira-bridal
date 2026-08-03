import CatalogPage from "../../../aamirabasic/CatalogPage";
import { products } from "../../../aamirabasic/catalog";

export default function SignatureEditPage() {
  return <CatalogPage title="The Signature Edit" description="Essential Aamira silhouettes selected for lasting relevance." source={products.filter((product) => product.collections.includes("signature-edit"))} />;
}
