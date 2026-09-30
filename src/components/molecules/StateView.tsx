/**
 * StateView Component
 * Empty / error state with icon, message and optional action
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, IconName, Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export interface StateViewProps {
  icon?: IconName;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  fullScreen?: boolean;
}

export default function StateView({
  icon = 'pokeball',
  title,
  message,
  actionLabel,
  onAction,
  fullScreen = false,
}: StateViewProps) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <Icon name={icon} size={56} color={colors.gray300} />
      <Text variant="title" align="center" style={styles.title}>
        {title}
      </Text>
      {message ? (
        <Text variant="bodySm" align="center" color={colors.textSecondary}>
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="outline"
          style={styles.action}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  fullScreen: {
    flex: 1,
  },
  title: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  action: {
    marginTop: spacing.md,
  },
});
