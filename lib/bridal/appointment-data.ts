import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { AppointmentStatus, BridalAppointmentInput } from "./types";

export type DashboardProfile = {
  id: string;
  fullName: string;
  role: string;
};

export type AppointmentNote = {
  id: string;
  note: string;
  authorId: string;
  createdAt: string;
};

export type DashboardAppointment = {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  consultationDate: string;
  collection: string;
  message: string;
  status: AppointmentStatus;
  assignedTo: string | null;
  source: string;
  createdAt: string;
  updatedAt: string;
  notes: AppointmentNote[];
};

type AppointmentRow = {
  id: string;
  reference: string;
  full_name: string;
  email: string;
  phone: string;
  wedding_date: string;
  consultation_date: string;
  collection_interest: string;
  message: string;
  status: AppointmentStatus;
  assigned_to: string | null;
  source: string;
  created_at: string;
  updated_at: string;
  appointment_notes?: Array<{
    id: string;
    note: string;
    author_id: string;
    created_at: string;
  }>;
};

function mapAppointment(row: AppointmentRow): DashboardAppointment {
  return {
    id: row.id,
    reference: row.reference,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    weddingDate: row.wedding_date,
    consultationDate: row.consultation_date,
    collection: row.collection_interest,
    message: row.message,
    status: row.status,
    assignedTo: row.assigned_to,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    notes: (row.appointment_notes ?? []).map((note) => ({
      id: note.id,
      note: note.note,
      authorId: note.author_id,
      createdAt: note.created_at,
    })),
  };
}

export async function submitPublicAppointment(input: BridalAppointmentInput) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_bridal_appointment", {
    p_full_name: input.fullName,
    p_email: input.email,
    p_phone: input.phone,
    p_wedding_date: input.weddingDate,
    p_consultation_date: input.consultationDate,
    p_collection_interest: input.collection,
    p_message: input.message,
  });

  if (error) throw error;
  return String(data);
}

export async function listDashboardAppointments() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*, appointment_notes(id,note,author_id,created_at)")
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "appointment_notes", ascending: false });

  if (error) return { appointments: [] as DashboardAppointment[], error: error.message };
  return {
    appointments: (data as AppointmentRow[]).map(mapAppointment),
    error: null,
  };
}

export async function listDashboardProfiles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id,full_name,role")
    .eq("active", true)
    .order("full_name");

  if (error) return [] as DashboardProfile[];
  return (data as Array<{ id: string; full_name: string; role: string }>).map((profile) => ({
    id: profile.id,
    fullName: profile.full_name || profile.role.replaceAll("_", " "),
    role: profile.role,
  }));
}
