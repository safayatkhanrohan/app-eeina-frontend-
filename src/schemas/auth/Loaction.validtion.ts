import z from 'zod';
export const locationSchema = z.object({
  location: z.object({
    country: z.string().min(1, "Country is required"),
    zip: z.string().min(1, "ZIP Code is required"),
  }),
});

export type LocationType = z.infer<typeof locationSchema>;