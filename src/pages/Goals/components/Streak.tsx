import React from 'react';
import { Card } from '@/components/ui/card';
import { Flame, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakProps {
  currentStreak: number;
  maxStreak: number;
  className?: string;
}

const Streak: React.FC<StreakProps> = ({ currentStreak, maxStreak, className }) => {
  return (
    <Card className={cn("relative overflow-hidden border-orange-100 bg-gradient-to-br from-orange-50 to-white", className)}>
      <div className="absolute top-0 right-0 p-3 opacity-10">
        <Flame className="w-24 h-24 text-orange-500" />
      </div>
      
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm backdrop-blur-sm border border-orange-100/50">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>ON FIRE</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-1 text-[11px] font-medium text-yellow-700 border border-yellow-100">
               <Trophy className="w-3 h-3 text-yellow-600" />
               <span>Best: {maxStreak}</span>
            </div>
        </div>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-5xl font-extrabold tracking-tight text-gray-900 leading-none">
            {currentStreak}
          </span>
          <span className="text-base font-medium text-gray-500 mb-1">days</span>
        </div>

        <div className="text-xs font-medium text-orange-600/80">
          Keep it up! You're doing great.
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 opacity-20 blur-2xl" />
    </Card>
  );
};

export default Streak;