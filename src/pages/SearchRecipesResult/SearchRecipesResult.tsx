import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { RecipeGrid } from '../../components/SearchResult/RecipeGrid';
import { FiltersBar } from '../../components/SearchResult/FiltersBar';
import { FoodProcessedGrid } from '../../components/SearchResult/FoodProcessedGrid';
import { IngredientsGrid } from '../../components/SearchResult/IngredientsGrid';
import { analytics } from '@/utils/analytics';
import { trackIfAllowed } from '@/utils/analyticsHelper';

export const SearchRecipesResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [activeTab, setActiveTab] = useState<'all' | 'recipes' | 'processedFood' | 'ingredients'>(
    'all',
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  // Track search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
       trackIfAllowed(() =>analytics.trackSearch(debouncedQuery, undefined, { tab: activeTab }));
    }
  }, [debouncedQuery, activeTab]);

  // Track tab change
  const handleTabChange = (tab: 'all' | 'recipes' | 'processedFood' | 'ingredients') => {
    setActiveTab(tab);
     trackIfAllowed(() =>analytics.trackTabChange(`search_${tab}`));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        <FiltersBar activeTab={activeTab} onChange={handleTabChange} />
        {(activeTab === 'all' || activeTab === 'recipes') && (
          <RecipeGrid debouncedQuery={debouncedQuery} />
        )}
        {(activeTab === 'all' || activeTab === 'processedFood') && (
          <FoodProcessedGrid debouncedQuery={debouncedQuery} />
        )}
        {(activeTab === 'all' || activeTab === 'ingredients') && (
          <IngredientsGrid debouncedQuery={debouncedQuery} />
        )}
      </div>
    </div>
  );
};
