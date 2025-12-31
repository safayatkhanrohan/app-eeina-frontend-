import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNutritionKey = (key: string,t:any) => {
  const formatMap: { [key: string]: string } = {
    calories: t.recipe.calories,
    protein: t.recipe.protein,
    fat: t.recipe.fat,
    saturatedFat: t.recipe.saturatedFat,
    carbs: t.recipe.carbs,
    sugar: t.recipe.sugar,
    fiber: t.recipe.fiber,
    cholesterol: t.recipe.cholesterol,
    calcium: t.recipe.calcium,
    potassium: t.recipe.potassium,
    iron: t.recipe.iron,
    zinc: t.recipe.zinc,
    phosphorus: t.recipe.phosphorus,
    vitaminA: t.recipe.vitaminA,
    vitaminC: t.recipe.vitaminC,
  };

  return formatMap[key] || key.replace(/([A-Z])/g, ' $1').trim();
};
