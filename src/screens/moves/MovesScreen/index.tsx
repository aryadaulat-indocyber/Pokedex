/**
 * Moves Screen
 * Bottom tab: every move with search, type and damage-class filters.
 * Uses GET /move, /type/{name}, /move-damage-class, /move-damage-class/{name}
 */

import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { Divider, SearchInput } from '@/components/atoms';
import { FilterChipRow, ScreenHeader, StateView } from '@/components/molecules';
import { ScreenTemplate } from '@/components/template';
import {
  DAMAGE_CLASS_COLORS,
  POKEMON_TYPES,
  getTypeColor,
} from '@/constants/pokemonTypes';
import {
  IndexedResource,
  useDebounce,
  useResource,
  useResourceIndex,
  useResourceNavigation,
} from '@/hooks';
import { spacing } from '@/styles/spacing';
import { MoveDamageClass, Type } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';
import MoveRow from './components/MoveRow';

export default function MovesScreen() {
  const { openResource } = useResourceNavigation();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [classFilter, setClassFilter] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search);

  const moveIndex = useResourceIndex('move');
  const damageClassIndex = useResourceIndex('move-damage-class');
  const typeQuery = useResource<Type>('type', typeFilter);
  const classQuery = useResource<MoveDamageClass>(
    'move-damage-class',
    classFilter,
  );

  const items = useMemo(() => {
    let list = moveIndex.items;
    if (typeFilter && typeQuery.data) {
      const names = new Set(typeQuery.data.moves.map(m => m.name));
      list = list.filter(m => names.has(m.name));
    }
    if (classFilter && classQuery.data) {
      const names = new Set(classQuery.data.moves.map(m => m.name));
      list = list.filter(m => names.has(m.name));
    }
    const query = debouncedSearch.trim().toLowerCase().replace(/\s+/g, '-');
    return query ? list.filter(m => m.name.includes(query)) : list;
  }, [
    moveIndex.items,
    typeFilter,
    typeQuery.data,
    classFilter,
    classQuery.data,
    debouncedSearch,
  ]);

  const onPress = useCallback(
    (item: IndexedResource) => openResource('move', item.id),
    [openResource],
  );

  const renderItem = useCallback<ListRenderItem<IndexedResource>>(
    ({ item }) => <MoveRow item={item} onPress={onPress} />,
    [onPress],
  );

  const isFiltering =
    (typeFilter !== null && typeQuery.isLoading) ||
    (classFilter !== null && classQuery.isLoading);

  return (
    <ScreenTemplate>
      <ScreenHeader title="Moves" subtitle={`${items.length} moves`}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search moves"
        />
        <FilterChipRow
          anyLabel="All types"
          selected={typeFilter}
          onSelect={setTypeFilter}
          options={POKEMON_TYPES.map(type => ({
            key: type,
            label: formatName(type),
            color: getTypeColor(type),
          }))}
        />
        <FilterChipRow
          anyLabel="All classes"
          selected={classFilter}
          onSelect={setClassFilter}
          options={damageClassIndex.items.map(c => ({
            key: c.name,
            label: formatName(c.name),
            color: DAMAGE_CLASS_COLORS[c.name],
          }))}
        />
      </ScreenHeader>
      <FlatList
        data={isFiltering ? [] : items}
        keyExtractor={item => item.url}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.content}
        initialNumToRender={15}
        windowSize={9}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          moveIndex.error ? (
            <StateView
              icon="info"
              title="Could not load moves"
              message={moveIndex.error.message}
              actionLabel="Try again"
              onAction={moveIndex.refetch}
            />
          ) : (
            <StateView
              icon="lightning"
              title={
                moveIndex.isLoading || isFiltering
                  ? 'Loading moves…'
                  : 'No moves found'
              }
            />
          )
        }
      />
    </ScreenTemplate>
  );
}

function Separator() {
  return <Divider inset={spacing.md} style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  separator: {
    marginVertical: 0,
  },
});
