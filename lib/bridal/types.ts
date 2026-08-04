export type BridalPublishStatus = "draft" | "published" | "archived";

export type BridalSeo = {
  title: string;
  description: string;
  image?: string;
};

export type BridalCollection = {
  id: string;
  slug: string;
  name: string;
  status: BridalPublishStatus;
  sortOrder: number;
  href: string;
  seo: BridalSeo;
};

export type BridalGown = {
  id: string;
  slug: string;
  name: string;
  cardImage: string;
  cardDetail: string;
  cardPosition: string;
  cardTone: "bright" | "neutral" | "dark" | "vivid";
  description: string;
  images: readonly string[];
  status: BridalPublishStatus;
  sortOrder: number;
  featured: boolean;
  seo: BridalSeo & { image: string };
};

export const appointmentStatuses = [
  "new",
  "contacted",
  "consultation_scheduled",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
] as const;

export type AppointmentStatus = (typeof appointmentStatuses)[number];

export type BridalAppointmentInput = {
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  consultationDate: string;
  collection: string;
  message: string;
};

export type BridalAppointment = BridalAppointmentInput & {
  id: string;
  reference: string;
  status: AppointmentStatus;
  assignedTo: string | null;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
};
