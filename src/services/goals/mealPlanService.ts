import { UserMealPlan, MealPlanTemplate, UserMealPlanMeal } from '@/types/goals';

const STORAGE_KEY = 'userMealPlans';

export const getUserMealPlans = (): UserMealPlan[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveMealPlans = (plans: UserMealPlan[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
};

export const createMealPlanFromTemplate = (
  goalIdOrTemplate: string | MealPlanTemplate,
  templateOrGoalId?: MealPlanTemplate | string,
  customStartDate?: Date
): UserMealPlan => {
  const plans = getUserMealPlans();
  
  // Support both signatures: (template, goalId) and (goalId, template, startDate)
  let template: MealPlanTemplate;
  let goalId: string;
  let startDate: Date;
  
  if (typeof goalIdOrTemplate === 'string') {
    // New signature: (goalId, template, startDate)
    goalId = goalIdOrTemplate;
    template = templateOrGoalId as MealPlanTemplate;
    startDate = customStartDate || new Date();
  } else {
    // Old signature: (template, goalId)
    template = goalIdOrTemplate;
    goalId = templateOrGoalId as string;
    startDate = new Date();
  }
  
  const endDate = new Date(startDate.getTime() + template.durationDays * 24 * 60 * 60 * 1000);
  
  const meals: UserMealPlanMeal[] = template.meals.map((meal, index) => ({
    id: `meal-${Date.now()}-${index}`,
    dayNumber: meal.dayNumber,
    mealType: meal.mealType,
    recipeId: meal.recipeId,
    isCompleted: false,
  }));
  
  const newPlan: UserMealPlan = {
    id: `plan-${Date.now()}`,
    goalId,
    templateId: template.id,
    name: template.name,
    dietType: template.dietType,
    targetCalories: template.targetCalories,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    isActive: true,
    meals,
    createdAt: new Date().toISOString(),
  };
  
  plans.push(newPlan);
  saveMealPlans(plans);
  return newPlan;
};

export const updateMealPlan = (id: string, updates: Partial<UserMealPlan>): void => {
  const plans = getUserMealPlans();
  const index = plans.findIndex(p => p.id === id);
  if (index !== -1) {
    plans[index] = { ...plans[index], ...updates };
    saveMealPlans(plans);
  }
};

export const markMealCompleted = (planId: string, mealId: string, completed?: boolean): void => {
  const plans = getUserMealPlans();
  const plan = plans.find(p => p.id === planId);
  if (plan) {
    const meal = plan.meals.find(m => m.id === mealId);
    if (meal) {
      // If completed param is provided, use it; otherwise toggle
      const newStatus = completed !== undefined ? completed : !meal.isCompleted;
      meal.isCompleted = newStatus;
      if (newStatus) {
        meal.completedAt = new Date().toISOString();
      } else {
        delete meal.completedAt;
      }
      saveMealPlans(plans);
    }
  }
};

export const deleteMealPlan = (id: string): void => {
  const plans = getUserMealPlans().filter(p => p.id !== id);
  saveMealPlans(plans);
};

export const getMealPlanProgress = (plan: UserMealPlan): { percentage: number; completed: number; total: number } => {
  const totalMeals = plan.meals.length;
  if (totalMeals === 0) return { percentage: 0, completed: 0, total: 0 };
  
  const completedMeals = plan.meals.filter(m => m.isCompleted).length;
  const percentage = (completedMeals / totalMeals) * 100;
  
  return {
    percentage: Math.min(Math.round(percentage), 100),
    completed: completedMeals,
    total: totalMeals,
  };
};

export const getTodaysMeals = (plan: UserMealPlan): UserMealPlanMeal[] => {
  const startDate = new Date(plan.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  
  const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  if (diffDays < 1 || diffDays > Math.ceil((new Date(plan.endDate).getTime() - new Date(plan.startDate).getTime()) / (1000 * 60 * 60 * 24))) {
    return []; // Plan hasn't started or has ended
  }
  
  return plan.meals.filter(m => m.dayNumber === diffDays);
};

export const getActiveMealPlanForGoal = (goalId: string): UserMealPlan | undefined => {
  const plans = getUserMealPlans();
  return plans.find(p => p.goalId === goalId && p.isActive);
};

export const getMealPlansForGoal = (goalId: string): UserMealPlan[] => {
  const plans = getUserMealPlans();
  return plans.filter(p => p.goalId === goalId);
};

export const mealPlanService = {
  getUserMealPlans,
  createMealPlanFromTemplate,
  updateMealPlan,
  markMealCompleted,
  deleteMealPlan,
  getMealPlanProgress,
  getTodaysMeals,
  getActiveMealPlanForGoal,
  getMealPlansForGoal,
};
