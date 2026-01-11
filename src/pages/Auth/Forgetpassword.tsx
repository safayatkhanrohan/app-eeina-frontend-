import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { useForgotPasswordMutation } from '@/redux/Features/Auth/authApi';
import { forgetPasswordSchema, forgetPasswordFormData } from '@/schemas/auth/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Forgetpassword = (): JSX.Element => {
  const { t, isRTL, language } = useLanguage();
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<forgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: 'onChange', // validate on input change
  });

  const onSubmit = async (data: forgetPasswordFormData) => {
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success(t.auth.verifycode);
      sessionStorage.setItem('resetEmail', data.email);

      navigate(getLocalizedPath('/verify-reset-otp', language), {
        state: { email: data.email, redirectTo: '/Resetpassword', mode: 'reset' },
      });
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
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
              <h3 className="text-[25px] lg:text-[36px] font-medium">{t.auth.Forgotpassword}</h3>
              <p className="text-[14px] font-medium text-[#3F4247] mb-1">
                {t.auth.Forgotpasswordtitle}
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-7 lg:gap-y-4  flex flex-col flex-1"
              >
                {/* Email Input */}
                <div className="relative w-full ">
                  <input
                    type="email"
                    placeholder={t.auth.placeholder_email}
                    {...register('email')}
                    className=" block h-12 w-full px-3 pb-2.5 pt-4 text-base text-gray-800 !bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer"
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-[0] bg-[#FBFCFC] px-2 peer-focus:top-2 peer-focus:scale-75 
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
                      <span>{t.auth.SendRecoveryEmail}</span>
                    </div>
                  )}
                </Button>
                <p className="text-center text-[14px] font-medium text-[#3F4247] mb-1">
                  {t.auth.Justremember}
                  <Link to={getLocalizedPath('/login', language)} className="!text-[#34694F]">
                    {' '}
                    {t.auth.sign_in}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex ">
          <img
            src="/goalinfo.svg"
            alt="goalinfo"
            className="rounded-[32px] h-full w-full object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export { Forgetpassword };
