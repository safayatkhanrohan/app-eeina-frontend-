import { Avatar } from '@/components/ui/avatar';
import { Chat } from '../../type/type';
import { useState } from 'react';
interface ConversationProps {
  chat: Chat | null;
}
const Messages = ({ chat }: ConversationProps) => {
  const images = [
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
    '/adrien-olichon-RCAhiGJsUUE-unsplash 1.svg',
  ];
  const maxVisible = 3;
  const remaining = images.length - maxVisible;

  const [showAllImages, setShowAllImages] = useState(false);
  return (
    <div className="flex flex-col gap-3 flex-1 ">
      <div className="flex gap-5  flex-col flex-1 py-5 lg:pb-20 ">
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-2">
            <Avatar>
              <img src="/unnamed.jpg" alt="Participant" />
            </Avatar>
            <div className="flex items-center gap-3">
              <p className="text-[14px] bg-white text-[#08080A] p-2 lg:p-3 rounded-3xl  rounded-bl-none max-w-xs">
                Hello! How are you?lor
              </p>
              <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {images.slice(0, showAllImages ? images.length : maxVisible).map((img, idx) => (
              <div
                key={idx}
                className={`relative cursor-pointer ${idx === 0 ? 'col-span-2' : 'col-span-1'}`}
              >
                <img
                  src={img}
                  alt={`image-${idx}`}
                  className={`w-full h-32 object-cover rounded-lg ${idx === 0 ? '' : ''}`}
                />
                {!showAllImages && idx === maxVisible - 1 && remaining > 0 && (
                  <div
                    onClick={() => setShowAllImages(true)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold rounded-lg"
                  >
                    +{remaining}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="flex items-center gap-3">
            <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            <p className="bg-[#E9EAF1] text-[#08080A] p-2 lg:p-3 rounded-3xl text-[14px]  rounded-br-none max-w-xs  whitespace-normal
    break-normal">
              I'm good, thanks! And you?
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-2">
            <Avatar>
              <img src="/unnamed.jpg" alt="Participant" />
            </Avatar>
            <div className="flex items-center gap-3">
              <p className="text-[14px] bg-white text-[#08080A] p-2 lg:p-3 rounded-3xl  rounded-bl-none max-w-xs">
                Hello! How are you?lor
              </p>
              <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {images.slice(0, showAllImages ? images.length : maxVisible).map((img, idx) => (
              <div
                key={idx}
                className={`relative cursor-pointer ${idx === 0 ? 'col-span-2' : 'col-span-1'}`}
              >
                <img
                  src={img}
                  alt={`image-${idx}`}
                  className={`w-full h-32 object-cover rounded-lg ${idx === 0 ? '' : ''}`}
                />
                {!showAllImages && idx === maxVisible - 1 && remaining > 0 && (
                  <div
                    onClick={() => setShowAllImages(true)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold rounded-lg"
                  >
                    +{remaining}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="flex items-center gap-3">
            <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            <p className="bg-[#E9EAF1] text-[#08080A] p-2 lg:p-3 rounded-3xl text-[14px]  rounded-br-none max-w-xs  whitespace-normal
    break-normal">
              I'm good, thanks! And you?
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-2">
            <Avatar>
              <img src="/unnamed.jpg" alt="Participant" />
            </Avatar>
            <div className="flex items-center gap-3">
              <p className="text-[14px] bg-white text-[#08080A] p-2 lg:p-3 rounded-3xl  rounded-bl-none max-w-xs">
                Hello! How are you?lor
              </p>
              <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {images.slice(0, showAllImages ? images.length : maxVisible).map((img, idx) => (
              <div
                key={idx}
                className={`relative cursor-pointer ${idx === 0 ? 'col-span-2' : 'col-span-1'}`}
              >
                <img
                  src={img}
                  alt={`image-${idx}`}
                  className={`w-full h-32 object-cover rounded-lg ${idx === 0 ? '' : ''}`}
                />
                {!showAllImages && idx === maxVisible - 1 && remaining > 0 && (
                  <div
                    onClick={() => setShowAllImages(true)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold rounded-lg"
                  >
                    +{remaining}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="flex items-center gap-3">
            <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            <p className="bg-[#E9EAF1] text-[#08080A] p-2 lg:p-3 rounded-3xl text-[14px]  rounded-br-none max-w-xs  whitespace-normal
    break-normal">
              I'm good, thanks! And you?
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-2">
            <Avatar>
              <img src="/unnamed.jpg" alt="Participant" />
            </Avatar>
            <div className="flex items-center gap-3">
              <p className="text-[14px] bg-white text-[#08080A] p-2 lg:p-3 rounded-3xl  rounded-bl-none max-w-xs">
                Hello! How are you?lor
              </p>
              <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {images.slice(0, showAllImages ? images.length : maxVisible).map((img, idx) => (
              <div
                key={idx}
                className={`relative cursor-pointer ${idx === 0 ? 'col-span-2' : 'col-span-1'}`}
              >
                <img
                  src={img}
                  alt={`image-${idx}`}
                  className={`w-full h-32 object-cover rounded-lg ${idx === 0 ? '' : ''}`}
                />
                {!showAllImages && idx === maxVisible - 1 && remaining > 0 && (
                  <div
                    onClick={() => setShowAllImages(true)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold rounded-lg"
                  >
                    +{remaining}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="flex items-center gap-3">
            <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            <p className="bg-[#E9EAF1] text-[#08080A] p-2 lg:p-3 rounded-3xl text-[14px]  rounded-br-none max-w-xs  whitespace-normal
    break-normal">
              I'm good, thanks! And you?
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-2">
            <Avatar>
              <img src="/unnamed.jpg" alt="Participant" />
            </Avatar>
            <div className="flex items-center gap-3">
              <p className="text-[14px] bg-white text-[#08080A] p-2 lg:p-3 rounded-3xl  rounded-bl-none max-w-xs">
                Hello! How are you?lor
              </p>
              <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {images.slice(0, showAllImages ? images.length : maxVisible).map((img, idx) => (
              <div
                key={idx}
                className={`relative cursor-pointer ${idx === 0 ? 'col-span-2' : 'col-span-1'}`}
              >
                <img
                  src={img}
                  alt={`image-${idx}`}
                  className={`w-full h-32 object-cover rounded-lg ${idx === 0 ? '' : ''}`}
                />
                {!showAllImages && idx === maxVisible - 1 && remaining > 0 && (
                  <div
                    onClick={() => setShowAllImages(true)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold rounded-lg"
                  >
                    +{remaining}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="flex items-center gap-3">
            <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            <p className="bg-[#E9EAF1] text-[#08080A] p-2 lg:p-3 rounded-3xl text-[14px]  rounded-br-none max-w-xs  whitespace-normal
    break-normal">
              I'm good, thanks! And you?
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-2">
            <Avatar>
              <img src="/unnamed.jpg" alt="Participant" />
            </Avatar>
            <div className="flex items-center gap-3">
              <p className="text-[14px] bg-white text-[#08080A] p-2 lg:p-3 rounded-3xl  rounded-bl-none max-w-xs">
                Hello! How are you?lor
              </p>
              <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {images.slice(0, showAllImages ? images.length : maxVisible).map((img, idx) => (
              <div
                key={idx}
                className={`relative cursor-pointer ${idx === 0 ? 'col-span-2' : 'col-span-1'}`}
              >
                <img
                  src={img}
                  alt={`image-${idx}`}
                  className={`w-full h-32 object-cover rounded-lg ${idx === 0 ? '' : ''}`}
                />
                {!showAllImages && idx === maxVisible - 1 && remaining > 0 && (
                  <div
                    onClick={() => setShowAllImages(true)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold rounded-lg"
                  >
                    +{remaining}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="flex items-center gap-3">
            <p className="text-[#989FC9] text-[12px] font-normal">8:15</p>
            <p className="bg-[#E9EAF1] text-[#08080A] p-2 lg:p-3 rounded-3xl text-[14px]  rounded-br-none max-w-xs  whitespace-normal
    break-normal">
              I'm good, thanks! And you?
            </p>
          </div>
        </div>
      

      
      </div>
    </div>
  );
};

export default Messages;
