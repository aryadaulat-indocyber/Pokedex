/**
 * PokedexScreen constants
 */

/** Ids above this are alternate forms (megas, regional, gmax, ...) */
export const MAX_SPECIES_ID = 10000;

export type PokedexMode = 'all' | 'favorites';

export const POKEDEX_MODES: { key: PokedexMode; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'favorites', label: 'Favorites' },
];
