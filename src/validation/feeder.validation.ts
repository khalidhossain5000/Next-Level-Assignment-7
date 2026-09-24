import { z } from "zod";

export const addFeederSchema = z.object({
  name: z
    .string("Feeder name is required")
    .min(3, "Feeder name must be at least 3 characters")
    .max(100, "Feeder name must not exceed 100 characters"),

  code: z
    .string("Feeder code is required")
    .min(3, "Feeder code must be at least 3 characters")
    .max(30, "Feeder code must not exceed 30 characters"),

  voltageLevel: z
    .string("Voltage level is required")
    .min(2, "Voltage level must be at least 2 characters")
    .max(30, "Voltage level must not exceed 30 characters"),

  substationId: z
    .string("Substation is required")
    .min(1, "Please select a substation"),
});