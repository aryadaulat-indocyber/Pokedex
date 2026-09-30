/**
 * Items Screen
 * Bottom tab: items, berries and bag pockets with search.
 * Uses GET /item, /berry, /item-pocket
 */

import React, { useCallback, useMemo, useState } from 'react';
import { RemoteImage, SearchInput } from '@/components/atoms';
import { ScreenHeader, SegmentedTabs } from '@/components/molecules';
import { ResourceList } from '@/components/organisms';
import { ScreenTemplate } from '@/components/template';
import {
  IndexedResource,
  useDebounce,
  useResourceIndex,
  useResourceNavigation,
} from '@/hooks';
import { formatName } from '@/utils/formatters';
import { getItemSpriteUrl } from '@/utils/sprites';
import { ITEMS_SEGMENTS, ItemsSegment, SEGMENT_RESOURCE } from './constants';

export default function ItemsScreen() {
  const { openResource } = useResourceNavigation();
  const [segment, setSegment] = useState<ItemsSegment>('items');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const resource = SEGMENT_RESOURCE[segment];
  const index = useResourceIndex(resource);

  const items = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase().replace(/\s+/g, '-');
    return query
      ? index.items.filter(i => i.name.includes(query))
      : index.items;
  }, [index.items, debouncedSearch]);

  const onPressItem = useCallback(
    (item: IndexedResource) => openResource(resource, item.id),
    [openResource, resource],
  );

  const renderLeading = useCallback(
    (item: IndexedResource) =>
      segment === 'pockets' ? null : (
        <RemoteImage
          uri={getItemSpriteUrl(
            segment === 'berries' ? `${item.name}-berry` : item.name,
          )}
          size={36}
        />
      ),
    [segment],
  );

  return (
    <ScreenTemplate>
      <ScreenHeader
        title="Items"
        subtitle={`${items.length} ${ITEMS_SEGMENTS.find(
          s => s.key === segment,
        )?.label.toLowerCase()}`}
      >
        <SegmentedTabs
          tabs={ITEMS_SEGMENTS}
          activeKey={segment}
          onChange={key => {
            setSegment(key);
            setSearch('');
          }}
        />
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder={`Search ${segment}`}
        />
      </ScreenHeader>
      <ResourceList
        items={items}
        onPressItem={onPressItem}
        getTitle={item => formatName(item.name)}
        renderLeading={renderLeading}
        refreshing={false}
        onRefresh={index.refetch}
        emptyTitle={
          index.isLoading
            ? 'Loading…'
            : index.error
            ? index.error.message
            : 'Nothing found'
        }
      />
    </ScreenTemplate>
  );
}
