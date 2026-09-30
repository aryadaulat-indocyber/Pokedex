/**
 * PokeAPI Items Types
 * @see https://pokeapi.co/docs/v2#items-section
 */

import {
  APIResource,
  Description,
  Effect,
  GenerationGameIndex,
  MachineVersionDetail,
  Name,
  NamedAPIResource,
  VerboseEffect,
  VersionGroupFlavorText,
} from './common.types';

export interface ItemSprites {
  default: string | null;
}

export interface ItemHolderPokemonVersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

export interface ItemHolderPokemon {
  pokemon: NamedAPIResource;
  version_details: ItemHolderPokemonVersionDetail[];
}

export interface Item {
  id: number;
  name: string;
  cost: number;
  fling_power: number | null;
  fling_effect: NamedAPIResource | null;
  attributes: NamedAPIResource[];
  category: NamedAPIResource;
  effect_entries: VerboseEffect[];
  flavor_text_entries: VersionGroupFlavorText[];
  game_indices: GenerationGameIndex[];
  names: Name[];
  sprites: ItemSprites;
  held_by_pokemon: ItemHolderPokemon[];
  baby_trigger_for: APIResource | null;
  machines: MachineVersionDetail[];
}

export interface ItemAttribute {
  id: number;
  name: string;
  items: NamedAPIResource[];
  names: Name[];
  descriptions: Description[];
}

export interface ItemCategory {
  id: number;
  name: string;
  items: NamedAPIResource[];
  names: Name[];
  pocket: NamedAPIResource;
}

export interface ItemFlingEffect {
  id: number;
  name: string;
  effect_entries: Effect[];
  items: NamedAPIResource[];
}

export interface ItemPocket {
  id: number;
  name: string;
  categories: NamedAPIResource[];
  names: Name[];
}
