import { Eye, Star, Siren as Fire } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCount } from '@/lib/FormatCount';
interface TopTrendingRecipeSpotlightProps {
  recipe: any;
  language: string;
}

export const TopTrendingRecipe = ({ recipe, language }: TopTrendingRecipeSpotlightProps) => {
  if (!recipe) return null;
  console.log('TopTrendingRecipe', recipe);
  return (
    <Card className="mb-8 overflow-hidden mt-9 mb:mt-10">
      <CardContent className="p-0">
        <div className="relative h-80">
          <img
            src={recipe.thumbnail?.url}
            alt={recipe.title.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-6 left-6">
            <Badge className="bg-red-500 text-white flex items-center gap-2 px-4 py-2">
              <Fire className="w-4 h-4" />
              <span className="font-bold">
                #1 {language === 'ar' ? 'الأكثر رواجاً' : 'Most Trending'}
              </span>
            </Badge>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-[20px] md:text-3xl font-bold text-white mb-3">
              {language === 'ar' ? recipe.title.ar : recipe.title.en}
            </h2>
            <div className="flex items-center gap-6 text-white/90 text-sm mb-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>
                  {formatCount(recipe.viewCount)} {language == 'ar' ? 'مشاهد' : 'views'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{recipe.averageRating}</span>
              </div>
            </div>
            <Link to={`/recipe/${recipe.slug.en}`}>
              <Button className="bg-primaryColor hover:bg-[#1c9a40] text-white">
                {language === 'ar' ? 'عرض الوصفة' : 'View Recipe'}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
