import { notFound } from "next/navigation";
import ModulePlaceholder from "../../_components/ModulePlaceholder";

const modules: Record<string, { title: string; description: string }> = {
  appointments: { title: "Appointments", description: "Appointment inbox, status workflow, consultant assignment, and internal notes will connect to the first Bridal database tables." },
  gowns: { title: "Gowns", description: "The existing gown model is ready for create, edit, publish, archive, ordering, and SEO controls." },
  customers: { title: "Customers", description: "Bridal profiles, inquiry history, wedding dates, and consent data will be protected by role-based access." },
  settings: { title: "Settings", description: "Workspace preferences, team access, appointment rules, and brand configuration will live here." },
};

export default async function BridalModulePage({ params }: Readonly<{ params: Promise<{ section: string }> }>) {
  const { section } = await params;
  const moduleConfig = modules[section];
  if (!moduleConfig) notFound();
  return <ModulePlaceholder eyebrow="Aamira Bridal" title={moduleConfig.title} description={moduleConfig.description} />;
}
