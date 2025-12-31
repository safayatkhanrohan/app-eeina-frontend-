import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Utensils } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  useGetDefaultMealsQuery,
  useAddItemToMealPlanMutation,
} from '@/redux/Features/MealPlan/mealPlanApi';
import { toast } from 'sonner';

interface MealType {
  _id: string;
  name: { en: string; ar: string };
  slug: string;
  time: number;
}

interface AddToMealPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
  itemType: 'recipe' | 'processedFood' | 'ingredient';
  servingSize: number;
  servingUnit: string;
}

// Generate dates for a week starting from a given date
const getWeekDates = (startDate: Date) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Format date as yyyy-mm-dd for API
const formatDateKey = (date: Date) => {
  return date.toLocaleDateString('en-CA'); // yyyy-mm-dd
};

export const AddToMealPlanModal: React.FC<AddToMealPlanModalProps> = ({
  open,
  onOpenChange,
  itemId,
  itemType,
  servingSize,
  servingUnit,
}) => {
  const { t, language, isRTL } = useLanguage();
  const { data: mealsData, isLoading: mealsLoading } = useGetDefaultMealsQuery();
  const [addItemToMealPlan, { isLoading: isAdding }] = useAddItemToMealPlanMutation();

  // Week navigation
  const [weekOffset, setWeekOffset] = useState(0);

  // Selection state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);

  // Compute week start date (Sunday of current week + offset)
  const weekStartDate = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek + weekOffset * 7);
    start.setHours(0, 0, 0, 0);
    return start;
  }, [weekOffset]);

  // Get week dates
  const weekDates = useMemo(() => getWeekDates(weekStartDate), [weekStartDate]);

  // Meal types from API
  const mealTypes: MealType[] = mealsData?.data || [];

  const handlePrevWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
  };

  const handleDone = async () => {
    if (!selectedDate || !selectedMealType) {
      toast.error(t.meal_planner.select_day_meal_error);
      return;
    }

    try {
      await addItemToMealPlan({
        date: selectedDate,
        mealType: selectedMealType,
        itemType,
        itemId,
        servingSize,
        servingUnit,
      }).unwrap();

      toast.success(t.meal_planner.added_to_plan_success);
      onOpenChange(false);
      // Reset selections
      setSelectedDate(null);
      setSelectedMealType(null);
      setWeekOffset(0);
    } catch (error: any) {
      toast.error(error?.data?.message || t.meal_planner.something_wrong);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedDate(null);
    setSelectedMealType(null);
    setWeekOffset(0);
  };

  const dayNames =
    language === 'ar'
      ? ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthNames =
    language === 'ar'
      ? [
          'يناير',
          'فبراير',
          'مارس',
          'أبريل',
          'مايو',
          'يونيو',
          'يوليو',
          'أغسطس',
          'سبتمبر',
          'أكتوبر',
          'نوفمبر',
          'ديسمبر',
        ]
      : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl">
        <div className="p-6">
          <DialogTitle className="text-xl font-bold text-gray-900 mb-6 text-center">
            {t.meal_planner.add_to_meal_plan}
          </DialogTitle>

          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between mb-6 bg-gray-50 p-2 rounded-xl">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white hover:shadow-sm transition-all"
              onClick={isRTL ? handleNextWeek : handlePrevWeek}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </Button>

            <h2 className="text-lg font-bold text-gray-800">
              {monthNames[weekStartDate.getMonth()]} {weekStartDate.getFullYear()}
            </h2>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white hover:shadow-sm transition-all"
              onClick={isRTL ? handlePrevWeek : handleNextWeek}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          {/* 1. Calendar Grid */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1">
              {t.meal_planner.select_day}
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, index) => {
                const dateKey = formatDateKey(date);
                const isSelected = selectedDate === dateKey;
                const isToday = formatDateKey(date) === formatDateKey(new Date());

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedDate(dateKey)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      isSelected
                        ? 'bg-primaryColor border-primaryColor text-white shadow-lg shadow-primaryColor/20 transform -translate-y-1'
                        : isToday
                          ? 'bg-white border-blue-200 text-blue-700'
                          : 'bg-white border-transparent hover:bg-gray-50 text-gray-700 hover:border-gray-200'
                    }`}
                  >
                    <div
                      className={`text-xs font-medium mb-1 ${isSelected ? 'opacity-90' : 'opacity-60'}`}
                    >
                      {dayNames[date.getDay()]}
                    </div>
                    <div className="text-lg font-bold">{date.getDate()}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Meal Type Selection (New Location) */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1">
              {t.meal_planner.select_meal}
            </h3>

            {mealsLoading ? (
              <div className="text-center py-4 text-gray-400 text-sm">
                {t.meal_planner.loading_meals}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {mealTypes.map((meal) => {
                  const isSelected = selectedMealType === meal.slug;
                  return (
                    <button
                      key={meal._id}
                      onClick={() => setSelectedMealType(meal.slug)}
                      className={`
                        relative flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 transition-all duration-200
                        ${
                          isSelected
                            ? 'border-primaryColor bg-primaryColor/5 text-primaryColor font-bold'
                            : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span className="text-sm">
                        {meal.name?.[language as 'en' | 'ar'] || meal.name?.en || meal.slug}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primaryColor" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button
            onClick={handleDone}
            disabled={!selectedDate || !selectedMealType || isAdding}
            className="w-full bg-primaryColor hover:bg-primaryColor/90 text-white h-12 rounded-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primaryColor/20"
          >
            {isAdding ? t.meal_planner.adding_to_plan : t.meal_planner.confirm_add}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToMealPlanModal;
