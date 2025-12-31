import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  percent: number; 
  radius?: number; 
  duration?: number; 
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percent,
  radius = 40,
  duration = 1500,
}) => {
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
const {language} = useLanguage()
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progressPercent = Math.min((elapsed / duration) * percent, percent);
      setProgress(progressPercent);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percent, duration]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card className="flex flex-col items-center justify-center w-40 p-4">
      <div className="relative flex items-center justify-center w-fit h-fit">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle
            stroke="#cdcdcd"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB6AC" />
              <stop offset="100%" stopColor="#22ae4b" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-green-700 font-bold text-xl">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <span className="text-gray-500 text-sm mt-2">{language == "ar"?"اكتمال الملف":"Profile Completion"}</span>
    </Card>
  );
};

export default CircularProgress;
