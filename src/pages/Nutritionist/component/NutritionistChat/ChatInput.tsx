import { File, Image, Plus, Send, VoiceMsg } from '@/assets';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';
import { useState } from 'react';

const ChatInput = () => {
  const { isRTL, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-lg bg-white w-full h-20 px-2 lg:px-5 flex justify-between items-center gap-3 
    ">
      <div className="relative flex items-center gap-2 flex-1">
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer border border-[#EEF0F7] w-9 h-9 rounded-full flex justify-center items-center"
        >
          {open ? <X className="text-black w-4 h-4" /> : <Plus className="text-black" />}
        </div>
        <div className="cursor-pointer border border-[#EEF0F7] w-9 h-9 rounded-full flex justify-center items-center">
          <VoiceMsg className="text-[#989FC9]" />
        </div>
        <div
          className={`
              absolute bottom-16 left-0 right-0 lg:mx-4 
              bg-white rounded-[32px]  rounded-bl-none shadow-lg py-3 px-2 lg:px-5 w-fit
              transition-all duration-300 ease-out
              ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'}
            `}
        >
          <div className="flex gap-7 justify-between">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#FFF1EB]">
                <Image className="text-[#FF843F]" />
              </div>
              <span className="text-xs text-[#343434] font-normal">Image</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#EBF4FF]">
                <File className="text-[#2A13FF]" />
              </div>
              <span className="text-xs text-[#343434] font-normal">File </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#F9EDFF]">
                <File className="text-[#6E20FF]" />
              </div>
              <span className="text-xs text-[#343434] font-normal">File </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#FFEBF8]">
                <File className="text-[#FF4A88]" />
              </div>
              <span className="text-xs text-[#343434] font-normal">File </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex-[5]">
        <Input
          placeholder={t.nutritionist.Typeyourmessage}
          className={`  rounded-3xl border text-[#989FC9] text-[11px] font-normal
             border-[#F6F6F9] 
           
            focus-visible:outline-none
            focus-visible:ring-0
             
             h-[48px]`}
        />
        <div
          className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 bg-[#61A23C] w-7 h-7 rounded-full flex justify-center items-center p-2`}
        >
          <Send className={`${isRTL ? 'rotate-[230deg]' : 'rotate-45'}  text-white`} />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
