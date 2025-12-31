import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { X } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import {
  getNutrientDisplayName,
  getNutritionBgColor,
  getNutritionColor,
  categorizeNutrients,
} from '../utils/nutritionUtils';

interface AllNutrientsModalProps {
  showAllNutrients: boolean;
  setShowAllNutrients: (value: boolean) => void;
  ingredienDetailstData: any;
}

export const AllNutrientsModal = ({
  showAllNutrients,
  setShowAllNutrients,
  ingredienDetailstData,
}: AllNutrientsModalProps) => {
  const { language } = useLanguage();
  const categorizedNutrients = categorizeNutrients(ingredienDetailstData?.nutrition);

  const categoryLabels = {
    macronutrients: language === 'ar' ? 'المغذيات الكبرى' : 'Macronutrients',
    vitamins: language === 'ar' ? 'الفيتامينات' : 'Vitamins',
    minerals: language === 'ar' ? 'المعادن' : 'Minerals',
    other: language === 'ar' ? 'أخرى' : 'Other Nutrients',
  };

  const categoryColors = {
    macronutrients: 'bg-blue-50 text-blue-700 border-blue-200',
    vitamins: 'bg-green-50 text-green-700 border-green-200',
    minerals: 'bg-orange-50 text-orange-700 border-orange-200',
    other: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  if (!showAllNutrients) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white shadow-2xl border-0">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {ingredienDetailstData?.image?.url && (
                  <img
                    src={ingredienDetailstData?.image.url}
                    alt={ingredienDetailstData?.name[language]}
                    className="w-12 h-12 rounded-lg object-cover shadow-md"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {ingredienDetailstData?.name[language]} -{' '}
                    {language === 'ar' ? 'جميع العناصر الغذائية' : 'All Nutrients'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'لكل 100 جرام' : 'Per 100g serving'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAllNutrients(false)}
                className="hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(categorizedNutrients).map(([category, nutrients]) => {
                if (Object.keys(nutrients as any).length === 0) return null;

                return (
                  <div key={category} className="space-y-4">
                    <div
                      className={`px-4 py-3 rounded-lg border-2 ${
                        categoryColors[category as keyof typeof categoryColors]
                      } shadow-sm`}
                    >
                      <h4 className="text-lg font-bold flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            category === 'macronutrients'
                              ? 'bg-blue-500'
                              : category === 'vitamins'
                                ? 'bg-green-500'
                                : category === 'minerals'
                                  ? 'bg-orange-500'
                                  : 'bg-purple-500'
                          }`}
                        ></div>
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h4>
                    </div>

                    <div className="space-y-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      {Object.entries(nutrients as any).map(([key, data]: [string, any]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900 block">
                              {getNutrientDisplayName(key)}
                            </span>
                            {data?.description && (
                              <span className="text-xs text-gray-500 mt-1 block">
                                {data.description}
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-primaryColor text-lg block">
                              {typeof data?.amount === 'number'
                                ? parseFloat(data.amount.toFixed(2))
                                : data.amount}{' '}
                              {data?.unit}
                            </span>
                            {data?.percentage !== undefined && data.percentage !== null && (
                              <div
                                className={`px-2 py-1 rounded text-xs font-medium mt-1 ${getNutritionBgColor(
                                  data.percentage,
                                )} ${getNutritionColor(data.percentage)}`}
                              >
                                {data.percentage}% DV
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                {language === 'ar'
                  ? 'القيم اليومية المئوية بناءً على نظام غذائي يحتوي على 2000 سعرة حرارية'
                  : 'Percent Daily Values based on a 2,000 calorie diet'}
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                {language === 'ar'
                  ? 'قد تختلف القيم اليومية بناءً على احتياجاتك من السعرات الحرارية'
                  : 'Your daily values may be higher or lower depending on your calorie needs'}
              </p>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
