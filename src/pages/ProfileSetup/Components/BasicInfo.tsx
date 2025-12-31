import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { Button } from '@/components/ui/button';
import { QuestionInputProps } from '../interface/ProfileInterface';
import { getBasicQuestions } from './InputsData';

const QuestionInput = ({
  question,
  onNext,
  register,
  control,
  errors,
  language,
}: QuestionInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (question.type === 'profilePicture' || question.type === 'coverPhoto') {
      return; // Image upload handles its own submission
    }
    onNext(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && question.type !== 'textarea') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Profile Picture Upload
  if (question.type === 'profilePicture') {
    return (
      <Controller
        name="profilePicture"
        control={control}
        render={({ field }) => (
          <div className="sm:w-full max-w-md mx-auto">
            <ImageUploader
              initialImage={
                field.value && field.value.url
                  ? (field.value as { url: string; key: string })
                  : null
              }
              onImageUpload={field.onChange}
              // onImageUpload={(image) => {
              //   if (image) {
              //     field.onChange(image);
              //     setTimeout(() => onNext(image.url), 500);
              //   }
              // }}
              onDelete={() => {
                field.onChange(undefined);
              }}
              height="h-64"
              width="w-64"
              customStyle="mx-auto rounded-full"
              uploadText={language === 'ar' ? 'اختر صورة' : 'Choose Photo'}
              subText={language === 'ar' ? 'صورة ملفك الشخصي' : 'Your profile picture'}
            />
            {errors.profilePicture && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errors.profilePicture.message}
              </p>
            )}
          </div>
        )}
      />
    );
  }

  // Cover Photo Upload
  if (question.type === 'coverPhoto') {
    return (
      <Controller
        name="coverPhoto"
        control={control}
        render={({ field }) => (
          <div className="w-full max-w-2xl mx-auto">
            <ImageUploader
              initialImage={field.value ? { url: field.value, key: '' } : null}
              onImageUpload={field.onChange}
              onDelete={() => {
                field.onChange(undefined);
              }}
              height="h-48"
              width="!w-full"
              customStyle="mx-auto rounded-2xl"
              uploadText={language === 'ar' ? 'اختر صورة غلاف' : 'Choose Cover Photo'}
              subText={language === 'ar' ? 'صورة الغلاف' : 'Cover photo for your profile'}
            />
            {errors.coverPhoto && (
              <p className="text-red-500 text-sm mt-2 text-center">{errors.coverPhoto.message}</p>
            )}
          </div>
        )}
      />
    );
  }

  // Date Input
  if (question.type === 'date') {
    return (
      <div className="w-full max-w-md mx-auto">
        <input
          type="date"
          {...register(question.field)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setTimeout(() => onNext(e.target.value), 300);
          }}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-primaryColor focus:ring-4 focus:ring-green-100 transition-all text-center"
        />
        {errors[question.field as string] && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors[question.field as string]?.message}
          </p>
        )}
      </div>
    );
  }

  // Select Dropdown
  if (question.type === 'select') {
    return (
      <div className="w-full max-w-md mx-auto space-y-3">
        {question.options?.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onNext(option.value)}
            className="w-full px-6 sm:px-8 py-3 sm:py-5 text-lg font-medium bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primaryColor/10 hover:to-green-100 border-2 border-gray-200 hover:border-primaryColor rounded-2xl transition-all transform hover:scale-105 active:scale-95"
          >
            {option.label}
          </button>
        ))}
        {errors[question.field as string] && (
          <p className="text-red-500 text-sm text-center">
            {errors[question.field as string]?.message}
          </p>
        )}
      </div>
    );
  }

  // Textarea
  if (question.type === 'textarea') {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <textarea
          {...register(question.field)}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={question.placeholder}
          rows={6}
          className="w-full px-5 sm:px-6 py-3 sm:py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-primaryColor focus:ring-4 focus:ring-green-100 transition-all resize-none"
        />
        {errors[question.field as string] && (
          <p className="text-red-500 text-sm mt-2">{errors[question.field as string]?.message}</p>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 w-full px-6 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-primaryColor to-green-600 text-white text-lg font-semibold rounded-2xl hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          {language === 'ar' ? 'التالي →' : 'Next →'}
        </button>
      </div>
    );
  }

  // Text Input (default)
  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        {...register(question.field)}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={question.placeholder}
        className="w-full px-5 sm:px-6 py-2 sm:py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-primaryColor focus:ring-4 focus:ring-green-100 transition-all text-center"
      />
      {errors[question.field as string] && (
        <p className="text-red-500 text-sm mt-2 text-center">
          {errors[question.field as string]?.message}
        </p>
      )}
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 w-full px-6 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-primaryColor to-green-600 text-white text-lg font-semibold rounded-2xl hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
      >
        {language === 'ar' ? 'التالي →' : 'Next →'}
      </button>
    </div>
  );
};

const BasicInfo = () => {
  const { language } = useLanguage();
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<EditProfileType>();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = getBasicQuestions(language);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = (value?: any) => {
    if (currentQuestion.field) {
      setValue(currentQuestion.field as any, value);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  console.log('errors', errors);
  return (
    <>
      {/* Progress Bar */}
      <div className="bg-white rounded-full h-3 !overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-primaryColor to-green-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <div className="space-y-6 !overflow-hidden rounded-3xl">
        {/* Question Counter */}
        <div className="text-center text-sm text-gray-600">
          <span className="font-semibold text-primaryColor">{currentQuestionIndex + 1}</span> /{' '}
          <span>{questions.length}</span>
          {language === 'ar' ? ' سؤال' : ' questions'}
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 min-h-[500px] flex flex-col !overflow-hidden"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto bg-gradient-to-br from-primaryColor/20 to-green-100 rounded-full flex items-center justify-center mb-6"
              >
                <Sparkles className="w-10 h-10 text-primaryColor" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm md:text-[1.7rem] font-semibold text-gray-900 mb-3"
              >
                {currentQuestion.title}
              </motion.h2>

              {currentQuestion.description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 text-[1.5]"
                >
                  {currentQuestion.description}
                </motion.p>
              )}
            </div>

            {/* Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex-1 flex items-center justify-center"
            >
              <QuestionInput
                question={currentQuestion}
                onNext={handleNext}
                register={register}
                control={control}
                errors={errors}
                language={language}
              />
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="text-sm sm:text-lg px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {language === 'ar' ? '→ السابق' : '← Back'}
              </button>
              <div className="hidden sm:flex gap-2">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentQuestionIndex
                        ? 'w-8 bg-primaryColor'
                        : idx < currentQuestionIndex
                          ? 'w-2 bg-green-300'
                          : 'w-2 bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                disabled={currentQuestionIndex === questions.length - 1}
                className={`text-sm bg-gradient-to-r from-primaryColor to-green-600 hover:from-green-600 hover:to-green-700 text-white sm:px-8 sm:py-3 sm:text-lg shadow-lg transition-all${
                  currentQuestionIndex === questions.length - 1
                    ? 'opacity-40 cursor-not-allowed hover:scale-100 hover:shadow-none'
                    : 'hover:shadow-xl hover:scale-105'
                }`}
              >
                {language === 'ar' ? 'تخطي →' : 'Skip →'}
              </Button>

              {/* <div className="w-20" /> Spacer for alignment */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default BasicInfo;
