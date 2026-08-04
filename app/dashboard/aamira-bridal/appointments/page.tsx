import { CalendarDays } from "lucide-react";
import {
  listDashboardAppointments,
  listDashboardProfiles,
} from "@/lib/bridal/appointment-data";
import AppointmentsManager from "./AppointmentsManager";
import styles from "../../dashboard.module.css";

export const dynamic = "force-dynamic";

export default async function BridalAppointmentsPage() {
  const [{ appointments, error }, profiles] = await Promise.all([
    listDashboardAppointments(),
    listDashboardProfiles(),
  ]);

  return (
    <>
      <header className={styles.pageHeader}><div><p>Bridal operations</p><h1>Appointments</h1></div><span>{appointments.length} requests</span></header>
      {error ? (
        <section className={styles.migrationRequired}>
          <CalendarDays aria-hidden="true" />
          <div><p>Database setup required</p><h2>Run the Bridal appointment migration</h2><span>The dashboard connection works, but the appointment tables are not available yet. Run <code>supabase/migrations/202608040001_bridal_appointments.sql</code> in the Supabase SQL Editor.</span></div>
        </section>
      ) : appointments.length ? (
        <AppointmentsManager initialAppointments={appointments} profiles={profiles} />
      ) : (
        <section className={styles.migrationRequired}><CalendarDays aria-hidden="true" /><div><p>Appointment inbox</p><h2>No requests yet</h2><span>New submissions from the Bridal appointment form will appear here automatically.</span></div></section>
      )}
    </>
  );
}
