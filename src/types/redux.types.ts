/**
 * Redux Types
 * State shapes for every slice
 */

import type { ResourceKey } from '@/config/resourceRegistry';

/**
 * A bookmarked / recently viewed resource
 */
export interface SavedResource {
  /** `${resource}:${id}` */
  key: string;
  resource: ResourceKey;
  id: number;
  name: string;
  savedAt: string;
}

export interface FavoritesState {
  items: SavedResource[];
}

export interface HistoryState {
  items: SavedResource[];
}

export interface SettingsState {
  /** PokeAPI language name, e.g. "en", "ja", "fr" */
  language: string;
  showShiny: boolean;
}
