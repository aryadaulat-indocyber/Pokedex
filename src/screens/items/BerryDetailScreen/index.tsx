/**
 * Berry Detail Screen
 * GET /berry/{id or name}: growth, firmness, flavors and Natural Gift
 */

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, RemoteImage, Text, TypeBadge } from '@/components/atoms';
import {
  InfoGrid,
  InfoRow,
  SectionHeader,
  StatBar,
} from '@/components/molecules';
import { QueryBoundary } from '@/components/organisms';
import { DetailTemplate } from '@/components/template';
import {
  useFavorite,
  useResource,
  useResourceNavigation,
  useScreenHeader,
  useTrackHistory,
} from '@/hooks';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { Berry } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';
import { getItemSpriteUrl } from '@/utils/sprites';

type Props = RootStackScreenProps<'BerryDetail'>;

const HERO_COLOR = colors.success;
const MAX_FLAVOR_POTENCY = 40;

export default function BerryDetailScreen({ route }: Props) {
  const { openResource } = useResourceNavigation();
  const query = useResource<Berry>('berry', route.params.idOrName);
  const berry = query.data;

  const favorite = useFavorite('berry', berry?.id, berry?.name);
  useTrackHistory('berry', berry?.id, berry?.name);
  useScreenHeader({
    color: HERO_COLOR,
    favorite: berry
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  return (
    <QueryBoundary query={query}>
      {data => (
        <DetailTemplate
          heroColor={HERO_COLOR}
          hero={
            <View style={styles.hero}>
              <View style={styles.sprite}>
                <RemoteImage uri={getItemSpriteUrl(data.item.name)} size={64} />
              </View>
              <View style={styles.heroText}>
                <Text variant="h2" color={colors.white}>
                  {formatName(data.name)} Berry
                </Text>
                <Text variant="body" color={colors.white}>
                  {formatName(data.firmness.name)}
                </Text>
              </View>
            </View>
          }
        >
          <SectionHeader title="Growth" />
          <InfoGrid
            accentColor={HERO_COLOR}
            items={[
              { label: 'Growth (h)', value: data.growth_time },
              { label: 'Max harvest', value: data.max_harvest },
              { label: 'Size (mm)', value: data.size },
            ]}
          />

          <SectionHeader title="Flavors" />
          <Card>
            {data.flavors.map(f => (
              <Pressable
                key={f.flavor.name}
                onPress={() => openResource('berry-flavor', f.flavor.name)}
                accessibilityRole="button"
              >
                <StatBar
                  label={formatName(f.flavor.name)}
                  value={f.potency}
                  max={MAX_FLAVOR_POTENCY}
                  color={HERO_COLOR}
                />
              </Pressable>
            ))}
          </Card>

          <SectionHeader title="Info" />
          <Card>
            <InfoRow
              label="Firmness"
              value={formatName(data.firmness.name)}
              onPress={() => openResource('berry-firmness', data.firmness.name)}
            />
            <InfoRow label="Smoothness" value={data.smoothness} />
            <InfoRow label="Soil dryness" value={data.soil_dryness} />
            <InfoRow
              label="Natural Gift"
              value={
                <View style={styles.gift}>
                  <TypeBadge
                    type={data.natural_gift_type.name}
                    size="sm"
                    onPress={() =>
                      openResource('type', data.natural_gift_type.name)
                    }
                  />
                  <Text variant="body">{data.natural_gift_power}</Text>
                </View>
              }
            />
            <InfoRow
              label="Item"
              value={formatName(data.item.name)}
              onPress={() => openResource('item', data.item.name)}
            />
          </Card>
        </DetailTemplate>
      )}
    </QueryBoundary>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  sprite: {
    backgroundColor: colors.overlayWhite,
    borderRadius: borderRadius.xl,
    padding: spacing.sm,
  },
  heroText: {
    flex: 1,
  },
  gift: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
