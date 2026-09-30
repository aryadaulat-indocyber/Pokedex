/**
 * Resource Registry
 * Single source of truth describing every PokeAPI v2 resource the app
 * exposes. Used by the "Library" feature to browse any endpoint.
 */

import type { IconName } from '@/components/atoms/Icon';

export type ResourceGroupKey =
  | 'pokemon'
  | 'moves'
  | 'items'
  | 'berries'
  | 'locations'
  | 'games'
  | 'evolution'
  | 'encounters'
  | 'contests'
  | 'machines'
  | 'utility';

export type ResourceKey =
  // Berries
  | 'berry'
  | 'berry-firmness'
  | 'berry-flavor'
  // Contests
  | 'contest-type'
  | 'contest-effect'
  | 'super-contest-effect'
  // Encounters
  | 'encounter-method'
  | 'encounter-condition'
  | 'encounter-condition-value'
  // Evolution
  | 'evolution-chain'
  | 'evolution-trigger'
  | 'evolution-variable'
  // Games
  | 'generation'
  | 'pokedex'
  | 'version'
  | 'version-group'
  // Items
  | 'item'
  | 'item-attribute'
  | 'item-category'
  | 'item-fling-effect'
  | 'item-pocket'
  // Locations
  | 'location'
  | 'location-area'
  | 'pal-park-area'
  | 'region'
  // Machines
  | 'machine'
  // Moves
  | 'move'
  | 'move-ailment'
  | 'move-battle-style'
  | 'move-category'
  | 'move-damage-class'
  | 'move-learn-method'
  | 'move-target'
  // Pokémon
  | 'ability'
  | 'characteristic'
  | 'egg-group'
  | 'gender'
  | 'growth-rate'
  | 'nature'
  | 'pokeathlon-stat'
  | 'pokemon'
  | 'pokemon-color'
  | 'pokemon-form'
  | 'pokemon-habitat'
  | 'pokemon-shape'
  | 'pokemon-species'
  | 'stat'
  | 'type'
  // Utility
  | 'language'
  | 'currency';

export interface ResourceGroup {
  key: ResourceGroupKey;
  title: string;
  icon: IconName;
}

export interface ResourceDefinition {
  key: ResourceKey;
  title: string;
  group: ResourceGroupKey;
  description: string;
  /** false when the list endpoint returns APIResource (no name) */
  named: boolean;
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  { key: 'pokemon', title: 'Pokémon', icon: 'pokeball' },
  { key: 'moves', title: 'Moves', icon: 'lightning' },
  { key: 'items', title: 'Items', icon: 'bag' },
  { key: 'berries', title: 'Berries', icon: 'berry' },
  { key: 'locations', title: 'Locations', icon: 'map' },
  { key: 'games', title: 'Games', icon: 'gamepad' },
  { key: 'evolution', title: 'Evolution', icon: 'evolution' },
  { key: 'encounters', title: 'Encounters', icon: 'grass' },
  { key: 'contests', title: 'Contests', icon: 'trophy' },
  { key: 'machines', title: 'Machines', icon: 'disc' },
  { key: 'utility', title: 'Utility', icon: 'globe' },
];

