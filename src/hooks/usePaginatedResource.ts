/**
 * usePaginatedResource
 * Infinite-scroll pagination over a PokeAPI list endpoint using the
 * `next` url returned by the API.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import apiClient from '@/services/api/apiClient';
import { API_PAGINATION } from '@/services/api/apiConfig';
import { ApiError, isApiError } from '@/types/api.types';
import { ResourceList, ResourceListItem } from '@/types/pokeapi';

export interface UsePaginatedResourceResult {
  items: ResourceListItem[];
  total: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  error: ApiError | undefined;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export function usePaginatedResource(
  resource: string,
  pageSize: number = API_PAGINATION.PAGE_SIZE,
): UsePaginatedResourceResult {
  const [items, setItems] = useState<ResourceListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<ApiError | undefined>(undefined);
  const requestId = useRef(0);

  const loadFirstPage = useCallback(
    async (refreshing = false) => {
      const currentRequest = ++requestId.current;
      if (refreshing) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(undefined);
      try {
        const page = await apiClient.getList<ResourceList>(resource, {
          offset: 0,
          limit: pageSize,
        });
        if (currentRequest !== requestId.current) {
          return;
        }
        setItems(page.results);
        setTotal(page.count);
        setNext(page.next);
      } catch (err) {
        if (currentRequest === requestId.current && isApiError(err)) {
          setError(err);
        }
      } finally {
        if (currentRequest === requestId.current) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [resource, pageSize],
  );

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  const loadMore = useCallback(async () => {
    if (!next || isLoadingMore || isLoading) {
      return;
    }
    const currentRequest = requestId.current;
    setIsLoadingMore(true);
    try {
      const page = await apiClient.getByUrl<ResourceList>(next);
      if (currentRequest !== requestId.current) {
        return;
      }
      setItems(prev => [...prev, ...page.results]);
      setNext(page.next);
    } catch (err) {
      if (isApiError(err)) {
        setError(err);
      }
    } finally {
      setIsLoadingMore(false);
    }
  }, [next, isLoadingMore, isLoading]);

  const refresh = useCallback(() => {
    loadFirstPage(true);
  }, [loadFirstPage]);

  return {
    items,
    total,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    hasMore: Boolean(next),
    loadMore,
    refresh,
  };
}

export default usePaginatedResource;
