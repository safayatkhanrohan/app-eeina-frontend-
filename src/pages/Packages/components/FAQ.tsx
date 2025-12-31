import { useState } from 'react';
import Minus from '@/components/icons/Minus';
import Plus from '@/components/icons/Plus';
import { useLanguage } from '@/contexts/LanguageContext';

interface FaqItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FaqItem[];
}

const FAQ = ({ items }: FAQProps) => {
  const { isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item, index) => (
        <div key={index} className="px-3 py-4 border rounded-lg overflow-hidden  border-[#E5EAF2]">
          <button
            onClick={() => toggle(index)}
            className={`cursor-pointer w-full flex justify-between items-center ${
              isRTL ? 'text-right' : 'text-left'
            } `}
          >
            <span className="flex-1 font-medium text-[#383838] text-[16px] xl:text-[20px] ">
              {item.question}
            </span>
            {openIndex === index ? (
              <span className="shrink-0 bg-[#6AB240] w-10 h-10 rounded-full flex justify-center items-center">
                <Minus />
              </span>
            ) : (
              <span className="shrink-0 bg-[#EFEFEF] w-10 h-10 rounded-full flex justify-center items-center">
                <Plus />
              </span>
            )}
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="whitespace-break-spaces text-[#878787] leading-[160%] text-[14px] xl:text-[20px] font-normal pt-3">
              <p className="whitespace-break-spaces">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
