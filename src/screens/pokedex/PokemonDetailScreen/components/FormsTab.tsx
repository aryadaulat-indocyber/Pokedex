/**
 * FormsTab
 * Varieties (other Pokémon of the species), cosmetic forms, sprite
 * gallery and game indices
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, RemoteImage, Text } from '@/components/atoms';
import { ResourceChipList, SectionHeader } from '@/components/molecules';
import type { ResourceKey } from '@/config/resourceRegistry';
import { spacing } from '@/styles/spacing';
import { Pokemon, PokemonSpecies } from '@/types/pokeapi';
import { formatName } from '@/utils/formatters';
import { getSpriteGallery } from '@/utils/sprites';

interface FormsTabProps {
  pokemon: Pokemon;
  species?: PokemonSpecies;
  openResource: (resource: ResourceKey, idOrName: string | number) => void;
}

export default function FormsTab({
  pokemon,
  species,
  openResource,
}: FormsTabProps) {
  const gallery = getSpriteGallery(pokemon.sprites);

  return (
    <View>
      {species && species.varieties.length > 1 ? (
        <>
          <SectionHeader title="Varieties" count={species.varieties.length} />
          <ResourceChipList
            items={species.varieties.map(v => v.pokemon)}
            onPressItem={item => openResource('pokemon', item.name)}
          />
        </>
      ) : null}

      <SectionHeader title="Forms" count={pokemon.forms.length} />
      <ResourceChipList
        items={pokemon.forms}
        onPressItem={item => openResource('pokemon-form', item.name)}
      />

      <SectionHeader title="Sprites" count={gallery.length} />
      <View style={styles.gallery}>
        {gallery.map(sprite => (
          <Card key={sprite.label} style={styles.sprite}>
            <RemoteImage uri={sprite.uri} size={80} />
            <Text variant="caption" align="center">
              {sprite.label}
            </Text>
          </Card>
        ))}
      </View>

      {pokemon.game_indices.length ? (
        <>
          <SectionHeader
            title="Appears in"
            count={pokemon.game_indices.length}
          />
          <ResourceChipList
            items={pokemon.game_indices.map(g => g.version)}
            getLabel={item => formatName(item.name)}
            onPressItem={item => openResource('version', item.name)}
          />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sprite: {
    width: '31%',
    alignItems: 'center',
    padding: spacing.sm,
  },
});
