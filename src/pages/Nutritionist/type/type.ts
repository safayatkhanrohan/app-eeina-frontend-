export type VideoProps = {
  stream?: MediaStream;
 containerRef?: React.RefObject<HTMLDivElement | null>;
};
export interface Chat {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadMsgNum: number;
}
export type MobileView = 'chats' | 'conversation' | 'info';
