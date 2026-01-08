import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useGetIngrediantBySlugQuery } from '@/redux/Features/Ingrediant/IngrediantApi';
import { categorizeNutrients } from '@/utils/nutrition/nutritionUtils';
import { AllNutrientsModal } from '@/components/Shared/AllNutrientsModal';
import { IngredientInfoCard, RelatedRecipes } from './components';

export const IngredientDetails = (): JSX.Element => {
  const { ingredientName, slug } = useParams<{ ingredientName: string; slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [showAllNutrients, setShowAllNutrients] = useState(false);
  const { data: ingrediantDetails } = useGetIngrediantBySlugQuery(slug as string);

  const ingredienDetailstData = ingrediantDetails?.data;

  const categorizedNutrientsData = categorizeNutrients(ingredienDetailstData?.nutrition);
  const hasNutrients = Object.keys(categorizedNutrientsData).some(
    (category) => Object.keys(categorizedNutrientsData[category]).length > 0,
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        <div className="mb-6 mt-5 sm:mt-0">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 p-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'رجوع' : 'Back'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <IngredientInfoCard
            ingredienDetailstData={ingredienDetailstData}
            setShowAllNutrients={setShowAllNutrients}
            hasNutrients={hasNutrients}
          />

          <RelatedRecipes slug={slug} />
        </div>
      </div>

      <AllNutrientsModal
        showAllNutrients={showAllNutrients}
        setShowAllNutrients={setShowAllNutrients}
        data={ingredienDetailstData}
      />
    </div>
  );
};
