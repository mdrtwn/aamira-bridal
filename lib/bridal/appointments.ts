import type { BridalAppointmentInput } from "./types";

export type AppointmentFieldErrors = Partial<
  Record<keyof BridalAppointmentInput, string>
>;

export const emptyAppointment: BridalAppointmentInput = {
  fullName: "",
  email: "",
  phone: "",
  weddingDate: "",
  consultationDate: "",
  collection: "No preference",
  message: "",
};

export function validateAppointment(input: BridalAppointmentInput) {
  const errors: AppointmentFieldErrors = {};
  const required: (keyof BridalAppointmentInput)[] = [
    "fullName",
    "email",
    "phone",
    "weddingDate",
    "consultationDate",
  ];

  for (const field of required) {
    if (!input[field].trim()) errors[field] = "This field is required.";
  }

  if (input.email && !/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  for (const field of ["weddingDate", "consultationDate"] as const) {
    if (input[field] && !/^\d{4}-\d{2}-\d{2}$/.test(input[field])) {
      errors[field] = "Enter a valid date.";
    }
  }

  return errors;
}
