/**
 * useResourceNavigation
 * Open any PokeAPI resource (by url or by key + id) on the most specific
 * screen available, falling back to the generic ResourceDetail screen.
 */

import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ResourceKey } from '@/config/resourceRegistry';
import type { RootStackParamList } from '@/types/navigation.types';
import { parseResourceUrl } from '@/utils/resourceUrl';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const navigateToResource = (
  navigation: Navigation,
  resource: ResourceKey,
  idOrName: string | number,
) => {
  switch (resource) {
    case 'pokemon':
      return navigation.push('PokemonDetail', { idOrName });
    case 'pokemon-species':
      return navigation.push('PokemonDetail', { idOrName, bySpecies: true });
    case 'type':
      return navigation.push('TypeDetail', { idOrName });
    case 'ability':
      return navigation.push('AbilityDetail', { idOrName });
    case 'evolution-chain':
      return navigation.push('EvolutionChain', { id: idOrName });
    case 'move':
      return navigation.push('MoveDetail', { idOrName });
    case 'item':
      return navigation.push('ItemDetail', { idOrName });
    case 'berry':
      return navigation.push('BerryDetail', { idOrName });
    case 'region':
      return navigation.push('RegionDetail', { idOrName });
    case 'location':
      return navigation.push('LocationDetail', { idOrName });
    case 'location-area':
      return navigation.push('LocationAreaDetail', { idOrName });
    case 'generation':
      return navigation.push('GenerationDetail', { idOrName });
    case 'pokedex':
      return navigation.push('PokedexDetail', { idOrName });
    default:
      return navigation.push('ResourceDetail', { resource, idOrName });
  }
};

export function useResourceNavigation() {
  const navigation = useNavigation<Navigation>();

  const openResource = useCallback(
    (resource: ResourceKey, idOrName: string | number) =>
      navigateToResource(navigation, resource, idOrName),
    [navigation],
  );

  const openUrl = useCallback(
    (url: string) => {
      const parsed = parseResourceUrl(url);
      if (parsed) {
        navigateToResource(navigation, parsed.resource, parsed.id);
      }
    },
    [navigation],
  );

  return { openResource, openUrl, navigation };
}

export default useResourceNavigation;
