import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, Bookmark, Target } from 'lucide-react';

interface ProfileTabsProps {
    activeTab: 'recipes' | 'goals' | 'saved';
    onTabChange: (tab: 'recipes' | 'goals' | 'saved') => void;
}

export const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
    const { language } = useLanguage();

    const tabs = [
        {
            id: 'recipes',
            label: language === 'ar' ? 'وصفاتي' : 'My Recipes',
            icon: BookOpen,
        },
        {
            id: 'goals',
            label: language === 'ar' ? 'أهدافي' : 'My Goals',
            icon: Target,
        },
        {
            id: 'saved',
            label: language === 'ar' ? 'المحفوظات' : 'Saved',
            icon: Bookmark,
        },
    ] as const;

    return (
        <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-8 flex gap-1 sm:gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id as any)}
                    className={`
            relative flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300
            ${activeTab === tab.id ? 'text-primaryColor' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
          `}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="activeProfileTab"
                            className="absolute inset-0 bg-primaryColor/10 rounded-xl border border-primaryColor/20"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <tab.icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 relative z-10 ${activeTab === tab.id ? 'fill-current' : ''
                            }`}
                    />
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    );
};
