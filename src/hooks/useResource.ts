/**
 * useResource / useResourceByUrl
 * Fetch a single PokeAPI resource by (resource, id|name) or by url
 */

import apiClient from '@/services/api/apiClient';
import { useApiQuery } from './useApiQuery';

export function useResource<T>(
  resource: string,
  idOrName: string | number | null | undefined,
) {
  const key =
    idOrName === null || idOrName === undefined || idOrName === ''
      ? null
      : `${resource}/${String(idOrName).toLowerCase()}`;
  return useApiQuery<T>(key, () =>
    apiClient.getDetail<T>(resource, idOrName as string | number),
  );
}

export function useResourceByUrl<T>(url: string | null | undefined) {
  return useApiQuery<T>(url ?? null, () =>
    apiClient.getByUrl<T>(url as string),
  );
}

export default useResource;
