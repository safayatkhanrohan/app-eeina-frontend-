import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ChefHat, Users, Star, Globe } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../../schemas/auth/authSchema';
import { useLoginMutation } from '../../redux/Features/Auth/authApi';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { setAccessToken } from '@/redux/Features/Auth/authSlice';
import { analytics } from '@/utils/analytics';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { trackIfAllowed } from '@/utils/analyticsHelper';

// Get API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api/v1';

// Zod validation schema

export const Login = (): JSX.Element => {
  const { t, isRTL, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  if (user) {
    navigate(getLocalizedPath('/', language));
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // validate on input change
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setAccessToken(res?.data?.accessToken));
      toast.success(t.auth.login_success);

      // Track successful login
      trackIfAllowed(() => analytics.trackLogin('email'));

      navigate(getLocalizedPath('/', language));
    } catch (error: any) {
      toast.error(error?.data?.message || t.auth.login_failed);
    }
  };

  // OAuth handlers
  const handleGoogleLogin = () => {
    trackIfAllowed(() => analytics.trackLogin('google'));
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    trackIfAllowed(() => analytics.trackLogin('facebook'));
    window.location.href = `${API_URL}/auth/facebook`;
  };

  const stats = [
    {
      icon: Users,
      value: '50K+',
      label: t.auth.stat_users,
    },
    {
      icon: ChefHat,
      value: '25K+',
      label: t.auth.stat_recipes,
    },
    {
      icon: Star,
      value: '4.9',
      label: t.auth.stat_rating,
    },
    {
      icon: Globe,
      value: '150+',
      label: t.auth.stat_countries,
    },
  ];

  return (
    // <div className="min-h-screen flex">
    //   {/* Left Side - Branding */}
    //   <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primaryColor to-[#1c9a40] relative overflow-hidden">
    //     <div className="absolute inset-0 bg-black/10" />
    //     <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
    //       <div className="mb-2 flex flex-col justify-center items-center">
    //         <div className="rounded-3xl mb-6 w-40 h-16">
    //           <img
    //             src="/EEINA_GBg_RGB-01-removebg-preview.png"
    //             alt="logo"
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //         <h1 className="text-4xl font-bold mb-4">{t.auth.welcome_to_eeina}</h1>
    //         <p className="text-xl text-white/90 mb-8">{t.auth.discover_msg}</p>
    //       </div>

    //       {/* Stats */}
    //       <div className="grid grid-cols-2 gap-6 w-full max-w-md">
    //         {stats.map((stat, index) => (
    //           <div key={index} className="text-center">
    //             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
    //               <stat.icon className="w-6 h-6 text-white" />
    //             </div>
    //             <div className="text-2xl font-bold">{stat.value}</div>
    //             <div className="text-sm text-white/80">{stat.label}</div>
    //           </div>
    //         ))}
    //       </div>

    //       <div className="mt-8 text-center">
    //         <p className="text-white/80 text-sm">{t.auth.join_community_msg}</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Right Side - Login Form */}
    //   <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
    //     <div className="w-full max-w-md">
    //       {/* Mobile Logo */}
    //       <div className="lg:hidden text-center mb-8">
    //         <div className="bg-primaryColor text-white font-bold text-2xl px-6 py-3 rounded-xl inline-block mb-4">
    //           EEINA
    //         </div>
    //         <h1 className="text-2xl font-bold text-gray-900">{t.auth.welcome_back}</h1>
    //         <p className="text-gray-600">{t.auth.sign_in_to_continue}</p>
    //       </div>

    //       <Card className="shadow-xl border-0">
    //         <CardContent className="p-8">
    //           {/* Desktop Header */}
    //           <div className="hidden lg:block text-center mb-8">
    //             <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.auth.sign_in}</h2>
    //             <p className="text-gray-600">{t.auth.sign_in_to_account}</p>
    //           </div>

    //           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //             {/* Email Input */}
    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-2">
    //                 {t.auth.email}
    //               </label>
    //               <div className="relative">
    //                 <Mail
    //                   className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${
    //                     isRTL ? 'right-3' : 'left-3'
    //                   }`}
    //                 />
    //                 <Input
    //                   type="email"
    //                   placeholder={t.auth.placeholder_email}
    //                   className={`h-12 ${
    //                     isRTL ? 'pr-10 text-right' : 'pl-10'
    //                   } border-gray-300 focus:border-primaryColor focus:ring-primaryColor
    //                                         `}
    //                   {...register('email')}
    //                 />
    //               </div>
    //               {errors.email && (
    //                 <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
    //               )}
    //             </div>

    //             {/* Password Input */}
    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-2">
    //                 {t.auth.password}
    //               </label>
    //               <div className="relative">
    //                 <Lock
    //                   className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${
    //                     isRTL ? 'right-3' : 'left-3'
    //                   }`}
    //                 />
    //                 <Input
    //                   type={showPassword ? 'text' : 'password'}
    //                   placeholder={t.auth.placeholder_password}
    //                   className={`h-12 ${
    //                     isRTL ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10'
    //                   } border-gray-300 focus:border-primaryColor focus:ring-primaryColor`}
    //                   {...register('password')}
    //                 />
    //                 <Button
    //                   type="button"
    //                   variant="ghost"
    //                   size="icon"
    //                   className={`absolute top-1/2 transform -translate-y-1/2 ${
    //                     isRTL ? 'left-3' : 'right-3'
    //                   } text-gray-400 hover:text-gray-600`}
    //                   onClick={() => setShowPassword(!showPassword)}
    //                 >
    //                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    //                 </Button>
    //               </div>
    //               {errors.password && (
    //                 <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
    //               )}
    //             </div>

    //             {/* Remember Me & Forgot Password */}
    //             <div className="flex items-center justify-between">
    //               <label className="flex items-center gap-2 cursor-pointer">
    //                 <input
    //                   type="checkbox"
    //                   className="w-4 h-4 text-primaryColor border-gray-300 rounded focus:ring-primaryColor"
    //                   {...register('rememberMe')}
    //                 />
    //                 <span className="text-sm text-gray-600">{t.auth.remember_me}</span>
    //               </label>
    //               <Link
    //                 to={getLocalizedPath('/forgot-password', language)}
    //                 className="text-sm text-primaryColor hover:text-[#1c9a40] font-medium"
    //               >
    //                 {t.auth.forgot_password}
    //               </Link>
    //             </div>

    //             {/* Login Button */}
    //             <Button
    //               type="submit"
    //               disabled={isSubmitting || !isValid}
    //               className="w-full h-12 bg-primaryColor hover:bg-[#1c9a40] text-white font-semibold text-base rounded-xl"
    //             >
    //               {isSubmitting ? (
    //                 <div className="flex items-center gap-2">
    //                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    //                   <span>{t.auth.signing_in}</span>
    //                 </div>
    //               ) : (
    //                 <div className="flex items-center gap-2">
    //                   <span>{t.auth.sign_in}</span>
    //                   <ArrowRight className="w-4 h-4" />
    //                 </div>
    //               )}
    //             </Button>

    //             {/* Divider */}
    //             <div className="relative">
    //               <Separator />
    //               <div className="absolute inset-0 flex items-center justify-center">
    //                 <span className="bg-white px-4 text-sm text-gray-500">{t.auth.or}</span>
    //               </div>
    //             </div>

    //             {/* Social Login */}
    //             <div className="space-y-3">
    //               <Button
    //                 type="button"
    //                 variant="outline"
    //                 className="w-full h-12 border-gray-300 hover:border-gray-400"
    //                 onClick={handleGoogleLogin}
    //               >
    //                 <img
    //                   src="https://developers.google.com/identity/images/g-logo.png"
    //                   alt="Google"
    //                   className="w-5 h-5 sm:mr-3"
    //                 />
    //                 {t.auth.continue_with_google}
    //               </Button>
    //               <Button
    //                 type="button"
    //                 variant="outline"
    //                 className="w-full h-12 border-gray-300 hover:border-gray-400 "
    //                 onClick={handleFacebookLogin}
    //               >
    //                 <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded sm:mr-3 flex items-center justify-center">
    //                   <span className="text-white font-bold text-xs">f</span>
    //                 </div>
    //                 {t.auth.continue_with_facebook}
    //               </Button>
    //             </div>

    //             {/* Sign Up Link */}
    //             <div className="text-center pt-4">
    //               <p className="text-gray-600">
    //                 {t.auth.dont_have_account}{' '}
    //                 <Link
    //                   to={getLocalizedPath('/signup', language)}
    //                   className="text-primaryColor hover:text-[#1c9a40] font-semibold"
    //                 >
    //                   {t.auth.signup}
    //                 </Link>
    //               </p>
    //             </div>
    //           </form>
    //         </CardContent>
    //       </Card>

    //       {/* Terms */}
    //       <div className="text-center mt-6">
    //         <p className="text-xs text-gray-500">
    //           {t.auth.agree_disclaimer}{' '}
    //           <Link
    //             to={getLocalizedPath('/Terms_Conditions', language)}
    //             className="text-primaryColor hover:underline"
    //           >
    //             {t.footer.terms_conditions}
    //           </Link>{' '}
    //           {t.auth.and}{' '}
    //           <Link
    //             to={getLocalizedPath('/privacy-policy', language)}
    //             className="text-primaryColor hover:underline"
    //           >
    //             {t.auth.privacy_policy}
    //           </Link>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container">
      <div className="flex justify-between items-stretch gap-5 md:gap-7 xl2:gap-16 py-16">
        <div className=" items-start md:flex-1 flex flex-col   justify-around px-0 md:px-5 xl2:px-10">
          <div className="flex flex-col gap-8">
            <h2 className="text-center md:text-start font-semibold text-[24px] xl:text-[36px] xl2:text-[40px]">
              {t.auth.loginTitle}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-[#FBFCFC] md:shadow  rounded-[32px]">
              {/* Email Input */}
              <div className="relative w-full ">
                <input
                  type="email"
                  placeholder={t.auth.placeholder_email}
                  {...register('email')}
                  className="block h-12 w-full px-3 pb-2.5 pt-4 text-base text-gray-800 bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer"
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-[0] bg-white px-2 peer-focus:top-2 peer-focus:scale-75 
                    peer-focus:-translate-y-4 peer-focus:text-[#84818A] 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                     peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4
                    start-3"
                >
                 {t.auth.email}
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              {/* Password Input */}
               <div className="relative w-full ">
                <input
                   type={showPassword ? 'text' : 'password'}
                    placeholder={t.auth.placeholder_password}
                  {...register('password')}
                  className="block h-12 w-full px-3 pb-2.5 pt-4 text-base text-gray-800 bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer"
                />
                 <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`absolute top-1/2 transform -translate-y-1/2 hover:bg-transparent ${
                      isRTL ? 'left-3' : 'right-3'
                    } text-gray-400 hover:text-gray-600`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-[0] bg-white px-2 peer-focus:top-2 peer-focus:scale-75 
                    peer-focus:-translate-y-4 peer-focus:text-[#84818A] 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                     peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4
                    start-3"
                >
                 {t.auth.password}
                </label>
                  {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primaryColor border-gray-300 rounded focus:ring-primaryColor"
                    {...register('rememberMe')}
                  />
                  <span className="text-sm text-gray-600">{t.auth.remember_me}</span>
                </label>
                <Link
                  to={getLocalizedPath('/forgot-password', language)}
                  className="text-sm text-primaryColor hover:text-[#1c9a40] font-medium"
                >
                  {t.auth.forgot_password}
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full h-12 bg-primaryColor hover:bg-[#1c9a40] text-white font-semibold text-base rounded-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.auth.signing_in}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{t.auth.sign_in}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">{t.auth.or}</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-gray-300 hover:border-gray-400"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="w-5 h-5 sm:mr-3"
                  />
                  {t.auth.continue_with_google}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-gray-300 hover:border-gray-400 "
                  onClick={handleFacebookLogin}
                >
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded sm:mr-3 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">f</span>
                  </div>
                  {t.auth.continue_with_facebook}
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  {t.auth.dont_have_account}{' '}
                  <Link
                    to={getLocalizedPath('/signup', language)}
                    className="text-primaryColor hover:text-[#1c9a40] font-semibold"
                  >
                    {t.auth.signup}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1  hidden md:flex">
          <img
            src="/Calculate my needs.svg"
            alt="goalinfo"
            className="rounded-[32px] h-full w-full object-cover "
          />
        </div>
      </div>
    </div>
  );
};
