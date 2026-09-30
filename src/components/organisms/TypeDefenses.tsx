/**
 * TypeDefenses Component
 * Fetches each of a Pokémon's types and shows combined damage multipliers
 */

import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Loading, Text, TypeBadge } from '@/components/atoms';
import { useApiQuery } from '@/hooks/useApiQuery';
import pokemonService from '@/services/pokemon/pokemonService';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import {
  calculateDefensiveEffectiveness,
  formatMultiplier,
  groupEffectiveness,
} from '@/utils/typeEffectiveness';

export interface TypeDefensesProps {
  types: string[];
  onPressType?: (type: string) => void;
}

export default function TypeDefenses({
  types,
  onPressType,
}: TypeDefensesProps) {
  const { data, isLoading } = useApiQuery(
    types.length ? `type-defenses:${types.join(',')}` : null,
    () => Promise.all(types.map(type => pokemonService.type.get(type))),
  );

  const groups = useMemo(
    () =>
      data
        ? groupEffectiveness(
            calculateDefensiveEffectiveness(data.map(t => t.damage_relations)),
          )
        : [],
    [data],
  );

  if (isLoading && !data) {
    return <Loading size="small" />;
  }

  return (
    <View style={styles.container}>
      {groups.map(group => (
        <View key={group.multiplier} style={styles.row}>
          <Text
            variant="subtitle"
            color={group.multiplier > 1 ? colors.error : colors.success}
            style={styles.multiplier}
          >
            {formatMultiplier(group.multiplier)}
          </Text>
          <View style={styles.badges}>
            {group.types.map(type => (
              <TypeBadge
                key={type}
                type={type}
                size="sm"
                onPress={onPressType ? () => onPressType(type) : undefined}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  multiplier: {
    width: 36,
  },
  badges: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
