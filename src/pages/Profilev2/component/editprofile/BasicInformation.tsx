import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingInput from '@/components/ui/FloatingInput';
import FloatingSelect from '@/components/ui/FloatingSelect';
import FloatingTextarea from '@/components/ui/FloatingTextarea';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { useFormContext } from 'react-hook-form';
const BasicInformation = () => {
  const { isRTL, language } = useLanguage();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditProfileType>();
  console.log({ errors });
  return (
    <Card className="mt-2">
      <CardContent className="px-4 py-6 lg:p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingInput
            label={language === 'ar' ? 'الاسم الأول' : 'First Name'}
            register={register('firstName')}
            error={errors.firstName?.message}
          />
          <FloatingInput
            label={language === 'ar' ? 'اسم العائلة' : 'Last Name'}
            register={register('lastName')}
            error={errors.lastName?.message}
          />

          <FloatingSelect
            label={language === 'ar' ? 'النوع' : 'Gender'}
            register={register('gender')}
            error={errors.gender}
            options={[
              { value: 'male', label: language === 'ar' ? 'ذكر' : 'Male' },
              { value: 'female', label: language === 'ar' ? 'أنثى' : 'Female' },
              { value: 'other', label: language === 'ar' ? 'آخر' : 'Other' },
            ]}
          />
          <FloatingInput
            label={language === 'ar' ? ' تاريخ الميلاد' : 'Date of Birth'}
            register={register('dob')}
            error={errors.dob?.message}
            type="date"
          />
          <FloatingInput
            label={language === 'ar' ? 'رقم الهاتف' : 'Phone'}
            type="tel"
            register={register('phone')}
            error={errors.phone?.message}
          />
          <FloatingInput
            label={language === 'ar' ? 'العنوان' : 'Street Address'}
            register={register('location.streetAddress')}
            error={errors?.location?.streetAddress?.message}
          />
          <FloatingInput
            label={language === 'ar' ? 'المدينة' : 'City'}
            register={register('location.city')}
            error={errors?.location?.city?.message}
          />
          <FloatingInput
            label={language === 'ar' ? 'الرمز البريدي' : 'ZIP Code'}
            register={register('location.zip')}
            error={errors?.location?.zip?.message}
          />
          <FloatingInput
            label={language === 'ar' ? 'الدولة' : 'Country'}
            register={register('location.country')}
            error={errors?.location?.country?.message}
          />
          <FloatingInput
            label={language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
            register={register('website')}
            error={errors.website?.message}
          />
        </div>

        <div className="mt-6">
          <FloatingTextarea label="Bio" register={register('bio')} error={errors.bio} />
        </div>
          <Button
            type="submit"
            form="edit-profile-form"
            className="flex lg:hidden w-full mt-4 bg-primaryColor hover:bg-[#1c9a40] text-white px-4 sm:px-8 rounded-[12px] py-3 h-12  sm:w-auto"
          >
            {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
          </Button>
      </CardContent>
      
    </Card>
  );
};

export default BasicInformation;
