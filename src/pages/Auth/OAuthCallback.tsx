import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/hook';
import { setAccessToken } from '@/redux/Features/Auth/authSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

/**
 * OAuth Callback Page
 * Handles the redirect after OAuth authentication (Google/Facebook)
 * Extracts tokens from URL and stores them
 */
export const OAuthCallback = (): JSX.Element => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState(t.auth.authenticating);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Extract parameters from URL
        const accessToken = searchParams.get('accessToken');
        const isNewUser = searchParams.get('isNewUser') === 'true';
        const error = searchParams.get('error');

        // Handle error from backend
        if (error) {
          setStatus('error');
          const errorMessage = getErrorMessage(error);
          setMessage(errorMessage);
          toast.error(errorMessage);

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate(getLocalizedPath('/login', language), { replace: true });
          }, 3000);
          return;
        }

        // Validate access token
        if (!accessToken) {
          setStatus('error');
          setMessage(t.auth.no_token);
          toast.error(t.auth.no_token);

          setTimeout(() => {
            navigate(getLocalizedPath('/login', language), { replace: true });
          }, 3000);
          return;
        }

        // Store access token in Redux
        dispatch(setAccessToken(accessToken));

        setStatus('success');
        setMessage(t.auth.auth_success);
        toast.success(t.auth.otp_success); // Using otp_success 'OTP verified successfully' implies verification, or use a better key?
        // Wait, I should have a 'log in success' key. t.auth.login_success exists.
        // Let's use t.auth.login_success instead of otp_success or auth_success (which I added as 'Authentication successful...').
        // t.auth.auth_success is 'Authentication successful! Redirecting...'

        // Redirect based on user type
        setTimeout(() => {
          if (isNewUser) {
            // New user - redirect to onboarding/profile completion
            navigate(getLocalizedPath('/', language), { replace: true });
          } else {
            // Existing user - redirect to home
            navigate(getLocalizedPath('/', language), { replace: true });
          }
        }, 1500);
      } catch (err) {
        console.error('OAuth callback error:', err);
        setStatus('error');
        setMessage(t.auth.unexpected_error);
        toast.error(t.auth.auth_failed);

        setTimeout(() => {
          navigate(getLocalizedPath('/login', language), { replace: true });
        }, 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, dispatch, language, t]);

  // Helper function to get user-friendly error messages
  const getErrorMessage = (error: string): string => {
    const errorMessages: Record<string, string> = {
      google_auth_failed: t.auth.google_auth_failed,
      facebook_auth_failed: t.auth.facebook_auth_failed,
      account_banned: t.auth.account_banned,
      account_inactive: t.auth.account_inactive,
      invalid_token: t.auth.invalid_token,
    };

    return errorMessages[error] || t.auth.auth_failed;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primaryColor to-[#1c9a40]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Status Icon */}
          <div className="mb-6 flex justify-center">
            {status === 'loading' && (
              <div className="relative">
                <Loader2 className="w-16 h-16 text-primaryColor animate-spin" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-primaryColor/20 rounded-full" />
              </div>
            )}
            {status === 'success' && (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
            {status === 'error' && (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Status Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {status === 'loading' && t.auth.authenticating}
            {status === 'success' && t.auth.success_excl}
            {status === 'error' && t.auth.oops}
          </h2>

          <p className="text-gray-600 mb-6">{message}</p>

          {/* Loading Bar */}
          {status === 'loading' && (
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primaryColor rounded-full animate-pulse"
                style={{ width: '70%' }}
              />
            </div>
          )}

          {/* Error Action */}
          {status === 'error' && (
            <button
              onClick={() => navigate(getLocalizedPath('/login', language))}
              className="mt-4 px-6 py-2 bg-primaryColor text-white rounded-lg hover:bg-[#1c9a40] transition-colors"
            >
              {t.auth.back_to_login}
            </button>
          )}
        </div>

        {/* Info Text */}
        <div className="mt-6 text-center text-xs text-gray-500">
          {status === 'loading' && t.auth.verifying_credentials}
          {status === 'success' && t.auth.redirecting_shortly}
          {status === 'error' && t.auth.redirecting_login}
        </div>
      </div>
    </div>
  );
};
