/**
 * MoveRow
 * List row that lazily loads the move to show type, class, power and PP
 */

import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Text, TypeBadge } from '@/components/atoms';
import { ListItem } from '@/components/molecules';
import { DAMAGE_CLASS_COLORS } from '@/constants/pokemonTypes';
import { useResource } from '@/hooks/useResource';
import type { IndexedResource } from '@/hooks/useResourceIndex';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { Move } from '@/types/pokeapi';
import { formatName, formatNullable } from '@/utils/formatters';

interface MoveRowProps {
  item: IndexedResource;
  onPress: (item: IndexedResource) => void;
}

function MoveRow({ item, onPress }: MoveRowProps) {
  const { data } = useResource<Move>('move', item.id);

  return (
    <ListItem
      title={formatName(item.name)}
      subtitle={
        data
          ? `Power ${formatNullable(data.power)} · Acc ${formatNullable(
              data.accuracy,
              '%',
            )} · PP ${formatNullable(data.pp)}`
          : ' '
      }
      trailing={
        data ? (
          <View style={styles.badges}>
            <TypeBadge type={data.type.name} size="sm" />
            <Badge
              label={formatName(data.damage_class.name)}
              size="sm"
              backgroundColor={DAMAGE_CLASS_COLORS[data.damage_class.name]}
              textColor={colors.white}
            />
          </View>
        ) : (
          <Text variant="caption">…</Text>
        )
      }
      onPress={() => onPress(item)}
    />
  );
}

export default memo(MoveRow);

const styles = StyleSheet.create({
  badges: {
    alignItems: 'flex-end',
    gap: spacing.xxs,
  },
});
