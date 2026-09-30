/**
 * useFavorite
 * Read / toggle the favorite state of a resource
 */

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectIsFavorite,
  toggleFavorite,
} from '@/redux/slices/favoritesSlice';
import type { ResourceKey } from '@/config/resourceRegistry';

export function useFavorite(resource: ResourceKey, id?: number, name?: string) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(resource, id ?? -1));

  const toggle = useCallback(() => {
    if (id === undefined || !name) {
      return;
    }
    dispatch(toggleFavorite({ resource, id, name }));
  }, [dispatch, resource, id, name]);

  return { isFavorite, toggle };
}

export default useFavorite;
