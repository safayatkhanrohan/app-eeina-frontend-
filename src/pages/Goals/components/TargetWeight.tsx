import { Button } from '@/components/ui/button';
import { GoalSetupProps, UserInfo } from '../types/type';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

interface TargetWeightProps extends GoalSetupProps {
  back?: () => void;
  next: () => void;
}

const TargetWeight = ({ next, back }: TargetWeightProps) => {
  const { t } = useLanguage();
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<UserInfo>();

  const userInfo = watch();

  const currentWeight = userInfo.currentWeight || 0;
  const targetWeight = userInfo.targetWeight || 0;
  const isGaining = userInfo.type === 'Gain Weight';

  const weightDifference = useMemo(() => {
    if (!currentWeight || !targetWeight) return 0;
    return Math.abs(targetWeight - currentWeight);
  }, [currentWeight, targetWeight]);

  const logicError = useMemo(() => {
    if (!targetWeight || targetWeight <= 0) return undefined;

    // If schema error exists, let that take precedence (it will be shown via errors.targetWeight)
    // But here we only handle logical errors that schema misses

    if (isGaining && targetWeight <= currentWeight) {
      return 'Since you want to gain weight, your target should be higher than your current weight.';
    } else if (!isGaining && targetWeight >= currentWeight) {
      return 'To reach your weight loss goal, please set a target that is lower than your current weight.';
    }
    return undefined;
  }, [targetWeight, currentWeight, isGaining]);

  const isNextDisabled = !!logicError;

  const handleNext = async () => {
    const isValidStep = await trigger('targetWeight');
    if (isValidStep && !logicError) {
      next();
    }
  };

  // Determine valid target for visual feedback (green/red colors in visualization)
  const isValidTargetVisual = !logicError && !errors.targetWeight && targetWeight > 0;

  return (
    <div className="flex justify-between items-stretch gap-5 md:gap-7 xl2:gap-16 py-16 md:h-[928px]">
      <div className="items-center rounded-[32px] md:flex-1 flex flex-col h-full bg-[#FBFCFC] md:shadow justify-around px-0 md:px-5 xl2:px-10">
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <h2 className="text-center md:text-start font-semibold text-[24px] xl:text-[36px]">
            {t.goalSetup.target_weight_title}
            <span className="text-primaryColor"> {t.goalSetup.target_weight_highlight}</span>
          </h2>

          {/* Current Weight Display */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.goalSetup.target_weight_current}</span>
              <span className="font-semibold text-lg">
                {currentWeight} {t.goalSetup.target_weight_kg}
              </span>
            </div>
          </div>

          {/* Target Weight Input */}
          <div className="relative w-full">
            <input
              type="number"
              {...register('targetWeight', { valueAsNumber: true })}
              id="target_weight_input"
              placeholder=" "
              className="block h-14 w-full px-3 pb-2.5 pt-4 text-lg text-gray-800 bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-[#6AB240] focus:border-[#6AB240] peer"
            />
            <label
              htmlFor="target_weight_input"
              className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2 top-1/2
               z-10 origin-[0] bg-white px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
                peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4
                peer-focus:text-[#6AB240] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 start-3"
            >
              {isGaining
                ? t.goalSetup.target_weight_input_gain
                : t.goalSetup.target_weight_input_lose}{' '}
              ({t.goalSetup.target_weight_kg})
            </label>
            {(errors.targetWeight || logicError) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.targetWeight?.message || logicError}
              </p>
            )}
          </div>

          {/* Weight Difference Visualization */}
          {targetWeight > 0 && !errors.targetWeight && !logicError && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex flex-col gap-4">
                {/* Visual comparison */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-bold text-gray-700">{currentWeight}</div>
                    <div className="text-sm text-gray-500">{t.goalSetup.target_weight_current}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`text-2xl ${isGaining ? 'text-green-500' : 'text-orange-500'}`}>
                      {isGaining ? '→' : '→'}
                    </div>
                    <div
                      className={`text-sm font-medium ${isValidTargetVisual ? (isGaining ? 'text-green-600' : 'text-orange-600') : 'text-red-500'}`}
                    >
                      {isValidTargetVisual
                        ? `${isGaining ? '+' : '-'}${weightDifference.toFixed(1)} ${t.goalSetup.target_weight_kg}`
                        : '!'}
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div
                      className={`text-3xl font-bold ${isValidTargetVisual ? 'text-[#6AB240]' : 'text-red-500'}`}
                    >
                      {targetWeight || '?'}
                    </div>
                    <div className="text-sm text-gray-500">{t.goalSetup.target_weight_target}</div>
                  </div>
                </div>

                {/* Progress bar visualization */}
                {isValidTargetVisual && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{t.goalSetup.target_weight_difference}</span>
                      <span>
                        {weightDifference.toFixed(1)} {t.goalSetup.target_weight_kg}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isGaining ? 'bg-green-500' : 'bg-orange-500'}`}
                        style={{ width: `${Math.min((weightDifference / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 w-full md:w-[90%] mx-auto mt-10 md:mt-0">
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
            onClick={handleNext}
            disabled={isNextDisabled}
            className="py-[1.4rem] flex-1 hover:bg-primaryColor bg-[#6AB240] text-white font-medium text-[16px] md:text-[20px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.goalSetup.next_btn}
          </Button>
        </div>
      </div>
      <div className="flex-1 h-full hidden md:flex">
        <img
          src="/goalinfo.svg"
          alt="Target Weight"
          className="rounded-[32px] h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default TargetWeight;
