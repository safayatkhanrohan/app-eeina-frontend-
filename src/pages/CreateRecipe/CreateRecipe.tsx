import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { createRecipeSchema } from '../../schemas/recipe/createRecipeSchema';
import { useLanguage } from '../../contexts/LanguageContext';
import { ChefHat, Download } from 'lucide-react';
import {
  useCreateRecipeMutation,
  useImportRecipeWithAIMutation,
} from '../../redux/Features/Recipe/RecipeApi';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecipeForm } from '../../components/RecipeForm/RecipeForm';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { useEffect, useState } from 'react';
import { RecipeFormSkeleton } from '@/components/ui/skeletons/RecipeFormSkeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;

export const CreateRecipe = (): JSX.Element => {
  const { t, language } = useLanguage();
  const [createRecipe, { isLoading: Iscreating }] = useCreateRecipeMutation();
  const [importRecipeWithAI, { isLoading: isImporting }] = useImportRecipeWithAIMutation();
  const [sourceUrl, setSourceUrl] = useState('');
  const isRTL = language === 'ar';
  const lang = language === 'ar' ? 'Arabic' : 'English';
  const navigate = useNavigate();
  const location = useLocation();
  const importedRecipe = location.state?.importedRecipe;

  const methods = useForm<CreateRecipeFormData>({
    resolver: zodResolver(createRecipeSchema),
    mode: 'onBlur',
    defaultValues: {
      title: { [language]: '' },
      description: { [language]: '' },
      ingredients: [{ rawIngr: { [language]: '' } }],
      instructions: [{ step: { [language]: '' }, image: null }],
      servings: 1,
      time: 0,
      thumbnail: null as any,
      otherImages: [],
      videoUrl: '',
    },
    reValidateMode: 'onChange',
  });

  const handleImportRecipeWithAI = async () => {
    if (!sourceUrl.trim()) {
      toast.error(t.create_recipe.enter_url_first);
      return;
    }
    try {
      const result = await importRecipeWithAI({ url: sourceUrl, lang }).unwrap();
      const recipe = result.recipe.data;
      console.log('result', result);
      toast.success(result?.message || t.create_recipe.import_success);
      methods.reset({
        title: { [language]: recipe.title || '' },
        description: { [language]: recipe.description || '' },
        ingredients: recipe.ingredients?.map((ing: any) => ({
          rawIngr: { [language]: ing },
        })) || [{ rawIngr: { [language]: '' } }],
        instructions: recipe.instructions?.map((step: any) => ({
          step: { [language]: step },
          image: null,
        })) || [{ step: { [language]: '' }, image: null }],
        servings: recipe.yields || 2,
        time: recipe.cook_time || 0,
        thumbnail: recipe.image,
        otherImages: recipe.otherImages || [],
        videoUrl: recipe.url || '',
      });
    } catch (error: any) {
      toast.error(t.create_recipe.import_failed);
    }
  };

  const handleCreateRecipe = async (data: CreateRecipeFormData) => {
    try {
      const response = await createRecipe(data).unwrap();
      const recipe = response.data;
      toast.success(t.create_recipe.recipe_created_success);
      navigate(
        `${getLocalizedPath(`/recipe/${recipe.slug[language] || recipe.slug.en}`, language)}`,
      );
      // to Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      methods.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || t.create_recipe.failed_create_recipe);
      console.error('Error creating recipe:', error);
    }
  };

  useEffect(() => {
    if (importedRecipe) {
      methods.reset({
        title: { [language]: importedRecipe.title || '' },
        description: { [language]: importedRecipe.description || '' },
        ingredients: importedRecipe.ingredients?.map((ing: string) => ({
          rawIngr: { [language]: ing },
        })) || [{ rawIngr: { [language]: '' } }],
        instructions: importedRecipe.instructions?.map((step: string) => ({
          step: { [language]: step },
          image: null,
        })) || [{ step: { [language]: '' }, image: null }],
        servings: importedRecipe.yields || 2,
        time: importedRecipe.time || 0,
        thumbnail: importedRecipe.thumbnail || null,
        otherImages: importedRecipe.otherImages || [],
        videoUrl: importedRecipe.videoUrl || '',
      });
    }
  }, [importedRecipe, language, methods]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        {/* Header */}
        <div className="mb-8 mt-5 sm:mt-0 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <ChefHat className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-sm text-green-600 font-medium mb-2">
            {t.create_recipe.recipes_category}
          </div>
          <h1 className="text-[20px] md:text-3xl font-bold text-gray-900">
            {t.create_recipe.create_new_recipe}
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{t.create_recipe.share_recipe_msg}</p>
        </div>

        <Card className="p-6 md:p-8 overflow-hidden border-0 shadow-lg rounded-2xl mb-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <Download className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">{t.create_recipe.ImportRecipe}</h2>
          </div>

          <div className="space-y-4">
            <div
              className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2 sm:gap-3 items-start sm:items-center`}
            >
              <Button
                type="button"
                onClick={handleImportRecipeWithAI}
                disabled={isImporting}
                className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-6 py-2.5 rounded-lg
                  font-medium transition-colors duration-200 flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg
                  text-[12px] sm:text-base
                  "
              >
                <Download className="w-2 h-2 sm:w-4 sm:h-4" />
                {isImporting ? t.create_recipe.importing : t.create_recipe.ImportRecipe}
              </Button>

              <div className="flex-1">
                <Input
                  type="text"
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder={t.create_recipe.paste_url_placeholder}
                  className="w-full text-[12px] sm:text-base font-medium truncate placeholder:overflow-hidden placeholder:whitespace-nowrap placeholder:overflow-ellipsis"
                />
              </div>
            </div>
          </div>
        </Card>
        {isImporting ? (
          <div className="mt-0">
            <RecipeFormSkeleton />
          </div>
        ) : (
          <RecipeForm
            initialValues={methods.getValues()}
            onSubmit={handleCreateRecipe}
            isSubmitting={Iscreating}
            mode="create"
          />
        )}
      </div>
    </>
  );
};
