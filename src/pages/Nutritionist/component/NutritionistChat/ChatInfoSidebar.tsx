import { Call, Camera, Message } from '@/assets';
import { Avatar } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import Attachments from './Attachments';
import { ArrowLeft } from 'lucide-react';

const ChatInfoSidebar = ({ onBack }: { onBack: () => void }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-2 h-full lg:p-6">
      <div className="relative flex flex-col items-center justify-center gap-3 ">
        <button onClick={onBack} className="lg:hidden mb-4 absolute left-0 top-0 bg-white w-7 h-7  text-[#61A23C] rounded-full flex justify-center items-center p-1" 
        >
          <ArrowLeft/>
        </button>
        <div className="relative">
          <Avatar className="w-[60px] h-[60px]">
            <img src="/unnamed.jpg" alt="profile" className="w-full h-full object-cover" />
          </Avatar>

          <span className="absolute top-0 left-0 border  w-3 h-3 rounded-full bg-[#34C759] border-[#FFFFFF] " />
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="font-normal lg:text-xl text-[#212633]">ali mohamed</h2>
          <p className="text-[#79869F] font-normal text-[14px]">{t.nutritionist.online}</p>
        </div>
      </div>
      <div className="flex justify-around lg:justify-between items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Call className="text-[#61A23C] w-5 h-5" />
          <p className="text-[12px] font-normal text-[#79869F]">{t.nutritionist.Call}</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Message className="text-[#61A23C] w-5 h-5" />
          <p className="text-[12px] font-normal text-[#79869F]">{t.nutritionist.Message}</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Camera className="text-[#61A23C] w-5 h-5" />
          <p className="text-[12px] font-normal text-[#79869F]">{t.nutritionist.video}</p>
        </div>
      </div>
      <Attachments />
    </div>
  );
};

export default ChatInfoSidebar;
