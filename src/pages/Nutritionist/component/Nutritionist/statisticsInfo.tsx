import { Chart, Comment, Globel, Patient, Plus, Rate, Translation } from '@/assets';
import { useLanguage } from '@/contexts/LanguageContext';

const StatisticsInfo = () => {
  const { t } = useLanguage();
  const statsData = [
    {
      icon: Patient,
      value: 120,
      label: t.nutritionist.subscriber,
      showPlus: true,
      valueClass: 'text-base lg:text-[24px]',
    },
    {
      icon: Chart,
      value: 85,
      label: t.nutritionist.Yearsofexperience,
      showPlus: true,
      valueClass: 'text-base lg:text-[24px]',
    },
    {
      icon: Rate,
      value: 7,
      label: t.nutritionist.evaluation,
      showPlus: false,
      valueClass: 'text-base lg:text-[24px]',
    },
    {
      icon: Comment,
      value: 4.9,
      label: t.nutritionist.comment,
      showPlus: false,
      valueClass: 'text-base lg:text-[24px]',
    },
    {
      icon: Globel,
      value: t.nutritionist.nation,
      label: 'Jordan Amman',
      showPlus: false,
      valueClass: 'text-[14px] lg:text-[20px]',
    },
    {
      icon: Translation,
      value: t.nutritionist.language,
      label: 'Arabic and English',
      showPlus: false,
      valueClass: 'text-[14px] lg:text-[20px]',
    },
  ];

  return (
    <div className="order-1 lg:order-2 col-span-12 lg:col-span-9  flex flex-col gap-5">
      <div className="grid grid-cols-12 gap-3">
        {statsData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className=" px-2 py-2  
                col-span-4 lg:col-span-2
                grid grid-rows-[auto_auto_1fr]
                gap-2
                justify-items-center
                justify-center
                border border-[#E1E1E1]
                rounded-[20px] "
            >
              <div className="flex justify-center items-center w-14 h-14 rounded-full bg-[#eef6ea]">
                <Icon className="text-[#6AB240]" />
              </div>
              <h3
                className={` ${item.valueClass} font-semibold text-[#6AB240] flex justify-center items-center gap-1`}
              >
                {item.value}
                {item.showPlus && <Plus className="text-[#6AB240]" />}
              </h3>
              <p className=" text-[13px] lg:text-base text-[#4C4C4C] font-medium text-center">
                {' '}
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="p-4 md:p-6 shadow-none border border-[#E1E1E1]
               rounded-[20px] "
      >
        <h3 className="text-[#6AB240] text-[24px] font-bold">{t.nutritionist.Aboutme}</h3>
        <p className="font-medium text-base text-[#4C4C4C] leading-[216%]">
          Certified Nutrition Specialist with extensive experience in designing personalized healthy
          nutrition plans and improving lifestyle habits. I help individuals achieve their health
          goals through scientific and safe approaches, whether for weight loss, muscle building,
          enhancing physical performance, or managing nutrition-related health conditions. I believe
          that nutrition is not about deprivation, but about smart balance based on science and
          consistency. My mission is to provide practical solutions that fit everyday life and
          deliver sustainable, long-term results.
        </p>
      </div>
    </div>
  );
};

export default StatisticsInfo;
