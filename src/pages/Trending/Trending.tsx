import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ArrowLeft, Search, TrendingUp, Siren as Fire, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetTrendingRecipeQuery } from '../../redux/Features/Recipe/RecipeApi';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useDebounce } from 'use-debounce';

import { RecipiSkeleton } from '../../components/ui/skeletons/RecipiSkeleton';
import { GridView } from '../../components/Recipe/GridView';
import { TopTrendingRecipe } from '../../components/Trending';

export const Trending = (): JSX.Element => {
  const { t, isRTL, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const {
    allData: trendingRecipes,
    isLoading,
    isFetching,
    lastElementRef,
    totalCount,
    hasMore,
  } = useInfiniteScroll(useGetTrendingRecipeQuery, { q: debouncedQuery }, 6);

  return (
    <div className="min-h-screen">
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

        {/* Trending Hero */}
        <div className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl overflow-hidden mb-8 h-64">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex items-center justify-center text-center p-8">
            <div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-3xl md:text-4xl font-bold text-white">
                    {language === 'ar' ? 'الوصفات الرائجة' : 'Trending Recipes'}
                  </h1>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg ">
                    {language === 'ar'
                      ? 'الوصفات الأكثر شعبية الآن'
                      : 'The hottest recipes right now'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 text-white/80 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Fire className="w-4 h-4" />
                  <span>{language === 'ar' ? 'محدث كل ساعة' : 'Updated hourly'}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>
                    {totalCount} {language === 'ar' ? 'وصفة رائجة' : 'trending recipes'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search
                className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
              />
              <Input
                placeholder={
                  language === 'ar' ? 'البحث في الوصفات الرائجة...' : 'Search trending recipes...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} border-gray-200 focus:border-primaryColor focus:ring-primaryColor`}
              />
            </div>

            {/* Filters */}

            {/* Results Count */}
            <div className="text-gray-600">
              {t.explore.showing_results} {trendingRecipes.length} of {totalCount}{' '}
              {language === 'ar' ? 'وصفات رائجة' : 'trending recipes'}
              {searchQuery && ` ${language === 'ar' ? 'تطابق' : 'matching'} "${searchQuery}"`}
            </div>
          </div>
        </div>

        {/* TopTrendingRecipe Spotlight */}
        {trendingRecipes.length > 0 && (
          <TopTrendingRecipe recipe={trendingRecipes[0]} language={language} />
        )}

        {/* Recipes Grid */}

        {isLoading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <RecipiSkeleton key={i} variant="grid" />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="block md:hidden">
              <GridView recipes={trendingRecipes} language={language} pageName="trending" />
            </div>

            <div className="hidden md:block">
              <GridView recipes={trendingRecipes} language={language} pageName="trending" />
            </div>
            {hasMore && (
              <div ref={hasMore ? lastElementRef : null} className="p-4 text-center">
                {isFetching && hasMore && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <RecipiSkeleton key={i} variant="grid" />
                    ))}
                  </div>
                )}
              </div>
            )}
            {trendingRecipes.length == 0 && !isLoading && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {t.explore.no_recipes_found}
                </h3>
                <p className="text-gray-500">{t.explore.adjust_filters}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
