import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
  "About Power Pulse",
  "Learn how Power Pulse connects power schedules, outage reporting, local infrastructure, and service coordination.",
);

export default function AboutUsLayout({ children }: { children: ReactNode }) {
  return children;
}