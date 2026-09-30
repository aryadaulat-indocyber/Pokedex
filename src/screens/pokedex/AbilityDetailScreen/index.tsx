/**
 * Ability Detail Screen
 * GET /ability/{id or name}: effect, flavor text and Pokémon with it
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Card, Divider, Text } from '@/components/atoms';
import {
  FlavorTextCard,
  InfoRow,
  ListItem,
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
import { Ability } from '@/types/pokeapi';
import {
  formatEffectText,
  formatGeneration,
  formatName,
} from '@/utils/formatters';
import {
  getLocalizedName,
  pickLatestLocalized,
  pickLocalized,
} from '@/utils/localization';

type Props = RootStackScreenProps<'AbilityDetail'>;

const HERO_COLOR = colors.accent;

export default function AbilityDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<Ability>('ability', route.params.idOrName);
  const ability = query.data;

  const favorite = useFavorite('ability', ability?.id, ability?.name);
  useTrackHistory('ability', ability?.id, ability?.name);
  useScreenHeader({
    color: HERO_COLOR,
    favorite: ability
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
              <View>
                <Text variant="h1" color={colors.white}>
                  {getLocalizedName(data.names, data.name, language)}
                </Text>
                {effect?.short_effect ? (
                  <Text
                    variant="body"
                    color={colors.white}
                    style={styles.short}
                  >
                    {formatEffectText(effect.short_effect)}
                  </Text>
                ) : null}
              </View>
            }
          >
            {flavor ? (
              <>
                <SectionHeader title="Description" />
                <FlavorTextCard
                  text={flavor.flavor_text}
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
                label="Generation"
                value={formatGeneration(data.generation.name)}
                onPress={() => openResource('generation', data.generation.name)}
              />
              <InfoRow
                label="Main series"
                value={data.is_main_series ? 'Yes' : 'No'}
              />
            </Card>

            {data.effect_changes.length ? (
              <>
                <SectionHeader title="Effect changes" />
                {data.effect_changes.map(change => (
                  <Card key={change.version_group.name} style={styles.change}>
                    <Text variant="label">
                      Before {formatName(change.version_group.name)}
                    </Text>
                    <Text variant="bodySm">
                      {formatEffectText(
                        pickLocalized(change.effect_entries, language)?.effect,
                      )}
                    </Text>
                  </Card>
                ))}
              </>
            ) : null}

            <SectionHeader title="Pokémon" count={data.pokemon.length} />
            <Card padded={false} style={styles.list}>
              {data.pokemon.map((p, index) => (
                <View key={p.pokemon.name}>
                  {index > 0 ? <Divider /> : null}
                  <ListItem
                    title={formatName(p.pokemon.name)}
                    trailing={
                      p.is_hidden ? (
                        <Badge label="Hidden" size="sm" />
                      ) : undefined
                    }
                    onPress={() => openResource('pokemon', p.pokemon.name)}
                  />
                </View>
              ))}
            </Card>
          </DetailTemplate>
        );
      }}
    </QueryBoundary>
  );
}

const styles = StyleSheet.create({
  short: {
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  change: {
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  list: {
    overflow: 'hidden',
  },
});
