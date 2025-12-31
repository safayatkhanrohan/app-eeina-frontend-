import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/utils/analytics';
import { useAppSelector } from '@/hooks/hook';

// Context types
interface AnalyticsContextType {
  // Recipe tracking
  trackRecipeView: (recipeId: string, recipeSlug?: string, recipeName?: string) => void;
  trackRecipeLike: (recipeId: string, liked: boolean) => void;
  trackRecipeSave: (recipeId: string, saved: boolean) => void;
  trackRecipeShare: (recipeId: string, method: string) => void;
  trackRecipePrint: (recipeId: string) => void;
  trackRecipeCreate: () => void;
  trackRecipeEdit: (recipeId: string) => void;
  trackRecipeDelete: (recipeId: string) => void;
  trackRecipeRate: (recipeId: string, rating: number) => void;

  // Search and filter
  trackSearch: (query: string, resultsCount?: number, filters?: Record<string, unknown>) => void;
  trackFilterApply: (filters: Record<string, unknown>) => void;
  trackFilterClear: () => void;

  // Category
  trackCategoryView: (categoryId: string, categoryName?: string) => void;

  // Auth
  trackLogin: (method?: string) => void;
  trackLogout: () => void;
  trackSignup: (method?: string) => void;

  // Profile
  trackProfileView: (userId?: string) => void;
  trackProfileEdit: () => void;
  trackFollow: (userId: string, followed: boolean) => void;

  // Meal planner
  trackMealPlanCreate: () => void;
  trackMealPlanEdit: (planId: string) => void;
  trackMealPlanDelete: (planId: string) => void;
  trackMealAdd: (recipeId: string, mealType: string, date: string) => void;

  // Shopping list
  trackShoppingListCreate: () => void;
  trackShoppingListItemAdd: (itemId?: string) => void;
  trackShoppingListItemCheck: (itemId: string, checked: boolean) => void;

  // Goals
  trackGoalCreate: (goalType: string) => void;
  trackGoalComplete: (goalId: string) => void;
  trackGoalProgress: (goalId: string, progress: number) => void;

  // Import
  trackRecipeImportStart: (source?: string) => void;
  trackRecipeImportSuccess: (recipeId: string) => void;
  trackRecipeImportFail: (error?: string) => void;

  // UI interactions
  trackButtonClick: (buttonId: string, context?: Record<string, unknown>) => void;
  trackModalOpen: (modalId: string) => void;
  trackModalClose: (modalId: string) => void;
  trackTabChange: (tabId: string) => void;
  trackError: (error: string, context?: Record<string, unknown>) => void;
  trackScrollDepth: (depth: number) => void;

  // Generic
  track: (eventType: string, payload?: Record<string, unknown>) => void;

