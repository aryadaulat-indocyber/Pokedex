/**
 * Loading Component
 * Activity indicator with optional message
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Text from './Text';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  /** Fill the parent and center the indicator */
  fullScreen?: boolean;
}

export default function Loading({
  message,
  size = 'large',
  color = colors.primaryDefault,
  fullScreen = false,
}: LoadingProps) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={color} />
      {message ? (
        <Text
          variant="bodySm"
          color={colors.textSecondary}
          style={styles.message}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
  },
  message: {
    marginTop: spacing.sm,
  },
});
