import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { getDayNames, getMonthNames } from './data';
import { formatDateKey } from './helper';

interface CalendarProps {
  currentDate: Date;
  onCurrentDateChange: (date: Date) => void;
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
  viewMode: 'week' | 'day';
  onViewModeChange: (mode: 'week' | 'day') => void;
  visibleDates: Date[];
  weekDates: Date[];
}

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  onCurrentDateChange,
  selectedDate,
  onSelectedDateChange,
  viewMode,
  onViewModeChange,
  weekDates,
}) => {
  const { t, language } = useLanguage();
  const dayNames = getDayNames(language);
  const monthNames = getMonthNames(language);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
      {/* Calendar Header with Navigation and View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Month/Year Display with Navigation Arrows */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentDate);
              if (viewMode === 'day') {
                newDate.setDate(currentDate.getDate() - 1);
              } else {
                newDate.setDate(currentDate.getDate() - 7);
              }
              onCurrentDateChange(newDate);
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentDate);
              if (viewMode === 'day') {
                newDate.setDate(currentDate.getDate() + 1);
              } else {
                newDate.setDate(currentDate.getDate() + 7);
              }
              onCurrentDateChange(newDate);
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* View Mode Toggle (Week/Day) */}
        <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('week')}
            className={viewMode === 'week' ? 'bg-primaryColor shadow-sm' : 'hover:bg-white/50'}
          >
            {t.meal_planner.view_week}
          </Button>
          <Button
            variant={viewMode === 'day' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('day')}
            className={viewMode === 'day' ? 'bg-primaryColor shadow-sm' : 'hover:bg-white/50'}
          >
            {t.meal_planner.view_day}
          </Button>
        </div>
      </div>

      {/* Week Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {weekDates.map((date: Date, index: number) => {
          const isSelected = formatDateKey(date) === formatDateKey(selectedDate);
          const isToday = formatDateKey(date) === formatDateKey(new Date());

          return (
            <div
              key={index}
              className={`flex items-center justify-center p-2 sm:p-4 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? 'bg-primaryColor text-white'
                  : isToday
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => onSelectedDateChange(date)}
            >
              <div className="text-center">
                <div className="text-[.5rem] sm:text-sm font-medium mb-1">
                  {dayNames[date.getDay()]}
                </div>
                <div className="text-xs sm:text-2xl font-bold mb-1 sm:mb-2">{date.getDate()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
