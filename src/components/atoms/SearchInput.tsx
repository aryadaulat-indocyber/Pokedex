/**
 * SearchInput Component
 * Text input with search icon and clear button
 */

import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Icon from './Icon';
import { colors } from '@/styles/colors';
import { borderRadius, dimensions, spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

export interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export default function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search',
  style,
}: SearchInputProps) {
  return (
    <View style={[styles.container, style]}>
      <Icon name="search" size={18} color={colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray500}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="never"
        style={styles.input}
        accessibilityLabel={placeholder}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={() => onChangeText('')}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Icon name="close" size={16} color={colors.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dimensions.inputHeight,
    paddingHorizontal: spacing.s,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray100,
    gap: spacing.sm,
  },
  input: {
    ...typography.body,
    flex: 1,
    paddingVertical: 0,
  },
});
