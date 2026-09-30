/**
 * ScreenHeader Component
 * Large title header used by bottom tab screens
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

export default function ScreenHeader({
  title,
  subtitle,
  right,
  children,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.titles}>
          <Text variant="h1" accessibilityRole="header">
            {title}
          </Text>
          {subtitle ? (
            <Text variant="bodySm" color={colors.textSecondary}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {right}
      </View>
      {children ? <View style={styles.children}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.s,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titles: {
    flex: 1,
  },
  children: {
    marginTop: spacing.s,
    gap: spacing.s,
  },
});
