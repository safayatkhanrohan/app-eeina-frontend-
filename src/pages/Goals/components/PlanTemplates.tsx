import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GoalSetupProps } from '../types/type';
import { BalancedPlan, Bread, Proteins } from '@/assets';
import { useLanguage } from '@/contexts/LanguageContext';

const PlanTemplates = ({ next }: GoalSetupProps) => {
  const { t } = useLanguage();
  const plans = [
    {
      icon: <BalancedPlan />,
      title: `${t.goalSetup.plan_balanced_title}`,
      description: `${t.goalSetup.plan_balanced_desc}`,
      bgColor: '#6AB240',
      textColor: 'white',
    },
    {
      icon: <Bread />,
      title: `${t.goalSetup.plan_lowcarb_title}`,
      description: `${t.goalSetup.plan_lowcarb_desc}`,
      bgColor: 'white',
      textColor: '#6AB240',
    },
    {
      icon: <Proteins />,
      title: `${t.goalSetup.plan_highprotein_title}`,
      description: `${t.goalSetup.plan_highprotein_desc}`,
      bgColor: 'white',
      textColor: '#6AB240',
    },
  ];

  return (
    <div className="flex justify-between items-stretchgap-5 md:gap-16 py-16 md:h-[928px]">
      <div className=" items-center rounded-[32px] flex-1 flex flex-col h-full bg-[#FBFCFC] lg:shadow justify-start lg:justify-around px-0 md:px-10">
        <div className="flex flex-col gap-8">
          <h2 className="font-semibold text-[24px] xl:text-[36px]">
            {t.goalSetup.plan_main_title}
            <span className="text-primaryColor">{t.goalSetup.plan_main_highlight}</span>
          </h2>
          <div className="grid grid-cols-1 w-full gap-5">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex justify-start items-center gap-5 md:gap-8 py-4 px-4 md:px-7 ${plan.bgColor === 'white' ? 'bg-white' : 'bg-[#6AB240]'
                  }`}
              >
                {plan.icon}
                <div className="flex flex-col gap-1" style={{ color: plan.textColor }}>
                  <h3 className="text-[16px] md:text-[20px] font-semibold">{plan.title}</h3>
                  <p className="text-[12px] md:text-[14px] font-normal">{plan.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Button
          onClick={next}
          className="mt-10 lg:mt-0 py-[1.4rem] w-[90%] mx-auto hover:bg-primaryColor bg-[#6AB240] text-white font-medium text-[16px] md:text-[20px]"
        >
          {t.goalSetup.button_view_plan}
        </Button>
      </div>
      <div className="flex-1 h-full  hidden lg:flex">
        <img
          src="/plantemplate.svg"
          alt="plantemplate"
          className="rounded-[32px] h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default PlanTemplates;
