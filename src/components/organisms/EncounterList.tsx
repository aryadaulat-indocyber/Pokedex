/**
 * EncounterList Component
 * Where / how a Pokémon can be encountered (per location area & version)
 */

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Badge, Card, Icon, Text } from '@/components/atoms';
import { StateView } from '@/components/molecules';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { NamedAPIResource, VersionEncounterDetail } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';

export interface EncounterEntry {
  /** Location area (for Pokémon) or Pokémon (for a location area) */
  subject: NamedAPIResource;
  version_details: VersionEncounterDetail[];
}

export interface EncounterListProps {
  encounters: EncounterEntry[];
  onPressSubject?: (subject: NamedAPIResource) => void;
  emptyText?: string;
}

const summarize = (detail: VersionEncounterDetail): string => {
  const methods = new Set(
    detail.encounter_details.map(e => formatName(e.method.name)),
  );
  const min = Math.min(...detail.encounter_details.map(e => e.min_level));
  const max = Math.max(...detail.encounter_details.map(e => e.max_level));
  const levels = min === max ? `Lv ${min}` : `Lv ${min}-${max}`;
  return `${Array.from(methods).join(', ')} · ${levels} · ${
    detail.max_chance
  }%`;
};

export default function EncounterList({
  encounters,
  onPressSubject,
  emptyText = 'Not found in the wild',
}: EncounterListProps) {
  if (!encounters.length) {
    return <StateView icon="grass" title={emptyText} />;
  }

  return (
    <View style={styles.container}>
      {encounters.map(entry => (
        <Card key={entry.subject.name} style={styles.card}>
          <Pressable
            onPress={
              onPressSubject ? () => onPressSubject(entry.subject) : undefined
            }
            disabled={!onPressSubject}
            accessibilityRole="button"
            style={styles.header}
          >
            <Text variant="subtitle" style={styles.title}>
              {formatName(entry.subject.name)}
            </Text>
            {onPressSubject ? (
              <Icon name="chevronRight" size={16} color={colors.gray400} />
            ) : null}
          </Pressable>
          {entry.version_details.map(detail => (
            <View key={detail.version.name} style={styles.version}>
              <Badge label={formatName(detail.version.name)} size="sm" />
              <Text variant="caption" style={styles.summary}>
                {summarize(detail)}
              </Text>
            </View>
          ))}
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  card: {
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    flex: 1,
  },
  version: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  summary: {
    flex: 1,
  },
});
