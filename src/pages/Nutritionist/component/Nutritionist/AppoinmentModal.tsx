import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import '../time.css';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { isSameDay } from 'date-fns';

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const times = ['07:30 am', '08:00 am', '08:30 am', '09:00 am', '09:30 am', '10:00 am'];

const AppointmentModal = ({ open, onOpenChange }: AppointmentModalProps) => {
  const { t, language } = useLanguage();
  const [activeTime, setActiveTime] = useState<string | null>('07:30 am');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" max-w-fit h-[96%] overflow-y-auto px-0 pb-0">
        <h3 className="text-[14px] md:text-base font-bold mt-4 text-center px-6 py-3">
          {t.nutritionist.bookinAppoinmentModal}
        </h3>
        <div className="space-y-10 mt-4 px-6">
          <DayPicker
            mode="single"
            dir={language == 'ar' ? 'rtl' : 'ltr'}
            selected={selectedDate}
            onSelect={setSelectedDate}
            classNames={{
              weekdays: 'text-[#6AB240]',
              day: 'text-[#0D212C] rounded-full',
              today:
                selectedDate && isSameDay(selectedDate, new Date())
                  ? 'bg-[#5B9F34] text-white rounded-full'
                  : 'text-[#0D212C]',
              selected: 'bg-[#5B9F34] text-white rounded-full',
            }}
          />
          <Card className=" w-full lg:w-[60%] mx-auto lg:p-6 border-none shadow-none lg:shadow lg:border border-[#DCDBDD] flex flex-col gap-5 gap-y-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#6AB240]">
                {t.nutritionist.Determineeveningtime}
              </h2>
              <div className="grid grid-cols-12 gap-2 gap-y-3">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setActiveTime(time)}
                    className={`
                      col-span-4
                      rounded-[14px]
                      px-2 py-1
                      text-[14px]
                      text-center
                      font-medium
                      transition-all
                      ${
                        activeTime === time
                          ? 'bg-[#87B740] text-white'
                          : 'bg-[#F9FAFB] text-[#858585] border border-[#E6E6EC]'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <h2 className="text-base font-bold text-[#6AB240]">
                {t.nutritionist.Determineeveningtime}
              </h2>
              <div className="grid grid-cols-12 gap-2 gap-y-3">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setActiveTime(time)}
                    className={`
                      col-span-4
                      rounded-[14px]
                      px-2 py-1
                      text-[14px]
                      text-center
                      font-medium
                      transition-all
                      ${
                        activeTime === time
                          ? 'bg-[#87B740] text-white'
                          : 'bg-[#F9FAFB] text-[#858585] border border-[#E6E6EC]'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
        <div
          className=" p-5 py-7 flex flex-col lg:flex-row justify-between items-center mt-4 gap-2 "
          style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="flex flex-row lg:flex-col items-center gap-3 lg:items-start flex-1">
            <p className="text-sm font-normal text-[#0D212C]">10 am</p>
            <h3 className="text-base font-semibold">Today is February 15th</h3>
          </div>
          <Button className="flex-1 py-2 lg:py-3 sm:py-6 bg-[#87B740] hover:bg-[#87B740] text-white rounded-[14px] text-base">
            {t.nutritionist.Bookingconfirmation}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
