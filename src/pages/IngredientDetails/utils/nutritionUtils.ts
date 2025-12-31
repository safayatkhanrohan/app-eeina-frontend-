export const getNutritionBgColor = (percentage: number) => {
  if (percentage <= 5) return 'bg-green-100';
  if (percentage <= 20) return 'bg-yellow-100';
  return 'bg-red-100';
};

// Helper function to get nutrition text color
export const getNutritionColor = (percentage: number) => {
  if (percentage <= 5) return 'text-green-800';
  if (percentage <= 20) return 'text-yellow-800';
  return 'text-red-800';
};

// Helper function to categorize nutrients
export const categorizeNutrients = (nutritionData: any) => {
  if (!nutritionData) return {};

  const categories: any = {
    macronutrients: {},
    vitamins: {},
    minerals: {},
    other: {},
  };

  // Common nutrient categorization
  const nutrientCategories: { [key: string]: string } = {
    // Macronutrients
    calories: 'macronutrients',
    protein: 'macronutrients',
    carbohydrates: 'macronutrients',
    carbs: 'macronutrients',
    totalFat: 'macronutrients',
    fat: 'macronutrients',
    fiber: 'macronutrients',
    sugars: 'macronutrients',

    // Vitamins
    vitaminA: 'vitamins',
    vitaminC: 'vitamins',
    vitaminD: 'vitamins',
    vitaminE: 'vitamins',
    vitaminK: 'vitamins',
    thiamin: 'vitamins',
    riboflavin: 'vitamins',
    niacin: 'vitamins',
    vitaminB6: 'vitamins',
    folate: 'vitamins',
    vitaminB12: 'vitamins',

    // Minerals
    calcium: 'minerals',
    iron: 'minerals',
    magnesium: 'minerals',
    phosphorus: 'minerals',
    potassium: 'minerals',
    sodium: 'minerals',
    zinc: 'minerals',
    copper: 'minerals',
    manganese: 'minerals',
    selenium: 'minerals',

    // Other
    water: 'other',
    ash: 'other',
    caffeine: 'other',
    alcohol: 'other',
    cholesterol: 'other',
    saturatedFat: 'other',
    transFat: 'other',
  };

  Object.entries(nutritionData).forEach(([key, value]: [string, any]) => {
    const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
    let category = 'other';

    // Find category for this nutrient
    for (const [pattern, cat] of Object.entries(nutrientCategories)) {
      if (normalizedKey.includes(pattern.toLowerCase())) {
        category = cat;
        break;
      }
    }

    categories[category][key] = value;
  });

  return categories;
};

// Helper function to get display name for nutrients
export const getNutrientDisplayName = (key: string): string => {
  const displayNames: { [key: string]: string } = {
    calories: 'Calories',
    protein: 'Protein',
    carbohydrates: 'Carbohydrates',
    carbs: 'Carbohydrates',
    totalFat: 'Total Fat',
    fat: 'Total Fat',
    fiber: 'Dietary Fiber',
    sugars: 'Sugars',
    vitaminA: 'Vitamin A',
    vitaminC: 'Vitamin C',
    vitaminD: 'Vitamin D',
    vitaminE: 'Vitamin E',
    vitaminK: 'Vitamin K',
    thiamin: 'Thiamin (B1)',
    riboflavin: 'Riboflavin (B2)',
    niacin: 'Niacin (B3)',
    vitaminB6: 'Vitamin B6',
    folate: 'Folate',
    vitaminB12: 'Vitamin B12',
    calcium: 'Calcium',
    iron: 'Iron',
    magnesium: 'Magnesium',
    phosphorus: 'Phosphorus',
    potassium: 'Potassium',
    sodium: 'Sodium',
    zinc: 'Zinc',
    copper: 'Copper',
    manganese: 'Manganese',
    selenium: 'Selenium',
    water: 'Water',
    ash: 'Ash',
    caffeine: 'Caffeine',
    alcohol: 'Alcohol',
    cholesterol: 'Cholesterol',
    saturatedFat: 'Saturated Fat',
    transFat: 'Trans Fat',
  };

  return (
    displayNames[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
  );
};
