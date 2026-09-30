/**
 * PokeAPI Contests Types
 * @see https://pokeapi.co/docs/v2#contests-section
 */

import { Effect, FlavorText, NamedAPIResource } from './common.types';

export interface ContestName {
  name: string;
  color: string;
  language: NamedAPIResource;
}

export interface ContestType {
  id: number;
  name: string;
  berry_flavor: NamedAPIResource;
  names: ContestName[];
}

export interface ContestEffect {
  id: number;
  appeal: number;
  jam: number;
  effect_entries: Effect[];
  flavor_text_entries: FlavorText[];
}

export interface SuperContestEffect {
  id: number;
  appeal: number;
  flavor_text_entries: FlavorText[];
  moves: NamedAPIResource[];
}
