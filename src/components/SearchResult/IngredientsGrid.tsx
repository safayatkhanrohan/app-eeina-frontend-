import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGetAllIngredientQuery } from '../../redux/Features/Ingrediant/IngrediantApi';
import { IngrediantGridView } from '../Ingrediant/IngrediantGridView';
import { useLanguage } from '../../contexts/LanguageContext';
import { RecipiSkeleton } from '../ui/skeletons/RecipiSkeleton';
import { Button } from '../ui/button';

export const IngredientsGrid = ({ debouncedQuery }: { debouncedQuery: string }) => {
  const { language, t } = useLanguage();
  const [page, setPage] = useState(1);
  const [allIngredients, setAllIngredients] = useState<any[]>([]);
  const limit = 24;

  const { data, isFetching, isLoading } = useGetAllIngredientQuery({
    q: debouncedQuery || undefined,
    page,
    limit,
  });

  const newIngredients = data?.data?.docs || [];
  const totalIngredients = data?.data?.pagination?.totalCount || 0;
  const hasMore = allIngredients.length < totalIngredients;

  // merge old and new data
  useEffect(() => {
    if (newIngredients.length) {
      if (page === 1) {
        setAllIngredients(newIngredients);
      } else {
        setAllIngredients((prev) => [...prev, ...newIngredients]);
      }
    }
  }, [newIngredients, page]);

  // reset when query changes
  useEffect(() => {
    setPage(1);
    setAllIngredients([]);
  }, [debouncedQuery]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-6 text-gray-600">
        {t.common.show} {allIngredients.length} {language === 'ar' ? 'المكونات' : 'Ingredients'}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[...Array(8)].map((_, i) => (
            <RecipiSkeleton key={i} variant="grid" />
          ))}
        </div>
      ) : allIngredients.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-6">
            {allIngredients.map((ingredient) => (
              <IngrediantGridView key={ingredient._id} Ingrediant={ingredient} />
            ))}
          </div>

          {isFetching && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-6 mt-6">
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
            {language === 'ar' ? 'لا توجد مكونات' : 'No Ingredients Found'}
          </h3>
          <p className="text-gray-500">{t.common.notFoundDusc}</p>
        </div>
      )}
    </div>
  );
};
