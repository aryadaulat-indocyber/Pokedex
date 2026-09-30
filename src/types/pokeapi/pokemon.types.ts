/**
 * PokeAPI Pokémon Types
 * @see https://pokeapi.co/docs/v2#pokemon-section
 */

import {
  APIResource,
  Description,
  FlavorText,
  GenerationGameIndex,
  Name,
  NamedAPIResource,
  VerboseEffect,
  VersionEncounterDetail,
  VersionGameIndex,
} from './common.types';
import { AbilityEffectChange } from './moves.types';

// ===== Ability =====
export interface AbilityFlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface AbilityPokemon {
  is_hidden: boolean;
  slot: number;
  pokemon: NamedAPIResource;
}

export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NamedAPIResource;
  names: Name[];
  effect_entries: VerboseEffect[];
  effect_changes: AbilityEffectChange[];
  flavor_text_entries: AbilityFlavorText[];
  pokemon: AbilityPokemon[];
}

// ===== Characteristic =====
export interface Characteristic {
  id: number;
  gene_modulo: number;
  possible_values: number[];
  highest_stat: NamedAPIResource;
  descriptions: Description[];
}

// ===== Egg Group =====
export interface EggGroup {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: NamedAPIResource[];
}

// ===== Gender =====
export interface PokemonSpeciesGender {
  rate: number;
  pokemon_species: NamedAPIResource;
}

export interface Gender {
  id: number;
  name: string;
  pokemon_species_details: PokemonSpeciesGender[];
  required_for_evolution: NamedAPIResource[];
}

// ===== Growth Rate =====
export interface GrowthRateExperienceLevel {
  level: number;
  experience: number;
}

export interface GrowthRate {
  id: number;
  name: string;
  formula: string;
  descriptions: Description[];
  levels: GrowthRateExperienceLevel[];
  pokemon_species: NamedAPIResource[];
}

// ===== Nature =====
export interface NatureStatChange {
  max_change: number;
  pokeathlon_stat: NamedAPIResource;
}

export interface MoveBattleStylePreference {
  low_hp_preference: number;
  high_hp_preference: number;
  move_battle_style: NamedAPIResource;
}

export interface Nature {
  id: number;
  name: string;
  decreased_stat: NamedAPIResource | null;
  increased_stat: NamedAPIResource | null;
  hates_flavor: NamedAPIResource | null;
  likes_flavor: NamedAPIResource | null;
  pokeathlon_stat_changes: NatureStatChange[];
  move_battle_style_preferences: MoveBattleStylePreference[];
  names: Name[];
}

// ===== Pokeathlon Stat =====
export interface NaturePokeathlonStatAffect {
  max_change: number;
  nature: NamedAPIResource;
}

export interface PokeathlonStat {
  id: number;
  name: string;
  names: Name[];
  affecting_natures: {
    increase: NaturePokeathlonStatAffect[];
    decrease: NaturePokeathlonStatAffect[];
  };
}

// ===== Pokemon =====
export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonTypePast {
  generation: NamedAPIResource;
  types: PokemonType[];
}

export interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

export interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

export interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
  order?: number | null;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

export interface SpriteSet {
  front_default: string | null;
  front_shiny?: string | null;
  front_female?: string | null;
  front_shiny_female?: string | null;
  back_default?: string | null;
  back_shiny?: string | null;
  back_female?: string | null;
  back_shiny_female?: string | null;
}

export interface PokemonSprites extends SpriteSet {
  other?: {
    'official-artwork'?: SpriteSet;
    home?: SpriteSet;
    dream_world?: SpriteSet;
    showdown?: SpriteSet;
  };
  versions?: Record<string, Record<string, SpriteSet>>;
}

export interface PokemonCries {
  latest: string | null;
  legacy: string | null;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  cries?: PokemonCries;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
}

// ===== Pokemon Location Areas (/pokemon/{id}/encounters) =====
export interface LocationAreaEncounter {
  location_area: NamedAPIResource;
  version_details: VersionEncounterDetail[];
}

// ===== Pokemon Color / Habitat =====
export interface PokemonColor {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: NamedAPIResource[];
}

export interface PokemonHabitat {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: NamedAPIResource[];
}

// ===== Pokemon Form =====
export interface PokemonForm {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  pokemon: NamedAPIResource;
  types: PokemonType[];
  sprites: SpriteSet;
  version_group: NamedAPIResource;
  names: Name[];
  form_names: Name[];
}

// ===== Pokemon Shape =====
export interface AwesomeName {
  awesome_name: string;
  language: NamedAPIResource;
}

export interface PokemonShape {
  id: number;
  name: string;
  awesome_names: AwesomeName[];
  names: Name[];
  pokemon_species: NamedAPIResource[];
}

// ===== Pokemon Species =====
export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface PokemonSpeciesDexEntry {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface PalParkEncounterArea {
  base_score: number;
  rate: number;
  area: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number | null;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number | null;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResource;
  pokedex_numbers: PokemonSpeciesDexEntry[];
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource | null;
  evolves_from_species: NamedAPIResource | null;
  evolution_chain: APIResource | null;
  habitat: NamedAPIResource | null;
  generation: NamedAPIResource;
  names: Name[];
  pal_park_encounters: PalParkEncounterArea[];
  flavor_text_entries: FlavorText[];
  form_descriptions: Description[];
  genera: Genus[];
  varieties: PokemonSpeciesVariety[];
}

// ===== Stat =====
export interface MoveStatAffect {
  change: number;
  move: NamedAPIResource;
}

export interface Stat {
  id: number;
  name: string;
  game_index: number;
  is_battle_only: boolean;
  affecting_moves: {
    increase: MoveStatAffect[];
    decrease: MoveStatAffect[];
  };
  affecting_natures: {
    increase: NamedAPIResource[];
    decrease: NamedAPIResource[];
  };
  characteristics: APIResource[];
  move_damage_class: NamedAPIResource | null;
  names: Name[];
}

// ===== Type =====
export interface TypeRelations {
  no_damage_to: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  double_damage_from: NamedAPIResource[];
}

export interface TypeRelationsPast {
  generation: NamedAPIResource;
  damage_relations: TypeRelations;
}

export interface TypePokemon {
  slot: number;
  pokemon: NamedAPIResource;
}

export interface Type {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  past_damage_relations: TypeRelationsPast[];
  game_indices: GenerationGameIndex[];
  generation: NamedAPIResource;
  move_damage_class: NamedAPIResource | null;
  names: Name[];
  pokemon: TypePokemon[];
  moves: NamedAPIResource[];
}
