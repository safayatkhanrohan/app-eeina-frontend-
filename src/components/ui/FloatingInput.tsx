import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

const FloatingInput: React.FC<FloatingInputProps> = ({ label, error, register, ...props }) => {
  const id = props.id || props.name;
  const { isRTL } = useLanguage();
  return (
    <div className="relative w-full">
      <input
        {...register}
        {...props}
        id={id}
        placeholder={props.placeholder ?? ' '}
        className={`
            
            ${(isRTL &&props.type === 'tel') ? 'text-end' : 'text-start'}
            block   h-12 w-full px-3 pb-2.5 pt-4 text-[14px] text-[#656467] font-normal bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer`}
      />
      <label
        htmlFor={id}
        className="whitespace-nowrap absolute text-[14px] md:text-base text-[#84818A]  font-normal duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-[0] bg-white px-2
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
          peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75
          peer-valid:top-2 peer-valid:-translate-y-4 peer-valid:scale-75"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FloatingInput;
