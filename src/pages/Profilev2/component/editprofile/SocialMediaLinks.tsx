import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingInput from '@/components/ui/FloatingInput';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { useFormContext } from 'react-hook-form';
const SocialMediaLinks = () => {
  const { isRTL, language } = useLanguage();
  const {
    register,
    formState: { errors },
  } = useFormContext<EditProfileType>();
  return (
    <Card className=' lg:h-[574px]'>
      <CardContent className="px-4 py-6 lg:p-6">
        <div className="flex flex-col gap-7">
          <FloatingInput
            label={language === 'ar' ? 'إنستجرام ' : 'Instagram'}
            register={register('instagram')}
            error={errors?.instagram?.message}
          />
          <FloatingInput
            label={language === 'ar' ? 'تويتر ' : 'Twitter'}
            register={register('twitter')}
            error={errors?.twitter?.message}
          />
          <FloatingInput
            label={language === 'ar' ? ' فيسبوك' : 'Facebook'}
            register={register('facebook')}
            error={errors?.facebook?.message}
          />
          <FloatingInput
            label={language === 'ar' ? ' لنكد ان' : 'linkedin'}
            register={register('linkedin')}
            error={errors?.linkedin?.message}
          />
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

export default SocialMediaLinks;
