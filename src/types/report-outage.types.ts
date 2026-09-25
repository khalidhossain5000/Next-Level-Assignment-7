export interface IReportOutagePayload {
  cause: string;
  description: string;
  areaId: string;
}

export interface IMyOutage {
  id: string;
  cause: string;
  description: string;
  priority: "NORMAL" | "HIGH";
  reported_At: string;
  status:
    | "REPORTED"
    | "ACKNOWLEDGED"
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "RESTORED"
    | "CANCELLED";
  acknowledgedAt: string | null;
  startedAt: string | null;
  isDeleted: boolean;
  userId: string;
  technicianId: string | null;
  areaId: string;
  createdAt: string;
  updatedAt: string;

  techician: null;

  area: {
    id: string;
    name: string;
    code: string;
    address: string;
    status: "ACTIVE" | "INACTIVE";
    feederId: string;
    createdAt: string;
    updatedAt: string;
  };

  user: {
    id: string;
    name: string;
    email: string;
    profileImage: string | null;
    profileImagePublicId: string;
    googleId: string | null;
    authProvider: "CREDENTIAL" | "GOOGLE";
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    emailVerified: boolean;
    status: "ACTIVE" | "BAN";
    createdAt: string;
    updatedAt: string;
  };
}