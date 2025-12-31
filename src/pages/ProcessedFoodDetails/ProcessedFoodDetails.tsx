import { useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useGetFoodBySlugQuery, useGetFoodQuery } from '../../redux/Features/Food/foodApi';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { RecipiSkeleton } from '../../components/ui/skeletons/RecipiSkeleton';
import { useState } from 'react';
import { formatNutritionKey } from '../../lib/utils';
import { Badge } from '../../components/ui/badge';
import { FoodGrid } from '../../components/Food/FoodGrid';

export const ProcessedFoodDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [showAllNutrients, setShowAllNutrients] = useState(false);
  const { data: foodDetails, isLoading: foodLoading } = useGetFoodBySlugQuery(slug!);
  const foodData = foodDetails?.data;
  const formattedCategory = foodData?.category.join(',');
  console.log('food', formattedCategory);
  const {
    allData: RelatedfoodData,
    isLoading: relatedFoodLoading,
    isFetching,
    lastElementRef,
    hasMore,
  } = useInfiniteScroll(useGetFoodQuery, { category: formattedCategory }, 3);
  console.log('RelatedfoodData', RelatedfoodData);
  if (foodLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 mb-[5rem] sm:mb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
            <div className="lg:col-span-4">
              <Card>
                <CardContent className="p-6">
                  <RecipiSkeleton variant="grid" />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <RecipiSkeleton key={i} variant="grid" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!foodData) {
    return (
      <div className="min-h-screen">
        <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? ' غير موجودة' : 'Food not found'}
          </h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'رجوع' : 'Go Back'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        {/* Back Button */}
        <div className="mb-6  mt-5 sm:mt-0">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 p-0"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'رجوع' : 'Back'}
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left - Food Details */}
          <div className="lg:col-span-4">
            <Card className="sticky -top-40">
              <CardContent className="p-6">
                {/* Food Image and Basic Info */}
                <div className="text-center mb-6">
                  {foodData?.image?.url && (
                    <div className="relative inline-block mb-4">
                      <img
                        src={foodData.image.url}
                        alt={foodData.name[language] || foodData.name.en}
                        className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-lg"
                      />
                    </div>
                  )}
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {foodData.name[language] || foodData.name.en}
                  </h1>

                  {foodData.category && foodData.category.length > 0 && (
                    <Badge className="bg-primaryColor text-white mb-4">
                      {foodData.category[0] ||
                        foodData.category[0]?.[language] ||
                        foodData.category[0]?.en}
                    </Badge>
                  )}

                  {foodData.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {foodData.description[language] || foodData.description.en}
                    </p>
                  )}
                </div>

                {/* Nutrition Header */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {language === 'ar' ? 'التغذية لكل 100 جرام' : 'Nutrition per 100g'}
                  </h3>
                </div>

                {/* Nutrition Facts */}
                {foodData.nutrition ? (
                  <div className="space-y-3 mb-6">
                    {Object.entries(foodData.nutrition)
                      .slice(0, 4)
                      .map(
                        ([key, data]: [string, any]) =>
                          data?.amount !== undefined && (
                            <div
                              key={key}
                              className="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                              <span className="font-medium text-gray-700">
                                {formatNutritionKey(key, t)}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-gray-900">
                                  {data.amount} {data.unit}
                                </span>
                              </div>
                            </div>
                          ),
                      )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mb-6">
                    {language === 'ar'
                      ? 'لا توجد معلومات غذائية'
                      : 'No nutrition information available'}
                  </p>
                )}

                {/* View All Nutrients Link */}
                {foodData.nutrition && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="ghost"
                      className="text-primaryColor hover:text-[#1c9a40]"
                      onClick={() => setShowAllNutrients(true)}
                    >
                      {language === 'ar' ? 'عرض جميع العناصر الغذائية' : 'View all nutrients'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right - Related Foods */}
          <div className="lg:col-span-8">
            {/* Food Grid */}
            {relatedFoodLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(8)].map((_, i) => (
                  <RecipiSkeleton key={i} variant="grid" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {RelatedfoodData.map((food, index) => (
                    <FoodGrid
                      key={`${food._id}-${index}`}
                      food={food}
                      ref={index === RelatedfoodData.length - 1 && hasMore ? lastElementRef : null}
                    />
                  ))}
                </div>

                {/* Loading more indicator */}
                {hasMore && (
                  <div ref={lastElementRef} className="p-4 text-center">
                    {isFetching && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(4)].map((_, i) => (
                          <RecipiSkeleton key={i} variant="grid" />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* No results message */}
                {RelatedfoodData.length === 0 && !relatedFoodLoading && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      {language == 'ar' ? 'لا توجد أطعمة ذات صلة' : 'No Related foods found'}
                    </h3>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showAllNutrients && foodData.nutrition && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white shadow-2xl">
            <CardContent className="p-0">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {foodData?.image?.url && (
                      <img
                        src={foodData.image.url}
                        alt={foodData.name[language] || foodData.name.en}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {foodData.name[language] || foodData.name.en} -{' '}
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
                    className="hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="space-y-4">
                  {Object.entries(foodData.nutrition).map(
                    ([key, data]: [string, any]) =>
                      data?.amount !== undefined && (
                        <div
                          key={key}
                          className="flex items-center justify-between py-3 border-b border-gray-200"
                        >
                          <span className="font-medium text-gray-700 text-lg">
                            {formatNutritionKey(key, t)}
                          </span>
                          <span className="font-semibold text-green-600 text-lg">
                            {data.amount} {data.unit}
                          </span>
                        </div>
                      ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
