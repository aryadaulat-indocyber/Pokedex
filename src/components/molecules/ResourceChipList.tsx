/**
 * ResourceChipList Component
 * Wrapping list of tappable chips for NamedAPIResource arrays
 * (e.g. "learned by", "egg groups", "items in category")
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { NamedAPIResource } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';

export interface ResourceChipListProps {
  items: NamedAPIResource[];
  onPressItem?: (item: NamedAPIResource) => void;
  /** Max chips before "Show all" */
  limit?: number;
  emptyText?: string;
  getLabel?: (item: NamedAPIResource) => string;
}

export default function ResourceChipList({
  items,
  onPressItem,
  limit = 24,
  emptyText = 'None',
  getLabel = item => formatName(item.name),
}: ResourceChipListProps) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) {
    return (
      <Text variant="bodySm" color={colors.textSecondary}>
        {emptyText}
      </Text>
    );
  }

  const visible = expanded ? items : items.slice(0, limit);
  const hidden = items.length - visible.length;

  return (
    <View style={styles.container}>
      {visible.map(item => (
        <Chip
          key={`${item.name}-${item.url}`}
          label={getLabel(item)}
          onPress={onPressItem ? () => onPressItem(item) : undefined}
        />
      ))}
      {hidden > 0 ? (
        <Chip
          label={`+${hidden} more`}
          selected
          onPress={() => setExpanded(true)}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
