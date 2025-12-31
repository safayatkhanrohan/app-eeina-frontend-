import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGetUserRecipeQuery } from '@/redux/Features/Recipe/RecipeApi';
import { useLikes } from '@/hooks/useLikes';
import { useSave } from '@/hooks/useSave';
import { useAppSelector } from '@/hooks/hook';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { RecipiSkeleton } from '@/components/ui/skeletons/RecipiSkeleton';
import { RecipeCard } from '@/components/Shared/RecipeCard';

const MyRecipes = () => {
  const { language } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
    const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

  // const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const limit = 6;
  const { data, isLoading } = useGetUserRecipeQuery({
    page,
    limit,
    status: statusFilter !== 'all' ? statusFilter : undefined,
  });

  const UserRecipeData = data?.data?.docs || [];
  const totalPages = data?.data?.pagination?.totalPages || 1;
  console.log('UserRecipeData', UserRecipeData);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const userId = user?._id;
  const { likes, handleToggleLike } = useLikes(UserRecipeData, userId);
  const { Save, handleToggleSave } = useSave(UserRecipeData, userId);

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <RecipiSkeleton key={i} variant="grid" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {UserRecipeData.map((recipe: any, index: number) => (
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

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-8"
          />

          {UserRecipeData?.length === 0 && !isLoading && (
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
          )}
        </>
      )}
    </div>
  );
};

export default MyRecipes;
