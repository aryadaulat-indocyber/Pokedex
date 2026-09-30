/**
 * Region Detail Screen
 * GET /region/{id or name}: generation, Pokédexes, games and locations
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@/components/atoms';
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
import { Region } from '@/types/pokeapi';
import { formatGeneration } from '@/utils/formatters';
import { getLocalizedName } from '@/utils/localization';

type Props = RootStackScreenProps<'RegionDetail'>;

const HERO_COLOR = colors.heroRegion;

export default function RegionDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<Region>('region', route.params.idOrName);
  const region = query.data;

  const favorite = useFavorite('region', region?.id, region?.name);
  useTrackHistory('region', region?.id, region?.name);
  useScreenHeader({
    color: HERO_COLOR,
    favorite: region
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  return (
    <QueryBoundary query={query}>
      {data => (
        <DetailTemplate
          heroColor={HERO_COLOR}
          hero={
            <View>
              <Text variant="h1" color={colors.white}>
                {getLocalizedName(data.names, data.name, language)}
              </Text>
              <Text variant="body" color={colors.white} style={styles.subtitle}>
                {data.locations.length} locations
              </Text>
            </View>
          }
        >
          <SectionHeader title="Info" />
          <Card>
            {data.main_generation ? (
              <InfoRow
                label="Generation"
                value={formatGeneration(data.main_generation.name)}
                onPress={() =>
                  openResource('generation', data.main_generation?.name ?? '')
                }
              />
            ) : (
              <InfoRow label="Generation" value="—" />
            )}
          </Card>

          <SectionHeader title="Pokédexes" count={data.pokedexes.length} />
          <ResourceChipList
            items={data.pokedexes}
            onPressItem={p => openResource('pokedex', p.name)}
          />

          <SectionHeader title="Games" count={data.version_groups.length} />
          <ResourceChipList
            items={data.version_groups}
            onPressItem={v => openResource('version-group', v.name)}
          />

          <SectionHeader title="Locations" count={data.locations.length} />
          <ResourceChipList
            items={data.locations}
            limit={40}
            onPressItem={l => openResource('location', l.name)}
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
});
