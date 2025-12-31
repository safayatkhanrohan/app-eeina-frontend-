import { Button } from '@/components/ui/button';
import { GoalSetupProps, UserInfo, GoalType } from '../types/type';
import { Card } from '@/components/ui/card';
import { Clothes, G555, Muscle, Weightloss } from '@/assets';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

interface GoalSelectionProps extends GoalSetupProps {
  next: () => void;
  back?: () => void;
}

type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

const GoalSelection = ({ next, back }: GoalSelectionProps) => {
  const { t } = useLanguage();
  const { watch, setValue, trigger } = useFormContext<UserInfo>();
  const userInfo = watch();

  const handleNext = async () => {
    const isValid = await trigger('type');
    if (isValid) next();
  };

  // Get BMI category
  const getBMICategory = (bmi: number): BMICategory => {
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal';
    if (bmi < 30) return 'overweight';
    return 'obese';
  };

  // Map BMI category to recommended goal
  const getRecommendedGoal = (category: BMICategory): GoalType => {
    switch (category) {
      case 'underweight':
        return 'Gain Weight';
      case 'normal':
        return 'Maintain Weight';
      case 'overweight':
      case 'obese':
        return 'Lose Weight';
    }
  };

  // Get recommendation text based on BMI category
  const getRecommendationText = (category: BMICategory): string => {
    switch (category) {
      case 'underweight':
        return t.goalSetup.goal_recommendation_underweight;
      case 'normal':
        return t.goalSetup.goal_recommendation_normal;
      case 'overweight':
        return t.goalSetup.goal_recommendation_overweight;
      case 'obese':
        return t.goalSetup.goal_recommendation_obese;
    }
  };

  const bmiCategory = useMemo(() => {
    return userInfo.bmi ? getBMICategory(userInfo.bmi) : 'normal';
  }, [userInfo.bmi]);

  const recommendedGoal = useMemo(() => {
    return getRecommendedGoal(bmiCategory);
  }, [bmiCategory]);

  // Set recommended goal on mount if no goal is selected
  useEffect(() => {
    if (!userInfo.type && userInfo.bmi) {
      setValue('type', recommendedGoal, { shouldValidate: true });
    }
  }, [userInfo.bmi, userInfo.type, recommendedGoal, setValue]);

  const goals: { key: GoalType; icon: JSX.Element; title: string; description: string }[] = [
    {
      key: 'Gain Weight',
      icon: <Weightloss />,
      title: t.goalSetup.weight_gain_title,
      description: t.goalSetup.weight_gain_desc,
    },
    {
      key: 'Lose Weight',
      icon: <G555 />,
      title: t.goalSetup.weight_loss_title,
      description: t.goalSetup.weight_loss_desc,
    },
    {
      key: 'Maintain Weight',
      icon: <Clothes />,
      title: t.goalSetup.maintain_weight_title,
      description: t.goalSetup.maintain_weight_desc,
    },
    {
      key: 'Build Muscle',
      icon: <Muscle />,
      title: t.goalSetup.muscle_building_title,
      description: t.goalSetup.muscle_building_desc,
    },
  ];

  const handleGoalSelect = (goalKey: GoalType) => {
    setValue('type', goalKey, { shouldValidate: true });
  };

  return (
    <div className="flex justify-between items-stretch gap-5 md:px-5 xl2:px-10 py-16 md:h-[928px]">
      <div className=" items-center rounded-[32px] md:!flex-1  flex flex-col h-full bg-[#FBFCFC] md:shadow justify-around md:gap-7 xl2:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-[24px] xl:text-[36px]">
            {t.goalSetup.main_title}
            <span className="text-primaryColor">{t.goalSetup.main_titleHighlight} </span>
            {t.goalSetup.main_titlenow}
          </h2>

          {/* Recommendation Box */}
          {userInfo.bmi && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#6AB240] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {t.goalSetup.goal_recommended_badge}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {getRecommendationText(bmiCategory)}
              </p>
              <p className="text-gray-500 text-xs mt-2">{t.goalSetup.goal_change_selection}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 lg:gap-5">
            {goals.map((goal) => {
              const isActive = userInfo.type === goal.key;
              const isRecommended = recommendedGoal === goal.key;

              return (
                <Card
                  key={goal.key}
                  onClick={() => handleGoalSelect(goal.key)}
                  className={`
                    relative flex justify-center items-center gap-3 p-4 flex-col cursor-pointer transition-all duration-300
                    ${isActive ? 'bg-[#6AB240]' : 'bg-white'} 
                  `}
                >
                  {/* Recommended badge */}
                  {isRecommended && userInfo.bmi && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      ★
                    </div>
                  )}
                  <div
                    className={`w-[45px] h-[45px] ${isActive ? 'text-white' : 'text-[#6AB240]'}`}
                  >
                    {goal.icon}
                  </div>
                  <h3
                    className={`text-center text-[14px] lg:text-[20px] font-semibold ${isActive ? 'text-white' : 'text-[#6AB240]'}`}
                  >
                    {goal.title}
                  </h3>
                  <p
                    className={`text-center text-[10px] lg:text-[14px] font-normal ${isActive ? 'text-white' : 'text-black opacity-[60%]'}`}
                  >
                    {goal.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-[90%] mx-auto my-5 md:my-0">
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
            className="py-[1.4rem] flex-1 hover:bg-primaryColor bg-[#6AB240] !text-white font-medium text-16 md:text-[20px]"
          >
            {t.goalSetup.next_btn}
          </Button>
        </div>
      </div>
      <div className=" h-full hidden md:flex !flex-1">
        <img
          src="/goalSelection.svg"
          alt="goalSelection"
          className="rounded-[32px] h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default GoalSelection;
