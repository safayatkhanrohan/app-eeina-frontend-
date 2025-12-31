import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar } from '../../../components/ui/avatar';
import { useAppSelector } from '../../../hooks/hook';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useFollowUserMutation, useGetTopCreatorQuery } from '../../../redux/Features/User/userApi';
import { getLocalizedPath } from '../../../lib/getLocalizedPath';
import { toast } from 'sonner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export const TopCreatorsSection = () => {
  const { t, language } = useLanguage();
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const currentUser = useAppSelector((state) => state.auth.user);
  const isLoggedIn = !!currentUser;
  const [followUser] = useFollowUserMutation();
  const { data } = useGetTopCreatorQuery();
  let creators = data?.data || [];
  if (isLoggedIn && currentUser?._id) {
    creators = creators.filter((creator: any) => creator._id !== currentUser?._id);
  }

  const followUserHandle = async (id: string) => {
    try {
      await followUser(id).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message || 'some thing error');
    }
  };
  console.log('creator', currentUser?.following);
  return (
    <Card className="border-none shadow-none bg-transparent mb-4">
      <CardContent className="p-0 sm:p-0">
        <div className="flex items-center gap-2 px-4 sm:px-0">
          <Award className="w-5 h-5 text-primaryColor" />
          <h3 className="font-bold text-gray-900">{t.home.top_creators}</h3>
        </div>

        <div className="w-full relative group">
          {/* Navigation Buttons */}
          <button
            ref={(node) => setPrevEl(node)}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-primaryColor hover:text-white transition-all duration-300 disabled:opacity-0 disabled:cursor-not-allowed ${
              language === 'ar' ? 'right-2' : 'left-2'
            } opacity-0 group-hover:opacity-100 hidden sm:flex`}
            aria-label="Previous slide"
          >
            <ChevronLeft className={`w-6 h-6 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </button>
          <button
            ref={(node) => setNextEl(node)}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-primaryColor hover:text-white transition-all duration-300 disabled:opacity-0 disabled:cursor-not-allowed ${
              language === 'ar' ? 'left-2' : 'right-2'
            } opacity-0 group-hover:opacity-100 hidden sm:flex`}
            aria-label="Next slide"
          >
            <ChevronRight className={`w-6 h-6 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </button>

          {creators && creators.length > 0 ? (
            <Swiper
              key={language}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              slidesPerView={1.5}
              navigation={{
                prevEl,
                nextEl,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                },
                768: {
                  slidesPerView: isLoggedIn ? 2.5 : 3.5,
                },
                1024: {
                  slidesPerView: isLoggedIn ? 3.5 : 4.5,
                },
                1280: {
                  slidesPerView: isLoggedIn ? 4.5 : 5.5,
                },
              }}
              className="w-full px-4 sm:px-0 !py-3"
            >
              {creators.map((creator: any) => (
                <SwiperSlide key={creator?._id} className="h-auto">
                  <div className="flex flex-col items-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primaryColor/30 transition-all duration-300 h-full relative overflow-hidden group/card">
                    {/* Decorative background element */}
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent opacity-50 group-hover/card:from-primaryColor/5 transition-colors duration-300" />

                    <Link
                      to={getLocalizedPath(`/user/${creator?._id}`, language)}
                      className="relative z-10 mb-3"
                    >
                      <Avatar className="w-20 h-20 border-4 border-white shadow-md group-hover/card:scale-105 transition-transform duration-300">
                        <img
                          className="w-full h-full object-cover"
                          alt="Creator avatar"
                          src={creator?.profilePicture?.url || '/unnamed.jpg'}
                          onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
                        />
                      </Avatar>
                    </Link>

                    <div className="text-center w-full z-10 mb-4">
                      <Link
                        to={getLocalizedPath(`/user/${creator?._id}`, language)}
                        className="font-bold text-gray-900 text-base block mb-1 truncate hover:text-primaryColor transition-colors"
                      >
                        {creator?.fullName}
                      </Link>

                      <div className="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100 inline-block">
                        {creator?.totalFollowers} {t.profile.followers}
                      </div>
                    </div>

                    {isLoggedIn && (
                      <Button
                        size="sm"
                        className={`w-full mt-auto text-xs h-9 rounded-full transition-all duration-300 z-10 ${
                          currentUser?.following?.includes(creator?._id)
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent'
                            : 'bg-primaryColor text-white hover:bg-[#1e9a42] shadow-md hover:shadow-lg'
                        }`}
                        onClick={() => followUserHandle(creator?._id)}
                      >
                        {`${currentUser?.following?.includes(creator?._id) ? t.common.Following : t.common.Follow}`}
                      </Button>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-500 font-semibold px-4 sm:px-0">
              {language == 'ar' ? 'غير متوفر الآن  ' : 'Not Available Now'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
