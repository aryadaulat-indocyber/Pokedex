/**
 * PokemonHero
 * Header area of the Pokémon detail screen
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Icon, RemoteImage, Text, TypeBadge } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { formatDexNumber } from '@/utils/formatters';

interface PokemonHeroProps {
  id: number;
  displayName: string;
  genus?: string;
  types: string[];
  artwork: string | null;
  isLegendary?: boolean;
  isMythical?: boolean;
  isBaby?: boolean;
  onPressType: (type: string) => void;
}

export default function PokemonHero({
  id,
  displayName,
  genus,
  types,
  artwork,
  isLegendary,
  isMythical,
  isBaby,
  onPressType,
}: PokemonHeroProps) {
  return (
    <View>
      <View style={styles.titleRow}>
        <View style={styles.titles}>
          <Text variant="h1" color={colors.white}>
            {displayName}
          </Text>
          {genus ? (
            <Text variant="body" color={colors.white} style={styles.genus}>
              {genus}
            </Text>
          ) : null}
        </View>
        <Text variant="h3" color={colors.white} style={styles.number}>
          {formatDexNumber(id)}
        </Text>
      </View>

      <View style={styles.badges}>
        {types.map(type => (
          <TypeBadge
            key={type}
            type={type}
            inverted
            onPress={() => onPressType(type)}
          />
        ))}
        {isLegendary ? (
          <Badge label="Legendary" backgroundColor={colors.secondary} />
        ) : null}
        {isMythical ? (
          <Badge label="Mythical" backgroundColor={colors.secondary} />
        ) : null}
        {isBaby ? <Badge label="Baby" backgroundColor={colors.white} /> : null}
      </View>

      <View style={styles.artwork}>
        <Icon
          name="pokeball"
          size={220}
          color={colors.overlayWhite}
          strokeWidth={2.5}
          style={styles.watermark}
        />
        <RemoteImage
          uri={artwork}
          size={220}
          placeholderColor={colors.overlayWhite}
          accessibilityLabel={`${displayName} artwork`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titles: {
    flex: 1,
  },
  genus: {
    opacity: 0.85,
  },
  number: {
    opacity: 0.7,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  artwork: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    marginBottom: -spacing.xl,
    zIndex: 1,
  },
  watermark: {
    position: 'absolute',
  },
});
