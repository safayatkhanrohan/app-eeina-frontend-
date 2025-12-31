import { SaveIcon, SeachGrey } from '@/assets';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import ChatItem from './ChatItem';
import { Chat } from '../../type/type';
interface ChatSidebarProps {
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}
const ChatSidebar = ({ selectedChat, onSelectChat }: ChatSidebarProps) => {
  const { t, isRTL } = useLanguage();
  const chats: Chat[] = [
    {
      id: 1,
      avatar: '/unnamed.jpg',
      name: 'Ali Mohamed',
      lastMessage: 'Good morning',
      time: '9:13 AM',
      unreadMsgNum: 10,
    },
    {
      id: 2,
      avatar: '/unnamed.jpg',
      name: 'Sara Ahmed',
      lastMessage: 'See you later',
      time: '8:45 AM',
      unreadMsgNum: 10,
    },
    {
      id: 3,
      avatar: '/unnamed.jpg',
      name: 'Ali Mohamed',
      lastMessage: 'Good morning',
      time: '9:13 AM',
      unreadMsgNum: 10,
    },
    {
      id: 4,
      avatar: '/unnamed.jpg',
      name: 'ali mohamed',
      lastMessage: 'hello',
      time: '8:45 AM',
      unreadMsgNum: 10,
    },
  ];
  return (
    <div className="flex flex-col justify-start gap-4 h-full">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar>
            <img src="/unnamed.jpg" alt="profile" />
          </Avatar>

          <span className="absolute bottom-0 right-0 border  w-3 h-3 rounded-full bg-[#34C759] border-[#FFFFFF] " />
        </div>

        <div className="flex flex-col w-full">
          <h2 className="font-normal lg:text-xl xl2:text-[24px] text-[#212633]">ali mohamed</h2>
          <p className="text-[#8E9ABB] font-normal text-base">Good morning</p>
        </div>
      </div>
      <div
        className={`flex items-center gap-2 ${
          isRTL
            ? 'border-r-2 border-r-[#61A23C] pr-3 pl-4'
            : 'border-l-2 border-l-[#61A23C] pl-3 pr-4'
        } `}
      >
        <div className="relative ">
          <Input
            className={`${isRTL ? 'pr-10' : 'pl-10'}  rounded-xl border
             border-[#D6DFF6] 
           
            focus-visible:outline-none
            focus-visible:ring-0
             
             h-[48px]`}
          />
          <SeachGrey
            className={`absolute ${isRTL ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 text-[#8E9ABB]`}
          />
        </div>
        <button className=" rounded-xl bg-transparent hover:bg-white border !border-[#D6DFF6] h-[48px] px-3">
          <SaveIcon className="text-[#61A23C]" />
        </button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto flex-1 scrollbar-custom">
        <h2 className="text-[#8E9ABB] font-normal text-[14px]">{t.nutritionist.FAVORITES}</h2>
        <div className={`flex flex-col gap-2 ${isRTL ? 'lg:pl-2' : 'lg:pr-2'}`}>
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              active={selectedChat?.id === chat.id}
              onClick={() => onSelectChat(chat)}
            />
          ))}{' '}
        </div>
        <h2 className="text-[#8E9ABB] font-normal text-[14px]">{t.nutritionist.CHATS}</h2>
        <div className={`flex flex-col gap-2 ${isRTL ? 'pl-2' : 'pr-2'}`}>
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              active={selectedChat?.id === chat.id}
              onClick={() => onSelectChat(chat)}
            />
          ))}{' '}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
