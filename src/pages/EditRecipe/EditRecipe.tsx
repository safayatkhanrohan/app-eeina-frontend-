import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { createRecipeSchema } from '../../schemas/recipe/createRecipeSchema';
import { useLanguage } from '../../contexts/LanguageContext';
import { ChefHat } from 'lucide-react';
import {
  useGetRecipeByIdQuery,
  useEditRecipeMutation,
  useCreateRecipeMutation,
} from '../../redux/Features/Recipe/RecipeApi';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeForm } from '../../components/RecipeForm/RecipeForm';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hook';
import Loader from '@/components/ui/Loader';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

type EditRecipeFormData = z.infer<typeof createRecipeSchema>;

export const EditRecipe = (): JSX.Element => {
  const { t, isRTL, language } = useLanguage();
  const userId = useAppSelector((state) => state.auth.user?._id);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  // Fetch recipe data
  const { data: recipeData, isLoading } = useGetRecipeByIdQuery(id!);
  const [editRecipe, { isLoading: Isediting }] = useEditRecipeMutation();
  const [createRecipe] = useCreateRecipeMutation();

  const recipe = recipeData?.data;

  const methods = useForm<EditRecipeFormData>({
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

  // Populate form with recipe data when it's loaded
  useEffect(() => {
    if (recipe) {
      console.log('Populating form with recipe data:', recipe);

      methods.reset({
        title: recipe.title || { [language]: '' },
        description: recipe.description || { [language]: '' },
        ingredients: recipe.ingredients?.map((ing: any) => ({
          rawIngr: {
            [language]: `${ing?.quantity} ${ing?.unit?.[language]} ${ing?.rawIngr?.[language]}`,
          },
        })),
        instructions: recipe.instructions?.map((inst: any) => ({
          step: inst.step || { [language]: '' },
          image: null, // You might want to handle existing images differently
        })) || [{ step: { [language]: '' }, image: null }],
        servings: recipe.servings || 1,
        time: recipe.time || 0,
        thumbnail: recipe.thumbnail || null,
        otherImages: recipe.otherImages || [],
        videoUrl: recipe.videoUrl || '',
      });
    }
  }, [recipe, methods, language]);

  const handleUpdateRecipe = async (data: EditRecipeFormData) => {
    const isOwner = recipe?.createdBy === userId;
    try {
      if (isOwner) {
        const payload = {
          lang: language,
          recipeData: data,
        };
        await editRecipe({ ...payload, id: id! }).unwrap();
      } else {
        await createRecipe(data).unwrap();
      }
      toast.success(t.create_recipe.recipe_updated_success);
      navigate(getLocalizedPath('/profile', language));
    } catch (error: any) {
      toast.error(error?.data?.message || t.create_recipe.recipe_update_failed);
      console.error('Error updating recipe:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!recipe) {
    return (
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.create_recipe.recipe_not_found}</h1>
        </div>
      </div>
    );
  }

  const submitLabel = language === 'ar' ? 'تحديث الوصفة' : 'Update Recipe';

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 mt-6 mb-[3rem] md:mb-[4rem] lg:mb-0">
          {/* Header */}
          <div className="mb-8  mt-5 sm:mt-0 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
              <ChefHat className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-sm text-green-600 font-medium mb-2">
              {t.create_recipe.recipes_category}
            </div>
            <h1 className="text-[20px] md:text-3xl font-bold text-gray-900">
              {t.create_recipe.edit_recipe}
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              {t.create_recipe.update_preference_desc}
            </p>
          </div>

          <RecipeForm
            initialValues={methods.getValues()}
            onSubmit={handleUpdateRecipe}
            submitLabel={submitLabel}
            isSubmitting={Isediting}
            mode="edit"
          />
        </div>
      </div>
    </>
  );
};
