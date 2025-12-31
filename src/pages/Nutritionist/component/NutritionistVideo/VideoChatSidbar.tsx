import { Attached, Chevrondown, MuteMic, SeeMore, Send, Typing, Video, VoiceMsg } from '@/assets';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const VideoChatSidbar = () => {
  const { t ,isRTL} = useLanguage();
  const [muted, setMuted] = useState(false);

  return (
    <div className="lg:bg-[#f0f0f5cc] shadow-none lg:shadow lg:rounded-lg p4 lg:py-6 lg:px-4 flex flex-col  gap-16 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] lg:text-xl xl2:text-[24px] font-medium text-[#343434]">
            {t.nutritionist.Participant} <span className="font-normal text-[#B6B6B6]">5</span>
          </h3>
          <SeeMore className="text-[#0F0F0F]" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar>
              <img src="/unnamed.jpg" alt="Participant" />
            </Avatar>
            <h2 className="text-[#808080] font-medium text-base lg:text-xl xl2:text-[24px]">
              ali mohamed
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#87B740] text-base lg:text-lg xl2:text-[20px] font-normal">
              {t.nutritionist.Host}
            </p>

            <div className="relative cursor-pointer" onClick={() => setMuted(!muted)}>
              {muted ? (
                <MuteMic className={`text-[#DCDFE3]`} />
              ) : (
                <VoiceMsg className={`text-[#87B740]`} />
              )}
            </div>
            <Video className="text-[#87B740]" />
          </div>
        </div>
      </div>
      <Card className="flex flex-col gap-[5rem] p-4 lg:py-6 lg:px-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h4 className="text-xl xl2:text-[24px] font-medium text-[#343434]">
              {t.nutritionist.ChatRoom}
            </h4>
            <p className="text-[14px] xl2:text-base font-normal text-[#87B740] flex items-center gap-2">
              <Typing />
              ali {t.nutritionist.isTyping}...
            </p>
          </div>
          <Chevrondown className="text-black" />
        </div>
        <div className="flex flex-col gap-3 ">
          <p className="text-base font-normal text-[#B6B6B6]  text-center">2 hours ago</p>
          <div className="flex flex-col gap-5 max-h-[200px] flex-col-reverseh-full overflow-y-auto scrollbar-custom">
            <div className="flex justify-start gap-2">
              <Avatar>
                <img src="/unnamed.jpg" alt="Participant" />
              </Avatar>
              <div className="text-[14px] bg-[#EBF4F6] text-[#343434] p-2 lg:p-3 rounded-xl lg:text-base rounded-bl-none max-w-xs">
                Hello! How are you?
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <div className="bg-[#87B740] text-white p-2 lg:p-3 rounded-xl text-[14px] lg:text-base rounded-br-none max-w-xs">
                I'm good, thanks! And you?
              </div>
              <Avatar>
                <img src="/unnamed.jpg" alt="Participant" />
              </Avatar>
            </div>
            <div className="flex justify-start gap-2">
              <Avatar>
                <img src="/unnamed.jpg" alt="Participant" />
              </Avatar>
              <div className="text-[14px] bg-[#EBF4F6] text-[#343434] p-2 lg:p-3 rounded-xl lg:text-base rounded-bl-none max-w-xs">
                Hello! How are you?
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <div className="bg-[#87B740] text-white p-2 lg:p-3 rounded-xl text-[14px] lg:text-base rounded-br-none max-w-xs">
                I'm good, thanks! And you?
              </div>
              <Avatar>
                <img src="/unnamed.jpg" alt="Participant" />
              </Avatar>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3 mt-4">
            <div className="relative w-full">
              <Input
                className={`${isRTL?"pr-10":"pl-10"} border border-[#B6B6B6] focus:!ring-0 focus:!outline-none focus:!border-[#B6B6B6]
                 rounded-[44px] h-[44px] sm:h-[48px]`}
                placeholder={t.nutritionist.Massage}
              />
              <label className={`absolute ${isRTL?"right-3":"left-3"} top-1/2 -translate-y-1/2 cursor-pointer shrink-0`}>
                <input type="file" className="hidden" />
                <Attached className="text-[#B6B6B6] " />
              </label>
            </div>

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex justify-center items-center bg-[#87B740] flex-shrink-0">
              <Send className="text-white" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VideoChatSidbar;
