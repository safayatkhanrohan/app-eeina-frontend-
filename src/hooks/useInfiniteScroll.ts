import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for implementing infinite scroll functionality with RTK Query
 * Uses IntersectionObserver API to detect when the user scrolls to the bottom
 *
 * @param queryHook - RTK Query hook to fetch paginated data
 * @param extraParams - Additional query parameters to pass to the API
 * @param limit - Number of items to fetch per page (default: 4)
 * @returns Object containing data, loading states, error states, and utility functions
 */
export function useInfiniteScroll(queryHook: any, extraParams: any = {}, limit = 4) {
  // Current page number for pagination
  const [page, setPage] = useState(1);

  // Accumulated data from all loaded pages
  const [allData, setAllData] = useState<any[]>([]);

  // Flag indicating if more data is available to load
  const [hasMore, setHasMore] = useState(true);

  console.log('extraParams', extraParams);

  // Fetch data using the provided query hook
  const { data, isLoading, isFetching, refetch, error, isError } = queryHook({
    page,
    limit,
    ...extraParams,
  });

  // Track previous extraParams to detect changes
  const prevExtraParamsRef = useRef(extraParams);

  /**
   * Reset function to clear all data and start fresh from page 1
   * Useful for when filters or search parameters change or for manual reset
   * Also attempts to refetch to retry on previous errors
   */
  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
    refetch();
  }, [refetch]);

  /**
   * Effect to detect changes in extraParams and reset pagination state
   * This ensures a fresh start (page 1) when query parameters change (e.g., filters)
   */
  useEffect(() => {
    const prevParams = prevExtraParamsRef.current;
    if (JSON.stringify(prevParams) !== JSON.stringify(extraParams)) {
      reset(); // Now safe to call since reset is defined above
    }
    prevExtraParamsRef.current = { ...extraParams };
  }, [extraParams, reset]);

  /**
   * Effect to handle new data from API response
   * Appends new data to existing data or replaces it if page is 1
   * Skips processing if an error occurred
   */
  useEffect(() => {
    // If error occurred, do not process data and stop further fetches
    if (isError) {
      setHasMore(false);
      return;
    }

    const newDocs = data?.data?.docs ?? [];
    // Handle empty first page - reset state
    if (page === 1 && newDocs.length === 0) {
      setAllData([]);
      setHasMore(false);
      return;
    }

    if (newDocs.length) {
      //  this return all data
      // setAllData((prev) => (page === 1 ? [...newDocs] : [...prev, ...newDocs]));
      //  Append new data, ensuring no duplicates based on unique _id ,
   
      setAllData((prev) => {
        if (page === 1) return [...newDocs];

        const seen = new Set();
        const merged = [...prev, ...newDocs];
        const unique = merged.filter((item) => {
          if (seen.has(item._id)) return false;
          seen.add(item._id);
          return true;
        });
        return unique;
      });

      // Check if more data might be available based on response length
      setHasMore(page * limit < data?.data?.pagination?.totalCount);
      // setHasMore(newDocs.length >= limit);
    } else {
      setHasMore(false);
    }
  }, [data, limit, isError]); // 'page' is intentionally excluded from dependencies to avoid unnecessary re-renders

  // IntersectionObserver instance for detecting scroll position
  const observer = useRef<IntersectionObserver | null>(null);

  /**
   * Callback ref for the last element in the list
   * Sets up IntersectionObserver to trigger loading more data when visible
   *
   * @param node - DOM element to observe (typically the last item in the list)
   */
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Don't observe if currently loading/fetching, in error state, or no more data
      if (isFetching || isLoading || isError || !hasMore) return;

      // Disconnect previous observer
      if (observer.current) observer.current.disconnect();

      // Create new observer to detect when element becomes visible
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isError) {
          setPage((prev) => prev + 1); // Load next page
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, isLoading, hasMore, isError],
  );

  /**
   * Effect to cleanup observer when no more data is available or error occurs
   */
  useEffect(() => {
    if ((!hasMore || isError) && observer.current) {
      observer.current.disconnect();
    }
  }, [hasMore, isError]);

  /**
   * Retry function to refetch the current page on error
   * Useful for manual retry in UI
   */
  const retry = useCallback(() => {
    setHasMore(true); // Re-enable fetching
    refetch();
  }, [refetch]);

  return {
    allData, // Accumulated data from all pages
    totalCount: data?.data?.pagination?.totalCount || 0, // Total count from API
    isLoading, // Initial loading state
    isFetching, // Loading state for subsequent fetches
    isError, // Error state
    error, // Error object from RTK Query
    lastElementRef, // Ref to attach to the last element
    hasMore, // Whether more data is available
    reset, // Function to reset pagination
    retry, // Function to retry the current fetch
  };
}
