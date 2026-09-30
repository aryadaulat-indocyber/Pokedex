/**
 * Library Group Screen
 * Lists every resource of a PokeAPI section (e.g. "Berries")
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Divider, Text } from '@/components/atoms';
import { ListItem } from '@/components/molecules';
import { ScreenTemplate } from '@/components/template';
import {
  RESOURCE_GROUPS,
  getResourcesByGroup,
} from '@/config/resourceRegistry';
import { useScreenHeader } from '@/hooks';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import type {
  RootStackParamList,
  RootStackScreenProps,
} from '@/types/navigation.types';

type Props = RootStackScreenProps<'LibraryGroup'>;

export default function LibraryGroupScreen({ route }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const group = RESOURCE_GROUPS.find(g => g.key === route.params.group);
  const resources = getResourcesByGroup(route.params.group);
  useScreenHeader({ title: group?.title ?? 'Library' });

  return (
    <ScreenTemplate
      scrollable
      safeAreaEdges={['left', 'right', 'bottom']}
      contentContainerStyle={styles.content}
    >
      <Text variant="bodySm" color={colors.textSecondary} style={styles.hint}>
        GET https://pokeapi.co/api/v2/{'{resource}'}
      </Text>
      <Card padded={false} style={styles.card}>
        {resources.map((resource, index) => (
          <View key={resource.key}>
            {index > 0 ? <Divider /> : null}
            <ListItem
              title={resource.title}
              subtitle={`/${resource.key} — ${resource.description}`}
              onPress={() =>
                navigation.navigate('ResourceList', { resource: resource.key })
              }
            />
          </View>
        ))}
      </Card>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
  },
  hint: {
    marginBottom: spacing.sm,
  },
  card: {
    overflow: 'hidden',
  },
});
