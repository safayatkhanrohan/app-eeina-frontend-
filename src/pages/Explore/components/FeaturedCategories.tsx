import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Card, CardContent } from '../../../components/ui/card';
import { Category } from '../types';

export const FeaturedCategories = ({ categories }: { categories: Category[] }) => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-8">
      <h2 className="text-base md:text-2xl font-bold text-gray-900 mb-6">{t.explore.featured_categories}</h2>
      {categories?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.slice(0, 4).map((category: any) => (
            <Link key={category?._id} to={`/category/${category.slug[language]}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative h-32">
                    <img
                      src={category?.image?.url || 'noimages.png'}
                      alt={category.name[language]}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg mb-1">{category.name[language]}</h3>
                    <p className="text-gray-600 text-sm">
                      {category.recipe_count} {language == 'ar' ? 'وصفة' : 'recipe'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500  font-semibold">
          {language === 'ar' ? 'لا توجد فئات مميزة حالياً' : 'No featured categories available.'}
        </p>
      )}
    </div>
  );
};
