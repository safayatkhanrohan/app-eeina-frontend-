import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MealPlan } from '../types/type';

interface TodaysActivityProps {
  mealActivity: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snack: boolean;
  };
  onToggleMeal: (meal: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
  mealPlan?: MealPlan[];
}

const TodaysActivity: React.FC<TodaysActivityProps> = ({
  mealActivity,
  onToggleMeal,
  mealPlan,
}) => {
  const meals = [
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'dinner', label: 'Dinner' },
    { key: 'snack', label: 'Afternoon Snack' },
  ] as const;

  console.log('mealPlan', mealPlan);

  const completedCount = Object.values(mealActivity).filter(Boolean).length;
  const totalCount = meals.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // Circular progress calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="p-6 w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Today's Activity</h2>
          <p className="text-gray-500 text-sm">Check off meals as you eat.</p>
        </div>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">
          Daily Goal
        </span>
      </div>

      <div className="flex flex-col md:flex-row xl2:gap-8 items-center">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#F3F4F6"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#78BA54"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
            <span className="text-xs text-gray-500 font-medium">Completed</span>
          </div>
        </div>

        {/* Meal List */}
        <div className="flex-1 w-full space-y-3">
          {meals.map((meal) => {
            const isCompleted = mealActivity[meal.key];
            // Attempt to get meal name from mealPlan.
            // Adjusting access based on common patterns, assuming mealPlan might be an object with keys or array.
            // If mealPlan is the response object, we might need to dig deeper.
            // For now, let's assume mealPlan has keys matching meal.key or we display nothing.
            let mealName = '';
            if (mealPlan && Array.isArray(mealPlan)) {
              const found = mealPlan.find((m) => m.mealType === meal.key);
              if (found) {
                mealName = found.recipe?.title?.en || '';
              }
            }

            return (
              <div
                key={meal.key}
                onClick={() => onToggleMeal(meal.key)}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 group',
                  isCompleted
                    ? 'bg-green-50/50 border-green-100'
                    : 'bg-white border-transparent hover:bg-gray-50',
                )}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2 w-full">
                  <div
                    className={cn(
                      'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border transition-colors duration-200',
                      isCompleted
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 group-hover:border-gray-400 bg-white',
                    )}
                  >
                    {isCompleted && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span
                      className={cn(
                        'text-[13px] font-semibold leading-tight',
                        isCompleted
                          ? 'text-gray-500 line-through decoration-green-500/50'
                          : 'text-gray-800',
                      )}
                    >
                      {meal.label}
                    </span>
                    {mealName && (
                      <span
                        className={cn(
                          'text-xs truncate block mt-0.5 max-w-[180px] sm:max-w-[220px]',
                          isCompleted ? 'text-gray-400' : 'text-gray-500',
                        )}
                        title={mealName}
                      >
                        {mealName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default TodaysActivity;
