/**
 * About Screen
 * GET /meta: PokeAPI deployment info + endpoint coverage
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from '@/components/atoms';
import { InfoRow, SectionHeader } from '@/components/molecules';
import { ScreenTemplate } from '@/components/template';
import { RESOURCE_GROUPS, RESOURCES } from '@/config/resourceRegistry';
import { config } from '@/config/environment';
import { useApiQuery, useScreenHeader } from '@/hooks';
import utilityService from '@/services/utility/utilityService';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

export default function AboutScreen() {
  useScreenHeader({ title: 'About' });
  const meta = useApiQuery('meta', () => utilityService.getMeta());

  const deployDate = meta.data?.deploy_date
    ? new Date(Number(meta.data.deploy_date) * 1000).toLocaleDateString()
    : '—';

  return (
    <ScreenTemplate
      scrollable
      safeAreaEdges={['left', 'right', 'bottom']}
      contentContainerStyle={styles.content}
    >
      <Text variant="h2">Pokédex</Text>
      <Text variant="body" color={colors.textSecondary}>
        A React Native Pokédex powered by PokeAPI. Pokémon and Pokémon character
        names are trademarks of Nintendo.
      </Text>

      <SectionHeader title="API" />
      <Card>
        <InfoRow label="Base URL" value={config.apiBaseUrl} />
        <InfoRow
          label="Deployed"
          value={meta.isLoading ? 'Loading…' : deployDate}
        />
        <InfoRow
          label="Build hash"
          value={meta.data?.hash ? meta.data.hash.slice(0, 10) : '—'}
        />
        <InfoRow label="Tag" value={meta.data?.tag ?? '—'} />
      </Card>

      <SectionHeader title="Coverage" />
      <Card>
        <InfoRow label="Sections" value={RESOURCE_GROUPS.length} />
        <InfoRow label="Resources" value={RESOURCES.length} />
        <InfoRow label="Sub-resources" value="pokemon/{id}/encounters, meta" />
      </Card>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    gap: spacing.xs,
  },
});
