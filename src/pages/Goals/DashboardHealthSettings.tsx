import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Foodallergies from './components/Foodallergies';
import Modifytarget from './components/Modifytarget';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGetGoalsQuery } from '@/redux/Features/Goals/GoalsApi';
import { useEffect, useState } from 'react';
import WeightLog from './components/WeightLog';

const DashboardHealthSettings = () => {
  const { t } = useLanguage();
  const [warning, setWarning] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const { data: goalData } = useGetGoalsQuery({ status: 'In Progress' });

  console.log('weightlog', goalData?.data[0]?.weightLog);

  useEffect(() => {
    if (!goalData?.data?.length) return;
    if (goalData) {
      const {
        currentWeight,
        targetWeight,
        tdee,
        startDate,
        endDate,
        height,
        targetNutrition: { calories: targetCalories },
      } = goalData.data[0];
      // for weight gain or loss goal
      if (targetWeight !== currentWeight) {
        const caloriesDifference = tdee - targetCalories;
        if (Math.abs(caloriesDifference) > tdee * 0.33) {
          setWarning(true);
          setWarningMessage(
            `${targetWeight > currentWeight ? 'gaining' : 'losing'} ${Math.abs(targetWeight - currentWeight)} kg in ${Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks requires a significant calorie ${
              targetWeight > currentWeight ? 'surplus' : 'deficit'
            }. This may not be safe for your health. Consider adjusting your goal.`,
          );
        }
      } else {
        // for weight maintenance goal
        const bmi = currentWeight / (height / 100) ** 2;
        if (bmi < 18.5) {
          setWarning(true);
          setWarningMessage(
            'Your BMI indicates underweight. Try to adjust your goal as gaining weight may be beneficial for your health.',
          );
        } else if (bmi > 24.9) {
          setWarning(true);
          setWarningMessage(
            'Your BMI indicates overweight. Try to adjust your goal as losing weight may be beneficial for your health.',
          );
        }
      }
    }
  }, [goalData]);

  return (
    <div className="flex flex-col gap-5">
      {/* warning should go here if existns */}
      {warning && (
        <Card className="flex-1 p-3 lg:p-5">
          <div className=" mx-auto flex flex-col gap-5 lg:max-w-[80%] justify-center items-center">
            <h2 className="text-center text-base lg:text-[20px] font-semibold text-[#121212] w-full">
              {warningMessage}
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="rounded-[12px] bg-[#6AB240] max-w-full lg:py-5 hover:bg-[#6AB240] font-medium text-[12px] sm:text-[16px]">
                {' '}
                {t.GoalsDashboard.AdjustGoal}
              </Button>

              <Button
                onClick={() => setWarning(false)}
                className="rounded-[12px] bg-[#6AB240] max-w-full lg:py-5 hover:bg-[#6AB240] font-medium text-[12px] sm:text-[16px]"
              >
                {t.GoalsDashboard.ContinueWithWarning}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-1/2">
          <WeightLog
            startWeight={goalData?.data[0]?.currentWeight}
            logs={goalData?.data[0]?.weightLog}
            height={goalData?.data[0]?.height}
            goalId={goalData?.data[0]?._id}
          />
        </div>
        <div className="w-1/2">
          <Modifytarget goal={goalData?.data[0]} />
          <Foodallergies />
        </div>
      </div>
    </div>
  );
};

export default DashboardHealthSettings;
