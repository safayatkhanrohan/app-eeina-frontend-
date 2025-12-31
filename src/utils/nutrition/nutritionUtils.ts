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

// Comprehensive GI database
export const glycemicIndexDatabase: {
  [key: string]: { value: number; level: string; color: string };
} = {
  // Vegetables - Low GI
  broccoli: { value: 15, level: 'Low', color: 'green' },
  spinach: { value: 15, level: 'Low', color: 'green' },
  tomato: { value: 15, level: 'Low', color: 'green' },
  carrot: { value: 39, level: 'Low', color: 'green' },
  'bell pepper': { value: 15, level: 'Low', color: 'green' },
  onion: { value: 15, level: 'Low', color: 'green' },
  garlic: { value: 15, level: 'Low', color: 'green' },
  cucumber: { value: 15, level: 'Low', color: 'green' },
  lettuce: { value: 15, level: 'Low', color: 'green' },
  cauliflower: { value: 15, level: 'Low', color: 'green' },
  salsa: { value: 15, level: 'Low', color: 'green' },

  // Fruits - Varying GI
  apple: { value: 36, level: 'Low', color: 'green' },
  orange: { value: 40, level: 'Low', color: 'green' },
  banana: { value: 62, level: 'Medium', color: 'yellow' },
  mango: { value: 51, level: 'Low', color: 'green' },
  strawberry: { value: 40, level: 'Low', color: 'green' },
  grape: { value: 59, level: 'Medium', color: 'yellow' },
  watermelon: { value: 76, level: 'High', color: 'red' },

  // Grains & Cereals
  oats: { value: 55, level: 'Low', color: 'green' },
  'brown rice': { value: 50, level: 'Low', color: 'green' },
  'white rice': { value: 73, level: 'High', color: 'red' },
  'whole wheat bread': { value: 69, level: 'Medium', color: 'yellow' },
  'white bread': { value: 75, level: 'High', color: 'red' },
  pasta: { value: 49, level: 'Low', color: 'green' },
  quinoa: { value: 53, level: 'Low', color: 'green' },

  // Legumes - Very Low GI
  lentils: { value: 32, level: 'Low', color: 'green' },
  chickpeas: { value: 28, level: 'Low', color: 'green' },
  'black beans': { value: 30, level: 'Low', color: 'green' },
  'kidney beans': { value: 29, level: 'Low', color: 'green' },

  // Dairy
  milk: { value: 31, level: 'Low', color: 'green' },
  yogurt: { value: 33, level: 'Low', color: 'green' },
  cheese: { value: 0, level: 'Low', color: 'green' },

  // Meat & Protein - Typically 0 GI
  chicken: { value: 0, level: 'Low', color: 'green' },
  beef: { value: 0, level: 'Low', color: 'green' },
  fish: { value: 0, level: 'Low', color: 'green' },
  eggs: { value: 0, level: 'Low', color: 'green' },

  // Nuts & Seeds
  almonds: { value: 0, level: 'Low', color: 'green' },
  walnuts: { value: 15, level: 'Low', color: 'green' },
  peanuts: { value: 13, level: 'Low', color: 'green' },

  // Common Ingredients
  sugar: { value: 65, level: 'Medium', color: 'yellow' },
  honey: { value: 61, level: 'Medium', color: 'yellow' },
  potato: { value: 78, level: 'High', color: 'red' },
  'sweet potato': { value: 63, level: 'Medium', color: 'yellow' },
  corn: { value: 52, level: 'Low', color: 'green' },
};

