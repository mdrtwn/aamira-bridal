"use server";

import { revalidatePath } from "next/cache";
import { requireDashboardUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { appointmentStatuses, type AppointmentStatus } from "@/lib/bridal/types";

type ActionResult = { ok: boolean; error?: string };

function isAppointmentStatus(value: string): value is AppointmentStatus {
  return appointmentStatuses.some((status) => status === value);
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: string,
): Promise<ActionResult> {
  await requireDashboardUser();
  if (!isAppointmentStatus(status)) return { ok: false, error: "Invalid status." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", appointmentId);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/dashboard/aamira-bridal/appointments");
  return { ok: true };
}

export async function assignAppointment(
  appointmentId: string,
  profileId: string,
): Promise<ActionResult> {
  await requireDashboardUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("appointments")
    .update({ assigned_to: profileId || null })
    .eq("id", appointmentId);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/dashboard/aamira-bridal/appointments");
  return { ok: true };
}

export async function addAppointmentNote(
  appointmentId: string,
  note: string,
): Promise<ActionResult> {
  const user = await requireDashboardUser();
  const cleanNote = note.trim();
  if (!cleanNote || cleanNote.length > 4000) {
    return { ok: false, error: "Note must contain between 1 and 4,000 characters." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("appointment_notes").insert({
    appointment_id: appointmentId,
    author_id: user.id,
    note: cleanNote,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath("/dashboard/aamira-bridal/appointments");
  return { ok: true };
}
