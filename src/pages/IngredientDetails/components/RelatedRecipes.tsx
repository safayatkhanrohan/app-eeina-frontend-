import { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Button } from '../../../components/ui/button';
import { Grid3X3, List } from 'lucide-react';
import { RecipiSkeleton } from '../../../components/ui/skeletons/RecipiSkeleton';
import { GridView } from '../../../components/Recipe/GridView';
import { ListView } from '../../../components/Recipe/ListView';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { useGetPublicRecipeQuery } from '../../../redux/Features/Recipe/RecipeApi';
import { useLikes } from '../../../hooks/useLikes';
import { useAppSelector } from '../../../hooks/hook';
import { useNormalizedRecipes } from '../../../hooks/normalizeRecipes';

interface RelatedRecipesProps {
  slug: string | undefined;
}

export const RelatedRecipes = ({ slug }: RelatedRecipesProps) => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('top-rated');
  const currentUser = useAppSelector((state) => state.auth.user);

  const {
    allData: recipeData,
    totalCount,
    isLoading,
    isFetching,
    lastElementRef,
    hasMore,
  } = useInfiniteScroll(useGetPublicRecipeQuery, { q: slug }, 3);

  const normalizedRecipes = useNormalizedRecipes(recipeData);
  const userId = currentUser?._id;
  const { likes, handleToggleLike } = useLikes(normalizedRecipes, userId);

  const sortOptions = [
    { value: 'top-rated', label: language === 'ar' ? 'الأعلى تقييماً' : 'Top Rated' },
    { value: 'most-popular', label: language === 'ar' ? 'الأكثر شعبية' : 'Most Popular' },
    { value: 'newest', label: language === 'ar' ? 'الأحدث' : 'Newest' },
    { value: 'quickest', label: language === 'ar' ? 'الأسرع' : 'Quickest' },
  ];

  return (
    <div className="lg:col-span-8">
      {isLoading && recipeData.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <RecipiSkeleton key={i} variant={viewMode === 'grid' ? 'grid' : 'list'} />
          ))}
        </div>
      )}
      {(!isLoading && !slug) || normalizedRecipes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-medium py-10 bg-white rounded-lg shadow-lg">
          {language === 'ar' ? 'لا يوجد وصفات' : 'No recipes available'}
        </p>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === 'ar'
                    ? `في ${recipeData?.length} وصفة`
                    : `In ${recipeData?.length} Recipes`}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'وصفات تستخدم هذا المكون'
                    : 'Recipes that use this ingredient'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-primaryColor focus:ring-primaryColor text-sm bg-white shadow-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {language === 'ar' ? 'ترتيب حسب: ' : 'Sort by: '}
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1 shadow-sm">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={
                      viewMode === 'grid'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'hover:bg-white/50 text-gray-600'
                    }
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={
                      viewMode === 'list'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'hover:bg-white/50 text-gray-600'
                    }
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <>
            <div className="block md:hidden">
              <GridView
                recipes={recipeData}
                language={language}
                likes={likes}
                handleToggleLike={handleToggleLike}
                columns={3}
                pageName="IngredientsDetails"
              />
            </div>

            <div className="hidden md:block">
              {viewMode === 'grid' ? (
                <GridView
                  recipes={recipeData}
                  language={language}
                  likes={likes}
                  handleToggleLike={handleToggleLike}
                  columns={3}
                  pageName="IngredientsDetails"
                />
              ) : (
                <ListView
                  recipes={recipeData}
                  language={language}
                  likes={likes}
                  handleToggleLike={handleToggleLike}
                />
              )}
              <div ref={lastElementRef} className="p-4 text-center">
                {isFetching && hasMore && recipeData.length < totalCount && (
                  <>
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                          <RecipiSkeleton key={i} variant="grid" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <RecipiSkeleton key={i} variant="list" />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
};
