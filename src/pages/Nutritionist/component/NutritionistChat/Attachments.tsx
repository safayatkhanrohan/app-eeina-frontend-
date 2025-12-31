import { Image } from '@/assets';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const Attachments = () => {
  const { t } = useLanguage();
  
    const [showAllImages, setShowAllImages] = useState(false);
    const images = [
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
      '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    ];
    const maxVisible = 9;
    const remaining = images.length - maxVisible;
  
  return (
    <div className="flex flex-col gap-5 w-full mt-5 overflow-y-auto flex-1 scrollbar-custom ">
      <div className='flex flex-col gap-3'>
        <h2 className="text-base font-normal text-[#25396F]">{t.nutritionist.Attachments}</h2>
        <div className="flex justify-between items-center">
          <p className="text-[12px] font-normal text-[#B0B6C3]">{t.nutritionist.Sourcefile}</p>
          <button className="text-[10px] font-normal text-[#454547]">
            {t.nutritionist.Viewall}
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Image className="text-[#B0B6C3]" />
            <p className="text-[#B0B6C3] font-normal text-[12px]">Poco phone.png</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="text-[#B0B6C3]" />
            <p className="text-[#B0B6C3] font-normal text-[12px]">Poco phone.png</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <h2 className="text-base font-normal text-[#25396F]">{t.nutritionist.Picture_Videos}</h2>
        <div className="grid grid-cols-12 gap-2 w-full max-w-sm">
          {images.slice(0, showAllImages ? images.length : maxVisible).map((img, idx) => (
            <div
              key={idx}
              className={`relative cursor-pointer col-span-4`}
            >
              <img
                src={img}
                alt={`image-${idx}`}
                className={`w-full h-[72px] object-cover rounded-lg ${idx === 0 ? '' : ''}`}
              />
              {!showAllImages && idx === maxVisible - 1 && remaining > 0 && (
                <div
                  onClick={() => setShowAllImages(true)}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold rounded-lg"
                >
                  +{remaining}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attachments;
