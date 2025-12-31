import { useLanguage } from '@/contexts/LanguageContext';
import { GoalSetupProps } from '../types/type';
import { Button } from '@/components/ui/button';

const WeightUpdateResult = ({ next }: GoalSetupProps) => {
  const { t } = useLanguage();
  return (
    <div className="flex justify-between items-stretch gap-5 lg:gap-16 py-16 lg:h-[928px]">
      <div className=" items-center rounded-[32px] flex-1 flex flex-col h-full bg-[#FBFCFC] lg:shadow justify-around px-0 lg:px-10">
        <div className="flex justify-center lg:justify-start items-center lg:items-start text-center lg:text-start flex-col gap-8 w-full lg:w-[90%]">
          <h2 className="font-semibold text-[24px] xl:text-[36px]">
            {t.goalSetup.weight_update_congrats}
            <span className="text-primaryColor"> {t.goalSetup.weight_update_change}</span>
          </h2>
          <div>
            <img src="/Successful illustration.svg" alt="Successful illustration" className="" />
          </div>
        </div>
        <Button
          onClick={next}
          className="mt-10  md:mt-0 py-[1.4rem]  w-[90%] md:w-[80%] mx-auto hover:bg-primaryColor bg-[#6AB240] text-white font-medium text-[16px] md:text-[20px]"
        >
          {t.goalSetup.update_plan_btn}
        </Button>
      </div>
      <div className="flex-1 h-full  hidden lg:flex">
        <img
          src="/Weight Update Result.svg"
          alt="Weight Update Result"
          className="rounded-[32px] h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default WeightUpdateResult;
