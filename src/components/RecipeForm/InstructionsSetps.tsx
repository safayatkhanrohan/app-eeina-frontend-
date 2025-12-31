import React from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { MultilingualInput } from "./MultilingualInput";
import { ImageUploader } from "../../components/ImageUploader";
import { useLanguage } from "../../contexts/LanguageContext";

export const InstructionStepField: React.FC = () => {
   const { control } = useFormContext();
   const { language } = useLanguage();

   const {
      fields: stepFields,
      append: appendStep,
      remove: removeStep,
   } = useFieldArray({
      control,
      name: "instructions",
   });

   return (
      <div>
         <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">
               {language === "ar" ? `${stepFields.length} خطوة` : `${stepFields.length} steps`}
            </span>
         </div>

         <div className="space-y-6">
            {stepFields.map((field, index) => (
               <Card key={field.id} className="border border-gray-200 overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white font-bold">{index + 1}</span>
                           </div>
                           <span className="text-lg font-semibold text-gray-900">
                              {language === "ar" ? `خطوة ${index + 1}` : `Step ${index + 1}`}
                           </span>
                        </div>
                        {stepFields.length > 1 && (
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeStep(index)}
                              className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                              title={language === "ar" ? "حذف الخطوة" : "Delete step"}
                           >
                              <Trash2 className="w-4 h-4" />
                           </Button>
                        )}
                     </div>

                     <div className="space-y-6">
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              {language === "ar" ? "صورة الخطوة" : "Step Image"}
                           </label>
                           <Controller
                              name={`instructions.${index}.image`}
                              control={control}
                              render={({ field }) => (
                                 <ImageUploader
                                    initialImage={field.value}
                                    onImageUpload={field.onChange}
                                    onDelete={() => field.onChange(null)}
                                    height="h-40"
                                    uploadText={
                                       language === "ar" ? "إضافة صورة للخطوة" : "Add Step Image"
                                    }
                                 />
                              )}
                           />
                        </div>

                        <div>
                           <MultilingualInput
                              name={`instructions.${index}.step`}
                              label={language === "ar" ? "التعليمات" : "Instructions"}
                              placeholder={
                                 language === "ar"
                                    ? "صف خطوات الطبخ بالتفصيل..."
                                    : "Describe the cooking steps in detail..."
                              }
                              required
                           />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}

            <Button
               variant="outline"
               type="button"
               onClick={() =>
                  appendStep({
                     step: { [language]: "" },
                     image: null,
                  })
               }
               className="w-full border-dashed border-green-400 text-green-600 hover:bg-green-50 hover:border-green-500 hover:text-green-700 h-12 rounded-xl"
            >
               <Plus className="w-4 h-4 mr-2" />
               {language === "ar" ? "إضافة خطوة" : "Add Step"}
            </Button>
         </div>
      </div>
   );
};
