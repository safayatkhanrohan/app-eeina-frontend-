import { Translation } from '@/i18n/translaion.types';
import { navigation } from './navigation';
import { common } from './common';
import { home } from './home';
import { recipe } from './recipe';
import { profile } from './profile';
import { createRecipe } from './createRecipe';
import { mealPlanner } from './mealPlanner';
import { shoppingList } from './shoppingList';
import { explore } from './explore';
import { saved } from './saved';
import { settings } from './settings';
import { footer } from './footer';
import { auth } from './auth';
import { goals } from './goals';
import { privacyPolicy } from './privacyPolicy';
import { termsAndCondition } from './termsAndCondition';
import { nutritionData } from './nutritionData';
import { goalSetup } from './goalSetup';
import { GoalsDashboard } from './GoalsDashboard';
import { nutritionist } from './nutritionist';
import { packageTrans } from './package';

export const en: Translation = {
  nav: navigation,
  common,
  home,
  recipe,
  profile,
  create_recipe: createRecipe,
  meal_planner: mealPlanner,
  shopping_list: shoppingList,
  explore,
  saved,
  settings,
  footer,
  auth,
  goals,
  privacy_policy: privacyPolicy,
  Terms_Conditions: termsAndCondition,
  nutritionData: nutritionData,
  goalSetup: goalSetup,
  GoalsDashboard: GoalsDashboard,
  nutritionist: nutritionist,
  Package: packageTrans,
};