  // Utility
  flush: () => Promise<void>;
  getSessionId: () => string;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  enabled = true,
}) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const prevPathRef = React.useRef<string>('');

  // Initialize analytics on mount
  useEffect(() => {
    if (enabled) {
      analytics.init();
    }

    return () => {
      if (enabled) {
        analytics.destroy();
      }
    };
  }, [enabled]);

  // Track page views on route change
  useEffect(() => {
    if (!enabled) return;

    if (prevPathRef.current !== location.pathname) {
      analytics.trackPageView({
        previousPath: prevPathRef.current || undefined,
        isAuthenticated,
      });
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, isAuthenticated, enabled]);

  // Memoized context value
  const contextValue = useMemo<AnalyticsContextType>(() => {
    // If disabled, return no-op functions
    if (!enabled) {
      const noop = () => {};
      const noopAsync = async () => {};
      return {
        trackRecipeView: noop,
        trackRecipeLike: noop,
        trackRecipeSave: noop,
        trackRecipeShare: noop,
        trackRecipePrint: noop,
        trackRecipeCreate: noop,
        trackRecipeEdit: noop,
        trackRecipeDelete: noop,
        trackRecipeRate: noop,
        trackSearch: noop,
        trackFilterApply: noop,
        trackFilterClear: noop,
        trackCategoryView: noop,
        trackLogin: noop,
        trackLogout: noop,
        trackSignup: noop,
        trackProfileView: noop,
        trackProfileEdit: noop,
        trackFollow: noop,
        trackMealPlanCreate: noop,
        trackMealPlanEdit: noop,
        trackMealPlanDelete: noop,
        trackMealAdd: noop,
        trackShoppingListCreate: noop,
        trackShoppingListItemAdd: noop,
        trackShoppingListItemCheck: noop,
        trackGoalCreate: noop,
        trackGoalComplete: noop,
        trackGoalProgress: noop,
        trackRecipeImportStart: noop,
        trackRecipeImportSuccess: noop,
        trackRecipeImportFail: noop,
        trackButtonClick: noop,
        trackModalOpen: noop,
        trackModalClose: noop,
        trackTabChange: noop,
        trackError: noop,
        trackScrollDepth: noop,
        track: noop,
        flush: noopAsync,
        getSessionId: () => '',
      };
    }

    return {
      // Recipe tracking
      trackRecipeView: (recipeId, recipeSlug, recipeName) =>
        analytics.trackRecipeView(recipeId, recipeSlug, recipeName),
      trackRecipeLike: (recipeId, liked) => analytics.trackRecipeLike(recipeId, liked),
      trackRecipeSave: (recipeId, saved) => analytics.trackRecipeSave(recipeId, saved),
      trackRecipeShare: (recipeId, method) => analytics.trackRecipeShare(recipeId, method),
      trackRecipePrint: (recipeId) => analytics.trackRecipePrint(recipeId),
      trackRecipeCreate: () => analytics.trackRecipeCreate(),
      trackRecipeEdit: (recipeId) => analytics.trackRecipeEdit(recipeId),
      trackRecipeDelete: (recipeId) => analytics.trackRecipeDelete(recipeId),
      trackRecipeRate: (recipeId, rating) => analytics.trackRecipeRate(recipeId, rating),

      // Search and filter
      trackSearch: (query, resultsCount, filters) =>
        analytics.trackSearch(query, resultsCount, filters),
      trackFilterApply: (filters) => analytics.trackFilterApply(filters),
      trackFilterClear: () => analytics.trackFilterClear(),

      // Category
      trackCategoryView: (categoryId, categoryName) =>
        analytics.trackCategoryView(categoryId, categoryName),

      // Auth
      trackLogin: (method) => analytics.trackLogin(method),
      trackLogout: () => analytics.trackLogout(),
      trackSignup: (method) => analytics.trackSignup(method),

      // Profile
      trackProfileView: (userId) => analytics.trackProfileView(userId),
      trackProfileEdit: () => analytics.trackProfileEdit(),
      trackFollow: (userId, followed) => analytics.trackFollow(userId, followed),

      // Meal planner
      trackMealPlanCreate: () => analytics.trackMealPlanCreate(),
      trackMealPlanEdit: (planId) => analytics.trackMealPlanEdit(planId),
      trackMealPlanDelete: (planId) => analytics.trackMealPlanDelete(planId),
      trackMealAdd: (recipeId, mealType, date) => analytics.trackMealAdd(recipeId, mealType, date),

      // Shopping list
      trackShoppingListCreate: () => analytics.trackShoppingListCreate(),
      trackShoppingListItemAdd: (itemId) => analytics.trackShoppingListItemAdd(itemId),
      trackShoppingListItemCheck: (itemId, checked) =>
        analytics.trackShoppingListItemCheck(itemId, checked),

      // Goals
      trackGoalCreate: (goalType) => analytics.trackGoalCreate(goalType),
      trackGoalComplete: (goalId) => analytics.trackGoalComplete(goalId),
      trackGoalProgress: (goalId, progress) => analytics.trackGoalProgress(goalId, progress),

      // Import
      trackRecipeImportStart: (source) => analytics.trackRecipeImportStart(source),
      trackRecipeImportSuccess: (recipeId) => analytics.trackRecipeImportSuccess(recipeId),
      trackRecipeImportFail: (error) => analytics.trackRecipeImportFail(error),

      // UI interactions
      trackButtonClick: (buttonId, context) => analytics.trackButtonClick(buttonId, context),
      trackModalOpen: (modalId) => analytics.trackModalOpen(modalId),
      trackModalClose: (modalId) => analytics.trackModalClose(modalId),
      trackTabChange: (tabId) => analytics.trackTabChange(tabId),
      trackError: (error, context) => analytics.trackError(error, context),
      trackScrollDepth: (depth) => analytics.trackScrollDepth(depth),

      // Generic
      track: (eventType, payload) => analytics.track(eventType, payload || {}),

      // Utility
      flush: () => analytics.flush(),
      getSessionId: () => analytics.getSessionId(),
    };
  }, [enabled]);

  return <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>;
};

/**
 * Hook to access the analytics context
 */
export function useAnalyticsContext(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);

  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }

  return context;
}

export default AnalyticsProvider;
