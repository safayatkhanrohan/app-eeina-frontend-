import { useLanguage } from '@/contexts/LanguageContext';
import analytics from '@/utils/analytics';

const CookieBanner = ({ onClose }: { onClose: () => void }) => {
  const { language } = useLanguage();

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'analytics');
    analytics.init();
    onClose();
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    onClose();
  };

  const text = {
    en: {
      description: "We use ",
      highlight: "analytics cookies",
      description2: " to understand how you use the app and improve your experience. No advertising or tracking cookies are used.",
      accept: "Accept",
      reject: "Reject",
    },
    ar: {
      description: "نحن نستخدم ",
      highlight: "كوكيز التحليلات",
      description2: " لفهم كيفية استخدامك للتطبيق وتحسين تجربتك. لا يتم استخدام أي كوكيز للإعلانات أو التتبع.",
      accept: "موافق",
      reject: "رفض",
    },
  };

  const langText = language === 'ar' ? text.ar : text.en;

  return (
    <div className="
      fixed bottom-0 left-0 right-0 z-[60]
      bg-white dark:bg-zinc-900
      border-t border-zinc-200 dark:border-zinc-700
      shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
    ">
      <div className="
        max-w-7xl mx-auto
        px-4 py-4
        flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between
      ">
        <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-2xl">
          {langText.description}
          <span className="font-medium">{langText.highlight}</span>
          {langText.description2}
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={rejectCookies}
            className="
              px-4 py-2 text-sm
              rounded-lg
              border border-zinc-300 dark:border-zinc-600
              text-zinc-700 dark:text-zinc-300
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition
            "
          >
            {langText.reject}
          </button>

          <button
            onClick={acceptCookies}
            className="
              px-4 py-2 text-sm
              rounded-lg
              bg-primaryColor text-white
              hover:bg-emerald-700
              transition
            "
          >
            {langText.accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
