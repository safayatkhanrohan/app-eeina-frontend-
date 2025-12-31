import { useState, useEffect, useCallback } from 'react';

interface CsrfTokenResponse {
  success: boolean;
  csrfToken: string;
}

/**
 * Hook to manage CSRF token
 * Automatically fetches token on mount and provides refresh functionality
 */
export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCsrfToken = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/csrf-token`, {
        method: 'GET',
        credentials: 'include', // Important: include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const data: CsrfTokenResponse = await response.json();
      setCsrfToken(data.csrfToken);
      return data.csrfToken;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching CSRF token:', errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch token on mount
  useEffect(() => {
    fetchCsrfToken();
  }, [fetchCsrfToken]);

  return {
    csrfToken,
    isLoading,
    error,
    refreshToken: fetchCsrfToken,
  };
};
