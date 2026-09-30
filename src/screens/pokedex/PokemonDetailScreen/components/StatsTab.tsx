/**
 * StatsTab
 * Base stats, EV yield and type defenses
 */

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Text } from '@/components/atoms';
import { SectionHeader, StatBar } from '@/components/molecules';
import { TypeDefenses } from '@/components/organisms';
import type { ResourceKey } from '@/config/resourceRegistry';
import {
  MAX_BASE_STAT,
  STAT_COLORS,
  STAT_SHORT_NAMES,
} from '@/constants/pokemonTypes';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { Pokemon } from '@/types/pokeapi';

interface StatsTabProps {
  pokemon: Pokemon;
  openResource: (resource: ResourceKey, idOrName: string | number) => void;
}

export default function StatsTab({ pokemon, openResource }: StatsTabProps) {
  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const evYield = pokemon.stats
    .filter(s => s.effort > 0)
    .map(s => `${s.effort} ${STAT_SHORT_NAMES[s.stat.name] ?? s.stat.name}`)
    .join(', ');

  return (
    <View>
      <SectionHeader title="Base stats" />
      <Card>
        {pokemon.stats.map(s => (
          <Pressable
            key={s.stat.name}
            onPress={() => openResource('stat', s.stat.name)}
            accessibilityRole="button"
          >
            <StatBar
              label={STAT_SHORT_NAMES[s.stat.name] ?? s.stat.name}
              value={s.base_stat}
              max={MAX_BASE_STAT}
              color={STAT_COLORS[s.stat.name]}
            />
          </Pressable>
        ))}
        <View style={styles.total}>
          <Text variant="label">Total</Text>
          <Text variant="title">{total}</Text>
        </View>
      </Card>

      <SectionHeader title="EV yield" />
      <Text variant="body" color={colors.textSecondary}>
        {evYield || 'None'}
      </Text>

      <SectionHeader title="Type defenses" />
      <Card>
        <TypeDefenses
          types={pokemon.types.map(t => t.type.name)}
          onPressType={type => openResource('type', type)}
        />
      </Card>

      {pokemon.past_types.length ? (
        <>
          <SectionHeader title="Past types" />
          {pokemon.past_types.map(p => (
            <Text key={p.generation.name} variant="bodySm">
              Until {p.generation.name}:{' '}
              {p.types.map(t => t.type.name).join(' / ')}
            </Text>
          ))}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
