/**
 * More Screen
 * Bottom tab: favorites, history, settings and the Library that exposes
 * every PokeAPI endpoint.
 */

import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Divider, Icon, Text } from '@/components/atoms';
import { ListItem, ScreenHeader, SectionHeader } from '@/components/molecules';
import { ScreenTemplate } from '@/components/template';
import {
  RESOURCE_GROUPS,
  RESOURCES,
  getResourcesByGroup,
} from '@/config/resourceRegistry';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectFavorites } from '@/redux/slices/favoritesSlice';
import { selectHistory } from '@/redux/slices/historySlice';
import {
  selectLanguage,
  selectShowShiny,
  toggleShiny,
} from '@/redux/slices/settingsSlice';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';
import type { RootStackParamList } from '@/types/navigation.types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function MoreScreen() {
  const navigation = useNavigation<Navigation>();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const history = useAppSelector(selectHistory);
  const language = useAppSelector(selectLanguage);
  const showShiny = useAppSelector(selectShowShiny);

  return (
    <ScreenTemplate scrollable contentContainerStyle={styles.content}>
      <ScreenHeader
        title="More"
        subtitle={`${RESOURCES.length} PokeAPI endpoints available`}
      />
      <View style={styles.body}>
        <SectionHeader title="Your collection" />
        <Card padded={false} style={styles.card}>
          <ListItem
            title="Favorites"
            subtitle="Bookmarked Pokémon, moves, items and more"
            leading={<Icon name="heart" color={colors.primaryDefault} filled />}
            trailing={String(favorites.length)}
            onPress={() => navigation.navigate('Favorites')}
          />
          <Divider />
          <ListItem
            title="Recently viewed"
            leading={<Icon name="history" color={colors.accent} />}
            trailing={String(history.length)}
            onPress={() => navigation.navigate('History')}
          />
        </Card>

        <SectionHeader title="Settings" />
        <Card padded={false} style={styles.card}>
          <ListItem
            title="Language"
            subtitle="Names and descriptions from PokeAPI"
            leading={<Icon name="globe" color={colors.success} />}
            trailing={language}
            onPress={() => navigation.navigate('LanguageSettings')}
          />
          <Divider />
          <ListItem
            title="Shiny artwork"
            leading={
              <Icon name="sparkles" color={colors.secondaryDark} filled />
            }
            trailing={
              <Switch
                value={showShiny}
                onValueChange={() => {
                  dispatch(toggleShiny());
                }}
                trackColor={{
                  true: colors.primaryDefault,
                  false: colors.gray300,
                }}
              />
            }
            showChevron={false}
          />
        </Card>

        <SectionHeader title="Library" count={RESOURCES.length} />
        <Text variant="bodySm" color={colors.textSecondary} style={styles.hint}>
          Browse every resource of the PokeAPI v2 specification.
        </Text>
        <View style={styles.grid}>
          {RESOURCE_GROUPS.map(group => (
            <Card
              key={group.key}
              style={styles.groupCard}
              onPress={() =>
                navigation.navigate('LibraryGroup', { group: group.key })
              }
              accessibilityLabel={`${group.title} library`}
            >
              <View style={styles.groupIcon}>
                <Icon name={group.icon} color={colors.primaryDefault} />
              </View>
              <Text variant="subtitle">{group.title}</Text>
              <Text variant="caption">
                {getResourcesByGroup(group.key).length} endpoints
              </Text>
            </Card>
          ))}
        </View>

        <SectionHeader title="About" />
        <Card padded={false} style={styles.card}>
          <ListItem
            title="About this app"
            subtitle="Data provided by pokeapi.co"
            leading={<Icon name="info" color={colors.textSecondary} />}
            onPress={() => navigation.navigate('About')}
          />
        </Card>
      </View>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  body: {
    paddingHorizontal: spacing.md,
  },
  card: {
    overflow: 'hidden',
  },
  hint: {
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  groupCard: {
    width: '48.5%',
    gap: spacing.xxs,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
});
