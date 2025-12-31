import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { convertUnit, unitLabels } from '../utils/unitConversion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Ingredient {
  id: number;
  ingredient: any;
  quantity: number;
  rawIngr: string;
  unit: string;
  item: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  servings: number;
  onServingsChange: (newServings: number) => void;
  onAddToList: () => void;
  language: string;
  t: any;
}

/**
 * IngredientsList Component
 *
 * Displays recipe ingredients with servings adjuster
 * Allows users to check off ingredients and add to shopping list
 *
 * @param ingredients - Array of ingredient objects
 * @param servings - Current number of servings
 * @param onServingsChange - Callback when servings are adjusted
 * @param onAddToList - Callback to add all ingredients to list
 * @param language - Current language (en/ar)
 * @param t - Translation function
 */
export const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  servings,
  onServingsChange,
  onAddToList,
  language,
  t,
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [unitSystem, setUnitSystem] = useState<'original' | 'imperial' | 'metric'>('original');
  const [open, setOpen] = useState(false);
  const { isRTL } = useLanguage();
  console.log('IngredientsList Rendered with ingredients:', ingredients);

  /**
   * Toggle ingredient checked state
   */
  const toggleIngredient = (id: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /**
   * Decrease servings (minimum 1)
   */
  const decreaseServings = () => {
    onServingsChange(Math.max(1, servings - 1));
  };

  /**
   * Increase servings
   */
  const increaseServings = () => {
    onServingsChange(servings + 1);
  };

  return (
    <Card className=" mb-8 border  border-gray-200 shadow-sm">
      <CardContent className="relative p-6 px-4">
        {/* Header Section */}
        <div className="flex flex-col  sm:items-center justify-between gap-4 mb-6">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2 xl2:gap-3 ">
              <ShoppingBag className="w-6 h-6 text-primaryColor" />
              <h3 className="text-base md:text-lg xl2:text-xl font-bold text-gray-900">
                {t.recipe.ingredients}
              </h3>
            </div>
            {/* Add to List Button */}
            <Button
              onClick={onAddToList}
              className="bg-gradient-to-r from-primaryColor to-[#1c9a40] hover:from-[#1c9a40] hover:to-[#168333] text-white rounded-full px-2 xl:px-2 xl2:px-4 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 mr-2 xl:mr-0 xl2:mr-2" />
              {t.recipe.add_to_list}
            </Button>
          </div>

          <div className="w-full flex-wrap flex flex-1  justify-between sm:flex-row sm:items-center gap-0 xl:gap-1 xl2:gap-4">
            {/* Servings Adjuster */}
            <div className="flex-1 flex  items-center gap-2 xl2:gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-gray-300 hover:border-primaryColor hover:text-primaryColor"
                  onClick={decreaseServings}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-[12px] sm:text-sm font-medium text-gray-600">
                  {servings} {t.recipe.servings}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-gray-300 hover:border-primaryColor hover:text-primaryColor"
                  onClick={increaseServings}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div
              className={`flex-1 relative w-full flex justify-end`}
            >
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="text-sm font-medium text-gray-700 border border-[#cfcfcf] rounded-full py-1 px-3"
              >
                {language == 'ar' ? 'تحويل الوحدات' : ' Convert Units'}
              </button>

              <div
                className={`
                    absolute ${isRTL ? 'left-0' : 'right-0'}  top-full z-30 mt-2 w-48 rounded-lg bg-white shadow-lg p-3
                    transform transition-all duration-200 ease-out
                    ${
                      open
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }
                  `}
              >
                {[
                  {
                    value: 'original',
                    label: `${language == 'ar' ? 'كما هي في الوصفة' : 'Original'}`,
                  },
                  { value: 'metric', label: `${language == 'ar' ? 'جرام ومللي' : 'Metric'}` },
                  { value: 'imperial', label: `${language == 'ar' ? 'أكواب وملاعق' : 'Imperial'}` },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between cursor-pointer py-2"
                  >
                    <span className="text-sm text-gray-800">{option.label}</span>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="unitSystem"
                        value={option.value}
                        checked={unitSystem === option.value}
                        onChange={() => {
                          setUnitSystem(option.value as any);
                          setOpen(false);
                        }}
                        className="hidden"
                      />

                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                         ${unitSystem === option.value ? 'border-primaryColor' : 'border-gray-300'}`}
                      >
                        {unitSystem === option.value && (
                          <div className="w-2 h-2 rounded-full bg-primaryColor" />
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ingredients.map((ingredient) => {
            const converted = convertUnit(ingredient.quantity, ingredient.unit, unitSystem);
            const displayUnit = unitLabels[language]?.[converted.unit] || converted.unit;

            return (
              <div
                key={ingredient.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                onClick={(e) => {
                  e.preventDefault();
                  toggleIngredient(ingredient.id);
                }}
              >
                {/* Ingredient Link with Image */}
                <Link
                  to={`/ingredient/${ingredient?.ingredient?.slug?.en}`}
                  className={`flex-1 flex items-center gap-3 text-sm hover:text-primaryColor transition-colors ${
                    checkedIngredients.includes(ingredient.id)
                      ? 'line-through text-gray-500'
                      : 'text-gray-900'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Ingredient Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={ingredient?.ingredient?.image?.url || '/ingrediant.png'}
                      alt={ingredient?.ingredient?.name?.[language] || 'not available'}
                      className="w-14 h-14 rounded-lg object-contain"
                    />
                    {checkedIngredients.includes(ingredient.id) && (
                      <div className="absolute inset-0 bg-primaryColor bg-opacity-20 rounded-lg" />
                    )}
                  </div>
                  {/* Ingredient Text */}
                  <span className="whitespace-normal break-words">
                    {/* {`${ingredient.quantity > 0 ? `${ingredient.quantity} ` : ''}${ingredient.unit} ${ingredient.rawIngr}`} */}
                    {ingredient.quantity > 0
                      ? `${converted.quantity} ${displayUnit} ${ingredient.rawIngr}`
                      : ingredient.rawIngr}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
