/**
 * Pokedex Screen
 * Bottom tab: every Pokémon with search, type / generation filters and
 * favorites. Uses GET /pokemon, /type/{name}, /generation, /generation/{id}
 */

import React, { useCallback, useMemo, useState } from 'react';
import { IconButton, SearchInput } from '@/components/atoms';
import {
  FilterChipRow,
  ScreenHeader,
  SegmentedTabs,
  StateView,
} from '@/components/molecules';
import { PokemonGrid } from '@/components/organisms';
import { ScreenTemplate } from '@/components/template';
import { POKEMON_TYPES, getTypeColor } from '@/constants/pokemonTypes';
import {
  IndexedResource,
  useDebounce,
  useResource,
  useResourceIndex,
  useResourceNavigation,
} from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectFavoritesByResource } from '@/redux/slices/favoritesSlice';
import { selectShowShiny, toggleShiny } from '@/redux/slices/settingsSlice';
import { colors } from '@/styles/colors';
import { Generation, Type } from '@/types/pokeapi';
import { formatGeneration, formatName } from '@/utils/formatters';
import { getIdFromUrl } from '@/utils/resourceUrl';
import { MAX_SPECIES_ID, POKEDEX_MODES, PokedexMode } from './constants';

const selectPokemonFavorites = selectFavoritesByResource('pokemon');

export default function PokedexScreen() {
  const dispatch = useAppDispatch();
  const { openResource } = useResourceNavigation();
  const showShiny = useAppSelector(selectShowShiny);
  const favorites = useAppSelector(selectPokemonFavorites);

  const [mode, setMode] = useState<PokedexMode>('all');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [generationFilter, setGenerationFilter] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search);

  const pokemonIndex = useResourceIndex('pokemon');
  const generationIndex = useResourceIndex('generation');
  const typeQuery = useResource<Type>('type', typeFilter);
  const generationQuery = useResource<Generation>(
    'generation',
    generationFilter,
  );

  const items = useMemo<IndexedResource[]>(() => {
    let list: IndexedResource[];

    if (mode === 'favorites') {
      list = favorites.map(f => ({ id: f.id, name: f.name, url: '' }));
    } else if (generationFilter && generationQuery.data) {
      list = generationQuery.data.pokemon_species
        .map(s => ({ id: getIdFromUrl(s.url), name: s.name, url: s.url }))
        .sort((a, b) => a.id - b.id);
    } else {
      list = pokemonIndex.items.filter(p => p.id < MAX_SPECIES_ID);
    }

    if (typeFilter && typeQuery.data) {
      const ids = new Set(
        typeQuery.data.pokemon.map(p => getIdFromUrl(p.pokemon.url)),
      );
      list = list.filter(p => ids.has(p.id));
    }

    const query = debouncedSearch.trim().toLowerCase();
    if (query) {
      const asNumber = Number(query.replace('#', ''));
      list = list.filter(p =>
        Number.isNaN(asNumber)
          ? p.name.includes(query.replace(/\s+/g, '-'))
          : String(p.id).startsWith(String(asNumber)),
      );
    }

    return list;
  }, [
    mode,
    favorites,
    generationFilter,
    generationQuery.data,
    pokemonIndex.items,
    typeFilter,
    typeQuery.data,
    debouncedSearch,
  ]);

  const onPressItem = useCallback(
    (item: IndexedResource) => openResource('pokemon', item.id),
    [openResource],
  );

  const isFiltering =
    (typeFilter !== null && typeQuery.isLoading) ||
    (generationFilter !== null && generationQuery.isLoading);

  const renderEmpty = () => {
    if (pokemonIndex.isLoading || isFiltering) {
      return <StateView icon="pokeball" title="Loading Pokémon…" />;
    }
    if (pokemonIndex.error) {
      return (
        <StateView
          icon="info"
          title="Could not load the Pokédex"
          message={pokemonIndex.error.message}
          actionLabel="Try again"
          onAction={pokemonIndex.refetch}
        />
      );
    }
    if (mode === 'favorites' && favorites.length === 0) {
      return (
        <StateView
          icon="heart"
          title="No favorites yet"
          message="Tap the heart on a Pokémon to save it here."
        />
      );
    }
    return <StateView icon="search" title="No Pokémon found" />;
  };

  return (
    <ScreenTemplate>
      <ScreenHeader
        title="Pokédex"
        subtitle={`${items.length} Pokémon`}
        right={
          <IconButton
            icon="sparkles"
            filled={showShiny}
            color={showShiny ? colors.secondaryDark : colors.gray500}
            onPress={() => dispatch(toggleShiny())}
            accessibilityLabel="Toggle shiny artwork"
          />
        }
      >
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or number"
        />
        <SegmentedTabs
          tabs={POKEDEX_MODES}
          activeKey={mode}
          onChange={setMode}
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
        {mode === 'all' ? (
          <FilterChipRow
            anyLabel="All generations"
            selected={generationFilter}
            onSelect={setGenerationFilter}
            options={generationIndex.items.map(g => ({
              key: g.name,
              label: formatGeneration(g.name),
            }))}
          />
        ) : null}
      </ScreenHeader>
      <PokemonGrid
        items={isFiltering ? [] : items}
        onPressItem={onPressItem}
        ListEmptyComponent={renderEmpty()}
        refreshing={false}
        onRefresh={pokemonIndex.refetch}
      />
    </ScreenTemplate>
  );
}
