import { Avatar } from '@/components/ui/avatar';
import { Chat } from '../../type/type';

interface ChatItemProps {
  chat: Chat;
  active: boolean;        
  onClick: () => void;   
}



const ChatItem = ({ chat, onClick, active }: ChatItemProps) => {
  const { avatar, name, lastMessage, time, unreadMsgNum } = chat;
  return (
    <div
      className={`flex items-start gap-3 cursor-pointer  ${active ? 'bg-[#61A23C1A]' : 'hover:bg-[#61A23C1C]'} rounded-xl py-3 lg:px-2`}
      onClick={onClick}
    >
      <Avatar>
        <img src={avatar} alt={name} />
      </Avatar>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center ">
          <h2 className="font-normal text-base text-[#212633]"> {name}</h2>
          <p className="font-normal text-[12px] text-[#8E9ABB]"> {time}</p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="text-[#8E9ABB] font-normal text-[14px]"> {lastMessage}</p>
          <p className="p-2 flex justify-center items-center w-3 h-3 rounded-full bg-[#61A23C]  font-bold text-[10px] text-white">
            {' '}
            {unreadMsgNum}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
