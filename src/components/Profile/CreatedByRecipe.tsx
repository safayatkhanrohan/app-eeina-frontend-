// components/Recipes/RecipesView.tsx
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { RecipiSkeleton } from '../ui/skeletons/RecipiSkeleton';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Grid3X3, List } from 'lucide-react';
import { Input } from '../ui/input';
import { useLikes } from '../../hooks/useLikes';
import { useAppSelector } from '../../hooks/hook';
import { useNormalizedRecipes } from '../../hooks/normalizeRecipes';
import { ListView } from '../Recipe/ListView';
import { GridView } from '../Recipe/GridView';

interface RecipesViewProps {
  recipes: any[];
  language: 'en' | 'ar';
  isLoading?: boolean;
  isFetching?: boolean;
  hasMore?: boolean;
  lastElementRef?: React.Ref<HTMLDivElement>;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export const CreatedByRecipe = ({
  recipes,
  language,
  isLoading,
  isFetching,
  hasMore,
  lastElementRef,
  searchTerm,
  setSearchTerm,
}: RecipesViewProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentUser = useAppSelector((state) => state.auth.user);
  const normalizedRecipes = useNormalizedRecipes(recipes);

  const { isRTL } = useLanguage();

  const userId = currentUser?._id;

  const { likes, handleToggleLike } = useLikes(normalizedRecipes, userId);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-5">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
          />
          <Input
            placeholder={language == 'ar' ? 'ابحث عن وصفات ...' : 'Search Recipes ...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} border-gray-200 focus:border-primaryColor focus:ring-primaryColor`}
          />
        </div>
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
      {isLoading || recipes.length > 0 ? (
        <>
          <div className="block md:hidden">
            <GridView
              recipes={recipes}
              language={language}
              likes={likes}
              handleToggleLike={handleToggleLike}
              columns={3}
            />
          </div>

          <div className="hidden md:block">
            {viewMode === 'grid' ? (
              <GridView
                recipes={recipes}
                language={language}
                likes={likes}
                handleToggleLike={handleToggleLike}
                columns={3}
              />
            ) : (
              <ListView
                recipes={recipes}
                language={language}
                likes={likes}
                handleToggleLike={handleToggleLike}
              />
            )}
          </div>
          <div ref={lastElementRef} className="p-4 text-center">
            {isFetching && hasMore && (
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
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {language === 'ar'
              ? 'هذا المستخدم لم ينشئ أي وصفة بعد'
              : 'This user hasn’t created any recipes yet'}
          </h3>
        </div>
      )}
    </div>
  );
};
