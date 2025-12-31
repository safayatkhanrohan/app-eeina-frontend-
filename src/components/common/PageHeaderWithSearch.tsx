import { Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../ui/input';
interface PageHeaderWithSearchProps {
  title: string;
  Icon: React.ElementType;
  description?: string;
  searchTerm: string;
  searchPlaceHolder: string;
  setSearchTerm: (value: string) => void;
  ResultsCount: number;
  fulteredResults: number;
}

export const PageHeaderWithSearch = ({
  title,
  Icon,
  description,
  searchTerm,
  setSearchTerm,
  searchPlaceHolder,
  ResultsCount,
  fulteredResults,
}: PageHeaderWithSearchProps) => {
  const { isRTL, language } = useLanguage();

  return (
    <>
      <div className="mb-8  mt-5 sm:mt-0">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-8 h-8 text-primaryColor" />
          <h1 className="text-[20px] md:text-3xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search
            className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
          />
          <Input
            type="text"
            placeholder={searchPlaceHolder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} border-gray-200 focus:border-primaryColor focus:ring-primaryColor`}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-600">
        {language == 'ar' ? 'عرض' : 'Showing'} {fulteredResults} {language == 'ar' ? 'من' : ' of'}{' '}
        {ResultsCount} {title}
      </div>
    </>
  );
};
