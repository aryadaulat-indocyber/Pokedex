/**
 * useResourceIndex
 * Loads the complete name index of a resource in one request so screens
 * can search / filter locally (Pokémon, moves, items, ...).
 */

import { useMemo } from 'react';
import apiClient from '@/services/api/apiClient';
import { ResourceList } from '@/types/pokeapi';
import { getIdFromUrl } from '@/utils/resourceUrl';
import { useApiQuery } from './useApiQuery';

export interface IndexedResource {
  id: number;
  name: string;
  url: string;
}

export function useResourceIndex(resource: string | null) {
  const query = useApiQuery<ResourceList>(
    resource ? `index:${resource}` : null,
    () => apiClient.getAll(resource as string),
  );

  const items = useMemo<IndexedResource[]>(
    () =>
      (query.data?.results ?? []).map(result => {
        const id = getIdFromUrl(result.url);
        return { id, name: result.name ?? String(id), url: result.url };
      }),
    [query.data],
  );

  return { ...query, items };
}

export default useResourceIndex;
