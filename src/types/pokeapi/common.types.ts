/**
 * PokeAPI Common Types
 * Shared models used across every PokeAPI resource
 * @see https://pokeapi.co/docs/v2#common-models
 */

export interface APIResource {
  url: string;
}

export interface NamedAPIResource extends APIResource {
  name: string;
}

/**
 * List item returned by any list endpoint.
 * Unnamed resources (characteristic, machine, evolution-chain, ...) have no name.
 */
export interface ResourceListItem extends APIResource {
  name?: string;
}

export interface ResourceList<T extends ResourceListItem = ResourceListItem> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type NamedAPIResourceList = ResourceList<NamedAPIResource>;
export type APIResourceList = ResourceList<APIResource>;

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface Description {
  description: string;
  language: NamedAPIResource;
}

export interface Effect {
  effect: string;
  language: NamedAPIResource;
}

export interface VerboseEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version?: NamedAPIResource;
}

export interface VersionGroupFlavorText {
  text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface GenerationGameIndex {
  game_index: number;
  generation: NamedAPIResource;
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface MachineVersionDetail {
  machine: APIResource;
  version_group: NamedAPIResource;
}

export interface Encounter {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[];
  chance: number;
  method: NamedAPIResource;
}

export interface VersionEncounterDetail {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: Encounter[];
}

export interface ListParams {
  offset?: number;
  limit?: number;
}
