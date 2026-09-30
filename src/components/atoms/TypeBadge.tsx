/**
 * TypeBadge Component
 * Badge colored by Pokémon type
 */

import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Badge, { BadgeSize } from './Badge';
import { colors } from '@/styles/colors';
import { getTypeColor } from '@/constants/pokemonTypes';
import { formatName } from '@/utils/formatters';

export interface TypeBadgeProps {
  type: string;
  size?: BadgeSize;
  /** Render on top of a colored background (white translucent style) */
  inverted?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function TypeBadge({
  type,
  size = 'md',
  inverted = false,
  onPress,
  style,
}: TypeBadgeProps) {
  const badge = (
    <Badge
      label={formatName(type)}
      size={size}
      backgroundColor={inverted ? colors.overlayWhite : getTypeColor(type)}
      textColor={colors.white}
      style={style}
    />
  );

  if (!onPress) {
    return badge;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${type} type`}
      hitSlop={4}
    >
      {badge}
    </Pressable>
  );
}
