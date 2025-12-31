import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';
interface SliderWithTooltipProps {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
}

export const SliderWithTooltip: React.FC<SliderWithTooltipProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const [pos, setPos] = useState(0);
  const { isRTL } = useLanguage();
  const rangeRef = useRef<HTMLInputElement>(null);

  const updatePosition = (val: number) => {
    const ratio = 100 / (max - min);
    let position = ratio * (val - min);

    setPos(position);
  };

  useEffect(() => {
    updatePosition(value);
  }, [value, isRTL]);

  return (
    <div className="w-full max-w-xl mx-auto relative mt-6">
      {/* Tooltip */}
      <output
        className="absolute -top-10 bg-white border border-green-700 text-green-700 rounded px-2 py-1 font-bold shadow"
        style={{
          right: isRTL ? `calc(${pos}%)` : 'auto',
          left: isRTL ? 'auto' : `calc(${pos}%)`,
          transform: 'translateX(-50%)',
        }}
      >
        {value}
      </output>

      {/* Slider */}
      <input
        ref={rangeRef}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-[#f2f1f1] shadow-sm rounded-lg appearance-none bg-gradient-to-r from-green-400 to-green-200"
        style={{
          background: isRTL
            ? `linear-gradient(to left, #16a34a ${pos}%, #f2f1f1 ${pos}%)`
            : `linear-gradient(to right, #16a34a ${pos}%, #f2f1f1 ${pos}%)`,
        }}
      />
      {/* Thumb customization */}
      <style>
        {`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 2em;
          width: 2em;
          border-radius: 50%;
          background: #16a34a; 
          border: 2px solid white;
          box-shadow: 0 0 0.5em #888;
          cursor: pointer;
          margin-top: -0.4em;
        }
        input[type="range"]::-moz-range-thumb {
          height: 2em;
          width: 2em;
          border-radius: 50%;
          background: #16a34a;
          border: 2px solid white;
          cursor: pointer;
        }
        `}
      </style>
    </div>
  );
};
