import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const Foodallergies = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>('null');
  const options = [
    { label: `${t.GoalsDashboard.GlutenAllergy}`, value: 'Glutenallergy' },
    { label: `${t.GoalsDashboard.LactoseAllergy}`, value: 'Lactoseallergy' },
    { label: `${t.GoalsDashboard.PeanutAllergy}`, value: 'Peanutallergy' },
    { label: `${t.GoalsDashboard.ShellAllergy}`, value: 'Shellallergy' },
    { label: `${t.GoalsDashboard.SoyAllergy}`, value: 'Soyallergy' },
    { label: `${t.GoalsDashboard.WheatAllergy}`, value: 'Wheatallergy' },
  ];
  return (
    <Card className="p-3 lg:p-5 flex flex-col gap-5">
      <h2 className="font-semibold text-base lg:text-[20px] text-[#121212]">
        {t.GoalsDashboard.ChooseFoodAllergies}
      </h2>
      <div className="grid grid-cols-2 xl2:grid-cols-3 gap-2 lg:gap-3">
        {options.map((option) => {
          const isSelected = selected === option.value;

          return (
            <Button
              key={option.value}
              onClick={() => setSelected(option.value)}
              className={`py-[1.4rem]  font-normal text-[14px] sm:text-base 
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
  );
};

export default Foodallergies;
