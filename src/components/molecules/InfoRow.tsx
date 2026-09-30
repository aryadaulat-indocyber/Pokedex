/**
 * InfoRow Component
 * Label / value pair, optionally tappable (links to another resource)
 */

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
  onPress?: () => void;
}

export default function InfoRow({ label, value, onPress }: InfoRowProps) {
  const content = (
    <View style={styles.container}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
      <View style={styles.value}>
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text
            variant="body"
            align="right"
            color={onPress ? colors.accent : colors.textPrimary}
          >
            {value}
          </Text>
        ) : (
          value
        )}
      </View>
      {onPress ? (
        <Icon name="chevronRight" size={16} color={colors.gray500} />
      ) : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => pressed && styles.pressed}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  label: {
    width: 120,
  },
  value: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pressed: {
    opacity: 0.6,
  },
});
