/**
 * Typography Styles
 * Defines all text styles used in the app
 */

import { TextStyle } from 'react-native';
import { colors } from './colors';

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
} as const;

export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
} as const;

export const typography = {
  h1: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.extrabold,
    lineHeight: 36,
    color: colors.textPrimary,
  } as TextStyle,
  h2: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: 30,
    color: colors.textPrimary,
  } as TextStyle,
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    lineHeight: 26,
    color: colors.textPrimary,
  } as TextStyle,
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: 22,
    color: colors.textPrimary,
  } as TextStyle,
  subtitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: 20,
    color: colors.textPrimary,
  } as TextStyle,
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: 22,
    color: colors.textPrimary,
  } as TextStyle,
  bodySm: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: 18,
    color: colors.textPrimary,
  } as TextStyle,
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: 18,
    color: colors.textSecondary,
  } as TextStyle,
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: 14,
    color: colors.textSecondary,
  } as TextStyle,
} as const;

export type TypographyKey = keyof typeof typography;

export default typography;
