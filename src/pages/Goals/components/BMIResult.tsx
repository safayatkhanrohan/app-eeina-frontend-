import { Button } from '@/components/ui/button';
import { GoalSetupProps, UserInfo } from '../types/type';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface BMIResultProps extends GoalSetupProps {}

type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

interface BMICategoryInfo {
  category: BMICategory;
  label: string;
  description: string;
  range: string;
  color: string;
  bgColor: string;
}

const BMIResult = ({ next, back }: BMIResultProps) => {
  const { t } = useLanguage();
  const { watch, setValue } = useFormContext<UserInfo>();
  const userInfo = watch();

  const bmi = useMemo(() => {
    const weight = userInfo.currentWeight || 0;
    const heightCm = userInfo.height || 0;

    if (weight <= 0 || heightCm <= 0) return 0;

    // Convert height from cm to meters
    const heightM = heightCm / 100;
    // BMI formula: weight (kg) / height (m)²
    return weight / (heightM * heightM);
  }, [userInfo.currentWeight, userInfo.height]);
  // Store BMI in userInfo when calculated
  useEffect(() => {
    if (bmi > 0 && userInfo.bmi !== bmi) {
      setValue('bmi', bmi);
    }
  }, [bmi, userInfo.bmi, setValue]);

  const getBMICategory = (bmiValue: number): BMICategory => {
    if (bmiValue < 18.5) return 'underweight';
    if (bmiValue < 25) return 'normal';
    if (bmiValue < 30) return 'overweight';
    return 'obese';
  };

  const categories: BMICategoryInfo[] = [
    {
      category: 'underweight',
      label: t.goalSetup.bmi_underweight,
      description: t.goalSetup.bmi_underweight_desc,
      range: t.goalSetup.bmi_range_underweight,
      color: '#3B82F6',
      bgColor: '#DBEAFE',
    },
    {
      category: 'normal',
      label: t.goalSetup.bmi_normal,
      description: t.goalSetup.bmi_normal_desc,
      range: t.goalSetup.bmi_range_normal,
      color: '#22C55E',
      bgColor: '#DCFCE7',
    },
    {
      category: 'overweight',
      label: t.goalSetup.bmi_overweight,
      description: t.goalSetup.bmi_overweight_desc,
      range: t.goalSetup.bmi_range_overweight,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
    {
      category: 'obese',
      label: t.goalSetup.bmi_obese,
      description: t.goalSetup.bmi_obese_desc,
      range: t.goalSetup.bmi_range_obese,
      color: '#EF4444',
      bgColor: '#FEE2E2',
    },
  ];

  const currentCategory = getBMICategory(bmi);
  const currentCategoryInfo = categories.find((c) => c.category === currentCategory)!;

  // Calculate indicator position (0-100%)
  const getIndicatorPosition = (bmiValue: number): number => {
    if (bmiValue <= 15) return 0;
    if (bmiValue >= 35) return 100;
    // Map BMI 15-35 to 0-100%
    return ((bmiValue - 15) / 20) * 100;
  };

  const indicatorPosition = getIndicatorPosition(bmi);

  return (
    <div className="flex justify-between items-stretch gap-5 md:gap-7 xl2:gap-16 py-16 ">
      <div className="py-10 items-center rounded-[32px] md:flex-1 flex flex-col h-full bg-[#FBFCFC] md:shadow justify-around px-0 md:px-5 xl2:px-10">
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <h2 className="text-center md:text-start font-semibold text-[24px] xl:text-[36px]">
            {t.goalSetup.bmi_title}
            <span className="text-primaryColor"> {t.goalSetup.bmi_highlight}</span>
          </h2>

          {/* BMI Value Display */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{ backgroundColor: currentCategoryInfo.bgColor }}
            >
              <div className="text-center">
                <span className="text-4xl font-bold" style={{ color: currentCategoryInfo.color }}>
                  {bmi.toFixed(1)}
                </span>
                <p className="text-sm text-gray-500 mt-1">BMI</p>
              </div>
            </div>
            <div
              className="px-4 py-2 rounded-full text-white font-medium"
              style={{ backgroundColor: currentCategoryInfo.color }}
            >
              {currentCategoryInfo.label}
            </div>
          </div>

          {/* BMI Scale Indicator */}
          <div className="w-full px-4">
            <div className="relative h-6 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-blue-400" />
              <div className="flex-1 bg-green-400" />
              <div className="flex-1 bg-yellow-400" />
              <div className="flex-1 bg-red-400" />
            </div>
            {/* Indicator Arrow */}
            <div
              className="relative transition-all duration-500"
              style={{ left: `${indicatorPosition}%`, marginLeft: '-8px' }}
            >
              <div className="w-4 h-4 bg-gray-800 rotate-45 transform -translate-y-2" />
            </div>
            {/* Scale Labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
            </div>
          </div>

          {/* BMI Categories Legend */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categories.map((cat) => (
              <div
                key={cat.category}
                className={`p-3 rounded-xl border-2 transition-all ${
                  currentCategory === cat.category
                    ? 'border-current shadow-md'
                    : 'border-transparent'
                }`}
                style={{
                  backgroundColor: cat.bgColor,
                  borderColor: currentCategory === cat.category ? cat.color : 'transparent',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-medium text-sm" style={{ color: cat.color }}>
                    {cat.label}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{cat.range}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4 mt-2">
            <p className="text-gray-700 text-sm leading-relaxed">
              {currentCategoryInfo.description}
            </p>
          </div>

          {/* Info Text */}
          <p className="text-gray-500 text-xs text-center mt-2">{t.goalSetup.bmi_info_text}</p>
        </div>

        <div className="flex gap-4 w-full md:w-[90%] mx-auto mt-10 md:mt-3">
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
            onClick={next}
            className="py-[1.4rem] flex-1 hover:bg-primaryColor bg-[#6AB240] text-white font-medium text-[16px] md:text-[20px]"
          >
            {t.goalSetup.next_btn}
          </Button>
        </div>
      </div>
      <div className="flex-1 hidden md:flex">
        <img
          src="/goalinfo.svg"
          alt="BMI Result"
          className="rounded-[32px] h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default BMIResult;
