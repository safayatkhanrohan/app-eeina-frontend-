import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from 'recharts';
import { format, subDays, isSameDay, startOfDay } from 'date-fns';
import { MealLog } from '../types/type';
import { useLanguage } from '@/contexts/LanguageContext';

interface CommitmentChartProps {
  mealLog?: MealLog[];
}

const CommitmentChart: React.FC<CommitmentChartProps> = ({ mealLog = [] }) => {
  const {t} = useLanguage()
  const chartData = useMemo(() => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6 - i);
      return {
        date,
        dayName: format(date, 'eee'),
        isToday: isSameDay(date, today),
        fullDate: format(date, 'MMM d'),
      };
    });

    return last7Days.map((day) => {
      // Find log for this day
      const log = mealLog.find((entry) =>
        isSameDay(startOfDay(new Date(entry.date)), startOfDay(day.date)),
      );

      let percentage = 0;
      let status = 'Skipped';

      if (log && log.meals) {
        const meals = Object.values(log.meals);
        const total = meals.length;
        const completed = meals.filter(Boolean).length;
        if (total > 0) {
          percentage = Math.round((completed / total) * 100);

          if (percentage === 100) status = 'Perfect';
          else if (percentage >= 75) status = 'Good';
          else if (percentage >= 50) status = 'Fair';
          else status = 'Poor';
        }
      }

      return {
        ...day,
        percentage,
        status,
      };
    });
  }, [mealLog]);

  const weeklyAverage = useMemo(() => {
    const total = chartData.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(total / 7);
  }, [chartData]);

  const getColor = (percentage: number) => {
    if (percentage === 100) return '#10B981'; // Perfect (Emerald-500)
    if (percentage >= 75) return '#34D399'; // Good (Emerald-400)
    if (percentage >= 50) return '#FBBF24'; // Fair (Amber-400)
    if (percentage > 0) return '#F87171'; // Poor (Red-400)
    return '#E5E7EB'; // Skipped (Gray-200)
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100 ring-1 ring-black ring-opacity-5">
          <p className="text-sm font-semibold text-gray-900">{data.fullDate}</p>
          <p className="text-xs text-gray-500 mb-1">{data.status}</p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getColor(data.percentage) }}
            />
            <span className="text-sm font-bold text-gray-700">{data.percentage}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{t.goals.Commitmenttitle}</h3>
          <p className="text-sm text-gray-500">{t.goals.Commitmentsubtitle}</p>
        </div>
        <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 flex flex-col items-end">
          <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
           {t.goals.weeklyAvg}
          </span>
          <span className="text-xl font-bold text-gray-900">{weeklyAverage}%</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis
              dataKey="dayName"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => {
                const isToday = chartData[payload.index].isToday;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="middle"
                      fill={isToday ? '#111827' : '#9CA3AF'}
                      className={`text-xs ${isToday ? 'font-bold' : 'font-medium'}`}
                    >
                      {payload.value} {isToday ? '(Today)' : ''}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
            <Bar dataKey="percentage" radius={[4, 4, 4, 4]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.percentage)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 items-center justify-center border-t border-gray-100 pt-4">
        {[
          { label: `${t.goals.perfect} (100%)`, color: '#10B981' },
          { label: `${t.goals.good } (75%+)`, color: '#34D399' },
          { label: `${t.goals.fair} (50%+)`, color: '#FBBF24' },
          { label: `${t.goals.poor} (<50%)`, color: '#F87171' },
          { label: `${t.goals.skipped}`, color: '#E5E7EB' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] sm:text-xs font-medium text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitmentChart;
