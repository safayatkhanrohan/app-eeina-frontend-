import { useFormContext } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { useLanguage } from "../../contexts/LanguageContext";
import { Clock, Users, Video } from "lucide-react";

export const BasicInfoFields: React.FC = () => {
   const {
      register,
      formState: { errors },
   } = useFormContext();
   const { language } = useLanguage();

   console.log("BasicInfoFields errors:", errors);

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Preparation Time */}
         <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
               <Clock className="w-4 h-4 text-green-600" />
               {language === "ar" ? "وقت التحضير (دقيقة)" : "Preparation Time (minutes)"}
            </label>
            <Input
               type="number"
               placeholder={language === "ar" ? "مثال: 45" : "e.g. 45"}
               {...register("time", { valueAsNumber: true })}
               className={`border-gray-300 focus:border-green-500 focus:ring-green-500 h-12 rounded-xl ${
                  errors.time ? "border-red-400" : ""
               }`}
            />
            {errors.time && (
               <p className="mt-2 text-sm text-red-500">{errors.time.message?.toString()}</p>
            )}
         </div>

         {/* Servings */}
         <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
               <Users className="w-4 h-4 text-green-600" />
               {language === "ar" ? "عدد الحصص" : "Servings"}
            </label>
            <Input
               type="number"
               placeholder={language === "ar" ? "مثال: 4" : "e.g. 4"}
               {...register("servings", { valueAsNumber: true })}
               className={`border-gray-300 focus:border-green-500 focus:ring-green-500 h-12 rounded-xl ${
                  errors.servings ? "border-red-400" : ""
               }`}
            />
            {errors.servings && (
               <p className="mt-2 text-sm text-red-500">{errors.servings.message?.toString()}</p>
            )}
         </div>

         {/* Video URL */}
         <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
               <Video className="w-4 h-4 text-green-600" />
               {language === "ar" ? "رابط الفيديو" : "Video URL"}
            </label>
            <Input
               placeholder="www.youtube.com"
               {...register("videoUrl")}
               className={`border-gray-300 focus:border-green-500 focus:ring-green-500 h-12 rounded-xl ${
                  errors.videoUrl ? "border-red-400" : ""
               }`}
            />
            {errors.videoUrl && (
               <p className="mt-2 text-sm text-red-500">{errors.videoUrl.message?.toString()}</p>
            )}
         </div>
      </div>
   );
};
