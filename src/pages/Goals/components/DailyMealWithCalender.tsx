import { Button } from '@/components/ui/button';
import { GeneratedMealPlan, GoalSetupProps, MealDsiplay, MealType, UserInfo } from '../types/type';
import { Card } from '@/components/ui/card';
import { Fire, Fish, Plus, Toast, Water } from '@/assets';
import { Badge } from '@/components/ui/badge';

import { useEffect, useMemo, useState } from 'react';
import DailyMealWithCalenderModal from './DailyMealWithCalenderModal';
import { useLanguage } from '@/contexts/LanguageContext';
import Calendar from './Calender';
import {
  useGetGeneratedmealPlansQuery,
  useImportGeneratedPlanMutation,
} from '@/redux/Features/Goals/GoalsApi';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/Loader';

interface DailyMealWithCalenderProps extends GoalSetupProps {
  userInfo: UserInfo;
  generatedMealPlans: GeneratedMealPlan | {};
  setGeneratedPlan: React.Dispatch<React.SetStateAction<GeneratedMealPlan | {}>>;
}
const DailyMealWithCalender = ({
  userInfo,
  generatedMealPlans,
  setGeneratedPlan,
}: DailyMealWithCalenderProps) => {
  const { t, language } = useLanguage();
  const [showReplace, setShowReplace] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [replacementMeal, setReplacementMeal] = useState<
    'breakfast' | 'lunch' | 'dinner' | 'snack' | null
  >(null);
  const [replaceMentMealFilter, setReplaceMentMealFilter] = useState<{
    maxCalories: number;
    minCalories: number;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  const [addToMealPlan] = useImportGeneratedPlanMutation();

  // Calculate page based on selectedDate relative to startDate
  const startDate = userInfo.goalResponse?.startDate
    ? new Date(userInfo.goalResponse.startDate)
    : new Date();

  const diffTime = Math.max(0, selectedDate.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const limit = 7;
  const page = Math.floor(diffDays / limit) + 1;

  const { data, isLoading } = useGetGeneratedmealPlansQuery(
    {
      goalId: userInfo.goalResponse?._id,
      date: selectedDate.toISOString().split('T')[0],
    },
    {
      skip: !userInfo.goalResponse?._id,
    },
  );

  useEffect(() => {
    if (data) {
      setGeneratedPlan(data.data);
    }
  }, [data, setGeneratedPlan]);

  const meals: MealDsiplay[] = useMemo(() => {
    if ('meals' in generatedMealPlans && Array.isArray(generatedMealPlans.meals)) {
      return generatedMealPlans.meals.map((meal: any) => ({
        type: meal.mealType,
        calories: meal.recipe.nutrition.calories.amount,
        image: meal.recipe.thumbnail.url,
        title: language === 'ar' ? meal.recipe.title.ar : meal.recipe.title.en,
        description: '',
        protien: meal.recipe.nutrition.protein.amount,
        fat: meal.recipe.nutrition.fat.amount,
        carbs: meal.recipe.nutrition.carbs.amount,
        _id: meal._id,
      }));
    }
    return [];
  }, [generatedMealPlans, language]);

  const hanldeAddtoMealPlan = async () => {
    await addToMealPlan({ generatedPlanId: userInfo.generatedPlanId });
    navigate('/goals-dashboard');
  };

  const handleReplaceClick = async (mealType: MealType, mealId: string) => {
    console.log('userInfo', userInfo);
    if (!userInfo.goalResponse?.distributedNutrition) return;
    setReplacementMeal(mealType);
    setReplaceMentMealFilter({
      maxCalories: userInfo.goalResponse?.distributedNutrition[mealType].calories + 50,
      minCalories: userInfo.goalResponse?.distributedNutrition[mealType].calories - 50,
    });
    setSelectedMealId(mealId);
    setShowReplace(true);
  };

  return (
    <>
      <div className="flex justify-between items-stretch gap-5 md:gap-7 xl2:gap-16 py-16">
        <div className="lg:py-10 items-center rounded-[32px] flex-1  flex flex-col bg-[#FBFCFC] lg:shadow justify-start lg:justify-between px-0 md:px-5 xl2:px-10">
          <div className="flex flex-col justify-start w-full gap-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-center xl:text-start text-primaryColor font-semibold text-[20px] xl:text-[36px]">
                {t.goalSetup.DailyMealView}
              </h2>
              <div className="">
                <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              </div>
            </div>
            <div
              className={`grid gap-4 w-full ${
                meals.length === 0 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {meals.length === 0 && (
                <p className="text-center font-bold text-[24px] col-span-full h-96 flex justify-center items-center">
                  {language == 'ar'
                    ? 'لا يوجد وجبات لهذا اليوم'
                    : 'No meals available for this day'}
                </p>
              )}
              {isLoading && <Loader />}
              {meals.map((meal, index) => (
                <Card key={index} className="gap-5 pb-2 !rounded-t-[16px]">
                  <div className="relative">
                    <img
                      src={meal.image}
                      alt={meal.title}
                      className="object-cover w-full h-48 rounded-[16px]"
                    />
                    <div className="top-3 left-3 absolute flex items-center gap-3">
                      <Badge className=" bg-[#C2E66E] text-[10px] lg:text-[11px] text-[#272932] font-medium">
                        {meal.type}
                      </Badge>
                      <Badge className=" bg-white text-[10px] lg:text-[11px] text-[#272932] font-medium">
                        <Fire /> {Math.round(meal.calories)} kcal
                      </Badge>
                     
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 p-5 ">
                    <div className="flex justify-center items-center gap-3">
                      <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
                        <Toast width={'12px'} height={'12px'} />{' '}
                        <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
                          {Math.round(meal.carbs)}g
                        </span>
                      </div>
                      <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
                        <Fish width={'12px'} height={'12px'} />{' '}
                        <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
                          {Math.round(meal.protien)}g
                        </span>
                      </div>
                      <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
                        <Water width={'12px'} height={'12px'} />{' '}
                        <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
                          {Math.round(meal.fat)}g
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-start items-start flex-col !w-full gap-2">
                      <h3 className="text-[#272932] text-[12px] md:text-[14px] font-semibold">
                        {meal.title}
                      </h3>
                      <p className="text-[#8A8C90] font-medium text-[10px]">{meal.description}</p>
                      <Button
                        onClick={() => handleReplaceClick(meal.type, meal._id)}
                        className="hover:bg-[#C2E66E] bg-[#C2E66E] text-[#272932] font-normal text-[12px]"
                      >
                        {t.goalSetup.Replacemealbtn}
                      </Button>{' '}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className=" flex flex-col md:flex-row items-center gap-5 w-full mt-10 lg:mt-4">
            <Button
              onClick={hanldeAddtoMealPlan}
              className="flex-1 md:py-[1.4rem] w-full hover:bg-primaryColor bg-[#6AB240] text-white font-medium text-[16px] md:text-[20px]"
            >
              {t.goalSetup.committedbtn}
            </Button>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex">
          <img
            src="/Daily Meal View.svg"
            alt="Daily Meal View"
            className="rounded-[32px] h-full w-full object-cover "
          />
        </div>
      </div>
      {showReplace && (
        <DailyMealWithCalenderModal
          isOpen={showReplace}
          onOpenChange={setShowReplace}
          onClose={() => setShowReplace(false)}
          filters={replaceMentMealFilter}
          mealType={replacementMeal as MealType}
          date={selectedDate}
          goalId={userInfo.goalResponse?._id as string}
          mealId={selectedMealId as string}
        />
      )}
    </>
  );
};

export default DailyMealWithCalender;
