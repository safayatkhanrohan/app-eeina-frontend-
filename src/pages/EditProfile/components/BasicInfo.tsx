import ProfileImages from '@/pages/ProfileSetup/Components/ProfileImages';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { useFormContext } from 'react-hook-form';

const BasicInfo = () => {
  const { isRTL, language } = useLanguage();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditProfileType>();
  console.log({ errors });
  return (
    <div>
      {/* Profile Images */}
      <ProfileImages />

      {/* Basic Information */}
      <Card className="mt-2">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الاسم الأول' : 'First Name'}
              </label>
              <Input
                {...register('firstName')}
                className={`h-12 ${isRTL ? 'text-right' : 'text-left'}`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'اسم العائلة' : 'Last Name'}
              </label>
              <Input
                {...register('lastName')}
                className={`h-12 ${isRTL ? 'text-right' : 'text-left'}`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? ' النوع' : 'Gender'}{' '}
              </label>
              <select
                {...register('gender')}
                className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:border-primaryColor focus:ring-primaryColor bg-white"
              >
                <option value="male">{language === 'ar' ? ' ذكر' : 'Male'}</option>
                <option value="female">{language === 'ar' ? ' أنثى' : 'Female'}</option>
                <option value="other">{language === 'ar' ? '  آخر' : 'Other'}</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? ' تاريخ الميلاد' : 'Date of Birth'}{' '}
              </label>
              <Input
                type="date"
                {...register('dob')}
                className={`h-12 ${isRTL ? 'justify-end' : 'justify-start'}`}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 ">
                {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
              </label>
              <Input type="tel" {...register('phone')} className={`h-12  `} />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان' : 'Street Address'}
              </label>
              <Input {...register('location.streetAddress')} className="h-12" />
              {errors?.location?.streetAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.location.streetAddress.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'المدينة' : 'City'}
              </label>
              <Input {...register('location.city')} className="h-12" />
              {errors?.location?.city && (
                <p className="text-red-500 text-sm mt-1">{errors?.location?.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الرمز البريدي' : 'ZIP Code'}
              </label>
              <Input {...register('location.zip')} className="h-12" />
              {errors?.location?.zip && (
                <p className="text-red-500 text-sm mt-1">{errors.location.zip.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الدولة' : 'Country'}
              </label>
              <Input {...register('location.country')} className="h-12" />
              {errors?.location?.country && (
                <p className="text-red-500 text-sm mt-1">{errors.location.country.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'النبذة الشخصية' : 'Bio'}
            </label>
            <textarea
              {...register('bio')}
              rows={4}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primaryColor focus:ring-primaryColor resize-none ${isRTL ? 'text-right' : 'text-left'}`}
              placeholder={language === 'ar' ? 'أخبرنا عن نفسك...' : 'Tell us about yourself...'}
            />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}{' '}
              </label>
              <Input
                type="url"
                {...register('website')}
                className="h-12"
                placeholder="https://yourwebsite.com"
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfo;
