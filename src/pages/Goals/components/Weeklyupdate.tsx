import { useState } from 'react';
import { GoalSetupProps } from '../types/type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Weeklyupdate = ({ next }: GoalSetupProps) => {
  const { t, isRTL } = useLanguage();
  const [levelselected, setLevelSelected] = useState<string | null>(null);
  const [hungerLevel, setHungerLevel] = useState<number | null>(null);
  const hungerOptions = [1, 2, 3, 4, 5];
  const [EnergyLevel, setEnergyLevel] = useState<number | null>(null);
  const EnergyOptions = [1, 2, 3, 4, 5];

  const options = [
    { label: `${t.goalSetup.adherence_excellent}`, value: 'excellent' },
    { label: `${t.goalSetup.adherence_good}`, value: 'good' },
    { label: `${t.goalSetup.adherence_weak}`, value: 'weak' },
  ];
  return (
    <div className="flex justify-between items-stretch gap-5 lg:gap-16 py-16 lg:h-[928px]">
      <div className=" items-center rounded-[32px] flex-1 flex flex-col h-full bg-[#FBFCFC] lg:shadow justify-around px-0 md:px-10">
        <div className="flex flex-col gap-8 w-full lg:w-[90%]">
          <h2 className="font-semibold text-[24px] xl:text-[36px]">
            {t.goalSetup.weekly_title}
            <span className="text-primaryColor"> {t.goalSetup.weekly_highlight}</span>
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <h3 className="text-[#84818A] font-normal text-[14px] xl:text-[16px]">
                {t.goalSetup.adherence_label}
              </h3>
              <div className="flex gap-3 justify-start">
                {options.map((option) => {
                  const isSelected = levelselected === option.value;

                  return (
                    <Button
                      key={option.value}
                      onClick={() => setLevelSelected(option.value)}
                      className={`h-[50px] mx-auto flex-1 text-[14px] xl:text-[16px] font-normal rounded-[12px]
                      ${isSelected ? 'bg-[#6AB240] text-white' : 'bg-white text-[#84818A] border border-[#DCDBDD]'}
                      hover:bg-[#6AB240] hover:text-white
                    `}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-[#84818A] font-normal text-[14px] xl:text-[16px]">
                {' '}
                {t.goalSetup.hunger_label}
              </h3>
              <div className="flex gap-3 justify-start">
                {hungerOptions.map((num) => {
                  const isSelected = hungerLevel === num;
                  return (
                    <Button
                      key={num}
                      onClick={() => setHungerLevel(num)}
                      className={`h-[50px] w-14 text-[14px] xl:text-[16px] font-normal rounded-[12px]
                                    ${isSelected ? 'bg-[#6AB240] text-white' : 'bg-white text-[#84818A] border border-[#DCDBDD]'}
                                    hover:bg-[#6AB240] hover:text-white
                                `}
                    >
                      {num}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-[#84818A] font-normal text-[14px] xl:text-[16px]">
                {t.goalSetup.energy_label}
              </h3>
              <div className="flex gap-3 justify-start">
                {EnergyOptions.map((num) => {
                  const isSelected = EnergyLevel === num;
                  return (
                    <Button
                      key={num}
                      onClick={() => setEnergyLevel(num)}
                      className={`h-[50px] w-14 text-[14px] xl:text-[16px] font-normal rounded-[12px]
                                    ${isSelected ? 'bg-[#6AB240] text-white' : 'bg-white text-[#84818A] border border-[#DCDBDD]'}
                                    hover:bg-[#6AB240] hover:text-white
                                `}
                    >
                      {num}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-[#84818A] font-normal text-[14px] xl:text-[16px]">
                {t.goalSetup.weight_label}
              </h3>
              <div className="flex gap-3 justify-start">
                <Input
                  type="number"
                  placeholder="Kg"
                  className={`placeholder:text-end focus:outline-none focus:ring-1 border border-[#DCDBDD] rounded-[12px] h-[50px] focus:!ring-[#DCDBDD] focus:!border-[#DCDBDD]`}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={next}
          className="mt-10 lg:mt-0 py-[1.4rem] w-full lg:w-[80%] mx-auto hover:bg-primaryColor bg-[#6AB240] text-white font-medium text-[16px] md:text-[20px]"
        >
          {t.goalSetup.button_update}
        </Button>
      </div>
      <div className="flex-1 h-full  hidden lg:flex">
        <img
          src="/Weekly update.svg"
          alt="Weekly update"
          className="rounded-[32px] h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default Weeklyupdate;
