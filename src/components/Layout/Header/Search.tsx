import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface SearchProps {
  onSearchComplete?: () => void; 
}
const Search:React.FC<SearchProps>  = ({ onSearchComplete }) => {
  const { t, isRTL, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const searchPath = getLocalizedPath(
        `/search?query=${encodeURIComponent(searchTerm.trim())}`,
        language,
      );
      navigate(searchPath);
       if (onSearchComplete) onSearchComplete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="h-full bg-gray-100 lg:!bg-white shadow-sm lg:shadow-md rounded-xl flex items-center px-3 py-2 sm:px-4 sm:py-3 w-full">
      <SearchIcon onClick={handleSearch} className={`w-4 h-4 text-gray-500 ${isRTL ? 'ml-3 order-2' : 'mr-3'}`} />
      <Input
        className={`lg:text-[#6F747F] lg-text-[16px] border-0 bg-transparent shadow-none  h-auto font-normal text-gray-700 text-xs sm:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 w-full ${isRTL ? 'text-right order-1' : 'text-left'}`}
        placeholder={t.nav.search_placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
