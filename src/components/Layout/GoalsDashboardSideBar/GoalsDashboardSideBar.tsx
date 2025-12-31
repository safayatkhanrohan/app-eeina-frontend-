import {
  GoalDashboardVector1,
  GoalDashboardVector2,
  GoalDashboardVector3,
  GoalDashboardVector4,
} from '@/assets';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ElementType;
  isActive: boolean;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, isActive, to }) => (
  <Link to={to}>
    <div
      className={`p-3 mb-3 rounded-xl cursor-pointer transition-colors ${
        isActive ? 'bg-[#6AB24038] text-[#6AB240]' : 'text-[#999999] hover:bg-gray-100'
      }`}
    >
      <Icon className={`w-6 h-6  ${isActive ? 'text-[#6AB240]' : '#999999'} `} />
    </div>
  </Link>
);

const GoalsDashboardSideBar: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const sidebarItems = [
    { icon: GoalDashboardVector1, to: getLocalizedPath('/goals-dashboard', language) },
    { icon: GoalDashboardVector2, to: getLocalizedPath('/dashboard-meal-history', language) },
    { icon: GoalDashboardVector4, to: getLocalizedPath('/dashboard-health-settings', language) },
  ];

  return (
    <div className="flex flex-col items-center w-[100px] py-6 bg-white border-r border-gray-200 flex-shrink-0">
      <div className="space-y-4">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            to={item.to}
            isActive={location.pathname === item.to}
          />
        ))}
      </div>
    </div>
  );
};

export default GoalsDashboardSideBar;
