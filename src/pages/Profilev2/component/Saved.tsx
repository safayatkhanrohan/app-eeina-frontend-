import { Bookmark } from '@/assets';
import { GridView } from '@/components/Recipe/GridView';
import { RecipiSkeleton } from '@/components/ui/skeletons/RecipiSkeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppSelector } from '@/hooks/hook';
import { useNormalizedRecipes } from '@/hooks/normalizeRecipes';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useLikes } from '@/hooks/useLikes';
import { useGetSaved_recipeQuery } from '@/redux/Features/Saved/savedApi';

const Saved = () => {
  const { t, language } = useLanguage();

  const {
    allData: savedRecipes,
    isLoading,
    isFetching,
    lastElementRef,
    hasMore,
  } = useInfiniteScroll(
    useGetSaved_recipeQuery,

    4,
  );

  const currentUser = useAppSelector((state) => state.auth.user);
  const normalizedRecipes = useNormalizedRecipes(savedRecipes);
  const userId = currentUser?._id;
  const { likes, handleToggleLike } = useLikes(normalizedRecipes, userId);
  return (
    <div>
      {isLoading || savedRecipes.length > 0 ? (
        <>
          <GridView
            recipes={savedRecipes}
            language={language}
            likes={likes}
            handleToggleLike={handleToggleLike}
            columns={3}
          />

          <div ref={lastElementRef} className="p-4 text-center">
            {isFetching && hasMore && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(4)].map((_, i) => (
                  <RecipiSkeleton key={i} variant="grid" />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{t.explore.no_recipes_found}</h3>
        </div>
      )}
    </div>
  );
};

export default Saved;
