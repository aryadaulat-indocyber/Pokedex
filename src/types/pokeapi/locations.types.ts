/**
 * PokeAPI Locations Types
 * @see https://pokeapi.co/docs/v2#locations-section
 */

import {
  GenerationGameIndex,
  Name,
  NamedAPIResource,
  VersionEncounterDetail,
} from './common.types';

export interface Location {
  id: number;
  name: string;
  region: NamedAPIResource | null;
  names: Name[];
  game_indices: GenerationGameIndex[];
  areas: NamedAPIResource[];
}

export interface EncounterVersionDetails {
  rate: number;
  version: NamedAPIResource;
}

export interface EncounterMethodRate {
  encounter_method: NamedAPIResource;
  version_details: EncounterVersionDetails[];
}

export interface PokemonEncounter {
  pokemon: NamedAPIResource;
  version_details: VersionEncounterDetail[];
}

export interface LocationArea {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: NamedAPIResource;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface PalParkEncounterSpecies {
  base_score: number;
  rate: number;
  pokemon_species: NamedAPIResource;
}

export interface PalParkArea {
  id: number;
  name: string;
  names: Name[];
  pokemon_encounters: PalParkEncounterSpecies[];
}

export interface Region {
  id: number;
  name: string;
  locations: NamedAPIResource[];
  names: Name[];
  main_generation: NamedAPIResource | null;
  pokedexes: NamedAPIResource[];
  version_groups: NamedAPIResource[];
}
