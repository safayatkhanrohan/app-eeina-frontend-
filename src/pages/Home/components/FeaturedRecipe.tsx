/**
 * FeaturedRecipe Component
 *
 * Displays the first/featured recipe as a hero card
 * Shows recipe image, title, stats, and view button
 */

import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Play, Siren as Fire } from 'lucide-react';

interface Recipe {
  _id: string;
  title: { en: string; ar: string };
  slug: { en: string };
  thumbnail: { url: string };
  time: number;
  servings: number;
  averageRating: number;
}

interface FeaturedRecipeProps {
  recipe: Recipe;
  language: string;
  t: any;
}

export const FeaturedRecipe: React.FC<FeaturedRecipeProps> = ({ recipe, language, t }) => {
  if (!recipe) return null;

  return (
    <Card className="overflow-hidden group">
      {/* Recipe Image Container */}
      <div className="relative h-60 sm:h-80">
        <img
          src={recipe.thumbnail.url}
          alt={language === 'ar' ? recipe.title.ar : recipe.title.en}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Trending Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-red-500 text-white">
            <Fire className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {language === 'ar' ? recipe.title.ar : recipe.title.en}
          </h2>

          {/* Recipe Stats */}
          <div className="flex items-center gap-2 sm:gap-4 text-white/90 text-xs sm:text-sm mb-4 flex-wrap">
            {/* Cooking Time */}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.time} min</span>
            </div>

            {/* Servings */}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < recipe?.averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span>{recipe.averageRating?.toFixed(2)}</span>
            </div>
          </div>

          {/* View Recipe Button */}
          <Link to={`/recipe/${recipe.slug.en}`}>
            <Button className="bg-primaryColor hover:bg-[#1c9a40] text-white text-sm">
              <Play className="w-4 h-4 mr-2" />
              {t.recipe.View_Recipe}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
