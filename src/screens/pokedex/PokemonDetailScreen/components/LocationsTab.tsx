/**
 * LocationsTab
 * Wild encounters from GET /pokemon/{id}/encounters
 */

import React from 'react';
import { Loading } from '@/components/atoms';
import { StateView } from '@/components/molecules';
import { EncounterList } from '@/components/organisms';
import type { ResourceKey } from '@/config/resourceRegistry';
import { useApiQuery } from '@/hooks/useApiQuery';
import pokemonService from '@/services/pokemon/pokemonService';

interface LocationsTabProps {
  pokemonId: number;
  openResource: (resource: ResourceKey, idOrName: string | number) => void;
}

export default function LocationsTab({
  pokemonId,
  openResource,
}: LocationsTabProps) {
  const { data, isLoading, error, refetch } = useApiQuery(
    `encounters:${pokemonId}`,
    () => pokemonService.getEncounters(pokemonId),
  );

  if (isLoading && !data) {
    return <Loading />;
  }
  if (error) {
    return (
      <StateView
        title="Could not load locations"
        message={error.message}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  return (
    <EncounterList
      encounters={(data ?? []).map(e => ({
        subject: e.location_area,
        version_details: e.version_details,
      }))}
      onPressSubject={area => openResource('location-area', area.name)}
    />
  );
}
