/**
 * PokeAPI Machines Types
 * @see https://pokeapi.co/docs/v2#machines-section
 */

import { NamedAPIResource } from './common.types';

export interface Machine {
  id: number;
  item: NamedAPIResource;
  move: NamedAPIResource;
  version_group: NamedAPIResource;
}
