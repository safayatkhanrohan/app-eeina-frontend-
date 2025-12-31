import { useState } from 'react';
import { MealItem } from '../../types/mealPlanner.types';
import { EmptyMealCard, MealCard } from './Cards';
import { getDayNames, getMonthNames } from './data';
import { formatDateKey } from './helper';

interface WeeklyMealsProps {
  formattedMealPlans: Record<string, Record<string, { meals: MealItem[]; label: string }>>;
  visibleDates: Date[];
  setSelectedDate: (date: Date) => void;
  setShowCustomMealModal: (show: boolean) => void;
  setShowAddMealItemModal: (show: boolean) => void;
  setSelectedMealType: (mealType: string) => void;
  removeItemFromMealPlan: (itemId: string) => void;
  language: string;
}

type SupportedLang = 'en' | 'ar';

export const WeeklyMeals = ({
  formattedMealPlans,
  visibleDates,
  setSelectedDate,
  setShowCustomMealModal,
  setShowAddMealItemModal,
  setSelectedMealType,
  removeItemFromMealPlan,
  language,
}: WeeklyMealsProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const dayNames = getDayNames(language as SupportedLang);
  const monthNames = getMonthNames(language as SupportedLang);

  const handleAccordionClick = (dateKey: string, date: Date) => {
    // If clicking the same accordion that's already open, close it
    if (openAccordion === dateKey) {
      setOpenAccordion(null);
    } else {
      // Otherwise, close the current one and open the new one
      setOpenAccordion(dateKey);
      setSelectedDate(date);
    }
  };

  return (
    <div className="space-y-6">
      {visibleDates.map((date) => {
        const dateKey = formatDateKey(date);
        const dayMeals = formattedMealPlans[dateKey] || {};
        const isOpen = openAccordion === dateKey;

        return (
          <details
            key={dateKey}
            className="group bg-white rounded-xl shadow p-6 open:bg-gray-50"
            open={isOpen}
          >
            <summary
              className="cursor-pointer flex justify-between items-center font-bold text-gray-900"
              onClick={(e) => {
                e.preventDefault(); // Prevent default toggle behavior
                handleAccordionClick(dateKey, date);
              }}
            >
              <span>
                {dayNames[date.getDay()]} {date.getDate()} {monthNames[date.getMonth()]}
              </span>
              <span
                className={`text-xs text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </summary>

            {isOpen && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(dayMeals).map(([mealType, { label, meals: mealList }]) => (
                  <MealCard
                    key={mealType}
                    meals={mealList}
                    mealType={mealType}
                    mealTypeLabel={label}
                    setShowAddMealItemModal={setShowAddMealItemModal}
                    setSelectedMealType={setSelectedMealType}
                    onRemove={removeItemFromMealPlan}
                    onAdd={() => {}}
                  />
                ))}

                <EmptyMealCard
                  onAdd={() => {
                    setSelectedDate(date);
                    setShowCustomMealModal(true);
                  }}
                />
              </div>
            )}
          </details>
        );
      })}
    </div>
  );
};
