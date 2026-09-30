/**
 * Item Detail Screen
 * GET /item/{id or name}: cost, category, attributes, effect, fling data,
 * holders, machines and baby-trigger evolution
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, RemoteImage, Text } from '@/components/atoms';
import {
  FlavorTextCard,
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
import { borderRadius, spacing } from '@/styles/spacing';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { Item } from '@/types/pokeapi';
import { formatEffectText, formatName } from '@/utils/formatters';
import {
  getLocalizedName,
  pickLatestLocalized,
  pickLocalized,
} from '@/utils/localization';
import { getIdFromUrl } from '@/utils/resourceUrl';

type Props = RootStackScreenProps<'ItemDetail'>;

const HERO_COLOR = colors.secondaryDark;

export default function ItemDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<Item>('item', route.params.idOrName);
  const item = query.data;

  const favorite = useFavorite('item', item?.id, item?.name);
  useTrackHistory('item', item?.id, item?.name);
  useScreenHeader({
    color: HERO_COLOR,
    favorite: item
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  return (
    <QueryBoundary query={query}>
      {data => {
        const effect = pickLocalized(data.effect_entries, language);
        const flavor = pickLatestLocalized(data.flavor_text_entries, language);
        return (
          <DetailTemplate
            heroColor={HERO_COLOR}
            hero={
              <View style={styles.hero}>
                <View style={styles.sprite}>
                  <RemoteImage uri={data.sprites.default} size={72} />
                </View>
                <View style={styles.heroText}>
                  <Text variant="h2" color={colors.white}>
                    {getLocalizedName(data.names, data.name, language)}
                  </Text>
                  <Text variant="body" color={colors.white}>
                    {data.cost ? `₽${data.cost}` : 'Not sold'}
                  </Text>
                </View>
              </View>
            }
          >
            {flavor ? (
              <>
                <SectionHeader title="Description" />
                <FlavorTextCard
                  text={flavor.text}
                  source={flavor.version_group.name}
                  accentColor={HERO_COLOR}
                />
              </>
            ) : null}

            {effect ? (
              <>
                <SectionHeader title="Effect" />
                <Card>
                  <Text variant="body">{formatEffectText(effect.effect)}</Text>
                </Card>
              </>
            ) : null}

            <SectionHeader title="Info" />
            <Card>
              <InfoRow
                label="Category"
                value={formatName(data.category.name)}
                onPress={() =>
                  openResource('item-category', data.category.name)
                }
              />
              <InfoRow label="Fling power" value={data.fling_power ?? '—'} />
              {data.fling_effect ? (
                <InfoRow
                  label="Fling effect"
                  value={formatName(data.fling_effect.name)}
                  onPress={() =>
                    openResource(
                      'item-fling-effect',
                      data.fling_effect?.name ?? '',
                    )
                  }
                />
              ) : null}
              {data.baby_trigger_for ? (
                <InfoRow
                  label="Baby trigger for"
                  value={`Evolution chain #${getIdFromUrl(
                    data.baby_trigger_for.url,
                  )}`}
                  onPress={() =>
                    openResource(
                      'evolution-chain',
                      getIdFromUrl(data.baby_trigger_for?.url ?? ''),
                    )
                  }
                />
              ) : null}
            </Card>

            <SectionHeader title="Attributes" count={data.attributes.length} />
            <ResourceChipList
              items={data.attributes}
              onPressItem={attr => openResource('item-attribute', attr.name)}
            />

            {data.held_by_pokemon.length ? (
              <>
                <SectionHeader
                  title="Held by"
                  count={data.held_by_pokemon.length}
                />
                <ResourceChipList
                  items={data.held_by_pokemon.map(h => h.pokemon)}
                  onPressItem={p => openResource('pokemon', p.name)}
                />
              </>
            ) : null}

            {data.machines.length ? (
              <>
                <SectionHeader title="Machines" count={data.machines.length} />
                <ResourceChipList
                  items={data.machines.map(m => ({
                    name: m.version_group.name,
                    url: m.machine.url,
                  }))}
                  onPressItem={m =>
                    openResource('machine', getIdFromUrl(m.url))
                  }
                />
              </>
            ) : null}

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
        );
      }}
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
});
