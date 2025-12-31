import { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import './time.css';
import { useLanguage } from '@/contexts/LanguageContext';

interface CustomTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function CustomTimePicker({ value, onChange }: CustomTimePickerProps) {
  const [customMealTime, setCustomMealTime] = useState(value || '00:00');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('PM');
  const { t, isRTL } = useLanguage();
  const pickerRef = useRef<HTMLDivElement>(null);

  // close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // change time
  const handleSelect = (type: string, value: string) => {
    let newHour = selectedHour;
    let newMinute = selectedMinute;
    let newPeriod = selectedPeriod;

    if (type === 'hour') newHour = value;
    if (type === 'minute') newMinute = value;
    if (type === 'period') newPeriod = value;

    const newTime = `${newHour}:${newMinute} ${newPeriod}`;
    setSelectedHour(newHour);
    setSelectedMinute(newMinute);
    setSelectedPeriod(newPeriod);
    setCustomMealTime(newTime);

    onChange(newTime);
  };

  return (
    <div className="relative w-full" ref={pickerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t.meal_planner.meal_time}
      </label>
      <div
        className="flex h-9 items-center justify-between w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors cursor-pointer focus-within:ring-1 focus-within:ring-ring"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{customMealTime}</span>
        <Clock
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div
          className={`absolute top-full ${
            isRTL ? 'left-0' : 'right-0'
          } mt-1 w-50 bg-background border border-input rounded-md shadow-md p-3 grid grid-cols-3 gap-2 z-50 animate-in fade-in slide-in-from-top-1`}
        >
          {/* Hours */}
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto no-scrollbar">
            {[...Array(12)].map((_, i) => {
              const hour = (i + 1).toString().padStart(2, '0');
              return (
                <button
                  key={hour}
                  onClick={() => handleSelect('hour', hour)}
                  className={`text-sm rounded px-2 py-1 text-left hover:bg-accent ${
                    selectedHour === hour ? 'bg-accent text-primary font-semibold' : ''
                  }`}
                >
                  {hour}
                </button>
              );
            })}
          </div>

          {/* Minutes */}
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto no-scrollbar">
            {[...Array(60)].map((_, i) => {
              const minute = i.toString().padStart(2, '0');
              return (
                <button
                  key={minute}
                  onClick={() => handleSelect('minute', minute)}
                  className={`text-sm rounded px-2 py-1 text-left hover:bg-accent ${
                    selectedMinute === minute ? 'bg-accent text-primary font-semibold' : ''
                  }`}
                >
                  {minute}
                </button>
              );
            })}
          </div>

          {/* AM/PM */}
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto no-scrollbar">
            {['AM', 'PM'].map((p) => (
              <button
                key={p}
                onClick={() => handleSelect('period', p)}
                className={`text-sm rounded px-2 py-1 text-left hover:bg-accent ${
                  selectedPeriod === p ? 'bg-accent text-primary font-semibold' : ''
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
