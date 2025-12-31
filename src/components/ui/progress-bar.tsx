import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
   labelPosition?: 'top' | 'bottom';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  
  progress,
  color = '#6AB240',
  height = 'md',
  showLabel = true,
  animated = true,
  labelPosition = 'bottom',
}) => {
  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
const {isRTL} =useLanguage()
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
 const label = showLabel && (
    <p className={`text-xs text-slate-600 mt-1 ${isRTL?"text-left":"text-right"} font-medium`}>{clampedProgress}%</p>
  );

  return (
    <div className="w-full">
       {labelPosition === 'top' && label}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${heights[height]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            animated ? 'animate-pulse-subtle' : ''
          }`}
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {labelPosition === 'bottom' && label}
    </div>
  );
};
