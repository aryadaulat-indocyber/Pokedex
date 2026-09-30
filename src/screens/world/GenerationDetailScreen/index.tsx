/**
 * Generation Detail Screen
 * GET /generation/{id or name}: region, games, new species, moves,
 * abilities and types introduced
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, TypeBadge } from '@/components/atoms';
import {
  InfoRow,
  ResourceChipList,
  SectionHeader,
} from '@/components/molecules';
import { QueryBoundary } from '@/components/organisms';
import { DetailTemplate } from '@/components/template';
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
import { Generation } from '@/types/pokeapi';
import { formatGeneration, formatName } from '@/utils/formatters';
import { getLocalizedName } from '@/utils/localization';
import { getIdFromUrl } from '@/utils/resourceUrl';

type Props = RootStackScreenProps<'GenerationDetail'>;

const HERO_COLOR = colors.heroGeneration;

export default function GenerationDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<Generation>('generation', route.params.idOrName);
  const generation = query.data;

  const favorite = useFavorite('generation', generation?.id, generation?.name);
  useTrackHistory('generation', generation?.id, generation?.name);
  useScreenHeader({
    color: HERO_COLOR,
    favorite: generation
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  return (
    <QueryBoundary query={query}>
      {data => {
        const species = [...data.pokemon_species].sort(
          (a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url),
        );
        return (
          <DetailTemplate
            heroColor={HERO_COLOR}
            hero={
              <View>
                <Text variant="h1" color={colors.white}>
                  {getLocalizedName(
                    data.names,
                    formatGeneration(data.name),
                    language,
                  )}
                </Text>
                <Text
                  variant="body"
                  color={colors.white}
                  style={styles.subtitle}
                >
                  {species.length} new Pokémon · {data.moves.length} new moves
                </Text>
              </View>
            }
          >
            <SectionHeader title="Info" />
            <Card>
              <InfoRow
                label="Main region"
                value={formatName(data.main_region.name)}
                onPress={() => openResource('region', data.main_region.name)}
              />
            </Card>

            <SectionHeader title="Games" count={data.version_groups.length} />
            <ResourceChipList
              items={data.version_groups}
              onPressItem={v => openResource('version-group', v.name)}
            />

            {data.types.length ? (
              <>
                <SectionHeader title="New types" />
                <View style={styles.types}>
                  {data.types.map(t => (
                    <TypeBadge
                      key={t.name}
                      type={t.name}
                      onPress={() => openResource('type', t.name)}
                    />
                  ))}
                </View>
              </>
            ) : null}

            <SectionHeader title="New Pokémon" count={species.length} />
            <ResourceChipList
              items={species}
              limit={30}
              onPressItem={s =>
                openResource('pokemon-species', getIdFromUrl(s.url))
              }
            />

            <SectionHeader
              title="New abilities"
              count={data.abilities.length}
            />
            <ResourceChipList
              items={data.abilities}
              onPressItem={a => openResource('ability', a.name)}
            />

            <SectionHeader title="New moves" count={data.moves.length} />
            <ResourceChipList
              items={data.moves}
              onPressItem={m => openResource('move', m.name)}
            />
          </DetailTemplate>
        );
      }}
    </QueryBoundary>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    opacity: 0.85,
    marginTop: spacing.xs,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
