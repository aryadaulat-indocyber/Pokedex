/**
 * PokeAPI Encounters Types
 * @see https://pokeapi.co/docs/v2#encounters-section
 */

import { Name, NamedAPIResource } from './common.types';

export interface EncounterMethod {
  id: number;
  name: string;
  order: number;
  names: Name[];
}

export interface EncounterCondition {
  id: number;
  name: string;
  names: Name[];
  values: NamedAPIResource[];
}

export interface EncounterConditionValue {
  id: number;
  name: string;
  condition: NamedAPIResource;
  names: Name[];
}
