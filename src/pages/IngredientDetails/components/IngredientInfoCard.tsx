import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { ShoppingCart, Info } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { NutritionFacts } from './NutritionFacts';
import { useAddItemMutation } from '@/redux/Features/Shopping List/ShoppingListApi';
import { toast } from 'sonner';

interface IngredientInfoCardProps {
  ingredienDetailstData: any;
  glycemicIndex: { value: number; level: string; color: string };
  setShowAllNutrients: (value: boolean) => void;
  hasNutrients: boolean;
}

export const IngredientInfoCard = ({
  ingredienDetailstData,
  setShowAllNutrients,
  hasNutrients,
}: IngredientInfoCardProps) => {
  const { language } = useLanguage();
  const [addIngredientToList, { isLoading }] = useAddItemMutation();

  const getGlycemicLevel = (
    giValue: number,
  ): { level: string; color: 'green' | 'yellow' | 'red' | 'gray' } => {
    if (giValue <= 55) {
      return { level: language === 'ar' ? 'منخفض' : 'Low', color: 'green' };
    } else if (giValue <= 69) {
      return { level: language === 'ar' ? 'متوسط' : 'Medium', color: 'yellow' };
    } else {
      return { level: language === 'ar' ? 'مرتفع' : 'High', color: 'red' };
    }
  };

  const giBadgeColors = {
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    red: 'bg-red-500 text-white',
    gray: 'bg-gray-500 text-white',
  };

  const handleAddToList = async () => {
    if (!ingredienDetailstData) return;

    try {
      await addIngredientToList({
        items: [
          {
            itemType: 'Ingredient',
            item: ingredienDetailstData._id,
          },
        ],
      }).unwrap();
      toast.success(
        language === 'ar'
          ? 'تمت إضافة المكون إلى قائمة التسوق الخاصة بك!'
          : 'Ingredient added to your shopping list!',
      );
    } catch (error) {
      console.error('Error adding ingredient to shopping list:', error);
    }
  };

  return (
    <div className="lg:col-span-4">
      {ingredienDetailstData ? (
        <div className="lg:col-span-4">
          <Card className="sticky top-24 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                {ingredienDetailstData?.image?.url && (
                  <div className="relative inline-block mb-4">
                    <img
                      src={ingredienDetailstData?.image.url}
                      alt={ingredienDetailstData?.name[language]}
                      className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-lg"
                    />
                  </div>
                )}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {ingredienDetailstData?.name[language]}
                </h1>

                <Badge className="bg-primaryColor text-white mb-4 text-sm py-1 px-3">
                  {ingredienDetailstData?.category[language] ?? 'Not available'}
                </Badge>
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">
                        {language === 'ar' ? 'مؤشر نسبة السكر' : 'Glycemic Index'}
                      </span>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    {ingredienDetailstData?.glycemicIndex && (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                          {ingredienDetailstData?.glycemicIndex}
                        </span>
                        <Badge
                          className={
                            giBadgeColors[
                              getGlycemicLevel(ingredienDetailstData?.glycemicIndex).color
                            ]
                          }
                        >
                          {getGlycemicLevel(ingredienDetailstData?.glycemicIndex || 0).level}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {language === 'ar'
                      ? 'مؤشر منخفض لنسبة السكر في الدم'
                      : 'Low blood sugar impact'}
                  </p>
                </div>
                {ingredienDetailstData?.description[language] && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {ingredienDetailstData?.description[language]}
                  </p>
                )}
              </div>

              <NutritionFacts
                ingredienDetailstData={ingredienDetailstData}
                hasNutrients={hasNutrients}
              />

              <div className="space-y-3">
                <Button
                  onClick={handleAddToList}
                  disabled={isLoading}
                  className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white shadow-md"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isLoading
                    ? language === 'ar'
                      ? 'جارٍ الإضافة...'
                      : 'Adding...'
                    : language === 'ar'
                      ? 'أضف إلى قائمة التسوق'
                      : 'Add to Shopping List'}
                </Button>

                {/* <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50">
                    <Heart className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'حفظ' : 'Save'}
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50">
                    <Bookmark className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'مفضلة' : 'Favorite'}
                  </Button>
                </div> */}
              </div>

              {hasNutrients && (
                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    className="text-primaryColor hover:text-[#1c9a40] hover:bg-green-50"
                    onClick={() => setShowAllNutrients(true)}
                  >
                    {language === 'ar' ? 'عرض جميع العناصر الغذائية' : 'View all nutrients'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <h2 className="text-center text-gray-500 text-xl font-semibold py-10 rounded-lg bg-white shadow-lg">
          Not Available
        </h2>
      )}
    </div>
  );
};
