import FloatingInput from '@/components/ui/FloatingInput';
import FloatingSelect from '@/components/ui/FloatingSelect';
import FloatingTextarea from '@/components/ui/FloatingTextarea';
import { Controller } from 'react-hook-form';

export const renderBasicSection = ({ register, errors, t }: any) => (
  <>
    <FloatingInput
      label={t.goals.height_cm}
      step="0.1"
      type="number"
      register={register('healthProfile.basic.height', { valueAsNumber: true })}
      error={errors.healthProfile?.basic?.height?.message}
    />
    <FloatingInput
      label={t.goals.weight_kg}
      step="0.1"
      type="number"
      register={register('healthProfile.basic.weight', { valueAsNumber: true })}
      error={errors.healthProfile?.basic?.weight?.message}
    />
  </>
);
export const renderBodySection = ({ register, errors, t }: any) => (
  <>
    <FloatingInput
      label={t.goals.body_fat_percent}
      step="0.1"
      type="number"
      register={register('healthProfile.bodyComposition.bodyFatPercentage', {
        valueAsNumber: true,
      })}
      error={errors?.healthProfile?.bodyComposition?.bodyFatPercentage?.message}
    />
    <FloatingInput
      label={t.goals.muscle_mass_kg}
      step="0.1"
      type="number"
      register={register('healthProfile.bodyComposition.muscleMass', {
        valueAsNumber: true,
      })}
      error={errors.healthProfile?.bodyComposition?.muscleMass?.message}
    />
    <FloatingInput
      label={t.goals.bmi_BodyMassIndex}
      step="0.1"
      type="number"
      register={register('healthProfile.bodyComposition.bmi', { valueAsNumber: true })}
      error={errors.healthProfile?.bodyComposition?.bmi?.message}
    />
  </>
);
export const renderDietSection = ({ register, errors, t, control, language }: any) => (
  <div className="grid grid-cols-12 gap-3  gap-y-5">
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.diet_type}
        register={register('dietPreferences.dietType')}
        error={errors.dietPreferences?.dietType?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.religiousRestriction"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.religious_restriction}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={language == 'ar' ? 'حلال' : 'e.g., halal,'}
            error={errors.dietPreferences?.religiousRestriction?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.allergies"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.allergies_comma}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.allergies_placeholder}
            error={errors?.dietPreferences?.allergies?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.intolerances"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.intolerances_comma}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.intolerances_placeholder}
            error={errors.dietPreferences?.intolerances?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.preferredTaste"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.preferred_taste_comma}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.taste_placeholder}
            error={errors.dietPreferences?.preferredTaste?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingSelect
        label={t.goals.portion_size}
        register={register('dietPreferences.portionSize')}
        options={[
          { value: 'Small', label: t.goals.small },
          { value: 'Medium', label: t.goals.medium },
          { value: 'Large', label: t.goals.large },
        ]}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.favouriteIngredients"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.favorite_ingredients}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.ingredients_placeholder}
            error={errors.dietPreferences?.favouriteIngredients?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.dislikedIngredients"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.disliked_ingredients}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.ingredients_placeholder}
            error={errors.dietPreferences?.dislikedIngredients?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.preferredCuisine"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.preferred_cuisine}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.cuisine_placeholder}
            error={errors.dietPreferences?.preferredCuisine?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.cookingMethods"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.cooking_methods}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.methods_placeholder}
            error={errors.dietPreferences?.cookingMethods?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="dietPreferences.mealTypes"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.meal_types}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.meal_types_placeholder}
            error={errors.dietPreferences?.mealTypes?.message}
          />
        )}
      />
    </div>
  </div>
);
export const renderCookingSection = ({ register, errors, t, control }: any) => (
  <div className="grid grid-cols-12 gap-3 gap-y-5">
    <div className="col-span-12 lg:col-span-6">
      <FloatingSelect
        label={t.goals.skill_level}
        register={register('cookingContext.skillLevel')}
        options={[
          { value: 'Beginner', label: t.goals.beginner },
          { value: 'Intermediate', label: t.goals.intermediate },
          { value: 'Advanced', label: t.goals.advanced },
        ]}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.time_available_minutes}
        register={register('cookingContext.timeAvailable')}
        error={errors.cookingContext?.timeAvailable?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.budget}
        register={register('cookingContext.budget')}
        error={errors.cookingContext?.budget?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.location}
        register={register('cookingContext.location')}
        error={errors.cookingContext?.location?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingSelect
        label={t.goals.season}
        register={register('cookingContext.season')}
        options={[
          { value: 'Summer', label: t.goals.summer },
          { value: 'Winter', label: t.goals.winter },
          { value: 'Spring', label: t.goals.spring },
          { value: 'Autumn', label: t.goals.Autumn },
          { value: 'Rainy', label: t.goals.Rainy },
        ]}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Controller
        name="cookingContext.availableIngredients"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.available_ingredients}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.ingredients_placeholder}
            error={errors.cookingContext?.availableIngredients?.message}
          />
        )}
      />
    </div>
    <div className="col-span-12">
      <Controller
        name="cookingContext.appliances"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t.goals.appliances}
            value={field.value?.join(', ') || ''}
            onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
            placeholder={t.goals.appliances_placeholder}
            error={errors.cookingContext?.appliances?.message}
          />
        )}
      />
    </div>
  </div>
);
export const renderHealthSection = ({ register, errors, t, control }: any) => (
  <>
    <Controller
      name="healthProfile.healthCondition.conditions"
      control={control}
      render={({ field }) => (
        <FloatingInput
          label={t.goals.conditions_comma}
          value={field.value?.join(', ') || ''}
          onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
          placeholder={t.goals.conditions_placeholder}
          error={errors.healthProfile?.healthCondition?.conditions?.message}
        />
      )}
    />
    <FloatingTextarea
      label={t.goals.doctor_advice}
      register={register('healthProfile.healthCondition.doctorsAdvice')}
      error={errors?.healthProfile?.healthCondition?.doctorsAdvice}
      placeholder={t.goals.doctor_advice_placeholder}
    />
    <Controller
      name="healthProfile.healthCondition.restrictedNutrients"
      control={control}
      render={({ field }) => (
        <FloatingInput
          label={t.goals.restricted_nutrients}
          value={field.value?.join(', ') || ''}
          onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
          placeholder={t.goals.restricted_placeholder}
          error={errors.healthProfile?.healthCondition?.restrictedNutrients?.message}
        />
      )}
    />
    <Controller
      name="healthProfile.healthCondition.recommendedNutrients"
      control={control}
      render={({ field }) => (
        <FloatingInput
          label={t.goals.recommended_nutrients}
          value={field.value?.join(', ') || ''}
          onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
          placeholder={t.goals.recommended_placeholder}
          error={errors.healthProfile?.healthCondition?.recommendedNutrients?.message}
        />
      )}
    />
  </>
);
export const renderLabSection = ({ register, errors, t }: any) => (
  <div className="grid grid-cols-12 gap-3 gap-y-5">
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.total_cholesterol}
        type="number"
        register={register('healthProfile.cholesterolAndBloodSugar.totalCholesterol', {
          valueAsNumber: true,
        })}
        error={errors.healthProfile?.cholesterolAndBloodSugar?.totalCholesterol?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.ldl_bad_cholesterol}
        type="number"
        register={register('healthProfile.cholesterolAndBloodSugar.ldl', {
          valueAsNumber: true,
        })}
        error={errors.healthProfile?.cholesterolAndBloodSugar?.ldl?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.hdl_good_cholesterol}
        type="number"
        register={register('healthProfile.cholesterolAndBloodSugar.hdl', {
          valueAsNumber: true,
        })}
        error={errors.healthProfile?.cholesterolAndBloodSugar?.hdl?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.triglycerides}
        type="number"
        register={register('healthProfile.cholesterolAndBloodSugar.triglycerides', {
          valueAsNumber: true,
        })}
        error={errors.healthProfile?.cholesterolAndBloodSugar?.triglycerides?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.glucose}
        type="number"
        register={register('healthProfile.cholesterolAndBloodSugar.glucose', {
          valueAsNumber: true,
        })}
        error={errors.healthProfile?.cholesterolAndBloodSugar?.glucose?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.insulin}
        type="number"
        register={register('healthProfile.cholesterolAndBloodSugar.insulin', {
          valueAsNumber: true,
        })}
        step="0.1"
        error={errors.healthProfile?.cholesterolAndBloodSugar?.insulin?.message}
      />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <FloatingInput
        label={t.goals.homa_ir}
        type="number"
        register={register('healthProfile.cholesterolAndBloodSugar.homaIr', {
          valueAsNumber: true,
        })}
        step="0.1"
        error={errors.healthProfile?.cholesterolAndBloodSugar?.homaIr?.message}
      />
    </div>
  </div>
);
export const renderLiverSection = ({ register, errors, t }: any) => (
  <>
    <FloatingInput
      label={t.goals.ast}
      type="number"
      register={register('healthProfile.liverFunction.ast', { valueAsNumber: true })}
      error={errors.healthProfile?.liverFunction?.ast?.message}
    />
    <FloatingInput
      label={t.goals.alt}
      type="number"
      register={register('healthProfile.liverFunction.alt', { valueAsNumber: true })}
      error={errors.healthProfile?.liverFunction?.alt?.message}
    />
    <FloatingInput
      label={t.goals.alp}
      type="number"
      register={register('healthProfile.liverFunction.alp', { valueAsNumber: true })}
      error={errors.healthProfile?.liverFunction?.alp?.message}
    />
    <FloatingInput
      label={t.goals.ggt}
      type="number"
      register={register('healthProfile.liverFunction.ggt', { valueAsNumber: true })}
      error={errors.healthProfile?.liverFunction?.ggt?.message}
    />
  </>
);
export const renderKidneySection = ({ register, errors, t }: any) => (
  <>
    <FloatingInput
      label={t.goals.urea}
      type="number"
      register={register('healthProfile.kidneyFunction.urea', { valueAsNumber: true })}
      error={errors.healthProfile?.kidneyFunction?.urea?.message}
    />
    <FloatingInput
      label={t.goals.creatinine}
      type="number"
      register={register('healthProfile.kidneyFunction.creatinine', {
        valueAsNumber: true,
      })}
      error={errors.healthProfile?.kidneyFunction?.creatinine?.message}
    />
    <FloatingInput
      label={t.goals.egfr}
      type="number"
      register={register('healthProfile.kidneyFunction.eGFR', {
        valueAsNumber: true,
      })}
      error={errors.healthProfile?.kidneyFunction?.eGFR?.message}
    />
    <FloatingInput
      label={t.goals.uric_acid}
      type="number"
      register={register('healthProfile.kidneyFunction.uricAcid', {
        valueAsNumber: true,
      })}
      step="0.1"
      error={errors.healthProfile?.kidneyFunction?.uricAcid?.message}
    />
  </>
);
export const renderVitaminsSection = ({ register, errors, t }: any) => (
  <>
    <FloatingInput
      label={t.goals.vitamin_d}
      type="number"
      register={register('healthProfile.vitaminsAndMinerals.vitaminD', {
        valueAsNumber: true,
      })}
      error={errors.healthProfile?.vitaminsAndMinerals?.vitaminD?.message}
    />
    <FloatingInput
      label={t.goals.vitamin_b12}
      type="number"
      register={register('healthProfile.vitaminsAndMinerals.vitaminB12', {
        valueAsNumber: true,
      })}
      error={errors.healthProfile?.vitaminsAndMinerals?.vitaminB12?.message}
    />
    <FloatingInput
      label={t.goals.iron}
      type="number"
      register={register('healthProfile.vitaminsAndMinerals.iron', {
        valueAsNumber: true,
      })}
      error={errors.healthProfile?.vitaminsAndMinerals?.iron?.message}
    />
    <FloatingInput
      label={t.goals.ferritin}
      type="number"
      register={register('healthProfile.vitaminsAndMinerals.ferritin', {
        valueAsNumber: true,
      })}
      error={errors.healthProfile?.vitaminsAndMinerals?.ferritin?.message}
    />
  </>
);
export const renderThyroidSection = ({ register, errors, t }: any) => (
  <>
    <FloatingInput
      label={t.goals.t3}
      type="number"
      register={register('healthProfile.thyroidFunction.t3', {
        valueAsNumber: true,
      })}
      step="0.01"
      error={errors.healthProfile?.thyroidFunction?.t3?.message}
    />
    <FloatingInput
      label={t.goals.t4}
      type="number"
      register={register('healthProfile.thyroidFunction.t4', {
        valueAsNumber: true,
      })}
      step="0.01"
      error={errors.healthProfile?.thyroidFunction?.t4?.message}
    />
    <FloatingInput
      label={t.goals.tsh}
      type="number"
      register={register('healthProfile.thyroidFunction.tsh', {
        valueAsNumber: true,
      })}
      step="0.01"
      error={errors.healthProfile?.thyroidFunction?.tsh?.message}
    />
    <FloatingInput
      label={t.goals.crp}
      type="number"
      register={register('healthProfile.thyroidFunction.crp', {
        valueAsNumber: true,
      })}
      step="0.01"
      error={errors.healthProfile?.thyroidFunction?.crp?.message}
    />
  </>
);
export const healthProfileSectionRenderers = {
  basic: renderBasicSection,
  diet: renderDietSection,
  body: renderBodySection,
  cooking: renderCookingSection,
  health: renderHealthSection,
  lab: renderLabSection,
  liver: renderLiverSection,
  kidney: renderKidneySection,
  vitamins: renderVitaminsSection,
  thyroid: renderThyroidSection,
};
