/**
 * Pokemon Detail Screen
 * Full profile of a Pokémon. Accepts a pokemon id/name or, with
 * `bySpecies`, a species id/name (resolved to its default variety).
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Loading } from '@/components/atoms';
import { SegmentedTabs, StateView } from '@/components/molecules';
import { EvolutionChainView, PokemonMoveList } from '@/components/organisms';
import { DetailTemplate } from '@/components/template';
import { getTypeColor } from '@/constants/pokemonTypes';
import {
  useFavorite,
  useLanguage,
  useResource,
  useResourceByUrl,
  useResourceNavigation,
  useScreenHeader,
  useTrackHistory,
} from '@/hooks';
import { useAppSelector } from '@/redux/hooks';
import { selectShowShiny } from '@/redux/slices/settingsSlice';
import { spacing } from '@/styles/spacing';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { Pokemon, PokemonSpecies } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';
import { getLocalizedName, pickLocalized } from '@/utils/localization';
import { getIdFromUrl } from '@/utils/resourceUrl';
import { getBestArtwork } from '@/utils/sprites';
import AboutTab from './components/AboutTab';
import FormsTab from './components/FormsTab';
import LocationsTab from './components/LocationsTab';
import PokemonHero from './components/PokemonHero';
import StatsTab from './components/StatsTab';
import { POKEMON_DETAIL_TABS, PokemonDetailTab } from './constants';

type Props = RootStackScreenProps<'PokemonDetail'>;

export default function PokemonDetailScreen({ route }: Props) {
  const { idOrName, bySpecies } = route.params;
  const language = useLanguage();
  const showShiny = useAppSelector(selectShowShiny);
  const { openResource } = useResourceNavigation();
  const [tab, setTab] = useState<PokemonDetailTab>('about');

  // When opened from a species link, resolve its default Pokémon first
  const speciesLookup = useResource<PokemonSpecies>(
    'pokemon-species',
    bySpecies ? idOrName : null,
  );
  const pokemonKey = bySpecies
    ? speciesLookup.data?.varieties.find(v => v.is_default)?.pokemon.name
    : idOrName;

  const pokemonQuery = useResource<Pokemon>('pokemon', pokemonKey);
  const pokemon = pokemonQuery.data;
  const speciesQuery = useResourceByUrl<PokemonSpecies>(pokemon?.species.url);
  const species = speciesQuery.data;

  const accentColor = getTypeColor(pokemon?.types[0]?.type.name);
  const displayName = species
    ? getLocalizedName(species.names, species.name, language)
    : formatName(pokemon?.name);

  const favorite = useFavorite('pokemon', pokemon?.id, pokemon?.name);
  useTrackHistory('pokemon', pokemon?.id, pokemon?.name);
  useScreenHeader({
    title: '',
    color: accentColor,
    favorite: pokemon
      ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
      : undefined,
  });

  const error = pokemonQuery.error ?? speciesLookup.error;
  if (!pokemon) {
    if (error) {
      return (
        <StateView
          icon="info"
          title={
            error.code === 'NOT_FOUND'
              ? 'Pokémon not found'
              : 'Something went wrong'
          }
          message={error.message}
          actionLabel="Try again"
          onAction={bySpecies ? speciesLookup.refetch : pokemonQuery.refetch}
          fullScreen
        />
      );
    }
    return <Loading fullScreen />;
  }

  const renderTab = () => {
    switch (tab) {
      case 'about':
        return (
          <AboutTab
            pokemon={pokemon}
            species={species}
            language={language}
            accentColor={accentColor}
            openResource={openResource}
          />
        );
      case 'stats':
        return <StatsTab pokemon={pokemon} openResource={openResource} />;
      case 'evolution':
        return (
          <View style={styles.tabContent}>
            <EvolutionChainView
              chainId={
                species?.evolution_chain
                  ? getIdFromUrl(species.evolution_chain.url)
                  : null
              }
              currentSpecies={species?.name}
              accentColor={accentColor}
              onPressSpecies={s =>
                openResource('pokemon-species', getIdFromUrl(s.url))
              }
            />
          </View>
        );
      case 'moves':
        return (
          <View style={styles.tabContent}>
            <PokemonMoveList
              moves={pokemon.moves}
              accentColor={accentColor}
              onPressMove={move => openResource('move', move.name)}
            />
          </View>
        );
      case 'locations':
        return (
          <View style={styles.tabContent}>
            <LocationsTab pokemonId={pokemon.id} openResource={openResource} />
          </View>
        );
      case 'forms':
        return (
          <FormsTab
            pokemon={pokemon}
            species={species}
            openResource={openResource}
          />
        );
    }
  };

  return (
    <DetailTemplate
      heroColor={accentColor}
      hero={
        <PokemonHero
          id={species?.id ?? pokemon.id}
          displayName={displayName}
          genus={pickLocalized(species?.genera, language)?.genus}
          types={pokemon.types.map(t => t.type.name)}
          artwork={getBestArtwork(pokemon.sprites, showShiny)}
          isLegendary={species?.is_legendary}
          isMythical={species?.is_mythical}
          isBaby={species?.is_baby}
          onPressType={type => openResource('type', type)}
        />
      }
    >
      <View style={styles.tabs}>
        <SegmentedTabs
          tabs={POKEMON_DETAIL_TABS}
          activeKey={tab}
          onChange={setTab}
          activeColor={accentColor}
        />
      </View>
      {renderTab()}
    </DetailTemplate>
  );
}

const styles = StyleSheet.create({
  tabs: {
    paddingTop: spacing.xl,
  },
  tabContent: {
    marginTop: spacing.md,
  },
});
