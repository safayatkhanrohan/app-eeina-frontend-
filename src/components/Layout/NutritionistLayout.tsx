import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

const NutritionistLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className=" flex-grow mt-7 md:mt-0">
        <Outlet />
      </main>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
};

export default NutritionistLayout;
