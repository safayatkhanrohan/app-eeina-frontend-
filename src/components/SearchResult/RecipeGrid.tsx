import { Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector } from '../../hooks/hook';
import { useNormalizedRecipes } from '../../hooks/normalizeRecipes';
import { useLikes } from '../../hooks/useLikes';
import { useGetPublicRecipeQuery } from '../../redux/Features/Recipe/RecipeApi';
import { GridView } from '../Recipe/GridView';
import { RecipiSkeleton } from '../ui/skeletons/RecipiSkeleton';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export const RecipeGrid = ({ debouncedQuery }: { debouncedQuery: string }) => {
  const [page, setPage] = useState(1);
  const [allRecipes, setAllRecipes] = useState<any[]>([]);
  const limit = 8;

  const { data, isFetching, isLoading } = useGetPublicRecipeQuery({
    q: debouncedQuery || undefined,
    page,
    limit,
  });
console.log("debouncedQuery",debouncedQuery)
  const currentUser = useAppSelector((state) => state.auth.user);
  const { t, language } = useLanguage();
  const userId = currentUser?._id;

  const newRecipes = data?.data?.docs || [];
  const totalRecipes = data?.data?.pagination.totalCount || 0;
  const hasMore = allRecipes.length < totalRecipes;

  // merge old and new recipes
  useEffect(() => {
    if (newRecipes.length) {
      if (page === 1) {
        setAllRecipes(newRecipes);
      } else {
        setAllRecipes((prev) => [...prev, ...newRecipes]);
      }
    }
  }, [newRecipes, page]);

  // reset recipes when search changes
  useEffect(() => {
    setPage(1);
    setAllRecipes([]);
  }, [debouncedQuery]);

  const normalizedRecipes = useNormalizedRecipes(allRecipes);
  const { likes, handleToggleLike } = useLikes(normalizedRecipes, userId);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="text-gray-600">
          {t.explore.showing_results} {normalizedRecipes.length}
          {language === 'ar' ? 'وصفة' : ' recipes'}
        </div>
      </div>

      {isLoading || allRecipes.length > 0 ? (
        <>
          <GridView
            recipes={allRecipes}
            language={language}
            likes={likes}
            handleToggleLike={handleToggleLike}
          />

          {isFetching && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
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
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{t.explore.no_recipes_found}</h3>
          <p className="text-gray-500">{t.common.notFoundDusc}</p>
        </div>
      )}
    </div>
  );
};
