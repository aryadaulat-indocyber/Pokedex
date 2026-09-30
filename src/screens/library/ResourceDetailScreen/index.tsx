/**
 * Resource Detail Screen
 * Generic detail view for any PokeAPI resource without a dedicated screen
 * (natures, egg groups, machines, contest effects, languages, ...)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Text } from '@/components/atoms';
import { QueryBoundary, ResourceDataView } from '@/components/organisms';
import { DetailTemplate } from '@/components/template';
import { getResourceDefinition } from '@/config/resourceRegistry';
import {
  useFavorite,
  useLanguage,
  useResource,
  useResourceNavigation,
  useScreenHeader,
  useTrackHistory,
} from '@/hooks';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { Name } from '@/types/pokeapi';
import { getLocalizedName } from '@/utils/localization';

type Props = RootStackScreenProps<'ResourceDetail'>;

interface GenericResource {
  id?: number;
  name?: string;
  names?: Name[];
  [key: string]: unknown;
}

const HERO_COLOR = colors.blackDefault;

export default function ResourceDetailScreen({ route }: Props) {
  const { resource, idOrName } = route.params;
  const definition = getResourceDefinition(resource);
  const language = useLanguage();
  const { openUrl } = useResourceNavigation();
  const query = useResource<GenericResource>(resource, idOrName);
  const data = query.data;

  const title = data
    ? data.name
      ? getLocalizedName(data.names, data.name, language)
      : `${definition.title.replace(/s$/, '')} #${data.id}`
    : '';

  const favorite = useFavorite(resource, data?.id, data?.name ?? title);
  useTrackHistory(resource, data?.id, data?.name ?? title);
  useScreenHeader({
    color: HERO_COLOR,
    favorite:
      data?.id !== undefined
        ? { isFavorite: favorite.isFavorite, onToggle: favorite.toggle }
        : undefined,
  });

  return (
    <QueryBoundary query={query}>
      {result => (
        <DetailTemplate
          heroColor={HERO_COLOR}
          hero={
            <View>
              <Badge
                label={`/${resource}/${result.id ?? idOrName}`}
                size="sm"
                backgroundColor={colors.overlayWhite}
                textColor={colors.white}
              />
              <Text variant="h2" color={colors.white} style={styles.title}>
                {title}
              </Text>
              <Text
                variant="bodySm"
                color={colors.white}
                style={styles.subtitle}
              >
                {definition.description}
              </Text>
            </View>
          }
        >
          <ResourceDataView
            data={result as never}
            language={language}
            onPressUrl={openUrl}
          />
        </DetailTemplate>
      )}
    </QueryBoundary>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.sm,
  },
  subtitle: {
    opacity: 0.8,
    marginTop: spacing.xs,
  },
});
