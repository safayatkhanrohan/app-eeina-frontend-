import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Button } from '../../../components/ui/button';
import { PlusCircle, Link as LinkIcon } from 'lucide-react';
import { getLocalizedPath } from '../../../lib/getLocalizedPath';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '../../../components/ui/input';
import { useImportRecipeWithAIMutation } from '../../../redux/Features/Recipe/RecipeApi';
import { toast } from 'sonner';

export const QuickActions = () => {
  const { t, language } = useLanguage();
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [recipeUrl, setRecipeUrl] = useState('');
  const [importRecipe, { isLoading: isImporting }] = useImportRecipeWithAIMutation();
  const navigate = useNavigate();
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
            servings: recipe.servings || 2,
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
    <div className="flex gap-3 mb-8">
      {/* Create Recipe Button */}
      <Link to={getLocalizedPath('/create-recipe', language)} className="flex-1">
        <Button className="w-full bg-primaryColor hover:bg-[#1e9a42] text-white h-10 shadow-sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          {t.home?.create_recipe || (language === 'ar' ? 'إنشاء وصفة' : 'Create Recipe')}
        </Button>
      </Link>

      {/* Import Recipe Button */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 h-10 shadow-sm"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            {t.home?.import_recipe || (language === 'ar' ? 'استيراد وصفة' : 'Import Recipe')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t.home?.import_recipe || (language === 'ar' ? 'استيراد وصفة' : 'Import Recipe')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder={
                  t.home?.Paste_recipe_URL ||
                  (language === 'ar' ? 'الصق رابط الوصفة' : 'Paste recipe URL')
                }
                value={recipeUrl}
                onChange={(e) => setRecipeUrl(e.target.value)}
                className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor"
              />
            </div>
            <Button
              onClick={handleImport}
              className="w-full bg-primaryColor hover:bg-[#1e9a42] text-white"
              disabled={isImporting}
            >
              {isImporting
                ? language === 'ar'
                  ? 'جاري الاستيراد...'
                  : 'Importing...'
                : language === 'ar'
                  ? 'استيراد'
                  : 'Import'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
