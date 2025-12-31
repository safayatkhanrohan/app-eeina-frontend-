import { useParams } from 'react-router-dom';
import { useGetCreatedByProfileQuery } from '../../redux/Features/User/userApi';
import { useLanguage } from '../../contexts/LanguageContext';
import { Calendar, Check, Mail } from 'lucide-react';

import { Avatar } from '../../components/ui/avatar';
import { Card, CardContent } from '../../components/ui/card';
import { formatDateLocalized } from '../../lib/formatTimeLocalized';
import Loader from '../../components/ui/Loader';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { CreatedByRecipe } from '../../components/Profile/CreatedByRecipe';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useGetPublicRecipeQuery } from '@/redux/Features/Recipe/RecipeApi';

const CreatedByProfile = () => {
  const { isRTL, language } = useLanguage();
  const { id: createdById } = useParams();
  const { data, isLoading } = useGetCreatedByProfileQuery(createdById || '');
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const createdByData = data?.data;
  const {
    allData: CreatedByRecipeData,
    isFetching,
    isLoading: recipesLoading,
    lastElementRef,
    hasMore,
  } = useInfiniteScroll(
    useGetPublicRecipeQuery,
    { createdBy: createdById, q: debouncedSearchTerm || undefined },
    8,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  if (isLoading) {
    return (
      <div className="h-[100vh] flex flex-col items-end justify-end">
        <Loader />
      </div>
    );
  }
  console.log('createdByData', createdByData);
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        <div className=" mt-[2.5rem] sm:mt-0 relative bg-gradient-to-r from-primaryColor to-[#1c9a40] rounded-2xl overflow-hidden mb-8 shadow-lg">
          <div className="relative h-48 sm:h-56">
            <img
              src={createdByData?.coverPhoto?.url || '/coverImage.jpeg'}
              alt="Cover"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = '/coverImage.jpeg')}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div
              className={`absolute inset-y-0 ${
                isRTL ? 'right-6 sm:right-8' : 'left-6 sm:left-8'
              } flex items-center`}
            >
              <div className="relative">
                <Avatar className="w-28 h-28 sm:w-40 sm:h-40 border-4 border-white shadow-2xl">
                  <img
                    src={createdByData?.profilePicture?.url || '/unnamed.jpg'}
                    alt={createdByData?.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
                  />
                </Avatar>
                {createdByData?.accountStatus == 'active' && (
                  <span
                    className={`absolute top-2 lg:!top-4 ${isRTL ? 'left-4' : 'right-4'} w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 ring-2 ring-white animate-pulse z-10`}
                    aria-hidden="true"
                  ></span>
                )}
              </div>
            </div>
          </div>
          <div
            className={`absolute top-4 ${isRTL ? 'left-4 justify-end' : 'right-4 justify-start'} flex gap-2`}
          >
            <LanguageSwitcher className="bg-primary/20 backdrop-blur-sm hover:bg-primary/30 text-gray-900 border-white px-3 py-2 h-10 shadow-lg" />
          </div>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 bg-white shadow-lg border-0">
          <CardContent className="p-6 sm:p-8">
            <div
              className={`flex flex-col sm:flex-row sm:items-center gap-6 ${
                isRTL ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <div className={`flex-1 ${isRTL ? 'order-2' : ''}`}>
                <div className={`flex items-end gap-3 mb-4 `}>
                  <h1
                    className={`capitalize text-base sm:text-4xl font-bold text-gray-900 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {createdByData?.fullName}
                  </h1>

                  <div className="relative group flex items-center">
                    <div
                      className={`${createdByData?.isEmailVerified ? 'text-blue-500' : 'text-gray-500'} rounded-full flex items-center justify-center cursor-pointer`}
                    >
                      <Mail size={28} />

                      {createdByData?.isEmailVerified ? (
                        <Check className="w-4 h-4  text-white absolute -bottom-1 -right-1 bg-blue-500 rounded-full" />
                      ) : (
                        <span className="absolute -bottom-1 -right-1 text-[10px] bg-red-500 text-white px-1 rounded">
                          !
                        </span>
                      )}
                    </div>

                    <div className="absolute top-full mt-2 px-2 py-1 text-xs text-white bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {createdByData?.isEmailVerified
                        ? language === 'ar'
                          ? 'تم توثيق البريد الإلكتروني'
                          : 'Email Verified'
                        : language === 'ar'
                          ? 'توثيق البريد الإلكتروني'
                          : 'Verify Email'}
                    </div>
                  </div>
                </div>
                <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-500`}>
                  <div className={`flex items-center gap-2 `}>
                    <Calendar className="w-4 h-4 text-primaryColor" />
                    <span>
                      {language == 'ar' ? 'أُنشئ في  ' : 'Created At '}{' '}
                      {createdByData && (
                        <span>{formatDateLocalized(createdByData.createdAt, language)}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <CreatedByRecipe
          recipes={CreatedByRecipeData}
          language={language}
          isLoading={recipesLoading}
          isFetching={isFetching}
          hasMore={hasMore}
          lastElementRef={lastElementRef}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default CreatedByProfile;
