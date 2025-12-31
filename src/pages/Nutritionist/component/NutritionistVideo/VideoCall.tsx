import { Avatar } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import MainVideo from './MainVideo';
import SmallVideo from './SmallVideo';
import CallControls from './CallControls';
import RingingScreen from './RingingScreen';

const VideoCall = ({ onOpenSidebar }: { onOpenSidebar: () => void }) => {
  const { t } = useLanguage();
  const [callStatus, setCallStatus] = useState<'ringing' | 'connected'>('ringing');

  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (callStatus !== 'connected') return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch(console.error);
  }, [callStatus]);
  return (
    <div
      className=" flex flex-col  gap-3 h-full bg-[#fafafa]"
      ref={videoContainerRef}
    >
      <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-4">
        <Avatar className="w-[68px] h-[68px]">
          <img src="/unnamed.jpg" alt="Participant" />
        </Avatar>
        <div className="flex flex-col justify-center lg:justify-start ">
          <h5 className="font-medium text-[24px] text-[#08080A]">ali mohamed</h5>
          <p className=" gap-1 font-normal text-base xl2:text-[18px] text-[#08080A] flex items-center text-center justify-center lg:justify-start ">
            <span className="bg-[#27AE60] w-2 h-2 rounded-full"></span>
            {t.nutritionist.online}
          </p>
        </div>
      </div>

      <div className="relative md:p-4 h-96 lg:h-full ">
        {callStatus === 'ringing' && <RingingScreen />}

        {callStatus === 'connected' && (
          <>
            <MainVideo stream={localStream} />
            <div className="absolute bottom-5 md:bottom-10 right-4 md:right-8">
              <SmallVideo stream={localStream} />
            </div>
          </>
        )}
      </div>
      <CallControls
        stream={localStream}
        containerRef={videoContainerRef}
        onConnect={() => setCallStatus('connected')}
        callStatus={callStatus}
         onOpenSidebar={onOpenSidebar}
      />
    </div>
  );
};

export default VideoCall;
