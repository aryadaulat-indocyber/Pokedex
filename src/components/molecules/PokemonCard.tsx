/**
 * PokemonCard Component
 * Grid card showing artwork, dex number, name and types
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, RemoteImage, Text, TypeBadge } from '@/components/atoms';
import { colors } from '@/styles/colors';
import { borderRadius, spacing } from '@/styles/spacing';
import { getTypeColor } from '@/constants/pokemonTypes';
import { formatDexNumber, formatName } from '@/utils/formatters';

export interface PokemonCardProps {
  id: number;
  name: string;
  imageUri: string;
  types?: string[];
  isFavorite?: boolean;
  onPress: () => void;
}

export default function PokemonCard({
  id,
  name,
  imageUri,
  types = [],
  isFavorite = false,
  onPress,
}: PokemonCardProps) {
  const primaryType = types[0];
  const backgroundColor = primaryType
    ? getTypeColor(primaryType)
    : colors.gray400;

  return (
    <Card
      onPress={onPress}
      padded={false}
      backgroundColor={backgroundColor}
      style={styles.card}
      accessibilityLabel={`${formatName(name)} ${formatDexNumber(id)}`}
    >
      <Icon
        name="pokeball"
        size={110}
        color={colors.overlayWhite}
        strokeWidth={3}
        style={styles.watermark}
      />
      <View style={styles.header}>
        <Text variant="caption" color={colors.white} style={styles.number}>
          {formatDexNumber(id)}
        </Text>
        {isFavorite ? (
          <Icon name="heart" size={14} color={colors.white} filled />
        ) : null}
      </View>
      <Text
        variant="subtitle"
        color={colors.white}
        numberOfLines={1}
        style={styles.name}
      >
        {formatName(name)}
      </Text>
      <View style={styles.body}>
        <View style={styles.types}>
          {types.map(type => (
            <TypeBadge key={type} type={type} size="sm" inverted />
          ))}
        </View>
        <RemoteImage
          uri={imageUri}
          size={72}
          placeholderColor={colors.overlayWhite}
          style={styles.image}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    padding: spacing.s,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    right: -18,
    bottom: -18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    opacity: 0.85,
  },
  name: {
    marginTop: spacing.xxs,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  types: {
    gap: spacing.xs,
    paddingBottom: spacing.xs,
  },
  image: {
    marginRight: -spacing.xs,
  },
});
