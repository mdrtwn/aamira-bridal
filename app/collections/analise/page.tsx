import GownDetailPage from "../_components/GownDetailPage";
import { getGownBySlug } from "../gown-data";

export default function AnalisePage() {
  const gown = getGownBySlug("analise");

  if (!gown) return null;

  return <GownDetailPage gown={gown} />;
}
