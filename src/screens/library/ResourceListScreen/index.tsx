/**
 * Resource List Screen
 * Generic paginated list for any PokeAPI endpoint (infinite scroll via `next`)
 */

import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Loading, Text } from '@/components/atoms';
import { StateView } from '@/components/molecules';
import { ResourceList } from '@/components/organisms';
import { getResourceDefinition } from '@/config/resourceRegistry';
import {
  usePaginatedResource,
  useResourceNavigation,
  useScreenHeader,
} from '@/hooks';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { ResourceListItem } from '@/types/pokeapi';
import { getIdFromUrl } from '@/utils/resourceUrl';

type Props = RootStackScreenProps<'ResourceList'>;

export default function ResourceListScreen({ route }: Props) {
  const { resource } = route.params;
  const definition = getResourceDefinition(resource);
  const { openResource } = useResourceNavigation();
  const list = usePaginatedResource(resource);
  useScreenHeader({ title: definition.title });

  const onPressItem = useCallback(
    (item: ResourceListItem) => openResource(resource, getIdFromUrl(item.url)),
    [openResource, resource],
  );

  if (list.isLoading) {
    return <Loading fullScreen />;
  }

  if (list.error && !list.items.length) {
    return (
      <StateView
        icon="info"
        title="Could not load list"
        message={list.error.message}
        actionLabel="Try again"
        onAction={list.refresh}
        fullScreen
      />
    );
  }

  return (
    <ResourceList
      items={list.items}
      onPressItem={onPressItem}
      getTitle={
        definition.named
          ? undefined
          : item =>
              `${definition.title.replace(/s$/, '')} #${getIdFromUrl(item.url)}`
      }
      onEndReached={list.loadMore}
      isLoadingMore={list.isLoadingMore}
      refreshing={list.isRefreshing}
      onRefresh={list.refresh}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text variant="bodySm" color={colors.textSecondary}>
            {definition.description}
          </Text>
          <Text variant="caption">
            Showing {list.items.length} of {list.total} · GET /{resource}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  header: {
    padding: spacing.md,
    gap: spacing.xs,
  },
});
