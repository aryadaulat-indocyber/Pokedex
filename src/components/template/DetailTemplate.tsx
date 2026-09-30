/**
 * DetailTemplate Component
 * Layout for detail screens: colored hero section + rounded content sheet
 */

import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';

export interface DetailTemplateProps {
  heroColor?: string;
  hero?: React.ReactNode;
  children: React.ReactNode;
}

export default function DetailTemplate({
  heroColor = colors.primaryDefault,
  hero,
  children,
}: DetailTemplateProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: heroColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={heroColor} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hero ? <View style={styles.hero}>{hero}</View> : null}
        <View
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xl }]}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  sheet: {
    flexGrow: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
});
