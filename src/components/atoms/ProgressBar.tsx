/**
 * ProgressBar Component
 * Horizontal bar showing value relative to max
 */

import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@/styles/colors';
import { borderRadius } from '@/styles/spacing';

export interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export default function ProgressBar({
  value,
  max,
  color = colors.primaryDefault,
  height = 6,
  style,
}: ProgressBarProps) {
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  return (
    <View
      style={[styles.track, { height }, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
    >
      <View
        style={[
          styles.fill,
          { width: `${ratio * 100}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray200,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
