import { z } from 'zod';

export const updateUserProfileSchema = z
  .object({
    // Personal Information
    firstName: z
      .string()
      .trim()
      .min(2, 'First name must be at least 2 characters')
      .max(100, 'First name cannot exceed 100 characters')
      .optional(),

    lastName: z
      .string()
      .trim()
      .min(2, 'Last name must be at least 2 characters')
      .max(100, 'Last name cannot exceed 100 characters')
      .optional(),

    phone: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (E.164 format)')
      .optional()
      .or(z.literal('')),

    dob: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const date = new Date(val);
          const age = new Date().getFullYear() - date.getFullYear();
          return age >= 13 && age <= 120;
        },
        { message: 'Age must be between 13 and 120 years' },
      ),

    gender: z.enum(['male', 'female', 'other']).optional(),

    bio: z.string().trim().max(500, 'Bio cannot exceed 500 characters').optional(),

    // Location
    location: z
      .object({
        zip: z
          .string()
          .trim()
          .regex(/^\d{4,10}$/, 'Please enter a valid zip code (4-10 digits)')
          .optional()
          .or(z.literal('')),
        city: z.string().trim().max(100, 'City name cannot exceed 100 characters').optional(),
        streetAddress: z
          .string()
          .trim()
          .max(200, 'Street address cannot exceed 200 characters')
          .optional(),
        country: z.string().trim().max(100, 'Country name cannot exceed 100 characters').optional(),
      })
      .optional(),

    // Profile Media
    profilePicture: z
      .object({
        key: z.string().optional(),
        url: z.string().optional(),
      })
      .optional()
      .nullable()
      .refine(
        (val) => {
          if (!val || !val.url || val.url === '') return true;
          try {
            new URL(val.url);
            return true;
          } catch {
            return false;
          }
        },
        { message: 'Profile picture URL must be valid' },
      ),

    coverPhoto: z
      .object({
        key: z.string().optional(),
        url: z.string().optional(),
      })
      .optional()
      .nullable()
      .refine(
        (val) => {
          if (!val || !val.url || val.url === '') return true;
          try {
            new URL(val.url);
            return true;
          } catch {
            return false;
          }
        },
        { message: 'Cover photo URL must be valid' },
      ),

    // Notification Preferences
    marketplaceNotifications: z.boolean().optional(),
    recipeUpdates: z.boolean().optional(),
    promotionalEmails: z.boolean().optional(),
    pushNotifications: z.boolean().optional(),

    // Social Links
    facebook: z.string().url('Facebook must be a valid URL').optional().or(z.literal('')),
    instagram: z.string().url('Instagram must be a valid URL').optional().or(z.literal('')),
    twitter: z.string().url('Twitter must be a valid URL').optional().or(z.literal('')),
    linkedin: z.string().url('LinkedIn must be a valid URL').optional().or(z.literal('')),
    website: z.string().url('Website must be a valid URL').optional().or(z.literal('')),

    // Health Profile
    healthProfile: z
      .object({
        basic: z
          .object({
            height: z
              .number()
              .min(30, 'Height must be at least 30 cm')
              .max(300, 'Height must be at most 300 cm')
              .optional(),
            weight: z
              .number()
              .min(2, 'Weight must be at least 2 kg')
              .max(500, 'Weight must be at most 500 kg')
              .optional(),
          })
          .optional(),

        bodyComposition: z
          .object({
            bodyFatPercentage: z.number().min(3).max(75).optional(),
            muscleMass: z.number().min(5).max(300).optional(),
            bmi: z.number().min(10).max(60).optional(),
          })
          .optional(),

        healthCondition: z
          .object({
            conditions: z.array(z.string().min(1)).optional(),
            doctorsAdvice: z
              .string()
              .min(3, "Doctor's advice must be at least 3 characters long")
              .optional()
              .or(z.literal('')),
            restrictedNutrients: z.array(z.string().min(1)).optional(),
            recommendedNutrients: z.array(z.string().min(1)).optional(),
          })
          .optional(),

        cholesterolAndBloodSugar: z
          .object({
            totalCholesterol: z.number().min(100).max(400).optional(),
            ldl: z.number().min(50).max(250).optional(),
            hdl: z.number().min(20).max(100).optional(),
            triglycerides: z.number().min(50).max(500).optional(),
            glucose: z.number().min(70).max(180).optional(),
            insulin: z.number().min(2).max(25).optional(),
            homaIr: z.number().min(0.5).max(10).optional(),
          })
          .optional(),

        liverFunction: z
          .object({
            ast: z.number().min(10).max(40).optional(),
            alt: z.number().min(7).max(56).optional(),
            alp: z.number().min(44).max(147).optional(),
            ggt: z.number().min(9).max(48).optional(),
          })
          .optional(),

        kidneyFunction: z
          .object({
            urea: z.number().min(10).max(50).optional(),
            creatinine: z.number().min(0.4).max(1.5).optional(),
            eGFR: z.number().min(15).max(130).optional(),
            uricAcid: z.number().min(2.5).max(7.5).optional(),
          })
          .optional(),

        vitaminsAndMinerals: z
          .object({
            vitaminD: z.number().min(5).max(150).optional(),
            vitaminB12: z.number().min(150).max(900).optional(),
            iron: z.number().min(30).max(180).optional(),
            ferritin: z.number().min(12).max(300).optional(),
          })
          .optional(),

        thyroidFunction: z
          .object({
            t3: z.number().min(0.6).max(1.8).optional(),
            t4: z.number().min(4.5).max(12).optional(),
            tsh: z.number().min(0.4).max(4.0).optional(),
            crp: z.number().min(0).max(10).optional(),
          })
          .optional(),
      })
      .optional(),

    // Diet Preferences
    dietPreferences: z
      .object({
        dietType: z
          .string()
          .min(1, 'Diet type must be at least 1 character')
          .optional()
          .or(z.literal('')),
        religiousRestriction: z.array(z.string().min(1)).optional(),
        allergies: z.array(z.string().min(1)).optional(),
        intolerances: z.array(z.string().min(1)).optional(),
        preferredTaste: z.array(z.string().min(1)).optional(),
        favouriteIngredients: z.array(z.string().min(1)).optional(),
        dislikedIngredients: z.array(z.string().min(1)).optional(),
        preferredCuisine: z.array(z.string().min(1)).optional(),
        cookingMethods: z.array(z.string().min(1)).optional(),
        mealTypes: z.array(z.string().min(1)).optional(),
        portionSize: z.enum(['Small', 'Medium', 'Large']).optional(),
      })
      .optional(),

    // Cooking Context
    cookingContext: z
      .object({
        skillLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
        timeAvailable: z.number().min(1, 'Time available must be at least 1 minute').optional(),
        budget: z
          .string()
          .min(1, 'Budget must be at least 1 character')
          .optional()
          .or(z.literal('')),
        location: z
          .string()
          .min(1, 'Location must be at least 1 character')
          .optional()
          .or(z.literal('')),
        season: z.enum(['Summer', 'Winter', 'Spring', 'Autumn', 'Rainy']).optional(),
        availableIngredients: z.array(z.string().min(1)).optional(),
        appliances: z.array(z.string().min(1)).optional(),
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

// Edit Profile Schema - used in the Edit Profile page
// This schema is the same as updateUserProfileSchema but with categoryRestrictions and foodRestrictions removed
// as they are not part of the user profile update
export const editProfileSchema = updateUserProfileSchema;

// Type inference for the edit profile form
export type EditProfileType = z.infer<typeof editProfileSchema>;

// Type inference for the update user profile
export type UpdateUserProfileType = z.infer<typeof updateUserProfileSchema>;
