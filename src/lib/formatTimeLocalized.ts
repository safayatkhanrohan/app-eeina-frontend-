import { useLanguage } from "@/contexts/LanguageContext";

export const formatTimeLocalized = (minutes: number) => {
  const {language} = useLanguage()
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

   if (language === 'ar') {
    if (hours === 0) return `${mins} دقيقة`;
    if (mins === 0) return `${hours} ساعة`;
    return `${hours} ساعة و ${mins} دقيقة`;
  } else {
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  }
};

export const formatDateLocalized = (
  isoDate: string,
  locale: string,
  timeZone: string = 'Asia/Riyadh',
): string => {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};
