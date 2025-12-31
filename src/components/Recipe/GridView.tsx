import { Link } from 'react-router-dom';
import {
  Heart,
  Siren as Fire,
  Clock,
  Users,
  ChefHat,
  Bookmark,
  Eye,
  Star,
  ShoppingCart,
  Loader2,
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar } from '../ui/avatar';
import { formatTimeLocalized } from '../../lib/formatTimeLocalized';
import { getLocalizedPath } from '../../lib/getLocalizedPath';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslatedDifficulty } from '../../lib/TranslateDifficulty';
import { useAddToList } from '@/hooks/useAddToList';

/**
 * Props for the GridView component
 */
interface GridViewProps {
  /** Array of recipe objects to display */
  recipes: any[];
  /** Current language code (e.g., 'en', 'ar') */
  language: string;
  /** Object mapping recipe IDs to their like status */
  likes?: Record<string, boolean>;
  /** Object mapping recipe IDs to their saved status */
  save?: Record<string, boolean>;
  /** Handler function for toggling recipe like status */
  handleToggleLike?: (e: React.MouseEvent, id: string) => void;
  /** Handler function for toggling recipe save status */
  handleToggleSave?: (e: React.MouseEvent, id: string) => void;
  /** Number of columns for the grid layout (1-4) */
  columns?: 1 | 2 | 3 | 4;
  /** Name of the page using this component (affects UI variations) */
  pageName?: string;
  /** Handler for loading more recipes */
  onLoadMore?: () => void;
  /** Whether there are more recipes to load */
  hasMore?: boolean;
  /** Whether more recipes are currently loading */
  isLoading?: boolean;
}

/**
 * GridView Component
 *
 * Displays recipes in a responsive grid layout with customizable columns.
 * Supports different UI variations based on the page context (trending, ingredients, etc.).
 * Features include: like/save functionality, recipe stats, ratings, and author information.
 */
export const GridView: React.FC<GridViewProps> = ({
  recipes,
  language,
  likes,
  handleToggleLike,
  columns = 4,
  pageName,
  onLoadMore,
  hasMore,
  isLoading = false,
}) => {
  // Define responsive grid classes based on column count
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns];

  const { t } = useLanguage();

  const { handleAddToList } = useAddToList();
  const handleAddIngredients = async (recipe: any) => {
    if (!recipe) return;
    console.log('recsssssipe', recipe);
    handleAddToList({
      itemType: 'Ingredient',
      items: recipe.ingredients.map((ing: any) => ({
        item: ing.ingredient._id,
        quantity: ing.quantity,
        unit: ing.unit,
      })),
      recipeId: recipe._id,
      language,
    });
  };
  console.log('ress', recipes);
  return (
    <>
      <div className={`grid ${gridClass} gap-6`}>
        {recipes?.map((recipe: any, index) => (
          <Card
            key={`${recipe._id}-${index}`}
            className="group cursor-pointer rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primaryColor/30 transition-all duration-300 bg-white overflow-hidden h-full flex flex-col"
          >
            <CardContent className="p-0 flex flex-col h-full">
              {/* Recipe Image Section */}
              <div className="relative overflow-hidden aspect-[3/2]">
                <Link
                  to={getLocalizedPath(
                    `/recipe/${recipe.slug[language] || recipe.slug.en}`,
                    language,
                  )}
                  className="block w-full h-full"
                >
                  <img
                    src={recipe?.thumbnail?.url}
                    alt={recipe.title?.[language]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Top-left badges (trending rank or dish type) */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-8">
                    {recipe.dish?.[0]?.name?.[language] && (
                      <Badge className="bg-white/90 backdrop-blur-sm text-primaryColor hover:bg-white border-none shadow-sm font-bold px-2 py-0.5 text-xs">
                        {recipe.dish[0]?.name[language]}
                      </Badge>
                    )}
                  </div>
                </Link>

                {/* Like button (different styles based on page type) */}

                <div className="absolute top-2 right-2 flex flex-col gap-2 z-8">
                  <Button
                    onClick={(e) => handleToggleLike?.(e, recipe._id)}
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-full shadow-sm backdrop-blur-md transition-all duration-300 ${
                      likes?.[recipe._id]
                        ? 'bg-white text-red-500 hover:bg-red-50'
                        : 'bg-white/80 text-gray-600 hover:bg-white hover:text-primaryColor'
                    }`}
                  >
                    <Heart className={`w-4 h-4  ${likes?.[recipe._id] ? 'fill-current' : ''}`} />
                  </Button>
                  {pageName == 'IngredientsDetails' && (
                    <button
                      type="button"
                      onClick={() => handleAddIngredients(recipe)}
                      className={`h-8 w-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-sm backdrop-blur-md text-primaryColor transition-all duration-300`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Recipe Details Section */}
              <div className="p-3 flex flex-col flex-1">
                <Link
                  to={getLocalizedPath(
                    `/recipe/${recipe.slug[language] || recipe.slug.en}`,
                    language,
                  )}
                  className="block mb-2"
                >
                  {/* Recipe Title */}
                  <h3
                    className="font-bold text-base text-gray-900 group-hover:text-primaryColor transition-colors line-clamp-2 leading-snug mb-2"
                    title={recipe.title[language]}
                  >
                    {recipe.title[language]}
                  </h3>

                  {/* Recipe Metadata (Time, Servings, Difficulty) */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primaryColor" />
                      <span> {formatTimeLocalized(recipe.time)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-primaryColor" />
                      <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-3.5 h-3.5 text-primaryColor" />
                      <span>{getTranslatedDifficulty(recipe.difficulty, t)}</span>
                    </div>
                  </div>
                </Link>

                {/* Author and Rating/Save Section */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                  {/* Author Information */}
                  <Link
                    to={getLocalizedPath(`/user/${recipe?.createdBy?._id}`, language)}
                    className="group/author flex items-center gap-2"
                  >
                    <Avatar className="w-6 h-6 border border-white shadow-sm ring-1 ring-gray-100">
                      <img
                        src={recipe.createdBy?.profilePicture?.url || '/unnamed.jpg'}
                        alt={recipe.createdBy?.firstName}
                        className="object-cover"
                      />
                    </Avatar>
                    <span className="text-xs font-medium text-gray-600 group-hover/author:text-primaryColor transition-colors truncate max-w-[100px]">{`${recipe.createdBy?.firstName} ${recipe.createdBy?.lastName}`}</span>
                  </Link>

                  {/* Save Button or Star Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900 text-xs">
                      {recipe?.averageRating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {onLoadMore && hasMore && (
        <div className="flex justify-center mt-10">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="outline"
            className="rounded-full px-8 py-6 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-all duration-300 font-bold text-base shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</span>
              </div>
            ) : (
              <span>{language === 'ar' ? 'عرض المزيد' : 'Load More'}</span>
            )}
          </Button>
        </div>
      )}
    </>
  );
};
