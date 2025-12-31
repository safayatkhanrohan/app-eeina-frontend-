import { VideoProps } from "../../type/type";


const SmallVideo = ({ stream }: VideoProps) => {
  return (
    <video
      autoPlay
      playsInline
      muted
      className="w-40 md:w-48 h-28 md:h-36 object-cover rounded-xl bg-[#87B740] shadow-lg"
      ref={(video) => {
        if (video && stream) {
          video.srcObject = stream;
        }
      }}
    />
  );
};

export default SmallVideo;
