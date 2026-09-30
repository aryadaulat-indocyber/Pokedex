/**
 * Navigation Types
 * Param lists for every navigator
 */

import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { ResourceGroupKey, ResourceKey } from '@/config/resourceRegistry';

type IdOrName = string | number;

/**
 * Bottom tab navigator
 */
export type MainTabParamList = {
  PokedexTab: undefined;
  MovesTab: undefined;
  ItemsTab: undefined;
  WorldTab: undefined;
  MoreTab: undefined;
};

/**
 * Root stack (tabs + every detail screen shared across tabs)
 */
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;

  // Pokémon
  PokemonDetail: { idOrName: IdOrName; bySpecies?: boolean };
  TypeDetail: { idOrName: IdOrName };
  AbilityDetail: { idOrName: IdOrName };
  EvolutionChain: { id: IdOrName };

  // Moves & Items
  MoveDetail: { idOrName: IdOrName };
  ItemDetail: { idOrName: IdOrName };
  BerryDetail: { idOrName: IdOrName };

  // World
  RegionDetail: { idOrName: IdOrName };
  LocationDetail: { idOrName: IdOrName };
  LocationAreaDetail: { idOrName: IdOrName };
  GenerationDetail: { idOrName: IdOrName };
  PokedexDetail: { idOrName: IdOrName };

  // Library (generic browser for every endpoint)
  LibraryGroup: { group: ResourceGroupKey };
  ResourceList: { resource: ResourceKey };
  ResourceDetail: { resource: ResourceKey; idOrName: IdOrName };

  // More
  Favorites: undefined;
  History: undefined;
  LanguageSettings: undefined;
  About: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
