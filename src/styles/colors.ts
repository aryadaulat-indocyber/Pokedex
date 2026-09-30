/**
 * Color Palette
 * Defines all colors used in the app
 */

export const colors = {
  // Primary Colors (Pokédex red)
  primaryDefault: '#DC0A2D',
  primaryDark: '#A50021',
  primaryLight: '#FF5A6E',
  primarySoft: '#FDECEE',

  // Secondary Colors
  secondary: '#FFCB05',
  secondaryDark: '#C7A008',
  secondarySoft: '#FFF8DB',

  // Accent Colors
  accent: '#3D7DCA',
  accentSoft: '#E8F0FB',

  // Status Colors
  success: '#27AE60',
  successSoft: '#EEF8F4',
  error: '#E84D40',
  errorSoft: '#FDEDED',
  warning: '#FFBE26',
  info: '#15A9F4',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  blackDefault: '#1D1D1D',

  // Gray Scale
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',

  // Background Colors
  background: '#F7F7F9',
  surface: '#FFFFFF',

  // Text Colors
  textPrimary: '#1D1D1D',
  textSecondary: '#666666',
  textDisabled: '#BDBDBD',
  textInverse: '#FFFFFF',

  // Border Colors
  border: '#E0E0E0',
  borderLight: '#EEEEEE',

  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayWhite: 'rgba(255, 255, 255, 0.25)',

  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.1)',

  // Tab Bar
  tabActive: '#DC0A2D',
  tabInactive: '#9E9E9E',

  // Detail hero colors
  heroRegion: '#2E7D32',
  heroLocation: '#388E3C',
  heroLocationArea: '#43A047',
  heroGeneration: '#5E35B1',

  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;

export default colors;
