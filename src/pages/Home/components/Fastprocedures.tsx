import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';

import { Button } from '../../../components/ui/button';

import { getLocalizedPath } from '../../../lib/getLocalizedPath';
import { useState } from 'react';

import { Input } from '../../../components/ui/input';
import { useImportRecipeWithAIMutation } from '../../../redux/Features/Recipe/RecipeApi';
import { toast } from 'sonner';
import GreenButton from '@/components/ui/GreenButton';
import { ImportInsta, Importtikto, ImportUrl, ImportYoutupe } from '@/assets';

const Fastprocedures = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [recipeUrl, setRecipeUrl] = useState('');
  const [importRecipe, { isLoading: isImporting }] = useImportRecipeWithAIMutation();
  const lang = language === 'ar' ? 'Arabic' : 'English';

  const handleImport = async () => {
    if (!recipeUrl) {
      toast.error(language === 'ar' ? 'من فضلك أدخل رابط الوصفة.' : 'Please enter a recipe URL.');
      return;
    }
    try {
      const result = await importRecipe({ url: recipeUrl, lang }).unwrap();
      const recipe = result.recipe.data;

      toast.success(
        result?.message ||
          (language === 'ar' ? 'تم استيراد الوصفة بنجاح!' : 'Recipe imported successfully!'),
      );

      setIsImportOpen(false);
      setRecipeUrl('');

      navigate(getLocalizedPath('/create-recipe', language), {
        state: {
          importedRecipe: {
            title: recipe.title || '',
            description: recipe.description || '',
            ingredients: recipe.ingredients || [],
            instructions: recipe.instructions || [],
            yields: recipe.yields || 2,
            time: recipe.cook_time || 0,
            thumbnail: recipe.image,
            otherImages: recipe.otherImages || [],
            videoUrl: recipe.url || '',
          },
        },
      });
    } catch (err: any) {
      const msg = err?.data?.message || err?.error || 'Something went wrong!';
      toast.error(msg);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-3 py-5 px-5  rounded-[24px] border-[#E1E1E1] border">
        <h2 className=" font-bold text-[20px] ">{t.profile.Fastprocedures}</h2>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Link to={getLocalizedPath('/create-recipe', language)} className="w-full">
            <Button
              variant={'outline'}
              className="h-[43px] font-normal text-[14px] w-full border-[#E1E1E1] border rounded-[20px]"
            >
              {t.profile.Addrecipe}
            </Button>
          </Link>
          {/* <Link to={getLocalizedPath('/nutrition', language)} className="w-full">
            <Button
              variant={'outline'}
              className="h-[43px] font-normal text-[14px] w-full border-[#E1E1E1] border rounded-[20px]"
            >
              {t.profile.Nutritionplan}
            </Button>
          </Link> */}
          <Link to={getLocalizedPath('/lists', language)} className="w-full">
            <Button
              variant={'outline'}
              className="h-[43px] font-normal text-[14px] w-full border-[#E1E1E1] border rounded-[20px]"
            >
              {t.profile.Shoppinglist}
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-5 px-5  rounded-[24px] border-[#E1E1E1] border">
        <h2 className=" font-bold text-[20px] ">{t.home.import_recipe}</h2>
        <div className="flex justify-between items-center gap-4">
          <ImportUrl />
          <ImportYoutupe />
          <Importtikto />
          <ImportInsta />
        </div>
        <Input
          value={recipeUrl}
          onChange={(e) => setRecipeUrl(e.target.value)}
          className="!py-5 font-normal text-[12px] text-[#22212C66] rounded-[20px] focus:border-[#22ae4b] focus:ring-[#22ae4b]"
          placeholder={t.home?.Paste_recipe_URL}
        />
        <GreenButton
          onClick={handleImport}
          className="font-normal text-[14px] w-full py-2 !rounded-[20px] bg-[#6AB240] text-white"
          disabled={isImporting}
        >
          {isImporting
            ? language === 'ar'
              ? 'جاري الاستيراد...'
              : 'Importing...'
            : language === 'ar'
              ? 'استيراد'
              : 'Import'}
        </GreenButton>
      </div>
    </>
  );
};

export default Fastprocedures;
