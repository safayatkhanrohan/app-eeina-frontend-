import { Calender, Chat, Check, Video, Voice } from '@/assets';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import AppoinmentModal from './AppoinmentModal';
import { Link } from 'react-router-dom';

const NutritionistInfo = () => {
  const { t, language } = useLanguage();
  const [appoinmentOpen, setappoinmentOpen] = useState(false);
  return (
    <>
      <div className="relative mb-6 sm:mb-16 flex flex-col gap-5 mt-14 md:mt-10 lg:mt-0">
        <div className="h-32 sm:h-64 rounded-[5px] overflow-hidden shadow-sm relative group">
          <img
            src={'/coverImage.jpeg'}
            alt="Cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/coverImage.jpeg')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
        </div>
        <div className=" sm:px-10 flex flex-col  justify-center items-center  gap-3  z-30">
          {/* Avatar */}
          <div className="-mt-14 relative group">
            <div className={` bg-white w-24 h-24 sm:w-52 sm:h-52 rounded-full`}>
              <div className="p-2 w-full h-full relative">
                <img
                  className="relative p-[3px] object-cover  border-[2px] border-[#6AB240] w-full h-full rounded-full"
                  src={'/unnamed.jpg'}
                  alt="profile"
                  onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
                />
                <span
                  className={` cursor-pointer
                    absolute bottom-2 right-3 md:right-7 w-7 md:w-10 h-7 md:h-10 rounded-full 
                 ${'bg-[#0084FF]'}
                 flex justify-center items-center border border-white"
                    `}
                >
                  <Check className="text-white w-4 h-4 md:w-auto md:h-auto" />
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mb-1">
            <h1 className="text-[22px] lg:text-[30px] font-bold text-[#6AB240] drop-shadow-md sm:drop-shadow-none">
              Ali mohamed
            </h1>
            <span className="text-[14px] font-normal text-[#6AB240] drop-shadow-sm sm:drop-shadow-none">
              {language === 'ar' ? 'انضم في ' : 'Joined '}
              12,2025
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 md:gap-4 w-full md:w-[50%] mx-auto">
          <Link
            to="/nutritionist/chat"
            className="block px-2 py-2 md:!p-0 bg-white shadow-none border border-[#E1E1E1] rounded-[20px] h-20 flex-1 "
          >
            <div className="px-2  py-2 md:!p-0 shadow-none border border-[#E1E1E1] rounded-[20px] h-20 flex-1 flex flex-col justify-center items-center gap-2">
              <Chat className="text-[#6AB240]" />
              <p className="text-[12px] text-center md:text-base font-medium text-[#4C4C4C]">
                {t.nutritionist.Chat}
              </p>
            </div>
          </Link>

          <Card
            onClick={() => setappoinmentOpen(true)}
            className="cursor-pointer px-2  py-2 md:!p-0 shadow-none border border-[#E1E1E1] rounded-[20px] h-20 flex-1 flex flex-col justify-center items-center gap-2"
          >
            <Calender className="text-[#6AB240]" />
            <p className="text-[12px] text-center md:text-base font-medium text-[#4C4C4C]">
              {t.nutritionist.booking}
            </p>
          </Card>
          <Card className="px-2 py-2 md:!p-0 shadow-none border border-[#E1E1E1] rounded-[20px] h-20 flex-1 flex flex-col justify-center items-center gap-2">
            <Voice className="text-[#6AB240]" />
            <p className="text-[12px] text-center md:text-base font-medium text-[#4C4C4C]">
              {t.nutritionist.Voicecall}
            </p>
          </Card>
          <Link
            to="/nutritionist/video"
            className="block px-2 py-2 md:!p-0 bg-white shadow-none border border-[#E1E1E1] rounded-[20px] h-20 flex-1 "
          >
            <div className="flex flex-col justify-center items-center gap-2 h-full">
              <Video className="text-[#6AB240]" />
              <p className="text-[12px] text-center md:text-base font-medium text-[#4C4C4C]">
                {t.nutritionist.Videocall}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <AppoinmentModal open={appoinmentOpen} onOpenChange={setappoinmentOpen} />
    </>
  );
};

export default NutritionistInfo;
