import { TechnicianProfileStatus } from "@/types";

export const getAvailabilityClassName = (availability?: string) => {
  if (availability === "AVAILABLE") {
    return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";
  }
  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";
};

export const getVerificationClassName = (status?: TechnicianProfileStatus) => {
  switch (status) {
    case TechnicianProfileStatus.APPROVED:
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";
    case TechnicianProfileStatus.REJECTED:
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";
    default:
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";
  }
};

export const getVerificationLabel = (status?: TechnicianProfileStatus) => {
  switch (status) {
    case TechnicianProfileStatus.APPROVED:
      return "APPROVED";
    case TechnicianProfileStatus.REJECTED:
      return "REJECTED";
    default:
      return "PENDING";
  }
};

export const headClass =
  "h-12 whitespace-nowrap border-b border-border bg-muted/40 font-semibold text-foreground";
