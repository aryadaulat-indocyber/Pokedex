/**
 * History Screen
 * Recently viewed resources
 */

import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, RemoteImage } from '@/components/atoms';
import { ListItem, StateView } from '@/components/molecules';
import { getResourceDefinition } from '@/config/resourceRegistry';
import { useResourceNavigation, useScreenHeader } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearHistory, selectHistory } from '@/redux/slices/historySlice';
import { spacing } from '@/styles/spacing';
import { formatName } from '@/utils/formatters';
import { getPokemonSpriteUrl } from '@/utils/sprites';

export default function HistoryScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const history = useAppSelector(selectHistory);
  const { openResource } = useResourceNavigation();
  useScreenHeader({ title: 'Recently viewed' });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: history.length
        ? () => (
            <Button
              title="Clear"
              variant="outline"
              onPress={() => dispatch(clearHistory())}
            />
          )
        : undefined,
    });
  }, [navigation, dispatch, history.length]);

  return (
    <FlatList
      data={history}
      keyExtractor={item => item.key}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.content}
      ListEmptyComponent={
        <StateView icon="history" title="Nothing viewed yet" fullScreen />
      }
      renderItem={({ item }) => (
        <ListItem
          title={formatName(item.name)}
          subtitle={getResourceDefinition(item.resource).title}
          leading={
            item.resource === 'pokemon' ? (
              <RemoteImage uri={getPokemonSpriteUrl(item.id)} size={40} />
            ) : undefined
          }
          onPress={() => openResource(item.resource, item.id)}
        />
      )}
    />
  );
}

function Separator() {
  return <Divider inset={spacing.md} style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  separator: {
    marginVertical: 0,
  },
});