export const RESOURCES: ResourceDefinition[] = [
  // ===== Pokémon =====
  {
    key: 'pokemon',
    title: 'Pokémon',
    group: 'pokemon',
    named: true,
    description: 'Individual Pokémon with stats, moves, abilities and sprites.',
  },
  {
    key: 'pokemon-species',
    title: 'Species',
    group: 'pokemon',
    named: true,
    description: 'Shared species data: flavor text, breeding, evolution chain.',
  },
  {
    key: 'pokemon-form',
    title: 'Forms',
    group: 'pokemon',
    named: true,
    description: 'Cosmetic and battle forms of Pokémon.',
  },
  {
    key: 'ability',
    title: 'Abilities',
    group: 'pokemon',
    named: true,
    description: 'Passive effects Pokémon have in battle or overworld.',
  },
  {
    key: 'type',
    title: 'Types',
    group: 'pokemon',
    named: true,
    description: 'Elemental types and their damage relations.',
  },
  {
    key: 'stat',
    title: 'Stats',
    group: 'pokemon',
    named: true,
    description: 'Battle stats like HP, Attack and Speed.',
  },
  {
    key: 'nature',
    title: 'Natures',
    group: 'pokemon',
    named: true,
    description: 'Natures that raise one stat and lower another.',
  },
  {
    key: 'characteristic',
    title: 'Characteristics',
    group: 'pokemon',
    named: false,
    description: 'Hints about a Pokémon’s highest IV.',
  },
  {
    key: 'egg-group',
    title: 'Egg Groups',
    group: 'pokemon',
    named: true,
    description: 'Breeding compatibility groups.',
  },
  {
    key: 'gender',
    title: 'Genders',
    group: 'pokemon',
    named: true,
    description: 'Gender distribution of species.',
  },
  {
    key: 'growth-rate',
    title: 'Growth Rates',
    group: 'pokemon',
    named: true,
    description: 'Experience curves for leveling.',
  },
  {
    key: 'pokeathlon-stat',
    title: 'Pokéathlon Stats',
    group: 'pokemon',
    named: true,
    description: 'Stats used in the Pokéathlon.',
  },
  {
    key: 'pokemon-color',
    title: 'Colors',
    group: 'pokemon',
    named: true,
    description: 'Pokédex search colors.',
  },
  {
    key: 'pokemon-habitat',
    title: 'Habitats',
    group: 'pokemon',
    named: true,
    description: 'Where species can be found.',
  },
  {
    key: 'pokemon-shape',
    title: 'Shapes',
    group: 'pokemon',
    named: true,
    description: 'Body shapes used for Pokédex search.',
  },

  // ===== Moves =====
  {
    key: 'move',
    title: 'Moves',
    group: 'moves',
    named: true,
    description: 'Skills Pokémon use in battle.',
  },
  {
    key: 'move-ailment',
    title: 'Ailments',
    group: 'moves',
    named: true,
    description: 'Status conditions caused by moves.',
  },
  {
    key: 'move-battle-style',
    title: 'Battle Styles',
    group: 'moves',
    named: true,
    description: 'Styles used in the Battle Palace.',
  },
  {
    key: 'move-category',
    title: 'Categories',
    group: 'moves',
    named: true,
    description: 'Loose groupings of move effects.',
  },
  {
    key: 'move-damage-class',
    title: 'Damage Classes',
    group: 'moves',
    named: true,
    description: 'Physical, special or status.',
  },
  {
    key: 'move-learn-method',
    title: 'Learn Methods',
    group: 'moves',
    named: true,
    description: 'How Pokémon learn moves.',
  },
  {
    key: 'move-target',
    title: 'Targets',
    group: 'moves',
    named: true,
    description: 'Which Pokémon a move targets.',
  },

  // ===== Items =====
  {
    key: 'item',
    title: 'Items',
    group: 'items',
    named: true,
    description: 'Objects the player can pick up and use.',
  },
  {
    key: 'item-attribute',
    title: 'Attributes',
    group: 'items',
    named: true,
    description: 'Properties such as “holdable” or “consumable”.',
  },
  {
    key: 'item-category',
    title: 'Categories',
    group: 'items',
    named: true,
    description: 'Bag groupings of items.',
  },
  {
    key: 'item-fling-effect',
    title: 'Fling Effects',
    group: 'items',
    named: true,
    description: 'Effects when an item is Flung.',
  },
  {
    key: 'item-pocket',
    title: 'Pockets',
    group: 'items',
    named: true,
    description: 'Bag pockets that store items.',
  },

  // ===== Berries =====
  {
    key: 'berry',
    title: 'Berries',
    group: 'berries',
    named: true,
    description: 'Small fruits with various battle effects.',
  },
  {
    key: 'berry-firmness',
    title: 'Firmness',
    group: 'berries',
    named: true,
    description: 'How hard or soft berries are.',
  },
  {
    key: 'berry-flavor',
    title: 'Flavors',
    group: 'berries',
    named: true,
    description: 'Flavors that affect Pokéblocks and natures.',
  },

  // ===== Locations =====
  {
    key: 'region',
    title: 'Regions',
    group: 'locations',
    named: true,
    description: 'Organized areas of the Pokémon world.',
  },
  {
    key: 'location',
    title: 'Locations',
    group: 'locations',
    named: true,
    description: 'Towns, routes and dungeons.',
  },
  {
    key: 'location-area',
    title: 'Location Areas',
    group: 'locations',
    named: true,
    description: 'Sub-areas with wild Pokémon encounters.',
  },
  {
    key: 'pal-park-area',
    title: 'Pal Park Areas',
    group: 'locations',
    named: true,
    description: 'Areas of the Pal Park.',
  },

  // ===== Games =====
  {
    key: 'generation',
    title: 'Generations',
    group: 'games',
    named: true,
    description: 'Groupings of games by Pokémon introduced.',
  },
  {
    key: 'pokedex',
    title: 'Pokédexes',
    group: 'games',
    named: true,
    description: 'Regional and national Pokédexes.',
  },
  {
    key: 'version',
    title: 'Versions',
    group: 'games',
    named: true,
    description: 'Individual game versions.',
  },
  {
    key: 'version-group',
    title: 'Version Groups',
    group: 'games',
    named: true,
    description: 'Games that share mechanics.',
  },

  // ===== Evolution =====
  {
    key: 'evolution-chain',
    title: 'Evolution Chains',
    group: 'evolution',
    named: false,
    description: 'Family trees of evolving Pokémon.',
  },
  {
    key: 'evolution-trigger',
    title: 'Evolution Triggers',
    group: 'evolution',
    named: true,
    description: 'Events that cause evolution.',
  },
  {
    key: 'evolution-variable',
    title: 'Evolution Variables',
    group: 'evolution',
    named: true,
    description: 'Hidden values that influence evolution.',
  },

  // ===== Encounters =====
  {
    key: 'encounter-method',
    title: 'Encounter Methods',
    group: 'encounters',
    named: true,
    description: 'Ways to encounter wild Pokémon.',
  },
  {
    key: 'encounter-condition',
    title: 'Encounter Conditions',
    group: 'encounters',
    named: true,
    description: 'Conditions affecting wild encounters.',
  },
  {
    key: 'encounter-condition-value',
    title: 'Condition Values',
    group: 'encounters',
    named: true,
    description: 'Possible values of encounter conditions.',
  },

  // ===== Contests =====
  {
    key: 'contest-type',
    title: 'Contest Types',
    group: 'contests',
    named: true,
    description: 'Categories judged in contests.',
  },
  {
    key: 'contest-effect',
    title: 'Contest Effects',
    group: 'contests',
    named: false,
    description: 'Move effects in Pokémon Contests.',
  },
  {
    key: 'super-contest-effect',
    title: 'Super Contest Effects',
    group: 'contests',
    named: false,
    description: 'Move effects in Super Contests.',
  },

  // ===== Machines =====
  {
    key: 'machine',
    title: 'Machines',
    group: 'machines',
    named: false,
    description: 'TMs and HMs that teach moves.',
  },

  // ===== Utility =====
  {
    key: 'language',
    title: 'Languages',
    group: 'utility',
    named: true,
    description: 'Languages used for translations.',
  },
  {
    key: 'currency',
    title: 'Currencies',
    group: 'utility',
    named: true,
    description: 'In-game currencies.',
  },
];

const RESOURCE_MAP = RESOURCES.reduce(
  (acc, resource) => ({ ...acc, [resource.key]: resource }),
  {} as Record<ResourceKey, ResourceDefinition>,
);

export const getResourceDefinition = (key: ResourceKey): ResourceDefinition =>
  RESOURCE_MAP[key];

export const isResourceKey = (value: string): value is ResourceKey =>
  value in RESOURCE_MAP;

export const getResourcesByGroup = (
  group: ResourceGroupKey,
): ResourceDefinition[] => RESOURCES.filter(r => r.group === group);
