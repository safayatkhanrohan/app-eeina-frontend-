import { Button } from '@/components/ui/button';
import { GoalSetupProps } from '../types/type';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { Link } from 'react-router-dom';

const WelcomeScreen = ({ next }: GoalSetupProps) => {
  const { t, language } = useLanguage();
  return (
    <div className="flex justify-between items-center gap-16 py-10">
      <div className="items-center rounded-[32px] lg:flex-1 flex flex-col gap-3 lg:gap-5 p-3 md:p-10 lg:p-16 bg-[#FBFCFC] lg:shadow justify-center">
        <div className="flex flex-col text-center lg:text-start gap-4 lg:gap-7">
          <h2 className="font-semibold text-[24px] xl:text-[40px]">
            {t.goalSetup.start_plan_title}{' '}
            <span className="text-primaryColor">{t.goalSetup.start_plan_highlight}</span>
          </h2>
          <p className="text-[16px] xl:text-[20px] opacity-[60%] font-normal">
            {t.goalSetup.start_plan_desc}
          </p>
        </div>

        <div className="flex flex-col gap-5 w-full lg:w-[90%] mt-9">
          <Button
            onClick={next}
            className="py-[1.4rem] w-full mx-auto hover:bg-primaryColor bg-[#6AB240] !text-white font-medium text-16 md:text-[20px]"
          >
            {t.goalSetup.start_now}
          </Button>
          <Button
            variant={'outline'}
            className="py-[1.4rem] w-full mx-auto !text-[#6AB240] text-16 md:text-[20px] font-medium"
          >
            <Link to={getLocalizedPath('/', language)}>{t.goalSetup.skip}</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 h-[928px] hidden lg:flex">
        <img src="/goalwelcome.svg" alt="goalwelcome" className="h-full w-full" />
      </div>
    </div>
  );
};

export default WelcomeScreen;
