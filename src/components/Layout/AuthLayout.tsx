import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    // <div className="bg-gradient-to-br from-green-50 via-white to-green-50">
    <div className="">
      <Outlet />
    </div>
  );
};
