/**
 * PokemonGrid Component
 * Virtualized 2-column grid of Pokémon cards. Each visible card lazily
 * fetches its Pokémon to show types (cached by apiClient).
 */

import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { PokemonCard } from '@/components/molecules';
import { useResource } from '@/hooks/useResource';
import type { IndexedResource } from '@/hooks/useResourceIndex';
import { useAppSelector } from '@/redux/hooks';
import { selectIsFavorite } from '@/redux/slices/favoritesSlice';
import { selectShowShiny } from '@/redux/slices/settingsSlice';
import { spacing } from '@/styles/spacing';
import { Pokemon } from '@/types/pokeapi';
import { getBestArtwork, getPokemonArtworkUrl } from '@/utils/sprites';

export interface PokemonGridProps {
  items: IndexedResource[];
  onPressItem: (item: IndexedResource) => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  refreshing?: boolean;
  onRefresh?: () => void;
}

interface PokemonGridItemProps {
  item: IndexedResource;
  onPress: (item: IndexedResource) => void;
}

function PokemonGridItemBase({ item, onPress }: PokemonGridItemProps) {
  const { data } = useResource<Pokemon>('pokemon', item.id);
  const isFavorite = useAppSelector(selectIsFavorite('pokemon', item.id));
  const showShiny = useAppSelector(selectShowShiny);

  const imageUri =
    getBestArtwork(data?.sprites, showShiny) ?? getPokemonArtworkUrl(item.id);

  return (
    <PokemonCard
      id={item.id}
      name={data?.name ?? item.name}
      imageUri={imageUri}
      types={data?.types.map(t => t.type.name)}
      isFavorite={isFavorite}
      onPress={() => onPress(item)}
    />
  );
}

const PokemonGridItem = memo(PokemonGridItemBase);

export default function PokemonGrid({
  items,
  onPressItem,
  ListHeaderComponent,
  ListEmptyComponent,
  refreshing,
  onRefresh,
}: PokemonGridProps) {
  const renderItem = useCallback<ListRenderItem<IndexedResource>>(
    ({ item }) => <PokemonGridItem item={item} onPress={onPressItem} />,
    [onPressItem],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={item => `${item.id}-${item.name}`}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews
      keyboardDismissMode="on-drag"
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.s,
  },
  row: {
    gap: spacing.s,
  },
});
