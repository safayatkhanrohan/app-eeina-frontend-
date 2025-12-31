/**
 * Helper function to make fetch requests with CSRF token
 * Use this for any manual fetch calls outside of RTK Query
 */
export const fetchWithCsrf = async (url: string, options: RequestInit = {}) => {
  // Get CSRF token
  const tokenResponse = await fetch(`${import.meta.env.VITE_API_URL}/csrf-token`, {
    credentials: 'include',
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to fetch CSRF token');
  }

  const { csrfToken } = await tokenResponse.json();

  // Make request with CSRF token
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      'x-csrf-token': csrfToken,
    },
  });
};

/**
 * Rate limit error handler
 * Returns user-friendly message for rate limit errors
 */
export const getRateLimitMessage = (retryAfter?: number): string => {
  if (!retryAfter) {
    return 'Too many requests. Please try again later.';
  }

  const minutes = Math.ceil(retryAfter / 60);
  const seconds = retryAfter % 60;

  if (minutes > 0) {
    return `Too many requests. Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`;
  }

  return `Too many requests. Please try again in ${seconds} seconds.`;
};

/**
 * CSRF error handler
 * Returns user-friendly message for CSRF errors
 */
export const getCsrfErrorMessage = (): string => {
  return 'Security validation failed. Please refresh the page and try again.';
};
