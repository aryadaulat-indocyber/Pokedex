/**
 * Spacing Constants
 * Defines consistent spacing values used throughout the app
 */

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  s: 12,
  md: 16,
  l: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
} as const;

export type SpacingKey = keyof typeof spacing;

/**
 * Border Radius
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export type BorderRadiusKey = keyof typeof borderRadius;

/**
 * Shadow Elevations
 */
export const elevation = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export type ElevationKey = keyof typeof elevation;

/**
 * Icon Sizes
 */
export const iconSize = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

/**
 * Common Dimensions
 */
export const dimensions = {
  inputHeight: 44,
  tabBarHeight: 60,
  chipHeight: 32,
  listItemHeight: 56,
  dividerHeight: 1,
} as const;

export default spacing;
