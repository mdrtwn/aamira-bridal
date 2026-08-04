"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import type {
  DashboardAppointment,
  DashboardProfile,
} from "@/lib/bridal/appointment-data";
import { appointmentStatuses } from "@/lib/bridal/types";
import {
  addAppointmentNote,
  assignAppointment,
  updateAppointmentStatus,
} from "./actions";
import styles from "../../dashboard.module.css";

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  consultation_scheduled: "Consultation scheduled",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No-show",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

export default function AppointmentsManager({
  initialAppointments,
  profiles,
}: Readonly<{ initialAppointments: DashboardAppointment[]; profiles: DashboardProfile[] }>) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedId, setSelectedId] = useState(initialAppointments[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [note, setNote] = useState("");
  const [actionError, setActionError] = useState("");
  const [pending, startTransition] = useTransition();

  const visible = useMemo(() => appointments.filter((appointment) => {
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    const searchable = `${appointment.reference} ${appointment.fullName} ${appointment.email} ${appointment.phone}`.toLowerCase();
    return matchesStatus && searchable.includes(query.toLowerCase());
  }), [appointments, query, statusFilter]);
  const selected = appointments.find((appointment) => appointment.id === selectedId) ?? null;

  const runAction = (action: () => Promise<{ ok: boolean; error?: string }>, onSuccess: () => void) => {
    setActionError("");
    startTransition(async () => {
      const result = await action();
      if (!result.ok) setActionError(result.error ?? "The update could not be saved.");
      else onSuccess();
    });
  };

  return (
    <div className={styles.appointmentsLayout}>
      <section className={styles.appointmentList}>
        <div className={styles.appointmentToolbar}>
          <label><Search aria-hidden="true" /><span className="sr-only">Search appointments</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email, reference…" /></label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter appointment status">
            <option value="all">All statuses</option>
            {appointmentStatuses.map((status) => <option value={status} key={status}>{statusLabels[status]}</option>)}
          </select>
        </div>
        <div className={styles.appointmentTable}>
          <div className={styles.appointmentTableHead}><span>Customer</span><span>Consultation</span><span>Status</span></div>
          {visible.length ? visible.map((appointment) => (
            <button type="button" className={selectedId === appointment.id ? styles.selectedAppointment : ""} onClick={() => setSelectedId(appointment.id)} key={appointment.id}>
              <span><strong>{appointment.fullName}</strong><small>{appointment.reference}</small></span>
              <span>{formatDate(appointment.consultationDate)}</span>
              <i data-status={appointment.status}>{statusLabels[appointment.status]}</i>
            </button>
          )) : <p className={styles.noAppointments}>No appointments match this view.</p>}
        </div>
      </section>

      {selected ? (
        <aside className={styles.appointmentDetail} aria-label={`Appointment ${selected.reference}`}>
          <header><div><p>{selected.reference}</p><h2>{selected.fullName}</h2></div><button type="button" onClick={() => setSelectedId("")} aria-label="Close appointment details"><X /></button></header>
          <div className={styles.appointmentControls}>
            <label>Status<select disabled={pending} value={selected.status} onChange={(event) => {
              const status = event.target.value;
              runAction(() => updateAppointmentStatus(selected.id, status), () => setAppointments((current) => current.map((item) => item.id === selected.id ? { ...item, status: status as DashboardAppointment["status"] } : item)));
            }}>{appointmentStatuses.map((status) => <option value={status} key={status}>{statusLabels[status]}</option>)}</select></label>
            <label>Assigned consultant<select disabled={pending} value={selected.assignedTo ?? ""} onChange={(event) => {
              const profileId = event.target.value;
              runAction(() => assignAppointment(selected.id, profileId), () => setAppointments((current) => current.map((item) => item.id === selected.id ? { ...item, assignedTo: profileId || null } : item)));
            }}><option value="">Unassigned</option>{profiles.map((profile) => <option value={profile.id} key={profile.id}>{profile.fullName}</option>)}</select></label>
          </div>
          {actionError ? <p className={styles.dashboardError} role="alert">{actionError}</p> : null}
          <dl className={styles.appointmentFacts}>
            <div><dt>Email</dt><dd><a href={`mailto:${selected.email}`}>{selected.email}</a></dd></div>
            <div><dt>Phone</dt><dd><a href={`tel:${selected.phone}`}>{selected.phone}</a></dd></div>
            <div><dt>Wedding date</dt><dd>{formatDate(selected.weddingDate)}</dd></div>
            <div><dt>Consultation</dt><dd>{formatDate(selected.consultationDate)}</dd></div>
            <div><dt>Collection</dt><dd>{selected.collection}</dd></div>
          </dl>
          <section className={styles.customerMessage}><h3>Customer message</h3><p>{selected.message || "No message provided."}</p></section>
          <section className={styles.notes}><h3>Internal notes</h3>{selected.notes.map((item) => <article key={item.id}><p>{item.note}</p><span>{new Date(item.createdAt).toLocaleString("en-AU")}</span></article>)}
            <form onSubmit={(event) => {
              event.preventDefault();
              const submittedNote = note;
              runAction(() => addAppointmentNote(selected.id, submittedNote), () => {
                setAppointments((current) => current.map((item) => item.id === selected.id ? { ...item, notes: [{ id: crypto.randomUUID(), note: submittedNote, authorId: "current", createdAt: new Date().toISOString() }, ...item.notes] } : item));
                setNote("");
              });
            }}><label htmlFor="appointment-note" className="sr-only">Add internal note</label><textarea id="appointment-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal note…" maxLength={4000} /><button type="submit" disabled={pending || !note.trim()}>Save note</button></form>
          </section>
        </aside>
      ) : null}
    </div>
  );
}
