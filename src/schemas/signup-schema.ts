
import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State/Province is required"),
  city: z.string().min(1, "City is required"),
  verificationMethod: z.enum(["email", "whatsapp"]),
  verificationCode: z.string().length(6, "Verification code must be 6 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;
