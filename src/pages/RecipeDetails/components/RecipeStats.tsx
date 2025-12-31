import { Clock, Users, ChefHat, Star } from 'lucide-react';

interface RecipeStat {
  icon: JSX.Element;
  value: string;
  label: string;
  color: string;
  bgColor: string;
}

interface RecipeStatsProps {
  time: number;
  cuisine: string;
  servings: number;
  difficulty: string;
  language: string;
  t: any;
}

/**
 * RecipeStats Component
 *
 * Displays recipe statistics in a grid of cards
 * Shows cooking time, cuisine, servings, and difficulty level
 */
export const RecipeStats: React.FC<RecipeStatsProps> = ({
  time,
  cuisine,
  servings,
  difficulty,
  language,
  t,
}) => {
  const stats: RecipeStat[] = [
    {
      icon: <Clock className="w-5 h-5" />,
      value: `${time ?? 0} ${language === 'ar' ? 'دقائق' : 'Min'}`,
      label: `${language === 'ar' ? 'وقت الطهي' : 'Time'}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: cuisine || t.recipe.unknown,
      label: t.recipe.cuisine,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <ChefHat className="w-5 h-5" />,
      value: language === 'ar' ? `يكفي لـ ${servings}` : `${servings}`,
      label: language === 'ar' ? 'الحصة' : 'Servings',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: <Star className="w-5 h-5" />,
      value: difficulty ? t.recipe[difficulty] : t.recipe.beginner,
      label: language === 'ar' ? 'درجة الصعوبة' : 'Difficulty',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-3 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-gray-200 group"
        >
          <div
            className={`p-2.5 rounded-full ${stat.bgColor} ${stat.color} mb-2 transition-transform group-hover:scale-110`}
          >
            {stat.icon}
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            {stat.label}
          </span>
          <span className="text-[15px] font-semibold text-gray-700 mt-0.5 text-center line-clamp-1 px-1">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};
