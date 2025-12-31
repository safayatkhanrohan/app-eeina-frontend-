import { useState } from 'react';
import { PageHeaderWithSearch } from '../../components/common/PageHeaderWithSearch';
import { useDebounce } from 'use-debounce';
import { useLanguage } from '../../contexts/LanguageContext';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useGetFoodQuery } from '../../redux/Features/Food/foodApi';
import { BookOpen, Search } from 'lucide-react';
import { RecipiSkeleton } from '../../components/ui/skeletons/RecipiSkeleton';
import { FoodGrid } from '../../components/Food/FoodGrid';

export const ProcessedFood = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const {
    allData: FoodData,
    isLoading,
    isFetching,
    lastElementRef,
    totalCount,
    hasMore,
  } = useInfiniteScroll(useGetFoodQuery, { q: debouncedSearchTerm }, 4);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8  mb-[3rem] md:mb-[4rem] lg:mb-0">
        {/* Page Header */}
        <PageHeaderWithSearch
          title={language == 'ar' ? 'الأغذية المُصنَّعة' : 'Processed Food'}
          description={
            language == 'ar'
              ? 'استكشف مجموعة متنوعة من الأغذية المُصنَّعة وفوائدها'
              : 'Explore a variety of Food and their benefits.'
          }
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchPlaceHolder={language == 'ar' ? 'ابحث عن...' : 'Search Processed Food ...'}
          Icon={BookOpen}
          ResultsCount={totalCount}
          fulteredResults={FoodData.length}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <RecipiSkeleton key={i} variant="grid" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {FoodData.map((food, index) => (
                <FoodGrid
                  key={`${food._id}-${index}`}
                  food={food}
                  ref={index === FoodData.length - 1 && hasMore ? lastElementRef : null}
                />
              ))}
            </div>

            {/* Loading more indicator */}
            {hasMore && (
              <div ref={lastElementRef} className="p-4 text-center">
                {isFetching && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <RecipiSkeleton key={i} variant="grid" />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* No results message */}
            {FoodData.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {language == 'ar' ? 'لا توجد بيانات طعام ' : 'No Processed Food found'}
                </h3>
                <p className="text-gray-500">{t.common.notFoundDusc}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
