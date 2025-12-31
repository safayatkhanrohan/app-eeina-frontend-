import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../../components/ui/button';
import { User, Save, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfilePreview from '@/pages/EditProfile/components/ProfilePreview';

import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { FormProvider } from 'react-hook-form';
import { useGetMeQuery } from '@/redux/Features/User/userApi';

import Loader from '@/components/ui/Loader';
import BasicInfo from './components/BasicInfo';
import SocialLinks from './components/SocialsLinks';
import Preferences from './components/Preferencers';

import { useEditProfileForm } from '../ProfileSetup/hook/useEditProfileForm';
import { HealthProfile } from './components/HealthProfile';

export const EditProfile = (): JSX.Element => {
  const { t, language } = useLanguage();

  const { data, isLoading } = useGetMeQuery();
  const userProfile = data?.data;

  const { methods, handleSave } = useEditProfileForm(userProfile);

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        {/* Header */}
        <div className=" mt-5 sm:mt-0 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to={getLocalizedPath('/profile', language)}>
              <Button variant="outline" size="icon" className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-primaryColor" />
              <div>
                <div className="text-sm text-primaryColor font-medium">
                  {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                </div>
                <h1 className="text-[20px] md:text-3xl font-bold text-gray-900">{t.profile.edit_profile}</h1>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            {language === 'ar'
              ? 'تحديث معلومات ملفك الشخصي وتفضيلاتك'
              : 'Update your profile information and preferences'}
          </p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-12 gap-4 sm:gap-8">
              {/* Main Form */}
              <div className="col-span-12 lg:col-span-8">
                <div className="space-y-8">
                  <>
                    {/* Basic Information */}
                    <BasicInfo />

                    {/* Social Links */}
                    <SocialLinks />

                    {/* Preferences */}
                    <Preferences />
                  </>
                  <HealthProfile />
                  {/* Save Button */}
                  <div className="flex items-center gap-4 w-full">
                    <Button
                      type="submit"
                      className="bg-primaryColor hover:bg-[#1c9a40] text-white px-4 sm:px-8 py-3 h-12 w-1/2 sm:w-auto"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                    </Button>
                    <Link to={getLocalizedPath('/profile', language)} className="w-1/2">
                      <Button variant="outline" className="px-4 sm:px-8 py-4 h-12 w-full sm:w-auto">
                        <X className="w-4 h-4 mr-2" />
                        {t.common.cancel}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Right Sidebar */}
              <ProfilePreview userProfile={userProfile} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
