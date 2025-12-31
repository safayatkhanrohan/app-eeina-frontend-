import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SectionProps } from '../types';
import { useNavigate } from 'react-router-dom';
import MobileModal from './MobileModal';
import { getProfileSections } from '../data/profileSections';

const ProfileSideBarMobile = () => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<SectionProps | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const navigate = useNavigate();

  const sections = getProfileSections(language, t);
  const handleSectionClick = (section: SectionProps) => {
    setActiveSectionId(section.id);
    if (section.links && section.links.length > 1) {
      setActiveSection(section);
    } else if (section.links?.length === 1) {
      navigate(section.links[0].to);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            onClick={() => handleSectionClick(section)}
            key={section.id}
            className={`
              flex items-center cursor-pointer
              border rounded-[12px] px-2 py-3 transition
              ${activeSectionId === section.id ? 'bg-[#6AB240] text-white border-[#6AB240]' : 'bg-transparent text-[#22212C] border-[#DCDBDD]'}
            
              `}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={`shrink-0  ${activeSectionId === section.id ? 'text-white' : 'text-[#22212C]'}`}
              >
                {section.icon}
              </span>

              <span
                className={`
                    text-[12px] font-normal
                    whitespace-nowrap overflow-hidden text-ellipsis
                 ${activeSectionId === section.id ? 'text-white' : 'text-[#22212C]'}
                `}
              >
                {section.title}
              </span>
            </div>

            <ChevronDown
              size={16}
              className={`
          shrink-0 ml-2
         ${activeSectionId === section.id ? 'text-white' : 'text-[#22212C]'}
        `}
            />
          </div>
        ))}
      </div>
      {activeSection && (
        <MobileModal
          open={!!activeSection}
          onOpenChange={() => setActiveSection(null)}
          title={activeSection.title}
        >
          <div className="flex flex-col gap-3">
            {activeSection.links.map((link) => (
              <button
                key={link.to}
                onClick={() => {
                  setActiveLink(link.to);
                  navigate(link.to);
                  setActiveSection(null);
                }}
                className={`
                    text-start px-4 py-5 text-[14px] font-medium rounded-lg border
                    transition
                    ${
                      activeLink === link.to
                        ? 'bg-[#6AB240] text-white border-[#6AB240]'
                        : 'text-[#191D23] border-[#E1E1E1]'
                    }
                `}
              >
                {link.label}
              </button>
            ))}
          </div>
        </MobileModal>
      )}
    </>
  );
};

export default ProfileSideBarMobile;
