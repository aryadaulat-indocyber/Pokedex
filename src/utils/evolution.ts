/**
 * Evolution Helpers
 * Turn evolution_details into readable requirement text
 */

import { ChainLink, EvolutionDetail } from '@/types/pokeapi';
import { formatName } from './formatters';

const RELATIVE_STATS: Record<number, string> = {
  1: 'Attack > Defense',
  0: 'Attack = Defense',
  [-1]: 'Attack < Defense',
};

export const describeEvolutionDetail = (detail: EvolutionDetail): string => {
  const parts: string[] = [];
  const trigger = detail.trigger?.name;

  if (trigger === 'level-up') {
    parts.push(detail.min_level ? `Lv. ${detail.min_level}` : 'Level up');
  } else if (trigger === 'use-item' && detail.item) {
    parts.push(`Use ${formatName(detail.item.name)}`);
  } else if (trigger === 'trade') {
    parts.push('Trade');
  } else if (trigger) {
    parts.push(formatName(trigger));
  }

  if (detail.item && trigger !== 'use-item') {
    parts.push(`with ${formatName(detail.item.name)}`);
  }
  if (detail.held_item) {
    parts.push(`holding ${formatName(detail.held_item.name)}`);
  }
  if (detail.known_move) {
    parts.push(`knowing ${formatName(detail.known_move.name)}`);
  }
  if (detail.known_move_type) {
    parts.push(`knowing a ${formatName(detail.known_move_type.name)} move`);
  }
  if (detail.min_happiness) {
    parts.push(`happiness ≥ ${detail.min_happiness}`);
  }
  if (detail.min_affection) {
    parts.push(`affection ≥ ${detail.min_affection}`);
  }
  if (detail.min_beauty) {
    parts.push(`beauty ≥ ${detail.min_beauty}`);
  }
  if (detail.location) {
    parts.push(`at ${formatName(detail.location.name)}`);
  }
  if (detail.time_of_day) {
    parts.push(`(${detail.time_of_day})`);
  }
  if (detail.gender === 1) {
    parts.push('(female)');
  } else if (detail.gender === 2) {
    parts.push('(male)');
  }
  if (detail.needs_overworld_rain) {
    parts.push('while raining');
  }
  if (detail.party_species) {
    parts.push(`with ${formatName(detail.party_species.name)} in party`);
  }
  if (detail.party_type) {
    parts.push(`with a ${formatName(detail.party_type.name)} type in party`);
  }
  if (
    detail.relative_physical_stats !== null &&
    detail.relative_physical_stats !== undefined
  ) {
    parts.push(`(${RELATIVE_STATS[detail.relative_physical_stats]})`);
  }
  if (detail.trade_species) {
    parts.push(`for ${formatName(detail.trade_species.name)}`);
  }
  if (detail.turn_upside_down) {
    parts.push('holding console upside down');
  }

  return parts.join(' ');
};

export const describeEvolution = (link: ChainLink): string =>
  link.evolution_details.map(describeEvolutionDetail).join(' / ');

/**
 * Count every species in a chain (used to decide layout)
 */
export const countChainSpecies = (link: ChainLink): number =>
  1 + link.evolves_to.reduce((sum, next) => sum + countChainSpecies(next), 0);
