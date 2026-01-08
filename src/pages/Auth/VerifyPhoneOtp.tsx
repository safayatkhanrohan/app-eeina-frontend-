import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import {
  useVerifyPhoneOtpMutation,
  useResendPhoneOtpMutation,
} from '@/redux/Features/Auth/authApi';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

/**
 * VerifyPhoneOtp Component
 *
 * Handles phone number verification via SMS OTP.
 * Users receive a 6-digit code via SMS and enter it here to verify their phone.
 *
 * Features:
 * - 6-digit OTP input with auto-focus
 * - Cooldown timer for resend functionality
 * - Masked phone number display for privacy
 * - Auto-redirect after successful verification
 */
export const VerifyPhoneOtp = (): JSX.Element => {
  const { t, language } = useLanguage();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // RTK Query mutations for phone OTP
  const [verifyPhoneOtp] = useVerifyPhoneOtpMutation();
  const [resendPhoneOtp] = useResendPhoneOtpMutation();

  // Get email and phone from navigation state
  const email = location.state?.email || sessionStorage.getItem('userEmail');
  const phone = location.state?.phone || sessionStorage.getItem('userPhone');
  const redirectTo = location.state?.redirectTo || '/';

  // Focus first input on mount and validate required data
  useEffect(() => {
    inputRefs.current[0]?.focus();

    // Redirect if missing required data
    if (!email || !phone) {
      toast.error('Missing email or phone number');
      navigate(getLocalizedPath('/signup', language));
    }

    // Store in session for persistence
    if (email) sessionStorage.setItem('userEmail', email);
    if (phone) sessionStorage.setItem('userPhone', phone);
  }, [email, phone, navigate, language, t]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown === 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  /**
   * Handle OTP input change
   * Auto-advances to next input on valid digit entry
   */
  const handleChange = (element: HTMLInputElement, index: number) => {
    // Only allow numeric input
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle keyboard navigation
   * Allows backspace to move to previous input
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /**
   * Handle paste event
   * Allows pasting full OTP code
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or first empty
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  /**
   * Verify the entered OTP
   */
  const handleVerify = async () => {
    setIsVerifying(true);
    const enteredOtp = otp.join('');

    if (!email || !phone) {
      toast.error('Missing email or phone number');
      setIsVerifying(false);
      return;
    }

    if (enteredOtp.length !== 6) {
      toast.error(t.auth?.otp_invalid_length || 'Please enter all 6 digits');
      setIsVerifying(false);
      return;
    }

    try {
      await verifyPhoneOtp({
        phone,
        otp: enteredOtp,
        email,
      }).unwrap();

      toast.success('Phone number verified successfully!');

      // Clear session storage
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userPhone');

      // Navigate to redirect destination
      navigate(getLocalizedPath(redirectTo, language));
    } catch (error: any) {
      console.error('Phone OTP verification error:', error);
      toast.error(error?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
      setOtp(new Array(6).fill(''));
    }
  };

  /**
   * Resend OTP via SMS
   */
  const handleResendOtp = async () => {
    if (!email || !phone || resendCooldown > 0) return;

    try {
      await resendPhoneOtp({ phone, email }).unwrap();
      toast.success('Verification code sent to your phone');
      setResendCooldown(60); // Start 60-second cooldown
    } catch (error: any) {
      console.error('Resend phone OTP error:', error);
      toast.error(error?.data?.message || 'Failed to resend code. Please try again.');
    }
  };

  /**
   * Get masked phone number for display
   */
  const getMaskedPhone = () => {
    if (!phone) return '';
    if (phone.length <= 6) return phone;
    return phone.substring(0, 6) + '****';
  };

  return (
    <div className="min-h-screen p-4 flex justify-center items-center">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 rounded-2xl">
          <CardContent className="p-8 text-center">
            {/* Icon */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <Smartphone className="h-10 w-10 text-primaryColor" />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t.auth?.verify_account || 'Verify Your Phone'}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-2">
              {t.auth?.sent_code_msg || "We've sent a verification code to"}
            </p>
            <p className="text-primaryColor font-semibold mb-6">{getMaskedPhone()}</p>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-8" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={data}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="w-10 h-10 sm:w-14 sm:h-14 text-center text-base sm:text-2xl font-semibold border border-gray-300 rounded-lg focus:border-primaryColor focus:ring-1 focus:ring-primaryColor transition"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full h-12 bg-primaryColor text-white text-base font-semibold hover:bg-[#1c9a40] transition-colors duration-300 disabled:bg-primaryColor disabled:opacity-50"
            >
              {isVerifying ? t.auth?.verifying || 'Verifying...' : t.auth?.verify_btn || 'Verify'}
            </Button>

            {/* Resend Link */}
            <div className="mt-6 text-sm text-gray-600">
              {t.auth?.didnt_receive_code || "Didn't receive the code?"}{' '}
              <button
                onClick={handleResendOtp}
                disabled={resendCooldown > 0}
                className={`font-semibold text-primaryColor hover:underline focus:outline-none ${
                  resendCooldown > 0 ? 'opacity-50 cursor-not-allowed hover:no-underline' : ''
                }`}
              >
                {resendCooldown > 0
                  ? `${t.auth?.resend_after || 'Resend in'} ${resendCooldown}s`
                  : t.auth?.resend || 'Resend'}
              </button>
            </div>

            {/* Help Text */}
            <p className="mt-4 text-xs text-gray-400">
              {'Make sure you have a stable network connection to receive SMS'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
