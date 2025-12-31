import { Fire, Fish, Toast, Water } from '@/assets';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MealPlan } from '../types/type';
import { localizedString } from '@/types/common';

const MealCard = ({ meals }: { meals: MealPlan[] }) => {
  const { language } = useLanguage();

  const getLocalized = (content: localizedString) => {
    return language === 'ar' ? content.ar : content.en;
  };

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 w-full col-span-4">
        No meals found for this date.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {meals.map((meal, index) => (
        <Card key={index} className="gap-5 pb-5 !rounded-t-[16px]">
          <div className="relative h-[200px]">
            <img
              src={meal.recipe.thumbnail.url}
              alt={getLocalized(meal.recipe.title)}
              className="rounded-[16px] w-full h-full object-cover"
            />
            <div className="top-3 left-3 absolute flex items-center gap-3">
              <Badge className=" bg-[#C2E66E] text-[10px] lg:text-[11px] text-[#272932] font-medium capitalize">
                {meal.mealType}
              </Badge>
              <Badge className=" bg-white text-[10px] lg:text-[11px] text-[#272932] font-medium">
                <Fire /> {Math.round(meal.recipe.nutrition.calories.amount)} kcal
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-center gap-3 p-2 md:p-5">
            <div className="flex justify-center items-center gap-3 w-full">
              <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center gap-1 md:gap-2 py-1 md:py-2 px-1 md:px-2 flex-1">
                <Toast width={'12px'} height={'12px'} />{' '}
                <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
                  {Math.round(meal.recipe.nutrition.carbs.amount)}g
                </span>
              </div>
              <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center gap-1 md:gap-2 py-1 md:py-2 px-1 md:px-2 flex-1">
                <Fish width={'12px'} height={'12px'} />{' '}
                <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
                  {Math.round(meal.recipe.nutrition.protein.amount)}g
                </span>
              </div>
              <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center gap-1 md:gap-2 py-1 md:py-2 px-1 md:px-2 flex-1">
                <Water width={'12px'} height={'12px'} />{' '}
                <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
                  {Math.round(meal.recipe.nutrition.fat.amount)}g
                </span>
              </div>
            </div>
            <div className="flex justify-start items-start flex-col w-full">
              <h3 className="text-[#272932] text-[12px] md:text-[14px] font-semibold line-clamp-1">
                {getLocalized(meal.recipe.title)}
              </h3>
              <p className="font-medium text-[#8A8C90] text-[10px] line-clamp-2">
                {getLocalized(meal.recipe.description)}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MealCard;
