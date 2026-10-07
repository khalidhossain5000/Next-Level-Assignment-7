import type { TechnicianProfileStatus } from "./auth.types";

export interface TechnicianProfile {
  availability?: "AVAILABLE" | "BUSY";
  expertise?: string[];
  experience?: number;
  bio?: string;
  resume?: string | null;
  technicianvProfileVerificationStatus?: TechnicianProfileStatus;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  status?: string;
  technicianProfile?: TechnicianProfile | null;
  assignedOutages?: { id: string; status: string }[];
}
