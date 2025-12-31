import { Camera, SearchSvg, Voice } from '@/assets';
import { Avatar } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { Chat } from '../../type/type';
import { ArrowLeft } from 'lucide-react';
interface ConversationProps {
  chat: Chat | null;
  onOpenInfo: () => void;
  onBack: () => void;
}
const Conversation = ({ chat, onOpenInfo, onBack }: ConversationProps) => {
  const { t } = useLanguage();
  if (!chat) {
    return (
      <div className="hidden lg:flex flex-col  items-center justify-center h-full ">
        <img src="/EEINA_BBg-01.png" alt="eeina" className="w-40 h-40" />
        <p className="font-semibold text-base xl2:text-[18px] text-[#656566]">
          {' '}
          Select a chat to start messaging
        </p>
      </div>
    );
  }
  return (
    <div className="relative lg:bg-[#F6F6F9] flex flex-col w-full lg:gap-5 !pb-0 h-screen lg:h-full ">
      <div className="relative flex justify-between items-center px-4 lg:p-6 lg:border-b lg:border-b-[#989FC91F] pb-5">
        <div className="flex flex-row justify-center lg:justify-start items-center gap-4">
          <Avatar onClick={onOpenInfo} className="lg:w-[68px] lg:h-[68px]">
            <img src="/unnamed.jpg" alt="Participant" />
          </Avatar>
          <div className="flex flex-col justify-start ">
            <h5 className="font-medium  text-base sm:text-xl lg:text-[24px] text-[#08080A]">
              ali mohamed
            </h5>
            <p className=" gap-1 font-normal text-sm md:text-base xl2:text-[18px] text-[#08080A] flex items-center text-center justify-start ">
              <span className="bg-[#27AE60] w-2 h-2 rounded-full"></span>
              {t.nutritionist.online}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-white w-7 h-7 lg:w-10 lg:h-10 rounded-full flex justify-center items-center p-2">
            <Camera className="text-[#61A23C] " />
          </div>
          <div className="bg-white w-7 h-7 lg:w-10 lg:h-10 rounded-full flex justify-center items-center p-2">
            <Voice className="text-[#61A23C]" />
          </div>
          <button
            onClick={onBack}
          className="bg-white w-7 h-7 lg:hidden text-[#61A23C] rounded-full flex justify-center items-center p-1"
          >
            <ArrowLeft />
          </button>
          <div className="hidden  bg-white w-10 h-10 rounded-full lg:flex justify-center items-center p-2">
            <SearchSvg className="text-[#61A23C]" />
          </div>
        </div>
      </div>

      <div className="flex-1 px-4  min-h-0 lg:p-6  scrollbar-custom overflow-y-auto ">
        <Messages chat={chat} />
      </div>
      <div className="w-full flex-shrink-0 pb-5 lg:pb-0">
        <ChatInput />
      </div>
    </div>
  );
};

export default Conversation;
