/**
 * Button Component
 * Primary / outline call-to-action button
 */

import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Text from './Text';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';

export type ButtonVariant = 'primary' | 'outline';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.outline,
        fullWidth && styles.fullWidth,
        (pressed || disabled) && styles.dimmed,
        style,
      ]}
    >
      <Text
        variant="subtitle"
        color={isPrimary ? colors.white : colors.primaryDefault}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  primary: {
    backgroundColor: colors.primaryDefault,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.primaryDefault,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  dimmed: {
    opacity: 0.6,
  },
});
