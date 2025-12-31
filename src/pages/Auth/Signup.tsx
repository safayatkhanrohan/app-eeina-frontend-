import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import {
  Check,
  ChefHat,
  Eye,
  EyeOff,
  Globe,
  Heart,
  Lock,
  Mail,
  Phone,
  Star,
  User,
  Users,
} from 'lucide-react';
import { SignupFormData, signupSchema } from '../../schemas/auth/authSchema';
import { useSignupMutation } from '../../redux/Features/Auth/authApi';
import { toast } from 'sonner';
import { useAppSelector } from '../../hooks/hook';
import { useReferralsTrackMutation } from '@/redux/Features/referrals/referralApi';
import { analytics } from '@/utils/analytics';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { trackIfAllowed } from '@/utils/analyticsHelper';

// Get API URL from environment
const API_URL = import.meta.env.VITE_API_URL;

export const Signup = (): JSX.Element => {
  const { language, t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [signUp] = useSignupMutation();
  const navigate = useNavigate();
  const [referralsTrack] = useReferralsTrackMutation();

  const user = useAppSelector((state) => state.auth.user);

  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref');

  useEffect(() => {
    if (!referralCode) return;

    referralsTrack({ referralCode })
      .unwrap()
      .then(() => localStorage.setItem('referral_code', referralCode));
  }, [referralCode]);

  useEffect(() => {
    if (user) {
      navigate(getLocalizedPath('/', language));
    }
  }, [user, navigate, language]);

  const stats = [
    { icon: Users, value: '50K+', label: t.auth.stat_users },
    { icon: ChefHat, value: '25K+', label: t.auth.stat_recipes },
    { icon: Star, value: '4.9', label: t.auth.stat_rating },
    { icon: Globe, value: '150+', label: t.auth.stat_countries },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password');

  // calculate password strength
  React.useEffect(() => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      const referralCode = localStorage.getItem('referral_code');
      const payload = referralCode ? { ...data, referralCode } : data;
      await signUp(payload).unwrap();
      toast.success(t.auth.signup_success);

      // Track successful signup
       trackIfAllowed(() =>analytics.trackSignup('email'));

      navigate(getLocalizedPath('/verify-otp', language), {
        state: { email: data.email, redirectTo: '/goals-setup' },
      });
    } catch (error: any) {
      toast.error(error?.data?.message || t.auth.signup_failed);
      console.log('signup error', error);
    }
  };

  // OAuth handlers with tracking
  const handleGoogleSignup = () => {
     trackIfAllowed(() =>analytics.trackSignup('google'));
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleFacebookSignup = () => {
     trackIfAllowed(() =>analytics.trackSignup('facebook'));
    window.location.href = `${API_URL}/auth/facebook`;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return t.auth.password_weak;
    if (passwordStrength <= 4) return t.auth.password_medium;
    return t.auth.password_strong;
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Branding */}
      <div className="hidden lg:flex justify-center items-center lg:w-1/2 bg-gradient-to-br from-primaryColor to-[#1c9a40] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className=" relative z-10 flex items-center flex-col justify-between text-center  p-16 text-white">
          {/* Top Content */}
          <div className="h-full">
            <div className="mb-3 flex flex-col justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-6 inline-block">
                <Heart className="w-16 h-16 text-white mx-auto" />
              </div>
              <h1 className="text-4xl font-bold mb-4">{t.auth.join_eeina_today}</h1>
              <p className="text-xl text-white/90 mb-8">{t.auth.start_journey_msg}</p>
            </div>

            {/* Features */}
            <div className="flex flex-col justify-center items-center space-y-4  max-w-md mx-auto text-center">
              <div className="flex items-center gap-3 text-center flex-1 justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white " />
                </div>
                <span className="text-white/90 text-start w-[16rem]">
                  {t.auth.personalized_recipes_goals}
                </span>
              </div>
              <div className="flex items-center gap-3 text-center flex-1 justify-center ">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 text-start w-[16rem]">
                  {t.auth.track_progress_nutrition}
                </span>
              </div>
              <div className="flex items-center gap-3 text-center flex-1 justify-center ">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 text-start w-[16rem]">
                  {t.auth.supportive_community}
                </span>
              </div>
            </div>
          </div>

          {/* Stats at the bottom */}
          <div className="grid grid-cols-2 gap-8 w-full max-w-md mx-auto mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-6 sm:p-12">
        <div className="w-full max-w-md  ">
          <div className="lg:hidden text-center mb-8">
            <div className="bg-primaryColor text-white font-bold text-2xl px-6 py-3 rounded-xl inline-block mb-4">
              EEINA
            </div>
            <h1 className="text-[20px] md:text-3xlfont-bold text-gray-900">
              {t.auth.create_new_account}
            </h1>
            <p className="text-gray-600 mt-2">{t.auth.join_our_community}</p>
          </div>
          <Card className="shadow-2xl border-0 rounded-2xl">
            <CardContent className="p-8">
              <div className="hidden lg:block text-center mb-8">
                <h2 className="text-[20px] md:text-3xl font-bold text-gray-900 mb-2">
                  {t.auth.create_account}
                </h2>
                <p className="text-gray-600">{t.auth.start_journey}</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder={t.auth.first_name}
                        {...register('firstName')}
                        className="h-12 pl-10 border-gray-300 focus:border-primaryColor"
                      />
                    </div>
                    {errors.firstName && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder={t.auth.last_name}
                        {...register('lastName')}
                        className="h-12 pl-10 border-gray-300 focus:border-primaryColor "
                      />
                    </div>
                    {errors.lastName && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email&& phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder={t.auth.placeholder_email}
                        {...register('email')}
                        className="h-12 pl-10 border-gray-300 focus:border-primaryColor"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder={t.auth.phone_number} // or enter_phone
                        {...register('phone')}
                        className="h-12 pl-10 border-gray-300 focus:border-primaryColor"
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.auth.placeholder_password}
                      {...register('password')}
                      className="h-12 pl-10 pr-10 border-gray-300 focus:border-primaryColor"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-gray-100"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.password.message}
                    </span>
                  )}
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{
                              width: `${(passwordStrength / 5) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t.auth.confirm_password}
                    {...register('confirmPassword')}
                    className="h-12 pl-10 pr-10 border-gray-300 focus:border-primaryColor"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-gray-100"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm -mt-4 block">
                    {errors.confirmPassword.message}
                  </span>
                )}

                {/* Terms */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    {...register('agreeToTerms')}
                    className="w-4 h-4 mt-1 rounded border-gray-300 text-primaryColor focus:ring-primaryColor"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                    {t.auth.i_agree_to}{' '}
                    <Link
                      to={getLocalizedPath('/Terms_Conditions', language)}
                      className="font-medium text-primaryColor hover:underline"
                    >
                      {t.footer.terms_conditions}
                    </Link>{' '}
                    &{' '}
                    <Link
                      to={getLocalizedPath('/privacy-policy', language)}
                      className="font-medium text-primaryColor hover:underline"
                    >
                      {t.auth.privacy_policy}
                    </Link>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <span className="text-red-500 text-sm -mt-4 block">
                    {errors.agreeToTerms.message}
                  </span>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primaryColor text-white text-base font-semibold hover:bg-[#1c9a40] transition-colors duration-300 disabled:bg-gray-400"
                >
                  {isSubmitting ? t.auth.creating_account : t.auth.create_account}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">{t.auth.or}</span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:border-gray-400"
                    onClick={handleGoogleSignup}
                  >
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google"
                      className="w-5 h-5 mr-3"
                    />
                    {t.auth.sign_up_google}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:border-gray-400"
                    onClick={handleFacebookSignup}
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded mr-3 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">f</span>
                    </div>
                    {t.auth.sign_up_facebook}
                  </Button>
                </div>
              </form>
              <div className="mt-6 text-center text-sm text-gray-600">
                {t.auth.already_have_account}{' '}
                <Link
                  to={getLocalizedPath('/login', language)}
                  className="font-semibold text-primaryColor hover:underline"
                >
                  {t.auth.login}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
