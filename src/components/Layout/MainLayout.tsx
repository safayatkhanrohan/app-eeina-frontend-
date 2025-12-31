import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-2 md:mx-0 flex-grow mt-7 md:mt-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
