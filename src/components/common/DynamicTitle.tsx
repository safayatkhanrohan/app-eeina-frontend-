import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const DynamicTitle = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = `${
      language == "ar"
        ? "إيناء - اكتشف عالماً من النكهات"
        : "Eeina - Discover a World of Flavors"
    }`;
  }, [language]);

  return null;
};

export default DynamicTitle;
