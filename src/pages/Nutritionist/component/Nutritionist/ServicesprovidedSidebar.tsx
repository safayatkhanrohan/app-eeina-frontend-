import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesprovidedSidebar = () => {
  const { t } = useLanguage();
  const Servicesprovided = [
    { label: t.nutritionist.Diabetes },
    { label: t.nutritionist.Therapeuticnutrition },
    { label: t.nutritionist.Weightloss },
    { label: t.nutritionist.Consultations },
    { label: t.nutritionist.Childrennutrition },
    { label: t.nutritionist.Sportsnutrition },
    { label: t.nutritionist.Nutritionalplans },
  ];
  return (
    <div className="order-2 lg:order-1 flex flex-col col-span-12 lg:col-span-3 gap-3 h-full">
      <h3 className="text-[#6AB240] text-base md:text-[24px] font-bold">{t.nutritionist.Servicesprovided}</h3>
      <Card className="flex flex-1 flex-col gap-6  p-4 md:p-6 shadow-none border border-[#E1E1E1] rounded-[20px]">
        {Servicesprovided.map((item,index) => (
          <div key={index} className="text-center p-2 shadow-none border border-[#E1E1E1] text-[#4C4C4C] text-[14px] md:text-base font-semibold rounded-[12px]">
            {item.label}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ServicesprovidedSidebar;
