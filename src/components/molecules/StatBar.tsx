/**
 * StatBar Component
 * Stat label + numeric value + progress bar
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color?: string;
  suffix?: string;
}

export default function StatBar({
  label,
  value,
  max,
  color = colors.primaryDefault,
  suffix,
}: StatBarProps) {
  return (
    <View style={styles.container} accessibilityLabel={`${label} ${value}`}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
      <Text variant="subtitle" style={styles.value}>
        {value}
      </Text>
      <ProgressBar value={value} max={max} color={color} />
      {suffix ? (
        <Text variant="caption" style={styles.suffix}>
          {suffix}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  label: {
    width: 44,
  },
  value: {
    width: 36,
    textAlign: 'right',
  },
  suffix: {
    width: 44,
    textAlign: 'right',
  },
});
