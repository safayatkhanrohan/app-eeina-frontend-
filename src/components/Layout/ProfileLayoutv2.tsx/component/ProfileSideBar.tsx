import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppSelector } from '@/hooks/hook';
import { SectionKey,SubLink } from '../types';
import { getProfileSections } from '../data/profileSections';

const ProfileSideBar = () => {
  const [openSection, setOpenSection] = useState<SectionKey | null>('recipes');
  const { language, t } = useLanguage();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const toggle = (key: SectionKey) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };
  const isStatusActive = (status?: string) => {
    if (!status) return false;
    const params = new URLSearchParams(location.search);
    return params.get('status') === status;
  };
const sections = getProfileSections(language, t);

  const getLinkClass = (link: SubLink) => {
    const isActive = location.pathname + location.search === link.to;
    return `flex items-center justify-between px-3 py-2 rounded-md text-sm font-mediam transition ${
      isActive ? 'bg-[#6AB240] text-white' : 'text-gray-600 hover:bg-gray-100'
    }`;
  };

  return (
    <aside className="h-[574px] flex flex-col bg-white rounded-[24px] border border-[#E1E1E1] shadow-sm py-8 px-5 gap-8">
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        // if (section.id === 'saved') {
        //   return (
        //     <NavLink
        //       key={section.id}
        //       to="/saved"
        //       className="flex items-center justify-between text-base text-[#22212C] font-semibold px-2 py-2"
        //     >
        //       <div className="flex items-center gap-2">
        //         {section.icon}
        //         <span>{section.title}</span>
        //       </div>
        //       <span className="px-3  flex items-center justify-center rounded-[4px] bg-[#191D23] text-white text-base font-semibold">
        //         {user?.savedRecipes?.length}
        //       </span>
        //     </NavLink>
        //   );
        // }
        return (
          <div key={section.id} className="relative">
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between text-base text-[#22212C] font-semibold mb-2"
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <span>{section.title}</span>
              </div>
              <ChevronDown size={16} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="relative ml-3 space-y-3">
                <span
                  className={`absolute ${language === 'ar' ? '-right-1' : '-left-1'} top-0 bottom-0 w-[2px] bg-gray-200 rounded-full`}
                />
                {section.links.map((link) => (
                  <NavLink key={link.to} to={link.to} className={() => getLinkClass(link)}>
                    {link.label}
                    {isStatusActive(link.status) && (
                      <ChevronLeft
                        size={14}
                        className={`transition ${language === 'ar' ? 'rotate-0' : '-rotate-180'}`}
                      />
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default ProfileSideBar;
