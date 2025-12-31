import { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useGetAllIngredientQuery } from '@/redux/Features/Ingrediant/IngrediantApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { useAppSelector } from '@/hooks/hook';

const TopIngredients = () => {
  const { language } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const { data } = useGetAllIngredientQuery({ page: 1, limit: 15, isFeatured: true });
  const ingredients = data?.data?.docs || [];

  return (
    <Card className="border-none shadow-none bg-transparent mb-4">
      <CardContent className="p-0 sm:p-0">
        <div className="flex items-center gap-2 px-4 sm:px-0">
          <Utensils className="w-5 h-5 text-primaryColor" />
          <h3 className="font-bold text-gray-900">
            {language === 'ar' ? 'أفضل المكونات' : 'Top Ingredients'}
          </h3>
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

          {ingredients && ingredients.length > 0 ? (
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
              {ingredients.map((ingredient: any) => (
                <SwiperSlide key={ingredient._id} className="h-auto">
                  <Link
                    to={getLocalizedPath(`/ingredient/${ingredient?.slug?.[language]}`, language)}
                    className="flex flex-col items-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primaryColor/30 transition-all duration-300 h-full relative overflow-hidden group/card"
                  >
                    {/* Decorative background element */}
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent opacity-50 group-hover/card:from-primaryColor/5 transition-colors duration-300" />

                    <div className="relative z-10 mb-3">
                      <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden group-hover/card:scale-105 transition-transform duration-300 bg-white flex items-center justify-center">
                        <img
                          className="w-full h-full object-cover"
                          alt={ingredient.name[language]}
                          src={ingredient.image?.url || '/placeholder-ingredient.jpg'}
                          onError={(e) => (e.currentTarget.src = '/placeholder-ingredient.jpg')}
                        />
                      </div>
                    </div>

                    <div className="text-center w-full z-10 mb-2">
                      <h4 className="font-bold text-gray-900 text-base block mb-1 truncate hover:text-primaryColor transition-colors">
                        {ingredient.name[language]}
                      </h4>

                      <div className="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100 inline-block truncate max-w-full">
                        {ingredient.category[language]}
                      </div>
                    </div>

                    {/* Optional: Display Calories */}
                    {ingredient.nutrition?.calories && (
                      <div className="text-xs text-gray-400 mt-auto">
                        {Math.round(ingredient.nutrition.calories.amount)}{' '}
                        {ingredient.nutrition.calories.unit}
                      </div>
                    )}
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

export default TopIngredients;
