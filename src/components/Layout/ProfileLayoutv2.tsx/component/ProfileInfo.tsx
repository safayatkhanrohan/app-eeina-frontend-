import { useLanguage } from '@/contexts/LanguageContext';
import { useAppSelector } from '@/hooks/hook';
import { useResendOtpMutation } from '@/redux/Features/Auth/authApi';
import { FacebookIcon, MailWarning, Twitter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { formatDate } from '@/lib/formatDate';
import { Check, InstagramIcon, Website } from '@/assets';
import { Button } from '@/components/ui/button';

const ProfileInfo = () => {
  const { t, isRTL, language } = useLanguage();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const isEditPage = location.pathname.includes('/edit');
  const [resendOtp] = useResendOtpMutation();
  const navigate = useNavigate();

  const email = user?.email;
  const verifyEmail = async () => {
    if (!email) return;

    try {
      await resendOtp({ email }).unwrap();
      toast.success('OTP resent successfully!');
      navigate('/verify-otp', { state: { email, redirectTo: '/profile' } });
    } catch (error) {
      console.log(error);
      toast.error('Failed to resend OTP');
    }
  };
  console.log('user', user);
  return (
    <div className="relative mb-6 sm:mb-16 flex flex-col gap-5 mt-14 md:mt-10 lg:mt-0">
      <div className="h-32 sm:h-64 rounded-[5px] overflow-hidden shadow-sm relative group">
        <img
          src={user?.coverPhoto?.url || '/coverImage.jpeg'}
          alt="Cover"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => (e.currentTarget.src = '/coverImage.jpeg')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
      </div>
      <div className=" sm:px-10 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 z-30">
        {/* Avatar */}
        <div className="-mt-14 relative group">
          <div className={` bg-white w-24 h-24 sm:w-52 sm:h-52 rounded-full`}>
            <div className="p-2 w-full h-full relative">
              <img
                className="relative p-[3px] object-cover  border-[2px] border-[#6AB240] w-full h-full rounded-full"
                src={user?.profilePicture?.url || '/unnamed.jpg'}
                alt="profile"
                onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
              />
              <span
                onClick={() => !user?.isEmailVerified && verifyEmail()}
                title={user?.isEmailVerified ? 'Email verified' : 'Verify your email'}
                className={` cursor-pointer
                    absolute bottom-2 right-3 md:right-7 w-7 md:w-10 h-6 md:h-10 rounded-full 
                 ${user?.isEmailVerified ? 'bg-[#0084FF]' : 'bg-red-500'}
                 flex justify-center items-center border border-white"
                    `}
              >
                {user?.isEmailVerified ? (
                  <Check className="text-white" />
                ) : (
                  <>
                    <MailWarning className="w-3 md:w-4 h-3 md:h-4 text-white" />
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="w-full flex-1 pb-1 sm:pb-4 text-center sm:text-start">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
            <h1 className="text-[22px] lg:text-[30px] font-bold text-[#6AB240] drop-shadow-md sm:drop-shadow-none">
              {user?.firstName} {user?.lastName}
            </h1>
            <span className="text-[14px] font-normal text-[#6AB240] drop-shadow-sm sm:drop-shadow-none">
              {language === 'ar' ? 'انضم في ' : 'Joined '}
              {user?.createdAt && formatDate(user.createdAt, { short: true })}
            </span>
          </div>
          <div
            className=" border border-[#E1E1E1] rounded-[10px] py-3 px-4 mt-3 !w-full flex-1
           lg:border-0 lg:rounded-none lg:py-0 lg:px-0 lg:mt-0 lg:w-auto
          flex flex-row justify-between lg:justify-start sm:items-center gap-2 sm:gap-4 mb-1"
          >
            <div className="flex flex-col gap-1 items-center">
              <h3 className="font-normal text-[18px] text-[#22212C]">{t.profile.followers}</h3>
              <p className="font-bold text-[20px] text-[#22212C]">{user?.followerCount || 0}</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <h3 className="font-normal text-[18px] text-[#22212C]">{t.profile.following}</h3>
              <p className="font-bold text-[20px] text-[#22212C]">
                {' '}
                {user?.following?.length || 0}
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <h3 className="font-normal text-[18px] text-[#22212C]">{t.profile.recipes}</h3>
              <p className="font-bold text-[20px] text-[#22212C]">{user?.totalRecipe || 0}</p>
            </div>
          </div>
        </div>
        {!isEditPage ? (
          <div className="hidden lg:flex flex-col gap-2 pb-2 sm:pb-4 w-full sm:w-auto">
            <h4 className="text-[14px] font-normal text-[#6AB240] drop-shadow-sm sm:drop-shadow-none ">
              {t.profile.Followme}
            </h4>
            <div className="flex justify-between items-center gap-4">
              <a
                href={user?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#E1E1E1] rounded-[20px] w-16 h-12 flex justify-center items-center  bg-white"
              >
                <Website className="text-[#6AB240]" />
              </a>
              <a
                href={user?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#E1E1E1] rounded-[20px]  w-16 h-12 flex justify-center items-center bg-white"
              >
                <Twitter className="text-[#6AB240]" />
              </a>
              <a
                href={user?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#E1E1E1] rounded-[20px]  w-16 h-12 flex justify-center items-center bg-white"
              >
                <FacebookIcon className="text-[#6AB240]" />
              </a>
              <a
                href={user?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#E1E1E1] rounded-[20px]  w-16 h-12 flex justify-center items-center bg-white"
              >
                <InstagramIcon className="text-[#6AB240]" />
              </a>
            </div>
          </div>
        ) : (
          <Button
            type="submit"
            form="edit-profile-form"
            className="hidden lg:flex bg-primaryColor hover:bg-[#1c9a40] text-white px-4 sm:px-8 rounded-[12px] py-3 h-12 w-1/2 sm:w-auto"
          >
            {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
