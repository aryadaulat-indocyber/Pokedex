/**
 * Location Area Detail Screen
 * GET /location-area/{id or name}: encounter method rates and wild Pokémon
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Card, Text } from '@/components/atoms';
import { InfoRow, SectionHeader } from '@/components/molecules';
import { EncounterList, QueryBoundary } from '@/components/organisms';
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
import { LocationArea } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';
import { getLocalizedName } from '@/utils/localization';

type Props = RootStackScreenProps<'LocationAreaDetail'>;

const HERO_COLOR = colors.heroLocationArea;

export default function LocationAreaDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<LocationArea>(
    'location-area',
    route.params.idOrName,
  );
  const area = query.data;

  const favorite = useFavorite('location-area', area?.id, area?.name);
  useTrackHistory('location-area', area?.id, area?.name);
  useScreenHeader({
    color: HERO_COLOR,
    favorite: area
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
              <Text variant="h2" color={colors.white}>
                {getLocalizedName(data.names, data.name, language)}
              </Text>
              <Text variant="body" color={colors.white} style={styles.subtitle}>
                {data.pokemon_encounters.length} wild Pokémon
              </Text>
            </View>
          }
        >
          <SectionHeader title="Info" />
          <Card>
            <InfoRow
              label="Location"
              value={formatName(data.location.name)}
              onPress={() => openResource('location', data.location.name)}
            />
            <InfoRow label="Game index" value={data.game_index} />
          </Card>

          {data.encounter_method_rates.length ? (
            <>
              <SectionHeader title="Encounter methods" />
              <Card>
                {data.encounter_method_rates.map(rate => (
                  <View key={rate.encounter_method.name} style={styles.method}>
                    <InfoRow
                      label={formatName(rate.encounter_method.name)}
                      value="Details"
                      onPress={() =>
                        openResource(
                          'encounter-method',
                          rate.encounter_method.name,
                        )
                      }
                    />
                    <View style={styles.versions}>
                      {rate.version_details.map(v => (
                        <Badge
                          key={v.version.name}
                          size="sm"
                          label={`${formatName(v.version.name)} ${v.rate}%`}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </Card>
            </>
          ) : null}

          <SectionHeader
            title="Pokémon"
            count={data.pokemon_encounters.length}
          />
          <EncounterList
            encounters={data.pokemon_encounters.map(e => ({
              subject: e.pokemon,
              version_details: e.version_details,
            }))}
            onPressSubject={p => openResource('pokemon', p.name)}
            emptyText="No wild Pokémon here"
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
  method: {
    paddingBottom: spacing.sm,
  },
  versions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
