import { ImageUploader } from '@/components/ImageUploader';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { Controller, useFormContext } from 'react-hook-form';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileImages = () => {
  const { language, isRTL } = useLanguage();
  const {
    control,
    formState: { errors },
  } = useFormContext<EditProfileType>();

  return (
    <Card>
      <CardContent className="px-4 py-6 lg:p-6">
        {/* Simple Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {language === 'ar' ? 'صور الملف الشخصي' : 'Profile Images'}
        </h2>

        {/* Facebook-style Layout: Cover Photo with Overlapping Profile Picture */}
        <div className="relative mb-8">
          {/* Cover Photo */}
          <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
            <Controller
              name="coverPhoto"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  initialImage={
                    field.value && field.value.url
                      ? (field.value as { url: string; key: string })
                      : null
                  }
                  onImageUpload={field.onChange}
                  onDelete={() => field.onChange(undefined)}
                  height="!h-64"
                  uploadText={
                    language === 'ar' ? 'انقر لرفع صورة الغلاف' : 'Click to upload cover photo'
                  }
                  subText={
                    language === 'ar'
                      ? 'PNG، JPG، WEBP (1920x1080 موصى به)'
                      : 'PNG, JPG, WEBP (1920x1080 recommended)'
                  }
                  onError={(e) => (e.currentTarget.src = '/coverImage.jpeg')}
                />
              )}
            />
          </div>

          {/* Profile Picture - Overlapping the cover photo */}
          <div className={`absolute ${isRTL ? 'right-6' : 'left-6'} -bottom-16 sm:-bottom-20`}>
            <div className="relative group">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primaryColor to-[#1c9a40] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              {/* Profile Picture with white border */}
              <div className="relative bg-white p-1.5 rounded-full shadow-xl">
                <Controller
                  name="profilePicture"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      initialImage={
                        field.value && field.value.url
                          ? (field.value as { url: string; key: string })
                          : null
                      }
                      onImageUpload={field.onChange}
                      onDelete={() => field.onChange(null)}
                      width="!w-32 sm:!w-40"
                      height="h-32 sm:h-40"
                      customStyle="!rounded-full"
                      uploadText={language === 'ar' ? 'رفع صورة' : 'Upload'}
                      subText=""
                      onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Spacing for overlapping profile picture */}
        <div className="h-20 sm:h-24"></div>

        {/* Image Guidelines */}
        <div className="space-y-4">
          {/* Cover Photo Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 text-sm mb-1">
                  {language === 'ar' ? 'نصائح لصورة الغلاف' : 'Cover Photo Tips'}
                </h3>
                <p className="text-blue-700 text-xs">
                  {language === 'ar'
                    ? 'للحصول على أفضل النتائج، استخدم صورة بحجم 1920x1080 بكسل. سيتم عرضها في أعلى صفحة ملفك الشخصي.'
                    : 'For best results, use an image that is 1920x1080 pixels. It will be displayed at the top of your profile page.'}
                </p>
              </div>
            </div>
            {errors.coverPhoto?.url && (
              <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
                <Info className="w-4 h-4 flex-shrink-0" />
                <p>{errors.coverPhoto.url.message}</p>
              </div>
            )}
          </div>

          {/* Profile Picture Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 text-sm mb-1">
                  {language === 'ar' ? 'نصائح لصورة الملف الشخصي' : 'Profile Picture Tips'}
                </h3>
                <ul
                  className={`text-green-700 text-xs space-y-1 ${isRTL ? 'pr-4' : 'pl-4'} list-disc`}
                >
                  <li>
                    {language === 'ar'
                      ? 'استخدم صورة مربعة (400x400 بكسل موصى بها)'
                      : 'Use a square image (400x400 pixels recommended)'}
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'اختر صورة واضحة لوجهك'
                      : 'Choose a clear photo of your face'}
                  </li>
                  <li>
                    {language === 'ar' ? 'تجنب الخلفيات المزدحمة' : 'Avoid cluttered backgrounds'}
                  </li>
                </ul>
              </div>
            </div>
            {errors.profilePicture?.url && (
              <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
                <Info className="w-4 h-4 flex-shrink-0" />
                <p>{errors.profilePicture.url.message}</p>
              </div>
            )}
          </div>
        </div>
            <Button
            type="submit"
            form="edit-profile-form"
            className="flex lg:hidden mt-3 bg-primaryColor hover:bg-[#1c9a40] text-white px-4 sm:px-8 rounded-[12px] py-3 h-12 w-full sm:w-auto"
          >
            {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
          </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileImages;
