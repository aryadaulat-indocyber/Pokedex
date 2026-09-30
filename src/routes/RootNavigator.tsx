/**
 * Root Navigator
 * Native stack containing the bottom tabs and every detail screen, so a
 * detail can be pushed from any tab (and from any other detail).
 * Note: NavigationContainer is in App.tsx, not here
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types/navigation.types';
import { colors } from '@/styles/colors';
import MainTabNavigator from './MainTabNavigator';

// Pokémon
import PokemonDetailScreen from '@/screens/pokedex/PokemonDetailScreen';
import TypeDetailScreen from '@/screens/pokedex/TypeDetailScreen';
import AbilityDetailScreen from '@/screens/pokedex/AbilityDetailScreen';
import EvolutionChainScreen from '@/screens/pokedex/EvolutionChainScreen';
// Moves & Items
import MoveDetailScreen from '@/screens/moves/MoveDetailScreen';
import ItemDetailScreen from '@/screens/items/ItemDetailScreen';
import BerryDetailScreen from '@/screens/items/BerryDetailScreen';
// World
import RegionDetailScreen from '@/screens/world/RegionDetailScreen';
import LocationDetailScreen from '@/screens/world/LocationDetailScreen';
import LocationAreaDetailScreen from '@/screens/world/LocationAreaDetailScreen';
import GenerationDetailScreen from '@/screens/world/GenerationDetailScreen';
import PokedexDetailScreen from '@/screens/world/PokedexDetailScreen';
// Library
import LibraryGroupScreen from '@/screens/library/LibraryGroupScreen';
import ResourceListScreen from '@/screens/library/ResourceListScreen';
import ResourceDetailScreen from '@/screens/library/ResourceDetailScreen';
// More
import FavoritesScreen from '@/screens/more/FavoritesScreen';
import HistoryScreen from '@/screens/more/HistoryScreen';
import LanguageSettingsScreen from '@/screens/more/LanguageSettingsScreen';
import AboutScreen from '@/screens/more/AboutScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackButtonDisplayMode: 'minimal',
        headerShadowVisible: false,
        headerTintColor: colors.textPrimary,
        headerStyle: { backgroundColor: colors.background },
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Group>
        <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
        <Stack.Screen name="TypeDetail" component={TypeDetailScreen} />
        <Stack.Screen name="AbilityDetail" component={AbilityDetailScreen} />
        <Stack.Screen name="EvolutionChain" component={EvolutionChainScreen} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="MoveDetail" component={MoveDetailScreen} />
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        <Stack.Screen name="BerryDetail" component={BerryDetailScreen} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="RegionDetail" component={RegionDetailScreen} />
        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} />
        <Stack.Screen
          name="LocationAreaDetail"
          component={LocationAreaDetailScreen}
        />
        <Stack.Screen
          name="GenerationDetail"
          component={GenerationDetailScreen}
        />
        <Stack.Screen name="PokedexDetail" component={PokedexDetailScreen} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="LibraryGroup" component={LibraryGroupScreen} />
        <Stack.Screen name="ResourceList" component={ResourceListScreen} />
        <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen
          name="LanguageSettings"
          component={LanguageSettingsScreen}
        />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
