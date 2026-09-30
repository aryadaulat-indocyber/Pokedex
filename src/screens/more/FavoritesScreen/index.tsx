/**
 * Favorites Screen
 * Every bookmarked resource, grouped by resource type
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, IconButton, RemoteImage } from '@/components/atoms';
import { ListItem, SectionHeader, StateView } from '@/components/molecules';
import { ScreenTemplate } from '@/components/template';
import { getResourceDefinition } from '@/config/resourceRegistry';
import { useResourceNavigation, useScreenHeader } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFavorite, selectFavorites } from '@/redux/slices/favoritesSlice';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { SavedResource } from '@/types/redux.types';
import { formatName } from '@/utils/formatters';
import { getPokemonSpriteUrl } from '@/utils/sprites';

const groupByResource = (items: SavedResource[]) =>
  items.reduce<Record<string, SavedResource[]>>((acc, item) => {
    acc[item.resource] = [...(acc[item.resource] ?? []), item];
    return acc;
  }, {});

export default function FavoritesScreen() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const { openResource } = useResourceNavigation();
  useScreenHeader({ title: 'Favorites' });

  if (!favorites.length) {
    return (
      <StateView
        icon="heart"
        title="No favorites yet"
        message="Tap the heart icon on any detail screen to save it here."
        fullScreen
      />
    );
  }

  const groups = groupByResource(favorites);

  return (
    <ScreenTemplate
      scrollable
      safeAreaEdges={['left', 'right', 'bottom']}
      contentContainerStyle={styles.content}
    >
      {Object.entries(groups).map(([resource, items]) => (
        <View key={resource}>
          <SectionHeader
            title={getResourceDefinition(items[0].resource).title}
            count={items.length}
          />
          <Card padded={false} style={styles.card}>
            {items.map((item, index) => (
              <View key={item.key}>
                {index > 0 ? <Divider /> : null}
                <ListItem
                  title={formatName(item.name)}
                  leading={
                    item.resource === 'pokemon' ? (
                      <RemoteImage
                        uri={getPokemonSpriteUrl(item.id)}
                        size={40}
                      />
                    ) : undefined
                  }
                  trailing={
                    <IconButton
                      icon="close"
                      size={18}
                      color={colors.gray500}
                      onPress={() => dispatch(removeFavorite(item.key))}
                      accessibilityLabel={`Remove ${item.name} from favorites`}
                    />
                  }
                  showChevron={false}
                  onPress={() => openResource(item.resource, item.id)}
                />
              </View>
            ))}
          </Card>
        </View>
      ))}
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    overflow: 'hidden',
  },
});
