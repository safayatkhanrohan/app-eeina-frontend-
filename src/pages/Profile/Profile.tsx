import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../../components/ui/button';
import { Settings, Calendar, Check, Edit3, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { Avatar } from '@/components/ui/avatar';
import { formatDate } from '@/lib/formatDate';

import { toast } from 'sonner';
import { useResendOtpMutation } from '@/redux/Features/Auth/authApi';
import ProfileStatsCard from '@/components/Profile/ProfileStatsCard';
import { ProfileTabs } from '@/components/Profile/ProfileTabs';
import { ProfileRecipesTab } from '@/components/Profile/ProfileRecipesTab';
import { ProfileGoalsTab } from '@/components/Profile/ProfileGoalsTab';
import { ProfileSavedTab } from '@/components/Profile/ProfileSavedTab';
import { motion, AnimatePresence } from 'framer-motion';
import { JSX } from 'react/jsx-runtime';

export const Profile = (): JSX.Element => {
  const { t, isRTL, language } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState<'recipes' | 'goals' | 'saved'>('recipes');

  const [resendOtp] = useResendOtpMutation();
  const navigate = useNavigate();

  const email = user?.email;
  const verifyEmail = async () => {
    if (!email) return;

    try {
      await resendOtp({ email }).unwrap();
      toast.success(t.auth.otp_resent_success);
      navigate(getLocalizedPath('/verify-otp', language), {
        state: { email, redirectTo: '/profile' },
      });
    } catch (error) {
      console.log(error);
      toast.error(t.auth.otp_resend_failed);
    }
  };

  return (
    <div className="min-h-screen pb-[3rem] lg:pb-0 bg-gray-50/30">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* --- Header Section --- */}
        <div className="relative mb-6 sm:mb-28">
          {/* Cover Image */}
          <div className="h-80 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm relative group">
            <img
              src={user?.coverPhoto?.url || '/coverImage.jpeg'}
              alt="Cover"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/coverImage.jpeg')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

            {/* Edit Cover Button (Optional - Visual only for now) */}
            <button className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-2 rounded-full transition-all opacity-100 sm:opacity-0 group-hover:opacity-100 z-40">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Content Wrapper */}
          <div className="absolute bottom-4 sm:-bottom-20 left-0 right-0 px-4 sm:px-10 flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-6 z-30">
            {/* Avatar */}
            <div className="relative group">
              <div className="p-1 bg-white/20 sm:bg-white backdrop-blur-sm sm:backdrop-blur-none rounded-full shadow-xl">
                <Avatar className="w-24 h-24 sm:w-40 sm:h-40 border-2 sm:border-4 border-white/50 sm:border-white">
                  <img
                    src={user?.profilePicture?.url || '/unnamed.jpg'}
                    alt={user?.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
                  />
                </Avatar>
              </div>
              {user?.accountStatus === 'active' && (
                <span
                  className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 border-4 border-white rounded-full"
                  title="Active"
                ></span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 pb-1 sm:pb-4 text-center sm:text-start">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
                <h1 className="text-2xl sm:text-4xl font-bold text-white sm:text-gray-900 drop-shadow-md sm:drop-shadow-none">
                  {user?.firstName} {user?.lastName}
                </h1>

                {/* Verification Badge */}
                <div
                  onClick={() => !user?.isEmailVerified && verifyEmail()}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-md cursor-pointer transition-colors shadow-sm
                        ${
                          user?.isEmailVerified
                            ? 'bg-blue-500/80 sm:bg-blue-500/10 text-white sm:text-blue-600'
                            : 'bg-yellow-500/80 sm:bg-yellow-500/10 text-white sm:text-yellow-600'
                        }
                    `}
                >
                  {user?.isEmailVerified ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>{t.profile.verified}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3 h-3" />
                      <span>{t.profile.verify_email_btn}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1.5 text-white/90 sm:text-gray-500">
                  <Calendar className="w-4 h-4 text-white/80 sm:text-gray-400" />
                  <span className="drop-shadow-sm sm:drop-shadow-none">
                    {t.profile.joined_date}
                    {user?.createdAt && formatDate(user.createdAt, { short: true })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pb-2 sm:pb-4 w-full sm:w-auto">
              <Link
                to={getLocalizedPath('/edit-profile', language)}
                className="flex-1 sm:flex-none"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/90 backdrop-blur hover:bg-white text-gray-900 border-gray-200 shadow-sm"
                >
                  <Edit3 className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.profile.edit_profile}
                </Button>
              </Link>
              <Link
                to={getLocalizedPath('/account-settings', language)}
                className="flex-1 sm:flex-none"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/90 backdrop-blur hover:bg-white text-gray-900 border-gray-200 shadow-sm"
                >
                  <Settings className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.profile.account_settings}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="mb-8">
          <ProfileStatsCard />
        </div>

        {/* --- Main Content Area --- */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="w-full">
            {/* Tabs Wrapper */}
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'recipes' && <ProfileRecipesTab />}
                {activeTab === 'goals' && <ProfileGoalsTab />}
                {activeTab === 'saved' && <ProfileSavedTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
