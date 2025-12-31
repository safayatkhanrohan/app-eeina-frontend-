/**
 * QuickStats Component
 *
 * Displays key statistics about the platform
 * Used in community stats section for logged-out users
 */

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ChefHat, Users, Globe, Star } from 'lucide-react';

interface QuickStatsProps {
  language: string;
}

/**
 * Quick stats data
 */
const QUICK_STATS = [
  { label: 'Recipes', value: '50K+', icon: ChefHat, color: 'bg-blue-500' },
  { label: 'Chefs', value: '12K+', icon: Users, color: 'bg-purple-500' },
  { label: 'Countries', value: '150+', icon: Globe, color: 'bg-green-500' },
  { label: 'Reviews', value: '1M+', icon: Star, color: 'bg-yellow-500' },
];

export const QuickStats: React.FC<QuickStatsProps> = ({ language }) => {
  return (
    <Card>
      <CardContent className="p-6">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          {language === 'ar' ? 'لماذا تنضم إلى مجتمعنا؟' : 'Why Join Our Community?'}
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {QUICK_STATS.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              {/* Icon Container */}
              <div
                className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              {/* Value */}
              <div className="font-bold text-2xl text-gray-900">{stat.value}</div>

              {/* Label */}
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/signup">
            <Button className="bg-primaryColor hover:bg-[#1c9a40] text-white">
              {language === 'ar' ? 'انضم إلينا اليوم' : 'Join Us Today'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
