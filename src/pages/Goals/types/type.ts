import { localizedString } from '@/types/common';

// From GoalsSetup
export type GoalSetupProps = {
  next: () => void;
  back?: () => void;
  skip?: () => void;
  key?: string;
  isModification?: boolean;
  goalId?: string;
};
export type GoalType = 'Gain Weight' | 'Lose Weight' | 'Maintain Weight' | 'Build Muscle';
// Alias for Dashboard compatibility
export type GoalTypes = GoalType;

export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'super_active';

export type TargetNutrition = {
  calories: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  monounsaturatedFat: number;
  polyunsaturatedFat: number;
  transFat: number;
  carbs: number;
  netCarbs: number;
  sugar: number;
  addedSugar: number;
  sugarAlcohol: number;
  fiber: number;
  cholesterol: number;
  calcium: number;
  iron: number;
  magnesium: number;
  phosphorus: number;
  potassium: number;
  sodium: number;
  zinc: number;
  vitaminA: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  vitaminC: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminB3: number;
  vitaminB6: number;
  vitaminB12: number;
  folateDFE: number;
  folateFood: number;
  folicAcid: number;
};

export type GoalResponse = {
  type: GoalType;
  startDate: string;
  endDate: string;
  currentWeight: number;
  bmr: number;
  tdee: number;
  targetWeight: number;
  status: string;
  targetNutrition: TargetNutrition;
  distributedNutrition: {
    breakfast: TargetNutrition;
    lunch: TargetNutrition;
    dinner: TargetNutrition;
    snack: TargetNutrition;
  };
  _id: string;
  generatedPlanId: string;
};

export type UserInfo = {
  currentWeight?: number;
  type?: GoalType;
  height?: number;
  age?: number;
  gender?: 'male' | 'female';
  activityLevel?: ActivityLevel;
  bmi?: number;
  targetWeight?: number;
  durationWeeks?: number;
  goalResponse?: GoalResponse;
  generatedPlanId?: string;
};

type NutritionContent = {
  amount: number;
  unit: string;
};

type RecipeNutrition = {
  calories: NutritionContent;
  protein: NutritionContent;
  fat: NutritionContent;
  saturatedFat: NutritionContent;
  monounsaturatedFat: NutritionContent;
  polyunsaturatedFat: NutritionContent;
  transFat: NutritionContent;
  carbs: NutritionContent;
  netCarbs: NutritionContent;
  sugar: NutritionContent;
  addedSugar: NutritionContent;
  sugarAlcohol: NutritionContent;
  fiber: NutritionContent;
  cholesterol: NutritionContent;
  calcium: NutritionContent;
  iron: NutritionContent;
  magnesium: NutritionContent;
  phosphorus: NutritionContent;
  potassium: NutritionContent;
  sodium: NutritionContent;
  zinc: NutritionContent;
  vitaminA: NutritionContent;
  vitaminD: NutritionContent;
  vitaminE: NutritionContent;
  vitaminK: NutritionContent;
  vitaminC: NutritionContent;
  vitaminB1: NutritionContent;
  vitaminB2: NutritionContent;
  vitaminB3: NutritionContent;
  vitaminB6: NutritionContent;
  vitaminB12: NutritionContent;
  folateDFE: NutritionContent;
  folateFood: NutritionContent;
  folicAcid: NutritionContent;
};

export type Recipe = {
  _id: string;
  title: { ar: string; en: string };
  thumbnail: { url: string };
  time: number;
  nutrition: RecipeNutrition;
};

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

type Meal = {
  mealType: MealType;
  recipe: Recipe;
};

export type GeneratedMealPlan = {
  date: Date;
  meals: Meal[];
};

export type MealDsiplay = {
  type: MealType;
  calories: number;
  image: string;
  title: string;
  description: string;
  protien: number;
  fat: number;
  carbs: number;
  _id: string;
};

// From GoalsDashboard
type NutritionComponent = {
  amount: number;
  unit: localizedString | undefined | null;
};

export type MealPlan = {
  mealType: MealType;
  recipe: {
    title: localizedString;
    description: localizedString;
    thumbnail: { url: string };
    nutrition: {
      calories: NutritionComponent;
      protein: NutritionComponent;
      carbs: NutritionComponent;
      fat: NutritionComponent;
    };
  };
};

export type MealLog = {
  date: Date;
  meals: {
    [key in MealType]: boolean;
  };
};
