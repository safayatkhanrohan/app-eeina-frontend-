import { useState } from 'react';
import VideoCall from './component/NutritionistVideo/VideoCall';
import VideoChatSidbar from './component/NutritionistVideo/VideoChatSidbar';

const NutritionistVideo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="max-w-6xl xl2:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 md:mt-5 lg:mt-0">
      <div className="grid grid-cols-12 gap-5 my-5 items-stretch">
        <div className={`col-span-12 lg:col-span-7 ${sidebarOpen ? 'hidden lg:block' : 'block'}`}>
          <VideoCall onOpenSidebar={() => setSidebarOpen(true)} />
        </div>
        <div className={`col-span-12 lg:col-span-5 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <VideoChatSidbar />
        </div>
      </div>
    </div>
  );
};

export default NutritionistVideo;
