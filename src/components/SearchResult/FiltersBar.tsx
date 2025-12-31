import { useLanguage } from '../../contexts/LanguageContext';

type Tab = 'all' | 'recipes' | 'processedFood' | 'ingredients';

interface Props {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export const FiltersBar = ({ activeTab, onChange }: Props) => {
  const { language } = useLanguage();
  const tabs: { key: Tab; label: string }[] = [
    { key: 'all', label: language == 'ar' ? 'الكل' : 'All' },
    { key: 'recipes', label: language == 'ar' ? 'الوصفات' : 'Recipes' },
    { key: 'processedFood', label: language == 'ar' ? 'الأغذية المُصنَّعة' : 'Processed Food' },
    { key: 'ingredients', label: language == 'ar' ? 'المكونات' : 'Ingredients' },
  ];
  return (
    <div className="flex justify-start gap-4 mb-3 flex-wrap mt-[3rem] sm:mt-0">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === tab.key ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
