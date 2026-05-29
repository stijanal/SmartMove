import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "Ime je obavezno."),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  email: z.string().email("Email nije validan."),
  password: z.string().min(6, "Lozinka mora imati najmanje 6 karaktera.")
});

export const loginSchema = z.object({
  email: z.string().email("Email nije validan."),
  password: z.string().min(6, "Lozinka mora imati najmanje 6 karaktera.")
});
