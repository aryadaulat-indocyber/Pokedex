/**
 * Custom Hooks Index
 * Export all custom hooks
 */

export { useApiQuery } from './useApiQuery';
export type { UseApiQueryResult } from './useApiQuery';

export { useResource, useResourceByUrl } from './useResource';

export { useResourceIndex } from './useResourceIndex';
export type { IndexedResource } from './useResourceIndex';

export { usePaginatedResource } from './usePaginatedResource';
export type { UsePaginatedResourceResult } from './usePaginatedResource';

export { useDebounce } from './useDebounce';
export { useFavorite } from './useFavorite';
export { useTrackHistory } from './useTrackHistory';
export { useLanguage } from './useLanguage';
export {
  useResourceNavigation,
  navigateToResource,
} from './useResourceNavigation';
export { useScreenHeader } from './useScreenHeader';
export type { ScreenHeaderOptions } from './useScreenHeader';
