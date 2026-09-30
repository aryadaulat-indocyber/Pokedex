/**
 * WorldScreen constants
 */

import type { ResourceKey } from '@/config/resourceRegistry';

export type WorldSegment = 'regions' | 'generations' | 'games' | 'pokedexes';

export const WORLD_SEGMENTS: {
  key: WorldSegment;
  label: string;
  resource: ResourceKey;
}[] = [
  { key: 'regions', label: 'Regions', resource: 'region' },
  { key: 'generations', label: 'Generations', resource: 'generation' },
  { key: 'games', label: 'Games', resource: 'version-group' },
  { key: 'pokedexes', label: 'Pokédexes', resource: 'pokedex' },
];
