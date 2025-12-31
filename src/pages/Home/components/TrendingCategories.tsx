import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Link, useActionData } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getLocalizedPath } from '../../../lib/getLocalizedPath';
import { useGetTrendingCategoriesQuery } from '../../../redux/Features/Category/CategoryAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useAppSelector } from '@/hooks/hook';

export const TrendingCategories = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { t, language } = useLanguage();
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const { data } = useGetTrendingCategoriesQuery();
  const trendingCategories = data?.data.docs;

  const isLoggedIn = !!user;
  return (
    <Card className="border-none shadow-none bg-transparent mb-4 mt-12">
      <CardContent className="p-0 sm:p-0">
        <div className="flex items-center gap-2 px-4 sm:px-0">
          <TrendingUp className="w-5 h-5 text-primaryColor" />
          <Link to={getLocalizedPath('/trending', language)}>
            <h3 className="font-bold text-gray-900 hover:text-primaryColor transition-colors cursor-pointer">
              {t.home.trending_categories}
            </h3>
          </Link>
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

          {trendingCategories && trendingCategories.length > 0 ? (
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
              {trendingCategories?.slice(0, 10).map((category: any) => (
                <SwiperSlide key={category._id} className="h-auto">
                  <Link
                    to={getLocalizedPath(`/category/${category.slug[language]}`, language)}
                    className="block h-full group/card"
                  >
                    <div className="flex flex-col items-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#22ae4b]/30 transition-all duration-300 h-full relative overflow-hidden">
                      {/* Decorative background element */}
                      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent opacity-50 group-hover:from-[#22ae4b]/5 transition-colors duration-300" />

                      {/* Image Container */}
                      <div className="relative w-24 h-24 mb-4 rounded-full bg-white flex items-center justify-center overflow-hidden group-hover/card:scale-105 transition-transform duration-300 border-4 border-white shadow-md z-10">
                        <img
                          src={category?.image?.url}
                          alt={category.name[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="text-center w-full z-10">
                        <h4 className="font-bold text-gray-800 text-base mb-2 truncate w-full   group-hover/card:text-[#22ae4b] transition-colors">
                          {category?.name[language]}
                        </h4>
                        <span className="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100 group-hover/card:bg-[#22ae4b]/10 group-hover/card:text-[#22ae4b] group-hover/card:border-[#22ae4b]/20 transition-all">
                          {category?.recipe_count} {language === 'ar' ? 'وصفة' : 'Recipes'}
                        </span>
                      </div>
                    </div>
                  </Link>
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
