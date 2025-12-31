import { CheckIcon, Star } from '@/assets';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const StatisticsSideBar = () => {
  const { language, t } = useLanguage();
  return (
    <Card className="order-2 lg:order-1 flex flex-col gap-7 col-span-12 lg:col-span-3 p-4 md:p-6 shadow-none border border-[#E1E1E1] rounded-[20px]">
      <h2 className="text-base md:text-[20px] text-[#6AB240] font-semibold">{t.nutritionist.statistics}</h2>
      <div className="flex justify-between items-center">
        <p className="text-base font-semibold text-[#4C4C4C]">{t.nutritionist.Ratings}</p>
        <div className="flex justify-center items-center gap-2">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="text-[#4C4C4C]" />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[14px] md:text-base font-semibold text-[#4C4C4C]">{t.nutritionist.Numberofclients}</p>
        <p className="text-[14px] font-semibold text-[#4C4C4C]">32</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[14px] md:text-base font-semibold text-[#4C4C4C]">{t.nutritionist.Registrationdate}</p>
        <p className="text-[14px] font-semibold text-[#4C4C4C]">12/2025</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[14px] md:text-base font-semibold text-[#4C4C4C]">{t.nutritionist.Lastseen}</p>
        <p className="text-[14px] font-semibold text-[#4C4C4C]">5 minutes ago</p>
      </div>
      <h2 className="text-base md:text-[20px] text-[#6AB240] font-semibold">{t.nutritionist.Documentations}</h2>
      <div className="flex justify-between items-center">
        <p className="text-[14px] md:text-base font-semibold text-[#4C4C4C]">{t.nutritionist.Emailorphone}</p>
        <p className="text-[14px] font-semibold text-[#4C4C4C]"><CheckIcon className='text-[#4C4C4C]'/></p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[14px] md:text-base font-semibold text-[#4C4C4C]">{t.nutritionist.Personalidentity}</p>
        <p className="text-[14px] font-semibold text-[#4C4C4C]"><CheckIcon className='text-[#4C4C4C]'/></p>
    
      </div>
    </Card>
  );
};

export default StatisticsSideBar;
