import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

const FloatingTextarea: React.FC<FloatingTextareaProps> = ({ label, error, register, ...props }) => {
  const id = props.id || props.name;

  return (
    <div className="relative w-full">
      <textarea
        {...register}
        {...props}
        id={id}
        placeholder={props.placeholder ?? ' '}
        rows={4}
        className="block w-full h-[114px] px-4 py-3 text-[14px] font-normal text-[#656467] bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer resize-none"
      />
      <label
        htmlFor={id}
        className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-[0] bg-white px-2
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
          peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75
          peer-valid:top-2 peer-valid:-translate-y-4 peer-valid:scale-75"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FloatingTextarea;
