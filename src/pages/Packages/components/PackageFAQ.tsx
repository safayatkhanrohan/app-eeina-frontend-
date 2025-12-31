import { useLanguage } from '@/contexts/LanguageContext';
import Question from '@/components/icons/Question';
import FAQ from './FAQ';

const PackageFAQ = () => {
  const { t } = useLanguage();

  const faqItems = [
    { question: t.Package.faq_q1, answer: t.Package.faq_a1 },
    { question: t.Package.faq_q2, answer: t.Package.faq_a2 },
    { question: t.Package.faq_q3, answer: t.Package.faq_a3 },
    { question: t.Package.faq_q4, answer: t.Package.faq_a4 },
    { question: t.Package.faq_q5, answer: t.Package.faq_a5 },
    { question: t.Package.faq_q6, answer: t.Package.faq_a6 },
  ];

  return (
    <div className="flex flex-col items-center gap-8 my-16">
      <div className="border rounded-xl shadow shadow-[#F2F2F4] border-[#F2F2F4] flex justify-between items-center gap-2 py-3 px-5">
        <Question />
        <span className="flex-1 text-base font-medium text-[#6AB240]">
          {t.Package.Findtheanswers}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-[#242424]  text-[20px] xl:text-[36px] font-semibold">
          {t.Package.QuestionsAboutPricing}
        </h1>
        <p className="text-center text-[#878787] text-[20px] font-normal">
          {t.Package.QuestionsAboutPricinginfo}
        </p>
      </div>
      <FAQ items={faqItems} />
    </div>
  );
};

export default PackageFAQ;
