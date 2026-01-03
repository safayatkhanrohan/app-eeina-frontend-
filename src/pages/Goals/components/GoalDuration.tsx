import { Button } from '@/components/ui/button';
import { GoalSetupProps, UserInfo } from '../types/type';
import { useMemo, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCreateGoalMutation, useUpdateGoalMutation } from '@/redux/Features/Goals/GoalsApi';
import { useFormContext } from 'react-hook-form';

interface GoalDurationProps extends GoalSetupProps {
  isModification?: boolean;
  goalId?: string;
  next: () => void;
}

import LoadingScreen from './LoadingScreen';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { openPremiumModal } from '@/redux/Features/Global/globalSlice';

// Constants for calorie calculations
const CALORIES_PER_KG = 7700; // 1 kg of body weight ≈ 7700 kcal

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  super_active: 1.9,
};

const GoalDuration = ({ next, back, skip, isModification, goalId }: GoalDurationProps) => {
  const { t } = useLanguage();
  const {
    watch,
    setValue,
    register,
    trigger,
    formState: { errors },
  } = useFormContext<UserInfo>();
  const userInfo = watch();
  const premiumUser = useAppSelector((state) => state.auth.user?.accountType === 'premium');
  const dispatch = useAppDispatch();

  const [createGoal, { isLoading: isCreating }] = useCreateGoalMutation();
  const [updateGoal, { isLoading: isUpdating }] = useUpdateGoalMutation();
  const [isCustom, setIsCustom] = useState(false);

  const currentWeight = userInfo.currentWeight || 0;
  const targetWeight = userInfo.targetWeight || 0;
  const isWeightChangeGoal = userInfo.type === 'Gain Weight' || userInfo.type === 'Lose Weight';
  const isGaining = userInfo.type === 'Gain Weight';

  // Calculate weight difference
  const weightDifference = useMemo(() => {
    if (!currentWeight || !targetWeight) return 0;
    return Math.abs(targetWeight - currentWeight);
  }, [currentWeight, targetWeight]);

  // Calculate BMR using Mifflin-St Jeor Equation
  const bmr = useMemo(() => {
    const { currentWeight, height, age, gender } = userInfo;
    if (!currentWeight || !height || !age || !gender) return 0;

    const s = gender === 'female' ? -161 : 5;
    return 10 * currentWeight + 6.25 * height - 5 * age + s;
  }, [userInfo.currentWeight, userInfo.height, userInfo.age, userInfo.gender]);

  // Calculate TDEE
  const tdee = useMemo(() => {
    const { activityLevel } = userInfo;
    if (!bmr || !activityLevel) return 0;

    const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
    return bmr * multiplier;
  }, [bmr, userInfo.activityLevel]);

  // Calculate recommended duration based on safe limits (1/3 of TDEE)
  const recommendations = useMemo(() => {
    if (!weightDifference || !tdee) {
      // Fallback if data is missing
      return {
        rapid: { weeks: 4, ratePerWeek: 0, dailyCalories: 0 },
        medium: { weeks: 8, ratePerWeek: 0, dailyCalories: 0 },
        slow: { weeks: 12, ratePerWeek: 0, dailyCalories: 0 },
        recommended: 'medium' as const,
      };
    }

    const totalCaloriesRequired = weightDifference * CALORIES_PER_KG;
    const safeDailyLimit = tdee / 3; // Safe limit: reduce/increase 1/3 of daily calories

    // Define daily calorie changes for each pace
    // Rapid: 33% of TDEE (Safe Limit)
    // Medium: 20% of TDEE (Sustainable)
    // Slow: 10% of TDEE (Comfortable)
    const rapidDailyChange = safeDailyLimit;
    const mediumDailyChange = tdee * 0.2;
    const slowDailyChange = tdee * 0.1;

    // Calculate weeks needed
    let rapidWeeks = Math.max(1, Math.ceil(totalCaloriesRequired / (rapidDailyChange * 7)));
    let mediumWeeks = Math.max(1, Math.ceil(totalCaloriesRequired / (mediumDailyChange * 7)));
    let slowWeeks = Math.max(1, Math.ceil(totalCaloriesRequired / (slowDailyChange * 7)));

    // Ensure distinct options (Rapid < Medium < Slow)
    if (mediumWeeks <= rapidWeeks) mediumWeeks = rapidWeeks + 1;
    if (slowWeeks <= mediumWeeks) slowWeeks = mediumWeeks + 1;

    // Helper to calculate exact stats for the determined weeks
    const calculateStats = (weeks: number) => {
      const rate = weightDifference / weeks;
      const dailyCalories = Math.round((rate * CALORIES_PER_KG) / 7);
      return { weeks, ratePerWeek: rate, dailyCalories };
    };

    return {
      rapid: calculateStats(rapidWeeks),
      medium: calculateStats(mediumWeeks),
      slow: calculateStats(slowWeeks),
      recommended: 'medium' as const,
    };
  }, [weightDifference, tdee]);

  // Set recommended duration on mount
  useEffect(() => {
    if (!userInfo.durationWeeks) {
      setValue('durationWeeks', recommendations[recommendations.recommended].weeks);
    }
  }, [recommendations, userInfo.durationWeeks, setValue]);

  const options = useMemo(() => {
    if (isWeightChangeGoal && weightDifference > 0) {
      return [
        {
          label: `${t.goalSetup.option_rapid} (${recommendations.rapid.weeks} ${t.goalSetup.duration_weeks})`,
          value: 'rapid',
          weeks: recommendations.rapid.weeks,
          details: recommendations.rapid,
        },
        {
          label: `${t.goalSetup.option_medium} (${recommendations.medium.weeks} ${t.goalSetup.duration_weeks})`,
          value: 'medium',
          weeks: recommendations.medium.weeks,
          details: recommendations.medium,
        },
        {
          label: `${t.goalSetup.option_slow} (${recommendations.slow.weeks} ${t.goalSetup.duration_weeks})`,
          value: 'slow',
          weeks: recommendations.slow.weeks,
          details: recommendations.slow,
        },
      ];
    }
    // Default options for maintain weight or muscle building
    return [
      {
        label: `${t.goalSetup.option_rapid} (4-6 ${t.goalSetup.duration_weeks})`,
        value: 'rapid',
        weeks: 4,
        details: null,
      },
      {
        label: `${t.goalSetup.option_medium} (6-10 ${t.goalSetup.duration_weeks})`,
        value: 'medium',
        weeks: 8,
        details: null,
      },
      {
        label: `${t.goalSetup.option_slow} (10-12 ${t.goalSetup.duration_weeks})`,
        value: 'slow',
        weeks: 12,
        details: null,
      },
    ];
  }, [isWeightChangeGoal, weightDifference, recommendations, t]);

  const selectedOption = useMemo(() => {
    if (isCustom) return 'custom';
    const weeks = userInfo.durationWeeks;
    if (!weeks) return recommendations.recommended;
    const found = options.find((o) => o.weeks === weeks);
    return found?.value || 'custom';
  }, [userInfo.durationWeeks, options, recommendations.recommended, isCustom]);

  const handleSelect = (_value: string, weeks: number) => {
    setIsCustom(false);
    setValue('durationWeeks', weeks, { shouldValidate: true });
  };

  const handleCustomSelect = () => {
    setIsCustom(true);
    // durationWeeks already in form state, no need to set
  };

  const handleCreateGoal = async () => {

    console.log('Creating/Updating goal with info:', { ...userInfo, type: userInfo.type });
    const isValid = await trigger();
    if (!isValid) return;

    if (!premiumUser) {
      dispatch(openPremiumModal());
      return;
    }

    console.log('Creating/Updating goal with info:', { ...userInfo, type: userInfo.type });
    try {
      let response;
      if (isModification && goalId) {
        response = await updateGoal({ id: goalId, ...userInfo, type: userInfo.type }).unwrap();
      } else {
        response = await createGoal({ ...userInfo, type: userInfo.type }).unwrap();
      }

      // Store the goal response in userInfo
      setValue('goalResponse', response.data.goal);
      setValue('generatedPlanId', response.data.generatedPlanId);
      next();
    } catch (error) {
      console.log('Goal creation/update failed:', error);
    }
  };

  // Calculate details for custom duration
  const customDetails = useMemo(() => {
    const weeks = Number(userInfo.durationWeeks);
    if (!weeks || weeks <= 0 || !weightDifference) return null;
    const ratePerWeek = weightDifference / weeks;
    const dailyCalories = Math.round((ratePerWeek * CALORIES_PER_KG) / 7);

    // Check safety based on TDEE limit (1/3 rule)
    const safeDailyLimit = tdee ? tdee / 3 : 1000; // Fallback to 1000 if no TDEE
    const isUnsafe = dailyCalories > safeDailyLimit;

    return { weeks, ratePerWeek, dailyCalories, isUnsafe };
  }, [userInfo.durationWeeks, weightDifference, tdee]);

  const currentDetails = isCustom
    ? customDetails
    : options.find((o) => o.value === selectedOption)?.details;

  if (isCreating || isUpdating) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex justify-between items-stretch gap-5 md:gap-7 xl2:gap-16 py-16">
      <div className="py-10 items-center rounded-[32px] md:flex-1 flex flex-col bg-[#FBFCFC] md:shadow justify-around px-0 md:px-5 xl2:px-10">
        <div className="flex flex-col gap-6 text-center md:text-start w-full max-w-lg">
          <h2 className="font-semibold text-[14px] xl:text-[36px]">
            {t.goalSetup.duration_main_title}
            <span className="text-primaryColor"> {t.goalSetup.duration_main_highlight}</span>
          </h2>

          {/* Recommendation Box */}
          {isWeightChangeGoal && weightDifference > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#6AB240] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {t.goalSetup.duration_recommended_badge}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Based on your daily energy needs (TDEE: <strong>{Math.round(tdee)} kcal</strong>),
                we recommend a sustainable{' '}
                {isGaining
                  ? t.goalSetup.duration_calories_surplus
                  : t.goalSetup.duration_calories_deficit}{' '}
                of{' '}
                <strong>
                  {recommendations[recommendations.recommended].dailyCalories} {t.goalSetup.kcal}
                </strong>{' '}
                to reach your goal in{' '}
                <strong>
                  {recommendations[recommendations.recommended].weeks} {t.goalSetup.duration_weeks}
                </strong>
                .
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="bg-white px-3 py-1.5 rounded-lg border">
                  <span className="text-gray-500">{t.goalSetup.duration_total_change}:</span>{' '}
                  <span className="font-semibold">
                    {weightDifference.toFixed(1)} {t.goalSetup.target_weight_kg}
                  </span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg border">
                  <span className="text-gray-500">
                    {isGaining
                      ? t.goalSetup.duration_calories_surplus
                      : t.goalSetup.duration_calories_deficit}
                    :
                  </span>{' '}
                  <span className="font-semibold">
                    {recommendations[recommendations.recommended].dailyCalories} {t.goalSetup.kcal}
                  </span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg border">
                  <span className="text-gray-500">{t.goalSetup.duration_safe_rate}:</span>{' '}
                  <span className="font-semibold">
                    {recommendations.slow.ratePerWeek.toFixed(2)} -{' '}
                    {recommendations.rapid.ratePerWeek.toFixed(2)} kg/
                    {t.goalSetup.duration_per_week}
                  </span>
                </div>
              </div>
            </div>
          )}

          <p className="text-[12px] xl:text-[16px] font-medium text-[#000000] opacity-[60%]">
            {t.goalSetup.duration_description}
          </p>

          <div className="flex flex-col gap-4">
            {options.map((option) => {
              const isSelected = selectedOption === option?.value && !isCustom;
              const isRecommended = option.value === recommendations.recommended;

              return (
                <div key={option.value} className="relative">
                  {isRecommended && isWeightChangeGoal && weightDifference > 0 && (
                    <div className="absolute -top-2 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow z-10">
                      ★ {t.goalSetup.duration_recommended_badge}
                    </div>
                  )}
                  <Button
                    onClick={() => handleSelect(option.value, option.weeks)}
                    className={`py-[1.4rem] w-full md:w-[90%] mx-auto font-medium text-16 md:text-[20px]
                      ${isSelected ? 'bg-[#6AB240] text-white' : 'bg-white text-[#6AB240] border border-[#DCDBDD]'}
                      hover:bg-[#6AB240] hover:text-white
                    `}
                  >
                    {option.label}
                  </Button>
                </div>
              );
            })}

            {/* Custom Duration Option */}
            <div className="relative">
              <Button
                onClick={handleCustomSelect}
                className={`py-[1.4rem] w-full md:w-[90%] mx-auto font-medium text-16 md:text-[20px]
                  ${isCustom ? 'bg-[#6AB240] text-white' : 'bg-white text-[#6AB240] border border-[#DCDBDD]'}
                  hover:bg-[#6AB240] hover:text-white
                `}
              >
                {t.goalSetup.duration_custom}
              </Button>
            </div>

            {/* Custom Duration Input */}
            {isCustom && (
              <div className="w-full md:w-[90%] mx-auto">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      {...register('durationWeeks', { valueAsNumber: true })}
                      placeholder={t.goalSetup.duration_custom_input}
                      className={`flex-1 h-12 px-4 text-lg text-gray-800 bg-white rounded-xl border ${errors.durationWeeks ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#6AB240] focus:border-[#6AB240]`}
                    />
                    <span className="text-gray-600 font-medium">{t.goalSetup.duration_weeks}</span>
                  </div>
                </div>
                {customDetails?.isUnsafe && !errors.durationWeeks && (
                  <p className="text-orange-600 text-xs mt-2">
                    ⚠️ {t.goalSetup.duration_custom_warning}
                  </p>
                )}
              </div>
            )}
            {errors.durationWeeks && (
              <div className="w-full md:w-[90%] mx-auto">
                <p className="text-red-500 text-sm">{errors.durationWeeks.message}</p>
              </div>
            )}
          </div>

          {/* Details for selected option */}
          {currentDetails && isWeightChangeGoal && (
            <div className="bg-gray-50 rounded-xl p-4 mt-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block">
                    {isGaining
                      ? t.goalSetup.duration_calories_surplus
                      : t.goalSetup.duration_calories_deficit}
                  </span>
                  <span className="font-semibold text-lg text-[#6AB240]">
                    {currentDetails.dailyCalories} {t.goalSetup.kcal}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t.goalSetup.duration_safe_rate}</span>
                  <span className="font-semibold text-lg">1/3 of TDEE</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full md:w-[90%] mx-auto mt-10 md:mt-5">
          {back && (
            <Button
              onClick={back}
              variant="outline"
              className="py-[1.4rem] flex-1 border-gray-300 text-gray-600 font-medium text-[16px] md:text-[20px]"
            >
              {t.goalSetup.next_btn === 'Next' ? 'Back' : 'رجوع'}
            </Button>
          )}
          <Button
            disabled={isCreating || isUpdating}
            onClick={handleCreateGoal}
            className="py-[1.4rem] flex-1 hover:bg-primaryColor bg-[#6AB240] text-white font-medium text-[20px]"
          >
            {t.goalSetup.next_btn}
          </Button>
          <Button
            variant={'outline'}
            onClick={skip}
            type="button"
            className="py-[1.4rem] flex-1 mx-auto !text-[#6AB240] text-16 md:text-[20px] font-medium"
          >
            {t.goalSetup.skip}
          </Button>
        </div>
      </div>
      <div className="flex-1 hidden md:flex">
        <img
          src="/goalDuration.svg"
          alt="goalDuration"
          className="rounded-[32px] h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default GoalDuration;
