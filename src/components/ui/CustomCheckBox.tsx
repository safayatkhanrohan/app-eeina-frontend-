import { CheckIcon } from '@/assets';
import { useState } from 'react';

interface CustomCheckBoxProps {
  onAdd?: (item: any) => void; 
  mealItem?: any;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ onAdd, mealItem }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);

    if (!checked && onAdd) {
      onAdd(mealItem);
    }
  };

  return (
    <label className="flex items-center cursor-pointer gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="hidden"
      />

      <div
        className={`
          relative
          w-5 h-5
          rounded-[3px]
          border 
          ${checked ? 'bg-[#6AB240] border-[#6AB240]' : 'bg-transparent border-white'}
        `}
      >
        {checked && (
          <CheckIcon
            className="
              absolute
              -top-[2px]
              -right-[2px]
              w-5 h-5
              text-white
              stroke-[3]
            "
          />
        )}
      </div>
    </label>
  );
};

export default CustomCheckBox;
