import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '../ui/card';
import { useAppSelector } from '@/hooks/hook';
import { BookOpen, CheckCircle2, Users, UserPlus } from 'lucide-react';

const ProfileStatsCard = () => {
  const { t, isRTL } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);

  const stats = [
    {
      label: t.profile.total_recipes,
      value: user?.totalRecipe || 0,
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: t.profile.published_recipes,
      value: user?.publishedRecipe || 0,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: t.profile.followers,
      value: user?.followerCount || 0,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: t.profile.following,
      value: user?.following?.length || 0,
      icon: UserPlus,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <CardContent className="p-0">
        <div className={`flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 ${isRTL ? 'sm:divide-x-reverse' : ''} sm:divide-x divide-gray-100`}>
          {stats.map((stat, index) => (
            <div key={index} className="flex-1 p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStatsCard;
