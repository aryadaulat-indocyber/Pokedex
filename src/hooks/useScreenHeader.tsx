/**
 * useScreenHeader
 * Configure the native stack header of a detail screen: title, color and
 * an optional favorite toggle.
 */

import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '@/components/atoms';
import { colors } from '@/styles/colors';

export interface ScreenHeaderOptions {
  title?: string;
  /** Header background; when set the header content turns white */
  color?: string;
  favorite?: {
    isFavorite: boolean;
    onToggle: () => void;
  };
}

export function useScreenHeader({
  title,
  color,
  favorite,
}: ScreenHeaderOptions) {
  const navigation = useNavigation();
  const isFavorite = favorite?.isFavorite;
  const onToggle = favorite?.onToggle;

  useLayoutEffect(() => {
    const tint = color ? colors.white : colors.textPrimary;
    navigation.setOptions({
      title: title ?? '',
      headerStyle: { backgroundColor: color ?? colors.background },
      headerTintColor: tint,
      headerShadowVisible: false,
      headerRight: onToggle
        ? () => (
            <IconButton
              icon="heart"
              filled={isFavorite}
              color={color ? colors.white : colors.primaryDefault}
              onPress={onToggle}
              accessibilityLabel={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            />
          )
        : undefined,
    });
  }, [navigation, title, color, isFavorite, onToggle]);
}

export default useScreenHeader;
