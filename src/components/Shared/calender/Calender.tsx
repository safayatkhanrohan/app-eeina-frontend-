import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

interface StartDaySelectionProps {
  selectedDate: Date | null;
  onSelectedDateChange: (day: Date) => void;
  onClose: () => void;
  title?: string;
}

export const Calender = ({
  selectedDate,
  onSelectedDateChange,
  onClose,
  title,
}: StartDaySelectionProps) => {
  const { language } = useLanguage();
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate);

  const handleDateChange = (day: Date | undefined) => {
    console.log('selectedDate', selectedDate);
    if (day) {
      const now = new Date();
      // Create a fresh date object to ensure state updates trigger re-renders and no reference sharing
      const newDate = new Date(day);
      newDate.setHours(now.getHours());
      newDate.setMinutes(now.getMinutes());
      newDate.setSeconds(now.getSeconds());
      newDate.setMilliseconds(now.getMilliseconds());
      console.log('Setting tempDate with time:', newDate);
      setTempDate(newDate);
    }
  };

  return (
    <div className="bg-[#F7F7F7] shadow-cart p-4 rounded-lg mt-3">
      <div className="flex justify-between items-center">
        <h2 className="text-[#6AB240] font-bold text-[14px] lg:!text-[18px] py-2">{title}</h2>
        <button className="font-medium text-[#6AB240]" onClick={onClose}>
          {language === 'ar' ? 'إلغاء' : 'Cancels'}
        </button>
      </div>

      <DayPicker
        mode="single"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        selected={tempDate || undefined}
        onSelect={handleDateChange}
        classNames={{
          weekdays: 'text-[#6AB240]',
          selected: 'bg-[#5B9F34] text-white rounded-full',
          today: '',
        }}
      />
      <button
        disabled={!tempDate}
        onClick={() => {
          if (tempDate) {
            onSelectedDateChange(tempDate);
            onClose();
          }
        }}
        className="w-full mt-4 py-2 bg-[#6AB240] text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500"
      >
        {language === 'ar' ? 'اختيار التاريخ' : 'Choose Date'}
      </button>
    </div>
  );
};
