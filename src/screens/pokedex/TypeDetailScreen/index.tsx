/**
 * Type Detail Screen
 * GET /type/{id or name}: damage relations, Pokémon and moves of a type
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@/components/atoms';
import {
  InfoRow,
  ResourceChipList,
  SectionHeader,
} from '@/components/molecules';
import { DamageRelationsView, QueryBoundary } from '@/components/organisms';
import { DetailTemplate } from '@/components/template';
import { getTypeColor } from '@/constants/pokemonTypes';
import {
  useFavorite,
  useLanguage,
  useResource,
  useResourceNavigation,
  useScreenHeader,
  useTrackHistory,
} from '@/hooks';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { Type } from '@/types/pokeapi';
import { formatGeneration, formatName } from '@/utils/formatters';
import { getLocalizedName } from '@/utils/localization';

type Props = RootStackScreenProps<'TypeDetail'>;

export default function TypeDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<Type>('type', route.params.idOrName);
  const type = query.data;
  const color = getTypeColor(type?.name ?? String(route.params.idOrName));

  const favorite = useFavorite('type', type?.id, type?.name);
  useTrackHistory('type', type?.id, type?.name);
  useScreenHeader({
    color,
    favorite: type
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  return (
    <QueryBoundary query={query}>
      {data => (
        <DetailTemplate
          heroColor={color}
          hero={
            <View>
              <Text variant="h1" color={colors.white}>
                {getLocalizedName(data.names, data.name, language)}
              </Text>
              <Text variant="body" color={colors.white} style={styles.subtitle}>
                {data.pokemon.length} Pokémon · {data.moves.length} moves
              </Text>
            </View>
          }
        >
          <SectionHeader title="Damage relations" />
          <Card>
            <DamageRelationsView
              relations={data.damage_relations}
              onPressType={name => openResource('type', name)}
            />
          </Card>

          <SectionHeader title="Info" />
          <Card>
            <InfoRow
              label="Introduced"
              value={formatGeneration(data.generation.name)}
              onPress={() => openResource('generation', data.generation.name)}
            />
            {data.move_damage_class ? (
              <InfoRow
                label="Damage class"
                value={formatName(data.move_damage_class.name)}
                onPress={() =>
                  openResource(
                    'move-damage-class',
                    data.move_damage_class?.name ?? '',
                  )
                }
              />
            ) : null}
          </Card>

          {data.past_damage_relations.length ? (
            <>
              <SectionHeader title="Past damage relations" />
              {data.past_damage_relations.map(past => (
                <Card key={past.generation.name} style={styles.pastCard}>
                  <Text variant="label" style={styles.pastLabel}>
                    Until {formatGeneration(past.generation.name)}
                  </Text>
                  <DamageRelationsView
                    relations={past.damage_relations}
                    onPressType={name => openResource('type', name)}
                  />
                </Card>
              ))}
            </>
          ) : null}

          <SectionHeader title="Pokémon" count={data.pokemon.length} />
          <ResourceChipList
            items={data.pokemon.map(p => p.pokemon)}
            onPressItem={item => openResource('pokemon', item.name)}
          />

          <SectionHeader title="Moves" count={data.moves.length} />
          <ResourceChipList
            items={data.moves}
            onPressItem={item => openResource('move', item.name)}
          />
        </DetailTemplate>
      )}
    </QueryBoundary>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    opacity: 0.85,
    marginTop: spacing.xs,
  },
  pastCard: {
    marginBottom: spacing.sm,
  },
  pastLabel: {
    marginBottom: spacing.sm,
  },
});
