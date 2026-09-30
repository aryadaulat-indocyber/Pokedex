import {
  calculateDefensiveEffectiveness,
  formatMultiplier,
  groupEffectiveness,
} from '@/utils/typeEffectiveness';
import { NamedAPIResource, TypeRelations } from '@/types/pokeapi';

const r = (...names: string[]): NamedAPIResource[] =>
  names.map(name => ({ name, url: `https://pokeapi.co/api/v2/type/${name}/` }));

const empty: TypeRelations = {
  no_damage_to: [],
  half_damage_to: [],
  double_damage_to: [],
  no_damage_from: [],
  half_damage_from: [],
  double_damage_from: [],
};

// Simplified Grass + Poison (Bulbasaur)
const grass: TypeRelations = {
  ...empty,
  double_damage_from: r('fire', 'ice', 'poison', 'flying', 'bug'),
  half_damage_from: r('ground', 'water', 'grass', 'electric'),
};
const poison: TypeRelations = {
  ...empty,
  double_damage_from: r('ground', 'psychic'),
  half_damage_from: r('fighting', 'poison', 'bug', 'grass', 'fairy'),
};

describe('typeEffectiveness', () => {
  it('multiplies relations of dual types', () => {
    const map = calculateDefensiveEffectiveness([grass, poison]);
    expect(map.fire).toBe(2);
    expect(map.psychic).toBe(2);
    expect(map.grass).toBe(0.25);
    expect(map.ground).toBe(1); // 0.5 * 2
    expect(map.poison).toBe(1); // 2 * 0.5
    expect(map.normal).toBe(1);
  });

  it('applies immunities', () => {
    const ghost: TypeRelations = { ...empty, no_damage_from: r('normal', 'fighting') };
    const map = calculateDefensiveEffectiveness([ghost]);
    expect(map.normal).toBe(0);
  });

  it('groups non-neutral multipliers from high to low', () => {
    const groups = groupEffectiveness(calculateDefensiveEffectiveness([grass, poison]));
    expect(groups[0].multiplier).toBe(2);
    expect(groups[groups.length - 1].multiplier).toBe(0.25);
  });

  it('formats multipliers', () => {
    expect(formatMultiplier(0.25)).toBe('¼×');
    expect(formatMultiplier(0.5)).toBe('½×');
    expect(formatMultiplier(4)).toBe('4×');
  });
});
