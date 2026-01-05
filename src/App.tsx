import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAppDispatch } from './hooks/hook';
import { useGetMeQuery } from './redux/Features/User/userApi';
import { setUser, logout } from './redux/Features/Auth/authSlice';
import { useEffect, useState } from 'react';
import { router } from './routes/routes';
import CookieBanner from './components/cookie/CookieBanner';

export const App = () => {
  const dispatch = useAppDispatch();
  const [showBanner, setShowBanner] = useState(false);

  const { data: apiUser, isError } = useGetMeQuery();

  console.log('erorr', isError);

  useEffect(() => {
    if (apiUser) dispatch(setUser(apiUser.data));
    if (isError) dispatch(logout());
  }, [apiUser, isError, dispatch]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let listener: any;

    CapacitorApp.addListener('backButton', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        CapacitorApp.exitApp();
      }
    }).then((result) => {
      listener = result;
    });

    return () => {
      listener?.remove();
    };
  }, []);
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  return (
    <LanguageProvider>
      {showBanner && <CookieBanner onClose={() => setShowBanner(false)} />}

      <RouterProvider router={router} />
      <Toaster />
    </LanguageProvider>
  );
};