// Smart GI lookup function
export const getGlycemicIndex = (
  ingredientName: string,
  category?: string,
): { value: number; level: string; color: string } => {
  if (!ingredientName) {
    return { value: 50, level: 'Unknown', color: 'gray' };
  }

  const normalizedName = ingredientName.toLowerCase().trim();

  // Exact match
  if (glycemicIndexDatabase[normalizedName]) {
    return glycemicIndexDatabase[normalizedName];
  }

  // Partial match
  for (const [key, value] of Object.entries(glycemicIndexDatabase)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }

  // Category-based fallback
  if (category) {
    const normalizedCategory = category.toLowerCase();
    if (
      normalizedCategory.includes('vegetable') ||
      normalizedCategory.includes('leaf') ||
      normalizedCategory.includes('green')
    ) {
      return { value: 20, level: 'Low', color: 'green' };
    }
    if (normalizedCategory.includes('fruit')) {
      return { value: 45, level: 'Low', color: 'green' };
    }
    if (
      normalizedCategory.includes('grain') ||
      normalizedCategory.includes('cereal') ||
      normalizedCategory.includes('bread')
    ) {
      return { value: 65, level: 'Medium', color: 'yellow' };
    }
    if (
      normalizedCategory.includes('meat') ||
      normalizedCategory.includes('protein') ||
      normalizedCategory.includes('fish') ||
      normalizedCategory.includes('chicken')
    ) {
      return { value: 0, level: 'Low', color: 'green' };
    }
    if (
      normalizedCategory.includes('dairy') ||
      normalizedCategory.includes('milk') ||
      normalizedCategory.includes('cheese')
    ) {
      return { value: 30, level: 'Low', color: 'green' };
    }
    if (normalizedCategory.includes('nut') || normalizedCategory.includes('seed')) {
      return { value: 15, level: 'Low', color: 'green' };
    }
    if (
      normalizedCategory.includes('sweet') ||
      normalizedCategory.includes('sugar') ||
      normalizedCategory.includes('dessert')
    ) {
      return { value: 70, level: 'High', color: 'red' };
    }
  }

  // Default fallback
  return { value: 45, level: 'Low', color: 'green' };
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
    netcarbs: 'macronutrients',
    totalFat: 'macronutrients',
    fat: 'macronutrients',
    saturatedfat: 'macronutrients',
    monounsaturatedfat: 'macronutrients',
    polyunsaturatedfat: 'macronutrients',
    transfat: 'macronutrients',
    fiber: 'macronutrients',
    sugar: 'macronutrients',
    sugars: 'macronutrients',
    addedsugar: 'macronutrients',
    sugaralcohol: 'macronutrients',

    // Vitamins (Fat-Soluble)
    vitamina: 'vitamins',
    vitamind: 'vitamins',
    vitamine: 'vitamins',
    vitamink: 'vitamins',

    // Vitamins (Water-Soluble)
    vitaminc: 'vitamins',
    vitaminb1: 'vitamins',
    vitaminb2: 'vitamins',
    vitaminb3: 'vitamins',
    vitaminb6: 'vitamins',
    vitaminb12: 'vitamins',
    thiamin: 'vitamins',
    riboflavin: 'vitamins',
    niacin: 'vitamins',

    // Folate
    folate: 'vitamins',
    folatedfe: 'vitamins',
    folatefood: 'vitamins',
    folicacid: 'vitamins',

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
    cholesterol: 'other',
    water: 'other',
    ash: 'other',
    caffeine: 'other',
    alcohol: 'other',
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
export const getNutrientDisplayName = (key: string, language: string = 'en'): string => {
  const displayNames: { [key: string]: { en: string; ar: string } } = {
    // Energy & Macronutrients
    calories: { en: 'Calories', ar: 'السعرات الحرارية' },
    protein: { en: 'Protein', ar: 'البروتين' },

    // Fats
    fat: { en: 'Total Fat', ar: 'إجمالي الدهون' },
    totalFat: { en: 'Total Fat', ar: 'إجمالي الدهون' },
    saturatedFat: { en: 'Saturated Fat', ar: 'الدهون المشبعة' },
    monounsaturatedFat: { en: 'Monounsaturated Fat', ar: 'الدهون الأحادية غير المشبعة' },
    polyunsaturatedFat: { en: 'Polyunsaturated Fat', ar: 'الدهون المتعددة غير المشبعة' },
    transFat: { en: 'Trans Fat', ar: 'الدهون المتحولة' },

    // Carbohydrates & Sugars
    carbs: { en: 'Carbohydrates', ar: 'الكربوهيدرات' },
    carbohydrates: { en: 'Carbohydrates', ar: 'الكربوهيدرات' },
    netCarbs: { en: 'Net Carbs', ar: 'الكربوهيدرات الصافية' },
    sugar: { en: 'Sugar', ar: 'السكر' },
    sugars: { en: 'Sugars', ar: 'السكريات' },
    addedSugar: { en: 'Added Sugar', ar: 'السكر المضاف' },
    sugarAlcohol: { en: 'Sugar Alcohol', ar: 'كحول السكر' },
    fiber: { en: 'Dietary Fiber', ar: 'الألياف الغذائية' },

    // Cholesterol
    cholesterol: { en: 'Cholesterol', ar: 'الكوليسترول' },

    // Minerals
    calcium: { en: 'Calcium', ar: 'الكالسيوم' },
    iron: { en: 'Iron', ar: 'الحديد' },
    magnesium: { en: 'Magnesium', ar: 'المغنيسيوم' },
    phosphorus: { en: 'Phosphorus', ar: 'الفوسفور' },
    potassium: { en: 'Potassium', ar: 'البوتاسيوم' },
    sodium: { en: 'Sodium', ar: 'الصوديوم' },
    zinc: { en: 'Zinc', ar: 'الزنك' },
    copper: { en: 'Copper', ar: 'النحاس' },
    manganese: { en: 'Manganese', ar: 'المنغنيز' },
    selenium: { en: 'Selenium', ar: 'السيلينيوم' },

    // Vitamins (Fat-Soluble)
    vitaminA: { en: 'Vitamin A', ar: 'فيتامين أ' },
    vitaminD: { en: 'Vitamin D', ar: 'فيتامين د' },
    vitaminE: { en: 'Vitamin E', ar: 'فيتامين هـ' },
    vitaminK: { en: 'Vitamin K', ar: 'فيتامين ك' },

    // Vitamins (Water-Soluble)
    vitaminC: { en: 'Vitamin C', ar: 'فيتامين ج' },
    vitaminB1: { en: 'Vitamin B1 (Thiamin)', ar: 'فيتامين ب1 (الثيامين)' },
    vitaminB2: { en: 'Vitamin B2 (Riboflavin)', ar: 'فيتامين ب2 (الريبوفلافين)' },
    vitaminB3: { en: 'Vitamin B3 (Niacin)', ar: 'فيتامين ب3 (النياسين)' },
    vitaminB6: { en: 'Vitamin B6', ar: 'فيتامين ب6' },
    vitaminB12: { en: 'Vitamin B12', ar: 'فيتامين ب12' },

    // Alternative names for B vitamins
    thiamin: { en: 'Thiamin (B1)', ar: 'الثيامين (ب1)' },
    riboflavin: { en: 'Riboflavin (B2)', ar: 'الريبوفلافين (ب2)' },
    niacin: { en: 'Niacin (B3)', ar: 'النياسين (ب3)' },

    // Folate
    folateDFE: { en: 'Folate DFE', ar: 'حمض الفوليك DFE' },
    folateFood: { en: 'Folate (Food)', ar: 'حمض الفوليك (الطعام)' },
    folicAcid: { en: 'Folic Acid', ar: 'حمض الفوليك' },
    folate: { en: 'Folate', ar: 'حمض الفوليك' },

    // Water & Other
    water: { en: 'Water', ar: 'الماء' },
    ash: { en: 'Ash', ar: 'الرماد' },
    caffeine: { en: 'Caffeine', ar: 'الكافيين' },
    alcohol: { en: 'Alcohol', ar: 'الكحول' },
  };

  // Check if we have a translation for this key
  if (displayNames[key]) {
    return displayNames[key][language as 'en' | 'ar'] || displayNames[key].en;
  }

  // Fallback: format the key nicely
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};
