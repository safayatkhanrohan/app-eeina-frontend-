import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Clothes, G555, Muscle, Weightloss } from '@/assets';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { GoalTypes } from '../types/type';
import { JSX, useState } from 'react';

const Modifytarget = ({ className, goal }: { className?: string; goal: any }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const goals: {
    icon: JSX.Element;
    title: string;
    description: string;
    value: GoalTypes;
  }[] = [
    {
      icon: <Weightloss />,
      title: `${t.goalSetup.weight_gain_title}`,
      description: `${t.goalSetup.weight_gain_desc}`,
      value: 'Gain Weight',
    },
    {
      icon: <G555 />,
      title: `${t.goalSetup.weight_loss_title}`,
      description: `${t.goalSetup.weight_loss_desc}`,
      value: 'Lose Weight',
    },
    {
      icon: <Clothes />,
      title: `${t.goalSetup.maintain_weight_title}`,
      description: `${t.goalSetup.maintain_weight_desc}`,
      value: 'Maintain Weight',
    },
    {
      icon: <Muscle />,
      title: `${t.goalSetup.muscle_building_title}`,
      description: `${t.goalSetup.muscle_building_desc}`,
      value: 'Build Muscle',
    },
  ];

  /* Calculate Recommended Goal */
  const recommendedGoal = (() => {
    if (!goal) return '';
    const { currentWeight, height, weightLog } = goal;
    const weightNow = weightLog?.[weightLog.length - 1]?.weight || currentWeight;
    if (!height) return '';
    const currentBmi = weightNow / (height / 100) ** 2;

    if (currentBmi < 18.5) {
      return 'Gain Weight';
    } else if (currentBmi > 24.9) {
      return 'Lose Weight';
    } else {
      return 'Maintain Weight';
    }
  })();

  const currentGoal = goal?.type;

  const [selectedGoal, setSelectedGoal] = useState<number | null>(() => {
    if (!currentGoal) return 0;
    const index = goals.findIndex((g) => g.value === currentGoal);
    return index !== -1 ? index : 0;
  });

  return (
    <Card className={cn('flex-1 p-5 lg:!pt-20 flex flex-col gap-5', className)}>
      <h2 className="font-semibold text-base lg:text-[20px] text-[#121212]">
        {t.GoalsDashboard.Modifytarget}
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:gap-5">
        {goals.map((goalOption, index) => {
          const isActive = selectedGoal === index;
          const isRecommended = goalOption.value === recommendedGoal;

          return (
            <Card
              key={index}
              onClick={() => {
                setSelectedGoal(index);
                navigate('/goals-setup', {
                  state: {
                    goalType: goalOption.value,
                    isModification: true,
                    goalId: goal?._id,
                    age: goal?.age,
                    gender: goal?.gender,
                    height: goal?.height,
                    activityLevel: goal?.activityLevel,
                    currentWeight:
                      goal?.weightLog?.[goal.weightLog.length - 1]?.weight || goal?.currentWeight,
                  },
                });
              }}
              className={`
                    relative flex justify-center items-center gap-3 p-4 flex-col cursor-pointer transition-all duration-300
                     ${isActive ? 'bg-[#6AB240]' : 'bg-white'} 
                  
                  `}
            >
              <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                {isRecommended && (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Recommended
                  </Badge>
                )}
              </div>
              <div className={`w-[45px] h-[45px] ${isActive ? 'text-white' : 'text-[#6AB240]'}`}>
                {goalOption.icon}
              </div>
              <h3
                className={`text-center text-[14px] lg:text-[20px] font-semibold  ${isActive ? 'text-white' : 'text-[#6AB240]'}`}
              >
                {goalOption.title}
              </h3>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default Modifytarget;
