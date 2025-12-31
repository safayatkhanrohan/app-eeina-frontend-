import { useLanguage } from '../../contexts/LanguageContext';
import { MealItem } from '../../types/mealPlanner.types';
import { EmptyMealCard, MealCard } from './Cards';
import { getDayNames, getMonthNames } from './data';

interface DailyMealsProps {
  meals?: Record<string, { meals: MealItem[]; label: string }>;
  selectedDate: Date;
  setShowCustomMealModal: (show: boolean) => void;
  setSelectedMealType: (mealType: string) => void;
  setShowAddMealItemModal: (show: boolean) => void;
  removeItemFromMealPlan: (itemId: string) => void;
}

export const DailyMeals = ({
  meals,
  selectedDate,
  setShowCustomMealModal,
  setShowAddMealItemModal,
  setSelectedMealType,
  removeItemFromMealPlan,
}: DailyMealsProps) => {
  const { t, language } = useLanguage();
  const dayNames = getDayNames(language);
  const monthNames = getMonthNames(language);

  return (
    <>
      <div className="mb-4 sm:mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {dayNames[selectedDate.getDay()]} {selectedDate.getDate()}{' '}
          {monthNames[selectedDate.getMonth()]}
        </h3>
        <p className="text-sm sm:text-base text-gray-600">{t.meal_planner.plan_meals_for_day}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {Object.entries(meals || {}).map(([mealType, { label, meals: mealList }]) => (
          <MealCard
            key={mealType}
            meals={mealList}
            mealType={mealType}
            mealTypeLabel={label}
            onAdd={() => {}}
            setShowAddMealItemModal={setShowAddMealItemModal}
            setSelectedMealType={setSelectedMealType}
            onRemove={removeItemFromMealPlan}
          />
        ))}

        <EmptyMealCard onAdd={() => setShowCustomMealModal(true)} />
      </div>
    </>
  );
};
