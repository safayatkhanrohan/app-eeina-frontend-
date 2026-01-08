import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { CalendarDays, Check, Loader2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGetMealPlansQuery, useGetUserMealsQuery } from '@/redux/Features/MealPlan/mealPlanApi';
import { useLazyGetSinglePublicRecipeQuery } from '@/redux/Features/Recipe/RecipeApi';
import { formatMealPlans, formatDateKey, getWeekDates } from '../../MealPlanner/helper';
import { Badge } from '@/components/ui/badge';
import { useAddToList } from '@/hooks/useAddToList';
import { toast } from 'sonner';

interface ImportFromMealPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ImportFromMealPlanModal = ({ isOpen, onClose }: ImportFromMealPlanModalProps) => {
    const { t, language } = useLanguage();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

    // Preview states
    const [expandedMeals, setExpandedMeals] = useState<string[]>([]);
    const [previewIngredients, setPreviewIngredients] = useState<Record<string, any[]>>({});
    const [loadingIngredients, setLoadingIngredients] = useState<Record<string, boolean>>({});

    const { handleAddToList } = useAddToList();
    const [isImporting, setIsImporting] = useState(false);
    const [getRecipeDetails] = useLazyGetSinglePublicRecipeQuery();

    // Calculate week dates
    const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);
    const startDate = formatDateKey(weekDates[0]);
    const endDate = formatDateKey(weekDates[6]);

    // Queries
    const { data: mealPlanData, isLoading: isMealsLoading } = useGetMealPlansQuery({ startDate, endDate });
    const { data: mealTypeData, isLoading: isTypesLoading } = useGetUserMealsQuery({ startDate, endDate });

    // Format data
    const formattedPlans = useMemo(() => {
        if (!mealPlanData?.data || !mealTypeData?.data) return {};
        return formatMealPlans(
            mealPlanData.data,
            mealTypeData.data,
            weekDates,
            language === 'ar' ? 'ar' : 'en'
        );
    }, [mealPlanData, mealTypeData, weekDates, language]);

    const isLoading = isMealsLoading || isTypesLoading;
    const dayNames = language === 'ar'
        ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Collect all available meals for "Select All" logic
    const allMealIds = useMemo(() => {
        const ids: string[] = [];
        Object.values(formattedPlans).forEach(day => {
            Object.values(day).forEach((type: any) => {
                type.meals.forEach((meal: any) => {
                    // Allow selection of all recipes, we will fetch ingredients if missing
                    if (meal.itemType === 'recipe' || (meal.ingredients && meal.ingredients.length > 0)) {
                        ids.push(`${meal.id}-${meal.mealType}-${meal.slug}`);
                    }
                });
            });
        });
        return ids;
    }, [formattedPlans]);

    const fetchIngredientsIfNeeded = async (key: string, meal: any) => {
        // If cached, return it.
        if (previewIngredients[key]) return previewIngredients[key];
        // If not recipe and has ingredients, return them
        if (meal.itemType !== 'recipe' && meal.ingredients) return meal.ingredients;

        // If recipe and not cached, fetch
        if (meal.itemType === 'recipe') {
            setLoadingIngredients(prev => ({ ...prev, [key]: true }));
            try {
                // Use slug for fetching public recipe details which should contain populated ingredients
                const identifier = meal.slug;
                if (!identifier) {
                    console.warn("No slug found for meal", meal);
                    return [];
                }
                const { data } = await getRecipeDetails(identifier).unwrap();
                const recipeData = data?.data || data;
                const ingredients = recipeData?.ingredients || [];
                setPreviewIngredients(prev => ({ ...prev, [key]: ingredients }));
                return ingredients;
            } catch (error) {
                console.error("Failed to fetch ingredients", error);
                return [];
            } finally {
                setLoadingIngredients(prev => ({ ...prev, [key]: false }));
            }
        }
        return [];
    };

    const handleToggleMeal = async (mealKey: string, meal: any) => {
        const willSelect = !selectedMeals.includes(mealKey);

        setSelectedMeals(prev =>
            prev.includes(mealKey)
                ? prev.filter(k => k !== mealKey)
                : [...prev, mealKey]
        );

        if (willSelect) {
            // Eagerly fetch ingredients
            await fetchIngredientsIfNeeded(mealKey, meal);
        }
    };

    const handleToggleExpand = async (mealKey: string, meal: any) => {
        const isCurrentlyExpanded = expandedMeals.includes(mealKey);

        // Toggle expansion
        setExpandedMeals(prev =>
            isCurrentlyExpanded ? prev.filter(k => k !== mealKey) : [...prev, mealKey]
        );

        // Calculate ingredients if expanding
        if (!isCurrentlyExpanded) {
            await fetchIngredientsIfNeeded(mealKey, meal);
        }
    };

    const handleSelectAll = () => {
        if (selectedMeals.length === allMealIds.length) {
            setSelectedMeals([]);
        } else {
            setSelectedMeals(allMealIds);
        }
    };

    const handleImport = async () => {
        if (selectedMeals.length === 0) return;

        setIsImporting(true);
        try {
            let totalIngredients = 0;
            const promises = [];

            // Find selected meal objects
            for (const dateKey in formattedPlans) {
                for (const typeKey in formattedPlans[dateKey]) {
                    const meals = formattedPlans[dateKey][typeKey].meals;
                    for (const meal of meals) {
                        const key = `${meal.id}-${meal.mealType}-${meal.slug}`;

                        if (selectedMeals.includes(key)) {
                            let itemsToAdd = [];

                            // Priority: Check cached ingredients first (from selection/preview)
                            const cached = previewIngredients[key];

                            if (meal.itemType === 'recipe') {
                                try {
                                    let fetchedIngredients = [];

                                    if (cached) {
                                        fetchedIngredients = cached;
                                    } else {
                                        // Fallback fetch if somehow not cached
                                        const identifier = meal.slug;
                                        if (identifier) {
                                            const { data } = await getRecipeDetails(identifier).unwrap();
                                            const recipeData = data?.data || data;
                                            fetchedIngredients = recipeData?.ingredients || [];
                                        }
                                    }

                                    itemsToAdd = fetchedIngredients.map((ing: any) => {
                                        // Pass unit directly as object, handled by useAddToList/backend
                                        const ingredientId = typeof ing.ingredient === 'object' && ing.ingredient?._id
                                            ? ing.ingredient._id
                                            : ing.ingredient;

                                        return {
                                            item: ingredientId,
                                            quantity: ing.quantity === 0 ? undefined : ing.quantity,
                                            unit: ing?.unit
                                        };
                                    }).filter((i: any) => i.item && typeof i.item === 'string' && /^[0-9a-fA-F]{24}$/.test(i.item));
                                } catch (err) {
                                    console.error(`Failed to fetch details for recipe ${meal.name}`, err);
                                }
                            }
                            // Fallback: Non-recipe items with ingredients already present
                            else if (meal.ingredients && meal.ingredients.length > 0) {
                                itemsToAdd = meal.ingredients.map((ing: any) => {
                                    return {
                                        item: ing.ingredient?._id,
                                        quantity: ing.quantity === 0 ? undefined : ing.quantity,
                                        unit: ing?.unit
                                    };
                                });
                            }

                            if (itemsToAdd.length > 0) {
                                totalIngredients += itemsToAdd.length;
                                promises.push(handleAddToList({
                                    itemType: 'Ingredient',
                                    items: itemsToAdd,
                                    recipeId: meal.itemType === 'recipe' ? meal.itemId || meal.id : undefined,
                                    language
                                }));
                            }
                        }
                    }
                }
            }

            await Promise.all(promises);
            toast.success(language === 'ar'
                ? `تم استيراد مواد من ${selectedMeals.length} وجبات`
                : `Imported ingredients from ${selectedMeals.length} meals`);
            onClose();
            setSelectedMeals([]);
        } catch (error) {
            console.error('Import failed', error);
            toast.error(t.common?.error_occurred || 'Failed to import');
        } finally {
            setIsImporting(false);
        }
    };

    const handlePrevWeek = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() - 7);
        setCurrentDate(d);
    };

    const handleNextWeek = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() + 7);
        setCurrentDate(d);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0 bg-gray-50/80">
                <DialogHeader className="p-6 bg-white border-b sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <CalendarDays className="w-5 h-5 text-primaryColor" />
                            </div>
                            <DialogTitle>
                                {language === 'ar' ? 'استيراد من مخطط الوجبات' : 'Import from Meal Plan'}
                            </DialogTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium">
                                {weekDates[0].toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' })}
                                -
                                {weekDates[6].toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' })}
                            </span>
                            <Button variant="ghost" size="icon" onClick={handleNextWeek}>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="h-64 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primaryColor" />
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {weekDates.map(date => {
                                const dateKey = formatDateKey(date);
                                const dayPlan = formattedPlans[dateKey] || {};
                                const hasMeals = Object.keys(dayPlan).some(k => dayPlan[k].meals.length > 0);

                                if (!hasMeals) return null;

                                return (
                                    <div key={dateKey} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primaryColor" />
                                            {dayNames[date.getDay()]}
                                            <span className="text-gray-400 font-normal text-sm">
                                                {date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long' })}
                                            </span>
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-4 border-l-2 border-gray-100">
                                            {Object.entries(dayPlan).map(([_, typeData]: any) => (
                                                typeData.meals.map((meal: any) => {
                                                    const mealKey = `${meal.id}-${meal.mealType}-${meal.slug}`;
                                                    const isSelected = selectedMeals.includes(mealKey);
                                                    const isExpanded = expandedMeals.includes(mealKey);
                                                    const hasIng = meal.ingredients && meal.ingredients.length > 0;

                                                    // Determine ingredients sources
                                                    const ingredientsToShow = previewIngredients[mealKey] || meal.ingredients || [];
                                                    const showIngredients = isExpanded;

                                                    return (
                                                        <div
                                                            key={mealKey}
                                                            className={`
                                                                group relative flex flex-col rounded-xl border transition-all
                                                                ${isSelected
                                                                    ? 'bg-green-50/50 border-primaryColor ring-1 ring-primaryColor'
                                                                    : 'bg-white border-gray-200 hover:border-green-200 hover:shadow-sm'
                                                                }
                                                            `}
                                                        >
                                                            <div className="flex items-start gap-3 p-3">
                                                                {/* Checkbox */}
                                                                <div
                                                                    onClick={() => handleToggleMeal(mealKey, meal)}
                                                                    className={`
                                                                        mt-1 rounded-md w-5 h-5 flex items-center justify-center border transition-colors cursor-pointer
                                                                        ${isSelected
                                                                            ? 'bg-primaryColor border-primaryColor text-white'
                                                                            : 'border-gray-300 bg-white group-hover:border-primaryColor'}
                                                                    `}>
                                                                    {isSelected && <Check className="w-3.5 h-3.5" />}
                                                                </div>

                                                                {/* Content */}
                                                                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleToggleMeal(mealKey, meal)}>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <Badge variant="secondary" className="text-[10px] px-1.5 h-5">
                                                                            {typeData.label}
                                                                        </Badge>
                                                                        {!hasIng && meal.itemType !== 'recipe' && (
                                                                            <span className="text-[10px] text-orange-500 font-medium">No Ingredients</span>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                                        {meal.name}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                                        {Math.round(meal.calories)} kcal • {meal.time}
                                                                    </p>
                                                                </div>

                                                                {/* Actions */}
                                                                <div className="flex flex-col gap-2 items-end">
                                                                    {/* Image */}
                                                                    {meal.image && (
                                                                        <img
                                                                            src={meal.image}
                                                                            alt={meal.name}
                                                                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                                                                        />
                                                                    )}
                                                                    {/* Expand Button */}
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-6 w-6 -mr-1 text-gray-400 hover:text-gray-600"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleToggleExpand(mealKey, meal);
                                                                        }}
                                                                    >
                                                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                                    </Button>
                                                                </div>
                                                            </div>

                                                            {/* Ingredients Preview */}
                                                            {showIngredients && (
                                                                <div className="px-3 pb-3 pt-0 animate-in slide-in-from-top-2">
                                                                    <div className="h-px bg-gray-100 mb-2" />
                                                                    <p className="text-xs font-medium text-gray-500 mb-2">
                                                                        {language === 'ar' ? 'المكونات:' : 'Ingredients:'}
                                                                    </p>
                                                                    {loadingIngredients[mealKey] ? (
                                                                        <div className="flex justify-center py-2">
                                                                            <Loader2 className="w-4 h-4 animate-spin text-primaryColor" />
                                                                        </div>
                                                                    ) : ingredientsToShow.length > 0 ? (
                                                                        <ul className="space-y-1">
                                                                            {ingredientsToShow.map((ing: any, idx: number) => {
                                                                                // Safe access to name - Prioritize rawIngr as it contains the full text
                                                                                let name = 'Unknown Item';

                                                                                // Try rawIngr (localized object or string)
                                                                                if (ing.rawIngr) {
                                                                                    if (typeof ing.rawIngr === 'object') {
                                                                                        name = ing.rawIngr[language === 'ar' ? 'ar' : 'en'] || ing.rawIngr.en || Object.values(ing.rawIngr)[0] as string;
                                                                                    } else {
                                                                                        name = ing.rawIngr;
                                                                                    }
                                                                                }
                                                                                // Fallback to ingredient name
                                                                                else if (ing.ingredient?.name) {
                                                                                    if (typeof ing.ingredient.name === 'object') {
                                                                                        name = ing.ingredient.name[language === 'ar' ? 'ar' : 'en'] || ing.ingredient.name.en;
                                                                                    } else {
                                                                                        name = ing.ingredient.name;
                                                                                    }
                                                                                }
                                                                                // Fallback to item ID or string
                                                                                else if (ing.item && typeof ing.item === 'string') {
                                                                                    name = ing.item;
                                                                                } // If it's an ID, we might still show Unknown Item if we can't resolve it, but rawIngr should cover almost all cases.

                                                                                // Unit normalization for display
                                                                                let unitVal = ing?.unit;
                                                                                if (typeof unitVal === 'object' && unitVal !== null) {
                                                                                    unitVal = unitVal[language === 'ar' ? 'ar' : 'en'] || unitVal.en || unitVal[Object.keys(unitVal)[0]];
                                                                                }

                                                                                return (
                                                                                    <li key={idx} className="text-xs text-gray-600 flex justify-between items-center">
                                                                                        <span className="truncate flex-1 max-w-[70%] text-left" title={name}>- {name}</span>
                                                                                        <span className="text-gray-400 font-mono ml-2">
                                                                                            {ing.quantity !== 0 && ing.quantity} {unitVal}
                                                                                        </span>
                                                                                    </li>
                                                                                );
                                                                            })}
                                                                        </ul>
                                                                    ) : (
                                                                        <p className="text-xs text-gray-400 italic text-center py-1">
                                                                            {language === 'ar' ? 'لا توجد مكونات' : 'No ingredients found'}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}

                            {allMealIds.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">
                                        {language === 'ar' ? 'لا توجد وجبات مخططة لهذا الأسبوع' : 'No meals planned for this week'}
                                    </p>
                                    <Button variant="link" onClick={onClose}>
                                        {language === 'ar' ? 'اذهب لمخطط الوجبات' : 'Go to Meal Planner'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter className="p-4 bg-white border-t mt-auto">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-sm text-gray-600">
                            {selectedMeals.length} {language === 'ar' ? 'وجبات محددة' : 'meals selected'}
                        </p>
                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={handleSelectAll}>
                                {selectedMeals.length === allMealIds.length
                                    ? (language === 'ar' ? 'إلغاء تحديد الكل' : 'Deselect All')
                                    : (language === 'ar' ? 'تحديد الكل' : 'Select All')}
                            </Button>
                            <Button
                                onClick={handleImport}
                                disabled={selectedMeals.length === 0 || isImporting}
                                className="bg-primaryColor hover:bg-green-600 text-white min-w-[120px]"
                            >
                                {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : (language === 'ar' ? 'استيراد' : 'Import')}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ImportFromMealPlanModal;
