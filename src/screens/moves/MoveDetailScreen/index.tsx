/**
 * Move Detail Screen
 * GET /move/{id or name}: stats, effect, meta, contest data, machines and
 * Pokémon that learn it
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Card, Text, TypeBadge } from '@/components/atoms';
import {
  FlavorTextCard,
  InfoGrid,
  InfoRow,
  ResourceChipList,
  SectionHeader,
} from '@/components/molecules';
import { QueryBoundary } from '@/components/organisms';
import { DetailTemplate } from '@/components/template';
import { DAMAGE_CLASS_COLORS, getTypeColor } from '@/constants/pokemonTypes';
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
import { Move } from '@/types/pokeapi';
import {
  formatEffectText,
  formatGeneration,
  formatName,
  formatNullable,
} from '@/utils/formatters';
import {
  getLocalizedName,
  pickLatestLocalized,
  pickLocalized,
} from '@/utils/localization';
import { getIdFromUrl } from '@/utils/resourceUrl';
import ContestSection from './components/ContestSection';

type Props = RootStackScreenProps<'MoveDetail'>;

export default function MoveDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<Move>('move', route.params.idOrName);
  const move = query.data;
  const color = getTypeColor(move?.type.name);

  const favorite = useFavorite('move', move?.id, move?.name);
  useTrackHistory('move', move?.id, move?.name);
  useScreenHeader({
    color,
    favorite: move
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  return (
    <QueryBoundary query={query}>
      {data => {
        const effect = pickLocalized(data.effect_entries, language);
        const flavor = pickLatestLocalized(data.flavor_text_entries, language);
        const meta = data.meta;

        return (
          <DetailTemplate
            heroColor={color}
            hero={
              <View>
                <Text variant="h1" color={colors.white}>
                  {getLocalizedName(data.names, data.name, language)}
                </Text>
                <View style={styles.badges}>
                  <TypeBadge
                    type={data.type.name}
                    inverted
                    onPress={() => openResource('type', data.type.name)}
                  />
                  <Badge
                    label={formatName(data.damage_class.name)}
                    backgroundColor={
                      DAMAGE_CLASS_COLORS[data.damage_class.name]
                    }
                    textColor={colors.white}
                  />
                </View>
              </View>
            }
          >
            <SectionHeader title="Stats" />
            <InfoGrid
              accentColor={color}
              items={[
                { label: 'Power', value: formatNullable(data.power) },
                {
                  label: 'Accuracy',
                  value: formatNullable(data.accuracy, '%'),
                },
                { label: 'PP', value: formatNullable(data.pp) },
                { label: 'Priority', value: data.priority },
              ]}
            />

            {effect ? (
              <>
                <SectionHeader title="Effect" />
                <Card>
                  <Text variant="body">
                    {formatEffectText(effect.effect, data.effect_chance)}
                  </Text>
                </Card>
              </>
            ) : null}

            {flavor ? (
              <>
                <SectionHeader title="Description" />
                <FlavorTextCard
                  text={flavor.flavor_text}
                  source={flavor.version_group.name}
                  accentColor={color}
                />
              </>
            ) : null}

            <SectionHeader title="Info" />
            <Card>
              <InfoRow
                label="Target"
                value={formatName(data.target.name)}
                onPress={() => openResource('move-target', data.target.name)}
              />
              <InfoRow
                label="Damage class"
                value={formatName(data.damage_class.name)}
                onPress={() =>
                  openResource('move-damage-class', data.damage_class.name)
                }
              />
              <InfoRow
                label="Generation"
                value={formatGeneration(data.generation.name)}
                onPress={() => openResource('generation', data.generation.name)}
              />
              {data.effect_chance !== null ? (
                <InfoRow
                  label="Effect chance"
                  value={`${data.effect_chance}%`}
                />
              ) : null}
            </Card>

            {meta ? (
              <>
                <SectionHeader title="Battle meta" />
                <Card>
                  <InfoRow
                    label="Category"
                    value={formatName(meta.category.name)}
                    onPress={() =>
                      openResource('move-category', meta.category.name)
                    }
                  />
                  <InfoRow
                    label="Ailment"
                    value={formatName(meta.ailment.name)}
                    onPress={() =>
                      openResource('move-ailment', meta.ailment.name)
                    }
                  />
                  <InfoRow
                    label="Ailment chance"
                    value={`${meta.ailment_chance}%`}
                  />
                  <InfoRow
                    label="Flinch chance"
                    value={`${meta.flinch_chance}%`}
                  />
                  <InfoRow label="Stat chance" value={`${meta.stat_chance}%`} />
                  <InfoRow label="Crit rate" value={`+${meta.crit_rate}`} />
                  <InfoRow label="Drain" value={`${meta.drain}%`} />
                  <InfoRow label="Healing" value={`${meta.healing}%`} />
                  {meta.min_hits !== null ? (
                    <InfoRow
                      label="Hits"
                      value={`${meta.min_hits}-${meta.max_hits}`}
                    />
                  ) : null}
                  {meta.min_turns !== null ? (
                    <InfoRow
                      label="Turns"
                      value={`${meta.min_turns}-${meta.max_turns}`}
                    />
                  ) : null}
                </Card>
              </>
            ) : null}

            {data.stat_changes.length ? (
              <>
                <SectionHeader title="Stat changes" />
                <Card>
                  {data.stat_changes.map(change => (
                    <InfoRow
                      key={change.stat.name}
                      label={formatName(change.stat.name)}
                      value={
                        change.change > 0 ? `+${change.change}` : change.change
                      }
                      onPress={() => openResource('stat', change.stat.name)}
                    />
                  ))}
                </Card>
              </>
            ) : null}

            {data.contest_type ||
            data.contest_effect ||
            data.super_contest_effect ? (
              <>
                <SectionHeader title="Contests" />
                <ContestSection
                  move={data}
                  language={language}
                  openResource={openResource}
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
                  onPressItem={item =>
                    openResource('machine', getIdFromUrl(item.url))
                  }
                />
              </>
            ) : null}

            {data.past_values.length ? (
              <>
                <SectionHeader title="Past values" />
                <Card>
                  {data.past_values.map(past => (
                    <InfoRow
                      key={past.version_group.name}
                      label={`Before ${formatName(past.version_group.name)}`}
                      value={
                        [
                          past.power !== null ? `Pow ${past.power}` : null,
                          past.accuracy !== null
                            ? `Acc ${past.accuracy}`
                            : null,
                          past.pp !== null ? `PP ${past.pp}` : null,
                          past.type ? formatName(past.type.name) : null,
                        ]
                          .filter(Boolean)
                          .join(' · ') || '—'
                      }
                    />
                  ))}
                </Card>
              </>
            ) : null}

            <SectionHeader
              title="Learned by"
              count={data.learned_by_pokemon.length}
            />
            <ResourceChipList
              items={data.learned_by_pokemon}
              onPressItem={item => openResource('pokemon', item.name)}
            />
          </DetailTemplate>
        );
      }}
    </QueryBoundary>
  );
}

const styles = StyleSheet.create({
  badges: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
});
