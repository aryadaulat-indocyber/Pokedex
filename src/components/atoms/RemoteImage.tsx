/**
 * RemoteImage Component
 * Network image with a Poké Ball placeholder while loading / on error
 */

import React, { useState } from 'react';
import {
  Image,
  ImageResizeMode,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Icon from './Icon';
import { colors } from '@/styles/colors';

export interface RemoteImageProps {
  uri?: string | null;
  size: number;
  resizeMode?: ImageResizeMode;
  placeholderColor?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export default function RemoteImage({
  uri,
  size,
  resizeMode = 'contain',
  placeholderColor = colors.gray300,
  style,
  accessibilityLabel,
}: RemoteImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !uri || failed || !loaded;

  return (
    <View style={[{ width: size, height: size }, styles.container, style]}>
      {showPlaceholder ? (
        <Icon
          name="pokeball"
          size={size * 0.5}
          color={placeholderColor}
          style={styles.placeholder}
        />
      ) : null}
      {uri && !failed ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          resizeMode={resizeMode}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          accessibilityLabel={accessibilityLabel}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    position: 'absolute',
  },
});
