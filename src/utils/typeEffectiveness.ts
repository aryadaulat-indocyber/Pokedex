/**
 * Type Effectiveness
 * Computes defensive multipliers for a Pokémon from its types'
 * damage_relations (GET /type/{name}).
 */

import { POKEMON_TYPES } from '@/constants/pokemonTypes';
import { TypeRelations } from '@/types/pokeapi';

export type EffectivenessMap = Record<string, number>;

export interface EffectivenessGroup {
  multiplier: number;
  types: string[];
}

/**
 * Multiply the damage taken from each attacking type
 */
export const calculateDefensiveEffectiveness = (
  relations: TypeRelations[],
): EffectivenessMap => {
  const result: EffectivenessMap = {};
  POKEMON_TYPES.forEach(type => {
    result[type] = 1;
  });

  relations.forEach(relation => {
    relation.double_damage_from.forEach(({ name }) => {
      result[name] = (result[name] ?? 1) * 2;
    });
    relation.half_damage_from.forEach(({ name }) => {
      result[name] = (result[name] ?? 1) * 0.5;
    });
    relation.no_damage_from.forEach(({ name }) => {
      result[name] = 0;
    });
  });

  return result;
};

/**
 * Group attacking types by multiplier, excluding neutral (x1)
 */
export const groupEffectiveness = (
  map: EffectivenessMap,
): EffectivenessGroup[] => {
  const groups = new Map<number, string[]>();
  Object.entries(map).forEach(([type, multiplier]) => {
    if (multiplier === 1) {
      return;
    }
    groups.set(multiplier, [...(groups.get(multiplier) ?? []), type]);
  });
  return Array.from(groups.entries())
    .map(([multiplier, types]) => ({ multiplier, types }))
    .sort((a, b) => b.multiplier - a.multiplier);
};

export const formatMultiplier = (multiplier: number): string => {
  if (multiplier === 0.25) {
    return '¼×';
  }
  if (multiplier === 0.5) {
    return '½×';
  }
  return `${multiplier}×`;
};
