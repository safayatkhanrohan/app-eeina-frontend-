import { z } from 'zod';
import { Translation } from '@/i18n';

const createNumberSchema = (
  messages: { required: string; min?: string; max?: string },
  constraints: { min?: number; max?: number } = {},
) => {
  return z
    .union([z.number(), z.nan(), z.undefined()])
    .refine((val) => typeof val === 'number' && !isNaN(val), { message: messages.required })
    .transform((val) => val as number)
    .refine((val) => (constraints.min === undefined ? true : val >= constraints.min), {
      message: messages.min,
    })
    .refine((val) => (constraints.max === undefined ? true : val <= constraints.max), {
      message: messages.max,
    });
};

const createEnumSchema = <T extends [string, ...string[]]>(values: T, requiredMessage: string) => {
  return z
    .union([z.enum(values), z.undefined()])
    .refine((val) => val !== undefined, { message: requiredMessage });
};

export const getGoalSchema = (t: Translation) => {
  return z
    .object({
      type: createEnumSchema(
        ['Gain Weight', 'Lose Weight', 'Maintain Weight', 'Build Muscle'],
        t.goalSetup.validation_type_required,
      ),

      currentWeight: createNumberSchema(
        {
          required: t.goalSetup.validation_current_weight_required,
          min: t.goalSetup.validation_current_weight_min,
          max: t.goalSetup.validation_current_weight_max,
        },
        { min: 32, max: 150 },
      ),

      targetWeight: createNumberSchema(
        {
          required: t.goalSetup.validation_target_weight_required,
          min: t.goalSetup.validation_target_weight_min,
          max: t.goalSetup.validation_target_weight_max,
        },
        { min: 32, max: 150 },
      ).optional(),

      age: createNumberSchema(
        {
          required: t.goalSetup.validation_age_required,
          min: t.goalSetup.validation_age_min,
          max: t.goalSetup.validation_age_max,
        },
        { min: 13, max: 120 },
      ),

      height: createNumberSchema(
        {
          required: t.goalSetup.validation_height_required,
          min: t.goalSetup.validation_height_min,
          max: t.goalSetup.validation_height_max,
        },
        { min: 50, max: 300 },
      ),

      gender: createEnumSchema(['male', 'female'], t.goalSetup.validation_gender_required),

      activityLevel: createEnumSchema(
        ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'super_active'],
        t.goalSetup.validation_activity_level_required,
      ),

      durationWeeks: createNumberSchema(
        {
          required: t.goalSetup.validation_duration_weeks_required,
          min: t.goalSetup.validation_duration_weeks_min,
          max: t.goalSetup.validation_duration_weeks_max,
        },
        { min: 1, max: 52 },
      ).optional(),
    })
    .passthrough();
};
