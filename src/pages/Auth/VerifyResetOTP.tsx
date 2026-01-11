import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, JSX } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { MailCheck } from 'lucide-react';
import { toast } from 'sonner';
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
  useSendPhoneOtpMutation,
  useVerifyResetOtpMutation,
  useResendResetOtpMutation,
} from '@/redux/Features/Auth/authApi';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

/**
 * VerifyOtp Component
 *
 * Handles email verification via OTP.
 * After successful email verification, if phone number is provided,
 * it will trigger phone OTP and redirect to phone verification.
 */
export const VerifyResetOtp = (): JSX.Element => {
  const { t, language } = useLanguage();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [resendCooldown, setResendCooldown] = useState(0); // seconds left
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyResetOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendResetOtpMutation();
  const email = location.state?.email;

  // Countdown effect
  useEffect(() => {
    if (resendCooldown === 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (!email) return;

    try {
      const { data } = await verifyOtp({ email, otp: enteredOtp }).unwrap();
      const token = data.resetToken;
      console.log('data', data);
      navigate(getLocalizedPath('/resetpassword', language), {
        state: { email, token },
      });
    } catch (error) {}
  };

  const handleResendOtp = async () => {
    if (!email || resendCooldown > 0) return;

    try {
      await resendOtp({ email }).unwrap();
      toast.success(t.auth.otp_resent_success);
      setResendCooldown(60); // start 1-minute cooldown
    } catch (error) {
      console.log(error);
      toast.error(t.auth.otp_resend_failed);
    }
  };

  return (
    <div className="min-h-screen p-4 flex justify-center items-center">
      <div className="w-full max-w-md ">
        <Card className="shadow-2xl border-0 rounded-2xl">
          <CardContent className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <MailCheck className="h-10 w-10 text-primaryColor" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.auth.verify_account}</h2>
            <p className="text-gray-600 mb-8">{t.auth.sent_code_msg}</p>

            <div className="flex justify-center gap-2 sm:gap-3 mb-8">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-8 h-8 sm:w-14 sm:h-14 text-center text-base sm:text-2xl font-semibold border border-gray-300 rounded-lg focus:border-primaryColor focus:ring-1 focus:ring-primaryColor transition"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full h-12 bg-primaryColor text-white text-base font-semibold hover:bg-[#1c9a40] transition-colors duration-300
               disabled:bg-primaryColor disabled:opacity-50"
            >
              {isVerifying ? t.auth.verifying : t.auth.verify_btn}
            </Button>

            <div className="mt-6 text-sm text-gray-600">
              {t.auth.didnt_receive_code}{' '}
              <button
                onClick={handleResendOtp}
                disabled={resendCooldown > 0}
                className={`font-semibold text-primaryColor hover:underline focus:outline-none ${
                  resendCooldown > 0 ? 'opacity-50 cursor-not-allowed hover:underline-none ' : ''
                }`}
              >
                {resendCooldown > 0 ? `${t.auth.resend_after} ${resendCooldown}s` : t.auth.resend}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
