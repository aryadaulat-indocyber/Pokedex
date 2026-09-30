/**
 * Location Detail Screen
 * GET /location/{id or name}: region and location areas
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Divider, Text } from '@/components/atoms';
import {
  InfoRow,
  ListItem,
  ResourceChipList,
  SectionHeader,
  StateView,
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
import type { RootStackScreenProps } from '@/types/navigation.types';
import { Location } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';
import { getLocalizedName } from '@/utils/localization';

type Props = RootStackScreenProps<'LocationDetail'>;

const HERO_COLOR = colors.heroLocation;

export default function LocationDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<Location>('location', route.params.idOrName);
  const location = query.data;

  const favorite = useFavorite('location', location?.id, location?.name);
  useTrackHistory('location', location?.id, location?.name);
  useScreenHeader({
    color: HERO_COLOR,
    favorite: location
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  return (
    <QueryBoundary query={query}>
      {data => (
        <DetailTemplate
          heroColor={HERO_COLOR}
          hero={
            <Text variant="h1" color={colors.white}>
              {getLocalizedName(data.names, data.name, language)}
            </Text>
          }
        >
          <SectionHeader title="Info" />
          <Card>
            {data.region ? (
              <InfoRow
                label="Region"
                value={formatName(data.region.name)}
                onPress={() => openResource('region', data.region?.name ?? '')}
              />
            ) : (
              <InfoRow label="Region" value="—" />
            )}
          </Card>

          <SectionHeader title="Areas" count={data.areas.length} />
          {data.areas.length ? (
            <Card padded={false}>
              {data.areas.map((area, index) => (
                <View key={area.name}>
                  {index > 0 ? <Divider /> : null}
                  <ListItem
                    title={formatName(area.name)}
                    onPress={() => openResource('location-area', area.name)}
                  />
                </View>
              ))}
            </Card>
          ) : (
            <StateView icon="map" title="No areas" />
          )}

          {data.game_indices.length ? (
            <>
              <SectionHeader title="Generations" />
              <ResourceChipList
                items={data.game_indices.map(g => g.generation)}
                onPressItem={g => openResource('generation', g.name)}
              />
            </>
          ) : null}
        </DetailTemplate>
      )}
    </QueryBoundary>
  );
}
