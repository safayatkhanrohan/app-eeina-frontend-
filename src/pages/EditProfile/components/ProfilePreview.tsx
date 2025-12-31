import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ProfilePreview = ({ userProfile }: any) => {
  console.log(userProfile);
  const { t, language } = useLanguage();
  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="sticky -top-[8rem] space-y-6">
        {/* Profile Preview */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'معاينة الملف الشخصي' : 'Profile Preview'}
            </h3>
            <div className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <img
                  src={userProfile?.profilePicture?.url || '/unnamed.jpg'}
                  onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </Avatar>
              <h4 className="font-bold text-lg text-gray-900">
                {userProfile?.firstName} {userProfile?.lastName}
              </h4>
              {/* <p className="text-gray-600 text-sm mb-2">@{userProfile.username}</p> */}
              <p className="text-gray-600 text-sm mb-4">{userProfile?.location?.city}</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {userProfile?.bio?.substring(0, 100)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'نصائح الملف الشخصي' : 'Profile Tips'}
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primaryColor rounded-full mt-2 flex-shrink-0" />
                <p>
                  {language === 'ar'
                    ? 'استخدم صورة ملف شخصي واضحة وعالية الجودة'
                    : 'Use a clear, high-quality profile picture'}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primaryColor rounded-full mt-2 flex-shrink-0" />
                <p>
                  {language == 'ar'
                    ? 'اكتب سيرة ذاتية جذابة تصف أسلوبك في الطهي.'
                    : 'Write a compelling bio that describes your cooking style'}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primaryColor rounded-full mt-2 flex-shrink-0" />
                <p>
                  {language == 'ar'
                    ? 'أضف روابط وسائل التواصل الاجتماعي لزيادة عدد متابعيك.'
                    : 'Add social media links to grow your following'}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primaryColor rounded-full mt-2 flex-shrink-0" />
                <p>
                  {language == 'ar'
                    ? 'تأكد من أن معلومات الاتصال الخاصة بك محدثة دائمًا.'
                    : 'Keep your contact information up to date'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'حالة الحساب' : 'Account Status'}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.profile.account_type}</span>
                <span className="font-medium text-primaryColor">{userProfile?.accountType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.profile.verification}</span>
                <span className="font-medium text-green-600">
                  {userProfile?.isEmailVerified ? t.profile.verified : t.profile.notverified}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePreview;
