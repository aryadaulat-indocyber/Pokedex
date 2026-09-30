/**
 * Main Tab Navigator
 * Bottom tab navigation: Pokédex, Moves, Items, World, More
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, IconName } from '@/components/atoms';
import type { MainTabParamList } from '@/types/navigation.types';
import { colors } from '@/styles/colors';
import { fontWeight } from '@/styles/typography';

// Screens
import PokedexScreen from '@/screens/pokedex/PokedexScreen';
import MovesScreen from '@/screens/moves/MovesScreen';
import ItemsScreen from '@/screens/items/ItemsScreen';
import WorldScreen from '@/screens/world/WorldScreen';
import MoreScreen from '@/screens/more/MoreScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, IconName> = {
  PokedexTab: 'pokeball',
  MovesTab: 'lightning',
  ItemsTab: 'bag',
  WorldTab: 'map',
  MoreTab: 'grid',
};

interface TabBarIconProps {
  color: string;
  size: number;
  focused: boolean;
}

const createTabBarIcon =
  (name: IconName) =>
  ({ color, size, focused }: TabBarIconProps) =>
    (
      <Icon
        name={name}
        color={color}
        size={size}
        strokeWidth={focused ? 2.4 : 2}
      />
    );

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: { fontWeight: fontWeight.semibold },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.borderLight,
        },
        tabBarIcon: createTabBarIcon(TAB_ICONS[route.name]),
      })}
    >
      <Tab.Screen
        name="PokedexTab"
        component={PokedexScreen}
        options={{ title: 'Pokédex' }}
      />
      <Tab.Screen
        name="MovesTab"
        component={MovesScreen}
        options={{ title: 'Moves' }}
      />
      <Tab.Screen
        name="ItemsTab"
        component={ItemsScreen}
        options={{ title: 'Items' }}
      />
      <Tab.Screen
        name="WorldTab"
        component={WorldScreen}
        options={{ title: 'World' }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={{ title: 'More' }}
      />
    </Tab.Navigator>
  );
}
