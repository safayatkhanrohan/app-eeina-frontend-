import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ArrowLeft, Search, Grid3X3, List, BookOpen, Filter, X } from 'lucide-react';
import { useGetPublicRecipeQuery } from '../../redux/Features/Recipe/RecipeApi';
import { useGetCategoryBySlugQuery, useGetCategoriesQuery } from '../../redux/Features/Category/CategoryAPI';
import { useGetAllIngredientQuery } from '@/redux/Features/Ingrediant/IngrediantApi';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { RecipiSkeleton } from '../../components/ui/skeletons/RecipiSkeleton';
import { CategoryHero } from '../../components/Category';
import { GridView } from '../../components/Recipe/GridView';
import { ListView } from '../../components/Recipe/ListView';
import { analytics } from '@/utils/analytics';
import { trackIfAllowed } from '@/utils/analyticsHelper';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { FilterSection } from '../Explore/components/FilterSection';
import { IngredientFilter } from '../Explore/components/IngredientFilter';
import { Category as CategoryType, CategoryType as CategoryTypeEnum } from '../Explore/types';
import { useDebounce } from 'use-debounce';

export const Category = (): JSX.Element => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { t, isRTL, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // --- Filter States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [minTime, setMinTime] = useState<number | null>(null);
  const [maxTime, setMaxTime] = useState<number | null>(null);

  /* New State for Ingredient Search */
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [debouncedIngredientSearch] = useDebounce(ingredientSearch, 500);

  // --- Track category view ---
  useEffect(() => {
    if (categoryName) {
      trackIfAllowed(() => analytics.trackCategoryView(categoryName, categoryName));
    }
  }, [categoryName]);

  const { data: categoryDetails } = useGetCategoryBySlugQuery(categoryName as string);
  const targetCategory = categoryDetails?.data?.slug?.en || categoryName;

  // --- Data Fetching for Filters ---
  const { data: ingredientData } = useGetAllIngredientQuery({
    limit: 20,
    isFeatured: !debouncedIngredientSearch ? true : undefined,
    q: debouncedIngredientSearch || undefined,
  });

  const { data: categoriesData } = useGetCategoriesQuery({ limit: 100 });

  const getCategoryByType = (type: CategoryTypeEnum, categoriesData: CategoryType[] | undefined) => {
    if (!categoriesData) return [];
    return categoriesData.filter((cat) => cat.type === type);
  };

  const cuisines = getCategoryByType('cuisine', categoriesData?.data?.docs);
  const mealTypes = getCategoryByType('meal_type', categoriesData?.data?.docs);
  const diets = getCategoryByType('diet', categoriesData?.data?.docs);
  const ingredients = ingredientData?.data?.docs || [];

  const difficulties = [
    { key: 'beginner', label: t.recipe.beginner },
    { key: 'intermediate', label: t.recipe.intermediate },
    { key: 'advanced', label: t.recipe.advanced },
  ];

  // --- Derived Values for API ---
  const categoryFilter = [
    // We do NOT include selectedCategory here because the page IS the category
    ...selectedCuisine,
    ...selectedMealType,
    ...selectedDiet,
  ].join(', ');

  const ingredientsFilter = selectedIngredient.length > 0 ? selectedIngredient.join(',') : undefined;

  // --- Recipes Data ---
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
      category: targetCategory + (categoryFilter ? `, ${categoryFilter}` : ''), // Append other filters to the main category
      q: debouncedSearchQuery,
      difficulty: selectedDifficulty === 'All' ? undefined : selectedDifficulty,
      minTime: minTime || undefined,
      maxTime: maxTime || undefined,
      ingredients: ingredientsFilter,
    },
    8,
  );

  // --- Filter UI Renderer ---
  const handleFilterChange = (setter: any, value: any) => {
    setter(value);
  };

  const clearFilters = () => {
    setSelectedCuisine([]);
    setSelectedMealType([]);
    setSelectedDiet([]);
    setSelectedIngredient([]);
    setSelectedDifficulty('All');
    setIngredientSearch('');
    setMinTime(null);
    setMaxTime(null);
    setSearchQuery('');
  };

  const renderFilterContent = () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">
          {language === 'ar' ? 'تصفية' : 'Filters'}
        </h3>
        {(selectedCuisine.length > 0 ||
          selectedMealType.length > 0 ||
          selectedDiet.length > 0 ||
          selectedIngredient.length > 0 ||
          selectedDifficulty !== 'All' ||
          maxTime ||
          searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              {language === 'ar' ? 'مسح' : 'Clear'}
            </button>
          )}
      </div>

      <IngredientFilter
        title={language === 'ar' ? 'المكونات' : 'Ingredients'}
        items={ingredients}
        selected={selectedIngredient}
        onChange={(val) => handleFilterChange(setSelectedIngredient, val)}
        onSearchChange={setIngredientSearch}
        searchValue={ingredientSearch}
        showImage={true}
      />

      <FilterSection
        title={language === 'ar' ? 'نوع الوجبة' : 'Meal Type'}
        items={mealTypes}
        selected={selectedMealType}
        onChange={(val) => handleFilterChange(setSelectedMealType, val)}
        showImage={false}
      />

      <FilterSection
        title={language === 'ar' ? 'نظام غذائي' : 'Diet'}
        items={diets}
        selected={selectedDiet}
        onChange={(val) => handleFilterChange(setSelectedDiet, val)}
        showImage={false}
      />
      <FilterSection
        title={t.explore.cuisine}
        items={cuisines}
        selected={selectedCuisine}
        onChange={(val) => handleFilterChange(setSelectedCuisine, val)}
        showImage={false}
      />

      <div className="flex flex-col gap-3">
        <h3 className="font-normal text-[18px]">{t.explore.difficulty}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {difficulties.map(({ key, label }) => {
            const active = selectedDifficulty === key;
            return (
              <div
                key={key}
                className="border border-[#E4E6EA] rounded-full w-fit px-4 py-1 flex items-center gap-3 cursor-pointer"
              >
                <span
                  className={`text-[15px] font-normal ${active ? 'text-primaryColor font-medium' : 'text-gray-600'}`}
                  onClick={() => handleFilterChange(setSelectedDifficulty, active ? 'All' : key)}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-normal text-[18px]">
          {language === 'ar' ? 'وقت الطهي (بالدقائق)' : 'Cook time (minutes)'}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          {[15, 30, 60].map((time) => {
            const active = maxTime === time;
            return (
              <div
                key={time}
                className="border border-[#E4E6EA] rounded-full w-fit px-4 py-1 flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  if (active) {
                    setMaxTime(null);
                  } else {
                    setMaxTime(time);
                    setMinTime(null);
                  }
                }}
              >
                <span
                  className={`text-[15px] font-normal ${active ? 'text-primaryColor font-medium' : 'text-gray-600'
                    }`}
                >
                  {language === 'ar' ? `حتى ${time} دقيقة` : `Up to ${time} min`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

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

        {/* Mobile Filter Trigger */}
        <div className="lg:hidden mb-4 mt-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Filter className="w-4 h-4" />
                {language === 'ar' ? 'تصفية' : 'Filters'}
              </Button>
            </SheetTrigger>
            <SheetContent
              side={isRTL ? 'right' : 'left'}
              className="w-[300px] sm:w-[400px] overflow-y-auto"
            >
              <div className="py-4">
                {renderFilterContent()}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Sidebar Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              {/* Internal Search Bar */}
              <div className="relative mb-4">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`} />
                <Input
                  placeholder={language === 'ar' ? 'البحث...' : 'Search...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? 'pr-9' : 'pl-9'} h-10`}
                />
              </div>
              {renderFilterContent()}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* View Toggle & Count Header */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-600 font-medium">
                {t.explore.showing_results} <span className="text-primaryColor font-bold">{recipeData.length}</span> {language === 'ar' ? 'من' : 'of'}{' '}
                {totalCount} {language === 'ar' ? 'وصفة' : 'recipes'}
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-white shadow-sm text-primaryColor' : 'text-gray-500 hover:text-gray-900'}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-white shadow-sm text-primaryColor' : 'text-gray-500 hover:text-gray-900'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Recipes Grid/List */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </>
  );
};
