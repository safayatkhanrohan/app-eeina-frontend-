import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGetFoodQuery } from '../../redux/Features/Food/foodApi';
import { FoodGrid } from '../Food/FoodGrid';
import { RecipiSkeleton } from '../ui/skeletons/RecipiSkeleton';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

export const FoodProcessedGrid = ({ debouncedQuery }: { debouncedQuery: string }) => {
  const [page, setPage] = useState(1);
  const [allFood, setAllFood] = useState<any[]>([]);
  const limit = 8;

  const { data, isFetching, isLoading } = useGetFoodQuery({
    q: debouncedQuery || undefined,
    page,
    limit,
  });

  const { language, t } = useLanguage();

  const newFood = data?.data?.docs || [];
  const totalFood = data?.data?.pagination?.totalCount || 0;
  const hasMore = allFood.length < totalFood;

  // Merge fetched pages
  useEffect(() => {
    if (newFood.length) {
      if (page === 1) {
        setAllFood(newFood);
      } else {
        setAllFood((prev) => [...prev, ...newFood]);
      }
    }
  }, [newFood, page]);

  // Reset when query changes
  useEffect(() => {
    setPage(1);
    setAllFood([]);
  }, [debouncedQuery]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-8 text-gray-600">
        {t.common.show} {allFood.length}{' '}
        {language === 'ar' ? 'الأغذية المُصنَّعة' : 'Processed Food'}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <RecipiSkeleton key={i} variant="grid" />
          ))}
        </div>
      ) : allFood.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allFood.map((food) => (
              <FoodGrid key={food._id} food={food} />
            ))}
          </div>

          {isFetching && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {[...Array(4)].map((_, i) => (
                <RecipiSkeleton key={i} variant="grid" />
              ))}
            </div>
          )}

          {hasMore && !isFetching && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                size="lg"
                className="px-8 py-3 text-base font-semibold border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-colors"
              >
                {language === 'ar' ? 'تحميل المزيد' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {language === 'ar' ? 'لا توجد أطعمة ذات صلة' : 'No Related Foods Found'}
          </h3>
          <p className="text-gray-500">{t.common.notFoundDusc}</p>
        </div>
      )}
    </div>
  );
};
