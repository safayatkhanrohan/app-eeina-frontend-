import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { getHealthsections } from './InputsData';

const HealthProfile = () => {
  const { language } = useLanguage();
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<EditProfileType>();
  const [currentSection, setCurrentSection] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const sections = getHealthsections(language);
  const currentSectionData = sections[currentSection];
  const Icon = currentSectionData.icon;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  if (showSummary) {
    return <HealthSummary sections={sections} watch={watch} language={language} />;
  }
  console.log('errors', errors);
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div
          className={`w-10 sm:w-20 h-10 sm:h-20 mx-auto bg-gradient-to-br ${currentSectionData.color} rounded-full flex items-center justify-center mb-4`}
        >
          <Icon className="sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-[1.2rem] sm:text-[1.7rem] font-semibold text-gray-900 mb-2">
          {language === 'ar' ? currentSectionData.titleAr : currentSectionData.titleEn}
        </h2>
        <p className="text-gray-600">
          {language === 'ar' ? currentSectionData.descAr : currentSectionData.descEn}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="flex gap-2 justify-center">
        {sections.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSection
                ? 'w-12 bg-primaryColor'
                : idx < currentSection
                  ? 'w-8 bg-green-300'
                  : 'w-8 bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Questions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8"
        >
          {currentSectionData.fields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-3"
            >
              <label className="flex items-center gap-3 text-sm sm:text-[1.1rem] font-semibold text-gray-900">
                {language === 'ar' ? field.labelAr : field.labelEn}
              </label>

              {field.type === 'select' && (
                <select
                  {...register(field.name as any)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-primaryColor
                   focus:outline-none transition-colors text-sm sm:text-[1.1rem]"
                >
                  <option value="">{language === 'ar' ? 'اختر...' : 'Choose...'}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'textarea' && (
                <textarea
                  {...register(field.name as any)}
                  rows={4}
                  placeholder={field.placeholder}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl
                   focus:border-primaryColor focus:outline-none transition-colors text-sm sm:text-[1.1rem] resize-none"
                />
              )}

              {field.type === 'tags' && (
                <Controller
                  name={field.name as any}
                  control={control}
                  render={({ field: controllerField }) => (
                    <input
                      value={
                        Array.isArray(controllerField.value) ? controllerField.value.join(', ') : ''
                      }
                      onChange={(e) =>
                        controllerField.onChange(
                          e.target.value.split(',').map((v: string) => v.trim()),
                        )
                      }
                      placeholder={field.placeholder}
                      className="w-full  px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-primaryColor 
                      focus:outline-none transition-colors text-sm sm:text-[1.1rem]"
                    />
                  )}
                />
              )}

              {field.type !== 'select' && field.type !== 'textarea' && field.type !== 'tags' && (
                <input
                  type={field.type}
                  {...register(
                    field.name as any,
                    field.type === 'number' ? { valueAsNumber: true } : {},
                  )}
                  placeholder={field.placeholder}
                  step={field.type === 'number' ? '0.1' : undefined}
                  className="w-full  px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-primaryColor 
                  focus:outline-none transition-colors text-sm sm:text-[1.1rem]"
                />
              )}

              {errors && field.name.split('.').reduce((obj: any, key) => obj?.[key], errors) && (
                <p className="text-red-500 text-sm">
                  {field.name.split('.').reduce((obj: any, key) => obj?.[key], errors)?.message}
                </p>
              )}
            </motion.div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="px-3 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {language === 'ar' ? 'السابق ←' : '← Previous'}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-3 sm:px-6 py-2 sm:py-3 bg-primaryColor text-white rounded-xl hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
            >
              {currentSection === sections.length - 1
                ? language === 'ar'
                  ? 'عرض الملخص'
                  : 'View Summary'
                : language === 'ar'
                  ? 'التالي'
                  : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Summary Component
const HealthSummary = ({ sections, watch, language }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-gradient-to-br from-primaryColor to-green-600 rounded-full flex items-center justify-center mb-4">
          <Check className="sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-base sm:text-[1.7rem] font-semibold text-gray-900 mb-2">
          {language === 'ar' ? ' رائع! لقد انتهينا' : " Great! You're all set"}
        </h2>
        <p className="text-gray-600">
          {language === 'ar' ? 'هذا ملخص لملفك الصحي' : "Here's a summary of your health profile"}
        </p>
      </div>

      {sections.map((section: any) => {
        const Icon = section.icon;
        const hasData = section.fields.some((field: any) => {
          const value = watch(field.name);
          return value && (Array.isArray(value) ? value.length > 0 : true);
        });

        if (!hasData) return null;

        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center`}
              >
                <Icon className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900">
                {language === 'ar' ? section.titleAr : section.titleEn}
              </h3>
            </div>

            <div className="space-y-3 ml-16">
              {section.fields.map((field: any) => {
                const value = watch(field.name);
                if (!value || (Array.isArray(value) && value.length === 0)) return null;

                return (
                  <div key={field.name} className="flex items-start gap-2">
                    <span className="text-xl">{field.emoji}</span>
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? field.labelAr : field.labelEn}
                      </p>
                      <p className="font-medium text-gray-900">
                        {Array.isArray(value) ? value.join(', ') : value.toString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      <div className="text-center pt-6">
        <p className="text-gray-600">
          {language === 'ar'
            ? 'سنستخدم هذه المعلومات لتقديم توصيات مخصصة لك'
            : "We'll use this information to provide personalized recommendations"}
        </p>
      </div>
    </motion.div>
  );
};

export default HealthProfile;
