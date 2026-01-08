import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { useResetPasswordMutation } from '@/redux/Features/Auth/authApi';
import { ResetPasswordFormData, resetpasswordSchema } from '@/schemas/auth/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Resetpassword = () => {
  const { t, isRTL, language } = useLanguage();
  const [ResetPassword] = useResetPasswordMutation();

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  // const email = location.state?.email || sessionStorage.getItem("resetEmail");

  // const otp = sessionStorage.getItem('resetOtp');

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetpasswordSchema),
    mode: 'onChange', // validate on input change
  });
  useEffect(() => {
    if (!email || !otp) {
      toast.error(t.auth.session_expired);
      navigate(getLocalizedPath('/forgot-password', language));
    }
  }, [email, otp]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log(email, otp, data.password);
    try {
      const payload = {
        email,
        otp,
        newPassword: data.password,
      };
      console.log(payload);
      const res = await ResetPassword(payload).unwrap();
      toast.success(t.auth.changepassword_success);
      sessionStorage.removeItem('resetEmail');
      sessionStorage.removeItem('resetOtp');
      navigate(getLocalizedPath('/login', language));
    } catch (error: any) {
      console.log('newPassword', error);
      if (error?.data?.message == 'Invalid or expired OTP. Please request a new one.') {
        toast.error(t.auth.session_expired);
        navigate(getLocalizedPath('/forgot-password', language));
      }
      toast.error(error?.data?.message);
    }

    sessionStorage.removeItem('resetEmail');
    sessionStorage.removeItem('resetOtp');
  };
  console.log('isValid', isValid);
  return (
    <div className="container ">
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-5 lg:gap-7 xl2:gap-16 py-16">
        <div className="items-start w-full lg:flex-1 flex flex-col  px-0 lg:px-5 xl2:px-10">
          <div className="flex w-full flex-col gap-0 lg:gap-8 flex-1 lg:mt-28">
            <h2 className="leading-8 lg:leading-normal text-start font-semibold text-[20px] lg:text-[24px] xl:text-[36px] xl2:text-[40px]">
              {t.auth.ForgitpasswordTitle}
            </h2>
            <div className="max-h-fit bg-[#FBFCFC] lg:shadow  rounded-[32px] py-5 flex flex-col gap-5  flex-1  lg:px-8 lg:py-16">
              <h3 className="text-[25px] lg:text-[36px] font-medium">{t.auth.createnewpassword}</h3>
              <p className="text-[14px] font-medium text-[#3F4247] mb-1">
                {t.auth.Createanaccounttitle}
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-7 lg:gap-y-4  flex flex-col flex-1"
              >
                {/* Password */}
                <div>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.auth.placeholder_password}
                      {...register('password')}
                      className="block h-12 w-full px-3 pb-2.5 pt-4 text-[14px] xl2:text-base text-gray-800 bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`absolute top-1/2 transform -translate-y-1/2 hover:!bg-transparent ${
                        isRTL ? 'left-3' : 'right-3'
                      } text-gray-400 hover:text-gray-600`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-[#84818A]" />
                      ) : (
                        <Eye className="w-5 h-5 text-[#84818A]" />
                      )}
                    </Button>
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-[0] bg-[#FBFCFC] px-2 peer-focus:top-2 peer-focus:scale-75 
                        peer-focus:-translate-y-4 peer-focus:text-[#84818A] 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                         peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4
                        start-3"
                    >
                      {t.auth.createnewpassword}
                    </label>
                  </div>

                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                {/* Confirm Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t.auth.confirm_password}
                      {...register('confirmPassword')}
                      className="block h-12 w-full px-3 pb-2.5 pt-4 text-[14px] xl2:text-base text-gray-800 bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:!bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-[0] bg-[#FBFCFC] px-2 peer-focus:top-2 peer-focus:scale-75 
                        peer-focus:-translate-y-4 peer-focus:text-[#84818A] 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                         peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4
                        start-3"
                    >
                      {t.auth.Confirmnewpassword}
                    </label>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full h-12 bg-[#87B740] hover:bg-primaryColor text-white font-semibold text-base rounded-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.auth.send}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{t.auth.createnewpassword}</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex ">
          <img
            src="/goalDuration.svg"
            alt="goalDuration"
            className="rounded-[32px] h-full w-full object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export { Resetpassword };
