import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowDown, Target, TrendingDown, Weight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeightProgressProps {
  currentWeight: number;
  startingWeight: number;
  targetWeight: number;
  className?: string;
}

const WeightProgress: React.FC<WeightProgressProps> = ({
  currentWeight,
  startingWeight,
  targetWeight,
  className,
}) => {
  const { t } = useLanguage();

  // Calculate progress percentage
  // Assuming weight loss for now. If gain, logic reverses.
  // Progress = (Start - Current) / (Start - Target) * 100
  const totalToLose = startingWeight - targetWeight;
  const lostSoFar = startingWeight - currentWeight;
  const progress = Math.min(100, Math.max(0, (lostSoFar / totalToLose) * 100));

  const remaining = Math.abs(currentWeight - targetWeight);

  return (
    <Card className={`p-5 bg-white flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Weight className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-[14px] xl2:text-base font-semibold text-gray-900">
              {t.GoalsDashboard.WeightJourney}
            </h3>
            <p className="text-xs text-gray-500">{t.GoalsDashboard.KeepGoing}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-base xl2:text-2xl font-bold text-gray-900">
            {currentWeight} <span className="text-sm font-normal text-gray-500">kg</span>
          </span>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
            <ArrowDown className="w-3 h-3" />
            <span>{Math.abs(startingWeight - currentWeight).toFixed(1)} kg</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs font-medium text-gray-500">
          <span>
            {t.GoalsDashboard.Start}: {startingWeight}kg
          </span>
          <span>
            {t.GoalsDashboard.Goal}: {targetWeight}kg
          </span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-1"
            style={{ width: `${progress}%` }}
          >
            {progress > 10 && <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />}
          </div>
        </div>
        <div className="flex justify-center">
          <span className="text-xs text-gray-400 font-medium">
            {remaining.toFixed(1)} kg {t.GoalsDashboard.ToReachGoal}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        <div className="bg-gray-50 rounded-xl p-2 xl2:p-3 flex  items-center gap-1 xl2:gap-3">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <TrendingDown className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
              {t.GoalsDashboard.Lost}
            </span>
            <span className="text-sm font-bold text-gray-900">
              {lostSoFar.toFixed(1)}{' '}
              <span className="text-[10px] font-normal text-gray-400">kg</span>
            </span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-2 xl2:p-3  flex items-center gap-1 xl2:gap-3">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
              {t.GoalsDashboard.Left}
            </span>
            <span className="text-sm font-bold text-gray-900">
              {remaining.toFixed(1)}{' '}
              <span className="text-[10px] font-normal text-gray-400">kg</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeightProgress;
