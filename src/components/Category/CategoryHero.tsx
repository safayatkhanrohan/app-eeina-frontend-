import { useParams } from 'react-router-dom';
import { useGetCategoryBySlugQuery } from '../../redux/Features/Category/CategoryAPI';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpen } from 'lucide-react';

export const CategoryHero = ({ recipeDataLength }: { recipeDataLength: string }) => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { language } = useLanguage();
  const { data } = useGetCategoryBySlugQuery(categoryName as string);
  const categoryData = data?.data;
  console.log(categoryData);
  return (
    <div className="relative h-64 rounded-3xl overflow-hidden mb-8">
      <img
        src={categoryData?.image?.url}
        alt={categoryData?.name[language]}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 w-12 h-12 bg-primaryColor rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-[20px] md:text-3xl font-bold text-white">{categoryData?.name[language]}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <span>
            {recipeDataLength} {language === 'ar' ? 'وصفة' : 'recipes'}
          </span>
          <span>•</span>
          {language === 'ar' ? 'محدث كل ساعة' : 'Updated Hourly'}
        </div>
      </div>
    </div>
  );
};
