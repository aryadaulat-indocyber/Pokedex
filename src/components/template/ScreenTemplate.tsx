/**
 * ScreenTemplate Component
 * Reusable screen layout: safe area + optional scroll container
 */

import React from 'react';
import {
  RefreshControlProps,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/colors';

export interface ScreenTemplateProps {
  children: React.ReactNode;
  scrollable?: boolean;
  safeAreaEdges?: Edge[];
  backgroundColor?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  refreshControl?: React.ReactElement<RefreshControlProps>;
}

export default function ScreenTemplate({
  children,
  scrollable = false,
  safeAreaEdges = ['top', 'left', 'right'], // bottom handled by tab bar
  backgroundColor = colors.background,
  contentContainerStyle,
  refreshControl,
}: ScreenTemplateProps) {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }]}
      edges={safeAreaEdges}
    >
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
