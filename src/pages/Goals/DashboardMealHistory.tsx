import { Card } from '@/components/ui/card';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import MealCard from './components/MealCard';
import { Calender } from '@/components/Shared/calender/Calender';
import { useGetGeneratedmealPlansQuery, useGetGoalsQuery } from '@/redux/Features/Goals/GoalsApi';
const DashboardMealHistory = () => {
  const { t } = useLanguage();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  console.log('selectedDate', selectedDate);

  const { data: goalData } = useGetGoalsQuery({ status: 'In Progress' });

  const { data, isLoading } = useGetGeneratedmealPlansQuery(
    {
      goalId: goalData?.data[0]?._id,
      date: selectedDate.toLocaleDateString(),
    },
    { skip: !goalData?.data[0]?._id },
  );

  console.log('data', data?.data?.meals);

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-col p-5 px-3 lg:px-5 gap-5">
        <div className="flex justify-between items-center relative">
          <h2 className="font-medium text-base lg:text-[20px]">{t.GoalsDashboard.MealHistory}</h2>
          <Button
            onClick={() => setShowCalendar(!showCalendar)}
            className={`py-3 px-8  font-normal text-base
                    bg-[#6AB240] text-white
                      hover:bg-[#6AB240] hover:text-white
                    `}
          >
            {t.GoalsDashboard.Today}
          </Button>
          {showCalendar && (
            <div className="absolute top-full mt-2 right-0 z-50">
              <Calender
                selectedDate={selectedDate}
                onSelectedDateChange={(day: any) => {
                  setSelectedDate(day);
                }}
                onClose={() => setShowCalendar(false)}
                title={t.GoalsDashboard.SelectDate}
              />
            </div>
          )}
        </div>
        <MealCard meals={data?.data?.meals} />
      </Card>
      {/* <div className="grid grid-cols-12 gap-5">
        <Card className="col-span-12 lg:col-span-5 ">
          <BarChartHeader />
          <ChartBar />
        </Card>
        <Card className="col-span-12 lg:col-span-7  p-5 px-3 lg:px-5 flex flex-col gap-5">
          <h2 className="text-[20px] font-semibold text-[#121212]">
            {t.GoalsDashboard.MealRecovery}
          </h2>
          <div className="flex flex-wrap gap-5">
            {options.map((option) => {
              const isSelected = selected === option.value;

              return (
                <Button
                  key={option.value}
                  onClick={() => setSelected(option.value)}
                  className={`w-full lg:w-fit py-[1.4rem] text-start lg:text-center  font-normal text-[13px] lg:text-base 
                      ${isSelected ? 'bg-[#6AB240] text-white' : 'bg-white text-[#84818A] border border-[#DCDBDD]'}
                      hover:bg-[#6AB240] hover:text-white
                    `}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </Card>
      </div> */}
    </div>
  );
};

export default DashboardMealHistory;
