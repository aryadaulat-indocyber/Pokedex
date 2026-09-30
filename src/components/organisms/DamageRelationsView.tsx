/**
 * DamageRelationsView Component
 * Offensive / defensive relations of a single type
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TypeBadge } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { TypeRelations } from '@/types/pokeapi';

export interface DamageRelationsViewProps {
  relations: TypeRelations;
  onPressType?: (type: string) => void;
}

const SECTIONS: { key: keyof TypeRelations; label: string; good: boolean }[] = [
  {
    key: 'double_damage_to',
    label: 'Super effective against (2×)',
    good: true,
  },
  {
    key: 'half_damage_to',
    label: 'Not very effective against (½×)',
    good: false,
  },
  { key: 'no_damage_to', label: 'No effect on (0×)', good: false },
  { key: 'double_damage_from', label: 'Weak to (2×)', good: false },
  { key: 'half_damage_from', label: 'Resists (½×)', good: true },
  { key: 'no_damage_from', label: 'Immune to (0×)', good: true },
];

export default function DamageRelationsView({
  relations,
  onPressType,
}: DamageRelationsViewProps) {
  return (
    <View style={styles.container}>
      {SECTIONS.map(section => {
        const types = relations[section.key];
        if (!types.length) {
          return null;
        }
        return (
          <View key={section.key} style={styles.section}>
            <Text
              variant="label"
              color={section.good ? colors.success : colors.error}
            >
              {section.label}
            </Text>
            <View style={styles.badges}>
              {types.map(type => (
                <TypeBadge
                  key={type.name}
                  type={type.name}
                  size="sm"
                  onPress={
                    onPressType ? () => onPressType(type.name) : undefined
                  }
                />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  section: {
    gap: spacing.xs,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
