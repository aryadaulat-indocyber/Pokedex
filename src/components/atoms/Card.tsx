/**
 * Card Component
 * Elevated surface container, optionally pressable
 */

import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '@/styles/colors';
import { borderRadius, elevation, spacing } from '@/styles/spacing';

export interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  backgroundColor?: string;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export default function Card({
  children,
  onPress,
  backgroundColor = colors.surface,
  padded = true,
  style,
  accessibilityLabel,
}: CardProps) {
  const cardStyle = [
    styles.card,
    padded && styles.padded,
    { backgroundColor },
    style,
  ];

  if (!onPress) {
    return <View style={cardStyle}>{children}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    ...elevation.sm,
  },
  padded: {
    padding: spacing.md,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
