/**
 * EvolutionChainView Component
 * Fetches an evolution chain and renders it as an indented tree
 * (handles linear chains and branching ones like Eevee).
 */

import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Loading, RemoteImage, Text } from '@/components/atoms';
import { StateView } from '@/components/molecules';
import { useResource } from '@/hooks/useResource';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';
import { ChainLink, EvolutionChain, NamedAPIResource } from '@/types/pokeapi';
import { describeEvolution } from '@/utils/evolution';
import { formatDexNumber, formatName } from '@/utils/formatters';
import { getIdFromUrl } from '@/utils/resourceUrl';
import { getPokemonArtworkUrl } from '@/utils/sprites';

export interface EvolutionChainViewProps {
  chainId: number | string | null | undefined;
  currentSpecies?: string;
  accentColor?: string;
  onPressSpecies: (species: NamedAPIResource) => void;
}

interface ChainNodeProps {
  link: ChainLink;
  currentSpecies?: string;
  accentColor: string;
  onPressSpecies: (species: NamedAPIResource) => void;
}

function ChainNode({
  link,
  currentSpecies,
  accentColor,
  onPressSpecies,
}: ChainNodeProps) {
  const id = getIdFromUrl(link.species.url);
  const isCurrent = link.species.name === currentSpecies;

  return (
    <View>
      <Pressable
        onPress={() => onPressSpecies(link.species)}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.node,
          isCurrent && { borderColor: accentColor },
          pressed && styles.pressed,
        ]}
      >
        <RemoteImage uri={getPokemonArtworkUrl(id)} size={56} />
        <View style={styles.nodeText}>
          <Text variant="caption">{formatDexNumber(id)}</Text>
          <Text variant="subtitle">{formatName(link.species.name)}</Text>
          {link.is_baby ? (
            <Text variant="caption" color={accentColor}>
              Baby Pokémon
            </Text>
          ) : null}
        </View>
        <Icon name="chevronRight" size={18} color={colors.gray400} />
      </Pressable>

      {link.evolves_to.map(next => (
        <View key={next.species.name} style={styles.branch}>
          <View style={styles.condition}>
            <Icon name="arrowRight" size={14} color={accentColor} />
            <Text
              variant="caption"
              color={colors.textSecondary}
              style={styles.conditionText}
            >
              {describeEvolution(next) || 'Special condition'}
            </Text>
          </View>
          <ChainNode
            link={next}
            currentSpecies={currentSpecies}
            accentColor={accentColor}
            onPressSpecies={onPressSpecies}
          />
        </View>
      ))}
    </View>
  );
}

export default function EvolutionChainView({
  chainId,
  currentSpecies,
  accentColor = colors.primaryDefault,
  onPressSpecies,
}: EvolutionChainViewProps) {
  const { data, isLoading, error, refetch } = useResource<EvolutionChain>(
    'evolution-chain',
    chainId,
  );

  if (!chainId) {
    return <StateView title="No evolution data" />;
  }
  if (isLoading && !data) {
    return <Loading />;
  }
  if (error || !data) {
    return (
      <StateView
        title="Could not load evolutions"
        message={error?.message}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      {data.baby_trigger_item ? (
        <Text variant="bodySm" color={colors.textSecondary}>
          Baby form requires parent holding{' '}
          {formatName(data.baby_trigger_item.name)}
        </Text>
      ) : null}
      <ChainNode
        link={data.chain}
        currentSpecies={currentSpecies}
        accentColor={accentColor}
        onPressSpecies={onPressSpecies}
      />
      {data.chain.evolves_to.length === 0 ? (
        <Text variant="bodySm" color={colors.textSecondary}>
          This Pokémon does not evolve.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  node: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.transparent,
    backgroundColor: colors.surface,
  },
  nodeText: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  branch: {
    marginLeft: spacing.lg,
    paddingLeft: spacing.s,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
  },
  condition: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  conditionText: {
    flex: 1,
  },
});
