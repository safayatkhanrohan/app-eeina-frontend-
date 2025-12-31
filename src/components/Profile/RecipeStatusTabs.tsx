import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface RecipeStatusTabsProps {
    activeStatus: string;
    onStatusChange: (status: string) => void;
    counts?: {
        all?: number;
        draft?: number;
        pending?: number;
        published?: number;
        rejected?: number;
    };
}

export const RecipeStatusTabs = ({
    activeStatus,
    onStatusChange,
    counts,
}: RecipeStatusTabsProps) => {
    const { language } = useLanguage();

    const statuses = [
        {
            id: 'all',
            label: language === 'ar' ? 'الكل' : 'All',
            count: counts?.all,
        },
        {
            id: 'published',
            label: language === 'ar' ? 'منشور' : 'Published',
            count: counts?.published,
        },
        {
            id: 'pending',
            label: language === 'ar' ? 'قيد الانتظار' : 'Pending',
            count: counts?.pending,
        },
        {
            id: 'draft',
            label: language === 'ar' ? 'مسودة' : 'Drafts',
            count: counts?.draft,
        },
        {
            id: 'rejected',
            label: language === 'ar' ? 'مرفوض' : 'Rejected',
            count: counts?.rejected,
        },
    ];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6 no-scrollbar touch-pan-x">
            {statuses.map((status) => (
                <button
                    key={status.id}
                    onClick={() => onStatusChange(status.id)}
                    className={`
            relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
            ${activeStatus === status.id
                            ? 'text-white shadow-lg shadow-primaryColor/30'
                            : 'text-gray-600 hover:bg-gray-100 bg-white border border-gray-100'
                        }
          `}
                >
                    {activeStatus === status.id && (
                        <motion.div
                            layoutId="activeStatusTab"
                            className="absolute inset-0 bg-primaryColor rounded-full"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        {status.label}
                        {status.count !== undefined && status.count > 0 && (
                            <span
                                className={`
                  ml-1 px-1.5 py-0.5 text-[10px] rounded-full
                  ${activeStatus === status.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-100 text-gray-500'
                                    }
                `}
                            >
                                {status.count}
                            </span>
                        )}
                    </span>
                </button>
            ))}
        </div>
    );
};
