import { VideoProps } from "../../type/type";


const MainVideo = ({ stream }: VideoProps) => {
  return (
    <video
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover rounded-xl bg-black"
      ref={(video) => {
        if (video && stream) {
          video.srcObject = stream;
        }
      }}
    />
  );
};

export default MainVideo;
