/**
 * FlavorTextCard Component
 * Quoted description text with its source (version / version group)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';
import { cleanFlavorText, formatName } from '@/utils/formatters';

export interface FlavorTextCardProps {
  text?: string | null;
  source?: string;
  accentColor?: string;
}

export default function FlavorTextCard({
  text,
  source,
  accentColor = colors.primaryDefault,
}: FlavorTextCardProps) {
  if (!text) {
    return null;
  }
  return (
    <View style={[styles.container, { borderLeftColor: accentColor }]}>
      <Text variant="body">{cleanFlavorText(text)}</Text>
      {source ? (
        <Text variant="caption" style={styles.source}>
          — {formatName(source)}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderLeftWidth: 4,
    borderRadius: borderRadius.md,
    padding: spacing.s,
  },
  source: {
    marginTop: spacing.xs,
  },
});
