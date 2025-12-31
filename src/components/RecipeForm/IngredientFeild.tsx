import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Plus, X } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { MultilingualInput } from "./MultilingualInput";

export const IngredientField: React.FC = () => {
   const { control } = useFormContext();
   const { isRTL, language } = useLanguage();

   const {
      fields: ingredientFields,
      append: appendIngredient,
      remove: removeIngredient,
   } = useFieldArray({
      control,
      name: "ingredients",
   });

   return (
      <div>
         <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">
               {language === "ar"
                  ? `${ingredientFields.length} مكون`
                  : `${ingredientFields.length} items`}
            </span>
         </div>

         <div className="space-y-3">
            {ingredientFields.map((field, index) => (
               <div
                  key={field.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 group border border-gray-200 mt-3"
               >
                  <div className="flex items-center justify-center h-12 w-5">
                     <div className="w-1.5 h-4 bg-green-400 rounded-full"></div>
                  </div>

                  <div className="flex-1">
                     <MultilingualInput
                        name={`ingredients.${index}.rawIngr`}
                        label=""
                        placeholder={
                           language === "ar" ? "مثال: 2 كوب دقيق" : "e.g. 2 cups of flour"
                        }
                        required
                     />
                  </div>

                  <div className="flex items-center">
                     {ingredientFields.length > 1 && (
                        <Button
                           type="button"
                           variant="ghost"
                           size="icon"
                           onClick={() => removeIngredient(index)}
                           className="h-10 w-10 text-gray-500 hover:text-red-500 hover:bg-red-50 opacity-80 group-hover:opacity-100 transition-opacity"
                           title={language === "ar" ? "إزالة المكون" : "Remove ingredient"}
                        >
                           <X className="w-4 h-4" />
                        </Button>
                     )}
                  </div>
               </div>
            ))}
         </div>

         <Button
            type="button"
            variant="outline"
            onClick={() =>
               appendIngredient({
                  rawIngr: { [language]: "" },
               })
            }
            className="mt-6 w-full border-dashed border-green-400 text-green-600 hover:bg-green-50 hover:border-green-500 hover:text-green-700 h-12 px-6 flex items-center justify-center gap-2 rounded-xl"
         >
            <Plus className="w-4 h-4" />
            {language === "ar" ? "إضافة مكون" : "Add Ingredient"}
         </Button>
      </div>
   );
};
