import { z } from "zod";

export const addLoadSheddingSchema = z
  .object({
    title: z
      .string("Schedule title is required")
      .min(5, "Title must be at least 5 characters")
      .max(150, "Title must not exceed 150 characters"),

    startTime: z
      .string("Start time is required")
      .min(1, "Start time is required"),

    endTime: z
      .string("End time is required")
      .min(1, "End time is required"),

    reason: z
      .string("Reason is required").min(5, "Reason must be at least 5 characters")
      .max(400, "Reason must not exceed 400 characters"),

    areaId: z
      .string("Area is required")
      .min(1, "Please select an area"),
  })
  .refine(
    (data) => new Date(data.startTime).getTime() < new Date(data.endTime).getTime(),
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  );