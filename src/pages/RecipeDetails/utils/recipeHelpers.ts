import { Image, Instruction, NutritionValue, Recipe } from '@/types/recipeDetails.type';

/**
 * Recipe Details Helper Functions
 *
 * Utility functions for processing recipe data
 */

/**
 * Extract video ID and platform from URL
 * Supports YouTube and TikTok URLs
 *
 * @param url - Video URL
 * @returns Object with platform and ID, or null if not found
 */
export const getVideoId = (url: string): { platform: string; id: string } | null => {
  // YouTube URL regex
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return { platform: 'youtube', id: youtubeMatch[1] };
  }

  // TikTok URL regex
  const tiktokRegex = /(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com\/(?:@[\w.-]+\/video\/|v\/))(\d+)/;
  const tiktokMatch = url.match(tiktokRegex);
  if (tiktokMatch) {
    return { platform: 'tiktok', id: tiktokMatch[1] };
  }

  return null;
};

/**
 * Process recipe images and videos into a unified array
 *
 * @param recipe - Recipe object
 * @returns Array of media items (videos and images)
 */
export const processRecipeMedia = (recipe: Recipe) => {
  if (!recipe) return [];

  const videoInfo = recipe.videoUrl ? getVideoId(recipe.videoUrl) : null;

  return [
    // Add video if exists
    ...(videoInfo
      ? [
          {
            type: 'video' as const,
            platform: videoInfo.platform as 'youtube' | 'tiktok',
            url:
              videoInfo.platform === 'youtube'
                ? `https://www.youtube.com/embed/${videoInfo.id}?showinfo=0&modestbranding=1&rel=0`
                : `https://www.tiktok.com/embed/v2/${videoInfo.id}?autoplay=0`,
          },
        ]
      : []),
    // Add thumbnail
    { type: 'image' as const, url: recipe.thumbnail?.url },
    // Add other images
    ...(recipe.otherImages?.map((img: Image) => ({ type: 'image' as const, url: img?.url })) || []),
  ];
};

/**
 * Calculate scaled ingredient quantities based on servings
 *
 * @param recipe - Recipe object
 * @param servings - Desired number of servings
 * @param language - Current language (en/ar)
 * @returns Array of ingredients with adjusted quantities
 */
export const calculateIngredients = (recipe: Recipe, servings: number, language: string) => {
  if (!recipe) return [];

  const baseServings = Number(recipe.servings) || 1;
  const fallbackLanguage = language === 'en' ? 'ar' : 'en';

  return recipe.ingredients.map((ing, index) => {
    const originalQuantity = Number(ing.quantity) ?? 0;
    let newQuantity = (originalQuantity / baseServings) * servings;
    newQuantity = Number.isInteger(newQuantity) ? newQuantity : +newQuantity.toFixed(2);

    return {
      id: index + 1,
      ingredient: ing.ingredient ?? '',
      quantity: parseFloat(newQuantity.toFixed(2)),
      rawIngr:
        ing.rawIngr?.[language as 'en' | 'ar'] ||
        ing.rawIngr?.[fallbackLanguage as 'en' | 'ar'] ||
        '',
      unit:
        ing.unit?.[language as 'en' | 'ar'] || ing.unit?.[fallbackLanguage as 'en' | 'ar'] || '',
      item:
        (ing.ingredient?.name?.[language as 'en' | 'ar'] ||
          ing.ingredient?.name?.[fallbackLanguage as 'en' | 'ar'] ||
          ing.ingredient?.slug?.en) ??
        '',
    };
  });
};

/**
 * Process cooking instructions into step objects
 *
 * @param recipe - Recipe object
 * @param language - Current language (en/ar)
 * @returns Array of cooking step objects
 */
export const processCookingSteps = (recipe: Recipe, language: string) => {
  if (!recipe) return [];

  const fallbackLanguage = language === 'en' ? 'ar' : 'en';

  return recipe.instructions.map((item: Instruction, index: number) => ({
    id: index + 1,
    description:
      item.step[language as 'en' | 'ar'] || item.step[fallbackLanguage as 'en' | 'ar'] || '',
    img: item?.image?.url,
  }));
};

/**
 * Scale nutrition value based on servings
 *
 * @param nutritionValue - Nutrition value object
 * @returns Scaled nutrition value
 */
const scaledNutrition = (nutritionValue: NutritionValue) => {
  return {
    amount: parseFloat(nutritionValue?.amount?.toFixed(2)),
    unit: nutritionValue?.unit,
  };
};

/**
 * Process all nutrition data for display
 *
 * @param recipe - Recipe object
 * @param t - Translation function
 * @returns Array of nutrition items with labels and values
 */
export const processNutritionData = (recipe: Recipe, t: any) => {
  if (!recipe) return [];

  if (!recipe.nutrition) return null;

  return [
    { label: `${t.recipe.calories}`, value: scaledNutrition(recipe?.nutrition?.calories) },
    { label: `${t.recipe.protein}`, value: scaledNutrition(recipe?.nutrition?.protein) },
    { label: `${t.recipe.fat}`, value: scaledNutrition(recipe?.nutrition?.fat) },
    { label: `${t.recipe.carbs}`, value: scaledNutrition(recipe?.nutrition?.carbs) },
    { label: `${t.recipe.sugar}`, value: scaledNutrition(recipe?.nutrition?.sugar) },
    { label: `${t.recipe.fiber}`, value: scaledNutrition(recipe?.nutrition?.fiber) },
    { label: `${t.recipe.calcium}`, value: scaledNutrition(recipe?.nutrition?.calcium) },
    { label: `${t.recipe.cholesterol}`, value: scaledNutrition(recipe?.nutrition?.cholesterol) },
    { label: `${t.recipe.iron}`, value: scaledNutrition(recipe?.nutrition.iron) },
    { label: `${t.recipe.phosphorus}`, value: scaledNutrition(recipe.nutrition.phosphorus) },
    { label: `${t.recipe.potassium}`, value: scaledNutrition(recipe.nutrition.potassium) },
    { label: `${t.recipe.saturatedFat}`, value: scaledNutrition(recipe.nutrition.saturatedFat) },
    { label: `${t.recipe.vitaminA}`, value: scaledNutrition(recipe.nutrition.vitaminA) },
    { label: `${t.recipe.vitaminC}`, value: scaledNutrition(recipe.nutrition.vitaminC) },
    { label: `${t.recipe.zinc}`, value: scaledNutrition(recipe.nutrition.zinc) },
  ];
};
