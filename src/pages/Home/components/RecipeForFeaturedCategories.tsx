import { GridView } from '@/components/Recipe/GridView';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppSelector } from '@/hooks/hook';
import { useLikes } from '@/hooks/useLikes';
import { useSave } from '@/hooks/useSave';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { useGetPublicRecipeQuery } from '@/redux/Features/Recipe/RecipeApi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeForFeaturedCategories = ({ category }: { category: any }) => {
  const { data, isLoading } = useGetPublicRecipeQuery({
    page: 1,
    limit: 8,
    category: category?.slug?.en,
  });
  const user = useAppSelector((state) => state.auth.user);
  const { t, language } = useLanguage();
  const recipes = data?.data?.docs || [];
  const { likes, handleToggleLike } = useLikes(recipes, user?._id);
  const { Save, handleToggleSave } = useSave(recipes, user?._id);
  console.log('recipes for category', category?.name?.en, recipes);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {category?.name?.[language]}
        </h2>
        <Link
          to={getLocalizedPath(`/category/${category?.slug?.[language]}`, language)}
          className="text-primaryColor font-semibold hover:underline"
        >
          {t.common.view_all}
        </Link>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse bg-gray-200 h-48 w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <GridView
          recipes={recipes}
          language={language}
          likes={likes}
          handleToggleLike={handleToggleLike}
          save={Save}
          handleToggleSave={handleToggleSave}
          columns={4}
          pageName="TrendingRecipe"
        />
      )}
    </div>
  );
};

export default RecipeForFeaturedCategories;
