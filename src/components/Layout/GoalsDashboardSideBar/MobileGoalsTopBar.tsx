import { GoalDashboardVector1, GoalDashboardVector2, GoalDashboardVector3, GoalDashboardVector4 } from '@/assets';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { Link, useLocation } from 'react-router-dom';

const MobileGoalsTopBar = () => {
  const location = useLocation();
  const { language } = useLanguage();

  const items = [
    { icon: GoalDashboardVector1, to: getLocalizedPath('/GoalsDashboard', language) },
    { icon: GoalDashboardVector2, to: getLocalizedPath('/DashboardMealHistory', language) },
    { icon: GoalDashboardVector4, to: getLocalizedPath('/DashboardHealthSettings', language) },
  ];

  return (
    <div className="w-full flex justify-center gap-5 items-center  py-3 ">
      {items.map((item, index) => {
        const Icon = item.icon;
        const active = location.pathname === item.to;
        return (
          <Link to={item.to} key={index}>
            <Icon
              className={`w-6 h-6 transition ${
                active ? 'text-[#6AB240]' : 'text-[#999999]'
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default MobileGoalsTopBar;
