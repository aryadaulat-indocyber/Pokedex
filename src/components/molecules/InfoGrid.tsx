/**
 * InfoGrid Component
 * Compact grid of highlighted numbers (height, weight, power, pp, ...)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export interface InfoGridItem {
  label: string;
  value: string | number;
}

export interface InfoGridProps {
  items: InfoGridItem[];
  accentColor?: string;
}

export default function InfoGrid({
  items,
  accentColor = colors.textPrimary,
}: InfoGridProps) {
  return (
    <Card style={styles.card}>
      {items.map((item, index) => (
        <View
          key={item.label}
          style={[styles.cell, index > 0 && styles.cellBorder]}
        >
          <Text variant="title" color={accentColor} align="center">
            {item.value}
          </Text>
          <Text variant="caption" align="center">
            {item.label}
          </Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xs,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    gap: spacing.xxs,
  },
  cellBorder: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: colors.border,
  },
});
