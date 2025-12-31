import { useLanguage } from '@/contexts/LanguageContext';
import { Bookmark, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export const Actions = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primaryColor" />
            {t.home.quick_actions}
          </h3>
          <div className="space-y-3">
            <Link to="/create-recipe" className="block">
              <Button className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white justify-start">
                <Plus className="w-4 h-4 mr-2" />
                {t.home.create_recipe}
              </Button>
            </Link>
            <Link to="/planner" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                {t.home.meal_planner}
              </Button>
            </Link>
            <Link to="/lists" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Bookmark className="w-4 h-4 mr-2" />
                {t.home.shopping_list}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
