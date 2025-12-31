import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ArrowLeft, Search, Grid3X3, List, BookOpen } from 'lucide-react';
import { useGetPublicRecipeQuery } from '../../redux/Features/Recipe/RecipeApi';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { RecipiSkeleton } from '../../components/ui/skeletons/RecipiSkeleton';
import { CategoryHero } from '../../components/Category';
import { GridView } from '../../components/Recipe/GridView';
import { ListView } from '../../components/Recipe/ListView';
import { analytics } from '@/utils/analytics';
import { trackIfAllowed } from '@/utils/analyticsHelper';

export const Category = (): JSX.Element => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { t, isRTL, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Track category view
  useEffect(() => {
    if (categoryName) {
       trackIfAllowed(() =>analytics.trackCategoryView(categoryName, categoryName));
    }
  }, [categoryName]);

  const difficulties = [
    { key: 'All', label: t.common.All },
    { key: 'beginner', label: t.recipe.beginner },
    { key: 'intermediate', label: t.recipe.intermediate },
    { key: 'advanced', label: t.recipe.advanced },
  ];

  const {
    allData: recipeData,
    isLoading,
    isFetching,
    lastElementRef,
    totalCount,
    hasMore,
  } = useInfiniteScroll(
    useGetPublicRecipeQuery,
    {
      category: categoryName,
      q: searchQuery,
      difficulty: difficultyFilter === 'All' ? undefined : difficultyFilter,
    },
    8,
  );
  console.log('categoryName', categoryName);

  return (
    <>
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        {/* Back Button */}
        <div className="mb-6  mt-5 sm:mt-0">
          <Link to="/recipes">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 p-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'رجوع إلى الاستكشاف' : 'Back to Explore'}
            </Button>
          </Link>
        </div>

        {/* Category Hero */}
        <CategoryHero recipeDataLength={totalCount} />

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search
                className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
              />
              <Input
                placeholder={language === 'ar' ? 'البحث في الوصفات...' : 'Search recipes...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} border-gray-200 focus:border-primaryColor focus:ring-primaryColor`}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Difficulty Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  {language === 'ar' ? 'الصعوبة:' : 'Difficulty:'}
                </span>
                {difficulties.map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={difficultyFilter === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDifficultyFilter(key)}
                    className={
                      difficultyFilter === key
                        ? 'bg-primaryColor hover:bg-[#1c9a40] text-white'
                        : 'border-gray-200 hover:border-primaryColor hover:text-primaryColor'
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              {t.explore.showing_results} {recipeData.length} {language === 'ar' ? 'من' : 'of'}{' '}
              {totalCount} {language === 'ar' ? 'وصفة' : 'recipes'}
              {searchQuery && ` ${language === 'ar' ? 'تطابق' : 'matching'} "${searchQuery}"`}
            </div>
          </div>
        </div>

        {/* Recipes Grid/List */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <RecipiSkeleton key={i} />
            ))}
          </div>
        )}
        {!isLoading && recipeData.length > 0 ? (
          <>
            <div className="block md:hidden">
              <GridView recipes={recipeData} language={language} />
            </div>

            <div className="hidden md:block">
              {viewMode === 'grid' ? (
                <GridView recipes={recipeData} language={language} />
              ) : (
                <ListView recipes={recipeData} language={language} />
              )}
            </div>
          </>
        ) : (
          !isLoading && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {t.explore.no_recipes_found}
              </h3>
              <p className="text-gray-500">{t.explore.adjust_filters}</p>
            </div>
          )
        )}

        {/* Load More */}
        {hasMore && (
          <div ref={lastElementRef} className="text-center mt-8">
            <Button variant="outline" className="px-8" disabled={isFetching}>
              {isFetching ? 'Loading...' : language === 'ar' ? 'تحميل المزيد' : 'Load More Recipes'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
