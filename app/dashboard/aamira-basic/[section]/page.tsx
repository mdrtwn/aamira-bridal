import { notFound } from "next/navigation";
import ModulePlaceholder from "../../_components/ModulePlaceholder";

const modules: Record<string, { title: string; description: string }> = {
  products: { title: "Products", description: "Product CRUD, variants, pricing, and publishing will be connected after the commerce database schema is installed." },
  orders: { title: "Orders", description: "Order processing will become available after checkout and payment integrations are connected." },
  customers: { title: "Customers", description: "Customer records will be exposed through a permission-controlled data access layer." },
  settings: { title: "Settings", description: "Workspace preferences, team access, and brand configuration will live here." },
};

export default async function BasicModulePage({ params }: Readonly<{ params: Promise<{ section: string }> }>) {
  const { section } = await params;
  const moduleConfig = modules[section];
  if (!moduleConfig) notFound();
  return <ModulePlaceholder eyebrow="Aamira Basic" title={moduleConfig.title} description={moduleConfig.description} />;
}
