export type LanguageString = {
  en: string;
  ar: string;
};

export type NutritionValue = {
  amount: number;
  unit: string;
};

export type Nutrition = {
  calories: NutritionValue;
  protein: NutritionValue;
  fat: NutritionValue;
  saturatedFat: NutritionValue;
  carbs: NutritionValue;
  sugar: NutritionValue;
  fiber: NutritionValue;
  cholesterol: NutritionValue;
  calcium: NutritionValue;
  potassium: NutritionValue;
  iron: NutritionValue;
  zinc: NutritionValue;
  phosphorus: NutritionValue;
  vitaminA: NutritionValue;
  vitaminC: NutritionValue;
};

export type IngredientObject = {
  _id: string;
  name: LanguageString | null;
  slug: {
    en: string;
  };
};

export type IngredientApi = {
  ingredient: IngredientObject;
  quantity: number;
  unit: LanguageString;
  rawIngr: LanguageString;
};

export type Image = {
  url: string;
  key: string;
};
export type Instruction = {
  step: LanguageString;
  image: Image | null;
};

export type Recipe = {
  _id: string;
  title: LanguageString;
  slug: LanguageString;
  description: LanguageString;
  ingredients: IngredientApi[];
  nutrition: Nutrition;
  instructions: Instruction[];
  servings: number;
  time: number;
  category: string[];
  thumbnail: Image;
  otherImages: Image[];
  videoUrl: string | null;
  metadata: {
    imported: boolean;
    site: string;
    originalUrl: string;
    originalDate: string;
    importDate: string;
  };
  status: string;
  drafted_from: string | null;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    image: {
      url: string;
      key: string;
    };
  };
  totalRatings: number;
  ratingCount: number;
  averageRating: number;
  likedBy: string[];
  savedBy: string[];
  trending_score: number;
  ratings: any[];
  viewLog: { viewedAt: string }[];
  createdAt: string;
  updatedAt: string;
  difficulty: string;
  __v: number;
  dish: { _id: string; name: LanguageString; slug: { en: string } }[];
  cuisine: { _id: string; name: LanguageString; slug: { en: string } }[];
  meal_type: { _id: string; name: LanguageString; slug: { en: string } }[];
  diet: { _id: string; name: LanguageString; slug: { en: string } }[];
  likesCount: number;
  viewCount: number;
  id: string;
  glycemicIndex?: number | null | undefined;
  glycemicLoad?: number | null | undefined;
};

export type CookingStep = {
  id: number;
  description: string;
  img?: string | null;
};

export type Ingredient = {
  id: number;
  ingredient: IngredientObject;
  item: string;
  quantity: number;
  unit: string;
  rawIngr: string;
};

export type RawIngredient = {
  en: string;
  ar: string;
};
