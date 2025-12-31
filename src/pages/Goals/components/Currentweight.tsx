import { Card } from '@/components/ui/card';

import { ProgressBar } from '@/components/ui/progress-bar';
import { useLanguage } from '@/contexts/LanguageContext';
const Currentweight = () => {
   const {t} = useLanguage()
  return (
    <>
      <Card className="p-3  h-1/2  xl:p-5 flex flex-col justify-between">
        <h2 className="font-semibold text-base xl:text-[20px] text-[#121212]"> {t.GoalsDashboard.YourCurrentWeight}</h2>
        <div className="flex gap-2 xl:gap-5 ">
          <Card className="flex items-end px-2 xl:px-5 py-2 xl:py-3 flex-1">
            <p className="font-medium text-[16px] text-[#121212]">{t.GoalsDashboard.Current}</p>
            <p className="font-medium text-[24px] xl:text-[32px] text-[#121212]">95</p>
          </Card>
          <Card className="flex items-end px-2 xl:px-5 py-2 xl:py-3 flex-1">
            <p className="font-medium text-[16px] text-[#121212]">{t.GoalsDashboard.Previous}</p>
            <p className="font-medium text-[24px] xl:text-[32px] text-[#121212]">100</p>
          </Card>
        </div>
      </Card>
      <Card className="p-3 !pb-8 xl:pb-5  h-1/2  gap-5 xl:gap-0  xl:p-5 flex flex-col">
        <h2 className="font-medium xl:font-semibold text-base xl:text-[20px] text-[#121212]">
          {t.GoalsDashboard.DaysRemaining}
        </h2>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[16px] text-[#121212]"> {t.GoalsDashboard.DaysPassed(5, 7)}</p>
          <ProgressBar progress={80} showLabel={false} />
        </div>
      </Card>
    </>
  );
};

export default Currentweight;
