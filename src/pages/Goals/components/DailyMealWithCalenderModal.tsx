import { Fire, Fish, Toast, Water } from '@/assets';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { MealType } from '../types/type';
import { useUpdateGeneratedPlanMutation } from '@/redux/Features/Goals/GoalsApi';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useGetPublicRecipeQuery } from '@/redux/Features/Recipe/RecipeApi';
import Loader from '@/components/ui/Loader';

const mealTypeMap = {
  breakfast: {
    ar: 'الإفطار',
    en: 'Breakfast',
  },
  lunch: {
    ar: 'الغداء',
    en: 'Lunch',
  },
  dinner: {
    ar: 'العشاء',
    en: 'Dinner',
  },
  snack: {
    ar: 'وجبة خفيفة',
    en: 'Snack',
  },
};

interface ReplaceMealModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  filters: {
    maxCalories: number;
    minCalories: number;
  } | null;
  mealType: MealType;
  date: Date;
  goalId: string;
  mealId: string;
}
const DailyMealWithCalenderModal = ({
  isOpen,
  onOpenChange,
  onClose,
  filters,
  mealType,
  date,
  mealId,
  goalId,
}: ReplaceMealModalProps) => {
  const { t, language } = useLanguage();
  const [updatePlan] = useUpdateGeneratedPlanMutation();

  const {
    allData: recipes,
    isLoading,
    lastElementRef,
  } = useInfiniteScroll(
    useGetPublicRecipeQuery,
    {
      ...filters,
    },
    10,
  );

  const handleReplaceMeal = async (recipeId: string) => {
    await updatePlan({
      date: date.toISOString().split('T')[0],
      goalId,
      mealId,
      mealType,
      recipeId,
    }).unwrap();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] md:max-w-xl py-6 md:py-10 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-[24px] lg:text-[36px] font-semibold text-[#6AB240]">
            {t.goalSetup.Choosemealreplacement}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recipes?.map((recipe: any, index: number) => (
            <Card
              key={index}
              className="gap-5 pb-2 !rounded-t-[16px]"
              ref={index === recipes.length - 1 ? lastElementRef : null}
            >
              <div className="relative">
                <img
                  src={`${recipe?.thumbnail?.url}`}
                  alt={recipe?.title?.[language]}
                  className="w-full h-full rounded-[16px]"
                />
                <div className="top-3 left-3 absolute flex items-center gap-3">
                  <Badge className=" bg-[#C2E66E] text-[11px] text-[#272932] font-medium">
                    {mealTypeMap[mealType][language]}
                  </Badge>
                  <Badge className=" bg-white text-[11px] text-[#272932] font-medium">
                    <Fire /> {Math.round(recipe?.nutrition?.calories?.amount)}{' '}
                    {recipe?.nutrition?.calories?.unit}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-start lg:items-center gap-3 p-5 w-full">
                <div className="flex justify-center items-center gap-3">
                  <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center gap-2 py-2 px-2 md:px-4">
                    <Toast width={'12px'} height={'12px'} />{' '}
                    <span className="text-[11px] font-medium text-[#272932]">
                      {Math.round(recipe?.nutrition?.carbs?.amount)}{' '}
                      {recipe?.nutrition?.carbs?.unit}
                    </span>
                  </div>
                  <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center gap-2 py-2 px-2 md:px-4">
                    <Fish width={'12px'} height={'12px'} />{' '}
                    <span className="text-[11px] font-medium text-[#272932]">
                      {Math.round(recipe?.nutrition?.protein?.amount)}{' '}
                      {recipe?.nutrition?.protein?.unit}
                    </span>
                  </div>
                  <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center gap-2 py-2 px-2 md:px-4">
                    <Water width={'12px'} height={'12px'} />{' '}
                    <span className="text-[11px] font-medium text-[#272932]">
                      {Math.round(recipe?.nutrition?.fat?.amount)} {recipe?.nutrition?.fat?.unit}
                    </span>
                  </div>
                </div>
                <div className="flex justify-start items-start flex-col !w-full gap-2">
                  <h3 className="text-[#272932] text-[14px] font-semibold">
                    {recipe?.title?.[language]}
                  </h3>
                  <p className="text-[#8A8C90] font-medium text-[10px]">
                    {recipe?.description?.[language]}
                  </p>
                  <Button
                    className="w-full bg-[#6AB240] text-white text-[14px] font-medium mt-2"
                    onClick={() => handleReplaceMeal(recipe._id)}
                  >
                    {t.goalSetup.Replacebtn}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {isLoading && <Loader />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyMealWithCalenderModal;
