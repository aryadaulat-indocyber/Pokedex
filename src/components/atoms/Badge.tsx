/**
 * Badge Component
 * Small colored pill for labels such as types or damage classes
 */

import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Text from './Text';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
}

export default function Badge({
  label,
  backgroundColor = colors.gray200,
  textColor = colors.textPrimary,
  size = 'md',
  style,
}: BadgeProps) {
  return (
    <View
      style={[
        styles.container,
        size === 'sm' ? styles.small : styles.medium,
        { backgroundColor },
        style,
      ]}
    >
      <Text
        variant={size === 'sm' ? 'caption' : 'label'}
        color={textColor}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  medium: {
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
  },
});
