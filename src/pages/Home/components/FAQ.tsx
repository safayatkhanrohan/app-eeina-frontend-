import { useLanguage } from '../../../contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';

const faqData = [
  {
    id: 'item-1',
    question: {
      en: 'Can I try the site before subscribing?',
      ar: 'هل يمكنني تجربة الموقع قبل الاشتراك؟',
    },
    answer: {
      en: 'Yes, we offer a free trial period that allows you to review the basic recipes and some features before subscribing to any of the packages.',
      ar: 'نعم، نقدم فترة تجريبية مجانية تتيح لك استعراض الوصفات الأساسية وبعض الميزات قبل الاشتراك في أي من الباقات.',
    },
  },
  {
    id: 'item-2',
    question: {
      en: 'What is Eeina?',
      ar: 'ما هو إينا؟',
    },
    answer: {
      en: 'Eeina is a recipe sharing platform that allows users to discover, share, and save their favorite recipes from around the world.',
      ar: 'إينا هي منصة لمشاركة الوصفات تتيح للمستخدمين اكتشاف ومشاركة وحفظ وصفاتهم المفضلة من جميع أنحاء العالم.',
    },
  },
  {
    id: 'item-3',
    question: {
      en: 'How do I create an account?',
      ar: 'كيف أقوم بإنشاء حساب؟',
    },
    answer: {
      en: "To create an account, click on the 'Sign Up' button at the top right corner of the homepage and fill in the required details.",
      ar: "لإنشاء حساب، انقر على زر 'تسجيل الدخول' في الزاوية العلوية اليسرى من الصفحة الرئيسية واملأ التفاصيل المطلوبة.",
    },
  },
  {
    id: 'item-4',
    question: {
      en: 'Can I save recipes to my profile?',
      ar: 'هل يمكنني حفظ الوصفات في ملفي الشخصي؟',
    },
    answer: {
      en: "Yes, you can save your favorite recipes to your profile by clicking the 'Save' button on any recipe page.",
      ar: "نعم، يمكنك حفظ وصفاتك المفضلة في ملفك الشخصي بالنقر على زر 'حفظ' في أي صفحة وصفة.",
    },
  },
  {
    id: 'item-5',
    question: {
      en: 'How do I submit my own recipe?',
      ar: 'كيف أقوم بإرسال وصفتي الخاصة؟',
    },
    answer: {
      en: "To submit your own recipe, log in to your account and click on the 'Create Recipe' button. Fill in the recipe details and submit it for review.",
      ar: "لإرسال وصفتك الخاصة، قم بتسجيل الدخول إلى حسابك وانقر على زر 'إنشاء وصفة'. املأ تفاصيل الوصفة وأرسلها للمراجعة.",
    },
  },
];

const FAQ = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#191c32]">
        {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
      </h2>
      <Accordion className="space-y-4">
        {faqData.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-2xl font-semibold font-['Poppins'] text-slate-900">
              {item.question[language]}
            </AccordionTrigger>
            <AccordionContent className="text-xl font-normal font-['Poppins'] text-neutral-400">
              {item.answer[language]}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
