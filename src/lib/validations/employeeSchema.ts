import * as z from "zod";

export const employeeSchema = z.object({
  firstName: z
    .string()
    .min(6, { message: "First name must be at least 6 characters" })
    .max(10, { message: "First name cannot exceed 10 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "First name must only contain alphabets",
    }),

  lastName: z
    .string()
    .min(6, { message: "Last name must be at least 6 characters" })
    .max(10, { message: "Last name cannot exceed 10 characters" })
    .regex(/^[A-Za-z]+$/, { message: "Last name must only contain alphabets" }),

  email: z.string().email({ message: "Invalid email address" }),

  phoneNumber: z
    .string()
    .regex(/^(?:\+94|0)?[1-9][0-9]{8}$/, {
      message: "Invalid Sri Lankan phone number",
    }),

  gender: z.enum(["M", "F"], { message: "Gender must be either M or F" }),
});
