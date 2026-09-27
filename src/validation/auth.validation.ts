import z from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address,Try again"),
    password: z.string("Password is not a string")
})




export const registerUserValidationSchema = z.object({
    name: z.string("Not a string").min(5, "Name must be at least 5 char").max(50, "Name can not have more that 50 character"),
    email: z.email("Invalid email address,Try again"),
    password: z.string("Password should be a string")

})





export const updateTechnicianProfileSchema = z.object({
  expertise: z
    .array(z.string().min(2, "Each expertise must be at least 2 chars"))
    .min(1, "At least one expertise is required")
    .max(5, "You can add maximum 5 expertise tags"),

  experienceYears: z
    .number("Experience years must be a number")
    .min(0, "Experience years cannot be negative")
    .max(50, "Experience years seems too high"),

  bio: z
    .string("Not a string")
    .min(10, "Bio should minimum have 10 char")
    .max(300, "Max 300 chars"),

  resume: z
    .instanceof(File, {
      message: "Resume is required",
    })
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed",
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Resume size must be less than 5MB",
    ),
});