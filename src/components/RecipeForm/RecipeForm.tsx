import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Card } from '../ui/card';
import {
  BookOpen,
  ChefHat,
  Download,
  Globe,
  ImageIcon,
  Info,
  Instagram,
  ListOrdered,
  Loader,
  Loader2,
  MessageCircle,
  Youtube,
} from 'lucide-react';
import MultilingualInput from './MultilingualInput';
import { BasicInfoFields } from './BasicInfoFields';
import { ImageUploader } from '../ImageUploader';
import OtherImagesField from './OtherImages';
import { IngredientField } from './IngredientFeild';
import { InstructionStepField } from './InstructionsSetps';
import { Button } from '../ui/button';
import { createRecipeSchema } from '../../schemas/recipe/createRecipeSchema';
import z from 'zod';
import { useLanguage } from '../../contexts/LanguageContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import ImportRecipe from '../Shared/ImportRecipe';
import { Input } from '../ui/input';

type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;

export type RecipeFormProps = {
  initialValues?: CreateRecipeFormData;
  onSubmit: (data: CreateRecipeFormData) => Promise<void> | void;
  submitLabel?: string;
  /** If you want custom button disabled state (optional) */
  isSubmitting?: boolean;
  className?: string;
  mode?: string;
};

export const RecipeForm: React.FC<RecipeFormProps> = ({
  initialValues = {},
  onSubmit,
  submitLabel,
  isSubmitting,
  className,
  mode,
}) => {
  const { language } = useLanguage();
  const defaults: CreateRecipeFormData = {
    title: { [language]: '' } as any,
    description: { [language]: '' } as any,
    ingredients: [{ rawIngr: { [language]: '' } as any }],
    instructions: [{ step: { [language]: '' } as any, image: null }],
    servings: 1,
    time: 0,
    thumbnail: null as any,
    otherImages: [],
    videoUrl: '',
  };

  const methods = useForm<CreateRecipeFormData>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: { ...defaults, ...initialValues } as any,
    reValidateMode: 'onChange',
  });
  useEffect(() => {
    methods.reset({ ...defaults, ...initialValues } as any);
  }, [initialValues, language]);

  const handleSubmit = methods.handleSubmit(async (data: any) => {
    // caller will handle toast/navigation/errors
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    }
  });
  console.log(methods.formState.isSubmitting);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Card */}
        <Card className="p-6 md:p-8 overflow-hidden border-0 shadow-lg rounded-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <BookOpen className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
            </h2>
          </div>

          <div className="space-y-6">
            <MultilingualInput
              name="title"
              label={language === 'ar' ? 'عنوان الوصفة' : 'Recipe Title'}
              placeholder={language === 'ar' ? 'عنوان الوصفة' : 'Recipe Title'}
              required
            />

            <BasicInfoFields />

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <ImageIcon className="w-4 h-4 text-green-600" />
                {language === 'ar' ? 'الصورة المصغرة' : 'Thumbnail Image'}
              </label>
              <Controller
                name="thumbnail"
                control={methods.control}
                render={({ field }) => (
                  <ImageUploader
                    initialImage={field.value}
                    onImageUpload={field.onChange}
                    onDelete={() => field.onChange(null)}
                    height="h-48"
                    uploadText={
                      language === 'ar' ? 'انقر لرفع الصورة المصغرة' : 'Click to upload thumbnail'
                    }
                    subText="PNG, JPG, WEBP"
                  />
                )}
              />
              {methods.formState.errors.thumbnail && (
                <p className="mt-2 text-sm text-red-500">
                  {methods.formState.errors.thumbnail?.message as string}
                </p>
              )}
            </div>

            <OtherImagesField />

            <MultilingualInput
              name="description"
              type="textarea"
              rows={4}
              label={language === 'ar' ? 'الوصف' : 'Description'}
              placeholder={
                language === 'ar' ? 'صف وصفاتك بالتفصيل...' : 'Describe your recipe in detail...'
              }
            />
          </div>
        </Card>

        {/* Ingredients Card */}
        <Card className="p-6 md:p-8 overflow-hidden border-0 shadow-lg rounded-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <ListOrdered className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'ar' ? 'المكونات' : 'Ingredients'}
            </h2>
          </div>
          <IngredientField />
        </Card>

        {/* Instructions Card */}
        <Card className="p-6 md:p-8 overflow-hidden border-0 shadow-lg rounded-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <ChefHat className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'ar' ? 'خطوات التحضير' : 'Instructions'}
            </h2>
          </div>
          <InstructionStepField />
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-semibold rounded-xl h-14 shadow-md hover:shadow-lg transition-all"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSubmitting
              ? mode === 'edit'
                ? language === 'ar'
                  ? 'جارٍ التعديل...'
                  : 'Editing...'
                : language === 'ar'
                  ? 'جارٍ الإنشاء...'
                  : 'Creating...'
              : mode === 'edit'
                ? language === 'ar'
                  ? 'تعديل وصفة'
                  : 'Edit Recipe'
                : language === 'ar'
                  ? 'إنشاء وصفة'
                  : 'Create Recipe'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
