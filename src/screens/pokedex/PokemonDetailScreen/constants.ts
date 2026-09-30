/**
 * PokemonDetailScreen constants
 */

export type PokemonDetailTab =
  | 'about'
  | 'stats'
  | 'evolution'
  | 'moves'
  | 'locations'
  | 'forms';

export const POKEMON_DETAIL_TABS: { key: PokemonDetailTab; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'stats', label: 'Stats' },
  { key: 'evolution', label: 'Evolution' },
  { key: 'moves', label: 'Moves' },
  { key: 'locations', label: 'Locations' },
  { key: 'forms', label: 'Forms' },
];

/** Steps per egg cycle used by PokeAPI's hatch_counter */
export const STEPS_PER_EGG_CYCLE = 255;
