/**
 * Theme
 * Aggregates design tokens and the React Navigation theme
 */

import { DefaultTheme, Theme } from '@react-navigation/native';
import { colors } from './colors';
import { borderRadius, elevation, spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  borderRadius,
  elevation,
  typography,
};

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primaryDefault,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.primaryDefault,
  },
};

export default theme;
