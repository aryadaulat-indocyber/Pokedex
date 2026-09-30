/**
 * AboutTab
 * Flavor text, measurements, abilities, breeding & species data
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Card, Divider, Text } from '@/components/atoms';
import {
  FlavorTextCard,
  InfoGrid,
  InfoRow,
  ListItem,
  ResourceChipList,
  SectionHeader,
} from '@/components/molecules';
import type { ResourceKey } from '@/config/resourceRegistry';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { Pokemon, PokemonSpecies } from '@/types/pokeapi';
import {
  formatGeneration,
  formatGenderRate,
  formatHeight,
  formatName,
  formatNullable,
  formatPercent,
  formatWeight,
} from '@/utils/formatters';
import { pickLatestLocalized } from '@/utils/localization';
import { getIdFromUrl } from '@/utils/resourceUrl';
import { STEPS_PER_EGG_CYCLE } from '../constants';

interface AboutTabProps {
  pokemon: Pokemon;
  species?: PokemonSpecies;
  language: string;
  accentColor: string;
  openResource: (resource: ResourceKey, idOrName: string | number) => void;
}

export default function AboutTab({
  pokemon,
  species,
  language,
  accentColor,
  openResource,
}: AboutTabProps) {
  const flavor = pickLatestLocalized(species?.flavor_text_entries, language);
  const gender = species ? formatGenderRate(species.gender_rate) : null;

  return (
    <View>
      {flavor ? (
        <>
          <SectionHeader title="Pokédex entry" />
          <FlavorTextCard
            text={flavor.flavor_text}
            source={flavor.version?.name}
            accentColor={accentColor}
          />
        </>
      ) : null}

      <SectionHeader title="Profile" />
      <InfoGrid
        accentColor={accentColor}
        items={[
          { label: 'Height', value: formatHeight(pokemon.height) },
          { label: 'Weight', value: formatWeight(pokemon.weight) },
          { label: 'Base EXP', value: formatNullable(pokemon.base_experience) },
        ]}
      />

      <SectionHeader title="Abilities" />
      <Card padded={false} style={styles.listCard}>
        {pokemon.abilities.map((a, index) => (
          <View key={a.ability.name}>
            {index > 0 ? <Divider /> : null}
            <ListItem
              title={formatName(a.ability.name)}
              subtitle={a.is_hidden ? 'Hidden ability' : `Slot ${a.slot}`}
              onPress={() => openResource('ability', a.ability.name)}
            />
          </View>
        ))}
      </Card>

      {species ? (
        <>
          <SectionHeader title="Breeding" />
          <Card>
            <InfoRow
              label="Gender"
              value={
                gender
                  ? `♂ ${formatPercent(gender.male)} · ♀ ${formatPercent(
                      gender.female,
                    )}`
                  : 'Genderless'
              }
            />
            <InfoRow
              label="Egg cycles"
              value={
                species.hatch_counter !== null
                  ? `${species.hatch_counter} (${
                      (species.hatch_counter + 1) * STEPS_PER_EGG_CYCLE
                    } steps)`
                  : '—'
              }
            />
            <InfoRow
              label="Growth rate"
              value={formatName(species.growth_rate.name)}
              onPress={() =>
                openResource(
                  'growth-rate',
                  getIdFromUrl(species.growth_rate.url),
                )
              }
            />
            <View style={styles.block}>
              <Text variant="label">Egg groups</Text>
              <ResourceChipList
                items={species.egg_groups}
                onPressItem={item =>
                  openResource('egg-group', getIdFromUrl(item.url))
                }
              />
            </View>
          </Card>

          <SectionHeader title="Species" />
          <Card>
            <InfoRow label="Capture rate" value={species.capture_rate} />
            <InfoRow
              label="Base happiness"
              value={formatNullable(species.base_happiness)}
            />
            <InfoRow
              label="Generation"
              value={formatGeneration(species.generation.name)}
              onPress={() =>
                openResource('generation', species.generation.name)
              }
            />
            <InfoRow
              label="Color"
              value={formatName(species.color.name)}
              onPress={() => openResource('pokemon-color', species.color.name)}
            />
            {species.shape ? (
              <InfoRow
                label="Shape"
                value={formatName(species.shape.name)}
                onPress={() =>
                  openResource('pokemon-shape', species.shape?.name ?? '')
                }
              />
            ) : null}
            {species.habitat ? (
              <InfoRow
                label="Habitat"
                value={formatName(species.habitat.name)}
                onPress={() =>
                  openResource('pokemon-habitat', species.habitat?.name ?? '')
                }
              />
            ) : null}
            {species.evolves_from_species ? (
              <InfoRow
                label="Evolves from"
                value={formatName(species.evolves_from_species.name)}
                onPress={() =>
                  openResource(
                    'pokemon-species',
                    species.evolves_from_species?.name ?? '',
                  )
                }
              />
            ) : null}
            <View style={styles.flags}>
              {species.has_gender_differences ? (
                <Badge label="Gender differences" size="sm" />
              ) : null}
              {species.forms_switchable ? (
                <Badge label="Forms switchable" size="sm" />
              ) : null}
            </View>
          </Card>

          {species.pokedex_numbers.length ? (
            <>
              <SectionHeader title="Pokédex numbers" />
              <ResourceChipList
                items={species.pokedex_numbers.map(p => p.pokedex)}
                getLabel={item =>
                  `${formatName(item.name)} #${
                    species.pokedex_numbers.find(
                      p => p.pokedex.name === item.name,
                    )?.entry_number
                  }`
                }
                onPressItem={item => openResource('pokedex', item.name)}
              />
            </>
          ) : null}

          {species.pal_park_encounters.length ? (
            <>
              <SectionHeader title="Pal Park" />
              <Card>
                {species.pal_park_encounters.map(p => (
                  <InfoRow
                    key={p.area.name}
                    label={formatName(p.area.name)}
                    value={`Score ${p.base_score} · Rate ${p.rate}%`}
                    onPress={() => openResource('pal-park-area', p.area.name)}
                  />
                ))}
              </Card>
            </>
          ) : null}
        </>
      ) : null}

      {pokemon.held_items.length ? (
        <>
          <SectionHeader title="Held items" />
          <ResourceChipList
            items={pokemon.held_items.map(h => h.item)}
            onPressItem={item => openResource('item', item.name)}
          />
        </>
      ) : null}

      {pokemon.cries?.latest ? (
        <Text variant="caption" color={colors.textSecondary} style={styles.cry}>
          Cry audio available at {pokemon.cries.latest}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  listCard: {
    overflow: 'hidden',
  },
  block: {
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  flags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  cry: {
    marginTop: spacing.lg,
  },
});
