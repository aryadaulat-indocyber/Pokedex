/**
 * Pokedex Detail Screen
 * GET /pokedex/{id or name}: a regional / national Pokédex and its entries
 */

import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import {
  Card,
  Divider,
  RemoteImage,
  SearchInput,
  Text,
} from '@/components/atoms';
import {
  InfoRow,
  ListItem,
  ResourceChipList,
  SectionHeader,
} from '@/components/molecules';
import { QueryBoundary } from '@/components/organisms';
import { ScreenTemplate } from '@/components/template';
import {
  useDebounce,
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
import { Pokedex, PokemonEntry } from '@/types/pokeapi';
import { formatDexNumber, formatName } from '@/utils/formatters';
import { getLocalizedName, pickLocalized } from '@/utils/localization';
import { getIdFromUrl } from '@/utils/resourceUrl';
import { getPokemonSpriteUrl } from '@/utils/sprites';

type Props = RootStackScreenProps<'PokedexDetail'>;

export default function PokedexDetailScreen({ route }: Props) {
  const language = useLanguage();
  const { openResource } = useResourceNavigation();
  const query = useResource<Pokedex>('pokedex', route.params.idOrName);
  const pokedex = query.data;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const favorite = useFavorite('pokedex', pokedex?.id, pokedex?.name);
  useTrackHistory('pokedex', pokedex?.id, pokedex?.name);
  useScreenHeader({
    title: pokedex
      ? getLocalizedName(pokedex.names, pokedex.name, language)
      : '',
    favorite: pokedex
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  const entries = useMemo(() => {
    const all = pokedex?.pokemon_entries ?? [];
    const q = debouncedSearch.trim().toLowerCase();
    return q
      ? all.filter(
          e =>
            e.pokemon_species.name.includes(q) ||
            String(e.entry_number).startsWith(q),
        )
      : all;
  }, [pokedex, debouncedSearch]);

  const renderItem = useCallback<ListRenderItem<PokemonEntry>>(
    ({ item }) => {
      const speciesId = getIdFromUrl(item.pokemon_species.url);
      return (
        <ListItem
          title={formatName(item.pokemon_species.name)}
          subtitle={`National ${formatDexNumber(speciesId)}`}
          leading={
            <RemoteImage uri={getPokemonSpriteUrl(speciesId)} size={44} />
          }
          trailing={
            <Text variant="subtitle" color={colors.primaryDefault}>
              {formatDexNumber(item.entry_number)}
            </Text>
          }
          onPress={() => openResource('pokemon-species', speciesId)}
        />
      );
    },
    [openResource],
  );

  return (
    <QueryBoundary query={query}>
      {data => (
        <ScreenTemplate safeAreaEdges={['left', 'right']}>
          <FlatList
            data={entries}
            keyExtractor={item =>
              `${item.entry_number}-${item.pokemon_species.name}`
            }
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            initialNumToRender={20}
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.content}
            ListHeaderComponent={
              <View style={styles.header}>
                {pickLocalized(data.descriptions, language) ? (
                  <Text variant="body" color={colors.textSecondary}>
                    {pickLocalized(data.descriptions, language)?.description}
                  </Text>
                ) : null}
                <Card>
                  <InfoRow
                    label="Main series"
                    value={data.is_main_series ? 'Yes' : 'No'}
                  />
                  {data.region ? (
                    <InfoRow
                      label="Region"
                      value={formatName(data.region.name)}
                      onPress={() =>
                        openResource('region', data.region?.name ?? '')
                      }
                    />
                  ) : null}
                </Card>
                {data.version_groups.length ? (
                  <ResourceChipList
                    items={data.version_groups}
                    onPressItem={v => openResource('version-group', v.name)}
                  />
                ) : null}
                <SectionHeader
                  title="Entries"
                  count={data.pokemon_entries.length}
                />
                <SearchInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search entries"
                />
              </View>
            }
          />
        </ScreenTemplate>
      )}
    </QueryBoundary>
  );
}

function Separator() {
  return <Divider inset={spacing.md} style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  header: {
    padding: spacing.md,
    gap: spacing.s,
  },
  separator: {
    marginVertical: 0,
  },
});
