/**
 * RecipeActivityFeed Component
 *
 * Displays a feed of recent recipes for logged-in users
 * Shows infinite scroll with recipe cards
 */

import { RecipeCard } from '@/components/Shared/RecipeCard';
import { RecipeCardSkeleton } from '@/components/ui/skeletons/RecipeCardSkeleton';

interface Recipe {
  _id: string;
  [key: string]: any;
}

interface RecipeActivityFeedProps {
  recipes: Recipe[];
  likes: Record<string, boolean>;
  saves: Record<string, boolean>;
  onToggleLike: (e: React.MouseEvent, id: string) => void;
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  isFetching: boolean;
  hasMore: boolean;
  lastElementRef: React.Ref<HTMLDivElement>;
  language: string;
  t: any;
  isLoading: boolean;
}

export const RecipeActivityFeed: React.FC<RecipeActivityFeedProps> = ({
  recipes,
  likes,
  saves,
  onToggleLike,
  onToggleSave,
  isFetching,
  hasMore,
  lastElementRef,
  language,
  t,
  isLoading,
}) => {
  return (
    <>
      {/* Section Title */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t.home.recent_activity}</h2>

        {/* Recipe Cards or Empty State */}
        {isLoading || recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={`${recipe._id}-${index}`}
              recipe={recipe}
              likes={likes}
              saves={saves}
              handleToggleLike={(e: React.MouseEvent) => onToggleLike(e, recipe._id)}
              handleToggleSave={(e: React.MouseEvent) => onToggleSave(e, recipe._id)}
            />
          ))
        ) : (
          <p className="text-gray-500 font-semibold">
            {language === 'ar' ? 'لا توجد وصفات متاحة' : 'No recipes available'}
          </p>
        )}
      </div>

      {/* Infinite Scroll Loading State */}
      <div ref={lastElementRef} className="p-4 text-center">
        {isFetching && hasMore && (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
