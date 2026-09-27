import { z } from "zod";

export const reportOutageSchema = z.object({
  cause: z
    .string("Cause is required")
    .min(5, "Cause must be at least 5 characters")
    .max(100, "Cause must not exceed 100 characters"),

  description: z
    .string("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  areaId: z
    .string("Area is required")
    .min(1, "Please select an affected area"),
});


export const updateOutageSchema = z.object({
  cause: z
    .string("Not a string")
    .min(5, "Cause should minimum have 5 char")
    .max(100, "Max 100 chars"),

  description: z
    .string("Not a string")
    .min(10, "Description should minimum have 10 char")
    .max(300, "Max 300 chars"),

  areaId: z
    .string("Not a string")
    .min(1, "Please select an affected area"),
});