import { z } from "zod";

export const createRideSchema = z.object({
  origin: z.string().min(2, "Polazište je obavezno."),
  destination: z.string().min(2, "Odredište je obavezno."),
  departureAt: z.string().datetime("Datum i vreme moraju biti u ISO formatu."),
  totalSeats: z.coerce.number().int().min(1).max(8),
  availableSeats: z.coerce.number().int().min(1).max(8),
  price: z.coerce.number().positive(),
  note: z.string().max(300).optional()
});
