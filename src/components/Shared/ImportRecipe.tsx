import { useLanguage } from '@/contexts/LanguageContext';
import { useImportRecipeWithAIMutation } from '@/redux/Features/Recipe/RecipeApi';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

const ImportRecipe = () => {
  const { t, language } = useLanguage();
  const [recipeUrl, setRecipeUrl] = useState('');
  const [importRecipe, { isLoading }] = useImportRecipeWithAIMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const lang = language === 'ar' ? 'Arabic' : 'English';

  const handleImport = async () => {
    setErrorMessage('');
    if (!recipeUrl) {
      setErrorMessage(
        language == 'ar' ? 'من فضلك أدخل رابط الوصفة. ' : 'Please enter a recipe URL.',
      );
      return;
    }
    try {
      const result = await importRecipe({ url: recipeUrl, lang }).unwrap();
      const recipe = result.recipe.data;

      console.log('Imported Recipe in components:', recipe);

      toast.success(
        result?.message || language === 'ar'
          ? 'تم استيراد الوصفة بنجاح!'
          : 'Recipe imported successfully!',
      );

      // Navigate to create recipe page with imported data
      navigate(getLocalizedPath('/create-recipe', language), {
        state: {
          importedRecipe: {
            title: recipe.title || '',
            description: recipe.description || '',
            ingredients: recipe.ingredients || [],
            instructions: recipe.instructions || [],
            yields: recipe.yields || 1,
            time: recipe.cook_time || 0,
            thumbnail: recipe.image,
            otherImages: recipe.otherImages || [],
            videoUrl: recipe.url || '',
          },
        },
      });

      setRecipeUrl('');
    } catch (err: any) {
      const msg = err?.data?.message || err?.error || 'Something went wrong!';
      setErrorMessage(msg);
    }
  };
  return (
    <Card className="hidden lg:block">
      <CardContent className="p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">{t.home.import_recipe}</h3>
        <div className="space-y-3">
          <Input
            value={recipeUrl}
            onChange={(e) => setRecipeUrl(e.target.value)}
            placeholder={t.home.Paste_recipe_URL}
            className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor"
          />
          <Button
            onClick={handleImport}
            className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white"
            disabled={isLoading}
          >
            {isLoading ? (language == 'en' ? 'Importing...' : 'استيراد') : t.home.import_recipe}
          </Button>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportRecipe;
