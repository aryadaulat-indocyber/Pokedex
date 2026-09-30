/**
 * Chip Component
 * Selectable pill used for filters and resource links
 */

import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Text from './Text';
import { colors } from '@/styles/colors';
import { borderRadius, dimensions, spacing } from '@/styles/spacing';

export interface ChipProps {
  label: string;
  selected?: boolean;
  /** Color used when selected */
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Chip({
  label,
  selected = false,
  color = colors.primaryDefault,
  onPress,
  disabled = false,
  style,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      style={({ pressed }) => [
        styles.container,
        selected && { backgroundColor: color, borderColor: color },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text
        variant="label"
        color={selected ? colors.white : colors.textPrimary}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: dimensions.chipHeight,
    paddingHorizontal: spacing.s,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
