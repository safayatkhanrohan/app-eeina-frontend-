import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, CheckCircle } from 'lucide-react';
import { socialPlatforms } from './InputsData';

const SocialLinks = () => {
  const { language } = useLanguage();
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<EditProfileType>();
  const [activeInput, setActiveInput] = useState<string | null>('instagram');
  const [completedFields, setCompletedFields] = useState<string[]>([]);

  const handleSkip = (platform: string) => {
    const currentIndex = socialPlatforms.findIndex((p) => p.name === platform);
    if (currentIndex < socialPlatforms.length - 1) {
      setActiveInput(socialPlatforms[currentIndex + 1].name);
    } else {
      setActiveInput(null);
    }
  };

  const handleComplete = (platform: string) => {
    setCompletedFields((prev) => [...prev, platform]);
    handleSkip(platform);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-10 sm:w-20 h-10 sm:h-20 mx-auto bg-gradient-to-br from-primaryColor to-green-600 rounded-full flex items-center justify-center mb-4">
          <Share2 className="sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-[1.2rem] sm:text-[1.7rem] font-semibold text-gray-900 mb-2">
          {language === 'ar' ? ' دعنا نبقى على تواصل!' : " Let's Stay Connected!"}
        </h2>
        <p className="text-gray-600">
          {language === 'ar'
            ? 'شارك حساباتك الاجتماعية معنا (اختياري)'
            : 'Share your social profiles with us (optional)'}
        </p>
      </motion.div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          const isActive = activeInput === platform.name;
          const isCompleted = completedFields.includes(platform.name);
          const value = watch(platform.name as keyof EditProfileType);

          return (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                isActive
                  ? 'border-primaryColor shadow-lg scale-105'
                  : isCompleted
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Platform Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900">
                    {language === 'ar' ? platform.titleAr : platform.titleEn}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? platform.descAr : platform.descEn}
                  </p>
                </div>
                {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
              </div>

              {/* Input Field */}
              <AnimatePresence>
                {(isActive || value) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      {...register(platform.name as keyof EditProfileType)}
                      placeholder={platform.placeholder}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-primaryColor focus:outline-none transition-colors"
                      disabled={isCompleted}
                    />
                    {errors[platform.name as keyof EditProfileType] && (
                      <p className="text-red-500 text-sm">
                        {errors[platform.name as keyof EditProfileType]?.message as string}
                      </p>
                    )}

                    {!isCompleted && isActive && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleComplete(platform.name)}
                          className="flex-1 text-sm sm:text-base px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                        >
                          {language === 'ar' ? 'حفظ' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSkip(platform.name)}
                          className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          {language === 'ar' ? 'تخطي' : 'Skip'}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Activate Button */}
              {!isActive && !value && !isCompleted && (
                <button
                  type="button"
                  onClick={() => setActiveInput(platform.name)}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primaryColor hover:text-primaryColor transition-colors"
                >
                  {language === 'ar' ? '+ إضافة' : '+ Add'}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedFields.length === socialPlatforms.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200 text-center"
        >
          <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? ' رائع!' : ' Awesome!'}
          </h4>
          <p className="text-gray-600">
            {language === 'ar'
              ? 'الآن يمكن للآخرين العثور عليك والتواصل معك'
              : 'Now others can find and connect with you'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SocialLinks;
