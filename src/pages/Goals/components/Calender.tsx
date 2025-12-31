import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export default function Calendar({ selectedDate: propDate, onDateSelect }: CalendarProps) {
  const today = new Date();
  const [internalDate, setInternalDate] = useState(today);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMobile, setIsMobile] = useState(false);

  const currentDate = propDate || internalDate;

  const startXRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setVisibleCount(5);
        setIsMobile(true);
      } else {
        setVisibleCount(7);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDates = () => {
    const half = Math.floor(visibleCount / 2);
    const dates = [];
    for (let i = -half; i <= half; i++) {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const dates = getDates();

  const handleDateChange = (newDate: Date) => {
    if (onDateSelect) {
      onDateSelect(newDate);
    } else {
      setInternalDate(newDate);
    }
  };

  const handleArrow = (direction: 'left' | 'right') => {
    const half = Math.floor(visibleCount / 2);
    const minDate = new Date(today);
    minDate.setHours(0, 0, 0, 0);

    const newDate = new Date(currentDate);
    newDate.setDate(direction === 'left' ? currentDate.getDate() - 1 : currentDate.getDate() + 1);

    // Check if the new date would show days before today
    const firstVisibleDate = new Date(newDate);
    firstVisibleDate.setDate(newDate.getDate() - half);
    firstVisibleDate.setHours(0, 0, 0, 0);


    // if (firstVisibleDate < minDate) {
    //   return;
    // }

    handleDateChange(newDate);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startXRef.current;

    if (Math.abs(diff) > 30) {
      if (diff > 0) handleArrow('left');
      else handleArrow('right');
    }

    startXRef.current = null;
  };

  return (
    <div className="w-full flex items-center justify-center select-none relative">
      {!isMobile && (
        <>
          <button
            onClick={() => handleArrow('left')}
            className={`absolute left-[-30px] top-1/2 -translate-y-1/2 rounded-full p-2 z-10  bg-[#6AB240]`}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => handleArrow('right')}
            className={`absolute right-[-30px] top-1/2 -translate-y-1/2 rounded-full p-2 z-10 bg-[#6AB240]`}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      <div
        className="flex w-full gap-2 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {dates.map((date, idx) => {
          const isActive = date.toDateString() === currentDate.toDateString();
          return (
            <div
              key={idx}
              style={{
                flex: `0 0 ${100 / visibleCount}%`,
                transition: 'transform 0.3s ease',
              }}
              className="h-[72px] flex flex-col items-center justify-center"
            >
              <div
                onClick={() => handleDateChange(new Date(date))}
                className={`w-full h-full flex flex-col items-center justify-center rounded-xl border cursor-pointer transition
                  ${
                    isActive
                      ? 'bg-[#6AB240] border-[#6AB240] text-white font-bold'
                      : 'bg-white text-[#272932] border-gray-200 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-[16px]">{date.getDate()}</span>
                <span className="text-[14px]">{weekday[date.getDay()]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
