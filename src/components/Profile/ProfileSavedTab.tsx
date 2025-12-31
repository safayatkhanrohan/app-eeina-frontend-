import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useGetSaved_recipeQuery } from '@/redux/Features/Saved/savedApi';
import { useNormalizedRecipes } from '@/hooks/normalizeRecipes';
import { useLikes } from '@/hooks/useLikes';
import { useAppSelector } from '@/hooks/hook';
import { GridView } from '@/components/Recipe/GridView';
import { RecipiSkeleton } from '@/components/ui/skeletons/RecipiSkeleton';
import { Bookmark, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

export const ProfileSavedTab = () => {
    const { language, isRTL, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

    const {
        allData: savedRecipes,
        isLoading,
        isFetching,
        lastElementRef,
        hasMore,
    } = useInfiniteScroll(
        useGetSaved_recipeQuery,
        {
            q: debouncedSearchQuery,
        },
        4,
    );

    const currentUser = useAppSelector((state) => state.auth.user);
    const normalizedRecipes = useNormalizedRecipes(savedRecipes);
    const userId = currentUser?._id;
    const { likes, handleToggleLike } = useLikes(normalizedRecipes, userId);

    return (
        <div className="space-y-6">
            {/* Mini Search for Saved */}
            <div className="relative">
                <Search
                    className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
                />
                <Input
                    placeholder={t.saved.search_saved}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} border-gray-200 focus:border-primaryColor focus:ring-primaryColor bg-white`}
                />
            </div>

            {isLoading || savedRecipes.length > 0 ? (
                <>
                    <GridView
                        recipes={savedRecipes}
                        language={language}
                        likes={likes}
                        handleToggleLike={handleToggleLike}
                    />

                    <div ref={lastElementRef} className="p-4 text-center">
                        {isFetching && hasMore && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(3)].map((_, i) => (
                                    <RecipiSkeleton key={i} variant="grid" />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                !isLoading && (
                    <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Bookmark className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {t.explore.no_recipes_found}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {searchQuery ? t.explore.adjust_filters : t.saved.start_saving}
                        </p>
                    </div>
                )
            )}
        </div>
    );
};
