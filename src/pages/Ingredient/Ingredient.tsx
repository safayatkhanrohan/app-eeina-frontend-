import { BookOpen, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';
import { useGetAllIngredientQuery } from '../../redux/Features/Ingrediant/IngrediantApi';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { IngrediantGridView } from '../../components/Ingrediant/IngrediantGridView';
import { PageHeaderWithSearch } from '../../components/common/PageHeaderWithSearch';
import { RecipiSkeleton } from '../../components/ui/skeletons/RecipiSkeleton';

export const Ingredient = () => {
  const { t, language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const {
    allData: IngrediantData,
    isLoading,
    isFetching,
    lastElementRef,
    hasMore,
    totalCount,
  } = useInfiniteScroll(useGetAllIngredientQuery, 4);

  const filteredIngredients = IngrediantData.filter((ingrediant) => {
    const matchesSearch =
      ingrediant.name[language]?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      ingrediant.name?.en?.toLowerCase().includes(searchTerm?.toLowerCase());
    return matchesSearch;
  });
  console.log(filteredIngredients);
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        {/* Page Header */}
        <PageHeaderWithSearch
          title={language == 'ar' ? 'المكونات' : 'Ingrediant'}
          description={
            language == 'ar'
              ? 'استكشف مجموعة متنوعة من المكونات وفوائدها'
              : 'Explore a variety of Ingrediant and their benefits.'
          }
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchPlaceHolder={language == 'ar' ? 'ابحث عن المكونات ...' : 'Search Ingrediant ...'}
          Icon={BookOpen}
          ResultsCount={totalCount}
          fulteredResults={filteredIngredients.length}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RecipiSkeleton />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredIngredients.map((Ingrediant, index) => (
                <IngrediantGridView
                  key={`${Ingrediant._id}-${index}`}
                  Ingrediant={Ingrediant}
                  ref={index === IngrediantData.length - 1 && hasMore ? lastElementRef : null}
                />
              ))}
            </div>

            {/* Loading more indicator */}
            {hasMore && (
              <div ref={lastElementRef} className="p-4 text-center">
                {isFetching && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                      <RecipiSkeleton />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* No results message */}
            {IngrediantData.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {language == 'ar' ? 'لا توجد مكونات   ' : 'No Ingrediant found'}
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
