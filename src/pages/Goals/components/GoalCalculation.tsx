import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { GoalSetupProps, UserInfo } from '../types/type';
import GaolSetupPiechart from './GoalSetupPiechart';

interface GoalCalculationProps extends GoalSetupProps {
  userInfo: UserInfo;
  next: () => void;
}

const GoalCalculation = ({ next, userInfo }: GoalCalculationProps) => {
  const { t } = useLanguage();

  const nutrition = userInfo.goalResponse?.targetNutrition;
  console.log('userInfo', userInfo);
  return (
    <div className="flex justify-between items-stretch gap-5 md:gap-7 xl2:gap-16 py-16 md:h-[928px]">
      <div className=" items-center rounded-[32px] lg:flex-1 flex flex-col h-full bg-[#FBFCFC] lg:shadow justify-start lg:justify-around px-0 md:px-5 xl2:px-10">
        <div className="flex flex-col justify-between gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="font-semibold text-[24px] xl:text-[36px]">
              {t.goalSetup.calc_main_title}
              <span className="text-primaryColor"> {t.goalSetup.calc_main_highlight}</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-5 px-0 sm:px-10 w-full">
            <h2 className="font-semibold text-[16px] md:text-[20px] text-[#272932] ">
              {t.goalSetup.calories_title}
            </h2>
            <div className="flex justify-center gap-5 md:gap-16 items-start">
              <GaolSetupPiechart
                calories={nutrition?.calories}
                carbs={nutrition?.carbs}
                protein={nutrition?.protein}
                sugar={nutrition?.sugar}
                fat={nutrition?.fat}
              />

              <ul className="list-disc flex flex-col gap-4 w-full">
                <li className="marker:text-[#6BAA47] text-[12px] md:text-[14px] font-medium text-[#272932] border-b border-[#F5F5F5] pb-2">
                  {t.goalSetup.carb_label}: {nutrition?.carbs || 0} {t.goalSetup.gram}
                </li>
                <li className="pb-2 marker:text-[#609542]  border-b border-[#F5F5F5] text-[12px] md:text-[14px]  font-medium text-[#272932]">
                  {t.goalSetup.protein_label}: {nutrition?.protein || 0} {t.goalSetup.gram}
                </li>
                <li className="pb-2 marker:text-[#588C3A]  border-b border-[#F5F5F5] text-[12px] md:text-[14px] font-medium text-[#272932]">
                  {t.goalSetup.Sugars_label}: {nutrition?.sugar || 0} {t.goalSetup.gram}
                </li>
                <li className="pb-2 marker:text-[#6AB240BA]   text-[12px] md:text-[14px]  font-medium text-[#272932]">
                  {t.goalSetup.Fats_label}: {nutrition?.fat || 0} {t.goalSetup.gram}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          onClick={next}
          className=" py-[1.4rem] my-10 lg:mt-0 w-[90%] mx-auto hover:bg-primaryColor bg-[#6AB240] text-white font-medium text:[16px] md:text-[20px]"
        >
          {t.goalSetup.next_btn}
        </Button>
      </div>
      <div className="flex-1 h-full  hidden lg:flex">
        <img
          src="/Calculate my needs.svg"
          alt="Calculate my needs"
          className="rounded-[32px] h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default GoalCalculation;
