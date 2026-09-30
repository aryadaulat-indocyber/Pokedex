/**
 * ListItem Component
 * Row with optional leading element, title, subtitle and trailing text
 */

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { dimensions, spacing } from '@/styles/spacing';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
}

export default function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  showChevron = Boolean(onPress),
}: ListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.content}>
        <Text variant="subtitle" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="bodySm" color={colors.textSecondary} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {typeof trailing === 'string' ? (
        <Text variant="label">{trailing}</Text>
      ) : (
        trailing
      )}
      {showChevron ? (
        <Icon name="chevronRight" size={18} color={colors.gray400} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: dimensions.listItemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    gap: spacing.s,
  },
  pressed: {
    backgroundColor: colors.gray100,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});
