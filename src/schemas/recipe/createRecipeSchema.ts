import { z } from 'zod';

// Ingredient schema
const ingredientSchema = z.object({
  rawIngr: z
    .object({
      en: z.string().trim().nullable().optional(),
      ar: z.string().trim().nullable().optional(),
    })
    .superRefine((val, ctx) => {
      const hasEn = typeof val.en === 'string' && val.en.trim().length > 0;
      const hasAr = typeof val.ar === 'string' && val.ar.trim().length > 0;

      if (!hasEn && !hasAr) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['en'],
          message: 'English title is required',
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['ar'],
          message: 'Arabic title is required',
        });
      }
    }),
});

// Instruction step schema
const instructionStepSchema = z.object({
  step: z
    .object({
      en: z.string().trim().nullable().optional(),
      ar: z.string().trim().nullable().optional(),
    })
    .refine((val) => val.en || val.ar, {
      message: "At least one of 'en' or 'ar' is required",
    }),

  image: z
    .object({
      url: z.string().url(),
      key: z.string(),
    })
    .nullable()
    .optional(),
});

// Main recipe schema
export const createRecipeSchema = z.object({
  title: z
    .object({
      en: z.string().trim().nullable().optional(),
      ar: z.string().trim().nullable().optional(),
    })
    .refine((val) => val.en || val.ar, {
      message: "At least one of 'en' or 'ar' is required for title",
    }),

  description: z
    .object({
      en: z.string().trim().nullable().optional(),
      ar: z.string().trim().nullable().optional(),
    })
    .superRefine((val, ctx) => {
      const hasEn = typeof val.en === 'string' && val.en.trim().length > 0;
      const hasAr = typeof val.ar === 'string' && val.ar.trim().length > 0;

      if (!hasEn && !hasAr) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['en'],
          message: 'English description is required',
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['ar'],
          message: 'Arabic description is required',
        });
      }
    }),

  ingredients: z.array(ingredientSchema).min(1, {
    message: 'At least one ingredient is required',
  }),

  instructions: z.array(instructionStepSchema).optional(),

  servings: z.number().min(1, 'Servings must be at least 1'),
  time: z.number().min(0, 'Time cannot be negative'),
  thumbnail: z.preprocess(
    (val) => {
      if (val === null || val === '') return undefined;
      return val;
    },
    z
      .object({
        url: z.string().url(),
        key: z.string(),
      })
      .nullable()
      .optional(),
  ),

  otherImages: z
    .array(
      z.object({
        url: z.string().url(),
        key: z.string(),
      }),
    )
    .optional(),

  videoUrl: z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() === '') {
      return null; // turn empty string into null
    }
    return val;
  }, z.string().trim().url('Video URL must be a valid URL').nullable().optional()),
});
