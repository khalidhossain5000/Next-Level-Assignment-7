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





export const updateTechProfileSchema = z.object({
    expertise: z
        .string()
        .trim()
        .min(1, "Please add at least one area of expertise")
        .regex(
            /^[^,]+(?:,[^,]+){0,4}$/,
            "You can add a maximum of 5 expertise areas separated by commas",
        ),

    experienceYears: z
        .coerce
        .number()
        .int("Experience must be a whole number")
        .min(0, "Experience cannot be negative")
        .max(50, "Experience cannot exceed 50 years"),

    bio: z
        .string()
        .trim()
        .min(20, "Bio must be at least 20 characters")
        .max(500, "Bio cannot exceed 500 characters"),

    resume: z
        .file()
        .max(5 * 1024 * 1024, "Resume file must be 5 MB or smaller")
        .mime(
            [
                "application/pdf",
                "image/png",
                "image/jpeg",
            ],
            "Only PDF, PNG, JPG, and JPEG files are allowed",
        )
        .nullable(),
});

export type UpdateTechProfileFormValues = z.infer<
    typeof updateTechProfileSchema
>;