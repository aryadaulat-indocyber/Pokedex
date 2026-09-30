/**
 * Pokémon Type Constants
 * Battle types and their brand colors
 */

export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export type PokemonTypeName = (typeof POKEMON_TYPES)[number];

export const TYPE_COLORS: Record<string, string> = {
  normal: '#9FA19F',
  fire: '#E62829',
  water: '#2980EF',
  electric: '#F4C21B',
  grass: '#3FA129',
  ice: '#3DCEF3',
  fighting: '#FF8000',
  poison: '#9141CB',
  ground: '#915121',
  flying: '#81B9EF',
  psychic: '#EF4179',
  bug: '#91A119',
  rock: '#AFA981',
  ghost: '#704170',
  dragon: '#5060E1',
  dark: '#624D4E',
  steel: '#60A1B8',
  fairy: '#EF70EF',
  stellar: '#40B5A5',
  unknown: '#68A090',
  shadow: '#403246',
};

export const getTypeColor = (type?: string | null): string =>
  (type && TYPE_COLORS[type]) || TYPE_COLORS.unknown;

export const DAMAGE_CLASS_COLORS: Record<string, string> = {
  physical: '#C92112',
  special: '#4F5870',
  status: '#8C888C',
};

export const STAT_COLORS: Record<string, string> = {
  hp: '#FF5959',
  attack: '#F5AC78',
  defense: '#FAE078',
  'special-attack': '#9DB7F5',
  'special-defense': '#A7DB8D',
  speed: '#FA92B2',
};

export const STAT_SHORT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'SPE',
  accuracy: 'ACC',
  evasion: 'EVA',
};

/** Highest base stat in the games, used to scale stat bars */
export const MAX_BASE_STAT = 255;
