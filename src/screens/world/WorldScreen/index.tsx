/**
 * World Screen
 * Bottom tab: regions, generations, games (version groups) and Pokédexes.
 * Uses GET /region, /generation, /version-group, /pokedex
 */

import React, { useCallback, useState } from 'react';
import { ScreenHeader, SegmentedTabs } from '@/components/molecules';
import { ResourceList } from '@/components/organisms';
import { ScreenTemplate } from '@/components/template';
import {
  IndexedResource,
  useResourceIndex,
  useResourceNavigation,
} from '@/hooks';
import { formatGeneration, formatName } from '@/utils/formatters';
import { WORLD_SEGMENTS, WorldSegment } from './constants';

export default function WorldScreen() {
  const { openResource } = useResourceNavigation();
  const [segment, setSegment] = useState<WorldSegment>('regions');
  const { resource } =
    WORLD_SEGMENTS.find(s => s.key === segment) ?? WORLD_SEGMENTS[0];
  const index = useResourceIndex(resource);

  const onPressItem = useCallback(
    (item: IndexedResource) => openResource(resource, item.id),
    [openResource, resource],
  );

  const getTitle = useCallback(
    (item: IndexedResource) =>
      segment === 'generations'
        ? formatGeneration(item.name)
        : formatName(item.name),
    [segment],
  );

  return (
    <ScreenTemplate>
      <ScreenHeader title="World" subtitle="Regions, games and Pokédexes">
        <SegmentedTabs
          tabs={WORLD_SEGMENTS}
          activeKey={segment}
          onChange={setSegment}
        />
      </ScreenHeader>
      <ResourceList
        items={index.items}
        onPressItem={onPressItem}
        getTitle={getTitle}
        refreshing={false}
        onRefresh={index.refetch}
        emptyTitle={
          index.isLoading ? 'Loading…' : index.error?.message ?? 'Nothing found'
        }
      />
    </ScreenTemplate>
  );
}
