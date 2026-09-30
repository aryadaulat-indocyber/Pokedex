/**
 * SectionHeader Component
 * Title for a content section with optional action
 */

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export interface SectionHeaderProps {
  title: string;
  count?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export default function SectionHeader({
  title,
  count,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text variant="title" accessibilityRole="header" style={styles.title}>
        {title}
        {count !== undefined ? (
          <Text variant="bodySm" color={colors.textSecondary}>
            {`  ${count}`}
          </Text>
        ) : null}
      </Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8} accessibilityRole="button">
          <Text variant="label" color={colors.primaryDefault}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
  },
});
