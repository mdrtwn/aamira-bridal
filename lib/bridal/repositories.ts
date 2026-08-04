import type {
  AppointmentStatus,
  BridalAppointment,
  BridalAppointmentInput,
  BridalCollection,
  BridalGown,
} from "./types";

export type BridalListOptions = {
  status?: "draft" | "published" | "archived";
  query?: string;
};

export interface BridalGownRepository {
  list(options?: BridalListOptions): Promise<readonly BridalGown[]>;
  findById(id: string): Promise<BridalGown | null>;
  findBySlug(slug: string): Promise<BridalGown | null>;
  create(input: Omit<BridalGown, "id">): Promise<BridalGown>;
  update(id: string, input: Partial<Omit<BridalGown, "id">>): Promise<BridalGown>;
}

export interface BridalCollectionRepository {
  list(options?: BridalListOptions): Promise<readonly BridalCollection[]>;
  findBySlug(slug: string): Promise<BridalCollection | null>;
  create(input: Omit<BridalCollection, "id">): Promise<BridalCollection>;
  update(
    id: string,
    input: Partial<Omit<BridalCollection, "id">>,
  ): Promise<BridalCollection>;
}

export interface BridalAppointmentRepository {
  list(status?: AppointmentStatus): Promise<readonly BridalAppointment[]>;
  findById(id: string): Promise<BridalAppointment | null>;
  create(input: BridalAppointmentInput): Promise<BridalAppointment>;
  updateStatus(id: string, status: AppointmentStatus): Promise<BridalAppointment>;
  assign(id: string, userId: string | null): Promise<BridalAppointment>;
  updateInternalNotes(id: string, notes: string): Promise<BridalAppointment>;
}

// Implement these contracts with the selected database adapter. Keeping the
// UI dependent on these interfaces prevents dashboard code from being tied to
// a specific database vendor.
