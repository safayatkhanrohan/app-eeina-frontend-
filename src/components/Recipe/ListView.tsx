import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { getLocalizedPath } from '../../lib/getLocalizedPath';
import { Badge } from '../ui/badge';
import { ChefHat, Siren as Fire, Clock, Heart, Users, Eye, Bookmark, Star } from 'lucide-react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { formatCount } from '../../lib/FormatCount';
import { getTranslatedDifficulty } from '../../lib/TranslateDifficulty';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Props for the ListView component
 */
interface ListViewProps {
  /** Array of recipe objects to display */
  recipes: any[];
  /** Current language code (e.g., 'en', 'ar') */
  language: string;
  /** Object mapping recipe IDs to their like status */
  likes?: Record<string, boolean>;
  /** Handler function for toggling recipe like status */
  handleToggleLike?: (e: React.MouseEvent, id: string) => void;
  /** Name of the page using this component (affects UI variations) */
  pageName?: string;
}

/**
 * ListView Component
 *
 * Displays recipes in a horizontal list layout with thumbnail on the left and details on the right.
 * Each card shows recipe image, title, metadata (time, servings, difficulty), author info, and ratings.
 * Supports trending page variations with rank badges and additional stats.
 */
export const ListView: React.FC<ListViewProps> = ({
  recipes,
  language,
  likes,
  handleToggleLike,
  pageName,
}) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="space-y-4">
        {recipes.map((recipe, index) => (
          <Card
            key={`${recipe._id}-${index}`}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <CardContent className="p-0">
              {/* Horizontal layout: Image on left, details on right */}
              <div className="flex">
                {/* Recipe Thumbnail Section */}
                <Link
                  to={getLocalizedPath(
                    `/recipe/${recipe.slug[language] || recipe.slug.en}`,
                    language,
                  )}
                  className="block"
                >
                  <div className="relative w-48 h-32">
                    <img
                      src={recipe?.thumbnail?.url}
                      alt={recipe?.title?.[language]}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                    {/* Badges overlay (trending rank + dish type) */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {recipe.dish[0]?.name[language] && (
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {/* Trending rank badge */}
                          {pageName == 'trending' && (
                            <Badge className="bg-red-500 text-white text-xs flex items-center gap-1  w-fit">
                              <Fire className="w-2 h-2" />#{index + 1}
                            </Badge>
                          )}
                          {/* Dish type badge */}
                          <Badge
                            className=" bg-primaryColor text-white text-xs 
                                                                      inline-flex items-center justify-center w-fit whitespace-nowrap px-2 py-0.5"
                          >
                            {recipe.dish[0]?.name[language]}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Recipe Details Section */}
                <div className="flex-1 p-4 flex justify-between">
                  {/* Left side: Title, metadata, author */}
                  <div className="flex-1">
                    <Link
                      to={getLocalizedPath(
                        `/recipe/${recipe.slug[language] || recipe.slug.en}`,
                        language,
                      )}
                      className="block"
                    >
                      {/* Recipe Title with optional trending rank */}
                      <div className="flex items-center gap-2 mb-2">
                        {pageName == 'trending' && (
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">#{index + 1}</span>
                          </div>
                        )}
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primaryColor transition-colors">
                          {recipe.title[language]}
                        </h3>
                      </div>

                      {/* Recipe Metadata (Time, Servings, Difficulty, Cuisine) */}
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{recipe.servings} servings</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChefHat className="w-4 h-4" />
                          <span>{getTranslatedDifficulty(recipe.difficulty, t)}</span>
                        </div>
                        <span className="text-primaryColor font-medium">{recipe.cuisine}</span>
                      </div>

                      {/* Trending Stats (Views and Bookmarks) - only shown on trending page */}
                      {pageName == 'trending' && (
                        <div className="pb-1 flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{formatCount(recipe.viewCount)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bookmark className="w-3 h-3" />
                            <span>{formatCount(recipe.savedBy.length)}</span>
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Author Information */}
                    <Link to={getLocalizedPath(`/user/${recipe?.createdBy?._id}`, language)}>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <img
                            src={recipe.createdBy?.profilePicture?.url || '/unnamed.jpg'}
                            alt={recipe.createdBy?.firstName}
                          />
                        </Avatar>
                        <span className="text-sm text-gray-600">
                          {recipe.createdBy?.firstName + ' ' + recipe.createdBy?.lastName}
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Right side: Like button and rating */}
                  <div className="flex flex-col items-end justify-between">
                    {/* Like button (hidden on trending page) */}
                    {pageName !== 'trending' && (
                      <Button
                        onClick={(e) => handleToggleLike?.(e, recipe._id)}
                        variant="ghost"
                        size="icon"
                        className={`text-gray-600 hover:text-red-500 hover:bg-red-50${likes?.[recipe._id] ? 'text-red-500' : 'text-gray-600'}`}
                      >
                        <Heart
                          className={`w-4 h-4 ${likes?.[recipe._id] ? 'fill-red-500 text-red-500' : ''}`}
                        />
                      </Button>
                    )}

                    {/* Star Rating Display */}
                    <div className="flex items-center gap-1 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < recipe?.averageRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-gray-600">({recipe.ratingCount})</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
