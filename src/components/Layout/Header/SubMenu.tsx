import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

interface SubMenuProps {
  title: string;
  items: { name: string; path: string }[];
}

export const SubMenu = ({ title, items }: SubMenuProps) => {
  const { isRTL, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200); // Small delay to allow moving to submenu
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={submenuRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full bg-transparent text-gray-700 font-medium py-2 px-3 ${
          isRTL ? 'flex-row lg:flex-row-reverse' : 'flex-row'
        } rounded hover:text-primaryColor transition`}
      >
        <span className="font-bold text-sm xl:text-base">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile Submenu */}
      <ul
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {items.map((sub, i) => (
          <li key={i}>
            <Link
              to={getLocalizedPath(sub.path, language)}
              className="block px-4 py-2 text-sm text-gray-700 hover:text-primaryColor"
            >
              {sub.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Mega Menu with Gap */}
      <div
        className={`
          hidden lg:block absolute w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50
          transition-all duration-300 ease-in-out transform origin-top
          ${isRTL ? 'right-0 text-end' : 'left-0'}
          ${open ? 'opacity-100 scale-100 pointer-events-auto mt-3' : 'opacity-0 scale-95 pointer-events-none mt-2'}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Arrow indicator */}
        <div
          className={`absolute -top-2 ${isRTL ? 'right-6' : 'left-6'} w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45`}
        ></div>

        <div className="p-2 relative z-10 bg-white rounded-lg">
          <ul className="space-y-1">
            {items.map((sub, i) => {
              return (
                <li key={i}>
                  <Link
                    to={getLocalizedPath(sub.path, language)}
                    className={`flex items-center ${isRTL ? 'justify-end' : 'justify-start'} gap-3 p-3 rounded-lg hover:bg-green-50 hover:text-primaryColor transition-colors group`}
                    onClick={() => setOpen(false)}
                  >
                    <span className=" font-semibold text-sm text-gray-700 group-hover:text-primaryColor transition-colors">
                      {sub.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
