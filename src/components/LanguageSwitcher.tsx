import React from "react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageIcon } from '@/assets';
export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
     const { language, setLanguage } = useLanguage();

     const toggleLanguage = () => {
          setLanguage(language === "en" ? "ar" : "en");
     };

     return (
          <Button
               variant="ghost"
               size="sm"
               onClick={toggleLanguage}
               className={`p-0 flex items-center gap-2 hover:bg-transparent ${className}`}>
               <LanguageIcon width="20" height="20" />
               <span className="font-semibold text-sm hidden md:inline">
                    {language === "en" ? "En " : "Ar"}
               </span>
          </Button>
     );
};
