import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { notificationQuestions } from './InputsData';

const Preferences = () => {
  const { language } = useLanguage();
  const { control } = useFormContext<EditProfileType>();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const currentQ = notificationQuestions[currentQuestion];
  const Icon = currentQ.icon;

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-10 sm:w-20 h-10 sm:h-20 mx-auto bg-gradient-to-br from-primaryColor to-green-600 rounded-full flex items-center justify-center mb-4">
          <Bell className="sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-[1.2rem] sm:text-[1.7rem] font-semibold text-gray-900 mb-2">
          {language === 'ar' ? ' دعنا نخصص تجربتك!' : " Let's Personalize Your Experience!"}
        </h2>
        <p className="text-gray-600">
          {language === 'ar'
            ? 'أخبرنا كيف تحب أن نبقى على تواصل معك'
            : 'Tell us how you prefer to stay connected'}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="flex gap-2 justify-center">
        {notificationQuestions.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentQuestion
                ? 'w-12 bg-primaryColor'
                : idx < currentQuestion
                  ? 'w-8 bg-green-300'
                  : 'w-8 bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="space-y-8 !overflow-hidden rounded-3xl !bg-white">
        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 !overflow-hidden"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-primaryColor/20 to-green-100 rounded-full flex items-center justify-center">
              <Icon className="sm:w-12 sm:h-12 text-primaryColor" />
            </div>

            <h3 className="text-sm md:text-xl font-bold text-gray-900">
              {language === 'ar' ? currentQ.titleAr : currentQ.titleEn}
            </h3>

            <p className="text-gray-600 text-base">
              {language === 'ar' ? currentQ.descAr : currentQ.descEn}
            </p>

            <Controller
              name={currentQ.name as keyof EditProfileType}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      field.onChange(true);
                      setTimeout(() => {
                        if (currentQuestion < notificationQuestions.length - 1) {
                          setCurrentQuestion((prev) => prev + 1);
                        }
                      }, 300);
                    }}
                    className={`px-8 sm:px-12 py-3 sm:py-4 rounded-2xl text-sm sm:text-lg font-semibold transition-all ${
                      field.value === true
                        ? 'bg-primaryColor text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {language === 'ar' ? '✓ نعم، أريد ذلك!' : '✓ Yes, I want this!'}
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      field.onChange(false);
                      setTimeout(() => {
                        if (currentQuestion < notificationQuestions.length - 1) {
                          setCurrentQuestion((prev) => prev + 1);
                        }
                      }, 300);
                    }}
                    className={`px-8 sm:px-12 py-3 sm:py-4 rounded-2xl text-sm sm:text-lg font-semibold transition-all ${
                      field.value === false
                        ? 'bg-red-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {language === 'ar' ? '✗ لا، شكراً' : '✗ No, thanks'}
                  </motion.button>
                </div>
              )}
            />

            {/* Navigation Buttons */}
            {currentQuestion > 0 && (
              <button
                type="button"
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
                className="text-gray-500 hover:text-gray-700 text-sm mt-4"
              >
                {language === 'ar' ? '← السؤال السابق' : '← Previous question'}
              </button>
            )}
          </div>
        </motion.div>
      </div>
      {/* Summary at the End */}
      {currentQuestion === notificationQuestions.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200"
        >
          <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
            {language === 'ar' ? '✨ رائع! لقد انتهينا' : "✨ Great! We're all set"}
          </h4>
          <p className="text-center text-gray-600">
            {language === 'ar'
              ? 'سنستخدم هذه التفضيلات لتخصيص تجربتك معنا'
              : "We'll use these preferences to customize your experience"}
          </p>
        </motion.div>
      )}
    </>
  );
};

export default Preferences;
