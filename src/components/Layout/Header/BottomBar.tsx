import {
  Home,
  Compass,
  Bookmark,

  Plus,
  
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import type { User as AuthUser } from '@/types/Auth/Auth';
import { Button } from '@/components/ui/button';



// Types (assuming these are defined elsewhere as per your original code)

interface NavItem {
  name: string;
  path: string;
}

interface MobileBottomNavProps {
  getLocalizedPath: (path: string) => string;
  activeLink: string;
  setActiveLink: (path: string) => void;
  isRTL: boolean;
  t: any;
  currentUser: AuthUser | null;
  handleNavClick: (item: NavItem) => string;
  setIsMoreOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeLink,
  setActiveLink,
  isRTL,
  t,
  currentUser,
  handleNavClick,

  setIsMoreOpen,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileDropdownOpen && !target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);
  const navIcons: Record<string, React.ReactNode> = {
    [t.nav.home]: <Home size={24} />,
    [t.nav.recipes]: <Compass size={24} />,
    [t.nav.create_recipe]: <Plus size={26} />, // Slightly larger icon for create recipe
    [t.nav.saved]: <Bookmark size={24} />,
  };

  // Main navigation items (5 items) - create-recipe in 3rd position, planner moved to more menu
  const mainNavItems : NavItem[] = [ // Home, recipes, Create Recipe, Saved
    { name: t.nav.home, path: '/' },
    { name: t.nav.recipes, path: '/recipes' },
    { name: t.nav.create_recipe, path: '/create-recipe' }, 
    { name: t.nav.saved, path: '/savedrecipes' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 
       bg-white border-t border-gray-200 shadow-lg z-50 safe-area-inset-bottom"
      >
        <div
          className={`flex justify-between items-center px-1 py-2 sm:py-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {mainNavItems.map((item, index) => {
            // check if this plus or not
            const isCenterButton =
              item.path === '/create-recipe' || item.name === t.nav.create_recipe;

            return (
              <div key={index} className="relative flex-1 flex justify-center">
                {isCenterButton ? (
                  <div className="absolute -top-5">
                    <Link
                      to={handleNavClick(item)}
                      onClick={() => {
                        setActiveLink(item.path);
                        setIsMoreOpen(false);
                      }}
                      className="bg-primaryColor text-white rounded-full w-10 h-10 sm:w-14 sm:h-14  
                 flex items-center justify-center shadow-lg hover:bg-[#1b943f] transition-all duration-200 active:scale-95"
                    >
                      <Plus size={30} strokeWidth={3} />
                    </Link>
                  </div>
                ) : (
                  <Link
                    to={handleNavClick(item)}
                    onClick={() => {
                      setActiveLink(item.path);
                      setIsMoreOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-200 ${
                      activeLink === item.path
                        ? 'text-primaryColor'
                        : 'text-gray-600 hover:text-primaryColor'
                    }`}
                  >
                    {navIcons[item.name]}
                  </Link>
                )}
              </div>
            );
          })}
          {/* User Profile or Auth */}
          <div className="flex-1 flex justify-center">
            {currentUser ? (
              <div className="relative profile-dropdown">
                <Link to="/profile">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="User profile"
                  >
                    <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden">
                      <img
                        src={currentUser.image?.url || '/unnamed.jpg'}
                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
                      />
                    </div>
                  </button>
                </Link>
              </div>
            ) : (
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="bg-none text-xs h-9">
                    {t.nav.login || 'Login'}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add padding to main content to account for fixed elements */}
      <style>{`
        .safe-area-inset-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        .safe-area-inset-top {
          padding-top: env(safe-area-inset-top);
        }
      `}</style>
    </>
  );
};