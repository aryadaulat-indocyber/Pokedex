/**
 * Language Settings Screen
 * GET /language + /language/{id}: pick the language used for localized
 * names, genera and flavor texts
 */

import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Badge, Divider, Icon } from '@/components/atoms';
import { ListItem, StateView } from '@/components/molecules';
import {
  IndexedResource,
  useResource,
  useResourceIndex,
  useScreenHeader,
} from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectLanguage, setLanguage } from '@/redux/slices/settingsSlice';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { Language } from '@/types/pokeapi';
import { pickLocalized } from '@/utils/localization';

interface LanguageRowProps {
  item: IndexedResource;
  selected: boolean;
  onSelect: (name: string) => void;
}

function LanguageRowBase({ item, selected, onSelect }: LanguageRowProps) {
  const { data } = useResource<Language>('language', item.id);
  // Show the language's name written in itself when available
  const native = data?.names.find(n => n.language.name === item.name)?.name;
  const english = pickLocalized(data?.names, 'en')?.name;

  return (
    <ListItem
      title={native ?? english ?? item.name}
      subtitle={[english, data ? `${data.iso639}-${data.iso3166}` : null]
        .filter(Boolean)
        .join(' · ')}
      trailing={
        selected ? (
          <Icon name="star" color={colors.primaryDefault} filled size={20} />
        ) : data?.official ? (
          <Badge label="Official" size="sm" />
        ) : undefined
      }
      showChevron={false}
      onPress={() => onSelect(item.name)}
    />
  );
}

const LanguageRow = memo(LanguageRowBase);

export default function LanguageSettingsScreen() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectLanguage);
  const index = useResourceIndex('language');
  useScreenHeader({ title: 'Language' });

  return (
    <FlatList
      data={index.items}
      keyExtractor={item => item.url}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <LanguageRow
          item={item}
          selected={item.name === current}
          onSelect={name => dispatch(setLanguage(name))}
        />
      )}
      ListEmptyComponent={
        <StateView
          icon="globe"
          title={index.isLoading ? 'Loading languages…' : 'No languages'}
          message={index.error?.message}
          actionLabel={index.error ? 'Retry' : undefined}
          onAction={index.refetch}
        />
      }
    />
  );
}

function Separator() {
  return <Divider inset={spacing.md} style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  separator: {
    marginVertical: 0,
  },
});
