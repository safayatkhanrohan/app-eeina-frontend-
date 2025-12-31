import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useGetUserRecipeQuery } from '@/redux/Features/Recipe/RecipeApi';
import { useLikes } from '@/hooks/useLikes';
import { useSave } from '@/hooks/useSave';
import { useAppSelector } from '@/hooks/hook';
import { RecipeCard } from '@/components/Shared/RecipeCard';
import { RecipeCardSkeleton } from '@/components/ui/skeletons/RecipeCardSkeleton';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { RecipeStatusTabs } from './RecipeStatusTabs';

export const ProfileRecipesTab = () => {
  const { language } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const {
    allData: UserRecipeData,
    isFetching,
    lastElementRef,
  } = useInfiniteScroll(
    useGetUserRecipeQuery,
    { status: statusFilter !== 'all' ? statusFilter : undefined },
    6,
  );

  const userId = user?._id;
  const { likes, handleToggleLike } = useLikes(UserRecipeData, userId);
  const { Save, handleToggleSave } = useSave(UserRecipeData, userId);

  // Calculate counts for tabs if available (optional optimization)
  // For now we just pass current status content

  return (
    <div>
      <RecipeStatusTabs
        activeStatus={statusFilter}
        onStatusChange={setStatusFilter}
        // If we had counts we would pass them here
      />

      <div className="space-y-6">
        {UserRecipeData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {UserRecipeData.map((recipe, index) => (
                <RecipeCard
                  key={`${recipe._id}-${index}`}
                  recipe={recipe}
                  likes={likes}
                  saves={Save}
                  handleToggleLike={handleToggleLike}
                  handleToggleSave={handleToggleSave}
                />
              ))}
            </div>

            <div ref={lastElementRef} className="p-4 text-center">
              {isFetching && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, i) => (
                    <RecipeCardSkeleton key={i} />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          !isFetching && (
            <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Target className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'ar'
                    ? 'لا توجد وصفات في هذه القائمة'
                    : 'No recipes found in this list'}
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  {statusFilter === 'all'
                    ? language === 'ar'
                      ? 'ابدأ بإنشاء وصفتك الأولى شاركها مع العالم'
                      : 'Start creating your recipes and share them with the world'
                    : language === 'ar'
                      ? 'جرب تغيير حالة التصفية'
                      : 'Try changing the status filter'}
                </p>
                {statusFilter === 'all' && (
                  <Link to={getLocalizedPath('/create-recipe', language)}>
                    <Button className="bg-primaryColor hover:bg-[#1c9a40]">
                      {language === 'ar' ? 'إنشاء وصفة' : 'Create Recipe'}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
