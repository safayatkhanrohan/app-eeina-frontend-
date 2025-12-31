import { Button } from '@/components/ui/button';
import { GoalSetupProps, UserInfo } from '../types/type';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface TargetNutrientsProps extends GoalSetupProps {
  userInfo: UserInfo;
  next: () => void;
  back?: () => void;
}

const TargetNutrients = ({ next, userInfo }: TargetNutrientsProps) => {
  const { t } = useLanguage();
  const nutrition = userInfo.goalResponse?.targetNutrition;
console.log("nutrition",userInfo)
  if (!nutrition) return null;

  const nutrientGroups = [
    {
      title: t.goalSetup.category_energy_macros,
      items: [
        { label: t.goalSetup.label_calories, value: nutrition.calories, unit: t.goalSetup.kcal },
        { label: t.goalSetup.label_protein, value: nutrition.protein, unit: t.goalSetup.gram },
        { label: t.goalSetup.label_fat, value: nutrition.fat, unit: t.goalSetup.gram },
        { label: t.goalSetup.label_carbs, value: nutrition.carbs, unit: t.goalSetup.gram },
      ],
    },
    {
      title: t.goalSetup.category_fats,
      items: [
        {
          label: t.goalSetup.label_saturated_fat,
          value: nutrition.saturatedFat,
          unit: t.goalSetup.gram,
        },
        {
          label: t.goalSetup.label_monounsaturated_fat,
          value: nutrition.monounsaturatedFat,
          unit: t.goalSetup.gram,
        },
        {
          label: t.goalSetup.label_polyunsaturated_fat,
          value: nutrition.polyunsaturatedFat,
          unit: t.goalSetup.gram,
        },
        {
          label: t.goalSetup.label_trans_fat,
          value: nutrition.transFat,
          unit: t.goalSetup.gram,
        },
      ],
    },
    {
      title: t.goalSetup.category_carbohydrates,
      items: [
        {
          label: t.goalSetup.label_net_carbs,
          value: nutrition.netCarbs,
          unit: t.goalSetup.gram,
        },
        { label: t.goalSetup.label_sugar, value: nutrition.sugar, unit: t.goalSetup.gram },
        {
          label: t.goalSetup.label_added_sugar,
          value: nutrition.addedSugar,
          unit: t.goalSetup.gram,
        },
        {
          label: t.goalSetup.label_sugar_alcohol,
          value: nutrition.sugarAlcohol,
          unit: t.goalSetup.gram,
        },
        { label: t.goalSetup.label_fiber, value: nutrition.fiber, unit: t.goalSetup.gram },
      ],
    },
    {
      title: t.goalSetup.category_cholesterol,
      items: [
        {
          label: t.goalSetup.label_cholesterol,
          value: nutrition.cholesterol,
          unit: t.goalSetup.unit_mg,
        },
      ],
    },
    {
      title: t.goalSetup.category_minerals,
      items: [
        {
          label: t.goalSetup.label_calcium,
          value: nutrition.calcium,
          unit: t.goalSetup.unit_mg,
        },
        { label: t.goalSetup.label_iron, value: nutrition.iron, unit: t.goalSetup.unit_mg },
        {
          label: t.goalSetup.label_magnesium,
          value: nutrition.magnesium,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_phosphorus,
          value: nutrition.phosphorus,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_potassium,
          value: nutrition.potassium,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_sodium,
          value: nutrition.sodium,
          unit: t.goalSetup.unit_mg,
        },
        { label: t.goalSetup.label_zinc, value: nutrition.zinc, unit: t.goalSetup.unit_mg },
      ],
    },
    {
      title: t.goalSetup.category_vitamins_fat_soluble,
      items: [
        {
          label: t.goalSetup.label_vitamin_a,
          value: nutrition.vitaminA,
          unit: t.goalSetup.unit_mcg,
        },
        {
          label: t.goalSetup.label_vitamin_d,
          value: nutrition.vitaminD,
          unit: t.goalSetup.unit_mcg,
        },
        {
          label: t.goalSetup.label_vitamin_e,
          value: nutrition.vitaminE,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_vitamin_k,
          value: nutrition.vitaminK,
          unit: t.goalSetup.unit_mcg,
        },
      ],
    },
    {
      title: t.goalSetup.category_vitamins_water_soluble,
      items: [
        {
          label: t.goalSetup.label_vitamin_c,
          value: nutrition.vitaminC,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_vitamin_b1,
          value: nutrition.vitaminB1,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_vitamin_b2,
          value: nutrition.vitaminB2,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_vitamin_b3,
          value: nutrition.vitaminB3,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_vitamin_b6,
          value: nutrition.vitaminB6,
          unit: t.goalSetup.unit_mg,
        },
        {
          label: t.goalSetup.label_vitamin_b12,
          value: nutrition.vitaminB12,
          unit: t.goalSetup.unit_mcg,
        },
      ],
    },
    {
      title: t.goalSetup.category_folate,
      items: [
        {
          label: t.goalSetup.label_folate_dfe,
          value: nutrition.folateDFE,
          unit: t.goalSetup.unit_mcg,
        },
        {
          label: t.goalSetup.label_folate_food,
          value: nutrition.folateFood,
          unit: t.goalSetup.unit_mcg,
        },
        {
          label: t.goalSetup.label_folic_acid,
          value: nutrition.folicAcid,
          unit: t.goalSetup.unit_mcg,
        },
      ],
    },
  ];

  return (
    <div className="flex justify-between items-stretch gap-5 lg:gap-16 py-16 md:h-[928px]">
      <div className=" items-center rounded-[32px] flex-1 flex flex-col h-full bg-[#FBFCFC] lg:shadow justify-start lg:justify-around px-0 md:px-10">
        <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
          <h2 className="font-semibold text-[24px] xl:text-[36px]">
            {t.goalSetup.calorie_main_title}
            <span className="text-primaryColor"> {t.goalSetup.calorie_main_highlight} </span>
            {t.goalSetup.calorie_main_text}
          </h2>

          <div className="p-0 flex flex-col gap-4">
            {/* Main Overview Card (Restored Style) */}
            <div className="p-4 flex flex-col border gap-5 border-[#00000014] rounded-[16px] bg-white">
              <div className="pb-3 flex justify-between border-b border-b-[#E1E1E2]">
                <h4 className="font-semibold text-[16px] md:text-[20px]">
                  {t.goalSetup.label_calories}
                </h4>
                <h4 className="font-semibold text-[16px] md:text-[20px]">
                  {nutrition.calories} {t.goalSetup.kcal}
                </h4>
              </div>
              <div className="pb-3 flex justify-between items-center border-b border-b-[#E1E1E2]">
                <p className="font-medium text-[16px]">{t.goalSetup.label_carbs}</p>
                <h4 className="font-semibold text-[16px]">
                  {nutrition.carbs} {t.goalSetup.gram}
                </h4>
              </div>
              <div className="pb-3 flex justify-between items-center border-b border-b-[#E1E1E2]">
                <p className="font-medium text-[16px]">{t.goalSetup.label_protein}</p>
                <h4 className="font-semibold text-[16px]">
                  {nutrition.protein} {t.goalSetup.gram}
                </h4>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium text-[16px]">{t.goalSetup.label_fat}</p>
                <h4 className="font-semibold text-[16px]">
                  {nutrition.fat} {t.goalSetup.gram}
                </h4>
              </div>
            </div>

            {/* View All Button (Dialog Trigger) */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex w-full items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-[#6AB240] hover:bg-[#6AB240]/5 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-center text-md">
                        {t.goalSetup.nutrient_view_all}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#6AB240]" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-6 bg-white rounded-2xl overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    {t.goalSetup.nutrient_modal_title}
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-1 pr-4">
                  <div className="flex flex-col gap-6">
                    {nutrientGroups.map((group, idx) => (
                      <div
                        key={idx}
                        className="p-5 flex flex-col border gap-4 border-[#00000014] rounded-[16px] bg-white"
                      >
                        <h4 className="font-bold text-[18px] text-[#6AB240] flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          {group.title}
                        </h4>
                        <div className="flex flex-col gap-3">
                          {group.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="pb-3 flex justify-between items-center border-b border-[#E1E1E2] last:border-0 last:pb-0"
                            >
                              <span className="font-medium text-[16px] text-gray-700">
                                {item.label}
                              </span>
                              <span className="font-semibold text-[16px] text-gray-900">
                                {item.value}{' '}
                                <span className="text-xs text-gray-500">{item.unit}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Button
          onClick={next}
          className="mt-10 lg:mt-0 py-[1.4rem] w-[90%] mx-auto hover:bg-primaryColor bg-[#6AB240] text-white font-medium text-[16px] md:text-[20px]"
        >
          {t.goalSetup.button_show_plan}
        </Button>
      </div>
      <div className="flex-1 h-full hidden lg:flex">
        <img
          src="/goalTarget.svg"
          alt="goalTarget"
          className="rounded-[32px] h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default TargetNutrients;
