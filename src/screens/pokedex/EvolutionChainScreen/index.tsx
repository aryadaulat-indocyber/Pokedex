/**
 * Evolution Chain Screen
 * GET /evolution-chain/{id}: standalone view of an evolution family
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { EvolutionChainView } from '@/components/organisms';
import { ScreenTemplate } from '@/components/template';
import { useResourceNavigation, useScreenHeader } from '@/hooks';
import { spacing } from '@/styles/spacing';
import type { RootStackScreenProps } from '@/types/navigation.types';
import { getIdFromUrl } from '@/utils/resourceUrl';

type Props = RootStackScreenProps<'EvolutionChain'>;

export default function EvolutionChainScreen({ route }: Props) {
  const { openResource } = useResourceNavigation();
  useScreenHeader({ title: `Evolution Chain #${route.params.id}` });

  return (
    <ScreenTemplate
      scrollable
      safeAreaEdges={['left', 'right', 'bottom']}
      contentContainerStyle={styles.content}
    >
      <EvolutionChainView
        chainId={route.params.id}
        onPressSpecies={species =>
          openResource('pokemon-species', getIdFromUrl(species.url))
        }
      />
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
  },
});
