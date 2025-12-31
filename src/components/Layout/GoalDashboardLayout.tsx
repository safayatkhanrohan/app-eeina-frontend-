import { Navigate, Outlet } from 'react-router-dom';
import GoalsDashboardSideBar from './GoalsDashboardSideBar/GoalsDashboardSideBar';
import { Header } from './Header';
import MobileGoalsTopBar from './GoalsDashboardSideBar/MobileGoalsTopBar';
import { useGetGoalsQuery } from '@/redux/Features/Goals/GoalsApi';
import Loader from '../ui/Loader';

const GoalDashboardLayout: React.FC = () => {
  const { data, isLoading, isError } = useGetGoalsQuery({ status: 'In Progress' });

  if (isLoading) {
    return <Loader className="bg-white" />;
  }

  if (isError || !data || data?.data?.length === 0) {
    return <Navigate to="goals-setup" replace />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* <GoalsDashboardHeader /> */}
      <Header />
      <div className="block lg:hidden w-full mt-10">
        <MobileGoalsTopBar />
      </div>
      <div className="flex flex-1 overflow-hidden max-w-6xl xl2:max-w-7xl mx-auto">
        <div className="hidden lg:flex">
          <GoalsDashboardSideBar />
        </div>

        <main className="flex flex-col flex-1 p-6 mb-3 pb-20 overflow-y-auto bg-[#FAFAFA]">
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default GoalDashboardLayout;
