import { useNavigate } from 'react-router-dom';
import GreenButton from '../components/ui/GreenButton';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const isAr = language === 'ar';

  const translations = {
    error: {
      en: 'Error 404',
      ar: 'خطأ 404'
    },
    title: {
      en: 'Whoops! The ingredients are missing.',
      ar: 'عفواً! المكونات مفقودة.'
    },
    description: {
      en: "We cooked up something special, but it seems this page isn't on the menu anymore.",
      ar: 'لقد طهونا شيئًا مميزًا، ولكن يبدو أن هذه الصفحة لم تعد موجودة في القائمة.'
    },
    backHome: {
      en: 'Back to Home',
      ar: 'العودة للصفحة الرئيسية'
    },
    tryRecipes: {
      en: 'Or try these recipes',
      ar: 'أو جرب هذه الوصفات'
    },
    explore: {
      en: 'Explore Recipes',
      ar: 'استكشف الوصفات'
    },
    findTasty: {
      en: 'Find something tasty',
      ar: 'اكتشف شيئاً لذيذاً'
    },
    readBlog: {
      en: 'Read our Blog',
      ar: 'اقرأ مدونتنا'
    },
    healthTips: {
      en: 'Latest health tips',
      ar: 'أحدث النصائح الصحية'
    }
  };

  return (
    <div className={`py-16 flex flex-col items-center justify-center min-h-[80vh] px-4 md:flex-row md:gap-12 ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* 404 Image Section */}
      <div className="w-full max-w-sm md:max-w-md">
        <img
          src="/avocado-404.png"
          alt="404 Avocado"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-start max-w-md mt-8 md:mt-0">
        <span className="text-sm font-bold tracking-wider text-[#87B740] uppercase">
          {translations.error[language]}
        </span>

        <h1 className="mt-2 text-4xl font-extrabold text-[#0D1821] font-dm-sans md:text-5xl">
          {translations.title[language]}
        </h1>

        <p className="mt-4 text-base text-gray-500 font-poppins">
          {translations.description[language]}
        </p>

        <div className="mt-8">
          <GreenButton
            onClick={() => navigate('/')}
            className="px-8 py-3 font-semibold transition-transform hover:scale-105"
          >
            {translations.backHome[language]}
          </GreenButton>
        </div>

        {/* Suggestion Links */}
        <div className="w-full mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
            {translations.tryRecipes[language]}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <button
              onClick={() => navigate('/recipes')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-[#87B740] group-hover:bg-[#87B740] group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8M8 12h8" /></svg>
              </div>
              <div className='flex flex-col items-start'>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#87B740] transition-colors">{translations.explore[language]}</h3>
                <p className="text-xs text-gray-500">{translations.findTasty[language]}</p>
              </div>
            </button>

            <a
              href="https://eeina.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-left group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-[#87B740] group-hover:bg-[#87B740] group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              </div>
              <div className='flex flex-col items-start'>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#87B740] transition-colors">{translations.readBlog[language]}</h3>
                <p className="text-xs text-gray-500">{translations.healthTips[language]}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
