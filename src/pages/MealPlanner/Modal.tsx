import { Bookmark, ChefHat, Grape, Search, Soup, Utensils, X } from 'lucide-react';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import './time.css';
import {
  useCreateCustomMealMutation,
  useGetAllMealPlannerTemplatesQuery,
} from '../../redux/Features/MealPlan/mealPlanApi';
import { MealItemCard } from './Cards';
import { useGetSaved_recipeQuery } from '../../redux/Features/Saved/savedApi';
import { useGetPublicRecipeQuery } from '../../redux/Features/Recipe/RecipeApi';
import { useGetFoodQuery } from '../../redux/Features/Food/foodApi';
import { formatDateKey, formatMealItems } from './helper';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { RecipiSkeleton } from '../../components/ui/skeletons/RecipiSkeleton';
import {
  useGetAllIngredientQuery,
  useGetFruitsQuery,
} from '../../redux/Features/Ingrediant/IngrediantApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { CustomTimePicker } from './CutomTimePicker';
import {
  useGetAllGeneratedmealPlansQuery,
  useGetGoalsQuery,
  useImportGeneratedPlanMutation,
} from '@/redux/Features/Goals/GoalsApi';
import { toast } from 'sonner';
import Loader from '@/components/ui/Loader';

interface CustomMealModalProps {
  showCustomMealModal: boolean;
  setShowCustomMealModal: (show: boolean) => void;
  selectedDate: Date;
}

