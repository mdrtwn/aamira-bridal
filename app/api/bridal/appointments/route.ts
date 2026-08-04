import { NextResponse } from "next/server";
import { validateAppointment } from "@/lib/bridal/appointments";
import { submitPublicAppointment } from "@/lib/bridal/appointment-data";
import type { BridalAppointmentInput } from "@/lib/bridal/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Appointment service is not configured." },
      { status: 503 },
    );
  }

  let input: BridalAppointmentInput;
  try {
    const body = await request.json() as BridalAppointmentInput & { website?: string };
    if (body.website) {
      return NextResponse.json({ reference: "REQUEST-RECEIVED" }, { status: 201 });
    }
    input = body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const errors = validateAppointment(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please review the required fields.", fields: errors }, { status: 400 });
  }

  try {
    const reference = await submitPublicAppointment(input);
    return NextResponse.json({ reference }, { status: 201 });
  } catch (error) {
    console.error("Unable to create Bridal appointment", error);
    return NextResponse.json(
      { error: "We could not submit your request. Please try again shortly." },
      { status: 500 },
    );
  }
}
