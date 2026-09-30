/**
 * Divider Component
 * Thin horizontal separator
 */

import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export interface DividerProps {
  inset?: number;
  style?: StyleProp<ViewStyle>;
}

export default function Divider({ inset = 0, style }: DividerProps) {
  return <View style={[styles.divider, { marginLeft: inset }, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.xxs,
  },
});
