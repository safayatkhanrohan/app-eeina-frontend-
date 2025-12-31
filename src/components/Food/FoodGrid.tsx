import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { imageObject, localizedString } from '../../types/common';
import { Card, CardContent } from '../ui/card';
import { getLocalizedPath } from '../../lib/getLocalizedPath';
import { forwardRef } from 'react';
import { ChevronLeft, ChevronRightIcon } from 'lucide-react';
import { formatAmountNumber } from '../../lib/formatAmount';

interface FoodCardProps {
  food: {
    _id: string;
    name: { [key: string]: string };
    image: imageObject;
    slug: localizedString;
    category: string[];
    nutrition: {
      calories: { amount: number; unit: string };
      sugar: { amount: number; unit: string };
      fiber: { amount: number; unit: string };
      vitaminC: { amount: number; unit: string };
    };
  };
}

export const FoodGrid = forwardRef<HTMLDivElement, FoodCardProps>(({ food }, ref) => {
  const { t, language } = useLanguage();
  return (
    <div ref={ref} className="group">
      <Card className="hover:shadow-2xl cursor-pointer transition-all duration-300 transform group-hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative flex justify-center items-center overflow-hidden">
            <Link
              to={getLocalizedPath(
                `/processed-food/${food?.slug?.[language] || food?.slug.en}`,
                language,
              )}
              className="block relative"
            >
              <img
                src={food?.image?.url}
                alt={food?.name?.[language]}
                className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Category Badges */}
            {/* <div className="absolute top-3 left-3 flex gap-2">
              {food.category.slice(0, 2).map((cat: any) => (
                <span
                  key={cat}
                  className="px-2 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-green-800 border border-green-200 capitalize"
                >
                  {cat}
                </span>
              ))}
            </div> */}

            {/* Calories Badge */}
            <div className="absolute top-3 right-3">
              <span className="px-3 py-2 text-sm font-bold rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                {formatAmountNumber(food.nutrition.calories.amount)} {food.nutrition.calories.unit}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <Link
              to={getLocalizedPath(
                `/processed-food/${food?.slug?.[language] || food?.slug.en}`,
                language,
              )}
              className="block group/title"
            >
              <h3 className="font-bold text-center text-xl mb-3 text-gray-800 group-hover/title:text-green-600 transition-colors duration-300 line-clamp-2">
                {food.name[language]}
              </h3>
            </Link>

            {/* Nutrition Highlights */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="font-bold text-green-700 text-sm">
                  {formatAmountNumber(food.nutrition.sugar.amount)} {food.nutrition.sugar.unit}
                </div>
                <div className="text-xs text-gray-500">{t.recipe.sugar}</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="font-bold text-green-700 text-sm">
                  {formatAmountNumber(food.nutrition.fiber.amount)} {food.nutrition.fiber.unit}
                </div>
                <div className="text-xs text-gray-500">{t.recipe.fiber}</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="font-bold text-green-700 text-sm">
                  {formatAmountNumber(food.nutrition.vitaminC.amount)}{' '}
                  {food.nutrition.vitaminC.unit}
                </div>
                <div className="text-xs text-gray-500">{t.recipe.vitaminC}</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link
                to={getLocalizedPath(
                  `/processed-food/${food?.slug?.[language] || food?.slug.en}`,
                  language,
                )}
                className="mt-2 flex gap-2 w-full items-center justify-center text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                {t.common.view_details}
                {language == 'ar' ? <ChevronLeft /> : <ChevronRightIcon />}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
