/**
 * Resource API Factory
 * Creates a typed set of list/detail calls for a single PokeAPI resource.
 * Every feature service is composed of these, so each endpoint gets the
 * same caching, error handling and pagination behaviour.
 */

import { ListParams, ResourceList, ResourceListItem } from '@/types/pokeapi';
import apiClient from './apiClient';

export interface ResourceApi<
  TDetail,
  TItem extends ResourceListItem = ResourceListItem,
> {
  /** Endpoint path, e.g. `pokemon-species` */
  resource: string;
  /** Paginated list */
  list: (params?: ListParams) => Promise<ResourceList<TItem>>;
  /** Every entry of the list */
  listAll: () => Promise<ResourceList<TItem>>;
  /** Single resource by id or name */
  get: (idOrName: string | number) => Promise<TDetail>;
}

export function createResourceApi<
  TDetail,
  TItem extends ResourceListItem = ResourceListItem,
>(resource: string): ResourceApi<TDetail, TItem> {
  return {
    resource,
    list: params => apiClient.getList<ResourceList<TItem>>(resource, params),
    listAll: () => apiClient.getAll<ResourceList<TItem>>(resource),
    get: idOrName => apiClient.getDetail<TDetail>(resource, idOrName),
  };
}

export default createResourceApi;
