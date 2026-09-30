/**
 * FilterChipRow Component
 * Horizontal row of selectable chips with an "Any" option
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from '@/components/atoms';
import { spacing } from '@/styles/spacing';

export interface FilterOption {
  key: string;
  label: string;
  color?: string;
}

export interface FilterChipRowProps {
  options: FilterOption[];
  selected: string | null;
  onSelect: (key: string | null) => void;
  anyLabel: string;
}

export default function FilterChipRow({
  options,
  selected,
  onSelect,
  anyLabel,
}: FilterChipRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Chip
        label={anyLabel}
        selected={selected === null}
        onPress={() => onSelect(null)}
      />
      {options.map(option => (
        <Chip
          key={option.key}
          label={option.label}
          color={option.color}
          selected={selected === option.key}
          onPress={() => onSelect(selected === option.key ? null : option.key)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
});
