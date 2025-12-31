import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { Controller, useFormContext } from 'react-hook-form';

const Preferences = () => {
  const { isRTL, language } = useLanguage();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditProfileType>();
  const NotificationSetting = [
    {
      name: 'marketplaceNotifications',
      labelAr: 'إشعارات السوق',
      labelEn: 'Marketplace Notifications',
    },
    {
      name: 'recipeUpdates',
      labelAr: 'تحديثات الوصفات',
      labelEn: 'Recipe Updates',
    },
    {
      name: 'promotionalEmails',
      labelAr: 'العروض الترويجية',
      labelEn: 'Promotional Emails',
    },
    {
      name: 'pushNotifications',
      labelAr: 'إشعارات التطبيق',
      labelEn: 'Push Notifications',
    },
  ];
  return (
    // {/* Preferences */}
    <Card className=' lg:h-[574px]'>
      <CardContent className="px-4 py-6 lg:p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {language === 'ar' ? ' التفضيلات' : 'Preferences'}{' '}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NotificationSetting.map((item) => (
                <label
                  key={item.name}
                  className={`flex items-center justify-between px-4 py-3 ${
                    language === 'ar' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <span className="text-gray-700 font-medium">
                    {language === 'ar' ? item.labelAr : item.labelEn}
                  </span>

                  {/* Toggle Switch */}
                  <Controller
                    name={item.name as keyof EditProfileType}
                    control={control}
                    render={({ field }) => (
                      <button
                        type="button"
                        onClick={() => field.onChange(!field.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          field.value ? 'bg-primaryColor' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                            field.value
                              ? language === 'ar'
                                ? '-translate-x-5'
                                : 'translate-x-5'
                              : language === 'ar'
                                ? '-translate-x-1'
                                : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
          <Button
            type="submit"
            form="edit-profile-form"
            className="flex mt-3 lg:hidden bg-primaryColor hover:bg-[#1c9a40] text-white px-4 sm:px-8 rounded-[12px] py-3 h-12 w-full sm:w-auto"
          >
            {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
          </Button>
      </CardContent>
    </Card>
  );
};

export default Preferences;
