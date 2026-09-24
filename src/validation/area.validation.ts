import { z } from "zod";

export const addAreaSchema = z.object({
  name: z
    .string("Area name is required")
    .min(3, "Area name must be at least 3 characters")
    .max(100, "Area name must not exceed 100 characters"),

  code: z
    .string("Area code is required")
    .min(2, "Area code must be at least 2 characters")
    .max(30, "Area code must not exceed 30 characters"),

  address: z
    .string("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address must not exceed 300 characters"),

  feederId: z
    .string("Feeder is required")
    .min(1, "Please select a feeder"),
});