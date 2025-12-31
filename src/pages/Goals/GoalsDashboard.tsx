import { Card } from '@/components/ui/card';
import CommitmentChart from './components/CommitmentChart';
import Piechart from './components/Piechart';
import TodaysActivity from './components/TodaysActivity';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  useGetGeneratedmealPlansQuery,
  useGetGoalsQuery,
  useUpdateMealProgressMutation,
  useUpdateWeightProgressMutation,
} from '@/redux/Features/Goals/GoalsApi';
import Loader from '@/components/ui/Loader';
import { useEffect, useState } from 'react';
import { startOfDay } from '@/lib/formatDate';
import { isSameDay } from 'date-fns';
import Streak from './components/Streak';
import Progress from './components/Progress';
import WeightProgress from './components/WeightProgress';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const GoalsDashboard = () => {
  const { t } = useLanguage();
  const [mealActivity, setMealActivity] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snack: false,
  });
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState<string>('');

  const { data: goalData, isLoading: isGoalsLoading } = useGetGoalsQuery({ status: 'In Progress' });
  const [updateMealProgress] = useUpdateMealProgressMutation();

  const { data, isLoading: isMealPlanLoading } = useGetGeneratedmealPlansQuery(
    {
      goalId: goalData?.data[0]?._id,
      date: new Date().toISOString().split('T')[0],
    },
    { skip: !goalData?.data[0]?._id },
  );

  useEffect(() => {
    if (goalData?.data[0]) {
      const todayMealLog = goalData.data[0].mealLog?.find((log: any) => {
        const logDate = startOfDay(log.date);
        const todayDate = startOfDay(new Date());
        return isSameDay(logDate, todayDate);
      });

      if (todayMealLog) {
        setMealActivity({
          ...todayMealLog.meals,
        });
      }
    }
  }, [goalData]);

  const handleUpdateMealProgress = async (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const newActivity = {
      ...mealActivity,
      [mealType]: !mealActivity[mealType],
    };
    setMealActivity(newActivity);

    await updateMealProgress({
      goalId: goalData?.data[0]?._id!,
      mealsCompleted: newActivity,
    }).unwrap();
  };

  const [updateWeightProgress] = useUpdateWeightProgressMutation();

  const handleAddLog = () => {
    const weightVal = parseFloat(weight);
    if (!weightVal || weightVal <= 0) return;

    updateWeightProgress({ goalId: goalData?.data[0]?._id, weight: weightVal });
    setOpen(false);
    setWeight('');
  };

  console.log('mealLog in goal dashboard', goalData?.data[0].mealLog);

  if (isGoalsLoading || isMealPlanLoading) return <Loader className="bg-white" />;
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-9 flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row gap-5 ">
          <div className="lg:w-[60%] flex-none">
            <TodaysActivity
              mealActivity={mealActivity}
              onToggleMeal={handleUpdateMealProgress}
              mealPlan={data?.data?.meals}
            />
          </div>
          <div className="flex-1 lg:w-[40%] flex flex-col gap-4">
            <Streak
              currentStreak={goalData?.data[0].streak}
              maxStreak={goalData?.data[0].longestStreak}
              className="flex-1"
            />
            <Progress
              progressPentage={goalData?.data[0].progressPercentage}
              startDate={goalData?.data[0].startDate}
              endDate={goalData?.data[0].endDate}
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Card className="lg:w-[60%] px-4 py-5">
            <CommitmentChart mealLog={goalData?.data[0].mealLog} />
          </Card>
          <div className="lg:w-[40%]">
            <Card className="p-3 lg:p-5 h-full  flex flex-col gap-5">
              <h2 className="font-semibold text-base xl:text-[20px] text-[#121212]">
                {t.GoalsDashboard.Quickaccess}
              </h2>
              <Card className="p-5">
                <Link
                  to="/planner"
                  className="font-semibold text-[14px] xl:text-[16px] text-[#121212]"
                >
                  {t.GoalsDashboard.Plantoday}
                </Link>
              </Card>
              <Card className="p-5">
                <h2
                  className="font-semibold text-[14px] xl:text-[16px] text-[#121212] cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  {t.GoalsDashboard.Weightupdate}
                </h2>

                {/* weight update dialog /*/}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Weight Log</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Input
                        type="number"
                        placeholder="Enter weight in kg"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddLog} className="bg-[#6AB240] hover:bg-[#5da035]">
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Card>
              <Card className="p-5">
                <Link
                  to="/dashboard-meal-history"
                  className="font-semibold text-[14px] xl:text-[16px] text-[#121212]"
                >
                  Meal History
                </Link>
              </Card>
            </Card>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3">
        <div className="col-span-3 grid grid-rows-[auto_1fr_1fr] gap-4">
          <Card className=" row-span-2 ">
            <Piechart dailyNutrition={goalData?.data[0].targetNutrition} />
          </Card>
          <WeightProgress
            currentWeight={
              goalData?.data[0].weightLog?.[goalData?.data[0].weightLog?.length - 1]?.weight ||
              goalData?.data[0].currentWeight
            }
            startingWeight={goalData?.data[0].currentWeight}
            targetWeight={goalData?.data[0].targetWeight}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalsDashboard;
