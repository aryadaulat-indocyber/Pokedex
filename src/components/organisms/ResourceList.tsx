/**
 * ResourceList Component
 * Virtualized list of PokeAPI list items with infinite scroll support
 */

import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { Divider, Loading, Text } from '@/components/atoms';
import { ListItem, StateView } from '@/components/molecules';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { ResourceListItem } from '@/types/pokeapi';
import { formatDexNumber, formatName } from '@/utils/formatters';
import { getIdFromUrl } from '@/utils/resourceUrl';

export interface ResourceListProps<T extends ResourceListItem> {
  items: T[];
  onPressItem: (item: T) => void;
  getTitle?: (item: T) => string;
  getSubtitle?: (item: T) => string | undefined;
  renderLeading?: (item: T) => React.ReactNode;
  showIndex?: boolean;
  ListHeaderComponent?: React.ReactElement | null;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  emptyTitle?: string;
}

export const defaultResourceTitle = (item: ResourceListItem): string =>
  item.name ? formatName(item.name) : `Entry #${getIdFromUrl(item.url)}`;

export default function ResourceList<T extends ResourceListItem>({
  items,
  onPressItem,
  getTitle = defaultResourceTitle,
  getSubtitle,
  renderLeading,
  showIndex = true,
  ListHeaderComponent,
  onEndReached,
  isLoadingMore = false,
  refreshing,
  onRefresh,
  emptyTitle = 'Nothing here',
}: ResourceListProps<T>) {
  const renderItem = useCallback<ListRenderItem<T>>(
    ({ item }) => (
      <ListItem
        title={getTitle(item)}
        subtitle={getSubtitle?.(item)}
        leading={renderLeading?.(item)}
        trailing={
          showIndex ? (
            <Text variant="caption" color={colors.textSecondary}>
              {formatDexNumber(getIdFromUrl(item.url))}
            </Text>
          ) : undefined
        }
        onPress={() => onPressItem(item)}
      />
    ),
    [getTitle, getSubtitle, renderLeading, showIndex, onPressItem],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.url}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={<StateView title={emptyTitle} />}
      ListFooterComponent={isLoadingMore ? <Loading size="small" /> : null}
      contentContainerStyle={styles.content}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      initialNumToRender={20}
      windowSize={11}
      keyboardDismissMode="on-drag"
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
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
