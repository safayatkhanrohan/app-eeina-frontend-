import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useGetMeQuery } from '@/redux/Features/User/userApi';

import Loader from '@/components/ui/Loader';
import { useEditProfileForm } from './hook/useEditProfileForm';
import CircularProgress from './Components/profileCompletion';
import BasicInfo from './Components/BasicInfo';
import SocialLinks from './Components/SocialLinks';
import HealthProfile from './Components/HealthProfile';
import Preferences from './Components/Preferences';

const ProfileSetup = () => {
  const { language, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const { data, isLoading } = useGetMeQuery();
  const userProfile = data?.data;
  console.log('userProfile', userProfile);
  const steps = [
    { id: 0, name: 'basicInfo', label: language === 'ar' ? 'المعلومات الأساسية' : 'Basic Info' },
    { id: 1, name: 'social', label: language === 'ar' ? 'روابط التواصل' : 'Social Links' },
    { id: 2, name: 'preferences', label: language === 'ar' ? 'التفضيلات' : 'Preferences' },
    { id: 3, name: 'health', label: language === 'ar' ? 'الملف الصحي' : 'Health Profile' },
  ];

  const { methods, handleSave } = useEditProfileForm(userProfile);

  const isLast = currentStep === steps.length - 1;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const skipStep = () => nextStep();
  const handleNext = async () => {
    const valid = await methods.trigger();
    if (!valid) return;
    nextStep();
  };
  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="w-full max-w-5xl overflow-hidden mx-auto px-3 sm:px-6  py-10 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce">
            <div className="w-40 h-16">
              <img src="/EEINA_BBg-01.png" alt="logo" className="w-full h-full object-cover" />
            </div>
          </div>

          <h1 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-green-600 mb-3">
            {language === 'ar' ? ' مرحباً بك في رحلتك!' : ' Welcome to Your Journey!'}
          </h1>

          <p className="text-gray-700 text-base sm:text-[1.2rem] max-w-2xl mx-auto">
            {language === 'ar'
              ? 'دعنا نتعرف عليك بطريقة ممتعة وتفاعلية'
              : "Let's get to know you in a fun and interactive way"}
          </p>
        </div>
        <div className={`fixed top-5 z-50 ${isRTL ? 'left-4' : 'right-4'} hidden md:block`}>
          <CircularProgress percent={userProfile?.profileCompletion || 0} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSave}>
            {/* Steps */}
            <div className="flex items-center gap-1 sm:gap-3 justify-between mb-8 bg-white rounded-2xl shadow-lg p-1 sm:p-2">
              {steps.map((s, idx) => (
                <div
                  key={s.id}
                  className={`cursor-pointer text-[11px] sm:text-sm md:text-base flex-1 text-center py-2 sm:py-3 px-1 sm:px-2 rounded-xl transition-all duration-300
                ${
                  idx === currentStep
                    ? 'bg-gradient-to-r from-primaryColor to-green-600 text-white font-semibold shadow-md scale-105'
                    : idx < currentStep
                      ? 'bg-green-100 text-green-700 font-medium'
                      : 'text-gray-500'
                }
              `}
                  onClick={() => setCurrentStep(idx)}
                >
                  <div className="flex items-center justify-center gap-1">
                    {idx < currentStep && <span className="hidden sm:block">✓</span>}
                    <span>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Step */}
            <div className="space-y-8 ">
              {currentStep === 0 && <BasicInfo />}
              {currentStep === 1 && <SocialLinks />}
              {currentStep === 2 && <Preferences />}
              {currentStep === 3 && <HealthProfile />}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6 pt-6 border-t-2 border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg transition-transform ${
                  currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {language === 'ar' ? '← السابق' : '← Previous'}
              </Button>

              <div className="flex gap-4">
                {!isLast && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={skipStep}
                    className="px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg hover:scale-105 transition-transform"
                  >
                    {language === 'ar' ? 'تخطي →' : 'Skip →'}
                  </Button>
                )}

                {!isLast ? (
                  currentStep !== 0 && (
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNext();
                      }}
                      className="bg-gradient-to-r from-primaryColor to-green-600 hover:from-green-600 hover:to-green-700 text-white  px-3 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      {language === 'ar' ? 'التالي →' : 'Next →'}
                    </Button>
                  )
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-primaryColor to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    {language === 'ar' ? '✓ حفظ التغييرات' : '✓ Save Changes'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileSetup;
