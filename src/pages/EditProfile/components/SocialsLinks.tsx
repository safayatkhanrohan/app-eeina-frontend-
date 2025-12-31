import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { LinkedinIcon } from 'react-share';

const SocialLinks = () => {
  const { isRTL, language } = useLanguage();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditProfileType>();
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {language === 'ar' ? 'روابط وسائل التواصل الاجتماعي' : 'Social Media Links'}
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'إنستجرام ' : 'Instagram'}
              </label>
              <Input
                {...register('instagram')}
                placeholder="https://instagram.com/username"
                className="h-12"
              />
              {errors.instagram && (
                <p className="text-red-500 text-sm mt-1">{errors.instagram.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'تويتر ' : 'Twitter'}
              </label>
              <Input
                {...register('twitter')}
                placeholder="https://twitter.com/username"
                className="h-12"
              />
              {errors.twitter && (
                <p className="text-red-500 text-sm mt-1">{errors.twitter.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? ' فيسبوك' : 'Facebook'}
              </label>
              <Input
                {...register('facebook')}
                placeholder="https://facebook.com/username"
                className="h-12"
              />
              {errors.facebook && (
                <p className="text-red-500 text-sm mt-1">{errors.facebook.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0077B5] rounded-lg flex items-center justify-center">
              <LinkedinIcon className="w-5 h-5 text-white " />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? ' لنكد ان' : 'linkedin'}
              </label>
              <Input
                {...register('linkedin')}
                placeholder="https://linkedin.com/channel/username"
                className="h-12"
              />
              {errors.linkedin && (
                <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLinks;
