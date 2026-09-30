/**
 * API Configuration
 * Centralized configuration for every PokeAPI v2 endpoint
 * @see https://pokeapi.co/docs/v2
 */

/**
 * PokeAPI endpoints grouped by the sections of the official documentation
 */
export const POKE_API_ENDPOINTS = {
  // Berries
  BERRIES: {
    BERRY: 'berry',
    BERRY_FIRMNESS: 'berry-firmness',
    BERRY_FLAVOR: 'berry-flavor',
  },

  // Contests
  CONTESTS: {
    CONTEST_TYPE: 'contest-type',
    CONTEST_EFFECT: 'contest-effect',
    SUPER_CONTEST_EFFECT: 'super-contest-effect',
  },

  // Encounters
  ENCOUNTERS: {
    ENCOUNTER_METHOD: 'encounter-method',
    ENCOUNTER_CONDITION: 'encounter-condition',
    ENCOUNTER_CONDITION_VALUE: 'encounter-condition-value',
  },

  // Evolution
  EVOLUTION: {
    EVOLUTION_CHAIN: 'evolution-chain',
    EVOLUTION_TRIGGER: 'evolution-trigger',
    EVOLUTION_VARIABLE: 'evolution-variable',
  },

  // Games
  GAMES: {
    GENERATION: 'generation',
    POKEDEX: 'pokedex',
    VERSION: 'version',
    VERSION_GROUP: 'version-group',
  },

  // Items
  ITEMS: {
    ITEM: 'item',
    ITEM_ATTRIBUTE: 'item-attribute',
    ITEM_CATEGORY: 'item-category',
    ITEM_FLING_EFFECT: 'item-fling-effect',
    ITEM_POCKET: 'item-pocket',
  },

  // Locations
  LOCATIONS: {
    LOCATION: 'location',
    LOCATION_AREA: 'location-area',
    PAL_PARK_AREA: 'pal-park-area',
    REGION: 'region',
  },

  // Machines
  MACHINES: {
    MACHINE: 'machine',
  },

  // Moves
  MOVES: {
    MOVE: 'move',
    MOVE_AILMENT: 'move-ailment',
    MOVE_BATTLE_STYLE: 'move-battle-style',
    MOVE_CATEGORY: 'move-category',
    MOVE_DAMAGE_CLASS: 'move-damage-class',
    MOVE_LEARN_METHOD: 'move-learn-method',
    MOVE_TARGET: 'move-target',
  },

  // Pokémon
  POKEMON: {
    ABILITY: 'ability',
    CHARACTERISTIC: 'characteristic',
    EGG_GROUP: 'egg-group',
    GENDER: 'gender',
    GROWTH_RATE: 'growth-rate',
    NATURE: 'nature',
    POKEATHLON_STAT: 'pokeathlon-stat',
    POKEMON: 'pokemon',
    POKEMON_ENCOUNTERS: (idOrName: string | number) =>
      `pokemon/${idOrName}/encounters`,
    POKEMON_COLOR: 'pokemon-color',
    POKEMON_FORM: 'pokemon-form',
    POKEMON_HABITAT: 'pokemon-habitat',
    POKEMON_SHAPE: 'pokemon-shape',
    POKEMON_SPECIES: 'pokemon-species',
    STAT: 'stat',
    TYPE: 'type',
  },

  // Utility
  UTILITY: {
    LANGUAGE: 'language',
    CURRENCY: 'currency',
    META: 'meta',
  },
} as const;

/**
 * API request timeout configurations (in milliseconds)
 */
export const API_TIMEOUTS = {
  DEFAULT: 20000,
};

/**
 * API cache configuration
 * PokeAPI data is static, so responses are cached aggressively
 * (also requested by the PokeAPI fair use policy).
 */
export const API_CACHE_CONFIG = {
  ENABLED: true,
  DEFAULT_TTL: 1000 * 60 * 60, // 1 hour
  MAX_SIZE: 500,
};

/**
 * Pagination defaults
 */
export const API_PAGINATION = {
  PAGE_SIZE: 30,
  // Large enough to fetch every entry of the biggest list in a single request
  ALL: 100000,
};
