import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { Filter, X } from 'lucide-react';

import { RecipeGrid } from '../../components/SearchResult/RecipeGrid';
import { FiltersBar } from '../../components/SearchResult/FiltersBar';
import { FoodProcessedGrid } from '../../components/SearchResult/FoodProcessedGrid';
import { IngredientsGrid } from '../../components/SearchResult/IngredientsGrid';
import { analytics } from '@/utils/analytics';
import { trackIfAllowed } from '@/utils/analyticsHelper';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGetCategoriesQuery } from '../../redux/Features/Category/CategoryAPI';
import { useGetAllIngredientQuery } from '@/redux/Features/Ingrediant/IngrediantApi';
import { Category, CategoryType } from '../Explore/types';
import { FilterSection } from '../Explore/components/FilterSection';
import { IngredientFilter } from '../Explore/components/IngredientFilter';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { Button } from '../../components/ui/button';

export const SearchRecipesResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [activeTab, setActiveTab] = useState<'all' | 'recipes' | 'processedFood' | 'ingredients'>(
    'all',
  );

  // --- Filter State (Ported from Explore.tsx) ---
  const { t, language, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
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

  // --- Data Fetching for Filters ---
  const { data: ingredientData } = useGetAllIngredientQuery({
    limit: 20,
    isFeatured: !debouncedIngredientSearch ? true : undefined,
    q: debouncedIngredientSearch || undefined,
  });

  const { data: categoriesData } = useGetCategoriesQuery({ limit: 100 });

  const getCategoryByType = (type: CategoryType, categoriesData: Category[] | undefined) => {
    if (!categoriesData) return [];
    return categoriesData.filter((cat) => cat.type === type);
  };

  const dishes = getCategoryByType('dish', categoriesData?.data?.docs);
  const cuisines = getCategoryByType('cuisine', categoriesData?.data?.docs);
  const mealTypes = getCategoryByType('meal_type', categoriesData?.data?.docs);
  const diets = getCategoryByType('diet', categoriesData?.data?.docs);
  const ingredients = ingredientData?.data?.docs || [];

  // --- Helpers ---
  const handleFilterChange = (setter: any, value: any) => {
    setter(value);
  };

  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedCuisine([]);
    setSelectedMealType([]);
    setSelectedDiet([]);
    setSelectedIngredient([]);
    setSelectedDifficulty('All');
    setIngredientSearch('');
    setMinTime(null);
    setMaxTime(null);
  };

  const difficulties = [
    { key: 'beginner', label: t.recipe.beginner },
    { key: 'intermediate', label: t.recipe.intermediate },
    { key: 'advanced', label: t.recipe.advanced },
  ];

  // --- Analytics ---
  const [debouncedQuery] = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) {
      trackIfAllowed(() => analytics.trackSearch(debouncedQuery, undefined, { tab: activeTab }));
    }
  }, [debouncedQuery, activeTab]);

  const handleTabChange = (tab: 'all' | 'recipes' | 'processedFood' | 'ingredients') => {
    setActiveTab(tab);
    trackIfAllowed(() => analytics.trackTabChange(`search_${tab}`));
  };

  // --- Derived Values for API ---
  const categoryFilter = [
    ...selectedCategory,
    ...selectedCuisine,
    ...selectedMealType,
    ...selectedDiet,
  ].join(', ');

  const ingredientsFilter = selectedIngredient.length > 0 ? selectedIngredient.join(',') : undefined;

  // --- Filter UI Renderer ---
  const renderFilterContent = () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">
          {language === 'ar' ? 'تصفية' : 'Filters'}
        </h3>
        {(selectedCategory.length > 0 ||
          selectedCuisine.length > 0 ||
          selectedMealType.length > 0 ||
          selectedDiet.length > 0 ||
          selectedIngredient.length > 0 ||
          selectedDifficulty !== 'All' ||
          maxTime) && (
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

      <FilterSection
        title={t.explore.category}
        items={dishes}
        selected={selectedCategory}
        onChange={(val) => handleFilterChange(setSelectedCategory, val)}
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


  const showFilters = activeTab === 'all' || activeTab === 'recipes';

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        <FiltersBar activeTab={activeTab} onChange={handleTabChange} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Sidebar for Desktop - Only show if Recipes tab is active */}
          {showFilters && (
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                {renderFilterContent()}
              </div>
            </div>
          )}

          {/* Mobile Filter Trigger - Only show if Recipes tab is active */}
          {showFilters && (
            <div className="lg:hidden mb-4">
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
          )}

          {/* Main Content Area */}
          <div className={`${showFilters ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
            {(activeTab === 'all' || activeTab === 'recipes') && (
              <RecipeGrid
                debouncedQuery={debouncedQuery}
                category={categoryFilter}
                difficulty={selectedDifficulty === 'All' ? undefined : selectedDifficulty}
                minTime={minTime || undefined}
                maxTime={maxTime || undefined}
                ingredients={ingredientsFilter}
              />
            )}
            {(activeTab === 'all' || activeTab === 'processedFood') && (
              <FoodProcessedGrid debouncedQuery={debouncedQuery} />
            )}
            {(activeTab === 'all' || activeTab === 'ingredients') && (
              <IngredientsGrid debouncedQuery={debouncedQuery} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
