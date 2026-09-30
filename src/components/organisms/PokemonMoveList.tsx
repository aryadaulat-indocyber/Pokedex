/**
 * PokemonMoveList Component
 * Moves learnable by a Pokémon, filtered by version group and learn method
 */

import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Divider, Icon, Text } from '@/components/atoms';
import { SegmentedTabs, StateView } from '@/components/molecules';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { NamedAPIResource, PokemonMove } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';
import { getIdFromUrl } from '@/utils/resourceUrl';

export interface PokemonMoveListProps {
  moves: PokemonMove[];
  accentColor?: string;
  onPressMove: (move: NamedAPIResource) => void;
}

interface MoveRow {
  move: NamedAPIResource;
  level: number;
}

export default function PokemonMoveList({
  moves,
  accentColor = colors.primaryDefault,
  onPressMove,
}: PokemonMoveListProps) {
  // Every version group this Pokémon has moves in, newest first
  const versionGroups = useMemo(() => {
    const map = new Map<string, NamedAPIResource>();
    moves.forEach(m =>
      m.version_group_details.forEach(d =>
        map.set(d.version_group.name, d.version_group),
      ),
    );
    return Array.from(map.values()).sort(
      (a, b) => getIdFromUrl(b.url) - getIdFromUrl(a.url),
    );
  }, [moves]);

  const [versionGroup, setVersionGroup] = useState<string | undefined>(
    versionGroups[0]?.name,
  );
  const activeVersionGroup = versionGroup ?? versionGroups[0]?.name;

  // Learn methods available in the selected version group
  const grouped = useMemo(() => {
    const result = new Map<string, MoveRow[]>();
    moves.forEach(m => {
      m.version_group_details
        .filter(d => d.version_group.name === activeVersionGroup)
        .forEach(d => {
          const method = d.move_learn_method.name;
          result.set(method, [
            ...(result.get(method) ?? []),
            { move: m.move, level: d.level_learned_at },
          ]);
        });
    });
    result.forEach(rows =>
      rows.sort(
        (a, b) => a.level - b.level || a.move.name.localeCompare(b.move.name),
      ),
    );
    return result;
  }, [moves, activeVersionGroup]);

  const methods = Array.from(grouped.keys());
  const [method, setMethod] = useState<string>('level-up');
  const activeMethod = grouped.has(method) ? method : methods[0];
  const rows = activeMethod ? grouped.get(activeMethod) ?? [] : [];

  if (!moves.length) {
    return <StateView icon="lightning" title="No moves" />;
  }

  return (
    <View style={styles.container}>
      <SegmentedTabs
        tabs={versionGroups.map(vg => ({
          key: vg.name,
          label: formatName(vg.name),
        }))}
        activeKey={activeVersionGroup ?? ''}
        onChange={setVersionGroup}
        activeColor={colors.blackDefault}
      />
      <SegmentedTabs
        tabs={methods.map(m => ({ key: m, label: formatName(m) }))}
        activeKey={activeMethod ?? ''}
        onChange={setMethod}
        activeColor={accentColor}
      />
      <View>
        {rows.map((row, index) => (
          <View key={`${row.move.name}-${index}`}>
            {index > 0 ? <Divider /> : null}
            <Pressable
              onPress={() => onPressMove(row.move)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            >
              <Text variant="label" style={styles.level}>
                {activeMethod === 'level-up' ? `Lv ${row.level}` : '—'}
              </Text>
              <Text variant="body" style={styles.moveName}>
                {formatName(row.move.name)}
              </Text>
              <Icon name="chevronRight" size={16} color={colors.gray400} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s,
    gap: spacing.s,
  },
  pressed: {
    opacity: 0.6,
  },
  level: {
    width: 48,
  },
  moveName: {
    flex: 1,
  },
});
