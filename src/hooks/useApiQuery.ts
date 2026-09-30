/**
 * useApiQuery
 * Minimal data-fetching hook: loading / error / refetch state around any
 * promise returning function. Pass `null` as key to skip fetching.
 * Caching is handled by apiClient, so re-running the same query is cheap.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError, isApiError } from '@/types/api.types';

export interface UseApiQueryResult<T> {
  data: T | undefined;
  error: ApiError | undefined;
  isLoading: boolean;
  refetch: () => void;
}

const toApiError = (error: unknown): ApiError =>
  isApiError(error)
    ? error
    : {
        code: 'REQUEST_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
        statusCode: 0,
      };

export function useApiQuery<T>(
  key: string | null,
  fetcher: () => Promise<T>,
): UseApiQueryResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<ApiError | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(key !== null);
  const [reloadToken, setReloadToken] = useState(0);

  // Keep latest fetcher without re-triggering the effect on every render
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    if (key === null) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(undefined);

    fetcherRef
      .current()
      .then(result => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(toApiError(err));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [key, reloadToken]);

  const refetch = useCallback(() => setReloadToken(token => token + 1), []);

  return { data, error, isLoading, refetch };
}

export default useApiQuery;