export const CustomMealModal = ({
  showCustomMealModal,
  setShowCustomMealModal,
  selectedDate,
}: CustomMealModalProps) => {
  const { t, language } = useLanguage();
  const [customMealTime, setCustomMealTime] = useState<string | null>(null);
  const [customMealName, setCustomMealName] = useState('');
  const [createCustomMealType] = useCreateCustomMealMutation();

  if (!showCustomMealModal) return null;

  const addCustomMealType = async () => {
    if (!customMealTime || !customMealName.trim()) return;

    // Convert "HH:MM" to hour number (1-23)
    const hour = parseInt(customMealTime.split(':')[0]);

    await createCustomMealType({
      name: { en: customMealName, ar: customMealName },
      date: formatDateKey(selectedDate),
      time: hour,
    }).unwrap();
    console.log('customMealTime', customMealTime);
    setCustomMealName('');
    setCustomMealTime(null);
    setShowCustomMealModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {t.meal_planner.add_custom_meal_time}
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setShowCustomMealModal(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <CustomTimePicker value={customMealTime || ''} onChange={setCustomMealTime} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.meal_planner.meal_name}
              </label>
              <Input
                placeholder={t.meal_planner.meal_name_placeholder}
                value={customMealName}
                onChange={(e) => setCustomMealName(e.target.value)}
                className="border-gray-300 focus:border-primaryColor focus:ring-primaryColor"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={addCustomMealType}
                className="flex-1 bg-primaryColor hover:bg-[#1c9a40] text-white"
                disabled={!customMealName.trim() || !customMealTime}
              >
                {t.meal_planner.add_meal_time}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCustomMealModal(false)}
                className="flex-1"
              >
                {t.common.cancel}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface AddMealItemModalProps {
  showAddMealItemModal: boolean;
  setShowAddMealItemModal: (show: boolean) => void;
  addItemtoMealPlan: (mealItem: any) => void;
}

export const AddMealItemModal = ({
  showAddMealItemModal,
  setShowAddMealItemModal,
  addItemtoMealPlan,
}: AddMealItemModalProps) => {
  if (!showAddMealItemModal) return null;

  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [activeTab, setActiveTab] = useState<
    'saved' | 'recipes' | 'processedFood' | 'ingredient' | 'fruits'
  >('saved');

  // Define query hooks for each tab
  const queryHooks = {
    saved: useGetSaved_recipeQuery,
    recipes: useGetPublicRecipeQuery,
    processedFood: useGetFoodQuery,
    ingredient: useGetAllIngredientQuery,
    fruits: useGetFruitsQuery,
  };

  // Use useInfiniteScroll for the active tab only
  const { allData, isLoading, isFetching, lastElementRef, hasMore, reset, isError } =
    useInfiniteScroll(
      queryHooks[activeTab],
      { q: debouncedQuery },
      8, // Items per page
    );

  // Normalize data based on active tab
  const getCurrentMealItems = useCallback((): any[] => {
    let type: 'recipe' | 'processedFood' | 'ingredient';
    if (activeTab === 'saved' || activeTab === 'recipes') {
      type = 'recipe';
    } else if (activeTab === 'processedFood') {
      type = 'processedFood';
    } else if (activeTab === 'fruits') {
      type = 'ingredient';
    } else {
      type = 'ingredient';
    }
    return formatMealItems(allData, language, type);
  }, [allData, language, activeTab]);

  // Handle tab switch and reset pagination
  const handleTabSwitch = useCallback(
    (tab: 'saved' | 'recipes' | 'processedFood' | 'ingredient' | 'fruits') => {
      if (tab !== activeTab) {
        setActiveTab(tab);
        setSearchQuery(''); // Clear search on tab switch
        reset(); // Reset infinite scroll state
      }
    },
    [activeTab, reset],
  );
  console.log('getCurrentMealItems()', getCurrentMealItems().length);
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-[96%] max-w-5xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl pb-10">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{t.meal_planner.add_meal_item}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={() => {
                  setShowAddMealItemModal(false);
                  setSearchQuery('');
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-4 mb-4 overflow-x-auto">
              <Button
                variant={activeTab === 'saved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTabSwitch('saved')}
                className={
                  activeTab === 'saved' ? 'bg-primaryColor hover:bg-[#1c9a40] text-white' : ''
                }
              >
                <Bookmark className="w-4 h-4 mr-2" /> {t.meal_planner.saved_tab}
              </Button>
              <Button
                variant={activeTab === 'recipes' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTabSwitch('recipes')}
                className={
                  activeTab === 'recipes' ? 'bg-primaryColor hover:bg-[#1c9a40] text-white' : ''
                }
              >
                <ChefHat className="w-4 h-4 mr-2" />
                {t.meal_planner.recipes_tab}
              </Button>
              <Button
                variant={activeTab === 'processedFood' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTabSwitch('processedFood')}
                className={
                  activeTab === 'processedFood'
                    ? 'bg-primaryColor hover:bg-[#1c9a40] text-white'
                    : ''
                }
              >
                <Utensils className="w-4 h-4 mr-2" /> {t.meal_planner.foods_tab}
              </Button>
              <Button
                variant={activeTab === 'fruits' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTabSwitch('fruits')}
                className={
                  activeTab === 'fruits' ? 'bg-primaryColor hover:bg-[#1c9a40] text-white' : ''
                }
              >
                <Grape className="w-4 h-4 mr-2" /> {t.meal_planner.fruits_tab}
              </Button>
              <Button
                variant={activeTab === 'ingredient' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTabSwitch('ingredient')}
                className={
                  activeTab === 'ingredient' ? 'bg-primaryColor hover:bg-[#1c9a40] text-white' : ''
                }
              >
                <Soup className="w-4 h-4 mr-2" /> {t.meal_planner.essentials_tab}
              </Button>
            </div>

            {/* Search */}
            <div className="relative bg-white">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t.meal_planner.search_items_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-primaryColor focus:ring-primaryColor"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96  bg-white">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[...Array(6)].map((_, i) => (
                  <RecipiSkeleton key={i} variant="grid" />
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-red-500">{t.meal_planner.error_loading_items}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {getCurrentMealItems().map((item) => (
                    <MealItemCard
                      key={item.id}
                      mealItem={item}
                      onAdd={(i) => addItemtoMealPlan(i)}
                    />
                  ))}
                </div>
                {hasMore && (
                  <div ref={lastElementRef} className="p-4 text-center">
                    {isFetching && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {[...Array(3)].map((_, i) => (
                          <RecipiSkeleton key={i} variant="grid" />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {getCurrentMealItems().length === 0 && !isFetching && (
                  <div className="text-center py-6 sm:py-8">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">{t.meal_planner.no_items_found}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface ServingModalProps {
  mealItem: any | null;
  showServingSizeModal: boolean;
  setShowServingSizeModal: (show: boolean) => void;
  onAdd: (
    mealItem: any,
    serving: {
      quantity: number;
      unit: 'g' | 'pcs' | 'serving';
    },
  ) => void;
}

export const ServingModal = ({
  mealItem,
  showServingSizeModal,
  setShowServingSizeModal,
  onAdd,
}: ServingModalProps) => {
  const { t, language } = useLanguage();

  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<'g' | 'pcs' | 'serving'>('serving');

  console.log('mealItem in ServingModal:', mealItem);

  useEffect(() => {
    if (mealItem) {
      // Reset quantity and unit when mealItem changes
      setQuantity(mealItem.itemType === 'ingredient' ? 100 : 1);
      if (mealItem.serving) setQuantity(mealItem.serving);
      setUnit(
        mealItem.itemType === 'recipe'
          ? 'serving'
          : mealItem.itemType === 'processedFood'
            ? 'pcs'
            : 'g',
      );
    }
  }, [mealItem]);

  if (!showServingSizeModal || !mealItem) return null;

  const increment = () => {
    setQuantity((prev) => prev + (unit === 'g' ? 100 : 1));
  };

  const decrement = () => {
    setQuantity((prev) =>
      prev > (unit === 'g' ? 100 : 1) ? prev - (unit === 'g' ? 100 : 1) : prev,
    );
  };

  const amountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      setQuantity(val);
    } else if (e.target.value === '') {
      setQuantity(0);
    }
  };

  const addToMealPlan = () => {
    onAdd(mealItem, { quantity, unit });
    setShowServingSizeModal(false);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{t.meal_planner.serving_size}</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowServingSizeModal(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <img
                src={mealItem.image}
                alt={mealItem.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
              />
              <h4 className="text-lg font-semibold text-gray-900">{mealItem.name}</h4>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={decrement}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                -
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={amountInput}
                className="w-20 text-center border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
                min={unit === 'g' ? 100 : 1}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={increment}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                +
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500">
              {t.meal_planner.calories_per_unit_msg
                .replace('{quantity}', unit === 'g' ? '100' : '1')
                .replace('{unit}', unit)
                .replace('{calories}', mealItem.calories)}
            </p>
            <p className="text-center text-sm text-gray-500">
              {t.meal_planner.total_calories_msg.replace(
                '{calories}',
                Math.round(
                  (unit === 'g' ? quantity / 100 : quantity) * mealItem.calories,
                ).toString(),
              )}
            </p>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={addToMealPlan}
                className="flex-1 bg-primaryColor hover:bg-[#1c9a40] text-white"
              >
                {t.meal_planner.add_to_meal_plan}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowServingSizeModal(false)}
                className="flex-1"
              >
                {t.common.cancel}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface BrowseMealModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate?: (templateId: string) => void;
}

export const BrowseMealModal = ({
  isOpen,
  onOpenChange,
  onSelectTemplate,
}: BrowseMealModalProps) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [formattedGeneratedMealPlans, setFormattedGeneratedMealPlans] = useState<any>([]);

  const { data: goalData } = useGetGoalsQuery({});
  const [importGeneratedPlan] = useImportGeneratedPlanMutation();

  const { data, isLoading, isFetching, isError } = useGetAllMealPlannerTemplatesQuery({
    page,
    limit: 12,
    q: debouncedQuery,
    status: 'active',
  });

  const { data: generatedMealPlans, isLoading: isGeneratedMealPlansLoading } =
    useGetAllGeneratedmealPlansQuery({});

  console.log('generatedMealPlans in BrowseMealModal:', generatedMealPlans);

  console.log('Meal Planner Templates Data:', data);

  const templates = data?.data?.docs || [];
  console.log('Templates in BrowseMealModal:', templates);

  console.log('Page:', page);

  const hasMore = data?.data?.pagination?.page < data?.data?.pagination?.totalPages;

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  const handleTemplateSelect = (template: any) => {
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
    onOpenChange(false);
  };

  useEffect(() => {
    if (!generatedMealPlans?.data) return;

    const plans = generatedMealPlans.data;

    console.log('Formatting generated meal plans:', plans);

    setFormattedGeneratedMealPlans(
      plans.map((plan: any) => ({
        name: {
          en: t.meal_planner.generated_plan_title
            .replace('{type}', plan.goalType)
            .replace('{duration}', plan.goalDuration),
          ar: t.meal_planner.generated_plan_title
            .replace('{type}', plan.goalType)
            .replace('{duration}', plan.goalDuration),
        },
        description: {
          en: t.meal_planner.generated_plan_desc
            .replace('{type}', plan.goalType)
            .replace('{duration}', plan.goalDuration),
          ar: t.meal_planner.generated_plan_desc
            .replace('{type}', plan.goalType)
            .replace('{duration}', plan.goalDuration),
        },
        duration: plan.goalDuration,
        image: plan.thumbnail.url,
      })),
    );
  }, [generatedMealPlans]);

  if (isLoading || isGeneratedMealPlansLoading) {
    return null;
  }

  const hanldeImportGenereatedMealPlan = async () => {
    try {
      await importGeneratedPlan({
        generatedPlanId: generatedMealPlans?.data._id,
      }).unwrap();
      toast.success(t.meal_planner.meal_plan_imported_success);
      onOpenChange(false);
    } catch (error) {
      console.error('Error importing generated meal plan:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t.meal_planner.browse_templates_title}</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t.meal_planner.search_templates_placeholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-10 border-gray-200 focus:border-primaryColor focus:ring-primaryColor"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 max-h-[calc(85vh-180px)] overflow-y-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <RecipiSkeleton key={i} variant="grid" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-8">
              <p className="text-red-500">{t.meal_planner.error_loading_templates}</p>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{t.meal_planner.no_templates_found}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* generatedMealPlans templates first */}
                {searchQuery.trim() === '' &&
                  formattedGeneratedMealPlans?.length > 0 &&
                  formattedGeneratedMealPlans?.map((plan: any) => (
                    <Card
                      className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                      onClick={hanldeImportGenereatedMealPlan}
                    >
                      {plan.image && (
                        <div className="w-full h-40 bg-gray-100">
                          <img
                            src={plan.image}
                            alt={language === 'ar' ? plan.name.ar : plan.name.en}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {language === 'ar' ? plan.name.ar : plan.name.en}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {language === 'ar' ? plan.description.ar : plan.description.en}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>
                              {plan.duration || 7} {t.meal_planner.days}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {templates?.map((template: any) => (
                  <Card
                    key={template._id}
                    className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {(template.mealPlans?.[0]?.meals?.[0]?.recipe?.thumbnail?.url ||
                      template.mealPlans?.[0]?.meals?.[0]?.processedFood?.image ||
                      template.mealPlans?.[0]?.meals?.[0]?.ingredient?.image) && (
                      <div className="w-full h-40 bg-gray-100">
                        <img
                          src={
                            template.mealPlans?.[0]?.meals?.[0]?.recipe?.thumbnail?.url ||
                            template.mealPlans?.[0]?.meals?.[0]?.processedFood?.image ||
                            template.mealPlans?.[0]?.meals?.[0]?.ingredient?.image
                          }
                          alt={language === 'ar' ? template.name?.ar : template.name?.en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {language === 'ar' ? template.name?.ar : template.name?.en}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {language === 'ar'
                              ? template.description?.ar
                              : template.description?.en}
                          </p>
                        </div>
                        {template.goal && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-primaryColor/10 text-primaryColor px-2 py-1 rounded">
                              {language === 'ar' ? template.goal.name?.ar : template.goal.name?.en}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
                            {template.mealPlans?.length || 7} {t.meal_planner.days}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {hasMore && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={isFetching}
                    className="border-primaryColor text-primaryColor hover:bg-primaryColor/10"
                  >
                    {isFetching
                      ? language === 'ar'
                        ? 'جاري التحميل...'
                        : 'Loading...'
                      : t.meal_planner.load_more}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ImportModeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  importMode: (mode: 'replace' | 'skip' | 'merge') => void;
}

export const ImportModeModal = ({ isOpen, onOpenChange, importMode }: ImportModeModalProps) => {
  const { t, language } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t.meal_planner.import_mode_title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <p className="text-sm text-gray-600 mb-4">{t.meal_planner.import_mode_desc}</p>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primaryColor"
            onClick={() => importMode('replace')}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 text-xl">🔄</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {t.meal_planner.replace_completely}
                  </h4>
                  <p className="text-sm text-gray-600">{t.meal_planner.replace_completely_desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primaryColor"
            onClick={() => importMode('skip')}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 text-xl">⏭️</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {t.meal_planner.skip_duplicates}
                  </h4>
                  <p className="text-sm text-gray-600">{t.meal_planner.skip_duplicates_desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primaryColor"
            onClick={() => importMode('merge')}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xl">➕</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {t.meal_planner.merge_existing}
                  </h4>
                  <p className="text-sm text-gray-600">{t.meal_planner.merge_existing_desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface StartDaySelectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectedDateChange: (day: Date) => void;
  selectedDate: Date | null;
}

export const StartDaySelectionModal = ({
  isOpen,
  onOpenChange,
  onSelectedDateChange,
  selectedDate,
}: StartDaySelectionModalProps) => {
  const { t, language } = useLanguage();

  const handleDateChange = (day: Date | undefined) => {
    console.log('handleDateChange called with day:', day);
    if (day) {
      onSelectedDateChange(day);
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="py-5 bg-[#F7F7F7] shadow-cart lg:max-w-[30%] w-full p-4 rounded-lg relative lg:top-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pt-4 lg:px-9">
          <h2 className="text-[#6AB240] font-bold text-[14px] lg:!text-[18px]">
            {t.meal_planner.select_start_day_title}
          </h2>
          <button className="font-medium text-[#6AB240]" onClick={() => onOpenChange(false)}>
            {t.common.cancel}
          </button>
        </div>

        <div className="space-y-4 mt-4">
          <DayPicker
            mode="single"
            dir={language == 'ar' ? 'rtl' : 'ltr'}
            selected={selectedDate || undefined}
            onSelect={(day: Date | undefined) => handleDateChange(day)}
            classNames={{
              weekdays: 'text-[#6AB240] ',
              selected: 'bg-[#5B9F34] text-white rounded-full',
              today: 'bg-[#5B9F34] text-white  rounded-full',
            }}
          />
        </div>
      </div>
    </div>
  );
};
