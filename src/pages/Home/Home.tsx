import { useLanguage } from '../../contexts/LanguageContext';
import { HeroSection, Sidebar } from './components';
import { useAppSelector } from '../../hooks/hook';
import { TopCreatorsSection } from './components/TopCreatorsSection';
import { TrendingCategories } from './components/TrendingCategories';
import TopIngredients from './components/TopIngredients';
import { useGetCategoriesQuery } from '@/redux/Features/Category/CategoryAPI';
import RecipeForFeaturedCategories from './components/RecipeForFeaturedCategories';
import FAQ from './components/FAQ';
import { useGetTrendingRecipeQuery } from '@/redux/Features/Recipe/RecipeApi';
import { TopTrendingRecipe } from './components/TopTrendingRecipe';
import Loader from '@/components/ui/Loader';

export const Home = (): JSX.Element => {
  const { language } = useLanguage();
  const currentUser = useAppSelector((state) => state.auth.user);
  const { data: categories, isLoading } = useGetCategoriesQuery({ isFeatured: true });
  const { data: tredingRecipes, isLoading: isTrendingLoading } = useGetTrendingRecipeQuery({
    page: 1,
    limit: 9,
  });

  const isLoggedIn = !!currentUser;

  if (isLoading || isTrendingLoading) return <Loader />;
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto p-0 px-3 sm:px-6 mb-[5rem] md:mb-[4rem] lg:mb-0">
        {isLoggedIn ? (
          <TopTrendingRecipe recipe={tredingRecipes?.data?.docs?.[0]} language={language} />
        ) : (
          <HeroSection />
        )}

        <div className={`grid grid-cols-12 ${isLoggedIn ? 'gap-6' : ''}`}>
          <div
            className={`sm:py-3.5 relative ${isLoggedIn ? ' col-span-12 md:col-span-4 lg:col-span-3' : ''}`}
          >
            {isLoggedIn && <Sidebar />}
          </div>

          <div
            className={`col-span-12 sm:py-4 ${isLoggedIn ? ' md:col-span-8 lg:col-span-9' : ''}`}
          >
            {categories?.data?.docs.map((category: any) => (
              <RecipeForFeaturedCategories key={category._id} category={category} />
            ))}

            <TrendingCategories />
            <TopIngredients />
            <TopCreatorsSection />
          </div>
        </div>
      </div>
    </div>
  );
};
