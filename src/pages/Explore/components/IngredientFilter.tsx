import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface IngredientFilterProps {
  title: string;
  items: any[];
  selected: string[];
  onChange: (value: string[]) => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
  showImage?: boolean;
}

export const IngredientFilter = ({
  title,
  items,
  selected,
  onChange,
  onSearchChange,
  searchValue,
  showImage = false,
}: IngredientFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const { language, t } = useLanguage();
  const visibleItems = showAll || searchValue ? items : items.slice(0, 5);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-normal text-[18px]">{title}</h3>
      
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 rtl:left-auto rtl:right-3" />
        <Input
          placeholder={language === 'ar' ? 'بحث عن مكون...' : 'Search ingredient...'}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 rtl:pr-9 h-9 text-sm"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => {
            const slug = item.slug.en;
            const active = selected.includes(slug);

            return (
              <div
                key={slug}
                className={`border rounded-full w-fit px-4 py-1 flex items-center gap-2 cursor-pointer transition-all ${
                  active
                    ? 'border-primaryColor bg-primaryColor/5'
                    : 'border-[#E4E6EA] hover:border-primaryColor/30'
                }`}
                onClick={() => {
                  if (active) {
                    onChange(selected.filter((s) => s !== slug));
                  } else {
                    onChange([...selected, slug]);
                  }
                }}
              >
                {showImage && item.image?.url && (
                  <img
                    src={item.image.url}
                    alt={item.name[language]}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <span
                  className={`text-[15px] font-normal ${
                    active ? 'text-primaryColor font-medium' : 'text-gray-600'
                  }`}
                >
                  {item.name[language]}
                </span>
              </div>
            );
          })
        ) : (
           <p className="text-sm text-gray-400 italic w-full text-center py-2">
            {language === 'ar' ? 'لا توجد نتائج' : 'No ingredients found'}
          </p>
        )}

        {/* Improved Show More Logic: Only show if NOT searching and requests > 5 */}
        {!searchValue && items.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#8C8C8C] font-medium text-[14px]"
          >
            {showAll
              ? language === 'ar'
                ? 'عرض أقل'
                : 'Show Less'
              : language === 'ar'
                ? 'عرض المزيد'
                : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};
