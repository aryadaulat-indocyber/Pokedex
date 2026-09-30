/**
 * SegmentedTabs Component
 * Horizontally scrollable tab switcher used inside screens
 */

import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';

export interface SegmentedTab<K extends string = string> {
  key: K;
  label: string;
}

export interface SegmentedTabsProps<K extends string = string> {
  tabs: SegmentedTab<K>[];
  activeKey: K;
  onChange: (key: K) => void;
  activeColor?: string;
}

export default function SegmentedTabs<K extends string = string>({
  tabs,
  activeKey,
  onChange,
  activeColor = colors.primaryDefault,
}: SegmentedTabsProps<K>) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {tabs.map(tab => {
          const active = tab.key === activeKey;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onChange(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              style={[styles.tab, active && { backgroundColor: activeColor }]}
            >
              <Text
                variant="label"
                color={active ? colors.white : colors.textSecondary}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 0,
  },
  container: {
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray100,
  },
});
