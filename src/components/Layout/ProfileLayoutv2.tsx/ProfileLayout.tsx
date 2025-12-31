import { Outlet } from 'react-router-dom';
import ProfileInfo from './component/ProfileInfo';
import ProfileSideBar from './component/ProfileSideBar';
import { Header } from '../Header';
import { Footer } from '../Footer';
import ProfileSideBarMobile from './component/ProfileSideBarMobile';

const ProfileLayOut = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen pb-[3rem] lg:pb-0 bg-gray-50/30">
        <div className="max-w-6xl xl2:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <ProfileInfo />
          <div className="grid  grid-cols-12 gap-5">
            <div className="hidden lg:block col-span-12 lg:col-span-3 ">
              <ProfileSideBar />
            </div>
            <div className="block lg:hidden col-span-12 lg:col-span-3 ">
              <ProfileSideBarMobile />
            </div>
            <div className="col-span-12 lg:col-span-9 ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProfileLayOut;
