import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GroupingSelect({ groupBy, setGroupBy }: any) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null); // track hover
  const ref = useRef<HTMLDivElement>(null);
  const { language, isRTL } = useLanguage();
  // close if click out
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {groupBy === 'aisle'
          ? language === 'ar'
            ? 'قسم'
            : 'Aisle'
          : language === 'ar'
            ? 'وصفة'
            : 'Recipe'}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div
          className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-32 rounded-xl shadow-lg bg-white border border-gray-100 z-50`}
        >
          <ul className="py-1 text-sm text-gray-700">
            {['aisle', 'recipe'].map((type) => (
              <li key={type}>
                <button
                  onClick={() => {
                    setGroupBy(type);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setHovered(type)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex justify-between items-center w-full px-4 py-2 hover:bg-gray-50 ${
                    groupBy === type ? 'text-orange-500 font-medium' : 'text-gray-700'
                  }
                     ${isRTL ? 'flex-row-reverse' : 'flex-row'}
                    `}
                >
                  <span>
                    {(groupBy === type || hovered === type) && (
                      <Check
                        className={`${hovered === type ? 'text-orange-300' : 'text-orange-500'}`}
                      />
                    )}
                  </span>
                  <span className={`${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                    {type === 'aisle'
                      ? language === 'ar'
                        ? 'قسم'
                        : 'Aisle'
                      : language === 'ar'
                        ? 'وصفة'
                        : 'Recipe'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
