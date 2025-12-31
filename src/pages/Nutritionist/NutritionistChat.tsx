import { useState } from 'react';
import ChatSidebar from './component/NutritionistChat/ChatSidebar';
import Conversation from './component/NutritionistChat/Conversation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Chat, MobileView } from './type/type';
import ChatInfoSidebar from './component/NutritionistChat/ChatInfoSidebar';

const NutritionistChat = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [mobileView, setMobileView] = useState<MobileView>('chats');
  const { isRTL } = useLanguage();
  return (
    <div className="h-full lg:h-screen max-w-6xl xl2:max-w-7xl mx-auto   py-4 sm:py-8 md:mt-5 lg:mt-0 lg:mb-8 ">
      <div className="grid grid-cols-12  my-5 items-stretch h-full ">
        <div
          className={` ${mobileView === 'chats' ? 'block' : 'hidden'}
           lg:block pb-4 lg:pb-0 px-4 lg:px-6 col-span-12 lg:col-span-3  h-full min-h-0`}
        >
          <ChatSidebar
            selectedChat={selectedChat}
            onSelectChat={(chat) => {
              setSelectedChat(chat);
              setMobileView('conversation');
            }}
          />
        </div>
        <div
          className={` ${mobileView === 'conversation' ? 'block' : 'hidden'} lg:block col-span-12 lg:col-span-6 h-full lg:min-h-0 ${isRTL ? 'lg:border-r lg:border-r-[#E2E9FC]' : 'lg:border-l lg:border-l-[#E2E9FC]'}`}
        >
          <Conversation chat={selectedChat} onOpenInfo={() => setMobileView('info')}   onBack={() => setMobileView('chats')} />
        </div>
        <div
          className={`${mobileView === 'info' ? 'block' : 'hidden'} lg:block col-span-12 lg:col-span-3 h-full lg:min-h-0 mb-10 lg:mb-0 px-4 lg:px-6`}
        >
          <ChatInfoSidebar   onBack={() => setMobileView('conversation')}/>
        </div>
      </div>
    </div>
  );
};

export default NutritionistChat;
