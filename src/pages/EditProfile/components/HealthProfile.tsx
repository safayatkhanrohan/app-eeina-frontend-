import React from 'react';
import {
  User,
  Activity,
  Heart,
  Droplet,
  Brain,
  Flame,
  ChefHat,
  Clock,
  DollarSign,
  MapPin,
  Sun,
  Utensils,
} from 'lucide-react';

import { useLanguage } from '@/contexts/LanguageContext';
import { Controller, useFormContext } from 'react-hook-form';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { CollapsibleProfileSection } from './CollapsibleProfileSection';

export const HealthProfile: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditProfileType>();
  console.log('er', errors);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t.goals.health_profile}</h2>
          <p className="text-slate-600 mt-1">{t.goals.comprehensive_dietary_health}</p>
        </div>
      </div>
      <div className="space-y-4">
        <CollapsibleProfileSection
          title={t.goals.basic_information}
          icon={<User className="w-5 h-5" />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.height_cm}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.basic.height', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                  step="0.1"
                />
                {errors?.healthProfile?.basic?.height && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.basic.height.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.weight_kg}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.basic.weight', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                  step="0.1"
                />
                {errors?.healthProfile?.basic?.weight && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.basic.weight.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CollapsibleProfileSection>
        <CollapsibleProfileSection
          title={t.goals.body_composition}
          icon={<Activity className="w-5 h-5" />}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.body_fat_percent}
              </label>
              <input
                type="number"
                {...register('healthProfile.bodyComposition.bodyFatPercentage', {
                  valueAsNumber: true,
                })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                step="0.1"
              />
              {errors?.healthProfile?.bodyComposition?.bodyFatPercentage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.bodyComposition.bodyFatPercentage.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.muscle_mass_kg}
              </label>
              <input
                type="number"
                {...register('healthProfile.bodyComposition.muscleMass', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                step="0.1"
              />
              {errors?.healthProfile?.bodyComposition?.muscleMass && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.bodyComposition.muscleMass.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Flame className="w-4 h-4 inline mr-2" />
                {t.goals.bmi_BodyMassIndex}
              </label>
              <input
                type="number"
                step="0.1"
                {...register('healthProfile.bodyComposition.bmi', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              <p className="text-xs text-slate-500 mt-1">{t.goals.calories_burned_rest}</p>
              {errors?.healthProfile?.bodyComposition?.bmi && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.bodyComposition.bmi.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleProfileSection>
        <CollapsibleProfileSection
          title={t.goals.dietary_preferences}
          icon={<Utensils className="w-5 h-5" />}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.diet_type}
              </label>
              <input
                type="text"
                {...register('dietPreferences.dietType')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                placeholder={t.goals.vegetarian}
              />
              {errors?.dietPreferences?.dietType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.dietType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.religious_restriction}
              </label>
              <Controller
                name="dietPreferences.religiousRestriction"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={language == 'ar' ? 'حلال' : 'e.g., halal,'}
                  />
                )}
              />
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ar'
                  ? 'اكتب القيم مفصولة بفاصلة (،)'
                  : 'Separate multiple items with commas.'}
              </p>
              {errors?.dietPreferences?.religiousRestriction && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.religiousRestriction.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.allergies_comma}
              </label>
              <Controller
                name="dietPreferences.allergies"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.allergies_placeholder}
                  />
                )}
              />
              {errors?.dietPreferences?.allergies && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.allergies.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.intolerances_comma}
              </label>
              <Controller
                name="dietPreferences.intolerances"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.intolerances_placeholder}
                  />
                )}
              />
              {errors?.dietPreferences?.intolerances && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.intolerances.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.preferred_taste_comma}
              </label>
              <Controller
                name="dietPreferences.preferredTaste"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.taste_placeholder}
                  />
                )}
              />
              {errors?.dietPreferences?.preferredTaste && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.preferredTaste.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.portion_size}
              </label>
              <select
                {...register('dietPreferences.portionSize')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              >
                <option value="Small">{t.goals.small}</option>
                <option value="Medium">{t.goals.medium}</option>
                <option value="Large">{t.goals.large}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.favorite_ingredients}
              </label>
              <Controller
                name="dietPreferences.favouriteIngredients"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.ingredients_placeholder}
                  />
                )}
              />
              {errors?.dietPreferences?.favouriteIngredients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.favouriteIngredients.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.disliked_ingredients}
              </label>
              <Controller
                name="dietPreferences.dislikedIngredients"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.ingredients_placeholder}
                  />
                )}
              />
              {errors?.dietPreferences?.dislikedIngredients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.dislikedIngredients.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.preferred_cuisine}
              </label>
              <Controller
                name="dietPreferences.preferredCuisine"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.cuisine_placeholder}
                  />
                )}
              />
              {errors?.dietPreferences?.preferredCuisine && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.preferredCuisine.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.cooking_methods}
              </label>
              <Controller
                name="dietPreferences.cookingMethods"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.methods_placeholder}
                  />
                )}
              />
              {errors?.dietPreferences?.cookingMethods && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.cookingMethods.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.meal_types}
              </label>
              <Controller
                name="dietPreferences.mealTypes"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.meal_types_placeholder}
                  />
                )}
              />
              {errors?.dietPreferences?.mealTypes && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietPreferences.mealTypes.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleProfileSection>

        <CollapsibleProfileSection
          title={t.goals.cooking_context}
          icon={<ChefHat className="w-5 h-5" />}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.skill_level}
              </label>
              <select
                {...register('cookingContext.skillLevel')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              >
                <option value="Beginner">{t.goals.beginner}</option>
                <option value="Intermediate">{t.goals.intermediate}</option>
                <option value="Advanced">{t.goals.advanced}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                {t.goals.time_available_minutes}
              </label>
              <input
                {...register('cookingContext.timeAvailable')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.cookingContext?.timeAvailable && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cookingContext.timeAvailable.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                {t.goals.budget}
              </label>
              <input
                type="text"
                {...register('cookingContext.budget')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.cookingContext?.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.cookingContext.budget.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                {t.goals.location}
              </label>
              <input
                type="text"
                {...register('cookingContext.location')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                placeholder={t.goals.location_placeholder}
              />
              {errors?.cookingContext?.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cookingContext.location.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Sun className="w-4 h-4 inline mr-2" />
                {t.goals.season}
              </label>
              <select
                {...register('cookingContext.season')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              >
                <option value="Summer">{t.goals.summer}</option>
                <option value="Winter">{t.goals.winter}</option>
                <option value="Spring">{t.goals.spring}</option>
                <option value="Autumn">{t.goals.Autumn}</option>
                <option value="Rainy">{t.goals.Rainy}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.available_ingredients}
              </label>
              <Controller
                name="cookingContext.availableIngredients"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.ingredients_placeholder}
                  />
                )}
              />
              {errors?.cookingContext?.availableIngredients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cookingContext?.availableIngredients.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.appliances}
              </label>
              <Controller
                name="cookingContext.appliances"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.appliances_placeholder}
                  />
                )}
              />
              {errors?.cookingContext?.appliances && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cookingContext?.appliances.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleProfileSection>

        <CollapsibleProfileSection
          title={t.goals.health_conditions}
          icon={<Heart className="w-5 h-5" />}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.conditions_comma}
              </label>
              <Controller
                name="healthProfile.healthCondition.conditions"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.conditions_placeholder}
                  />
                )}
              />
              {errors?.healthProfile?.healthCondition?.conditions && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.healthCondition.conditions.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.doctor_advice}
              </label>
              <textarea
                {...register('healthProfile.healthCondition.doctorsAdvice')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50 min-h-[80px]"
                placeholder={t.goals.doctor_advice_placeholder}
              />
              {errors?.healthProfile?.healthCondition?.doctorsAdvice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.healthCondition.doctorsAdvice.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.restricted_nutrients}
              </label>
              <Controller
                name="healthProfile.healthCondition.restrictedNutrients"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.restricted_placeholder}
                  />
                )}
              />
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ar'
                  ? 'اكتب القيم مفصولة بفاصلة (،)'
                  : 'Separate multiple items with commas.'}
              </p>
              {errors?.healthProfile?.healthCondition?.restrictedNutrients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.healthCondition.restrictedNutrients.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.recommended_nutrients}
              </label>
              <Controller
                name="healthProfile.healthCondition.recommendedNutrients"
                control={control}
                render={({ field }) => (
                  <input
                    value={field.value?.join(', ') || ''}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                    placeholder={t.goals.recommended_placeholder}
                  />
                )}
              />
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ar'
                  ? 'اكتب القيم مفصولة بفاصلة (،)'
                  : 'Separate multiple items with commas.'}
              </p>
              {errors?.healthProfile?.healthCondition?.recommendedNutrients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.healthCondition.recommendedNutrients.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleProfileSection>

        <CollapsibleProfileSection
          title={t.goals.lab_metrics_cholesterol}
          icon={<Droplet className="w-5 h-5" />}
          iconBgColor="bg-pink-100"
          iconColor="text-pink-600"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-700">{t.goals.cholesterol_panel}</h4>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.total_cholesterol}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.cholesterolAndBloodSugar.totalCholesterol', {
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                />
                {errors?.healthProfile?.cholesterolAndBloodSugar?.totalCholesterol && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.cholesterolAndBloodSugar.totalCholesterol.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.ldl_bad_cholesterol}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.cholesterolAndBloodSugar.ldl', {
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                />
                {errors?.healthProfile?.cholesterolAndBloodSugar?.ldl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.cholesterolAndBloodSugar.ldl.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.hdl_good_cholesterol}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.cholesterolAndBloodSugar.hdl', {
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                />
                {errors?.healthProfile?.cholesterolAndBloodSugar?.hdl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.cholesterolAndBloodSugar.hdl.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.triglycerides}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.cholesterolAndBloodSugar.triglycerides', {
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                />
                {errors?.healthProfile?.cholesterolAndBloodSugar?.triglycerides && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.cholesterolAndBloodSugar.triglycerides.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-700">{t.goals.blood_sugar_panel}</h4>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.glucose}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.cholesterolAndBloodSugar.glucose', {
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                />
                {errors?.healthProfile?.cholesterolAndBloodSugar?.glucose && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.cholesterolAndBloodSugar.glucose.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.insulin}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.cholesterolAndBloodSugar.insulin', {
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                  step="0.1"
                />
                {errors?.healthProfile?.cholesterolAndBloodSugar?.insulin && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.cholesterolAndBloodSugar.insulin.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.goals.homa_ir}
                </label>
                <input
                  type="number"
                  {...register('healthProfile.cholesterolAndBloodSugar.homaIr', {
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                  step="0.1"
                />
                <p className="text-xs text-slate-500 mt-1">{t.goals.homa_ir_note}</p>
                {errors?.healthProfile?.cholesterolAndBloodSugar?.homaIr && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthProfile.cholesterolAndBloodSugar.homaIr.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CollapsibleProfileSection>

        <CollapsibleProfileSection
          title={t.goals.liver_function}
          icon={<Heart className="w-5 h-5" />}
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.ast}
              </label>
              <input
                type="number"
                {...register('healthProfile.liverFunction.ast', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.healthProfile?.liverFunction?.ast && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.liverFunction.ast.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.alt}
              </label>
              <input
                type="number"
                {...register('healthProfile.liverFunction.alt', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.healthProfile?.liverFunction?.alt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.liverFunction.alt.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.alp}
              </label>
              <input
                type="number"
                {...register('healthProfile.liverFunction.alp', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.healthProfile?.liverFunction?.alp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.liverFunction.alp.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.ggt}
              </label>
              <input
                type="number"
                {...register('healthProfile.liverFunction.ggt', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.healthProfile?.liverFunction?.ggt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.liverFunction.ggt.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleProfileSection>

        <CollapsibleProfileSection
          title={t.goals.kidney_function}
          icon={<Droplet className="w-5 h-5" />}
          iconBgColor="bg-cyan-100"
          iconColor="text-cyan-600"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.urea}
              </label>
              <input
                type="number"
                {...register('healthProfile.kidneyFunction.urea', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.healthProfile?.kidneyFunction?.urea && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.kidneyFunction.urea.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.creatinine}
              </label>
              <input
                type="number"
                {...register('healthProfile.kidneyFunction.creatinine', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                step="0.01"
              />
              {errors?.healthProfile?.kidneyFunction?.creatinine && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.kidneyFunction.creatinine.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.egfr}
              </label>
              <input
                type="number"
                {...register('healthProfile.kidneyFunction.eGFR', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              <p className="text-xs text-slate-500 mt-1">{t.goals.egfr_note}</p>
              {errors?.healthProfile?.kidneyFunction?.eGFR && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.kidneyFunction.eGFR.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.uric_acid}
              </label>
              <input
                type="number"
                {...register('healthProfile.kidneyFunction.uricAcid', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                step="0.1"
              />
              {errors?.healthProfile?.kidneyFunction?.uricAcid && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.kidneyFunction.uricAcid.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleProfileSection>

        <CollapsibleProfileSection
          title={t.goals.vitamins_minerals}
          icon={<Activity className="w-5 h-5" />}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.vitamin_d}
              </label>
              <input
                type="number"
                {...register('healthProfile.vitaminsAndMinerals.vitaminD', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              <p className="text-xs text-slate-500 mt-1">{t.goals.vitamin_d_note}</p>
              {errors?.healthProfile?.vitaminsAndMinerals?.vitaminD && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.vitaminsAndMinerals.vitaminD.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.vitamin_b12}
              </label>
              <input
                type="number"
                {...register('healthProfile.vitaminsAndMinerals.vitaminB12', {
                  valueAsNumber: true,
                })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.healthProfile?.vitaminsAndMinerals?.vitaminB12 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.vitaminsAndMinerals.vitaminB12.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.iron}
              </label>
              <input
                type="number"
                {...register('healthProfile.vitaminsAndMinerals.iron', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.healthProfile?.vitaminsAndMinerals?.iron && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.vitaminsAndMinerals.iron.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.ferritin}
              </label>
              <input
                type="number"
                {...register('healthProfile.vitaminsAndMinerals.ferritin', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
              />
              {errors?.healthProfile?.vitaminsAndMinerals?.ferritin && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.vitaminsAndMinerals.ferritin.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleProfileSection>

        <CollapsibleProfileSection
          title={t.goals.thyroid_function}
          icon={<Brain className="w-5 h-5" />}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.t3}
              </label>
              <input
                type="number"
                {...register('healthProfile.thyroidFunction.t3', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                step="0.01"
              />
              {errors?.healthProfile?.thyroidFunction?.t3 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.thyroidFunction.t3.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.t4}
              </label>
              <input
                type="number"
                {...register('healthProfile.thyroidFunction.t4', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                step="0.1"
              />
              {errors?.healthProfile?.thyroidFunction?.t4 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.thyroidFunction.t4.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.tsh}
              </label>
              <input
                type="number"
                {...register('healthProfile.thyroidFunction.tsh', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                step="0.01"
              />
              <p className="text-xs text-slate-500 mt-1">{t.goals.tsh_note}</p>
              {errors?.healthProfile?.thyroidFunction?.tsh && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.thyroidFunction.tsh.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.goals.crp}
              </label>
              <input
                type="number"
                {...register('healthProfile.thyroidFunction.crp', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                step="0.1"
              />
              <p className="text-xs text-slate-500 mt-1">{t.goals.crp_note}</p>
              {errors?.healthProfile?.thyroidFunction?.crp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.healthProfile.thyroidFunction.crp.message}
                </p>
              )}
            </div>
          </div>
        </CollapsibleProfileSection>
      </div>
    </div>
  );
};
