import { useLanguage } from '../../../contexts/LanguageContext';
import {
  getNutrientDisplayName,
  getNutritionBgColor,
  getNutritionColor,
} from '../../../utils/nutrition/nutritionUtils';

interface NutritionFactsProps {
  ingredienDetailstData: any;
  hasNutrients: boolean;
}

const KEY_NUTRIENTS = new Set([
  'calories',
  'protein',
  'carbohydrates',
  'totalFat',
  'fat',
  'fiber',
  'sugars',
  'sodium',
  'potassium',
  'cholesterol',
  'vitaminA',
  'vitaminC',
  'calcium',
  'iron',
]);

export const NutritionFacts = ({ ingredienDetailstData, hasNutrients }: NutritionFactsProps) => {
  const { language } = useLanguage();
  const nutritionData = ingredienDetailstData?.nutrition;

  const keyNutrients = nutritionData
    ? Object.entries(nutritionData).filter(([key]) => KEY_NUTRIENTS.has(key))
    : [];

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'التغذية لكل 100 جرام' : 'Nutrition per 100g'}
        </h3>
      </div>

      {hasNutrients && keyNutrients.length > 0 ? (
        <div className="space-y-2 mb-6">
          {keyNutrients.map(([key, data]: [string, any]) => (
            <div
              key={key}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <span className="font-medium text-gray-700 text-sm">
                {getNutrientDisplayName(key, language)}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900 text-sm">
                  {typeof data?.amount === 'number'
                    ? parseFloat(data.amount.toFixed(2))
                    : data.amount}{' '}
                  {data?.unit}
                </span>
                {data?.percentage !== undefined && data.percentage !== null && (
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${getNutritionBgColor(
                      data.percentage,
                    )} ${getNutritionColor(data.percentage)}`}
                  >
                    {data.percentage}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
          {language === 'ar' ? 'لا توجد بيانات غذائية' : 'No nutrition data available'}
        </div>
      )}
    </>
  );
};
