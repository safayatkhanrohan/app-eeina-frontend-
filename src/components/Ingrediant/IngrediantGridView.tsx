import { forwardRef } from 'react';
import { imageObject, localizedString } from '../../types/common';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';
import { getLocalizedPath } from '../../lib/getLocalizedPath';
import { ChevronLeft, ChevronRightIcon, Eye } from 'lucide-react';
import { formatAmountNumber } from '../../lib/formatAmount';

interface IngrediantCardProps {
  Ingrediant: {
    _id: string;
    name: { [key: string]: string };
    slug: localizedString;
    category: localizedString;
    image: imageObject;
    nutrition: {
      calories: { amount: number; unit: string };
      sugar: { amount: number; unit: string };
      fiber: { amount: number; unit: string };
      vitaminC: { amount: number; unit: string };
    };
  };
}

export const IngrediantGridView = forwardRef<HTMLDivElement, IngrediantCardProps>(
  ({ Ingrediant }, ref) => {
    const { t, language } = useLanguage();
    //  const nutrition = Ingrediant.nutrition?.[0];
    console.log('Ingrediant.nutrition', Ingrediant?.category);
    return (
      <div ref={ref} className="group">
        <Card className="hover:shadow-lg cursor-pointer transition-all duration-300 transform group-hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            {/* Image Section */}
            <div className="relative flex justify-center items-center overflow-hidden">
              <Link
                to={getLocalizedPath(
                  `/ingredient/${Ingrediant?.slug?.[language] || Ingrediant?.slug.en}`,
                  language,
                )}
                className="block relative"
              >
                <img
                  src={Ingrediant?.image?.url}
                  alt={Ingrediant?.name?.[language] || Ingrediant?.name?.en}
                  className="w-full h-16 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0">
                    <Eye className="w-4 h-4 text-green-600" />
                  </div>
                </div> */}
              </Link>

              {/* Category Badges */}
              {/* <div className="absolute flex gap-1">
                <span className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-green-800 border border-green-200 capitalize">
                  {Ingrediant.category?.[language] || Ingrediant.category?.en}
                </span>
              </div> */}

              {/* Calories Badge */}
              {/* <div className="absolute top-2 left-2 ">
                <span className="px-2 py-1 text-xs font-bold rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                  {formatAmountNumber(Ingrediant.nutrition.calories.amount ?? 0)}{' '}
                  {Ingrediant.nutrition?.calories?.unit}
                </span>
              </div> */}
            </div>

            {/* Content Section */}
            <div className="p-3">
              <Link
                to={getLocalizedPath(
                  `/ingredient/${Ingrediant?.slug?.[language] || Ingrediant?.slug.en}`,
                  language,
                )}
                className="block group/title"
              >
                <h3 className="font-bold text-center text-sm mb-2 text-gray-800 group-hover/title:text-green-600 transition-colors duration-300 line-clamp-2">
                  {Ingrediant.name?.[language] ||
                    Ingrediant.name?.en ||
                    Ingrediant.slug?.[language] ||
                    Ingrediant.slug?.en}
                </h3>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);
