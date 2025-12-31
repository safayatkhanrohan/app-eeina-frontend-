import { Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { MealItem } from '../../types/mealPlanner.types';
import { Badge } from '@/components/ui/badge';
import { Fire, Fish, Plus, Toast, Water } from '@/assets';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { MealPreviewCard } from './MealPreviewCard';
import CustomCheckBox from '@/components/ui/CustomCheckBox';

export const MealCard = ({
  meals,
  mealType,
  mealTypeLabel,
  setShowAddMealItemModal,
  onRemove,
  setSelectedMealType,
}: {
  meals: MealItem[];
  mealType: string;
  mealTypeLabel?: string;
  onAdd: () => void;
  onRemove: (itemId: string) => void;
  setSelectedMealType: (mealType: string) => void;
  setShowAddMealItemModal: (show: boolean) => void;
}) => {
  const { t, language } = useLanguage();

  const [Viewallopen, setViewallopen] = useState(false);
  const displayName = mealTypeLabel || mealType;
  console.log('meals', meals);
  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4 flexxx flex-col h-full">
          {/* Meal Items */}
          {meals.length === 0 ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate capitalize">
                    {displayName}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full min-w-[20px] text-center">
                    {meals.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedMealType(mealType);
                    setShowAddMealItemModal(true);
                  }}
                  className="w-8 h-8 text-primaryColor hover:text-[#1c9a40] hover:bg-green-50 flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div
                className="h-full flex justify-center items-center gap-2 flex-col text-center py-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100/70 hover:border-gray-300 cursor-pointer transition-all duration-200"
                onClick={() => {
                  setSelectedMealType(mealType);
                  setShowAddMealItemModal(true);
                }}
              >
                <Plus className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">{t.meal_planner.no_meals_added}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {meals.slice(0, 1).map((meal, index) => (
                <MealPreviewCard
                  key={`${meal.id}-${index}`}
                  meal={meal}
                  displayName={displayName}
                  onRemove={onRemove}
                  onAddMeal={() => {
                    setSelectedMealType(mealType);
                    setShowAddMealItemModal(true);
                  }}
                  showViewAllButton
                  onViewAll={() => setViewallopen(true)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={Viewallopen} onOpenChange={setViewallopen}>
        <DialogContent className="max-w-[90%] lg:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-start text-[24px] lg:text-[36px] font-semibold text-[#6AB240]">
              {language === 'ar' ? 'جميع الوجبات' : 'All meals'}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {meals.map((meal, index) => (
              <MealPreviewCard
                key={`${meal.id}-${index}`}
                meal={meal}
                displayName={displayName}
                onRemove={onRemove}
                onAddMeal={() => {
                  setSelectedMealType(mealType);
                  setShowAddMealItemModal(true);
                }}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export const EmptyMealCard = ({ onAdd }: { onAdd: () => void }) => {
  const { t } = useLanguage();
  return (
    <Card
      className="border-2 border-dashed border-gray-300 hover:border-primaryColor transition-colors cursor-pointer min-h-[120px] sm:min-h-[140px]"
      onClick={onAdd}
    >
      <CardContent className="p-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-600">{t.meal_planner.add_custom_meal}</h4>
            <p className="text-sm text-gray-400">{t.meal_planner.add_meal_time_placeholder}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const MealItemCard = ({
  mealItem,
  onAdd,
}: {
  mealItem: any;
  onAdd: (mealItem: any) => void;
}) => {
  const { t, language } = useLanguage();

  console.log('mealItem', mealItem);
  return (
    <Card className="gap-5 pb-2 !rounded-t-[16px]">
      <div className="relative">
        <img
          src={mealItem.image}
          alt={mealItem.name}
          onClick={() => onAdd(mealItem)}
          className="object-cover w-full h-48 rounded-[16px]"
        />

        <div className="top-3 left-3 absolute flex items-center justify-between w-[90%] gap-1 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1 sm:gap-3">
            <Badge className="flex gap-1 bg-[#C2E66E] hover:bg-[#C2E66E] text-[10px] lg:text-[11px] text-[#272932] font-medium">
              <Clock className="w-3 h-3" />
              <span>{mealItem.time}</span>
            </Badge>
            <Badge className=" bg-white hover:bg-white text-[10px] lg:text-[11px] text-[#272932] font-medium">
              <Fire /> {Math.round(mealItem.calories)} kcal
            </Badge>
          </div>

          <CustomCheckBox onAdd={onAdd} mealItem={mealItem} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-3 p-5 ">
        <div className="flex justify-center items-center gap-3">
          <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
            <Toast width={'12px'} height={'12px'} />{' '}
            <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
              {Math.round(mealItem.carbs)} {t.meal_planner.unit_g}
            </span>
          </div>
          <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
            <Fish width={'12px'} height={'12px'} />{' '}
            <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
              {Math.round(mealItem.protein)} {t.meal_planner.unit_g}
            </span>
          </div>
          <div className="bg-[#DFF9A2] rounded-[8px] flex justify-center items-center md:gap-2 py-2 px-2 xl2:px-4">
            <Water width={'12px'} height={'12px'} />{' '}
            <span className="text-[10px] lg:text-[11px] font-medium text-[#272932]">
              {Math.round(mealItem.fat)}
              {t.meal_planner.unit_g}
            </span>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col !w-full gap-2 ">
          <h3 className="text-[#272932] text-[12px] md:text-[14px] font-semibold">
            {mealItem.name}
          </h3>
        </div>
      </div>
    </Card>
  );
};
