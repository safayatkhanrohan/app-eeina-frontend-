// src/components/form/MultilingualInput.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useLanguage } from "../../contexts/LanguageContext";
import { TextArea } from "../ui/TextArea";

interface MultilingualInputProps {
   name: string;
   label?: string;
   placeholder?: string;
   required?: boolean;
   type?: "text" | "textarea";
   rows?: number;
   className?: string;
}

export const MultilingualInput: React.FC<MultilingualInputProps> = React.memo(
   ({ name, label, placeholder, required = false, type = "text", rows = 4, className = "" }) => {
      const {
         register,
         formState: { errors },
      } = useFormContext();
      const { language, isRTL } = useLanguage();

      const fieldError = errors[name]?.[language as keyof (typeof errors)[typeof name]];

      const sharedClasses = `border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-xl ${isRTL ? "text-right" : "text-left"} ${fieldError ? "border-red-400" : ""} ${className}`;

      return (
         <div className={isRTL ? "text-right" : "text-left"}>
            {label && (
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label} {required && <span className="text-red-500">*</span>}
               </label>
            )}

            <div className="space-y-2">
               {/* The `type` prop was not being used for the textarea case. I've added a conditional render. */}
               {type === "textarea" ? (
                  <TextArea
                     {...register(`${name}.${language}`)}
                     placeholder={placeholder}
                     rows={rows}
                     className={`w-full p-3 ${sharedClasses}`}
                     dir={isRTL ? "rtl" : "ltr"}
                  />
               ) : (
                  <Input
                     {...register(`${name}.${language}`)}
                     type={type}
                     placeholder={placeholder}
                     className={`h-12 w-full px-3 ${sharedClasses}`}
                     dir={isRTL ? "rtl" : "ltr"}
                  />
               )}

               {fieldError && (
                  <p className="mt-1 text-sm text-red-500">
                     {/* Now correctly displays the message from the nested error object */}
                     {String(fieldError?.message as any)}
                  </p>
               )}
            </div>
         </div>
      );
   }
);

MultilingualInput.displayName = "MultilingualInput";
export default MultilingualInput;
