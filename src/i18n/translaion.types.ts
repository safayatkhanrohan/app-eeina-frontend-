import {
  AuthTranslations,
  CommonTranslations,
  CreateRecipeTranslations,
  ExploreTranslations,
  FooterTranslations,
  GoalsDashboardTranslations,
  goalSetupTranslations,
  GoalsTranslations,
  HomeTranslations,
  MealPlannerTranslations,
  NavigationTranslations,
  NutritionistTranslations,
  NutritionTranslations,
  PrivacyPolicyTranslation,
  ProfileTranslations,
  RecipeTranslations,
  SavedTranslations,
  SettingsTranslations,
  ShoppingListTranslations,
  TermsAndConditionTranslation,
  PackageTranslations,
  SubscriptionTranslations,
  PaymentTranslations,
} from './types';

export interface Translation {
  nav: NavigationTranslations;
  common: CommonTranslations;
  home: HomeTranslations;
  recipe: RecipeTranslations;
  profile: ProfileTranslations;
  create_recipe: CreateRecipeTranslations;
  meal_planner: MealPlannerTranslations;
  shopping_list: ShoppingListTranslations;
  explore: ExploreTranslations;
  saved: SavedTranslations;
  settings: SettingsTranslations;
  footer: FooterTranslations;
  auth: AuthTranslations;
  goals: GoalsTranslations;
  privacy_policy: PrivacyPolicyTranslation;
  Terms_Conditions: TermsAndConditionTranslation;
  nutritionData: NutritionTranslations;
  goalSetup: goalSetupTranslations;
  GoalsDashboard: GoalsDashboardTranslations;
  nutritionist: NutritionistTranslations;
  Package: PackageTranslations;
  subscription:SubscriptionTranslations
  payment:PaymentTranslations
}
