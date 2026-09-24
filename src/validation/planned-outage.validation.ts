import { z } from "zod";

export const addPlannedOutageSchema = z
  .object({
    title: z
      .string("Planned outage title is required")
      .min(5, "Title must be at least 5 characters")
      .max(150, "Title must not exceed 150 characters"),

    reason: z
      .string("Reason is required")
      .min(5, "Reason must be at least 5 characters")
      .max(200, "Reason must not exceed 200 characters"),

    description: z
      .string("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must not exceed 500 characters"),

    startTime: z
      .string("Start time is required")
      .min(1, "Start time is required"),

    endTime: z
      .string("End time is required")
      .min(1, "End time is required"),

    areaId: z
      .string("Area is required")
      .min(1, "Please select an area"),
  })
  .refine(
    (data) =>
      new Date(data.startTime).getTime() <
      new Date(data.endTime).getTime(),
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  );