import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { useGetTrendingRecipeQuery } from '../../../redux/Features/Recipe/RecipeApi';
import { useNormalizedRecipes } from '../../../hooks/normalizeRecipes';
import { useAppSelector } from '../../../hooks/hook';
import { useLikes } from '../../../hooks/useLikes';
import { GridView } from '../../../components/Recipe/GridView';
import { useSave } from '../../../hooks/useSave';
import { useEffect, useState } from 'react';

export const TrendingRecipesSection = () => {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetTrendingRecipeQuery({ page, limit: 16 });
  const [trendingRecipes, setTrendingRecipes] = useState<any[]>([]);
  const currentUser = useAppSelector((state) => state.auth.user);
  const normalizedRecipes = useNormalizedRecipes(trendingRecipes);
  const userId = currentUser?._id;
  const { likes, handleToggleLike } = useLikes(normalizedRecipes, userId);
  const { Save, handleToggleSave } = useSave(normalizedRecipes, userId);

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (data?.data?.docs) {
      setTrendingRecipes((prevRecipes) => [...prevRecipes, ...data.data.docs]);
    }
  }, [data]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t.home.trending_recipes}</h2>
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
          recipes={trendingRecipes}
          language={language}
          likes={likes}
          handleToggleLike={handleToggleLike}
          save={Save}
          handleToggleSave={handleToggleSave}
          columns={4}
          pageName="TrendingRecipe"
        />
      )}
      <div className="flex justify-center mt-6">
        <Button variant="outline" onClick={onLoadMore} disabled={isLoading}>
          Load More
        </Button>
      </div>
      ,
    </div>
  );
};
