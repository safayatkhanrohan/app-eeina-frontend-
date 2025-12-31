import { Camera, MuteMic, Ring, Setting, Sound, Upload, VoiceMsg } from '@/assets';
import { Fullscreen, MessageSquare, VideoOff } from 'lucide-react';
import { useState } from 'react';
export type VideoProps = {
  stream?: MediaStream;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onConnect?: () => void;
  callStatus: 'ringing' | 'connected';
  onOpenSidebar?: () => void;

};

const CallControls = ({ stream, containerRef, onConnect, callStatus ,onOpenSidebar}: VideoProps) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const toggleMic = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !micOn;
    });
    setMicOn(!micOn);
  };

  const toggleCam = () => {
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !camOn;
    });
    setCamOn(!camOn);
  };
  const toggleFullscreen = () => {
    const el = containerRef?.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <div className="flex justify-center md:justify-between items-center">
      <div className="hidden md:flex cursor-pointer bg-[#f0f0f5cc] w-10 h-10 sm:w-14 sm:h-14  justify-center items-center rounded-full">
        <Sound className="text-[#87B740]" />
      </div>
      <div className="flex items-center gap-2 md:gap-5">
        <div className="cursor-pointer bg-[#f0f0f5cc] w-10 h-10 sm:w-14 sm:h-14 flex justify-center items-center rounded-full">
          <Upload className="text-[#87B740] w-5 h-5 sm:w-auto sm:h-auto" />
        </div>
        <div
          onClick={toggleMic}
          className="cursor-pointer bg-[#f0f0f5cc] w-10 h-10 sm:w-14 sm:h-14 flex justify-center items-center rounded-full"
        >
          {micOn ? (
            <VoiceMsg className="text-[#87B740] w-5 h-5 sm:w-auto sm:h-auto" />
          ) : (
            <MuteMic className="text-[#DCDFE3] w-5 h-5 sm:w-auto sm:h-auto" />
          )}
        </div>
        <div
          onClick={onConnect}
          className={`cursor-pointer ${callStatus == 'ringing' ? 'bg-[#EF7171]' : 'bg-[#87B740]'} 
          w-14 h-14 sm:w-20 sm:h-20  md:w-[72px] md:h-[72px] flex justify-center items-center rounded-full`}
        >
          <Ring className="text-white" />
        </div>
        <div
          onClick={toggleCam}
          className="cursor-pointer bg-[#f0f0f5cc] w-10 h-10 sm:w-14 sm:h-14 flex justify-center items-center rounded-full"
        >
          {camOn ? (
            <Camera className="text-[#87B740] w-5 h-5 sm:w-auto sm:h-auto" />
          ) : (
            <VideoOff className="text-[#DCDFE3] w-5 h-5 sm:w-auto sm:h-auto" />
          )}
        </div>
        <div className="cursor-pointer bg-[#f0f0f5cc] w-10 h-10 sm:w-14 sm:h-14 flex justify-center items-center rounded-full">
          <Setting className="text-[#87B740] w-5 h-5 sm:w-auto sm:h-auto" />
        </div>
        <div
           onClick={onOpenSidebar}
          className="flex lg:hidden cursor-pointer bg-[#f0f0f5cc] w-10 h-10 sm:w-14 sm:h-14  justify-center items-center rounded-full shrink-0"
        >
          <MessageSquare className="text-[#87B740] w-5 h-5 sm:w-auto sm:h-auto" />
        </div>
      </div>

      <div
        onClick={toggleFullscreen}
        className="hidden md:flex cursor-pointer bg-[#f0f0f5cc] w-10 h-10 sm:w-14 sm:h-14  justify-center items-center rounded-full"
      >
        <Fullscreen className="text-[#C6B3B3]" />
      </div>
    </div>
  );
};

export default CallControls;
