import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { X, Plus, ImageIcon } from "lucide-react";
import { ImageUploader } from "../../components/ImageUploader";
import { useLanguage } from "../../contexts/LanguageContext";

export const OtherImagesField: React.FC = () => {
   const { control, formState } = useFormContext();
   const { language } = useLanguage();

   const { fields, append, remove, update } = useFieldArray({
      control,
      name: "otherImages",
   });

   return (
      <div>
         <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <ImageIcon className="w-4 h-4 text-green-600" />
            {language === "ar" ? "الصور الإضافية" : "Additional Images"}
         </label>

         <div className="space-y-4">
            {fields.map((fieldItem, index) => (
               <div
                  key={fieldItem.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
               >
                  <div className="flex-1">
                     <ImageUploader
                        // initialImage expects the image object (or null/empty)
                        initialImage={fieldItem as any}
                        onImageUpload={(newImage) => update(index, newImage as any)}
                        onDelete={() => remove(index)}
                        height="h-32"
                        uploadText={
                           language === "ar"
                              ? "انقر لرفع صورة إضافية"
                              : "Click to upload additional image"
                        }
                     />
                  </div>

                  {fields.length > 1 && (
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-gray-500 hover:text-red-500 hover:bg-red-50 h-10 w-10"
                        aria-label={language === "ar" ? "حذف الصورة" : "Remove image"}
                     >
                        <X className="w-4 h-4" />
                     </Button>
                  )}
               </div>
            ))}

            <Button
               type="button"
               variant="outline"
               onClick={() => append({ key: "", url: "" })}
               className="w-full border-dashed border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 hover:text-green-700 h-12"
            >
               <Plus className="w-4 h-4 mr-2" />
               {language === "ar" ? "إضافة صورة" : "Add Image"}
            </Button>

            {/* optional: show array-level validation error only after a submit attempt */}
            {formState.submitCount > 0 && formState.errors?.otherImages && (
               <p className="mt-2 text-sm text-red-500">
                  {String(formState.errors.otherImages?.message || "Please fix other images")}
               </p>
            )}
         </div>
      </div>
   );
};

export default OtherImagesField;
