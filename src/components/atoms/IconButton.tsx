/**
 * IconButton Component
 * Round touchable icon
 */

import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Icon, { IconName } from './Icon';
import { colors } from '@/styles/colors';
import { borderRadius } from '@/styles/spacing';

export interface IconButtonProps {
  icon: IconName;
  onPress: () => void;
  color?: string;
  size?: number;
  filled?: boolean;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
}

export default function IconButton({
  icon,
  onPress,
  color = colors.textPrimary,
  size = 24,
  filled = false,
  accessibilityLabel,
  style,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Icon name={icon} size={size} color={color} filled={filled} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: borderRadius.full,
  },
  pressed: {
    opacity: 0.6,
  },
});
