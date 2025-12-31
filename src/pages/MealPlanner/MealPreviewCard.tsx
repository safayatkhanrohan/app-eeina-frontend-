import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Link } from 'react-router-dom';
import { getMealItemLink } from './helper';
import { Badge } from '@/components/ui/badge';
import { Fire, Fish, Plus, Toast, Water } from '@/assets';

interface MealPreviewCardProps {
  meal: any;
  displayName: string;
  onRemove: (id: string) => void;
  onAddMeal: () => void;
  onViewAll?: () => void;
  showViewAllButton?: boolean;
}

export const MealPreviewCard = ({
  meal,
  displayName,
  onRemove,
  onAddMeal,
  onViewAll,
  showViewAllButton = false,
}: MealPreviewCardProps) => {
  const { t, language } = useLanguage();

  return (
    <Card className="gap-5 pb-2 !rounded-t-[16px]">
      <div className="relative">
        <Link to={getMealItemLink(meal)} className="flex-shrink-0">
          <img
            src={meal.image}
            alt={meal.name}
            className="object-cover w-full h-48 rounded-[16px]"
          />
        </Link>

        <div className="top-3 left-3 absolute flex items-center gap-1 sm:gap-3 flex-wrap">
          <Badge className=" bg-[#C2E66E] hover:bg-[#C2E66E] text-[10px] lg:text-[11px] text-[#272932] font-medium">
            {displayName}
          </Badge>
          <Badge className=" bg-white hover:bg-white text-[10px] lg:text-[11px] text-[#272932] font-medium">
            <Fire /> {Math.round(meal.calories)} kcal
          </Badge>
          <Badge
           onClick={onAddMeal}
            className="cursor-pointer flex justify-center items-center gap-1 bg-[#C2E66E] hover:bg-[#C2E66E] text-[10px] lg:text-[11px] text-[#272932] font-medium"
          >
            <span>{language == 'ar' ? ' أضف وجبة' : 'Add a meal '}</span>
            <Plus />
          </Badge>
        </div>
      </div>
      <div className="flex flex-col items-start gap-3 p-5 ">
        <div className="flex justify-center items-center gap-3">
          <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
            <Toast width={'12px'} height={'12px'} />{' '}
            <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
              {Math.round(meal.carbs)} {t.meal_planner.unit_g}
            </span>
          </div>
          <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
            <Fish width={'12px'} height={'12px'} />{' '}
            <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
              {Math.round(meal.protein)} {t.meal_planner.unit_g}
            </span>
          </div>
          <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
            <Water width={'12px'} height={'12px'} />{' '}
            <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
              {Math.round(meal.fat)}
              {t.meal_planner.unit_g}
            </span>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col !w-full gap-2 ">
          <Link to={getMealItemLink(meal)} className="flex-shrink-0">
            <h3 className="text-[#272932] text-[12px] md:text-[14px] font-semibold">{meal.name}</h3>
          </Link>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-5 w-full">
            <Button
              onClick={() => onRemove(meal.id)}
              className="flex-1 hover:bg-[#C2E66E] bg-[#C2E66E] text-[#272932] font-normal text-[12px]"
            >
              {language == 'ar' ? 'حذف الوجبة' : 'Remove meal'}
            </Button>
             {showViewAllButton && (
            <Button
               onClick={onViewAll}
              className="flex-1 hover:bg-[#C2E66E] bg-[#C2E66E] text-[#272932] font-normal text-[12px]"
            >
              {language == 'ar' ? 'عرض جميع الوجبات' : 'View all meals'}
            </Button>
             )}
          </div>
        </div>
      </div>
    </Card>
  );
};
