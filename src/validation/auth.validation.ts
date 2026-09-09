import z from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address,Try again"),
    password: z.string("Password is not a string")
})