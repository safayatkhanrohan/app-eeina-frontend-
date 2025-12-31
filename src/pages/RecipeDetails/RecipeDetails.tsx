/**
 * RecipeDetails Page Component
 *
 * Main recipe details page displaying comprehensive recipe information
 *
 * Features:
 * - Image/video gallery with navigation
 * - Recipe metadata (author, category, stats)
 * - Nutritional information
 * - Ingredients list with serving calculator
 * - Step-by-step cooking instructions
 * - Ratings and reviews with infinite scroll
 * - Save/bookmark, share, print, edit functionality
 * - Add ingredients to shopping list
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

// Context & Hooks
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '@/hooks/hook';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useSave } from '../../hooks/useSave';
import { useAddToList } from '@/hooks/useAddToList';

// Analytics
import { analytics } from '@/utils/analytics';

// API
import { useGetSinglePublicRecipeQuery } from '@/redux/Features/Recipe/RecipeApi';
import {
  useCreateRecipeRateMutation,
  useDeletRecipeRateMutation,
  useGetRecipeRateQuery,
  useUpdateRecipeRateMutation,
} from '../../redux/Features/RecipeRate/RecipeRateApi';

// Components
import { ShareModal } from '../../components/ShareModal';
import { AllNutrientsModal } from '../../components/Shared/AllNutrientsModal';
import PrintModal from '../../components/Recipe/PrintModal/PrintModal';
import RecipeNotFound from './RecipeNotFound';
import {
  RecipeImageGallery,
  RecipeHeader,
  RecipeStats,
  NutritionSection,
  IngredientsList,
  CookingInstructions,
  RecipeRatings,
} from './components';

// Utils & Types
import { Recipe } from '../../types/recipeDetails.type';
import {
  getVideoId,
  processRecipeMedia,
  calculateIngredients,
  processCookingSteps,
  processNutritionData,
} from './utils/recipeHelpers';
import { RecipeDetailsSkeleton } from './components/RecipeDetailsSkeleton';
import AddToMealPlanModal from './components/AddToMealPlanModal';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { openPremiumModal } from '@/redux/Features/Global/globalSlice';
import { trackIfAllowed } from '@/utils/analyticsHelper';

export const formatDateKey = (date: Date) => {
  return date.toLocaleDateString('en-CA'); // yyyy-mm-dd
};

export const RecipeDetails = () => {
  // ==================== HOOKS & STATE ====================
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isPremimumUser = useAppSelector((state) => state.auth.user?.accountType === 'premium');
  const dispatch = useAppDispatch();
  const { t, isRTL, language } = useLanguage();
  const currentUser = useAppSelector((state) => state.auth.user);
  const userId = currentUser?._id;

  // UI State
  const [open, setOpen] = useState(false); // Share modal
  const [openPrintModal, setOpenPrintModal] = useState(false); // Print modal
  const [showAllNutrients, setShowAllNutrients] = useState(false); // All nutrients modal
  const [servings, setServings] = useState<number>(2); // Servings adjuster - will be updated by useEffect

  // Add to meal plan modal state
  const [isAddToMealPlanOpen, setIsAddToMealPlanOpen] = useState(false);

  // API Mutations
  const [createRecipeRate] = useCreateRecipeRateMutation();
  const [updateRecipeRate] = useUpdateRecipeRateMutation();
  const [deleteRecipeRate] = useDeletRecipeRateMutation();

  // Custom Hooks
  const { handleAddToList } = useAddToList();

  // ==================== DATA FETCHING ====================
  const { data: res, isLoading } = useGetSinglePublicRecipeQuery(slug || '');
  const recipe: Recipe | undefined = res?.data;

  // Save functionality
  const { Save, handleToggleSave } = useSave(recipe ?? null, userId);

  // Track recipe view
  useEffect(() => {
    if (recipe?._id) {
      trackIfAllowed(() =>
      analytics.trackRecipeView(
        recipe._id,
        slug,
        recipe.title?.[language as 'en' | 'ar'] || recipe.title?.en,
      ));
    }
  }, [recipe?._id, slug, language]);

  // Update servings when recipe data loads
  useEffect(() => {
    if (recipe?.servings) {
      setServings(recipe.servings);
    }
  }, [recipe?.servings]);

  // Ratings with infinite scroll
  const {
    allData: recipe_Rates,
    isFetching,
    lastElementRef,
    hasMore,
  } = useInfiniteScroll(useGetRecipeRateQuery, { recipeId: recipe?._id || '' }, 4);

  const myRating = recipe_Rates.find((r) => r.user._id === userId);

  // ==================== COMPUTED DATA ====================

  /**
   * Unit translation map for nutrition values
   */
  const unitMap: Record<string, string> = {
    kcal: t.recipe.unit_kcal,
    g: t.recipe.unit_g,
    mg: t.recipe.unit_mg,
    IU: t.recipe.unit_IU,
  };

  /**
   * Process recipe media (images and videos)
   */
  const recipeImages = useMemo(() => processRecipeMedia(recipe!), [recipe]);

  /**
   * Calculate ingredients based on current servings
   */
  const ingredients = useMemo(
    () => calculateIngredients(recipe!, servings, language),
    [recipe, servings, language],
  );

  console.log('Processed Ingredients:', ingredients);

  /**
   * Process cooking instructions with language
   */
  const cookingSteps = useMemo(() => processCookingSteps(recipe!, language), [recipe, language]);

  /**
   * Process and format nutrition data
   */
  const nutritionData = useMemo(() => processNutritionData(recipe!, t), [recipe, t]);

  // ==================== EVENT HANDLERS ====================

  /**
   * Handle rating submission (create or update)
   */
  const handleSubmitRating = async (rating: number, comment: string) => {
    try {
      if (myRating) {
        const result = await updateRecipeRate({
          id: myRating._id,
          rating,
          comment,
        }).unwrap();
        toast.success(result.message);
      } else {
        const result = await createRecipeRate({
          recipeId: recipe?._id,
          rating,
          comment,
        }).unwrap();
        toast.success(result.message);
      }
      // Track rating event
      if (recipe?._id) {
         trackIfAllowed(() =>analytics.trackRecipeRate(recipe._id, rating));
      }
    } catch (err: any) {
      toast.error(err?.data.message || t.recipe.something_wrong);
      if (err.status === 401) {
        navigate(getLocalizedPath('/login', language));
      }
      console.error('Rating error:', err?.data.message);
    }
  };

  /**
   * Handle rating deletion
   */
  const handleDeleteRating = async (rateId: string) => {
    if (!rateId) return;

    try {
      const result = await deleteRecipeRate(rateId).unwrap();
      toast.success(result.message);
    } catch (err: any) {
      toast.error(err?.data.message || t.recipe.something_wrong);
      if (err.status === 401) {
        navigate(getLocalizedPath('/login', language));
      }
      console.error('Rating error:', err?.data.message);
    }
  };

  /**
   * Add all recipe ingredients to shopping list
   */
  const handleAddIngredients = async () => {
    if (!recipe) return;

    handleAddToList({
      itemType: 'Ingredient',
      items: recipe.ingredients.map((ing) => ({
        item: ing.ingredient._id,
        quantity: ing.quantity === 0 ? undefined : ing.quantity,
        unit: ing?.unit,
      })),
      recipeId: recipe._id,
      language,
    });
  };

  const handleViewAllNutrients = () => {
    if (!isPremimumUser) {
      dispatch(openPremiumModal());
      return;
    }
    setShowAllNutrients(true);
  };

  /**
   * Navigate to recipe edit page
   */
  const handleEditRecipe = () => {
    if (!recipe?._id) return;
    navigate(getLocalizedPath(`/edit-recipe/${recipe._id}`, language));
  };

  const handleAddtoMealPlanClick = () => {
    if (!isPremimumUser) {
      dispatch(openPremiumModal());
      return;
    }
    setIsAddToMealPlanOpen(true);
  };

  // ==================== LOADING STATE ====================
  if (isLoading) {
    return <RecipeDetailsSkeleton />;
  }

  // ==================== NOT FOUND STATE ====================
  if (!recipe && !isLoading) {
    return <RecipeNotFound />;
  }
  {
    /* Ratings & Reviews Section */
  }
  const reviewSection = (
    <RecipeRatings
      recipe={recipe}
      recipeRates={recipe_Rates}
      currentUserId={userId}
      myRating={myRating}
      isLoading={isLoading}
      isFetching={isFetching}
      hasMore={hasMore}
      lastElementRef={lastElementRef}
      onSubmitRating={handleSubmitRating}
      onDeleteRating={handleDeleteRating}
      language={language}
      isRTL={isRTL}
      t={t}
    />
  );
  // ==================== MAIN RENDER ====================
  return (
    <div className="min-h-screen">
      {/* TikTok Embed Styles */}
      <style>
        {`
        .tiktok-embed-container iframe {
        position: relative;
        }
        .tiktok-embed-container iframe::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        }
        .tiktok-embed-container div,
        .tiktok-embed-container button:not(.play-button),
        .tiktok-embed-container a:not(.video-link) {
        display: none !important;
        }
      `}
      </style>

      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-3 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 sm:mb-2 mt-5 sm:mt-0">
          {/* ==================== LEFT COLUMN ==================== */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-1">
            {/* Image/Video Gallery */}
            <RecipeImageGallery
              recipeImages={recipeImages}
              recipeName={recipe?.title[language as 'en' | 'ar'] || ''}
              getVideoId={getVideoId}
            />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-2">
            {/* Recipe Header & Main Info */}
            <div className="order-2 lg:order-1 md:mt-[5rem] lg:!mt-0">
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Header with title, author, and action buttons */}
                <RecipeHeader
                  recipe={recipe!}
                  language={language}
                  t={t}
                  onShare={() => {
                    setOpen(true);
                    if (recipe?._id) trackIfAllowed(() => analytics.trackRecipeShare(recipe._id, 'modal_open'));
                  }}
                  onEdit={handleEditRecipe}
                  onToggleSave={handleToggleSave}
                  onPrint={() => {
                    setOpenPrintModal(true);
                    if (recipe?._id)  trackIfAllowed(() =>analytics.trackRecipePrint(recipe._id));
                  }}
                  onAddToPlan={handleAddtoMealPlanClick}
                  isSaved={!!Save?.[recipe!._id]}
                />

                {/* Recipe Stats Cards */}
                <RecipeStats
                  time={recipe?.time ?? 0}
                  cuisine={
                    recipe?.cuisine?.[0]?.name?.[language as 'en' | 'ar'] || t.recipe.unknown
                  }
                  servings={recipe?.servings ?? 1}
                  difficulty={recipe?.difficulty ?? 'beginner'}
                  language={language}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 sm:mb-2 mt-5 sm:mt-0">
          {/* ==================== RIGHT COLUMN ==================== */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-1">
            {/* Cooking Instructions */}
            <div className="order-3 lg:order-2 md:mt-[8rem] lg:!mt-[7rem] 2xl:!mt-[15rem]">
              {/* Recipe Description */}
              {recipe?.description && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-primaryColor mb-2">
                    {t.recipe.about_recipe}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {recipe.description[language as 'en' | 'ar'] || recipe.description.en}
                  </p>
                </div>
              )}

              <CookingInstructions cookingSteps={cookingSteps} language={language} t={t} />

              {/* Ratings & Reviews Section */}
              <div className="hidden lg:block">{reviewSection}</div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-2">
            {/* Recipe Header & Main Info */}
            <div className="order-2 lg:order-1">
              <div className=" max-w-4xl mx-auto space-y-5 flex flex-col-reverse lg:flex-col ">
                {/* Ratings & Reviews Section */}

                <div className="block lg:hidden mt-4">{reviewSection}</div>
                {/* Nutrition Section - Shows top 10 nutrients with "View All" button */}
                {nutritionData && (
                  <NutritionSection
                    nutritionData={nutritionData}
                    unitMap={unitMap}
                    language={language}
                    glycemicIndex={recipe?.glycemicIndex}
                    glycemicLoad={recipe?.glycemicLoad}
                    t={t}
                    onViewAllNutrients={handleViewAllNutrients}
                  />
                )}

                {/* Ingredients List */}
                <IngredientsList
                  ingredients={ingredients}
                  servings={servings}
                  onServingsChange={setServings}
                  onAddToList={handleAddIngredients}
                  language={language}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MODALS ==================== */}
      <ShareModal
        open={open}
        onOpenChange={setOpen}
        shareUrl={window.location.href}
        title={t.recipe.share_recipe}
      />

      <PrintModal open={openPrintModal} onClose={() => setOpenPrintModal(false)} recipe={recipe} />

      <AllNutrientsModal
        showAllNutrients={showAllNutrients}
        setShowAllNutrients={setShowAllNutrients}
        data={recipe!}
        servingDetails={t.recipe.per_serving}
      />

      {/* Add to Meal Plan Modal */}
      {recipe && (
        <AddToMealPlanModal
          open={isAddToMealPlanOpen}
          onOpenChange={setIsAddToMealPlanOpen}
          itemId={recipe._id}
          itemType="recipe"
          servingSize={servings}
          servingUnit="serving"
        />
      )}
    </div>
  );
};
