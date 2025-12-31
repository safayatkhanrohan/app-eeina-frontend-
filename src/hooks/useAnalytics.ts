import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/utils/analytics';
import { useAppSelector } from './hook';

/**
 * Hook to initialize analytics and track page views automatically
 */
export function useAnalytics() {
  const location = useLocation();
  const prevPathRef = useRef<string>('');
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);

  // Initialize analytics on mount
  useEffect(() => {
    analytics.init();

    return () => {
      analytics.destroy();
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      analytics.trackPageView({
        previousPath: prevPathRef.current || undefined,
        isAuthenticated,
      });
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, isAuthenticated]);

  return analytics;
}

/**
 * Hook for recipe tracking
 */
export function useRecipeAnalytics() {
  const trackView = useCallback((recipeId: string, recipeSlug?: string, recipeName?: string) => {
    analytics.trackRecipeView(recipeId, recipeSlug, recipeName);
  }, []);

  const trackLike = useCallback((recipeId: string, liked: boolean) => {
    analytics.trackRecipeLike(recipeId, liked);
  }, []);

  const trackSave = useCallback((recipeId: string, saved: boolean) => {
    analytics.trackRecipeSave(recipeId, saved);
  }, []);

  const trackShare = useCallback((recipeId: string, method: string) => {
    analytics.trackRecipeShare(recipeId, method);
  }, []);

  const trackPrint = useCallback((recipeId: string) => {
    analytics.trackRecipePrint(recipeId);
  }, []);

  const trackCreate = useCallback(() => {
    analytics.trackRecipeCreate();
  }, []);

  const trackEdit = useCallback((recipeId: string) => {
    analytics.trackRecipeEdit(recipeId);
  }, []);

  const trackDelete = useCallback((recipeId: string) => {
    analytics.trackRecipeDelete(recipeId);
  }, []);

  const trackRate = useCallback((recipeId: string, rating: number) => {
    analytics.trackRecipeRate(recipeId, rating);
  }, []);

  return {
    trackView,
    trackLike,
    trackSave,
    trackShare,
    trackPrint,
    trackCreate,
    trackEdit,
    trackDelete,
    trackRate,
  };
}

/**
 * Hook for search analytics
 */
export function useSearchAnalytics() {
  const trackSearch = useCallback(
    (query: string, resultsCount?: number, filters?: Record<string, unknown>) => {
      analytics.trackSearch(query, resultsCount, filters);
    },
    [],
  );

  const trackFilterApply = useCallback((filters: Record<string, unknown>) => {
    analytics.trackFilterApply(filters);
  }, []);

  const trackFilterClear = useCallback(() => {
    analytics.trackFilterClear();
  }, []);

  return {
    trackSearch,
    trackFilterApply,
    trackFilterClear,
  };
}

/**
 * Hook for auth analytics
 */
export function useAuthAnalytics() {
  const trackLogin = useCallback((method: string = 'email') => {
    analytics.trackLogin(method);
  }, []);

  const trackLogout = useCallback(() => {
    analytics.trackLogout();
  }, []);

  const trackSignup = useCallback((method: string = 'email') => {
    analytics.trackSignup(method);
  }, []);

  return {
    trackLogin,
    trackLogout,
    trackSignup,
  };
}

/**
 * Hook for meal planner analytics
 */
export function useMealPlannerAnalytics() {
  const trackCreate = useCallback(() => {
    analytics.trackMealPlanCreate();
  }, []);

  const trackEdit = useCallback((planId: string) => {
    analytics.trackMealPlanEdit(planId);
  }, []);

  const trackDelete = useCallback((planId: string) => {
    analytics.trackMealPlanDelete(planId);
  }, []);

  const trackMealAdd = useCallback((recipeId: string, mealType: string, date: string) => {
    analytics.trackMealAdd(recipeId, mealType, date);
  }, []);

  return {
    trackCreate,
    trackEdit,
    trackDelete,
    trackMealAdd,
  };
}

/**
 * Hook for shopping list analytics
 */
export function useShoppingListAnalytics() {
  const trackCreate = useCallback(() => {
    analytics.trackShoppingListCreate();
  }, []);

  const trackItemAdd = useCallback((itemId?: string) => {
    analytics.trackShoppingListItemAdd(itemId);
  }, []);

  const trackItemCheck = useCallback((itemId: string, checked: boolean) => {
    analytics.trackShoppingListItemCheck(itemId, checked);
  }, []);

  return {
    trackCreate,
    trackItemAdd,
    trackItemCheck,
  };
}

/**
 * Hook for goal analytics
 */
export function useGoalAnalytics() {
  const trackCreate = useCallback((goalType: string) => {
    analytics.trackGoalCreate(goalType);
  }, []);

  const trackComplete = useCallback((goalId: string) => {
    analytics.trackGoalComplete(goalId);
  }, []);

  const trackProgress = useCallback((goalId: string, progress: number) => {
    analytics.trackGoalProgress(goalId, progress);
  }, []);

  return {
    trackCreate,
    trackComplete,
    trackProgress,
  };
}

/**
 * Hook for import analytics
 */
export function useImportAnalytics() {
  const trackStart = useCallback((source?: string) => {
    analytics.trackRecipeImportStart(source);
  }, []);

  const trackSuccess = useCallback((recipeId: string) => {
    analytics.trackRecipeImportSuccess(recipeId);
  }, []);

  const trackFail = useCallback((error?: string) => {
    analytics.trackRecipeImportFail(error);
  }, []);

  return {
    trackStart,
    trackSuccess,
    trackFail,
  };
}

/**
 * Hook for UI interaction tracking
 */
export function useUIAnalytics() {
  const trackButtonClick = useCallback((buttonId: string, context?: Record<string, unknown>) => {
    analytics.trackButtonClick(buttonId, context);
  }, []);

  const trackModalOpen = useCallback((modalId: string) => {
    analytics.trackModalOpen(modalId);
  }, []);

  const trackModalClose = useCallback((modalId: string) => {
    analytics.trackModalClose(modalId);
  }, []);

  const trackTabChange = useCallback((tabId: string) => {
    analytics.trackTabChange(tabId);
  }, []);

  const trackError = useCallback((error: string, context?: Record<string, unknown>) => {
    analytics.trackError(error, context);
  }, []);

  return {
    trackButtonClick,
    trackModalOpen,
    trackModalClose,
    trackTabChange,
    trackError,
  };
}

/**
 * Hook for scroll tracking with throttling
 */
export function useScrollTracking(thresholds: number[] = [25, 50, 75, 90, 100]) {
  const trackedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedThresholds.current.has(threshold)) {
          trackedThresholds.current.add(threshold);
          analytics.trackScrollDepth(threshold);
        }
      });
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandler);
      trackedThresholds.current.clear();
    };
  }, [thresholds]);
}

/**
 * Generic event tracking
 */
export function useTrackEvent() {
  return useCallback((eventType: string, payload: Record<string, unknown> = {}) => {
    analytics.track(eventType, payload);
  }, []);
}

export default useAnalytics;
