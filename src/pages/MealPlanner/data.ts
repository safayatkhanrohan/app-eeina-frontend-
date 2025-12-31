type SupportedLang = "en" | "ar";

const locales: Record<SupportedLang, { days: string[]; months: string[] }> = {
   en: {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ],
   },
   ar: {
      days: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      months: [
         "يناير",
         "فبراير",
         "مارس",
         "أبريل",
         "مايو",
         "يونيو",
         "يوليو",
         "أغسطس",
         "سبتمبر",
         "أكتوبر",
         "نوفمبر",
         "ديسمبر",
      ],
   },
};

export const getDayNames = (language: SupportedLang = "en") => locales[language].days;

export const getMonthNames = (language: SupportedLang = "en") => locales[language].months;
