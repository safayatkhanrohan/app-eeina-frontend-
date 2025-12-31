import { useLanguage } from "@/contexts/LanguageContext";

const RingingScreen = () => {
  const { language } = useLanguage();

  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden z-10 ">
      
      <img
        src="/vedioImag.jpg"
        alt="caller background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#404040C7]" />

      <div className="relative flex flex-col items-center justify-center h-full gap-2">
        <img
          src="/unnamed.jpg"
          className="w-28 h-28 rounded-full object-cover"
        />

        <h3 className="text-white text-xl xl2:text-[36px] font-medium">
         ali mohamed
        </h3>

        <p className="text-white text-[20px] font-medium">
          {language === "ar" ? "يرن..." : "ringing..."}
        </p>
      </div>
    </div>
  );
};

export default RingingScreen;
