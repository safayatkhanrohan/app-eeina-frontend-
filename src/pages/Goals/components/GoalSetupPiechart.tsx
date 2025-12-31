import { useLanguage } from '@/contexts/LanguageContext';
import { Lightning } from '@/assets';
import { useState } from 'react';

interface PieChartProps {
  calories?: number;
  carbs?: number;
  protein?: number;
  sugar?: number;
  fat?: number;
}

const GaolSetupPiechart = ({
  calories,
  carbs = 0,
  protein = 0,
  sugar = 0,
  fat = 0,
}: PieChartProps) => {
  const { t } = useLanguage();
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const radius = 74.5;
  const center = 85;
  const total = carbs + protein + sugar + fat;

  const segments = [
    { label: t.goalSetup.carb_label, color: '#6BAA47', value: total ? (carbs / total) * 100 : 0 },
    {
      label: t.goalSetup.protein_label,
      color: '#609542',
      value: total ? (protein / total) * 100 : 0,
    },
    { label: t.goalSetup.Sugars_label, color: '#588C3A', value: total ? (sugar / total) * 100 : 0 },
    { label: t.goalSetup.Fats_label, color: '#6AB240BA', value: total ? (fat / total) * 100 : 0 },
  ];

  let startAngle = 0;

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };
  return (
    <div className="relative flex items-center justify-center">
      <svg width="170" height="170" viewBox="0 0 170 170">
        {segments.map((seg, index) => {
          const angle = (seg.value / 100) * 360;
          const endAngle = startAngle + angle;

          const start = polarToCartesian(center, center, radius, endAngle);
          const end = polarToCartesian(center, center, radius, startAngle);

          const largeArc = angle > 180 ? 1 : 0;

          const pathData = `
                        M ${start.x} ${start.y}
                        A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}
                    `;
          const segmentIndex = index;
          startAngle += angle;

          return (
            <path
              key={index}
              d={pathData}
              stroke={seg.color}
              strokeWidth="21"
              fill="none"
              onMouseEnter={() => setHoveredSegment(seg.label)}
              onMouseLeave={() => setHoveredSegment(null)}
              opacity={hoveredSegment === seg.label ? 0.7 : 1}
            />
          );
        })}
      </svg>
      {hoveredSegment && (
        <div className="absolute top-0 mt-40 bg-white px-2 py-1 rounded shadow text-sm font-medium">
          {hoveredSegment}
        </div>
      )}

      <div className="absolute flex flex-col items-center text-center">
        <Lightning />
        <h2 className="text-[22px] text-[#6AB240] font-bold">{calories || 0}</h2>
        <h2 className="text-[14px] text-[#6AB240] font-normal">{t.goalSetup.kcal}</h2>
      </div>
    </div>
  );
};

export default GaolSetupPiechart;
