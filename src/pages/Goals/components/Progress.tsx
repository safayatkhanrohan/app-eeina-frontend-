import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Target } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProgressProps {
  progressPentage: number;
  startDate: string;
  endDate: string;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ progressPentage, startDate, endDate, className }) => {
  // Safe date formatting
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className={cn("p-5 bg-white flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-1.5 rounded-full">
                <Target className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">Goal Progress</h3>
        </div>
        <span className="text-2xl font-bold text-gray-900">{progressPentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progressPentage))}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3 border-gray-100">
        <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Start: {formatDate(startDate)}</span>
        </div>
        <div className="flex items-center gap-1.5">
            <span>End: {formatDate(endDate)}</span>
        </div>
      </div>
    </Card>
  );
};

export default Progress;